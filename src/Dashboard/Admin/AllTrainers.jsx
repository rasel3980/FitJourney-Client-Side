import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Pages/Loading/Loading";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: trainers,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainer");
      return res.data;
    },
  });

  console.log("trainers", trainers);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching trainer data: {error.message}</div>;
  }

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="mb-4 text-2xl font-semibold text-center leading-tight">
        All Trainers
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs border">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="dark:bg-gray-300 text-xl border-b">
            <tr className="text-left">
              <th className="p-3">SN</th>
              <th className="p-3">Trainer Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers?.map((trainer, index) => (
              <tr key={trainer._id} className="border-b">
                <td className="p-3">{index + 1}</td> {/* Serial number */}
                <td className="p-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={trainer.profileImage}
                        alt=""
                      />
                    </div>
                    <div><strong>{trainer.name}</strong></div>
                  </div>
                </td>
                <td className="p-3">{trainer.contactDetails?.email}</td>{" "}
                {/* Trainer email */}
                <td className="p-3">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTrainers;
