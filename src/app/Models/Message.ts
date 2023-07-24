export interface Message{
    id:number,
    senderId:number,
    senderUserName:string,
    senderPhotoUrl:string,
    recipientId:number,
    recipientName:string,
    recipientPhotoUrl:string,
    content:string,
    dateRead?:Date,
    messageSent:Date
}