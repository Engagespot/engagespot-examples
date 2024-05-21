import { EngagespotProvider } from '@engagespot/react-hooks';
import React, { useMemo } from 'react';

const UserContext = React.createContext('');
const SetUserContext = React.createContext(null);

export function useCurrentUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function useSetCurrentUser() {
  const context = React.useContext(SetUserContext);
  if (context === null) {
    throw new Error('useSetUser must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }) {
  const [userId, setUserId] = React.useState('hemanditwiz@gmail.com');

  const engagespotOptions = useMemo(() => {
    return {
      apiKey: '6lle29ey369dif42l5a7ne',
      userId,
      debug: true,
    };
  }, [userId]);

  return (
    <UserContext.Provider value={userId}>
      <SetUserContext.Provider value={setUserId}>
        <EngagespotProvider options={engagespotOptions}>{children}</EngagespotProvider>
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}
