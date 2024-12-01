//@ts-check

import React from "react";
import Weather1 from '../assets/weather/weather1.jpg'
import Weather2 from '../assets/weather/weather2.jpg'
import Weather3 from '../assets/weather/weather3.jpg'

const Home = () => {
  return (
    <React.Fragment>
      <div className="bg-gradient-to-b from-blue-500 to-blue-300 min-h-screen text-white">
        {/* Header */}
        <header className="text-center py-10">
          <h1 className="text-4xl font-bold">Welcome to Weather App</h1>
          <p className="mt-4 text-lg">
            An intuitive platform to stay updated with the latest weather
            conditions.
          </p>
        </header>

        {/* About Section */}
        <section className="max-w-4xl mx-auto text-center my-12 px-6">
          <h2 className="text-3xl font-semibold mb-6">What We Do</h2>
          <p className="text-lg leading-7">
            Our weather app provides accurate and real-time weather updates for
            any location in the world. Whether you're planning your day or
            preparing for a trip, we've got you covered with:
          </p>
          <ul className="list-disc list-inside mt-6 text-left mx-auto max-w-2xl">
            <li>Real-time temperature, humidity, and wind speed data.</li>
            <li>3-day and 7-day weather forecasts.</li>
            <li>Alerts for severe weather conditions.</li>
          </ul>
        </section>

        {/* Image Gallery */}
        <section className="my-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            <img
            src={Weather1}
            alt="Weather Illustration 1"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform"
          />
          <img
            src={Weather2}
            alt="Weather Illustration 2"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform"
          />
          <img
            src={Weather3}
            alt="Weather Illustration 3"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform"
          />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-600 py-6 text-center">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} Weather App. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Designed with ❤️ using{" "}
            <a
              href="https://reactjs.org/"
              className="text-yellow-300 hover:underline"
            >
              ReactJS
            </a>{" "}
            and{" "}
            <a
              href="https://tailwindcss.com/"
              className="text-yellow-300 hover:underline"
            >
              TailwindCSS
            </a>
            .
          </p>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Home;