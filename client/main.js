import {Username} from './modules/username.js'
import {Socket} from './modules/socket.js';
import {Messages} from './modules/messages.js';
import {MessagesForm} from './modules/message-form.js';

document.addEventListener('DOMContentLoaded', () => {

    const socket = new Socket();
    const username = new Username('#username');
    const messages = new Messages('#messages', '#typingStatus', '#usersList');
    const messagesForm = new MessagesForm('#messageForm');

    socket.onSetUsername(({name, date}) => {
        username.render(name, date);
        messages.renderSystemMessage(`<b>${name}</b> assigned to you.`, date);
    });

    socket.onUserJoined(({name, date}) => {
        messages.renderSystemMessage(`<b>${name}</b> joined.`, date);
    });

    socket.onUserChangeName(({name, newName, date}) => {
        messages.renderSystemMessage(`<b>${name}</b> change name to <b>${newName}</b>.`, date);
    });

    socket.onUserLeft(({name, date}) => {
        messages.renderSystemMessage(`${name} left.`, date)
    });

    socket.onChatMessage(({name, message, date}) => {
        messages.renderMessage(name, message, date);
    });

    socket.onOwnMessage(({status, name, message, date}) => {
        messages.renderOwnMessage(status, name, message, date);
    });

    messagesForm.onSubmit(message => {
        const name = username.getName();
        messages.renderOwnMessage('sending', name, message, new Date());
        socket.emitChatMessage(message);
    });

    messagesForm.onTyping(socket.emitTyping);

    socket.onTyping(({names, message, date}) => {
        messages.renderTyping(names, message, date);
    });

    messagesForm.onTyping(socket.onTyping);

    socket.onUsersList(({usersList}) => {
        const name = username.getName();
        messages.renderUsersList(usersList, name);
    });

    messagesForm.onChangeName(name => {
        username.setName(name);
        socket.emitChangingName(name);
    });

});
