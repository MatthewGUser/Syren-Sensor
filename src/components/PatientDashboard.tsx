import { useEffect, useState } from "react";
import { User } from "../models/User";

export default function PatientDashboard() {
  const [patient, setPatient] = useState<User>({
    userId: 0,
    name: {
      firstName: "",
      lastName: ""
    },
    age: 0,
    gender: "",
    height: "",
    weight: "",
    phoneNumber: "",
    primaryAddress: {
      buildingNumber: "",
      street: "",
      aptUnitNumber: "",
      zipCode: "",
      city: "",
      state: "",
      country: ""
    },
  });

  const [vitals, setVitals] = useState({
    skinTemp: 0,
    pulse: 0,
    spO2: 0
  });

  useEffect(() => {
    setPatient({
      userId: Date.now(),
      name: {
        firstName: "John",
        lastName: "Doe"
      },
      age: 40,
      gender: "male",
      height: "72in",
      weight: "190 lbs.",
      phoneNumber: "123-456-7890",
      primaryAddress: {
        buildingNumber: "100",
        street: "main st.",
        aptUnitNumber: "PH4",
        zipCode: "12345",
        city: "Schenectady",
        state: "NY",
        country: "United States"
      }
    });
    setVitals({
      skinTemp: 98,
      pulse: 70,
      spO2: 100
    });
  }, []);

  return (
    <div className="flex-1 bg-gray-800 min-h-screen overflow-y-auto px-4 py-6">
      <div className="flex flex-col items-center justify-start">
        <h1 className="text-white text-3xl font-bold mb-6">Syren Sensor</h1>

        <div className="flex-1 bg-black rounded-2xl border border-blue-500 shadow-lg px-30 py-16 max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto">
          <h3 className="text-white text-lg font-semibold mb-2">Patient Info:</h3>

          <p className="text-white mb-3 capitalize">
            <span className="font-semibold">Name:</span>{" "}
            <span className="font-normal">{`${patient.name.firstName} ${patient.name.lastName}`}</span>
          </p>
          <p className="text-white mb-3 capitalize">
            <span className="font-semibold">Age:</span>{" "}
            <span className="font-normal">{patient.age}</span>
          </p>
          <p className="text-white mb-3 capitalize">
            <span className="font-semibold">Gender:</span>{" "}
            <span className="font-normal">{patient.gender}</span>
          </p>
          <p className="text-white mb-3 capitalize">
            <span className="font-semibold">Height:</span>{" "}
            <span className="font-normal">{patient.height}</span>
          </p>
          <p className="text-white mb-3 capitalize">
            <span className="font-semibold">Weight:</span>{" "}
            <span className="font-normal">{patient.weight}</span>
          </p>

          <h3 className="text-white text-lg font-semibold mt-6 mb-4">Patient Vitals:</h3>
          {Object.entries(vitals).map(([key, value]) => (
            <p key={key} className="text-white mb-3 capitalize">
              <span className="font-semibold">{key}:</span>
              <span className="font-normal">{value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
