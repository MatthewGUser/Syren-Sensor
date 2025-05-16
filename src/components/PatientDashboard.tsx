// import { useEffect, useState } from "react";
// import { User } from "../models/User";
import { useSettingsContext } from "../context/SettingsContext";
import syrenLogo from '../assets/syrensensor2.png'
import VitalsCard from "./VitalsCard";

export default function PatientDashboard() {
  const { settingsState } = useSettingsContext();
  // const [patient, setPatient] = useState<User>({
  //   userId: 0,
  //   name: {
  //     firstName: "",
  //     lastName: ""
  //   },
  //   age: 0,
  //   gender: "",
  //   height: "",
  //   weight: "",
  //   phoneNumber: "",
  //   primaryAddress: {
  //     buildingNumber: "",
  //     street: "",
  //     aptUnitNumber: "",
  //     zipCode: "",
  //     city: "",
  //     state: "",
  //     country: ""
  //   },
  // });

  // const [vitals, setVitals] = useState({
  //   vitalsId: 0,
  //   skinTemp: 0,
  //   pulse: 0,
  //   spO2: 0
  // });

  // useEffect(() => {
  //   setPatient({
  //     userId: Date.now(),
  //     name: {
  //       firstName: "John",
  //       lastName: "Doe"
  //     },
  //     age: 40,
  //     gender: "male",
  //     height: "72in",
  //     weight: "190 lbs.",
  //     phoneNumber: "123-456-7890",
  //     primaryAddress: {
  //       buildingNumber: "100",
  //       street: "main st.",
  //       aptUnitNumber: "PH4",
  //       zipCode: "12345",
  //       city: "Schenectady",
  //       state: "NY",
  //       country: "United States"
  //     }
  //   });
  //   setVitals({
  //     vitalsId: 1,
  //     skinTemp: 98,
  //     pulse: 70,
  //     spO2: 100
  //   });
  // }, []);

  return (
    <div aria-labelledby='dashboard-title' className="flex-1 bg-[#2b2b2c] min-h-screen overflow-y-auto px-4 py-6 mb-10">
      <div className="flex flex-col items-center justify-start">
        <h1 id='dashboard-title' className='sr-only'>Syren Sensor</h1>
        <img className='w-60 h-60 mb-6 mx-auto bg-[#2b2b2c]' alt="Syren Sensor Logo" src={syrenLogo}/> 
        <div className="flex-1 bg-black rounded-2xl border border-blue-500 shadow-lg px-12 py-16 max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto mb-10">
          <div aria-labelledby="patient-info-title">
            <h3 id='patient-info-title' className="text-white text-lg font-semibold mb-2">Patient Info:</h3>

            <p className="text-white mb-3 capitalize">
              <span className="font-semibold">Name:</span>{" "}
              <span className="font-normal">{`${settingsState.user.name.firstName} ${settingsState.user.name.lastName}`}</span>
            </p>
            <p className="text-white mb-3 capitalize">
              <span className="font-semibold">Age:</span>{" "}
              <span className="font-normal">{settingsState.user.age}</span>
            </p>
            <p className="text-white mb-3 capitalize">
              <span className="font-semibold">Gender:</span>{" "}
              <span className="font-normal">{settingsState.user.gender}</span>
            </p>
            <p className="text-white mb-3 capitalize">
              <span className="font-semibold">Height:</span>{" "}
              <span className="font-normal">{settingsState.user.height}</span>
            </p>
            <p className="text-white mb-3 capitalize">
              <span className="font-semibold">Weight:</span>{" "}
              <span className="font-normal">{settingsState.user.weight}</span>
            </p>
            </div>
          <div aria-labelledby="vitals-title" aria-live='polite'>
            <VitalsCard />
            
            {/* <h3 id="vitals-title" className="text-white text-lg font-semibold mt-6 mb-4">Patient Vitals:</h3>
            {Object.entries(settingsState.vitals).filter(([key])=> key !== 'vitalsId').map(([key, value]) => (
              <p key={key} className="text-white mb-3 capitalize">
                <span className="font-semibold">{key}:</span>
                <span className="font-normal">{Number(value)}</span>
              </p>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
