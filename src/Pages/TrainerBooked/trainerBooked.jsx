import { useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure"; 

const TrainerBooked = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const axiosSecure = useAxiosSecure();

  const { data: booked, isLoading, error } = useQuery(
    ["trainerBooked", id],
    async () => {
      const res = await axiosSecure.get(`/trainer/booked/${id}`);
      return res.data; 
    }
  );

  if (isLoading) return <Loading />;

  if (error) {
    return <div>Error fetching trainer data.</div>;
  }

  const { name, selectedSlot, classesOffered, packages } = booked || {};

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleJoinNow = () => {
    if (selectedPlan) {
      alert(`You have selected the ${selectedPlan} plan. Proceeding to payment.`);
      navigate("/payment");
    } else {
      alert("Please select a membership plan.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Trainer Booking | FitJourney</title>
      </Helmet>

      <div className="py-24 flex justify-center w-full items-center">
        <div className="w-full max-w-4xl border shadow-lg px-10 py-6">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold">{name}</h2>
            <p className="text-xl text-gray-600">Selected Slot: {selectedSlot}</p> 
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold">Classes Offered</h3>
            <ul>
              {classesOffered?.map((className, index) => (
                <li key={index}>{className.className}</li>
              ))}
            </ul>
          </div>

          <section className="py-20 dark:bg-gray-100 dark:text-gray-800">
            <div className="container px-4 mx-auto">
              <div className="max-w-2xl mx-auto mb-16 text-center">
                <span className="font-bold tracking-wider uppercase dark:text-violet-600">
                  Pricing
                </span>
                <h2 className="text-4xl font-bold lg:text-5xl">Choose your best plan</h2>
              </div>
              <div className="flex flex-wrap items-stretch -mx-4">
                {(packages || []).map((plan, index) => (
                  <div
                    className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0"
                    key={index}
                  >
                    <div
                      className={`flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 ${
                        selectedPlan === plan.name
                          ? "bg-violet-600 text-gray-50"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="space-y-2">
                        <h4 className="text-2xl font-bold">{plan.name}</h4>
                        <span className="text-6xl font-bold">{plan.price}</span>
                      </div>
                      <p className="mt-3 leading-relaxed dark:text-gray-600">
                        {plan.description}
                      </p>

                      <button
                        type="button"
                        onClick={() => setSelectedPlan(plan.name)} 
                        className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded dark:bg-violet-600 dark:text-gray-50"
                      >
                        {selectedPlan === plan.name ? "Selected" : "Choose this Plan"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-6 text-center">
            <button
              className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg"
              onClick={handleJoinNow}
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerBooked;
