import { useEffect, useState } from "react";
import { getDashboard } from "../../services/operations/historyApi";
import React from "react";
import SearchEngine from "./SearchEngine";
import "./style.css";
import toast from "react-hot-toast";
import Forecast from "./Forecast";

const Dashboard = () => {
  const [query, setQuery] = useState(null);

  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
    missingId: false,
  });

  useEffect(() => {
    if (query) {
      setWeather(weather => ({ ...weather, missingId: false }));
    } else setWeather(weather => ({ ...weather, missingId: true }));
  }, [query]);

  const search = async (event) => {
    event.preventDefault();
    setWeather({ ...weather, loading: true });
    if (!query) toast.error("Please select device");
    await getDashboard(query)
      .then((res) => {
        setWeather({
          data: res,
          loading: false,
          error: false,
          missingId: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setWeather({ ...weather, data: {}, error: true, missingId: false });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboard(query);
        setWeather({ data: response, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
      }
    };

    if (query) fetchData();
  }, [query]);

  return (
    <div className="body-dashboard">
      <div className="Dashboard">
        <SearchEngine query={query} setQuery={setQuery} search={search} />

        {weather.loading && (
          <>
            <br />
            <br />
            <h4>Searching..</h4>
          </>
        )}

        {weather.error && !weather.missingId && (
          <>
            <br />
            <br />
            <span className="error-message">
              <span style={{ fontFamily: "font" }}>
                Sorry device not found, please try again.
              </span>
            </span>
          </>
        )}

        {!weather.error && weather.missingId && (
          <>
            <br />
            <br />
            <span className="block text-center text-[#f06789] text-[30px] font-bold mt-auto">
              <span style={{ fontFamily: "font" }}>Please select Device.</span>
            </span>
          </>
        )}

        {weather && weather.data && weather.data?.temperature && (
          <Forecast weather={weather} />
        )}

        {!weather.error &&
          !weather.missingId &&
          !weather.loading &&
          !weather?.data?.temperature &&
          !weather?.data?.humidity && (
            <>
              <br />
              <br />
              <span className="block text-center text-[#f06789] text-[30px] font-bold mt-auto">
                <span style={{ fontFamily: "font" }}>No Data.</span>
              </span>
            </>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
