"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbsClient = void 0;
const abort_controller_1 = require("@azure/abort-controller");
const rhea_promise_1 = require("rhea-promise");
const log_js_1 = require("./log.js");
const constants_js_1 = require("./util/constants.js");
const requestResponseLink_js_1 = require("./requestResponseLink.js");
const constants_js_2 = require("./util/constants.js");
const utils_js_1 = require("./util/utils.js");
const core_util_1 = require("@azure/core-util");
const errors_js_1 = require("./errors.js");
/**
 * Describes the EventHub/ServiceBus Cbs client that talks to the $cbs endpoint over AMQP connection.
 */
class CbsClient {
    /**
     * @param connection - The AMQP connection.
     * @param connectionLock - A unique string (usually a guid) per connection.
     */
    constructor(connection, connectionLock) {
        /**
         * CBS endpoint - "$cbs"
         */
        this.endpoint = constants_js_1.Constants.cbsEndpoint;
        /**
         * CBS replyTo - The receiver link name that the service should reply to.
         */
        this.replyTo = `${constants_js_1.Constants.cbsReplyTo}-${(0, rhea_promise_1.generate_uuid)()}`;
        /**
         * The unique lock name per $cbs session per connection that is used to
         * acquire the lock for establishing a cbs session if one does not exist for an amqp connection.
         */
        this.cbsLock = `${constants_js_1.Constants.negotiateCbsKey}-${(0, rhea_promise_1.generate_uuid)()}`;
        this.connection = connection;
        this.connectionLock = connectionLock;
    }
    /**
     * Creates a singleton instance of the CBS session if it hasn't been initialized previously on
     * the given connection.
     * @param options - Optional parameters that can be used to affect this method's behavior.
     *    For example, `abortSignal` can be passed to allow cancelling an in-progress `init` invocation.
     * @returns Promise<void>.
     */
    async init(options = {}) {
        const { abortSignal, timeoutInMs } = options;
        try {
            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                throw new abort_controller_1.AbortError(constants_js_2.StandardAbortMessage);
            }
            // Acquire the lock and establish an amqp connection if it does not exist.
            if (!this.connection.isOpen()) {
                log_js_1.logger.verbose("The CBS client is trying to establish an AMQP connection.");
                await utils_js_1.defaultCancellableLock.acquire(this.connectionLock, () => {
                    return this.connection.open({ abortSignal });
                }, { abortSignal: abortSignal, timeoutInMs: timeoutInMs });
            }
            if (!this.isOpen()) {
                const rxOpt = {
                    source: {
                        address: this.endpoint,
                    },
                    name: this.replyTo,
                    onSessionError: (context) => {
                        const id = context.connection.options.id;
                        const ehError = (0, errors_js_1.translate)(context.session.error);
                        log_js_1.logger.verbose("[%s] An error occurred on the session for request/response links " + "for $cbs: %O", id, ehError);
                    },
                };
                const srOpt = { target: { address: this.endpoint } };
                log_js_1.logger.verbose("[%s] Creating sender/receiver links on a session for $cbs endpoint.", this.connection.id);
                this._cbsSenderReceiverLink = await requestResponseLink_js_1.RequestResponseLink.create(this.connection, srOpt, rxOpt, { abortSignal });
                this._cbsSenderReceiverLink.sender.on(rhea_promise_1.SenderEvents.senderError, (context) => {
                    const id = context.connection.options.id;
                    const ehError = (0, errors_js_1.translate)(context.sender.error);
                    log_js_1.logger.verbose("[%s] An error occurred on the cbs sender link.. %O", id, ehError);
                });
                this._cbsSenderReceiverLink.receiver.on(rhea_promise_1.ReceiverEvents.receiverError, (context) => {
                    const id = context.connection.options.id;
                    const ehError = (0, errors_js_1.translate)(context.receiver.error);
                    log_js_1.logger.verbose("[%s] An error occurred on the cbs receiver link.. %O", id, ehError);
                });
                log_js_1.logger.verbose("[%s] Successfully created the cbs sender '%s' and receiver '%s' " +
                    "links over cbs session.", this.connection.id, this._cbsSenderReceiverLink.sender.name, this._cbsSenderReceiverLink.receiver.name);
            }
            else {
                log_js_1.logger.verbose("[%s] CBS session is already present. Reusing the cbs sender '%s' " +
                    "and receiver '%s' links over cbs session.", this.connection.id, this._cbsSenderReceiverLink.sender.name, this._cbsSenderReceiverLink.receiver.name);
            }
        }
        catch (err) {
            const translatedError = (0, errors_js_1.translate)(err);
            log_js_1.logger.warning("[%s] An error occurred while establishing the cbs links: %s", this.connection.id, `${translatedError === null || translatedError === void 0 ? void 0 : translatedError.name}: ${translatedError === null || translatedError === void 0 ? void 0 : translatedError.message}`);
            (0, log_js_1.logErrorStackTrace)(translatedError);
            throw translatedError;
        }
    }
    /**
     * Negotiates the CBS claim with the EventHub/ServiceBus Service.
     * @param audience - The entity token audience for which the token is requested in one
     * of the following forms:
     *
     * - **ServiceBus**
     *    - **Sender**
     *        - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
     *        - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
     *
     *    - **Receiver**
     *         - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
     *         - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
     *
     *    - **ManagementClient**
     *         - `"sb://<your-namespace>.servicebus.windows.net/<queue-name>/$management"`.
     *         - `"sb://<your-namespace>.servicebus.windows.net/<topic-name>/$management"`.
     *
     * - **EventHubs**
     *     - **Sender**
     *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
     *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`.
     *
     *     - **Receiver**
     *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`.
     *
     *     - **ManagementClient**
     *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/$management"`.
     * @param token - The token that needs to be sent in the put-token request.
     * @param tokenType - The type of token being used. For example, 'jwt' or 'servicebus.windows.net:sastoken'.
     * @param options - Optional parameters that can be used to affect this method's behavior.
     *    For example, `abortSignal` can be passed to allow cancelling an in-progress `negotiateClaim` invocation.
     * @returns A Promise that resolves when $cbs authentication is successful
     * and rejects when an error occurs during $cbs authentication.
     */
    async negotiateClaim(audience, token, tokenType, options = {}) {
        const { abortSignal, timeoutInMs } = options;
        try {
            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                throw new abort_controller_1.AbortError(constants_js_2.StandardAbortMessage);
            }
            if (!this._cbsSenderReceiverLink) {
                throw new Error("Attempted to negotiate a claim but the CBS link does not exist.");
            }
            const request = {
                body: token,
                message_id: (0, rhea_promise_1.generate_uuid)(),
                reply_to: this.replyTo,
                to: this.endpoint,
                application_properties: {
                    operation: constants_js_1.Constants.operationPutToken,
                    name: audience,
                    type: tokenType,
                },
            };
            const responseMessage = await this._cbsSenderReceiverLink.sendRequest(request, {
                abortSignal,
                timeoutInMs,
                requestName: "negotiateClaim",
            });
            log_js_1.logger.verbose("[%s] The CBS response is: %O", this.connection.id, responseMessage);
            return this._fromRheaMessageResponse(responseMessage);
        }
        catch (err) {
            log_js_1.logger.warning("[%s] An error occurred while negotiating the cbs claim: %s", this.connection.id, (0, core_util_1.isError)(err) ? `${err.name}: ${err.message}` : String(err));
            (0, log_js_1.logErrorStackTrace)(err);
            throw err;
        }
    }
    /**
     * Closes the AMQP cbs session to the EventHub/ServiceBus for this client,
     * returning a promise that will be resolved when disconnection is completed.
     * @returns
     */
    async close() {
        try {
            if (this.isOpen()) {
                const cbsLink = this._cbsSenderReceiverLink;
                this._cbsSenderReceiverLink = undefined;
                await cbsLink.close();
                log_js_1.logger.verbose("[%s] Successfully closed the cbs session.", this.connection.id);
            }
        }
        catch (err) {
            const msg = `An error occurred while closing the cbs link: ${(0, core_util_1.isError)(err) && err.stack ? err.stack : JSON.stringify(err)}.`;
            log_js_1.logger.verbose("[%s] %s", this.connection.id, msg);
            throw new Error(msg);
        }
    }
    /**
     * Removes the AMQP cbs session to the EventHub/ServiceBus for this client,
     * @returns void
     */
    remove() {
        try {
            if (this._cbsSenderReceiverLink) {
                const cbsLink = this._cbsSenderReceiverLink;
                this._cbsSenderReceiverLink = undefined;
                cbsLink.remove();
                log_js_1.logger.verbose("[%s] Successfully removed the cbs session.", this.connection.id);
            }
        }
        catch (err) {
            const msg = `An error occurred while removing the cbs link: ${(0, core_util_1.isError)(err) && err.stack ? err.stack : JSON.stringify(err)}.`;
            log_js_1.logger.verbose("[%s] %s", this.connection.id, msg);
            throw new Error(msg);
        }
    }
    /**
     * Indicates whether the cbs sender receiver link is open or closed.
     * @returns `true` open, `false` closed.
     */
    isOpen() {
        var _a;
        return Boolean((_a = this._cbsSenderReceiverLink) === null || _a === void 0 ? void 0 : _a.isOpen());
    }
    _fromRheaMessageResponse(msg) {
        const cbsResponse = {
            correlationId: msg.correlation_id,
            statusCode: msg.application_properties ? msg.application_properties["status-code"] : "",
            statusDescription: msg.application_properties
                ? msg.application_properties["status-description"]
                : "",
        };
        log_js_1.logger.verbose("[%s] The deserialized CBS response is: %o", this.connection.id, cbsResponse);
        return cbsResponse;
    }
}
exports.CbsClient = CbsClient;
//# sourceMappingURL=cbs.js.map