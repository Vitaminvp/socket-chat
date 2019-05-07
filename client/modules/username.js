export class Username{
    constructor(selector){
        this.node = document.querySelector(selector);
        this.name = '';
    }

    render = value => {
        this.name = value;
        this.node.innerHTML = value;
    };

    getName = () => this.name;
}
