/* global io */

export class Socket {
    constructor(){
        this.socket = io();
    }

    onSetUsername = handler => {
        this.socket.on('set username', handler);
    };
    onUserJoined= handler => {
        this.socket.on('user joined', handler);
    };


    onUserLeft= handler => {
        this.socket.on('user left', handler);
    };

    emitChatMessage = message => {
        this.socket.emit('chat message', message);
    };

    onChatMessage = handler => {
        this.socket.on('chat message', handler);
    };

    onOwnMessage = handler => {
        this.socket.on('own message', handler);
    };

    emitTyping = message => {
        this.socket.emit('typing', message);
    };

    onTyping = handler => {
        this.socket.on('typing', handler);
    };



}