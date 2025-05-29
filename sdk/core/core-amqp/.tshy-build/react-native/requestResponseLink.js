// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AbortError } from "@azure/abort-controller";
import { ConditionStatusMapper, translate } from "./errors.js";
import { ReceiverEvents, SenderEvents, generate_uuid } from "rhea-promise";
import { Constants, StandardAbortMessage } from "./util/constants.js";
import { logErrorStackTrace, logger } from "./log.js";
import { isDefined } from "@azure/core-util";
/**
 * Describes an amqp request(sender)-response(receiver) link that is created over an amqp session.
 */
export class RequestResponseLink {
    /**
     * @param session - The amqp session.
     * @param sender - The amqp sender link.
     * @param receiver - The amqp receiver link.
     */
    constructor(session, sender, receiver) {
        this.session = session;
        this.sender = sender;
        this.receiver = receiver;
        /**
         * Maintains a map of responses that
         * are being actively returned. It acts as a store for correlating the responses received for
         * the send requests.
         */
        this._responsesMap = new Map();
        this.session = session;
        this.sender = sender;
        this.receiver = receiver;
        this.receiver.on(ReceiverEvents.message, (context) => {
            onMessageReceived(context, this.connection.id, this._responsesMap);
        });
        this.sender.on(SenderEvents.senderError, (context) => {
            onSenderError(context, this.connection.id, this._responsesMap);
        });
    }
    /**
     * Provides the underlying amqp connection object.
     * @returns Connection.
     */
    get connection() {
        return this.session.connection;
    }
    /**
     * Indicates whether the session and the sender and receiver links are all open or closed.
     * @returns boolean - `true` - `open`, `false` - `closed`.
     */
    isOpen() {
        return this.session.isOpen() && this.sender.isOpen() && this.receiver.isOpen();
    }
    /**
     * Sends the given request message and returns the received response. If the operation is not
     * completed in the provided timeout in milliseconds `default: 60000`, then `OperationTimeoutError` is thrown.
     *
     * @param request - The AMQP (request) message.
     * @param options - Options that can be provided while sending a request.
     * @returns Promise<Message> The AMQP (response) message.
     */
    sendRequest(request, options = {}) {
        const timeoutInMs = options.timeoutInMs || Constants.defaultOperationTimeoutInMs;
        const aborter = options.abortSignal;
        // If message_id is not already set on the request, set it to a unique value
        // This helps in determining the right response for current request among multiple incoming messages
        if (!request.message_id) {
            request.message_id = generate_uuid();
        }
        return new Promise((resolve, reject) => {
            let timer = undefined;
            const rejectOnAbort = () => {
                this._responsesMap.delete(request.message_id);
                const address = this.receiver.address || "address";
                const requestName = options.requestName;
                const desc = `[${this.connection.id}] The request "${requestName}" ` +
                    `to "${address}" has been cancelled by the user.`;
                // Cancellation is a user-intended action, so log to info instead of warning.
                logger.info(desc);
                const error = new AbortError(StandardAbortMessage);
                reject(error);
            };
            const onAbort = () => {
                // safe to clear the timeout if it hasn't already occurred.
                if (isDefined(timer)) {
                    clearTimeout(timer);
                }
                aborter.removeEventListener("abort", onAbort);
                rejectOnAbort();
            };
            if (aborter) {
                // the aborter may have been triggered between request attempts
                // so check if it was triggered and reject if needed.
                if (aborter.aborted) {
                    return rejectOnAbort();
                }
                aborter.addEventListener("abort", onAbort);
            }
            timer = setTimeout(() => {
                var _a;
                this._responsesMap.delete(request.message_id);
                if (aborter) {
                    aborter.removeEventListener("abort", onAbort);
                }
                const address = ((_a = this.receiver) === null || _a === void 0 ? void 0 : _a.address) || "address";
                const desc = `The request with message_id "${request.message_id}" to "${address}" ` +
                    `endpoint timed out. Please try again later.`;
                const e = {
                    name: "OperationTimeoutError",
                    message: desc,
                };
                return reject(translate(e));
            }, timeoutInMs);
            this._responsesMap.set(request.message_id, {
                resolve: resolve,
                reject: reject,
                cleanupBeforeResolveOrReject: () => {
                    if (aborter)
                        aborter.removeEventListener("abort", onAbort);
                    if (isDefined(timer)) {
                        clearTimeout(timer);
                    }
                },
            });
            logger.verbose("[%s] %s request sent: %O", this.connection.id, request.to || "$management");
            this.sender.send(request);
        });
    }
    /**
     * Closes the sender, receiver link and the underlying session.
     * @returns Promise<void>
     */
    async close() {
        await this.sender.close({ closeSession: false });
        await this.receiver.close({ closeSession: false });
        await this.session.close();
    }
    /**
     * Removes the sender, receiver link and it's underlying session.
     * @returns void
     */
    remove() {
        this.sender.remove();
        this.receiver.remove();
        this.session.remove();
    }
    /**
     * Creates an amqp request/response link.
     *
     * @param connection - The amqp connection.
     * @param senderOptions - Options that must be provided to create the sender link.
     * @param receiverOptions - Options that must be provided to create the receiver link.
     * @param createOptions - Optional parameters that can be used to affect this method's behavior.
     *    For example, `abortSignal` can be passed to allow cancelling an in-progress `create` invocation.
     * @returns Promise<RequestResponseLink>
     */
    static async create(connection, senderOptions, receiverOptions, createOptions = {}) {
        const { abortSignal } = createOptions;
        const session = await connection.createSession({ abortSignal });
        const sender = await session.createSender(Object.assign(Object.assign({}, senderOptions), { abortSignal }));
        const receiver = await session.createReceiver(Object.assign(Object.assign({}, receiverOptions), { abortSignal }));
        logger.verbose("[%s] Successfully created the sender and receiver links on the same session.", connection.id);
        return new RequestResponseLink(session, sender, receiver);
    }
}
/**
 * @internal
 *
 * Handle different variations of property names in responses emitted by EventHubs and ServiceBus.
 */
