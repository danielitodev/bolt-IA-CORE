
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export default function SettingsModal() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user: UserProfile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Admin'
  };

  const closeModal = useCallback(() => {
    setIsProfileOpen(false);
    document.body.classList.remove('overflow-hidden');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isProfileOpen) {
      document.body.classList.add('overflow-hidden');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen, closeModal]);

  return (
    <div className="relative">
      {/* Profile Avatar */}
      <img
        src={user.avatar}
        alt="User avatar"
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={() => setIsProfileOpen(true)}
      />

      {/* Profile Modal */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
          onClick={closeModal}
          role="dialog"
          aria-hidden={!isProfileOpen}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            <div className="text-center">
              <img src={user.avatar} alt="User avatar" className="w-16 h-16 rounded-full mx-auto" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              <p className="text-gray-500 dark:text-gray-300">{user.role}</p>
            </div>

            <div className="mt-4 flex flex-col space-y-2">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Edit Profile
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-red-600 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Logout
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
