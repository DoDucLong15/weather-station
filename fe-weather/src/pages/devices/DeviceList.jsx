import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteDevice } from "../../services/operations/deviceApi";

const DeviceList = () => {
  const navigate = useNavigate();
  const { devices } = useSelector((state) => state.device);
  const [listDevice, setListDevice] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (devices) setListDevice(devices);
  }, [devices]);

  if (!devices || devices.length === 0) return null;

  const handleDeleteDevice = (e, id) => {
    e.preventDefault();
    dispatch(deleteDevice(id, token));
  };

  const handleOnClick = (id) => {
    navigate(`/dashboard?id=${id}`);
  };

  return (
    <Fragment>
      {listDevice.map((device) => (
        <div
          className="flex items-center bg-gray-100 mb-10 shadow"
          key={device.id}
        >
          <button onClick={() => handleOnClick(device.id)}>
            <div className="flex-auto text-left px-4 py-2 m-2">
              <p className="text-gray-900 leading-none">{device?.deviceName}</p>
              <p className="text-gray-600">{device?.embedId}</p>
              <span className="inline-block text-sm font-semibold mt-1">
                {device?.location?.name}
              </span>
            </div>
          </button>
          <div className="flex-auto text-right px-4 py-2 m-2">
            {device && device?.owner === user?.email && (
              <>
                <Link to={`/edit-device/${device.id}`}>
                  <button
                    title="Edit"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-edit"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                </Link>
                <button
                  title="Remove"
                  onClick={(e) => handleDeleteDevice(e, device.id)}
                  className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-trash-2"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
                <Link to={`/shared-device/${device.id}`}>
                  <button
                    title="Share"
                    className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center"
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-share-2"
                    >
                      {" "}
                      <circle cx="18" cy="5" r="3"></circle>{" "}
                      <circle cx="6" cy="12" r="3"></circle>{" "}
                      <circle cx="18" cy="19" r="3"></circle>{" "}
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>{" "}
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>{" "}
                    </svg>{" "}
                  </button> 
                </Link>
              </>
            )}
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default DeviceList;
