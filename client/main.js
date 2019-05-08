import {Username} from './modules/username.js'
import {Socket} from './modules/socket.js';
import {Messages} from './modules/messages.js';
import {MessagesForm} from './modules/message-form.js';
import {RoomForm} from './modules/room-form.js';
import {Rooms} from './modules/rooms.js';

document.addEventListener('DOMContentLoaded', () => {

    const socket = new Socket();
    const username = new Username('#username');
    const messages = new Messages('#messages', '#typingStatus', '#usersList');
    const messagesForm = new MessagesForm('#messageForm');
    const roomForm = new RoomForm('#room');
    const rooms = new Rooms('#rooms');

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

    socket.onOwnMessage(({status, name, message, date, dateId}) => {
        messages.renderOwnMessage(status, name, message, date, dateId);
    });

    messagesForm.onSubmit(message => {
        const name = username.getName();
        const date = new Date();
        const dateMs = Date.now();
        messages.renderOwnMessage('sending', name, message, date, dateMs);
        socket.emitChatMessage({message, date: dateMs});
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

    rooms.render();

    roomForm.onSubmit(room => {
        socket.emitRoomChange(room);
    });

    socket.onRoomChanged(room => {
        rooms.add(room);
        rooms.select(room);
        rooms.render();
        messages.clear();
    });

});
