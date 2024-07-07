import { EngagespotProvider } from '@engagespot/react-hooks';
import Tutorial from './components/tutorial/Tutorial';

function App() {
   return (
      <EngagespotProvider
         options={{
            userId: import.meta.env.VITE_ENGAGESPOT_USER_ID,
            apiKey: import.meta.env.VITE_ENGAGESPOT_API_KEY,
            itemsPerPage: 3,
         }}
      >
         <Tutorial />
      </EngagespotProvider>
   );
}

export default App;