export const getCodeDescriptionAndError = (props = {}) => {
    return {
        statusCode: (props[Constants.statusCode] || props.statusCode),
        statusDescription: (props[Constants.statusDescription] || props.statusDescription),
        errorCondition: (props[Constants.errorCondition] || props.errorCondition),
    };
};
/**
 * This is used as the onMessage handler for the "message" event on the receiver.
 *
 * (This is inspired from the message settlement sequence in service-bus SDK which
 * relies on a single listener for settled event for all the messages.)
 * The sequence is as follows:
 * 1. User calls `await RequestResponseLink.sendRequest()`
 * 2. This creates a `Promise` that gets stored in the _responsesMap
 * 3. When the service acknowledges the response, this method gets called for that request.
 * 4. We resolve() the promise from the _responsesMap with the message.
 * 5. User's code after the sendRequest continues.
 *
 * @internal
 */
export function onMessageReceived(context, connectionId, responsesMap) {
    const message = context.message;
    if (!message) {
        logger.verbose(`[${connectionId}] "message" property on the EventContext is "undefined" which is unexpected, ` +
            `returning from the "onMessageReceived" handler without resolving or rejecting the promise ` +
            `upon encountering the message event.`);
        return;
    }
    const responseCorrelationId = message.correlation_id;
    if (!responsesMap.has(responseCorrelationId)) {
        logger.verbose(`[${connectionId}] correlationId "${responseCorrelationId}" property on the response does not match with ` +
            `any of the "request-id"s in the map, returning from the "onMessageReceived" handler without resolving ` +
            `or rejecting the promise upon encountering the message event.`);
        return;
    }
    const promise = responsesMap.get(responseCorrelationId);
    promise.cleanupBeforeResolveOrReject();
    const deleteResult = responsesMap.delete(responseCorrelationId);
    logger.verbose(`[${connectionId}] Successfully deleted the response with id ${responseCorrelationId} from the map. ` +
        `Delete result - ${deleteResult}`);
    const info = getCodeDescriptionAndError(message.application_properties);
    let error;
    if (!info.statusCode) {
        error = new Error(`[${connectionId}] No statusCode in the "application_properties" in the returned response with correlation-id: ${responseCorrelationId}`);
    }
    if (info.statusCode > 199 && info.statusCode < 300) {
        logger.verbose(`[${connectionId}] Resolving the response with correlation-id: ${responseCorrelationId}`);
        return promise.resolve(message);
    }
    if (!error) {
        const condition = info.errorCondition || ConditionStatusMapper[info.statusCode] || "amqp:internal-error";
        error = translate({
            condition: condition,
            description: info.statusDescription,
        });
        logger.warning(`${error === null || error === void 0 ? void 0 : error.name}: ${error === null || error === void 0 ? void 0 : error.message}`);
    }
    logErrorStackTrace(error);
    return promise.reject(error);
}
function onSenderError(context, connectionId, responsesMap) {
    if (context.sender) {
        for (const [key, promise] of responsesMap.entries()) {
            logger.verbose(`[${connectionId}] Sender closed due to error when sending request with message_id "${key}"`);
            promise.cleanupBeforeResolveOrReject();
            promise.reject(context.sender.error);
        }
        responsesMap.clear();
    }
}
//# sourceMappingURL=requestResponseLink.js.map