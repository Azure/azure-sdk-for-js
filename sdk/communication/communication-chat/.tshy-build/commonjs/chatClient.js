"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatClient = void 0;
const tslib_1 = require("tslib");
const communication_signaling_1 = require("@azure/communication-signaling");
const mappers_js_1 = require("./models/mappers.js");
const index_js_1 = require("./generated/src/index.js");
const chatThreadClient_js_1 = require("./chatThreadClient.js");
const events_1 = require("events");
const communicationTokenCredentialPolicy_js_1 = require("./credential/communicationTokenCredentialPolicy.js");
const uuid_js_1 = require("./models/uuid.js");
const signalingClient_js_1 = require("./signaling/signalingClient.js");
const logger_js_1 = require("./models/logger.js");
const tracing_js_1 = require("./generated/src/tracing.js");
/**
 * The client to do chat operations
 */
class ChatClient {
    /**
     * Creates an instance of the ChatClient for a given resource and user.
     *
     * @param endpoint - The url of the Communication Services resource.
     * @param credential - The token credential. Use AzureCommunicationTokenCredential from \@azure/communication-common to create a credential.
     * @param options - Additional client options.
     */
    constructor(endpoint, credential, options = {}) {
        this.endpoint = endpoint;
        this.signalingClient = undefined;
        this.emitter = new events_1.EventEmitter();
        this.isRealtimeNotificationsStarted = false;
        this.tokenCredential = credential;
        const internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: logger_js_1.logger.info,
            },
        });
        this.client = new index_js_1.ChatApiClient(this.endpoint, Object.assign({ endpoint: this.endpoint }, internalPipelineOptions));
        const authPolicy = (0, communicationTokenCredentialPolicy_js_1.createCommunicationTokenCredentialPolicy)(this.tokenCredential);
        this.client.pipeline.addPolicy(authPolicy);
        this.clientOptions = Object.assign({}, options);
        this.clientOptions.signalingClientOptions = Object.assign(Object.assign({}, this.clientOptions.signalingClientOptions), { resourceEndpoint: this.endpoint, gatewayApiVersion: this.client.apiVersion });
        this.signalingClient = (0, signalingClient_js_1.getSignalingClient)(credential, logger_js_1.logger, this.clientOptions.signalingClientOptions);
    }
    /**
     * Returns ChatThreadClient with the specific thread id.
     * @param threadId - Thread ID for the ChatThreadClient
     */
    getChatThreadClient(threadId) {
        return new chatThreadClient_js_1.ChatThreadClient(this.endpoint, threadId, this.tokenCredential, this.clientOptions);
    }
    /**
     * Creates a chat thread.
     * Returns thread client with the id of the created thread.
     * @param request - Request for creating a chat thread.
     * @param options - Operation options.
     */
    async createChatThread(request, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatClient-CreateChatThread", options, async (updatedOptions) => {
            var _a, _b;
            // We generate an UUID if the user does not provide an idempotencyToken value
            updatedOptions.idempotencyToken = (_a = updatedOptions.idempotencyToken) !== null && _a !== void 0 ? _a : (0, uuid_js_1.generateUuid)();
            const updatedRestModelOptions = (0, mappers_js_1.mapToCreateChatThreadOptionsRestModel)(updatedOptions);
            const result = await this.client.chat.createChatThread({
                topic: request.topic,
                participants: (_b = options.participants) === null || _b === void 0 ? void 0 : _b.map((participant) => (0, mappers_js_1.mapToChatParticipantRestModel)(participant)),
            }, updatedRestModelOptions);
            return (0, mappers_js_1.mapToCreateChatThreadResultSdkModel)(result);
        });
    }
    listChatThreadsPage(continuationState_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listChatThreadsPage_1(continuationState, options = {}) {
            if (!continuationState.continuationToken) {
                const currentSetResponse = yield tslib_1.__await(this.client.chat.listChatThreads(options));
                continuationState.continuationToken = currentSetResponse.nextLink;
                if (currentSetResponse.value) {
                    yield yield tslib_1.__await(currentSetResponse.value);
                }
            }
            while (continuationState.continuationToken) {
                const currentSetResponse = yield tslib_1.__await(this.client.chat.listChatThreadsNext(continuationState.continuationToken, options));
                continuationState.continuationToken = currentSetResponse.nextLink;
                if (currentSetResponse.value) {
                    yield yield tslib_1.__await(currentSetResponse.value);
                }
                else {
                    break;
                }
            }
        });
    }
    listChatThreadsAll(options) {
        return tslib_1.__asyncGenerator(this, arguments, function* listChatThreadsAll_1() {
            var _a, e_1, _b, _c;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listChatThreadsPage({}, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const page = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(page)));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    /**
     * Gets the list of chat threads of a user.
     * @param options - List chat threads options.
     */
    listChatThreads(options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("ChatClient-ListChatThreads", options);
        try {
            const iter = this.listChatThreadsAll(updatedOptions);
            return {
                next() {
                    return iter.next();
                },
                [Symbol.asyncIterator]() {
                    return this;
                },
                byPage: (settings = {}) => {
                    return this.listChatThreadsPage(settings, updatedOptions);
                },
            };
        }
        catch (e) {
            span.setStatus({
                error: e,
                status: "error",
            });
            throw e;
        }
        finally {
            span.end();
        }
    }
    /**
     * Deletes a chat thread.
     * @param threadId - The ID of the thread to delete.
     * @param options -  Operation options.
     */
    async deleteChatThread(threadId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatClient-DeleteChatThread", options, async (updatedOptions) => {
            await this.client.chat.deleteChatThread(threadId, updatedOptions);
        });
    }
    /**
     * Start receiving realtime notifications.
     * Call this function before subscribing to any event.
     */
    async startRealtimeNotifications() {
        if (this.signalingClient === undefined) {
            throw new Error("Realtime notifications are not supported in node js.");
        }
        if (this.isRealtimeNotificationsStarted) {
            return;
        }
        this.isRealtimeNotificationsStarted = true;
        await this.signalingClient.start();
        this.subscribeToSignalingEvents();
    }
    /**
     * Stop receiving realtime notifications.
     * This function would unsubscribe to all events.
     */
    async stopRealtimeNotifications() {
        if (this.signalingClient === undefined) {
            throw new Error("Realtime notifications are not supported in node js.");
        }
        this.isRealtimeNotificationsStarted = false;
        await this.signalingClient.stop();
        this.emitter.removeAllListeners();
    }
    on(event, listener) {
        if (this.signalingClient === undefined) {
            throw new Error("Realtime notifications are only supported in the browser.");
        }
        if (!this.isRealtimeNotificationsStarted &&
            event !== "realTimeNotificationConnected" &&
            event !== "realTimeNotificationDisconnected") {
            throw new Error("You must call startRealtimeNotifications before you can subscribe to events.");
        }
        this.emitter.on(event, listener);
    }
    off(event, listener) {
        if (this.signalingClient === undefined) {
            throw new Error("Realtime notifications are only supported in the browser.");
        }
        this.emitter.removeListener(event, listener);
    }
    subscribeToSignalingEvents() {
        if (this.signalingClient === undefined) {
            throw new Error("Realtime notifications are only supported in the browser.");
        }
        this.signalingClient.on("connectionChanged", (payload) => {
            if (payload === communication_signaling_1.ConnectionState.Connected) {
                this.emitter.emit("realTimeNotificationConnected");
            }
            else if (payload === communication_signaling_1.ConnectionState.Disconnected) {
                this.emitter.emit("realTimeNotificationDisconnected");
            }
        });
        this.signalingClient.on("chatMessageReceived", (payload) => {
            this.emitter.emit("chatMessageReceived", payload);
        });
        this.signalingClient.on("chatMessageEdited", (payload) => {
            this.emitter.emit("chatMessageEdited", payload);
        });
        this.signalingClient.on("chatMessageDeleted", (payload) => {
            this.emitter.emit("chatMessageDeleted", payload);
        });
        this.signalingClient.on("typingIndicatorReceived", (payload) => {
            this.emitter.emit("typingIndicatorReceived", payload);
        });
        this.signalingClient.on("readReceiptReceived", (payload) => {
            this.emitter.emit("readReceiptReceived", payload);
        });
        this.signalingClient.on("chatThreadCreated", (payload) => {
            this.emitter.emit("chatThreadCreated", payload);
        });
        this.signalingClient.on("chatThreadDeleted", (payload) => {
            this.emitter.emit("chatThreadDeleted", payload);
        });
        this.signalingClient.on("chatThreadPropertiesUpdated", (payload) => {
            this.emitter.emit("chatThreadPropertiesUpdated", payload);
        });
        this.signalingClient.on("participantsAdded", (payload) => {
            this.emitter.emit("participantsAdded", payload);
        });
        this.signalingClient.on("participantsRemoved", (payload) => {
            this.emitter.emit("participantsRemoved", payload);
        });
    }
}
exports.ChatClient = ChatClient;
//# sourceMappingURL=chatClient.js.map