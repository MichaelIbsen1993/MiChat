const chatForm = document.getElementById('chatForm');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

/**
 * Add chatmessages..
 * 
 * @param {message sent from chat} message 
 */
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML =
        `<p class="chat-message">
        <span class="message-date">[${message.sentAt}]</span> 
        <span class="message-username">${message.username}:</span> 
        <br />
        <span class="message-text">${message.text}</span>
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// message caught by socket.io.
socket.on('message', message => {
    outputMessage(message);

    // scroll down.
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// handle when chat message has been sent.
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.chatMessage.value;

    socket.emit('chatMessage', msg);

    e.target.elements.chatMessage.value = '';
    e.target.elements.chatMessage.focus();
});