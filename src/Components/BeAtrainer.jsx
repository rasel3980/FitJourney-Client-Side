import React from "react";
import bgImg from '../assets/Be a trainer bg/Be a trainer bg.jpg';

const BeAtrainer = () => {
  return (
    <section
      className="bg-cover w-11/12 mx-auto mb-10 bg-center py-16 text-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-5xl mx-auto px-4 bg-opacity-50 bg-black rounded-lg py-8">
        <h2 className="text-3xl font-semibold text-white mb-6">
          Become a Trainer and Share Your Expertise!
        </h2>
        <p className="text-lg text-white mb-8">
          Are you passionate about teaching and helping others reach their
          fitness goals? Join our community of expert trainers! Whether you're
          experienced or just starting, we’re always looking for talented
          individuals who are ready to inspire others and make a real
          difference.
        </p>
        <a
          href="/become-a-trainer"
          className="inline-block bg-red-500 text-white py-3 px-8 text-xl font-semibold uppercase rounded-lg hover:bg-red-400 transform transition duration-300 ease-in-out hover:scale-105"
        >
          Become a Trainer
        </a>
      </div>
    </section>
  );
};

export default BeAtrainer;
