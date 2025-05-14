import { NavLink } from 'react-router-dom';
import { IoPersonCircleOutline, IoSettingsOutline, IoCallOutline } from 'react-icons/io5';
import { useState } from 'react';

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEMS = () => {
    if (window.confirm('Do you want to call an EMS dispatcher?')) {
        // For web, we can trigger the call using a tel: URL
        window.location.href = 'tel:+15551234567'; // Use the appropriate number or allow user input for phone number
      }
    };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav role ='navigation' aria-label='footer nav bar' className="fixed bottom-0 left-0 w-full bg-[#2b2b2c] text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex justify-around w-full">
          <NavLink
            to="/dashboard"
            aria-label='Patient Dashboard'
            className={({ isActive }) =>
                `flex items-center space-x-2 text-white hover:text-emerald-500 ${isActive ? 'text-emerald-700' : ''}`
              }
          >
            <IoPersonCircleOutline size={24} aria-hidden='true' />
            <span>Patient Dashboard</span>
          </NavLink>

          <NavLink
            to="/settings"
            aria-label='Settings page'
            className={({ isActive }) =>
                `flex items-center space-x-2 text-white hover:text-emerald-500 ${isActive ? 'text-emerald-700' : ''}`
              }
            >
            <IoSettingsOutline size={24} aria-hidden='true'/>
            <span>Settings</span>
          </NavLink>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
              aria-label='Open EMS confirmation dialog box'
              aria-expanded={isModalOpen}
              aria-controls='ems-modal'
              aria-haspopup='dialog'          
          >
            <IoCallOutline size={24} aria-hidden='true'/>
            <span>Call EMS</span>
          </button>
        </div>
      </div>

      {/* Modal for EMS Confirmation */}
      {isModalOpen && (
        <div id='ems-modal' role='dialog' aria-modal='true' aria-labelledby='ems-modal-title' aria-describedby='ems-modal-description' className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 id='ems-modal-title' className="text-lg font-semibold">Emergency Activation</h2>
            <p id='ems-modal-description'>Do you want to call an EMS dispatcher?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={closeModal}
                className="text-black bg-gray-300 px-4 py-2 rounded-md"
                aria-label='Cancel EMS call'
              >
                Cancel
              </button>
              <button
                onClick={handleEMS}
                className="bg-red-700 text-white px-4 py-2 rounded-md"
                aria-label='Confirm and call EMS'
              >
                Call EMS
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
