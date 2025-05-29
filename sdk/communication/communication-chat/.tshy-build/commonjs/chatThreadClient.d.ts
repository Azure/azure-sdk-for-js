import type { CommunicationIdentifier, CommunicationTokenCredential } from "@azure/communication-common";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { AddParticipantsRequest, SendMessageRequest, SendReadReceiptRequest } from "./models/requests.js";
import type { AddChatParticipantsResult, ChatMessage, ChatMessageReadReceipt, ChatParticipant, ChatThreadProperties, SendChatMessageResult } from "./models/models.js";
import type { AddParticipantsOptions, ChatThreadClientOptions, DeleteMessageOptions, GetMessageOptions, GetPropertiesOptions, ListMessagesOptions, ListParticipantsOptions, ListReadReceiptsOptions, RemoveParticipantOptions, SendMessageOptions, SendReadReceiptOptions, SendTypingNotificationOptions, UpdateMessageOptions, UpdateTopicOptions } from "./models/options.js";
/**
 * The client to do chat operations
 */
export declare class ChatThreadClient {
    private readonly endpoint;
    /**
     * Thread ID of the ChatThreadClient
     */
    readonly threadId: string;
    private readonly tokenCredential;
    private readonly client;
    private timeOfLastTypingRequest;
    constructor(endpoint: string, threadId: string, credential: CommunicationTokenCredential, options?: ChatThreadClientOptions);
    /**
     * Gets a chat thread.
     * Returns the chat thread.
     * @param options -  Operation options.
     */
    getProperties(options?: GetPropertiesOptions): Promise<ChatThreadProperties>;
    /**
     * Updates a thread's topic.
     * @param topic - The topic needs to be updated to.
     * @param options - Operation options.
     */
    updateTopic(topic: string, options?: UpdateTopicOptions): Promise<void>;
    /**
     * Sends a chat message to a thread identified by threadId.
     * Returns the id of the created message.
     * @param request - Request for sending a message.
     * @param options - Operation options.
     */
    sendMessage(request: SendMessageRequest, options?: SendMessageOptions): Promise<SendChatMessageResult>;
    /**
     * Gets a chat message identified by messageId.
     * Returns the specific message.
     * @param messageId - The message id of the message.
     * @param options - Operation options.
     */
    getMessage(messageId: string, options?: GetMessageOptions): Promise<ChatMessage>;
    private listMessagesPage;
    private listMessagesAll;
    /**
     * Gets a list of message from a thread identified by threadId.
     * Returns the list of the messages.
     * @param options - Get messages options.
     */
    listMessages(options?: ListMessagesOptions): PagedAsyncIterableIterator<ChatMessage>;
    /**
     * Deletes a message identified by threadId and messageId
     * @param messageId - The message id of the message.
     * @param options - Operation options.
     */
    deleteMessage(messageId: string, options?: DeleteMessageOptions): Promise<void>;
    /**
     * Updates a message identified by threadId and messageId
     * @param messageId - The message id of the message.
     * @param options - Operation options.
     */
    updateMessage(messageId: string, options?: UpdateMessageOptions): Promise<void>;
    /**
     * Adds the details of chat participants belonging to the thread identified by threadId.
     * @param request - Thread participants' details to add in the thread roster
     * @param options - Operation options.
     */
    addParticipants(request: AddParticipantsRequest, options?: AddParticipantsOptions): Promise<AddChatParticipantsResult>;
    private listParticipantsPage;
    private listParticipantsAll;
    /**
     * Gets the participants of the thread identified by threadId.
     * Returns the lists of the participants.
     * @param options - Operation options.
     */
    listParticipants(options?: ListParticipantsOptions): PagedAsyncIterableIterator<ChatParticipant>;
    /**
     * Removes participant from the thread identified by threadId.
     * @param participant - Thread participant to remove from the thread roster
     * @param options - Operation options.
     */
    removeParticipant(participant: CommunicationIdentifier, options?: RemoveParticipantOptions): Promise<void>;
    /**
     * Sends a typing notification to the thread.
     * Doesn't attempt to send if the time since last notification is smaller than the minimum typing interval
     * @param options - - Operation options
     * @returns True if the typing message notification could be sent, otherwise false.
     */
    sendTypingNotification(options?: SendTypingNotificationOptions): Promise<boolean>;
    /**
     * Sends a read receipt to the thread identified by threadId.
     * @param request - Request for sending a read receipt
     * @param options - Operation options.
     */
    sendReadReceipt(request: SendReadReceiptRequest, options?: SendReadReceiptOptions): Promise<void>;
    private listReadReceiptsPage;
    private listReadReceiptsAll;
    /**
     * Gets a list of read receipt from a thread identified by threadId.
     * Returns the list of the messages.
     * @param options - Get messages options.
     */
    listReadReceipts(options?: ListReadReceiptsOptions): PagedAsyncIterableIterator<ChatMessageReadReceipt>;
    private canPostTypingNotification;
}
//# sourceMappingURL=chatThreadClient.d.ts.map