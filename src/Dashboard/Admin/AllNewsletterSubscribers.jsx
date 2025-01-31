import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Pages/Loading/Loading';

const AllNewsletterSubscribers = () => {
  const axiosSecure = useAxiosSecure();
  
  const { data: subscribers, isLoading, error } = useQuery({
    queryKey: ['subscribers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/subscriber');
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  return (
    <div className="p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="mb-4 text-center text-2xl font-semibold ">All Newsletter Subscribers</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left whitespace-nowrap border border-gray-300">
          <thead>
            <tr className="dark:bg-gray-300 border-b">
              <th className="p-3 border-r">SN</th>
              <th className="p-3 border-r">User Name</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
            {subscribers.map((subscriber, index) => (
              <tr key={subscriber._id} className="border-b">
                <td className="px-3 py-2">{index + 1}</td> {/* Serial number */}
                <td className="px-3 py-2">{subscriber.name}</td> {/* User name */}
                <td className="px-3 py-2">{subscriber.email}</td> {/* Email */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllNewsletterSubscribers;
