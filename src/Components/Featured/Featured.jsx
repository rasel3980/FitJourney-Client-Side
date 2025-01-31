import { FaLaptop, FaLock, FaCogs, FaSmile } from 'react-icons/fa'; 
const Featured = () => {
    const features = [
        {
          title: 'Responsive Design',
          description: 'Our website adapts beautifully to all screen sizes and devices.',
          icon: <FaLaptop size={40} className="text-green-500" />
        },
        {
          title: 'Secure Transactions',
          description: 'We use industry-leading encryption to ensure your transactions are always safe.',
          icon: <FaLock size={40} className="text-green-500" />
        },
        {
          title: 'Customizable Options',
          description: 'Easily personalize the website to suit your needs with a variety of settings.',
          icon: <FaCogs size={40} className="text-green-500" />
        },
        {
          title: '24/7 Support',
          description: 'Our support team is here to assist you around the clock with any queries.',
          icon: <FaSmile size={40} className="text-green-500" />
        },
      ];
    
    return (
        <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-center text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    );
};

export default Featured;