import { Chat } from "../operationsInterfaces/index.js";
import { ChatApiClient } from "../chatApiClient.js";
import { CreateChatThreadRequest, ChatCreateChatThreadOptionalParams, ChatCreateChatThreadResponse, ChatListChatThreadsOptionalParams, ChatListChatThreadsResponse, ChatDeleteChatThreadOptionalParams, ChatListChatThreadsNextOptionalParams, ChatListChatThreadsNextResponse } from "../models/index.js";
/** Class containing Chat operations. */
export declare class ChatImpl implements Chat {
    private readonly client;
    /**
     * Initialize a new instance of the class Chat class.
     * @param client Reference to the service client
     */
    constructor(client: ChatApiClient);
    /**
     * Creates a chat thread.
     * @param createChatThreadRequest Request payload for creating a chat thread.
     * @param options The options parameters.
     */
    createChatThread(createChatThreadRequest: CreateChatThreadRequest, options?: ChatCreateChatThreadOptionalParams): Promise<ChatCreateChatThreadResponse>;
    /**
     * Gets the list of chat threads of a user.
     * @param options The options parameters.
     */
    listChatThreads(options?: ChatListChatThreadsOptionalParams): Promise<ChatListChatThreadsResponse>;
    /**
     * Deletes a thread.
     * @param chatThreadId Id of the thread to be deleted.
     * @param options The options parameters.
     */
    deleteChatThread(chatThreadId: string, options?: ChatDeleteChatThreadOptionalParams): Promise<void>;
    /**
     * ListChatThreadsNext
     * @param nextLink The nextLink from the previous successful call to the ListChatThreads method.
     * @param options The options parameters.
     */
    listChatThreadsNext(nextLink: string, options?: ChatListChatThreadsNextOptionalParams): Promise<ChatListChatThreadsNextResponse>;
}
//# sourceMappingURL=chat.d.ts.map