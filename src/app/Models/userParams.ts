import { IUser } from "./User";

export class UserParams{
    gender!:string;
    minAge=18;
    maxAge =99;
    pageNumber=1;
    pageSize=5;
    orderBy:string="lastActive"

    constructor(user:IUser){
        this.gender = user.gender === 'female'?'male':'female';
    }
}