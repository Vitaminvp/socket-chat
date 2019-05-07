import {Username} from './modules/username.js'
import {Socket} from './modules/socket.js';
import {Messages} from './modules/messages.js';
import {MessagesForm} from './modules/message-form.js';
import {UsersList} from './modules/users-list.js';

document.addEventListener('DOMContentLoaded', () => {

  const socket = new Socket();
  const username = new Username('#username');
  const messages = new Messages('#messages');
  const messagesForm = new MessagesForm('#messageForm');
  const usersList = new UsersList('#username');

  socket.onSetUsername(({name, date}) => {
    username.render(name, date);
    messages.renderSystemMessage(`${name} assigned to you.`, date);//at <small>${renderDate(date)}</small>
  });

  socket.onUserJoined(({name, date}) => {
    messages.renderSystemMessage(`${name} joined.`, date);// at <small> ${renderDate(date)}</small>
  });

  socket.onUserLeft(({name, date}) => {
    messages.renderSystemMessage(`${name} left.`, date)
  });

  socket.onChatMessage(({ name, message, date }) => {
    messages.renderMessage(name, message, date);
  });

  socket.onOwnMessage(({ name, message, date }) => {
    messages.renderOwnMessage(name, message, date);
  });

  messagesForm.onSubmit(socket.emitChatMessage);

  messagesForm.onTyping(socket.emitTyping);

  socket.onTyping(({ name, message, date }) => {
    messages.renderTyping(name, message, date);
  });

  messagesForm.onTyping(socket.onTyping);

  socket.onUsersList(({usersList, name}) => {
    usersList.render(usersList, name);
  } )
  //socket.close();
});
