import axios from 'axios';

export const sendTestNotification = ({
  userId,
  message,
}: {
  userId: string;
  message: string;
}) => {
  const headers = {
    'X-ENGAGESPOT-API-KEY': import.meta.env.VITE_API_KEY,
    'X-ENGAGESPOT-API-SECRET': import.meta.env.VITE_API_SECRET,
  };

  const data = {
    notification: {
      title: message,
    },
    sendTo: {
      recipients: [userId],
    },
  };

  return axios.post('https://api.engagespot.com/v3/notifications', data, {
    headers,
  });
};
