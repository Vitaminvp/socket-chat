import {renderDate} from "../helpers.js";

export class Messages {
    constructor(selectorNode, typingNode = '#typingStatus', usersNode) {
        this.node = document.querySelector(selectorNode);
        this.typing = document.querySelector(typingNode);
        this.users = document.querySelector(usersNode);
        this.message = '';
    }

    renderMessage = (username, message, date) => {
        const className = username === 'system' ? 'sysMessage' : '';
        this.node.insertAdjacentHTML('beforeend', `<p class=${className}><b>[${username} <small>${renderDate(date)}</small>]</b> ${message}</p>`);
    };

    renderOwnMessage = (status, username, message, date) => {
        const className = 'ownMessage';
        const myMessage = `<span class=${className}><b>[${username} <small>${renderDate(date)}</small>]</b> ${message} </span>`;
        if (status === 'delivered') {
            const ownMessage = document.createElement('div');
            const status = '<small class="status">delivered</small>';
            ownMessage.insertAdjacentHTML('beforeend', myMessage);
            ownMessage.insertAdjacentHTML('beforeend', status);
            setTimeout(() => {
                this.message.replaceWith(ownMessage);
            }, 500);
            //if(mentor.name === Vanya){
            // Vanya, I don't want to hurt your feelings,
            // though it works with throttling, but too quickly,
            // for greater clarity I add timeout}

        } else {
            const ownMessage = document.createElement('div');
            ownMessage.classList.add('status');
            const status = '<small class="status">sending ...</small>';
            ownMessage.insertAdjacentHTML('beforeend', myMessage);
            ownMessage.insertAdjacentHTML('beforeend', status);
            this.node.appendChild(ownMessage);
            this.message = ownMessage;
        }
    };

    renderSystemMessage = (message, date) => {
        this.renderMessage('system', message, date);
    };

    renderTyping = (names, message) => {
        console.log(names);
        if (message) {
            this.typing.innerHTML = Object.values(names)
                .map(name => `<p><small>${name} is ${message}</small></p>`)
                .join('');
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
