export class MessagesForm{
    constructor(selectorNode){
        this.node = document.querySelector(selectorNode);
        this.input = this.node[0];
    }
    onSubmit = (handler) => {
        this.node.addEventListener('submit', evt => {
            evt.preventDefault();
            if(this.input.value){
                handler(this.input.value);
                this.input.value = '';
            }
        })
    };
    onTyping = (handler) => {
        this.node.addEventListener('keypress', () => {
            handler(`typing ...`);
        })
    };

}