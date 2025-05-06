import { useState, useEffect } from 'react';
import { User } from '../models/User';
import { SubmitStatus } from '../models/SubmitStatus';


export default function Settings() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    submitted: false,
    success: false,
    error: null,
  });

  const [user, setUser] = useState<User>({
    userId: 0,
    name: { firstName: '', lastName: '' },
    age: 0,
    gender: null,
    height: '',
    weight: '',
    phoneNumber: '',
    primaryAddress: {
      buildingNumber: '',
      street: '',
      aptUnitNumber: '',
      zipCode: '',
      city: '',
      state: '',
      country: '',
    },
  });

  const [emergencyContact, setEmergencyContact] = useState({
    contactId: 0,
    userId: 0,
    name: { firstName: '', lastName: '' },
    phoneNumber: '',
    relationship: '',
  });

  const [bluetoothDevice, setBluetoothDevice] = useState({
    deviceId: 0,
    serialNumber: '',
    deviceMake: '',
    deviceModel: '',
  });

  const handleSubmit = () => {
    try {
      const userSubmit = JSON.stringify(user);
      const emergencyContactSubmit = JSON.stringify(emergencyContact);
      const bluetoothDeviceSubmit = JSON.stringify(bluetoothDevice);

      // Replace with actual axios POST call to your API
      // axios.post('API_URL', { userSubmit, emergencyContactSubmit, bluetoothDeviceSubmit });

      setSubmitStatus({
        submitted: true,
        success: true,
        error: null,
      });

      alert('Successfully submitted');
      console.log(userSubmit)
      console.log(emergencyContactSubmit)
      console.log(bluetoothDeviceSubmit)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setSubmitStatus({
        submitted: true,
        success: false,
        error: errorMessage as string | null,
      });

      alert('There was an error saving your information.');
    }
  };

  useEffect(() => {
    const generatedUserId = Date.now();
    const generatedContactId = generatedUserId + 1;
    const generatedDeviceId = generatedUserId + 2;
    setUser((prev) => ({ ...prev, userId: generatedUserId }));
    setEmergencyContact((prev) => ({ ...prev, userId: generatedUserId, contactId: generatedContactId }));
    setBluetoothDevice((prev) => ({ ...prev, deviceId: generatedDeviceId }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 p-6 flex flex-col items-center justify-start">
              <h1 className="text-white text-3xl font-bold mb-6">Syren Sensor</h1>
      <div className="max-w-2xl mx-auto bg-black p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-2">User Info</h2>
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="First Name"
            value={user.name.firstName}
            onChange={(e) => setUser({ ...user, name: { ...user.name, firstName: e.target.value } })}
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Last Name"
            value={user.name.lastName}
            onChange={(e) => setUser({ ...user, name: { ...user.name, lastName: e.target.value } })}
          />
          <input
            type="number"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Age"
            value={user.age || ''}
            onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
          />

          <h2 className="text-white text-xl font-bold mb-2">Gender</h2>
          <div className="flex flex-col mb-6">
            {['Male', 'Female', 'Non-Binary', 'Prefer Not to Say'].map((option) => (
              <div key={option} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={option}
                  name="gender"
                  value={option}
                  checked={user.gender === option}
                  onChange={() => setUser({ ...user, gender: option })}
                  className="mr-2"
                />
                <label htmlFor={option} className="text-white">{option}</label>
              </div>
            ))}
          </div>

          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Weight"
            value={user.weight}
            onChange={(e) => setUser({ ...user, weight: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Height"
            value={user.height}
            onChange={(e) => setUser({ ...user, height: e.target.value })}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Phone Number"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          />
           <div className="flex flex-col mb-6">
            <h2 className="text-white text-xl font-bold mb-2">Primary Address</h2>
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Building Number"
            value={user.primaryAddress.buildingNumber}
            onChange={(e) => setUser({ ...user, primaryAddress: {...user.primaryAddress, buildingNumber: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Street"
            value={user.primaryAddress.street}
            onChange={(e) => setUser({ ...user, primaryAddress: {...user.primaryAddress, street: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Apt/Unit Number"
            value={user.primaryAddress.aptUnitNumber}
            onChange={(e) => setUser({ ...user, primaryAddress: {...user.primaryAddress, aptUnitNumber: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="City"
            value={user.primaryAddress.city}
            onChange={(e) => setUser({ ...user, primaryAddress: {...user.primaryAddress, city: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="State"
            value={user.primaryAddress.state}
            onChange={(e) => setUser({ ...user, primaryAddress: {...user.primaryAddress, state: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Zip/Postage Code"
            value={user.primaryAddress.zipCode}
            onChange={(e) => setUser({ ...user, primaryAddress: {...user.primaryAddress, zipCode: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Country"
            value={user.primaryAddress.country}
            onChange={(e) => setUser({ ...user, primaryAddress: {...user.primaryAddress, country: e.target.value }})}
          />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-2">Emergency Contact Info</h2>
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Emergency Contact First Name"
            value={emergencyContact.name.firstName}
            onChange={(e) =>
              setEmergencyContact({ ...emergencyContact, name: { ...emergencyContact.name, firstName: e.target.value } })
            }
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Emergency Contact Last Name"
            value={emergencyContact.name.lastName}
            onChange={(e) =>
              setEmergencyContact({ ...emergencyContact, name: { ...emergencyContact.name, lastName: e.target.value } })
            }
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Emergency Contact Phone Number"
            value={emergencyContact.phoneNumber}
            onChange={(e) => setEmergencyContact({ ...emergencyContact, phoneNumber: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Emergency Contact Relationship"
            value={emergencyContact.relationship}
            onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-2">Bluetooth Device Details</h2>
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Device Serial Number"
            value={bluetoothDevice.serialNumber}
            onChange={(e) => setBluetoothDevice({ ...bluetoothDevice, serialNumber: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Device Manufacturer/Make"
            value={bluetoothDevice.deviceMake}
            onChange={(e) => setBluetoothDevice({ ...bluetoothDevice, deviceMake: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Device Model"
            value={bluetoothDevice.deviceModel}
            onChange={(e) => setBluetoothDevice({ ...bluetoothDevice, deviceModel: e.target.value })}
          />
        </div>

        <button
          className="w-full p-3 bg-green-600 rounded text-white font-bold mb-10"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
