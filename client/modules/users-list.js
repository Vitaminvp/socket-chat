export class UsersList {
    constructor(selector) {
        this.node = document.querySelector(selector);
    }

    render = (usersList, name ) => {
        this.node.innerHTML = "";
        //const documentFragment = document.createDocumentFragment();

        console.log(usersList);
        // usersList.forEach(user => {
        //     let element = document.createElement("p");
        //     // if (this.activeUser.getActiveName() === user) {
        //     //     element.className = "active-user";
        //     // }
        //     element.innerHTML = `${user}\n`;
        //     documentFragment.appendChild(element);
        // });

        //this.node.appendChild(documentFragment);
    };
}
