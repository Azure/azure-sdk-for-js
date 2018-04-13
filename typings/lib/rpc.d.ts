import { ReceiverOptions, SenderOptions } from "./rhea-promise";
export interface RequestResponseLink {
    sender: any;
    receiver: any;
    session: any;
}
export interface ReceiverLink {
    receiver: any;
    session: any;
}
export interface SenderLink {
    sender: any;
    session: any;
}
export declare function createRequestResponseLink(connection: any, senderOptions: SenderOptions, receiverOptions: ReceiverOptions): Promise<RequestResponseLink>;
export declare function createReceiverLink(connection: any, receiverOptions: ReceiverOptions): Promise<ReceiverLink>;
export declare function createSenderLink(connection: any, senderOptions: SenderOptions): Promise<SenderLink>;
