import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const Classes = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: classes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/class");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching class data: {error.message}</div>;
  }

  return (
    <>
    <Helmet>
      <title>All Classes | FitJourney</title>
    </Helmet>
    <div className="w-11/12 mx-auto my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes?.map((classItem) => (
          <div
            key={classItem.className}
            className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
          >
            <img
              src={classItem?.classImg}
              alt={classItem.className}
              className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500 transition-transform duration-300 transform hover:scale-110 "
            />
            <div className="flex flex-col justify-between p-6 space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-wide">
                  {classItem.className}
                </h2>
                <p className="dark:text-gray-800">
                  {classItem.classDescription}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Trainers:</h3>
                <div className="flex gap-3">
                  {classItem.trainers?.map((trainer, index) => (
                    <div
                      key={index}
                      className="relative group flex items-center space-x-3"
                    >
                      <img
                        src={trainer.profileImage}
                        alt={trainer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute left-0 hidden group-hover:block bg-black text-white text-sm rounded p-1 top-12 w-max">
                        {trainer.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Classes;
