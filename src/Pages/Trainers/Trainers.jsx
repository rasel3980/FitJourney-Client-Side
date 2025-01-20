import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axiosPublic.get("/trainer");
        console.log("API Response: ", response.data);
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, [axiosPublic]);

  return (
    <div className=" w-11/12 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {trainers.map((trainer, index) => {
        return (
          <div
            key={index}
            className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
          >
            <img
              src={trainer?.profileImage} 
              alt={trainer.name}
              className="object-cover object-center w-full rounded-full h-72 dark:bg-gray-500"
            />
            <div className="flex flex-col justify-between p-6 space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-wide">
                  {trainer.name}
                </h2>
                <p className="text-gray-600">
                  {trainer.yearsOfExperience} years of experience
                </p>
              </div>

              <div className="flex space-x-4">
                {trainer.socialLinks?.facebook && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    <FaFacebook size={24} />
                  </a>
                )}
                {trainer.socialLinks?.twitter && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    <FaTwitter size={24} />
                  </a>
                )}
                {trainer.socialLinks?.instagram && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600"
                  >
                    <FaInstagram size={24} />
                  </a>
                )}
                {trainer.socialLinks?.linkedin && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
              </div>

              <div className="text-gray-600">
                <h3 className="font-semibold text-lg">Available Slots:</h3>
                <div>
                  {trainer.availableSlots &&
                    trainer.availableSlots.map((dayObj) => (
                      <div key={dayObj.day} className="mt-2">
                        <h4 className="font-medium">{dayObj.day}</h4>
                        <ul className="list-disc pl-5">
                          {dayObj.timeSlots.map((slot, index) => (
                            <li
                              key={slot.slotId}
                              className={
                                slot.isAvailable
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {slot.time}{" "}
                              {slot.isAvailable
                                ?<div className="inline-block"><TiTick className="inline-block" />Available</div>
                                : <div className="inline-block"><RxCross2 className="inline-block" />Not Available</div>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>

              <Link
                to={`/details/${trainer._id}`} 
                className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
              >
                <button className="bg-cyan-500 py-3 px-5 rounded-xl">Know More</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Trainers;
