import { NavLink } from 'react-router-dom';
import { IoPersonCircleOutline, IoSettingsOutline, IoCallOutline, IoLogOutOutline } from 'react-icons/io5';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useSettingsContext } from '../context/SettingsContext'; // ✅ import global context

export default function NavBar() {
  const { signOut } = useAuthenticator();
  const { setSettingsState } = useSettingsContext(); // ✅ use context setter

  return (
    <nav role="navigation" aria-label="footer nav bar" className="fixed bottom-0 left-0 w-full bg-[#2b2b2c] text-white p-4 z-40">
      <div className="flex justify-between items-center">
        <div className="flex justify-around w-full space-x-4">
          <NavLink
            to="/dashboard"
            aria-label="Patient Dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-white hover:text-emerald-500 ${isActive ? 'text-emerald-700' : ''}`
            }
          >
            <IoPersonCircleOutline size={24} aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/settings"
            aria-label="Settings page"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-white hover:text-emerald-500 ${isActive ? 'text-emerald-700' : ''}`
            }
          >
            <IoSettingsOutline size={24} aria-hidden="true" />
            <span>Settings</span>
          </NavLink>

          {/* ✅ Replace local modal with global EMS modal trigger */}
          <button
            onClick={() =>
              setSettingsState((prev) => ({
                ...prev,
                emsModalOpen: true,
                emsTriggeredManually: true,
              }))
            }
            className="flex items-center space-x-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            aria-label="Open EMS confirmation dialog box"
            aria-haspopup="dialog"
          >
            <IoCallOutline size={24} aria-hidden="true" />
            <span>Call EMS</span>
          </button>

          {/* ✅ Sign Out Button */}
          <button
            onClick={signOut}
            className="flex items-center space-x-2 text-white bg-[#2b2b2c] px-4 py-2 rounded-lg"
            aria-label="Sign out of account"
          >
            <IoLogOutOutline size={24} aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
