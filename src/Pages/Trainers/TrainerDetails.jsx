import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { Link, useLoaderData } from "react-router-dom";
import BeAtrainer from "../../Components/BeAtrainer";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TrainerDetails = () => {
  const trainerDetails = useLoaderData();
  const axiosSecure = useAxiosSecure();
  console.log("trainerDetails",trainerDetails);
  const {
    name,
    age,
    bio,
    availableSlots,
    classesOffered,
    contactDetails,
    expertise,
    profileImage,
    socialLinks,
    packages,
    yearsOfExperience,
  } = trainerDetails;

  // const trainerBooked = {
  //   name,
  //   availableSlots,
  //   classesOffered,
  //   packages
  // }

  const [showInfo, setShowInfo] = useState(true); 
  const handleToggle = (section) => {
    if (section === "info") {
      setShowInfo(true);
    } else if (section === "slots") {
      setShowInfo(false);
    }
  };
  // axiosSecure.post('/trainer-booked',trainerBooked,{
  //   headers:{
  //     "Content-Type": "application/json",
  //   }
  // })
  // .then((res)=>{
  //   console.log("response",res.data);
  // })
  return (
    <>
    <div className="py-24 flex justify-center w-full items-center">
      <div className="w-full max-w-4xl border shadow-lg px-10 py-6">
        <div className="flex justify-center mb-4">
          <button
            className={`border text-xl font-bold border-black px-16 py-2 ${showInfo ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleToggle("info")}
          >
            Trainer Info
          </button>
          <button
            className={`border text-xl font-bold border-black px-16 py-2 ${!showInfo ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleToggle("slots")}
          >
            Available Slots
          </button>
        </div>

        {showInfo ? (
          <div>
            <div className="flex items-center space-x-6 mb-6">
              <img
                src={profileImage}
                alt={name}
                className="w-32 h-32 object-cover rounded-full border-4 border-violet-500"
              />
              <div>
                <h2 className="text-3xl font-semibold tracking-wide">{name}</h2>
                <p className="text-gray-600">{yearsOfExperience} years of experience</p>
                <p className="text-gray-600">Age: {age}</p>
              </div>
            </div>
            <div className="flex space-x-4 mb-6">
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  <FaFacebook size={24} />
                </a>
              )}
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                  <FaTwitter size={24} />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600">
                  <FaInstagram size={24} />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700">
                  <FaLinkedin size={24} />
                </a>
              )}
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-lg">Bio:</h3>
              <p>{bio}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg">Expertise:</h3>
              <p>{expertise}</p>
            </div>
            {contactDetails && (
              <div>
                <h3 className="font-semibold text-lg">Contact Details:</h3>
                <p><strong>Email:</strong> {contactDetails.email}</p>
                <p><strong>Phone:</strong> {contactDetails.phone}</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="font-semibold text-xl mb-6">Available Slots:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableSlots &&
                availableSlots.map((dayObj) => (
                  <div key={dayObj.day} className="w-full text-center p-4 bg-white rounded-lg border border-red-800 shadow-md">
                    <h4 className="font-medium text-lg">{dayObj.day}</h4>
                    <ul className="space-y-2 mt-2">
                      {dayObj.timeSlots.map((slot) => (
                        <li
                          key={slot.slotId}
                          className={`p-3 rounded-lg cursor-pointer ${slot.isAvailable ? 'bg-green-100' : 'bg-red-100'}`}
                        >
                          <Link
                            to={`/trainer-booked/${slot.slotId}`}
                            className="flex justify-between items-center"
                          >
                            <span>{slot.time}</span>
                            {slot.isAvailable ? (
                              <TiTick className="text-green-500" />
                            ) : (
                              <RxCross2 className="text-red-500" />
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <BeAtrainer></BeAtrainer>
    </>
  );
};

export default TrainerDetails;
