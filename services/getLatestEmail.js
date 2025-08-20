// services/getLatestEmail.js
const axios = require('axios');

const BASE_URL = 'https://api.mail.tm';

async function getToken(email, password) {
    const res = await axios.post(`${BASE_URL}/token`, {
        address: email,
        password: password
    });
    return res.data.token;
}

async function fetchLatestMessage(token) {
    const res = await axios.get(`${BASE_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const messages = res.data['hydra:member'];
    return messages.length ? messages[0] : null;
}

async function getEmailContent(token, id) {
    const res = await axios.get(`${BASE_URL}/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return {
        subject: res.data.subject,
        text: res.data.text,
        html: res.data.html
    };
}

async function waitForEmail(email, password, timeoutMs = 60000, checkInterval = 5000) {
    const token = await getToken(email, password);
    const startTime = Date.now();

    let seenMessageId = null;

    while (Date.now() - startTime < timeoutMs) {
        const latestMsg = await fetchLatestMessage(token);

        if (latestMsg && latestMsg.id !== seenMessageId) {
            // New email found
            return {
                success: true,
                ...await getEmailContent(token, latestMsg.id)
            };
        }

        await new Promise(resolve => setTimeout(resolve, checkInterval));
    }

    return { success: false, message: 'No new message received within timeout' };
}

module.exports = waitForEmail;
