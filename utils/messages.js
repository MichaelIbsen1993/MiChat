const moment = require('moment');

/**
 * Format the message, to something neat.
 * 
 * @param {users displayname} username 
 * @param {text message sent} message 
 */
function formatMessage(username, message) {
    return {
        username: username,
        text: message,
        sentAt: moment().format('h:mm a')
    };
}

module.exports = formatMessage;