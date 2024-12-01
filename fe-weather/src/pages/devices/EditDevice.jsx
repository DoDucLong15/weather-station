import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateDevice } from "../../services/operations/deviceApi";

const EditDevice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { devices } = useSelector((state) => state.device);
  const { id } = useParams();
  const [selectedDevice, setSeletedDevice] = useState({
    id: null,
    deviceName: "",
    embedId: "",
    location: "",
  });

  useEffect(() => {
    const device = devices.find((device) => device.id === Number(id));
    setSeletedDevice({
      id: device?.id,
      deviceName: device?.deviceName,
      embedId: device?.embedId,
      location: device?.location?.name,
    });
  }, [id, devices]);

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateDevice({
        id: selectedDevice.id,
        deviceName: selectedDevice.deviceName,
        embedId: selectedDevice.embedId,
        location: {
          name: selectedDevice.location,
        },
      }, navigate)
    );
  };

  const handleOnChange = (userKey, value) =>
    setSeletedDevice({
      ...selectedDevice,
      [userKey]: value,
    });

  if (!selectedDevice || !selectedDevice.id) return <div>Device not found</div>;

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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
          value={selectedDevice.deviceName}
          onChange={(e) => handleOnChange("deviceName", e.target.value)}
          type="text"
          placeholder="Enter device name"
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
          value={selectedDevice.embedId}
          onChange={(e) => handleOnChange("embedId", e.target.value)}
          type="text"
          placeholder="Enter embed identify"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
          value={selectedDevice.location}
          onChange={(e) => handleOnChange("location", e.target.value)}
          type="text"
          placeholder="Enter location"
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="block mt-5 bg-caribbeangreen-200 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
          Edit Device
        </button>
      </div>
      <div className="text-center mt-4 text-pure-greys-200">
        <Link to="/devices">Cancel</Link>
      </div>
    </form>
  );
};

export default EditDevice;
