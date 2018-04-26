
export class User {
    constructor(
        public id: number,
        public username: string,
        public firstName: string,
        public lastName: string,
        public password: string,
        public location: string,
        public email: string,
        public phone: string,
     ) {}

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