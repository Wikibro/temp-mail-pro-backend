

// it is working good
import axios from 'axios';

export async function getMessages(token) {
  try {
    const response = await axios.get('https://api.mail.tm/messages?page=1', {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    const messages = response.data['hydra:member'] || 
                    response.data.value || 
                    response.data || 
                    [];

    return messages
      .filter(msg => msg && msg.id)
      .map(msg => ({
        id: msg.id,
        subject: msg.subject,
        from: msg.from,
        to: msg.to,
        createdAt: msg.createdAt || msg.date,
        hasContent: true
      }));
  } catch (err) {
    console.error('Mail fetch error:', err.response?.data || err.message);
    
    if (err.response?.status === 429) {
      console.warn('Rate limited, retrying after delay...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return getMessages(token);
    }
    
    if (err.response?.status === 401) {
      throw new Error('Token expired. Please create a new email address.');
    }
    
    throw new Error('Failed to fetch messages. ' + (err.response?.data?.detail || ''));
  }
}

export async function getMessageContent(token, messageId) {
  try {
    const response = await axios.get(`https://api.mail.tm/messages/${messageId}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return {
      html: response.data.html || response.data?.body?.html || '',
      text: response.data.text || response.data?.body?.text || '',
      ...response.data
    };
  } catch (err) {
    console.error('Message content error:', err.response?.data || err.message);
    return {
      html: '<p>Failed to load message content</p>',
      text: 'Failed to load message content'
    };
  }
}

// final

// import axios from 'axios';

// export async function getMessages(token) {
//   try {
//     const response = await axios.get('https://api.mail.tm/messages?page=1', {
//       headers: { 
//         Authorization: `Bearer ${token}`,
//         'Accept': 'application/json'
//       },
//       timeout: 10000
//     });

//     const messages = response.data['hydra:member'] || [];
//     return messages.map(msg => ({
//       id: msg.id,
//       subject: msg.subject,
//       from: msg.from,
//       to: msg.to,
//       createdAt: msg.createdAt
//     }));
//   } catch (err) {
//     console.error('Mail fetch error:', err.response?.data || err.message);
    
//     if (err.response?.status === 429) {
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       return getMessages(token);
//     }
    
//     if (err.response?.status === 401) {
//       throw new Error('Token expired. Please create a new email address.');
//     }
    
//     throw new Error('Failed to fetch messages. ' + (err.response?.data?.detail || ''));
//   }
// }

// export async function getMessageContent(token, messageId) {
//   try {
//     const response = await axios.get(`https://api.mail.tm/messages/${messageId}`, {
//       headers: { 
//         Authorization: `Bearer ${token}`,
//         'Accept': 'application/json'
//       },
//       timeout: 10000
//     });

//     return {
//       html: response.data.html || '',
//       text: response.data.text || '',
//       ...response.data
//     };
//   } catch (err) {
//     console.error('Message content error:', err.response?.data || err.message);
//     return {
//       html: '<p>Failed to load message content</p>',
//       text: 'Failed to load message content'
//     };
//   }
// }