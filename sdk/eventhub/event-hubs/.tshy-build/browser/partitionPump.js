// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { logErrorStackTrace, logger } from "./logger.js";
import { CloseReason } from "./models/public.js";
import { createReceiver } from "./partitionReceiver.js";
import { toSpanOptions, tracingClient } from "./diagnostics/tracing.js";
import { extractSpanContextFromEventData } from "./diagnostics/instrumentEventData.js";
/**
 * @internal
 */
export class PartitionPump {
    constructor(_context, partitionProcessor, _startPosition, options) {
        this._context = _context;
        this._startPosition = _startPosition;
        this._isReceiving = false;
        this._isStopped = false;
        this._partitionProcessor = partitionProcessor;
        this._processorOptions = options;
        this._abortController = new AbortController();
    }
    get isReceiving() {
        return this._isReceiving;
    }
    async start() {
        this._isReceiving = true;
        try {
            await this._partitionProcessor.initialize();
        }
        catch (err) {
            // swallow the error from the user-defined code
            this._partitionProcessor.processError(err);
        }
        // this is intentionally not await'd - the _receiveEvents loop will continue to
        // execute and can be stopped by calling .stop()
        this._receiveEvents(this._partitionProcessor.partitionId);
        logger.info(`Successfully started the receiver for partition "${this._partitionProcessor.partitionId}".`);
    }
    /**
     * Creates a new `PartitionReceiver` and replaces any existing receiver.
     * @param partitionId - The partition the receiver should read messages from.
     * @param lastSeenSequenceNumber - The sequence number to begin receiving messages from (exclusive).
     * If `-1`, then the PartitionPump's startPosition will be used instead.
     */
    _setOrReplaceReceiver(partitionId, lastSeenSequenceNumber) {
        // Determine what the new EventPosition should be.
        // If this PartitionPump has received events, we'll start from the last
        // seen sequenceNumber (exclusive).
        // Otherwise, use the `_startPosition`.
        const currentEventPosition = lastSeenSequenceNumber >= 0
            ? {
                sequenceNumber: lastSeenSequenceNumber,
                isInclusive: false,
            }
            : this._startPosition;
        // Set or replace the PartitionPump's receiver.
        this._receiver = createReceiver(this._context, this._partitionProcessor.consumerGroup, this._partitionProcessor.eventProcessorId, partitionId, currentEventPosition, {
            ownerLevel: this._processorOptions.ownerLevel,
            trackLastEnqueuedEventProperties: this._processorOptions.trackLastEnqueuedEventProperties,
            retryOptions: this._processorOptions.retryOptions,
            skipParsingBodyAsJson: this._processorOptions.skipParsingBodyAsJson,
            prefetchCount: this._processorOptions.prefetchCount,
        });
        return this._receiver;
    }
    async _receiveEvents(partitionId) {
        let lastSeenSequenceNumber = -1;
        let receiver = this._setOrReplaceReceiver(partitionId, lastSeenSequenceNumber);
        while (this._isReceiving) {
            try {
                // Check if the receiver was closed so we can recreate it.
                if (receiver.isClosed) {
                    receiver = this._setOrReplaceReceiver(partitionId, lastSeenSequenceNumber);
                }
                const receivedEvents = await receiver.receiveBatch(this._processorOptions.maxBatchSize, this._processorOptions.maxWaitTimeInSeconds, this._abortController.signal);
                if (this._processorOptions.trackLastEnqueuedEventProperties &&
                    receiver.lastEnqueuedEventProperties) {
                    this._partitionProcessor.lastEnqueuedEventProperties =
                        receiver.lastEnqueuedEventProperties;
                }
                // avoid calling user's processEvents handler if the pump was stopped while receiving events
                if (!this._isReceiving) {
                    return;
                }
                if (receivedEvents.length) {
                    lastSeenSequenceNumber = receivedEvents[receivedEvents.length - 1].sequenceNumber;
                }
                await tracingClient.withSpan("PartitionPump.process", {}, () => this._partitionProcessor.processEvents(receivedEvents), toProcessingSpanOptions(receivedEvents, this._context.config));
            }
            catch (err) {
                // check if this pump is still receiving
                // it may not be if the EventProcessor was stopped during processEvents
                if (!this._isReceiving) {
                    // no longer receiving, so close was called from somewhere else
                    return;
                }
                logger.warning(`An error was thrown while receiving or processing events on partition "${this._partitionProcessor.partitionId}"`);
                logErrorStackTrace(err);
                // forward error to user's processError and swallow errors they may throw
                try {
                    await this._partitionProcessor.processError(err);
                }
                catch (errorFromUser) {
                    // Using verbose over warning because this error is swallowed.
                    logger.verbose("An error was thrown by user's processError method: ", errorFromUser);
                }
                // close the partition processor if a non-retryable error was encountered
                if (typeof err !== "object" || !err.retryable) {
                    try {
                        // If the exception indicates that the partition was stolen (i.e some other consumer with same ownerlevel
                        // started consuming the partition), update the closeReason
                        if (err.code === "ReceiverDisconnectedError") {
                            return await this.stop(CloseReason.OwnershipLost);
                        }
                        // this will close the pump and will break us out of the while loop
                        return await this.stop(CloseReason.Shutdown);
                    }
                    catch (errorFromStop) {
                        // Using verbose over warning because this error is swallowed.
                        logger.verbose(`An error occurred while closing the receiver with reason ${CloseReason.Shutdown}: `, errorFromStop);
                    }
                }
            }
        }
    }
    async stop(reason) {
        var _a;
        if (this._isStopped) {
            return;
        }
        this._isStopped = true;
        this._isReceiving = false;
        try {
            // Trigger the cancellation before closing the receiver,
            // otherwise the receiver will remove the listener on the abortSignal
            // before it has a chance to be emitted.
            this._abortController.abort();
            await ((_a = this._receiver) === null || _a === void 0 ? void 0 : _a.close());
            await this._partitionProcessor.close(reason);
        }
        catch (err) {
            logger.warning(`An error occurred while closing the receiver: ${err === null || err === void 0 ? void 0 : err.name}: ${err === null || err === void 0 ? void 0 : err.message}`);
            logErrorStackTrace(err);
            this._partitionProcessor.processError(err);
            throw err;
        }
    }
}
/**
 * @internal
 */
export function toProcessingSpanOptions(receivedEvents, eventHubProperties) {
    const spanLinks = [];
    for (const receivedEvent of receivedEvents) {
        const tracingContext = extractSpanContextFromEventData(receivedEvent);
        if (tracingContext) {
            spanLinks.push({
                tracingContext,
                attributes: {
                    enqueuedTime: receivedEvent.enqueuedTimeUtc.getTime(),
                },
            });
        }
    }
    return Object.assign({ spanLinks, spanKind: "consumer" }, toSpanOptions(eventHubProperties, "process"));
}
//# sourceMappingURL=partitionPump.js.map