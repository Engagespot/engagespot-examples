import axios from 'axios';

export const sendTestNotification = ({ userId, message }) => {
  const headers = {
    'X-ENGAGESPOT-API-KEY': '6lle29ey369dif42l5a7ne',
    'X-ENGAGESPOT-API-SECRET': '',
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
