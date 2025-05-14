import { useState, useEffect } from 'react';
// import { User } from '../models/User';
import { SubmitStatus } from '../models/SubmitStatus';
import { useSettingsContext } from '../context/SettingsContext';


export default function Settings() {
  const {
    settingsState,
    updateUser,
    updateEmergencyContact,
    updateBluetoothDevice,
    updateVitals
  } = useSettingsContext()

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    submitted: false,
    success: false,
    error: null,
  });
  const [vitalsStatus, setVitalsStatus] = useState<SubmitStatus>({
    submitted: false,
    success: false,
    error: null,
  });


  // const [user, setUser] = useState<User>({
  //   userId: 0,
  //   name: { firstName: '', lastName: '' },
  //   age: 0,
  //   gender: null,
  //   height: '',
  //   weight: '',
  //   phoneNumber: '',
  //   primaryAddress: {
  //     buildingNumber: '',
  //     street: '',
  //     aptUnitNumber: '',
  //     zipCode: '',
  //     city: '',
  //     state: '',
  //     country: '',
  //   },
  // });

  // const [emergencyContact, setEmergencyContact] = useState({
  //   contactId: 0,
  //   userId: 0,
  //   name: { firstName: '', lastName: '' },
  //   phoneNumber: '',
  //   relationship: '',
  // });

  // const [bluetoothDevice, setBluetoothDevice] = useState({
  //   deviceId: 0,
  //   serialNumber: '',
  //   deviceMake: '',
  //   deviceModel: '',
  // });

  //   const [vitals, setVitals] = useState({
  //   vitalsId: 0,
  //   skinTemp: 0,
  //   pulse: 0,
  //   spO2: 0
  // });

  const handleSubmit = () => {
    try {
      const userSubmit = JSON.stringify(settingsState.user);
      const emergencyContactSubmit = JSON.stringify(settingsState.emergencyContact);
      const bluetoothDeviceSubmit = JSON.stringify(settingsState.bluetoothDevice);

      // Replace with actual axios POST call to your API
      // axios.post('API_URL', { userSubmit, emergencyContactSubmit, bluetoothDeviceSubmit });
      console.log(userSubmit)
      console.log(emergencyContactSubmit)
      console.log(bluetoothDeviceSubmit)

      setSubmitStatus({
        submitted: true,
        success: true,
        error: null,
      });

      alert('Successfully submitted');
      console.log(submitStatus);
 
    } catch (err) {
      setSubmitStatus({
        submitted: true,
        success: false,
        error: (err as Error).message,
      });


      alert('There was an error saving your information.');
      console.error(submitStatus.error)
    }
  };

  const handleVitalsUpdate = () => {
     try {
      const vitalsSubmit = JSON.stringify(settingsState.vitals)
      // Replace with actual axios POST call to  API
      // axios.post('API_URL', { vitalsSubmit });
      console.log(vitalsSubmit)
      setVitalsStatus({
        submitted: true,
        success: true,
        error: null,
      });
      
      alert('Successfully updated vitals');
      console.log(vitalsStatus)

     } catch (err) {
        setVitalsStatus({
          submitted: true,
          success: false,
          error: (err as Error).message,
        })
        alert('There was an error saving your vitals.');
        console.error(vitalsStatus.error)
     }
      

  }

  useEffect(() => {
    const isFirstLoad = settingsState.user.userId === 0;
    if (isFirstLoad) {
    const generatedUserId = Date.now();
    updateUser({...settingsState.user, userId:generatedUserId})
    updateEmergencyContact({
      ...settingsState.emergencyContact,
      userId: generatedUserId,
      contactId: generatedUserId +1
    });
    updateBluetoothDevice({...settingsState.bluetoothDevice, deviceId: generatedUserId+2});
    updateVitals({...settingsState.vitals, vitalsId: generatedUserId +3});
  }
    // const generatedContactId = generatedUserId + 1;
    // const generatedDeviceId = generatedUserId + 2;
    // const generatedVitalsId = generatedUserId + 3;
    // setUser((prev) => ({ ...prev, userId: generatedUserId }));
    // setEmergencyContact((prev) => ({ ...prev, userId: generatedUserId, contactId: generatedContactId }));
    // setBluetoothDevice((prev) => ({ ...prev, deviceId: generatedDeviceId }));
    // setVitals((prev) => ({...prev, vitalsId: generatedVitalsId}))
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
            value={settingsState.user.name.firstName}
            onChange={(e) => updateUser({ ...settingsState.user, name: { ...settingsState.user.name, firstName: e.target.value } })}
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Last Name"
            value={settingsState.user.name.lastName}
            onChange={(e) => updateUser({ ...settingsState.user, name: { ...settingsState.user.name, lastName: e.target.value } })}
          />
          <input
            type="number"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Age"
            value={settingsState.user.age || ''}
            onChange={(e) => updateUser({ ...settingsState.user, age: Number(e.target.value) })}
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
                  checked={settingsState.user.gender === option}
                  onChange={() => updateUser({ ...settingsState.user, gender: option })}
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
            value={settingsState.user.weight}
            onChange={(e) => updateUser({ ...settingsState.user, weight: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Height"
            value={settingsState.user.height}
            onChange={(e) => updateUser({ ...settingsState.user, height: e.target.value })}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Phone Number"
            value={settingsState.user.phoneNumber}
            onChange={(e) => updateUser({ ...settingsState.user, phoneNumber: e.target.value })}
          />
           <div className="flex flex-col mb-6">
            <h2 className="text-white text-xl font-bold mb-2">Primary Address</h2>
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Building Number"
            value={settingsState.user.primaryAddress.buildingNumber}
            onChange={(e) => updateUser({ ...settingsState.user, primaryAddress: {...settingsState.user.primaryAddress, buildingNumber: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Street"
            value={settingsState.user.primaryAddress.street}
            onChange={(e) => updateUser({ ...settingsState.user, primaryAddress: {...settingsState.user.primaryAddress, street: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Apt/Unit Number"
            value={settingsState.user.primaryAddress.aptUnitNumber}
            onChange={(e) => updateUser({ ...settingsState.user, primaryAddress: {...settingsState.user.primaryAddress, aptUnitNumber: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="City"
            value={settingsState.user.primaryAddress.city}
            onChange={(e) => updateUser({ ...settingsState.user, primaryAddress: {...settingsState.user.primaryAddress, city: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="State"
            value={settingsState.user.primaryAddress.state}
            onChange={(e) => updateUser({ ...settingsState.user, primaryAddress: {...settingsState.user.primaryAddress, state: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Zip/Postage Code"
            value={settingsState.user.primaryAddress.zipCode}
            onChange={(e) => updateUser({ ...settingsState.user, primaryAddress: {...settingsState.user.primaryAddress, zipCode: e.target.value }})}
          />
            <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Country"
            value={settingsState.user.primaryAddress.country}
            onChange={(e) => updateUser({ ...settingsState.user, primaryAddress: {...settingsState.user.primaryAddress, country: e.target.value }})}
          />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-2">Emergency Contact Info</h2>
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Emergency Contact First Name"
            value={settingsState.emergencyContact.name.firstName}
            onChange={(e) =>
              updateEmergencyContact({ ...settingsState.emergencyContact, name: { ...settingsState.emergencyContact.name, firstName: e.target.value } })
            }
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Emergency Contact Last Name"
            value={settingsState.emergencyContact.name.lastName}
            onChange={(e) =>
              updateEmergencyContact({ ...settingsState.emergencyContact, name: { ...settingsState.emergencyContact.name, lastName: e.target.value } })
            }
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Emergency Contact Phone Number"
            value={settingsState.emergencyContact.phoneNumber}
            onChange={(e) => updateEmergencyContact({ ...settingsState.emergencyContact, phoneNumber: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Emergency Contact Relationship"
            value={settingsState.emergencyContact.relationship}
            onChange={(e) => updateEmergencyContact({ ...settingsState.emergencyContact, relationship: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-2">Bluetooth Device Details</h2>
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Device Serial Number"
            value={settingsState.bluetoothDevice.serialNumber}
            onChange={(e) => updateBluetoothDevice({ ...settingsState.bluetoothDevice, serialNumber: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Device Manufacturer/Make"
            value={settingsState.bluetoothDevice.deviceMake}
            onChange={(e) => updateBluetoothDevice({ ...settingsState.bluetoothDevice, deviceMake: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Device Model"
            value={settingsState.bluetoothDevice.deviceModel}
            onChange={(e) => updateBluetoothDevice({ ...settingsState.bluetoothDevice, deviceModel: e.target.value })}
          />
        </div>

        <button
          className="w-full p-3 bg-green-600 rounded text-white font-bold mb-10"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="my-6">
          <h2 className="text-white text-xl font-bold mb-2">Vitals Manual Input</h2>
          <label htmlFor="spO2" className="block text-white font-semibold mb-1">
          Oxygen Saturation (SpO2 %)
          </label>
          <input
            id="spO2"
            type="number"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Oxygen Saturation (SpO2)"
            value={settingsState.vitals.spO2 || ''}
            onChange={(e) =>
              updateVitals({ ...settingsState.vitals, spO2: Number(e.target.value) })
            }
          />
          <label htmlFor="skinTemp" className="block text-white font-semibold mb-1">
          Skin Temperature (°F)
          </label>
          <input
            id="skinTemp"
            type="number"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Skin Temperature"
            value={settingsState.vitals.skinTemp || ''}
            onChange={(e) =>
              updateVitals({...settingsState.vitals, skinTemp: Number(e.target.value) })
            }
          />
          <label htmlFor="pulse" className="block text-white font-semibold mb-1">
          Pulse (BPM)
          </label>
          <input
            id="pulse"
            type="text"
            className="w-full p-3 bg-gray-200 text-blue-700 rounded mb-4  focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-emerald-600 placeholder:opacity-90"
            placeholder="Heart Rate/Pulse"
            value={settingsState.vitals.pulse || ''}
            onChange={(e) => updateVitals({ ...settingsState.vitals, pulse: Number(e.target.value) })}
          /> 
          
        <button
          className="w-full p-3 bg-green-600 rounded text-white font-bold mb-10"
          onClick={handleVitalsUpdate}
        >
          Update Vitals
        </button>
        </div>
      </div>
    </div>
  );
}
