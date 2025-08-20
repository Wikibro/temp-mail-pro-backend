



// it is working good

// import axios from 'axios';

// const API_BASE = 'https://api.mail.tm';

// export async function createAccount() {
//   // Get available domain first
//   let domain;
//   try {
//     const domainRes = await axios.get(`${API_BASE}/domains?page=1`);
//     const domains = domainRes.data['hydra:member'];
//     if (!domains || domains.length === 0) {
//       throw new Error('No domains available from Mail.tm');
//     }
//     domain = domains[0].domain;
//   } catch (error) {
//     console.error('Domain fetch error:', error.message);
//     throw new Error('Failed to get domain from Mail.tm API');
//   }

//   for (let i = 0; i < 3; i++) {
//     try {
//       const random = Math.random().toString(36).substring(2, 12);
//       const address = `${random}@${domain}`;
//       const password = generateSecurePassword();

//       // Create account
//       await axios.post(`${API_BASE}/accounts`, {
//         address,
//         password,
//       });

//       // Get token
//       const tokenRes = await axios.post(`${API_BASE}/token`, {
//         address,
//         password,
//       });
      
//       if (!tokenRes.data.token) {
//         throw new Error('Token not received from Mail.tm');
//       }
      
//       return { 
//         address, 
//         token: tokenRes.data.token
//       };
//     } catch (error) {
//       if (error.response?.status !== 422) {
//         console.error(`Account creation attempt ${i+1} failed:`, error.message);
//         if (i === 2) throw error;
//       }
//     }
//   }
//   throw new Error('Account creation failed after 3 attempts');
// }

// function generateSecurePassword() {
//   const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
//   const lowercase = 'abcdefghjkmnpqrstuvwxyz';
//   const numbers = '23456789';
//   const symbols = '!@#$%^&*';
  
//   const chars = [
//     uppercase[Math.floor(Math.random() * uppercase.length)],
//     lowercase[Math.floor(Math.random() * lowercase.length)],
//     numbers[Math.floor(Math.random() * numbers.length)],
//     symbols[Math.floor(Math.random() * symbols.length)],
//   ];
  
//   const allChars = uppercase + lowercase + numbers + symbols;
//   for (let i = 0; i < 8; i++) {
//     chars.push(allChars[Math.floor(Math.random() * allChars.length)]);
//   }
  
//   return chars
//     .sort(() => Math.random() - 0.5)
//     .join('');
// }

// final code

// import axios from 'axios';
// const api = axios.create({
//   baseURL: 'https://api.mail.tm',
//   timeout: 30000, // 30 seconds instead of 10
// });
// const API_BASE = 'https://api.mail.tm';

// export async function createAccount() {
//   let domain;
//   try {
//     const domainRes = await axios.get(`${API_BASE}/domains?page=1`);
//     const domains = domainRes.data['hydra:member'];
//     if (!domains || domains.length === 0) {
//       throw new Error('No domains available from Mail.tm');
//     }
//     domain = domains[0].domain;
//   } catch (error) {
//     console.error('Domain fetch error:', error.message);
//     throw new Error('Failed to get domain from Mail.tm API');
//   }

//   for (let i = 0; i < 3; i++) {
//     try {
//       const random = Math.random().toString(36).substring(2, 12);
//       const address = `${random}@${domain}`;
//       const password = generateSecurePassword();

//       await axios.post(`${API_BASE}/accounts`, { address, password });
      
//       const tokenRes = await axios.post(`${API_BASE}/token`, { 
//         address, 
//         password 
//       });
      
//       return { address, token: tokenRes.data.token };
//     } catch (error) {
//       if (error.response?.status !== 422) {
//         console.error(`Attempt ${i+1} failed:`, error.message);
//         if (i === 2) throw error;
//       }
//     }
//   }
//   throw new Error('Account creation failed after 3 attempts');
// }

// function generateSecurePassword() {
//   const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
//   const lowercase = 'abcdefghjkmnpqrstuvwxyz';
//   const numbers = '23456789';
//   const symbols = '!@#$%^&*';
  
//   const chars = [
//     uppercase[Math.floor(Math.random() * uppercase.length)],
//     lowercase[Math.floor(Math.random() * lowercase.length)],
//     numbers[Math.floor(Math.random() * numbers.length)],
//     symbols[Math.floor(Math.random() * symbols.length)],
//   ];
  
//   const allChars = uppercase + lowercase + numbers + symbols;
//   for (let i = 0; i < 8; i++) {
//     chars.push(allChars[Math.floor(Math.random() * allChars.length)]);
//   }
  
//   return chars.sort(() => Math.random() - 0.5).join('');
// }

import axios from 'axios';
const api = axios.create({
  baseURL: 'https://api.mail.tm',
  timeout: 30000, // 30 seconds instead of 10
});
const API_BASE = 'https://api.mail.tm';

export async function createAccount() {
  let domain;
  try {
    const domainRes = await axios.get(`${API_BASE}/domains?page=1`);
    const domains = domainRes.data['hydra:member'];
    if (!domains || domains.length === 0) {
      throw new Error('No domains available from Mail.tm');
    }
    domain = domains[0].domain;
  } catch (error) {
    console.error('Domain fetch error:', error.message);
    throw new Error('Failed to get domain from Mail.tm API');
  }

  for (let i = 0; i < 3; i++) {
    try {
      const username = generateReadableUsername(); // 👈 custom username generator
      const address = `${username}@${domain}`;
      const password = generateSecurePassword();

      await axios.post(`${API_BASE}/accounts`, { address, password });
      
      const tokenRes = await axios.post(`${API_BASE}/token`, { 
        address, 
        password 
      });
      
      return { address, token: tokenRes.data.token };
    } catch (error) {
      if (error.response?.status !== 422) {
        console.error(`Attempt ${i+1} failed:`, error.message);
        if (i === 2) throw error;
      }
    }
  }
  throw new Error('Account creation failed after 3 attempts');
}

function generateSecurePassword() {
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowercase = 'abcdefghjkmnpqrstuvwxyz';
  const numbers = '23456789';
  const symbols = '!@#$%^&*';
  
  const chars = [
    uppercase[Math.floor(Math.random() * uppercase.length)],
    lowercase[Math.floor(Math.random() * lowercase.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];
  
  const allChars = uppercase + lowercase + numbers + symbols;
  for (let i = 0; i < 8; i++) {
    chars.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }
  
  return chars.sort(() => Math.random() - 0.5).join('');
}

// 👇 New function: readable usernames like "visitor4pjk"
function generateReadableUsername() {
  const prefixes = ["visitor", "guest", "user", "mailbox", "temp"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const random = Math.random().toString(36).substring(2, 6); // short random part
  return `${prefix}${random}`;
}
