import type { ChatClientOptions, CreateChatThreadOptions, DeleteChatThreadOptions, ListChatThreadsOptions } from "./models/options.js";
import type { ChatMessageDeletedEvent, ChatMessageEditedEvent, ChatMessageReceivedEvent, ChatThreadCreatedEvent, ChatThreadDeletedEvent, ChatThreadPropertiesUpdatedEvent, ParticipantsAddedEvent, ParticipantsRemovedEvent, ReadReceiptReceivedEvent, TypingIndicatorReceivedEvent } from "./models/events.js";
import type { ChatThreadItem, CreateChatThreadResult } from "./models/models.js";
import { ChatThreadClient } from "./chatThreadClient.js";
import type { CommunicationTokenCredential } from "@azure/communication-common";
import type { CreateChatThreadRequest } from "./models/requests.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
/**
 * The client to do chat operations
 */
export declare class ChatClient {
    private readonly endpoint;
    private readonly tokenCredential;
    private readonly clientOptions;
    private readonly client;
    private readonly signalingClient;
    private readonly emitter;
    private isRealtimeNotificationsStarted;
    /**
     * Creates an instance of the ChatClient for a given resource and user.
     *
     * @param endpoint - The url of the Communication Services resource.
     * @param credential - The token credential. Use AzureCommunicationTokenCredential from \@azure/communication-common to create a credential.
     * @param options - Additional client options.
     */
    constructor(endpoint: string, credential: CommunicationTokenCredential, options?: ChatClientOptions);
    /**
     * Returns ChatThreadClient with the specific thread id.
     * @param threadId - Thread ID for the ChatThreadClient
     */
    getChatThreadClient(threadId: string): ChatThreadClient;
    /**
     * Creates a chat thread.
     * Returns thread client with the id of the created thread.
     * @param request - Request for creating a chat thread.
     * @param options - Operation options.
     */
    createChatThread(request: CreateChatThreadRequest, options?: CreateChatThreadOptions): Promise<CreateChatThreadResult>;
    private listChatThreadsPage;
    private listChatThreadsAll;
    /**
     * Gets the list of chat threads of a user.
     * @param options - List chat threads options.
     */
    listChatThreads(options?: ListChatThreadsOptions): PagedAsyncIterableIterator<ChatThreadItem>;
    /**
     * Deletes a chat thread.
     * @param threadId - The ID of the thread to delete.
     * @param options -  Operation options.
     */
    deleteChatThread(threadId: string, options?: DeleteChatThreadOptions): Promise<void>;
    /**
     * Start receiving realtime notifications.
     * Call this function before subscribing to any event.
     */
    startRealtimeNotifications(): Promise<void>;
    /**
     * Stop receiving realtime notifications.
     * This function would unsubscribe to all events.
     */
    stopRealtimeNotifications(): Promise<void>;
    /**
     * Subscribe function for chatMessageReceived.
     * The initial sender will also receive this event.
     * You need to call startRealtimeNotifications before subscribing to any event.
     * @param event - The ChatMessageReceivedEvent.
     * @param listener - The listener to handle the event.
     */
    on(event: "chatMessageReceived", listener: (e: ChatMessageReceivedEvent) => void): void;
    /**
     * Subscribe function for chatMessageEdited.
     * The initial sender will also receive this event.
     * @param event - The ChatMessageEditedEvent.
     * @param listener - The listener to handle the event.
     */
    on(event: "chatMessageEdited", listener: (e: ChatMessageEditedEvent) => void): void;
    /**
     * Subscribe function for chatMessageDeleted.
     * The initial sender will also receive this event.
     * @param event - The ChatMessageDeletedEvent.
     * @param listener - The listener to handle the event.
     */
    on(event: "chatMessageDeleted", listener: (e: ChatMessageDeletedEvent) => void): void;
    /**
     * Subscribe function for typingIndicatorReceived.
     * The initial sender will also receive this event.
     * @param event - The TypingIndicatorReceivedEvent.
     * @param listener - The listener to handle the event.
     */
    on(event: "typingIndicatorReceived", listener: (e: TypingIndicatorReceivedEvent) => void): void;
    /**
     * Subscribe function for readReceiptReceived.
     * @param event - The ReadReceiptReceivedEvent.
     * @param listener - The listener to handle the event.
     */
    on(event: "readReceiptReceived", listener: (e: ReadReceiptReceivedEvent) => void): void;
    /**
     * Subscribe function for chatThreadCreated.
     * @param event - The ChatThreadCreatedEvent.
     * @param listener - The listener to handle the event.
     */
    on(event: "chatThreadCreated", listener: (e: ChatThreadCreatedEvent) => void): void;
    /**
     * Subscribe function for chatThreadDeleted.
     * @param event - The ChatThreadDeletedEvent.
     * @param listener - The listener to handle the event.
     */
    on(event: "chatThreadDeleted", listener: (e: ChatThreadDeletedEvent) => void): void;
    /**
     * Subscribe function for chatThreadPropertiesUpdated.
     * @param event - The ChatThreadPropertiesUpdatedEvent.
     * @param listener - The listener to handle the event.
     */
    on(event: "chatThreadPropertiesUpdated", listener: (e: ChatThreadPropertiesUpdatedEvent) => void): void;
    /**
     * Subscribe function for participantsAdded.
     * @param event - The ParticipantsAddedEvent.
     * @param listener - The listener to handle the event.
     */
    on(event: "participantsAdded", listener: (e: ParticipantsAddedEvent) => void): void;
    /**
     * Subscribe function for participantsRemoved.
     * @param event - The ParticipantsRemovedEvent.
     * @param listener - The listener to handle the event.
     */
    on(event: "participantsRemoved", listener: (e: ParticipantsRemovedEvent) => void): void;
    /**
     * Subscribe function for realTimeNotificationConnected.
     * @param event - The realTimeNotificationConnected Event
     * @param listener - The listener to handle the event.
     */
    on(event: "realTimeNotificationConnected", listener: () => void): void;
    /**
     * Subscribe function for realTimeNotificationDisconnected.
     * @param event - The realTimeNotificationDisconnected Event
     * @param listener - The listener to handle the event.
     */
    on(event: "realTimeNotificationDisconnected", listener: () => void): void;
    /**
     * Unsubscribe from chatMessageReceived.
     * @param event - The ChatMessageReceivedEvent.
     * @param listener - The listener to handle the event.
     */
    off(event: "chatMessageReceived", listener: (e: ChatMessageReceivedEvent) => void): void;
    /**
     * Unsubscribe from chatMessageEdited.
     * @param event - The ChatMessageEditedEvent.
     * @param listener - The listener to handle the event.
     */
    off(event: "chatMessageEdited", listener: (e: ChatMessageEditedEvent) => void): void;
    /**
     * Unsubscribe from chatMessageDeleted.
     * @param event - The ChatMessageDeletedEvent.
     * @param listener - The listener to handle the event.
     */
    off(event: "chatMessageDeleted", listener: (e: ChatMessageDeletedEvent) => void): void;
    /**
     * Unsubscribe from typingIndicatorReceived.
     * @param event - The TypingIndicatorReceivedEvent.
     * @param listener - The listener to handle the event.
     */
    off(event: "typingIndicatorReceived", listener: (e: TypingIndicatorReceivedEvent) => void): void;
    /**
     * Unsubscribe from readReceiptReceived.
     * @param event - The ReadReceiptReceivedEvent.
     * @param listener - The listener to handle the event.
     */
    off(event: "readReceiptReceived", listener: (e: ReadReceiptReceivedEvent) => void): void;
    /**
     *  Unsubscribe from chatThreadCreated.
     * @param event - The ChatThreadCreatedEvent.
     * @param listener - The listener to handle the event.
     */
    off(event: "chatThreadCreated", listener: (e: ChatThreadCreatedEvent) => void): void;
    /**
     *  Unsubscribe from chatThreadDeleted.
     * @param event - The ChatThreadDeletedEvent.
     * @param listener - The listener to handle the event.
     */
    off(event: "chatThreadDeleted", listener: (e: ChatThreadDeletedEvent) => void): void;
    /**
     * Unsubscribe from chatThreadPropertiesUpdated.
     * @param event - The ChatThreadPropertiesUpdatedEvent.
     * @param listener - The listener to handle the event.
     */
    off(event: "chatThreadPropertiesUpdated", listener: (e: ChatThreadPropertiesUpdatedEvent) => void): void;
    /**
     * Unsubscribe from participantsAdded.
     * @param event - The ParticipantsAddedEvent.
     * @param listener - The listener to handle the event.
     */
    off(event: "participantsAdded", listener: (e: ParticipantsAddedEvent) => void): void;
    /**
     * Unsubscribe from participantsRemoved.
     * @param event - The ParticipantsRemovedEvent.
     * @param listener - The listener to handle the event.
     */
    off(event: "participantsRemoved", listener: (e: ParticipantsRemovedEvent) => void): void;
    private subscribeToSignalingEvents;
}
//# sourceMappingURL=chatClient.d.ts.map