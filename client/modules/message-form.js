export class MessagesForm {
    constructor(selectorNode) {
        this.node = document.querySelector(selectorNode);
        this.input = this.node[0];
        this.name = document.querySelector('#username');
    }

    onSubmit = handler => {
        this.node.addEventListener('submit', evt => {
            evt.preventDefault();
            if (this.input.value) {
                handler(this.input.value);
                this.input.value = '';
            }
        })
    };
    onTyping = handler => {
        this.node.addEventListener('keypress', () => {
            handler(`typing ...`);
        })
    };

    onChangeName = handler => {
        this.name.addEventListener('keypress', evt => {
            const value = evt.target.value;
            const keyCode = evt.which;
            if (value && keyCode === 13)
                handler(value);
        })
    }
}
