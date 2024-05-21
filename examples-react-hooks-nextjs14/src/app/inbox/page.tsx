'use client';

import { EngagespotProvider } from '@engagespot/react-hooks';
import React from 'react';

import HomeComponent from '../../components/home';

export default function Inbox() {
   const apiKey = localStorage.getItem('apiKey');
   const userId = localStorage.getItem('userId');
   const baseUrl = localStorage.getItem('baseUrl');

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
