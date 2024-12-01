import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDevice } from "../../services/operations/deviceApi";

const AddDevice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [embedId, setEmbedId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createDevice({
      deviceName: name,
      embedId: embedId,
      location: {
        name: location
      }
    }, navigate))
  };

  return (
    <form
      className="w-full max-w-sm container mt-20 mx-auto"
      onSubmit={onSubmit}
    >
      <div className="w-full mb-5">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="deviceName"
        >
          Name of device
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter device name"
          required={true}
        />
      </div>
      <div className="w-full mb-5">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="embedId"
        >
          ID of device
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
          value={embedId}
          onChange={(e) => setEmbedId(e.target.value)}
          type="text"
          placeholder="Enter embed identify"
          required={true}
        />
      </div>
      <div className="w-full mb-5">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="location"
        >
          Location
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Enter location"
          required={true}
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="mt-5 bg-caribbeangreen-200 w-full hover:bg-green-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Device
        </button>
      </div>
      <div className="text-center mt-4 text-pure-greys-200">
        <Link to="/devices">Cancel</Link>
      </div>
    </form>
  );
};

export default AddDevice;
