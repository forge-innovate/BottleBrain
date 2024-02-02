import React from "react";

const HomePage = () => {
  return (
    <div className="bg-purple-100 h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-6 text-blue-600">
        Welcome to the Wine Quality Detector DApp
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Explore the world of wine through advanced quality analysis and
        historical assessments.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Input Chemical Data
          </h2>
          <p className="text-gray-600">
            Enter precise chemical parameters to analyze the quality of your
            wine.
          </p>
        </div>

        <div className="p-8 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            View Quality Results
          </h2>
          <p className="text-gray-600">
            Access detailed results showcasing the quality analysis of your wine
            samples.
          </p>
        </div>

        <div className="p-8 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            Explore Historical Data
          </h2>
          <p className="text-gray-600">
            Dive into the history of quality assessments for a comprehensive
            view of your wine samples.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
