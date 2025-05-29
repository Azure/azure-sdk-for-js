import rhea from "rhea";
import type { MessageStore } from "../storage/messageStore.js";
import type { EventPosition } from "../utils/eventPosition.js";
/**
 * The StreamingPartitionSender is responsible for sending stored events to a client
 * listening for events on a partition.
 *
 */
export declare class StreamingPartitionSender {
    private _messageStore;
    private _messageIterator;
    private _partitionId;
    private _sender;
    private _abortController;
    private _enableRuntimeMetric;
    /**
     * Instantiates a `StreamingPartitionSender`.
     * @param messageStore - The `MessageStore` that contains all of the messages sent to the service.
     * @param sender - The sender link that should be used to send messages to.
     * @param partitionId - Specifies which partition to send messages from.
     * @param startPosition - Specifies which message to start iterating from.
     * @param enableRuntimeMetric - Indicates whether partition info should be sent on each event.
     */
    constructor(messageStore: MessageStore, sender: rhea.Sender, partitionId: string, startPosition: EventPosition, enableRuntimeMetric: boolean);
    /**
     * Starts sending messages.
     */
    start(): void;
    /**
     * Stops sending messages.
     */
    stop(): void;
    private _sendMessages;
    private _waitForSendable;
}
//# sourceMappingURL=streamingPartitionSender.d.ts.map