import { EngagespotProvider } from '@engagespot/react-hooks';
import React, { useMemo } from 'react';

type UserProviderProps = {
  children: React.ReactNode;
};

const UserContext = React.createContext('');
const SetUserContext = React.createContext<React.Dispatch<any> | null>(null);

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

export function UserProvider({ children }: UserProviderProps) {
  const [userId, setUserId] = React.useState(import.meta.env.VITE_USER_ID);

  const engagespotOptions = useMemo(() => {
    return {
      apiKey: import.meta.env.VITE_API_KEY,
      userId,
      debug: true,
    };
  }, [userId]);

  return (
    <UserContext.Provider value={userId}>
      <SetUserContext.Provider value={setUserId}>
        <EngagespotProvider options={engagespotOptions}>
          {children}
        </EngagespotProvider>
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}
