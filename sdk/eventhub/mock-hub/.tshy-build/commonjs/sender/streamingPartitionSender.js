"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingPartitionSender = void 0;
const tslib_1 = require("tslib");
const abort_controller_1 = require("@azure/abort-controller");
const rhea_1 = tslib_1.__importDefault(require("rhea"));
/**
 * The StreamingPartitionSender is responsible for sending stored events to a client
 * listening for events on a partition.
 *
 */
class StreamingPartitionSender {
    /**
     * Instantiates a `StreamingPartitionSender`.
     * @param messageStore - The `MessageStore` that contains all of the messages sent to the service.
     * @param sender - The sender link that should be used to send messages to.
     * @param partitionId - Specifies which partition to send messages from.
     * @param startPosition - Specifies which message to start iterating from.
     * @param enableRuntimeMetric - Indicates whether partition info should be sent on each event.
     */
    constructor(messageStore, sender, partitionId, startPosition, enableRuntimeMetric) {
        this._abortController = new AbortController();
        this._messageStore = messageStore;
        this._messageIterator = messageStore.getMessageIterator(partitionId, startPosition);
        this._sender = sender;
        this._partitionId = partitionId;
        this._enableRuntimeMetric = enableRuntimeMetric;
    }
    /**
     * Starts sending messages.
     */
    start() {
        this._sendMessages().catch((err) => {
            console.error(`Unexpected error while sending messages`, err);
        });
    }
    /**
     * Stops sending messages.
     */
    stop() {
        this._abortController.abort();
    }
    async _sendMessages() {
        var _a;
        const abortSignal = this._abortController.signal;
        const iterator = this._messageIterator;
        const sender = this._sender;
        let nextResult;
        do {
            try {
                nextResult = await iterator.next(/* shouldStop */ abortSignal.aborted);
                // Check if the iterator is completed and we should exit the loop.
                const value = nextResult.value;
                if (!value || abortSignal.aborted) {
                    break;
                }
                // Set the message's message annotations.
                const messageAnnotations = (_a = value.message.message_annotations) !== null && _a !== void 0 ? _a : {};
                messageAnnotations["x-opt-sequence-number"] = rhea_1.default.types.wrap_long(value.sequenceNumber);
                messageAnnotations["x-opt-offset"] = `${value.offset}`;
                messageAnnotations["x-opt-enqueued-time"] = value.enqueuedTime;
                if (value.partitionKey) {
                    messageAnnotations["x-opt-partition-key"] = value.partitionKey;
                }
                // Set the `PartitionInfo` if `enableRuntimeMetric` is turned on.
                const deliveryAnnotations = {};
                if (this._enableRuntimeMetric) {
                    const partitionInfo = this._messageStore.getPartitionInfo(this._partitionId);
                    deliveryAnnotations["last_enqueued_offset"] = partitionInfo.lastEnqueuedOffset;
                    deliveryAnnotations["last_enqueued_sequence_number"] = rhea_1.default.types.wrap_long(partitionInfo.lastEnqueuedSequenceNumber);
                    deliveryAnnotations["last_enqueued_time_utc"] = partitionInfo.lastEnqueuedTimeUtc;
                    deliveryAnnotations["runtime_info_retrieval_time_utc"] = new Date();
                }
                // Wait for the sender link to have credit available before sending the message.
                if (!sender.has_credit()) {
                    await this._waitForSendable(sender, abortSignal);
                }
                const outgoingMessage = Object.assign({}, value.message);
                if (Object.keys(messageAnnotations).length) {
                    outgoingMessage.message_annotations = messageAnnotations;
                }
                if (Object.keys(deliveryAnnotations).length) {
                    outgoingMessage.delivery_annotations = deliveryAnnotations;
                }
                // And away it goes!
                sender.send(outgoingMessage);
            }
            catch (err) {
                if (err instanceof Error && err.name !== "AbortError") {
                    console.error(`Unexpected error while streaming events: `, err);
                }
            }
        } while (!abortSignal.aborted && !(nextResult === null || nextResult === void 0 ? void 0 : nextResult.done));
    }
    _waitForSendable(sender, abortSignal) {
        return new Promise((resolve, reject) => {
            const onAbort = () => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                sender.removeListener(rhea_1.default.SenderEvents.sendable, onSendable);
                abortSignal.removeEventListener("abort", onAbort);
                reject(new abort_controller_1.AbortError("Cancelled operation."));
            };
            const onSendable = () => {
                abortSignal.removeEventListener("abort", onAbort);
                resolve();
            };
            sender.once(rhea_1.default.SenderEvents.sendable, onSendable);
            abortSignal.addEventListener("abort", onAbort);
        });
    }
}
exports.StreamingPartitionSender = StreamingPartitionSender;
//# sourceMappingURL=streamingPartitionSender.js.map