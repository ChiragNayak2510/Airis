'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && token != undefined) {
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
};

export default Auth;
