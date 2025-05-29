"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementClient = void 0;
const core_amqp_1 = require("@azure/core-amqp");
const rhea_promise_1 = require("rhea-promise");
const logger_js_1 = require("./logger.js");
const error_js_1 = require("./util/error.js");
const tracing_js_1 = require("./diagnostics/tracing.js");
const retries_js_1 = require("./util/retries.js");
const withAuth_js_1 = require("./withAuth.js");
const utils_js_1 = require("./util/utils.js");
/**
 * @internal
 * Describes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
class ManagementClient {
    /**
     * Instantiates the management client.
     * @param context - The connection context.
     * @param address - The address for the management endpoint. For IotHub it will be
     * `/messages/events/$management`.
     */
    constructor(context, { address, audience } = {}) {
        this.managementLock = (0, utils_js_1.getRandomName)(core_amqp_1.Constants.managementRequestKey);
        /**
         * The reply to Guid for the management client.
         */
        this.replyTo = (0, utils_js_1.getRandomName)();
        this.address = address !== null && address !== void 0 ? address : core_amqp_1.Constants.management;
        this.audience = audience !== null && audience !== void 0 ? audience : context.config.getManagementAudience();
        this._context = context;
        const logPrefix = (0, logger_js_1.createManagementLogPrefix)(this._context.connectionId);
        this.logger = (0, logger_js_1.createSimpleLogger)(logger_js_1.logger, logPrefix);
        this.entityPath = context.config.entityPath;
    }
    /**
     * Gets the security token for the management application properties.
     * @internal
     */
    async getSecurityToken() {
        if ((0, core_amqp_1.isSasTokenProvider)(this._context.tokenCredential)) {
            // the security_token has the $management address removed from the end of the audience
            // expected audience: sb://fully.qualified.namespace/event-hub-name/$management
            const audienceParts = this.audience.split("/");
            // for management links, address should be '$management'
            if (audienceParts[audienceParts.length - 1] === this.address) {
                audienceParts.pop();
            }
            const audience = audienceParts.join("/");
            return this._context.tokenCredential.getToken(audience);
        }
        // aad credentials use the aad scope
        return this._context.tokenCredential.getToken(core_amqp_1.Constants.aadEventHubsScope);
    }
    /**
     * Provides the eventhub runtime information.
     */
    async getEventHubProperties(options = {}) {
        (0, error_js_1.throwErrorIfConnectionClosed)(this._context);
        return tracing_js_1.tracingClient.withSpan("ManagementClient.getEventHubProperties", options, async (updatedOptions) => {
            try {
                const securityToken = await this.getSecurityToken();
                const request = {
                    body: Buffer.from(JSON.stringify([])),
                    message_id: (0, utils_js_1.getRandomName)(),
                    reply_to: this.replyTo,
                    application_properties: {
                        operation: core_amqp_1.Constants.readOperation,
                        name: this.entityPath,
                        type: `${core_amqp_1.Constants.vendorString}:${core_amqp_1.Constants.eventHub}`,
                        security_token: securityToken === null || securityToken === void 0 ? void 0 : securityToken.token,
                    },
                };
                const info = await this._makeManagementRequest(request, Object.assign(Object.assign({}, updatedOptions), { requestName: "getHubRuntimeInformation" }));
                const runtimeInfo = {
                    name: info.name,
                    createdOn: new Date(info.created_at),
                    partitionIds: info.partition_ids,
                    isGeoDrEnabled: info.georeplication_factor > 1,
                };
                logger_js_1.logger.verbose("the hub runtime info is: %O", runtimeInfo);
                return runtimeInfo;
            }
            catch (error) {
                logger_js_1.logger.warning(`an error occurred while getting the hub runtime information: ${error === null || error === void 0 ? void 0 : error.name}: ${error === null || error === void 0 ? void 0 : error.message}`);
                (0, logger_js_1.logErrorStackTrace)(error);
                throw error;
            }
        }, (0, tracing_js_1.toSpanOptions)(this._context.config));
    }
    /**
     * Provides information about the specified partition.
     * @param partitionId - Partition ID for which partition information is required.
     */
    async getPartitionProperties(partitionId, options = {}) {
        (0, error_js_1.throwErrorIfConnectionClosed)(this._context);
        (0, error_js_1.throwTypeErrorIfParameterMissing)(this._context.connectionId, "getPartitionProperties", "partitionId", partitionId);
        partitionId = String(partitionId);
        return tracing_js_1.tracingClient.withSpan("ManagementClient.getPartitionProperties", options, async (updatedOptions) => {
            try {
                const securityToken = await this.getSecurityToken();
                const request = {
                    body: Buffer.from(JSON.stringify([])),
                    message_id: (0, utils_js_1.getRandomName)(),
                    reply_to: this.replyTo,
                    application_properties: {
                        operation: core_amqp_1.Constants.readOperation,
                        name: this.entityPath,
                        type: `${core_amqp_1.Constants.vendorString}:${core_amqp_1.Constants.partition}`,
                        partition: `${partitionId}`,
                        security_token: securityToken === null || securityToken === void 0 ? void 0 : securityToken.token,
                    },
                };
                const info = await this._makeManagementRequest(request, Object.assign(Object.assign({}, updatedOptions), { requestName: "getPartitionInformation" }));
                const partitionInfo = {
                    beginningSequenceNumber: info.begin_sequence_number,
                    eventHubName: info.name,
                    lastEnqueuedOffset: info.last_enqueued_offset,
                    lastEnqueuedOnUtc: new Date(info.last_enqueued_time_utc),
                    lastEnqueuedSequenceNumber: info.last_enqueued_sequence_number,
                    partitionId: info.partition,
                    isEmpty: info.is_partition_empty,
                };
                logger_js_1.logger.verbose("the partition info is: %O.", partitionInfo);
                return partitionInfo;
            }
            catch (error) {
                logger_js_1.logger.warning(`an error occurred while getting the partition information: ${error === null || error === void 0 ? void 0 : error.name}: ${error === null || error === void 0 ? void 0 : error.message}`);
                (0, logger_js_1.logErrorStackTrace)(error);
                throw error;
            }
        }, (0, tracing_js_1.toSpanOptions)(this._context.config));
    }
    /**
     * Closes the AMQP management session to the Event Hub for this client,
     * returning a promise that will be resolved when disconnection is completed.
     */
    async close() {
        var _a;
        try {
            // Always stop the auth loop when closing the management link.
            (_a = this.authLoop) === null || _a === void 0 ? void 0 : _a.stop();
            if (this._isMgmtRequestResponseLinkOpen()) {
                const mgmtLink = this._mgmtReqResLink;
                this._mgmtReqResLink = undefined;
                await mgmtLink.close();
                logger_js_1.logger.info("successfully closed the management session.");
            }
        }
        catch (err) {
            const msg = `an error occurred while closing the management session: ${err === null || err === void 0 ? void 0 : err.name}: ${err === null || err === void 0 ? void 0 : err.message}`;
            logger_js_1.logger.warning(msg);
            (0, logger_js_1.logErrorStackTrace)(err);
            throw new Error(msg);
        }
    }
    async _init({ abortSignal, timeoutInMs, }) {
        const createLink = async () => {
            const rxopt = {
                source: { address: this.address },
                name: this.replyTo,
                target: { address: this.replyTo },
                onSessionError: (context) => {
                    const ehError = (0, core_amqp_1.translate)(context.session.error);
                    logger_js_1.logger.verbose("an error occurred on the session for request/response links for " + "$management: %O", ehError);
                },
            };
            const sropt = {
                target: { address: this.address },
            };
            logger_js_1.logger.verbose("creating sender/receiver links with " + "srOpts: %o, receiverOpts: %O.", sropt, rxopt);
            this._mgmtReqResLink = await core_amqp_1.RequestResponseLink.create(this._context.connection, sropt, rxopt, { abortSignal });
            this._mgmtReqResLink.sender.on(rhea_promise_1.SenderEvents.senderError, (context) => {
                const ehError = (0, core_amqp_1.translate)(context.sender.error);
                logger_js_1.logger.verbose("an error occurred on the $management sender link.. %O", ehError);
            });
            this._mgmtReqResLink.receiver.on(rhea_promise_1.ReceiverEvents.receiverError, (context) => {
                const ehError = (0, core_amqp_1.translate)(context.receiver.error);
                logger_js_1.logger.verbose("an error occurred on the $management receiver link.. %O", ehError);
            });
            logger_js_1.logger.verbose("created sender '%s' and receiver '%s' links", this._mgmtReqResLink.sender.name, this._mgmtReqResLink.receiver.name);
        };
        try {
            if (!this._isMgmtRequestResponseLinkOpen()) {
                // Wait for the connectionContext to be ready to open the link.
                await this._context.readyToOpenLink();
                this.authLoop = await (0, withAuth_js_1.withAuth)(createLink, this._context, this.audience, timeoutInMs, this.logger, { abortSignal });
            }
        }
        catch (err) {
            const translatedError = (0, core_amqp_1.translate)(err);
            logger_js_1.logger.warning(`an error occurred while establishing the links: ${translatedError === null || translatedError === void 0 ? void 0 : translatedError.name}: ${translatedError === null || translatedError === void 0 ? void 0 : translatedError.message}`);
            (0, logger_js_1.logErrorStackTrace)(translatedError);
            throw translatedError;
        }
    }
    /**
     * Helper method to make the management request
     * @param request - The AMQP message to send
     * @param options - The options to use when sending a request over a $management link
     */
    async _makeManagementRequest(request, options = {}) {
        const retryOptions = options.retryOptions || {};
        try {
            const abortSignal = options && options.abortSignal;
            const sendOperationPromise = async () => {
                let count = 0;
                const retryTimeoutInMs = (0, retries_js_1.getRetryAttemptTimeoutInMs)(options.retryOptions);
                let timeTakenByInit = 0;
                if (!this._isMgmtRequestResponseLinkOpen()) {
                    logger_js_1.logger.verbose("acquiring lock to get the management req res link.");
                    const initOperationStartTime = Date.now();
                    try {
                        await core_amqp_1.defaultCancellableLock.acquire(this.managementLock, () => {
                            const acquireLockEndTime = Date.now();
                            const timeoutInMs = retryTimeoutInMs - (acquireLockEndTime - initOperationStartTime);
                            return this._init({ abortSignal, timeoutInMs });
                        }, { abortSignal, timeoutInMs: retryTimeoutInMs });
                    }
                    catch (err) {
                        const translatedError = (0, core_amqp_1.translate)(err);
                        logger_js_1.logger.warning("an error occurred while creating the link: %s", `${translatedError === null || translatedError === void 0 ? void 0 : translatedError.name}: ${translatedError === null || translatedError === void 0 ? void 0 : translatedError.message}`);
                        (0, logger_js_1.logErrorStackTrace)(translatedError);
                        throw translatedError;
                    }
                    timeTakenByInit = Date.now() - initOperationStartTime;
                }
                const remainingOperationTimeoutInMs = retryTimeoutInMs - timeTakenByInit;
                const sendRequestOptions = {
                    abortSignal: options.abortSignal,
                    requestName: options.requestName,
                    timeoutInMs: remainingOperationTimeoutInMs,
                };
                count++;
                if (count !== 1) {
                    // Generate a new message_id every time after the first attempt
                    request.message_id = (0, utils_js_1.getRandomName)();
                }
                else if (!request.message_id) {
                    // Set the message_id in the first attempt only if it is not set
                    request.message_id = (0, utils_js_1.getRandomName)();
                }
                return this._mgmtReqResLink.sendRequest(request, sendRequestOptions);
            };
            const config = Object.defineProperties({
                operation: sendOperationPromise,
                operationType: core_amqp_1.RetryOperationType.management,
                abortSignal: abortSignal,
                retryOptions: retryOptions,
            }, {
                connectionId: {
                    enumerable: true,
                    get: () => {
                        return this._context.connectionId;
                    },
                },
            });
            return (await (0, core_amqp_1.retry)(config)).body;
        }
        catch (err) {
            const translatedError = (0, core_amqp_1.translate)(err);
            logger_js_1.logger.warning("an error occurred during send on management request-response link with address: %s", `${translatedError === null || translatedError === void 0 ? void 0 : translatedError.name}: ${translatedError === null || translatedError === void 0 ? void 0 : translatedError.message}`);
            (0, logger_js_1.logErrorStackTrace)(translatedError);
            throw translatedError;
        }
    }
    _isMgmtRequestResponseLinkOpen() {
        return this._mgmtReqResLink && this._mgmtReqResLink.isOpen();
    }
}
exports.ManagementClient = ManagementClient;
//# sourceMappingURL=managementClient.js.map