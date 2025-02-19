import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";

const Classes = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = new URLSearchParams(location.search).get("page") || 1;
  const [classesPerPage] = useState(6);
  const [sort, setSort] = useState(""); // State for sorting by price

  // Fetch classes with sorting
  const {
    data: classes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["classes", sort], // Add sort to queryKey to refetch when sort changes
    queryFn: async () => {
      const res = await axiosSecure.get(`/class?sort=${sort}`); // Pass sort in the query params
      return res.data;
    },
  });

  // Effect to reset page number when sorting changes
  useEffect(() => {
    navigate(`?page=1`); // Reset to page 1 whenever sorting changes
  }, [sort, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const paginatedClasses = classes.slice(
    (currentPage - 1) * classesPerPage,
    currentPage * classesPerPage
  );

  const totalClasses = classes.length;
  const totalPages = Math.ceil(totalClasses / classesPerPage);

  const goToPage = (page) => {
    navigate(`?page=${page}`);
  };

  return (
    <>
      <Helmet>
        <title>All Classes | FitJourney</title>
      </Helmet>
      <div className="w-11/12 mx-auto my-16">
        <div className="flex justify-between pb-5">
          <div>
            <h1 className="lg:text-3xl text-xl text-center font-bold">
              Available Classes for You
            </h1>
          </div>
          <select
            className="border-2 lg:p-3 px-3 py-2 rounded-lg bg-white text-gray-700 shadow-md border-cyan-600"
            onChange={(e) => setSort(e.target.value)} // Handle sort change
            value={sort}
            name="Price_Range"
            id="Price_Range"
          >
            <option value="" className="text-gray-500">
              Filter by Price
            </option>
            <option value="asc">Low to High</option>
            <option value="dsc">High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedClasses.map((classItem) => (
            <div
              key={classItem._id}
              className="rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
            >
              <div>
                <img
                  src={classItem.classImg}
                  alt={classItem.className}
                  className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500 transition-transform duration-300 transform hover:scale-110"
                />
                <div className="flex flex-col justify-between p-6 space-y-2">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-wide">
                      {classItem.className}
                    </h2>
                    <p className="dark:text-gray-800">{classItem.classDescription}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Duration: {classItem.duration}</p>
                    <p className="font-medium">Price: ${classItem.price}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      {classItem.trainers?.slice(0, 5).map((trainer) => (
                        <div
                          key={trainer.name}
                          className="relative group flex items-center space-x-3"
                        >
                          <Link to={trainer.trainerProfileLink}>
                            <img
                              src={trainer.profileImage}
                              alt={trainer.name}
                              className="w-10 h-10 rounded-full object-cover cursor-pointer"
                            />
                          </Link>
                          <div className="absolute left-0 hidden group-hover:block bg-black text-white text-sm rounded p-1 top-12 w-max">
                            {trainer.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span className="flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Classes;
