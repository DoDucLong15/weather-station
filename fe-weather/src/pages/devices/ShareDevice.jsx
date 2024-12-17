import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { sharedDevice } from "../../services/operations/deviceApi";
import toast from "react-hot-toast";

function ShareDevice() {
  const { token } = useSelector((state) => state.auth);
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState("");
  const [device, setDevice] = useState(null);
  const [sharedMails, setSharedMails] = useState([]);
  const { id } = useParams();
  const { devices } = useSelector((state) => state.device);

  useEffect(() => {
    const deviceFind = devices.find((device) => device.id === Number(id));
    if (deviceFind) {
      setDevice(deviceFind);
      setSharedMails(deviceFind.sharedMails || []);
    }
  }, [id, devices]);

  const handleShareDevice = (newMails) => {
    disptach(sharedDevice(Number(id), newMails, token));
  };

  const handleGoBack = () => {
    navigate("/devices");
  };

  const handleDeleteEmail = (email) => {
    if (email && sharedMails.includes(email)) {
      const newMails = sharedMails.filter((e) => e !== email);
      setSharedMails(newMails);
      handleShareDevice(newMails);
    } else {
      toast.error('Email does not exist in sharedMails list')
    }
  };

  const handleAddEmail = () => {
    if (newEmail && !sharedMails.includes(newEmail)) {
      const newMails = [...sharedMails, newEmail];
      setSharedMails(newMails);
      handleShareDevice(newMails);
      setNewEmail("");
    } else {
      toast.error('Email already in sharedMails list')
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Share Device {device?.location?.name}
      </h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
          Shared Mails
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          {sharedMails?.length > 0 ? (
            <ul className="space-y-3">
              {sharedMails.map((email, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white text-sm font-bold rounded-full">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 font-medium">{email}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteEmail(email)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow transition duration-200"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No shared emails yet.</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <input
          type="email"
          placeholder="Enter email to share"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      <div className="flex justify-between space-x-4">
        <button
          onClick={() => handleAddEmail()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          Share
        </button>
        <button
          onClick={() => handleGoBack()}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ShareDevice;
