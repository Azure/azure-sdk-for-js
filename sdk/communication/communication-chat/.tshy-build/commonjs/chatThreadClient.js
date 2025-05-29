"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatThreadClient = void 0;
const tslib_1 = require("tslib");
const logger_js_1 = require("./models/logger.js");
const communication_common_1 = require("@azure/communication-common");
const mappers_js_1 = require("./models/mappers.js");
const index_js_1 = require("./generated/src/index.js");
const communicationTokenCredentialPolicy_js_1 = require("./credential/communicationTokenCredentialPolicy.js");
const tracing_js_1 = require("./generated/src/tracing.js");
const minimumTypingIntervalInMilliSeconds = 8000;
/**
 * The client to do chat operations
 */
class ChatThreadClient {
    constructor(endpoint, threadId, credential, options = {}) {
        this.endpoint = endpoint;
        this.timeOfLastTypingRequest = undefined;
        this.threadId = threadId;
        this.tokenCredential = credential;
        const internalPipelineOptions = Object.assign(Object.assign({}, options), {
            loggingOptions: {
                logger: logger_js_1.logger.info,
            },
        });
        this.client = new index_js_1.ChatApiClient(this.endpoint, Object.assign({ endpoint: this.endpoint }, internalPipelineOptions));
        const authPolicy = (0, communicationTokenCredentialPolicy_js_1.createCommunicationTokenCredentialPolicy)(this.tokenCredential);
        this.client.pipeline.addPolicy(authPolicy);
    }
    /**
     * Gets a chat thread.
     * Returns the chat thread.
     * @param options -  Operation options.
     */
    getProperties(options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatClient-GetProperties", options, async (updatedOptions) => {
            const result = await this.client.chatThread.getChatThreadProperties(this.threadId, updatedOptions);
            return (0, mappers_js_1.mapToChatThreadPropertiesSdkModel)(result);
        });
    }
    /**
     * Updates a thread's topic.
     * @param topic - The topic needs to be updated to.
     * @param options - Operation options.
     */
    updateTopic(topic, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatThreadClient-UpdateTopic", options, async (updatedOptions) => {
            await this.client.chatThread.updateChatThreadProperties(this.threadId, { topic: topic }, updatedOptions);
        });
    }
    /**
     * Sends a chat message to a thread identified by threadId.
     * Returns the id of the created message.
     * @param request - Request for sending a message.
     * @param options - Operation options.
     */
    sendMessage(request, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatThreadClient-SendMessage", options, async (updatedOptions) => {
            // reset typing notification clock
            this.timeOfLastTypingRequest = undefined;
            const result = await this.client.chatThread.sendChatMessage(this.threadId, Object.assign(Object.assign({}, request), options), updatedOptions);
            return result;
        });
    }
    /**
     * Gets a chat message identified by messageId.
     * Returns the specific message.
     * @param messageId - The message id of the message.
     * @param options - Operation options.
     */
    getMessage(messageId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatThreadClient-GetMessage", options, async (updatedOptions) => {
            const result = await this.client.chatThread.getChatMessage(this.threadId, messageId, updatedOptions);
            return (0, mappers_js_1.mapToChatMessageSdkModel)(result);
        });
    }
    listMessagesPage(pageSettings_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listMessagesPage_1(pageSettings, options = {}) {
            if (!pageSettings.continuationToken) {
                const currentSetResponse = yield tslib_1.__await(this.client.chatThread.listChatMessages(this.threadId, options));
                pageSettings.continuationToken = currentSetResponse.nextLink;
                if (currentSetResponse.value) {
                    yield yield tslib_1.__await(currentSetResponse.value.map(mappers_js_1.mapToChatMessageSdkModel, this));
                }
            }
            while (pageSettings.continuationToken) {
                const currentSetResponse = yield tslib_1.__await(this.client.chatThread.listChatMessagesNext(this.threadId, pageSettings.continuationToken, options));
                pageSettings.continuationToken = currentSetResponse.nextLink;
                if (currentSetResponse.value) {
                    yield yield tslib_1.__await(currentSetResponse.value.map(mappers_js_1.mapToChatMessageSdkModel, this));
                }
                else {
                    break;
                }
            }
        });
    }
    listMessagesAll(options) {
        return tslib_1.__asyncGenerator(this, arguments, function* listMessagesAll_1() {
            var _a, e_1, _b, _c;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listMessagesPage({}, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
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
     * Gets a list of message from a thread identified by threadId.
     * Returns the list of the messages.
     * @param options - Get messages options.
     */
    listMessages(options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("ChatThreadClient-ListMessages", options);
        try {
            const iter = this.listMessagesAll(updatedOptions);
            return {
                next() {
                    return iter.next();
                },
                [Symbol.asyncIterator]() {
                    return this;
                },
                byPage: (settings = {}) => {
                    return this.listMessagesPage(settings, updatedOptions);
                },
            };
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
            span.end();
        }
    }
    /**
     * Deletes a message identified by threadId and messageId
     * @param messageId - The message id of the message.
     * @param options - Operation options.
     */
    deleteMessage(messageId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatThreadClient-DeleteMessage", options, async (updatedOptions) => {
            await this.client.chatThread.deleteChatMessage(this.threadId, messageId, updatedOptions);
        });
    }
    /**
     * Updates a message identified by threadId and messageId
     * @param messageId - The message id of the message.
     * @param options - Operation options.
     */
    async updateMessage(messageId, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatThreadClient-UpdateMessage", options, async (updatedOptions) => {
            await this.client.chatThread.updateChatMessage(this.threadId, messageId, options, updatedOptions);
        });
    }
    /**
     * Adds the details of chat participants belonging to the thread identified by threadId.
     * @param request - Thread participants' details to add in the thread roster
     * @param options - Operation options.
     */
    async addParticipants(request, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatThreadClient-AddParticipants", options, async (updatedOptions) => {
            const result = await this.client.chatThread.addChatParticipants(this.threadId, (0, mappers_js_1.mapToAddChatParticipantsRequestRestModel)(request), updatedOptions);
            return result;
        });
    }
    listParticipantsPage(continuationState_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listParticipantsPage_1(continuationState, options = {}) {
            if (!continuationState.continuationToken) {
                const currentSetResponse = yield tslib_1.__await(this.client.chatThread.listChatParticipants(this.threadId, options));
                continuationState.continuationToken = currentSetResponse.nextLink;
                if (currentSetResponse.value) {
                    yield yield tslib_1.__await(currentSetResponse.value.map(mappers_js_1.mapToChatParticipantSdkModel, this));
                }
            }
            while (continuationState.continuationToken) {
                const currentSetResponse = yield tslib_1.__await(this.client.chatThread.listChatParticipantsNext(this.threadId, continuationState.continuationToken, options));
                continuationState.continuationToken = currentSetResponse.nextLink;
                if (currentSetResponse.value) {
                    yield yield tslib_1.__await(currentSetResponse.value.map(mappers_js_1.mapToChatParticipantSdkModel, this));
                }
                else {
                    break;
                }
            }
        });
    }
    listParticipantsAll(options) {
        return tslib_1.__asyncGenerator(this, arguments, function* listParticipantsAll_1() {
            var _a, e_2, _b, _c;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listParticipantsPage({}, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const page = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(page)));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    /**
     * Gets the participants of the thread identified by threadId.
     * Returns the lists of the participants.
     * @param options - Operation options.
     */
    listParticipants(options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("ChatThreadClient-ListParticipants", options);
        try {
            const iter = this.listParticipantsAll(updatedOptions);
            return {
                next() {
                    return iter.next();
                },
                [Symbol.asyncIterator]() {
                    return this;
                },
                byPage: (settings = {}) => {
                    return this.listParticipantsPage(settings, updatedOptions);
                },
            };
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
            span.end();
        }
    }
    /**
     * Removes participant from the thread identified by threadId.
     * @param participant - Thread participant to remove from the thread roster
     * @param options - Operation options.
     */
    async removeParticipant(participant, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatThreadClient-RemoveParticipant", options, async (updatedOptions) => {
            await this.client.chatThread.removeChatParticipant(this.threadId, (0, communication_common_1.serializeCommunicationIdentifier)(participant), updatedOptions);
        });
    }
    /**
     * Sends a typing notification to the thread.
     * Doesn't attempt to send if the time since last notification is smaller than the minimum typing interval
     * @param options - - Operation options
     * @returns True if the typing message notification could be sent, otherwise false.
     */
    async sendTypingNotification(options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatThreadClient-SendTypingNotification", options, async (updatedOptions) => {
            const dateNow = new Date();
            const { senderDisplayName } = updatedOptions, restOptions = tslib_1.__rest(updatedOptions, ["senderDisplayName"]);
            if (this.canPostTypingNotification(dateNow)) {
                this.timeOfLastTypingRequest = dateNow;
                await this.client.chatThread.sendTypingNotification(this.threadId, Object.assign({ sendTypingNotificationRequest: { senderDisplayName: senderDisplayName } }, restOptions));
                return true;
            }
            logger_js_1.logger.info(`Typing Notification NOT Send. [thread_id=${this.threadId}]`);
            return false;
        });
    }
    /**
     * Sends a read receipt to the thread identified by threadId.
     * @param request - Request for sending a read receipt
     * @param options - Operation options.
     */
    async sendReadReceipt(request, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChatThreadClient-SendReadReceipt", options, async (updatedOptions) => {
            await this.client.chatThread.sendChatReadReceipt(this.threadId, request, updatedOptions);
        });
    }
    listReadReceiptsPage(continuationState_1) {
        return tslib_1.__asyncGenerator(this, arguments, function* listReadReceiptsPage_1(continuationState, options = {}) {
            if (!continuationState.continuationToken) {
                const currentSetResponse = yield tslib_1.__await(this.client.chatThread.listChatReadReceipts(this.threadId, options));
                continuationState.continuationToken = currentSetResponse.nextLink;
                if (currentSetResponse.value) {
                    yield yield tslib_1.__await(currentSetResponse.value.map(mappers_js_1.mapToReadReceiptSdkModel, this));
                }
            }
            while (continuationState.continuationToken) {
                const currentSetResponse = yield tslib_1.__await(this.client.chatThread.listChatReadReceiptsNext(this.threadId, continuationState.continuationToken, options));
                continuationState.continuationToken = currentSetResponse.nextLink;
                if (currentSetResponse.value) {
                    yield yield tslib_1.__await(currentSetResponse.value.map(mappers_js_1.mapToReadReceiptSdkModel, this));
                }
                else {
                    break;
                }
            }
        });
    }
    listReadReceiptsAll(options) {
        return tslib_1.__asyncGenerator(this, arguments, function* listReadReceiptsAll_1() {
            var _a, e_3, _b, _c;
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.listReadReceiptsPage({}, options)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const page = _c;
                    yield tslib_1.__await(yield* tslib_1.__asyncDelegator(tslib_1.__asyncValues(page)));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_3) throw e_3.error; }
            }
        });
    }
    /**
     * Gets a list of read receipt from a thread identified by threadId.
     * Returns the list of the messages.
     * @param options - Get messages options.
     */
    listReadReceipts(options = {}) {
        const { span, updatedOptions } = tracing_js_1.tracingClient.startSpan("ChatThreadClient-ListChatReadReceipts", options);
        try {
            const iter = this.listReadReceiptsAll(updatedOptions);
            return {
                next() {
                    return iter.next();
                },
                [Symbol.asyncIterator]() {
                    return this;
                },
                byPage: (settings = {}) => {
                    return this.listReadReceiptsPage(settings, updatedOptions);
                },
            };
        }
        catch (e) {
            span.setStatus({
                status: "error",
                error: e,
            });
            throw e;
        }
        finally {
            span.end();
        }
    }
    canPostTypingNotification(dateNow) {
        if (this.timeOfLastTypingRequest) {
            const timeSinceLastRequestInMilliSeconds = dateNow.getTime() - this.timeOfLastTypingRequest.getTime();
            if (timeSinceLastRequestInMilliSeconds < minimumTypingIntervalInMilliSeconds) {
                logger_js_1.logger.info(`Typing interval check failed. [last_request=${this.timeOfLastTypingRequest}]`);
                return false;
            }
        }
        return true;
    }
}
exports.ChatThreadClient = ChatThreadClient;
//# sourceMappingURL=chatThreadClient.js.map