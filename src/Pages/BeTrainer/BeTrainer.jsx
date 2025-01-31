import React, { useContext, useState } from 'react';
import useAxiosSecure from "../../Hooks/useAxiosSecure"; 
import Select from 'react-select';
import { authContext } from '../../Providers/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { imageUpload } from '../../api/utils';

const BeTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);
  

  const expertiseOptions = [
    "Yoga", "HIIT Training", "Strength Training", "Meditation", 
    "Bodybuilding", "Kickboxing", "Core Training", "Endurance Training"
  ];
  const availableDaysOptions = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [expertise, setExpertise] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTime, setAvailableTime] = useState({ start: '', end: '' });
  const [loading, setLoading] = useState(false);

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setExpertise(prevExpertise => 
      checked ? [...prevExpertise, value] : prevExpertise.filter(skill => skill !== value)
    );
  };

  const handleDayChange = (selectedOptions) => {
    setAvailableDays(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const age = form.age.value;
    const email = user?.email;
    const image = form.profileImage.files[0];
    const profileImage = await imageUpload(image)

    const newTrainer = {
      name,
      age,
      email,
      profileImage
    }

    setLoading(true);

    axiosSecure.post('/trainer-apply', newTrainer, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(res => {
        // console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Trainer profile added successfully!',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      }
    })
    .catch(error => {
        // console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'There was an issue adding your profile.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
      <form noValidate onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Personal Information</p>
            <p className="text-xs">Please provide your personal details to apply.</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="fullName" className="text-sm">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <label htmlFor="email" className="text-sm">Email</label>
              <input
                id="email"
                type="email"
                value={user?.email}
                readOnly
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <label htmlFor="age" className="text-sm">Age</label>
              <input
                id="age"
                type="number"
                name="age"
                placeholder="Enter your age"
                required
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>

            <div className="col-span-full">
              <label htmlFor="profileImage" className="text-sm">Profile Image</label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                name="profileImage"
                required
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Expertise</p>
            <p className="text-xs">Select the skills you possess.</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            {expertiseOptions.map((expertiseOption, index) => (
              <div key={index} className="col-span-full sm:col-span-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={expertiseOption}
                    onChange={handleSkillChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{expertiseOption}</span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Available Days</p>
            <p className="text-xs">Select the days you are available.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 col-span-full lg:col-span-3">
            <Select
              isMulti
              options={availableDaysOptions.map(day => ({ value: day, label: day }))}
              value={availableDays.map(day => ({ value: day, label: day }))}
              onChange={handleDayChange}
              placeholder="Select Days"
            />
          </div>
        </fieldset>

        <fieldset className="grid grid-cols-2 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Available Time</p>
            <p className="text-xs">Select your available start and end time for the day.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="startTime" className="text-sm">Start Time</label>
              <input
                id="startTime"
                type="time"
                value={availableTime.start}
                onChange={(e) => setAvailableTime({ ...availableTime, start: e.target.value })}
                required
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <label htmlFor="endTime" className="text-sm">End Time</label>
              <input
                id="endTime"
                type="time"
                value={availableTime.end}
                onChange={(e) => setAvailableTime({ ...availableTime, end: e.target.value })}
                required
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
              />
            </div>
          </div>
        </fieldset>

        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-36 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            {loading ? 'Applying...' : 'Apply'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default BeTrainer;
