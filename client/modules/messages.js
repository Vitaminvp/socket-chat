import {renderDate} from "../helpers.js";

export class Messages {
    constructor(selectorNode, typingNode = '#typingStatus', usersNode) {
        this.node = document.querySelector(selectorNode);
        this.typing = document.querySelector(typingNode);
        this.users = document.querySelector(usersNode);
    }

    renderMessage = (username, message, date) => {
        const className = username === 'system' ? 'sysMessage' : '';
        console.log(className);
        this.node.insertAdjacentHTML('afterbegin', `<p class=${className}><b>[${username} <small>${renderDate(date)}</small>]</b> ${message}</p>`);
    };

    renderOwnMessage = (username, message, date) => {
        const className = 'ownMessage';
        this.node.insertAdjacentHTML('afterbegin', `<p class=${className}><b>[${username} <small>${renderDate(date)}</small>]</b> ${message}</p>`);
    };

    renderSystemMessage = (message, date) => {
        this.renderMessage('system', message, date);
    };

    renderTyping = (username, message) => {
        if (message) {
            this.typing.innerHTML = `<p><small>${username} is ${message}</small></p>`;
        }
        setTimeout(() => {
            this.typing.innerHTML = '';
        }, 2000);
    };

    renderUsersList = (usersList, name) => {
        this.users.innerHTML = "";
        const documentFragment = document.createDocumentFragment();

        Object.values(usersList).forEach(user => {
            let element = document.createElement("p");
            if (name && user === name) {
                element.innerHTML = `<b class="ownMessage">${user}</b>\n`;
            } else {
                element.innerHTML = `${user}\n`;
            }
            documentFragment.appendChild(element);
        });

        this.users.appendChild(documentFragment);
    }
}
