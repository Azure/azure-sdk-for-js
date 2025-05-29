// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants, ErrorNameConditionMapper } from "@azure/core-amqp";
import { receiverLogger as logger } from "../log.js";
import { LinkEntity } from "./linkEntity.js";
import { DispositionType } from "../serviceBusMessage.js";
import { getUniqueName } from "../util/utils.js";
import { onMessageSettled, createReceiverOptions } from "./shared.js";
import { translateServiceBusError } from "../serviceBusError.js";
/**
 * @internal
 * Describes the MessageReceiver that will receive messages from ServiceBus.
 */
export class MessageReceiver extends LinkEntity {
    constructor(identifier, context, entityPath, receiverType, options) {
        super(entityPath, entityPath, context, receiverType, logger, {
            address: entityPath,
            audience: `${context.config.endpoint}${entityPath}`,
        });
        this.identifier = identifier;
        /**
         * Maintains a map of deliveries that
         * are being actively disposed. It acts as a store for correlating the responses received for
         * active dispositions.
         */
        this._deliveryDispositionMap = new Map();
        this.receiverType = receiverType;
        this.receiveMode = options.receiveMode || "peekLock";
        // If explicitly set to false then autoComplete is false else true (default).
        this.autoComplete =
            options.autoCompleteMessages === false ? options.autoCompleteMessages : true;
        this._lockRenewer = options.lockRenewer;
    }
    /**
     * Creates the options that need to be specified while creating an AMQP receiver link.
     */
    _createReceiverOptions(useNewName, handlers) {
        const rcvrOptions = createReceiverOptions(useNewName ? getUniqueName(this.baseName) : this.name, this.receiveMode, {
            address: this.address,
        }, this.identifier, Object.assign({ onSettled: (context) => {
                return onMessageSettled(this.logPrefix, context.delivery, this._deliveryDispositionMap);
            } }, handlers));
        return rcvrOptions;
    }
    /**
     * Creates a new AMQP receiver under a new AMQP session.
     */
    async _init(options, abortSignal) {
        try {
            await this.initLink(options, abortSignal);
            // It is possible for someone to close the receiver and then start it again.
            // Thus make sure that the receiver is present in the client cache.
            this._context.messageReceivers[this.name] = this;
        }
        catch (err) {
            const translatedError = translateServiceBusError(err);
            logger.logError(translatedError, "%s An error occured while creating the receiver", this.logPrefix);
            // Fix the unhelpful error messages for the OperationTimeoutError that comes from `rhea-promise`.
            if (translatedError.code === "OperationTimeoutError") {
                translatedError.message =
                    "Failed to create a receiver within allocated time and retry attempts.";
            }
            throw translatedError;
        }
    }
    createRheaLink(options, _abortSignal) {
        return this._context.connection.createReceiver(options);
    }
    /**
     * Clears lock renewal timers on all active messages, clears token remewal for current receiver,
     * removes current MessageReceiver instance from cache, and closes the underlying AMQP receiver.
     * @returns Promise<void>.
     */
    async close() {
        var _a;
        (_a = this._lockRenewer) === null || _a === void 0 ? void 0 : _a.stopAll(this);
        await super.close();
    }
    /**
     * Settles the message with the specified disposition.
     * @param message - The ServiceBus Message that needs to be settled.
     * @param operation - The disposition type.
     * @param options - Optional parameters that can be provided while disposing the message.
     */
    async settleMessage(message, operation, options) {
        return new Promise((resolve, reject) => {
            var _a, _b, _c;
            if (operation.match(/^(complete|abandon|defer|deadletter)$/) == null) {
                return reject(new Error(`operation: '${operation}' is not a valid operation.`));
            }
            (_a = this._lockRenewer) === null || _a === void 0 ? void 0 : _a.stop(this, message);
            const delivery = message.delivery;
            const timer = setTimeout(() => {
                this._deliveryDispositionMap.delete(delivery.id);
                logger.verbose("%s Disposition for delivery id: %d, did not complete in %d milliseconds. " +
                    "Hence rejecting the promise with timeout error.", this.logPrefix, delivery.id, Constants.defaultOperationTimeoutInMs);
                const e = {
                    condition: ErrorNameConditionMapper.ServiceUnavailableError,
                    description: "Operation to settle the message has timed out. The disposition of the " +
                        "message may or may not be successful",
                };
                return reject(translateServiceBusError(e));
            }, (_c = (_b = options.retryOptions) === null || _b === void 0 ? void 0 : _b.timeoutInMs) !== null && _c !== void 0 ? _c : Constants.defaultOperationTimeoutInMs);
            this._deliveryDispositionMap.set(delivery.id, {
                resolve: resolve,
                reject: reject,
                timer: timer,
            });
            if (operation === DispositionType.complete) {
                delivery.accept();
            }
            else if (operation === DispositionType.abandon) {
                const params = {
                    undeliverable_here: false,
                };
                if (options.propertiesToModify)
                    params.message_annotations = options.propertiesToModify;
                delivery.modified(params);
            }
            else if (operation === DispositionType.defer) {
                const params = {
                    undeliverable_here: true,
                };
                if (options.propertiesToModify)
                    params.message_annotations = options.propertiesToModify;
                delivery.modified(params);
            }
            else if (operation === DispositionType.deadletter) {
                const error = {
                    condition: Constants.deadLetterName,
                    info: Object.assign(Object.assign({}, options.propertiesToModify), { DeadLetterReason: options.deadLetterReason, DeadLetterErrorDescription: options.deadLetterDescription }),
                };
                delivery.reject(error);
            }
        });
    }
}
//# sourceMappingURL=messageReceiver.js.map