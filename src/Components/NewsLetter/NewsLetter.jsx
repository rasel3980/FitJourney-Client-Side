import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // New state for name
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      Swal.fire({
        title: "Oops!",
        text: "Please fill out both fields.",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    try {
      // Send both email and name to your backend API
      await axiosSecure.post("/Subscriber", { name, email }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Trigger SweetAlert with a customized success message
      Swal.fire({
        title: "Subscribed Successfully!",
        text: "Thank you for subscribing to our newsletter. We'll keep you updated.",
        icon: "success",
        confirmButtonText: "Great!",
      });

      // Reset the form after successful submission
      setEmail("");
      setName("");
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Get the latest updates and offers directly to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex items-center max-w-lg mx-auto">
          <input
            type="text"
            name="name"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="py-3 px-4 w-full border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
          <input
            type="email"
            name="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="py-3 px-4 w-full border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
