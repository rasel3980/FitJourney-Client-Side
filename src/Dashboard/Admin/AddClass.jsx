import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure"; // Assuming you have a custom hook for secure API calls
import Swal from "sweetalert2";
import { imageUpload } from "../../api/utils";

const AddClass = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading to true when submitting

    const form = e.target;
    const className = form.className.value;
    const classDescription = form.classDescription.value;
    const image = form.image.files[0];
    console.log('imgae',image);
    const trainers = form.trainers.value;
    const price = form.price.value;
    const duration = form.duration.value;
    const classImg = await imageUpload(image)

    // Prepare class data
    const newClass = {
      className,
      classDescription,
      classImg,
      trainers: trainers.split(",").map((trainer) => trainer.trim()),
      price,
      duration,
    };

    try {
      // Send a POST request to the backend
      await axiosSecure.post("/add-class", newClass);
      setLoading(false); // Stop loading after the request completes

      // Show success message
      Swal.fire({
        title: "Good job!",
        text: "Class added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form fields after submission (optional)
      form.reset();

      // Navigate to all classes page
      navigate("/all-class");
    } catch (error) {
      setLoading(false); // Stop loading if there's an error
      console.error("Error adding class:", error);

      // Show error message
      Swal.fire({
        title: "Error",
        text: "There was an issue adding the class. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto my-16">
      <h1 className="text-4xl font-bold text-center mb-8">Add New Class</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-xl font-medium">Class Name</label>
          <input
            type="text"
            name="className"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter class name"
            required
          />
        </div>

        <fieldset className="w-full space-y-1 dark:text-gray-800">
          <label htmlFor="files" className="block text-sm font-medium">
            Attachments
          </label>
          <div className="flex">
            <input
              type="file"
              name="image"
              id="files"
              accept='image/*'
              className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100"
            />
          </div>
        </fieldset>

        {/* <div>
          <label className="block text-xl font-medium">Class Image URL</label>
          <input
            type="url"
            name="classImg"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter image URL"
            required
          />
        </div> */}

        <div>
          <label className="block text-xl font-medium">Class Description</label>
          <textarea
            name="classDescription"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter class description"
            rows="5"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-xl font-medium">Price</label>
          <input
            type="number"
            name="price"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <label className="block text-xl font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter duration (e.g., 1 hour)"
            required
          />
        </div>

        <div>
          <label className="block text-xl font-medium">
            Trainers (Comma Separated)
          </label>
          <input
            type="text"
            name="trainers"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter trainer names (comma separated)"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Class"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
