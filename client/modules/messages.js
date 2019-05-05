import {renderDate} from "../helpers.js";

export class Messages{
    constructor(selectorNode, typing = '#typingStatus'){
        this.node = document.querySelector(selectorNode);
        this.typing = document.querySelector(typing);
    }

    renderMessage = (username, message, date) => {
        this.node.innerHTML += `<p><b>[${username} <small>${renderDate(date)}</small>]</b> ${message}</p>`;
    };

    renderOwnMessage = (username, message, date) => {
        this.node.innerHTML += `<p><b class="ownMessage">[${username} <small>${renderDate(date)}</small>]</b> ${message}</p>`;
    };

    renderSystemMessage = (message, date) => {
        this.renderMessage('system', message, date);
    };

    renderTyping = (username, message) => {
        if(message){
            this.typing.innerHTML = `<p><small>${username} is ${message}</small></p>`;
        }
        setTimeout(()=>{
            this.typing.innerHTML = '';
        }, 12000);
    }
}