'use client';

import { signOut } from 'next-auth/react';
import React from 'react';
const SignOutButton: React.FC = () => {
  const handleSignOut = async () => {
    await signOut({ redirectTo: '/login' });
  };
  return (
    <button
      onClick={handleSignOut}
      className='bg-white border h-10 rounded-2xl'
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
