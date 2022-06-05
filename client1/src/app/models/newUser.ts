export class NewUser{
    constructor(
        public name: string,
        public surname: string,
        public role: string,
        public email,
        public password: string) { }
}