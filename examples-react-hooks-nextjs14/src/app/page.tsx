'use client';

import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { SigninForm } from '@/components/form';

export default function Home() {
  return (
    <>
      <SigninForm />
      <Toaster />
    </>
  );
}
