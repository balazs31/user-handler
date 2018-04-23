import { Serializable } from "./serializable";

export class User extends Serializable {
    constructor(
        public id: number,
        public username: string,
        public firstName: string,
        public lastName: string,
        public password: string,
        public location: string,
        public email: string,
        public phone: string,
     ) {
        super();
    }

    public toString(): string {
        return this.id.toString().toLowerCase() + ' ' +
            this.username.toLowerCase() + ' ' +
            this.firstName.toLowerCase() + ' ' +
            this.lastName.toLowerCase() + ' ' +
            this.location.toLowerCase() + ' ' + 
            this.email.toLowerCase() + ' ' +
            this.phone.toLowerCase();
    }
   
}