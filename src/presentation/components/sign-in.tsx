'use client';

import { signIn, useSession } from 'next-auth/react';

export default function SignIn() {
  const session = useSession();
  console.log('🚀 ~ SignIn ~ session:', session);
  return (
    <div className='flex flex-col w-full gap-4'>
      <button onClick={() => signIn('github')} className='bg-white text-black'>
        Sign in with Github
      </button>
      <button onClick={() => signIn('google')} className='bg-red-900'>
        Sign in with Google
      </button>
    </div>
  );
}
