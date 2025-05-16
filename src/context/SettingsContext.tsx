import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { User } from "../models/User";
import { Vitals } from "../models/Vitals";
import { Auth } from 'aws-amplify'

// Define the initial structure of the settings state
interface SettingsState {
  user: User;
  emergencyContact: any;
  bluetoothDevice: any;
  vitals: Vitals;
  emsModalOpen: boolean;
  emsTriggeredManually: boolean;
}

// Initialize the default state structure
const defaultState: SettingsState = {

  user: {
    userId: 0,
    name: { firstName: "", lastName: "" },
    age: 0,
    gender: null,
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
      country: "",
    },
  },
  emergencyContact: {
    contactId: 0,
    userId: 0,
    name: { firstName: "", lastName: "" },
    phoneNumber: "",
    relationship: "",
  },
  bluetoothDevice: {
    deviceId: 0,
    serialNumber: "",
    deviceMake: "",
    deviceModel: "",
  },
  vitals: {
    vitalsId: 0,
    skinTemp: 98,
    pulse: 70,
    spO2: 100,
  },
  emsModalOpen: false,
  emsTriggeredManually: false,
};

// Create context with default value
const SettingsContext = createContext<SettingsState | any>(defaultState);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settingsState, setSettingsState] = useState<SettingsState>(defaultState);
  const [emsTimeoutId, setEmsTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Function to update user data
  const updateUser = (updatedUser: User) => {
    setSettingsState((prevState: SettingsState) => ({
      ...prevState,
      user: updatedUser,
    }));
  };

  // Function to update emergency contact data
  const updateEmergencyContact = (updatedContact: any) => {
    setSettingsState((prevState: SettingsState) => ({
      ...prevState,
      emergencyContact: updatedContact,
    }));
  };

  // Function to update bluetooth device data
  const updateBluetoothDevice = (updatedDevice: any) => {
    setSettingsState((prevState: SettingsState) => ({
      ...prevState,
      bluetoothDevice: updatedDevice,
    }));
  };

  // Function to update vitals data
  const updateVitals = (updatedVitals: Vitals) => {
    setSettingsState((prevState: SettingsState) => ({
      ...prevState,
      vitals: updatedVitals,
    }));
  };

    const fetchUserData = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      const res = await fetch(
        "https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/users/123",
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );
      if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
      const data: User = await res.json();
      console.log("got user payload", data);
      updateUser(data);
    } catch (err) {
      console.error("fetchUserData error:", err);
    }
  };

  const handleCallEMS = () => {
    setSettingsState((prev) => ({ ...prev, emsModalOpen: false,
      emsTriggeredManually: false,
    }));
    window.location.href = 'tel:+15551234567';
  }
  const handleCancelEMS = () => {
    setSettingsState((prev) => ({ ...prev, emsModalOpen: false,
      emsTriggeredManually: false,
     }));
    if (emsTimeoutId) {
        clearTimeout(emsTimeoutId);
        setEmsTimeoutId(null);
    }
  };

    useEffect(() => {
    fetchUserData();
  }, []); // <-- empty deps: only on first load

  
  const location = useLocation()


  useEffect(()=> {
    const { skinTemp, pulse, spO2 } = settingsState.vitals;

    const shouldCallEMS = skinTemp < 95 || skinTemp > 105 || spO2 <= 90 || pulse < 30 || pulse > 220;
   
    if (shouldCallEMS && !settingsState.emsModalOpen) {
        setSettingsState((prev) => ({ ...prev, emsModalOpen: true}));

        const timeout = setTimeout(()=> {
            handleCallEMS();
        }, 60000); //Auto-call after 1 min
        setEmsTimeoutId(timeout);
        }
        if (!shouldCallEMS && settingsState.emsModalOpen) {
            handleCancelEMS();
            //cancels timer and modal if vitals stabilize
        }
        return() => {
            if (emsTimeoutId) {
                clearTimeout(emsTimeoutId);
                setEmsTimeoutId(null);
            }
        };
    }, [settingsState.vitals, location.pathname]);


  return (
    <SettingsContext.Provider
      value={{
        settingsState,
        setSettingsState,
        updateUser,
        updateEmergencyContact,
        updateBluetoothDevice,
        updateVitals,
        handleCallEMS,
        handleCancelEMS
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the settings context
export const useSettingsContext = () => useContext(SettingsContext);
