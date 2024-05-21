'use client';

import { EngagespotProvider } from '@engagespot/react-hooks';
import React from 'react';

import HomeComponent from '../../components/home';

 function getItemFromLocalStorage(key: string) {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(key);
}

export default function Inbox() {
   const apiKey = getItemFromLocalStorage('apiKey');
   const userId = getItemFromLocalStorage('userId')
   const baseUrl = getItemFromLocalStorage('baseUrl')

   return (
      <>
         {baseUrl && userId && apiKey && (
            <EngagespotProvider
               options={{
                  baseUrl,
                  userId,
                  apiKey,
                  itemsPerPage: 7,
               }}
            >
               <HomeComponent />
            </EngagespotProvider>
         )}
      </>
   );
}
