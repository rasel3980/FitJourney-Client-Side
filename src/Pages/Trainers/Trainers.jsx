import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

const Trainers = () => {
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

  console.log('trainers',trainers);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <div>Error fetching trainer data: {error.message}</div>;
  }
  return (
    <>
      <Helmet>
        <title>All Trainer | FitJourney </title>
      </Helmet>
      <div className="w-11/12 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainers.map((trainer) => {
          return (
            <div
              key={trainer._id}
              className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
            >
              <img
                src={trainer?.profileImage || "/default-profile.jpg"}
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
                      href={trainer.socialLinks.facebook}
                    >
                      <FaFacebook size={24} />
                    </a>
                  )}
                  {trainer.socialLinks?.twitter && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400"
                      href={trainer.socialLinks.twitter}
                    >
                      <FaTwitter size={24} />
                    </a>
                  )}
                  {trainer.socialLinks?.instagram && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600"
                      href={trainer.socialLinks.instagram}
                    >
                      <FaInstagram size={24} />
                    </a>
                  )}
                  {trainer.socialLinks?.linkedin && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700"
                      href={trainer.socialLinks.linkedin}
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
                            {dayObj.timeSlots.map((slot) => (
                              <li
                                key={slot.slotId}
                                className={
                                  slot.isAvailable
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              >
                                {slot.time}{" "}
                                {slot.isAvailable ? (
                                  <div className="inline-block">
                                    <TiTick className="inline-block" />{" "}
                                    Available
                                  </div>
                                ) : (
                                  <div className="inline-block">
                                    <RxCross2 className="inline-block" /> Not
                                    Available
                                  </div>
                                )}
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
                  <button className="bg-cyan-500 py-3 px-5 rounded-xl">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Trainers;
