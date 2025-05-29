import type { TracingSpanOptions } from "@azure/core-tracing";
import { CloseReason } from "./models/public.js";
import type { CommonEventProcessorOptions } from "./models/private.js";
import type { ConnectionContext } from "./connectionContext.js";
import type { EventHubConnectionConfig } from "./eventhubConnectionConfig.js";
import type { EventPosition } from "./eventPosition.js";
import type { PartitionProcessor } from "./partitionProcessor.js";
import type { ReceivedEventData } from "./eventData.js";
/**
 * @internal
 */
export declare class PartitionPump {
    private _context;
    private readonly _startPosition;
    private _partitionProcessor;
    private _processorOptions;
    private _receiver;
    private _isReceiving;
    private _isStopped;
    private _abortController;
    constructor(_context: ConnectionContext, partitionProcessor: PartitionProcessor, _startPosition: EventPosition, options: CommonEventProcessorOptions);
    get isReceiving(): boolean;
    start(): Promise<void>;
    /**
     * Creates a new `PartitionReceiver` and replaces any existing receiver.
     * @param partitionId - The partition the receiver should read messages from.
     * @param lastSeenSequenceNumber - The sequence number to begin receiving messages from (exclusive).
     * If `-1`, then the PartitionPump's startPosition will be used instead.
     */
    private _setOrReplaceReceiver;
    private _receiveEvents;
    stop(reason: CloseReason): Promise<void>;
}
/**
 * @internal
 */
export declare function toProcessingSpanOptions(receivedEvents: ReceivedEventData[], eventHubProperties: Pick<EventHubConnectionConfig, "entityPath" | "host">): TracingSpanOptions;
//# sourceMappingURL=partitionPump.d.ts.map