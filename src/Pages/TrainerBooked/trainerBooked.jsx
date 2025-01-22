import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const TrainerBooked = () => {
  const axiosSecure = useAxiosSecure();

  const { data: booked, isLoading, error } = useQuery({
    queryKey: ["booked"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainer-booked");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error fetching booked data: {error.message}. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Booked Trainer Information</h2>
      {booked && booked.length > 0 ? (
        <div className="space-y-4">
          {booked.map((item) => (
            <div key={item._id} className="border-b border-gray-300 pb-4 mb-4">
              <h3 className="text-2xl font-semibold">{item.trainerName}</h3>
              <p className="text-lg text-gray-600">Selected Slot: {item.selectedSlot}</p>
              <p className="text-lg text-gray-600">Classes: {item.classes}</p>
              <p className="text-lg text-gray-600">Package: {item.package}</p>
              <button
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => alert("Join now functionality to be implemented")}
              >
                Join Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No trainers booked yet. Please try again later.</p>
      )}
    </div>
  );
};

export default TrainerBooked;
