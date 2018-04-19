import { Serializable } from "./serializable";

export class User extends Serializable {
    firstName: string;
    lastName: string;
    password: string;
    dateOfBirth: Date;
    address: Array<string>;
    email: string;
    dateOfRegistration: DataCue;
    id: number;
    constructor() {
        super();
    }
}