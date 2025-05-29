import type { AbortSignalLike } from "@azure/abort-controller";
import { CloseReason } from "./models/public.js";
import type { CommonEventProcessorOptions } from "./models/private.js";
import type { ConnectionContext } from "./connectionContext.js";
import type { EventPosition } from "./eventPosition.js";
import type { PartitionProcessor } from "./partitionProcessor.js";
/**
 * The PumpManager handles the creation and removal of PartitionPumps.
 * It also starts a PartitionPump when it is created, and stops a
 * PartitionPump when it is removed.
 * @internal
 */
export interface PumpManager {
    /**
     * Creates and starts a PartitionPump.
     * @param startPosition - The position in the partition to start reading from.
     * @param eventHubClient - The EventHubClient to forward to the PartitionPump.
     * @param partitionProcessor - The PartitionProcessor to forward to the PartitionPump.
     * @param abortSignal - Used to cancel pump creation.
     */
    createPump(startPosition: EventPosition, connectionContext: ConnectionContext, partitionProcessor: PartitionProcessor, abortSignal: AbortSignalLike): Promise<void>;
    /**
     * Indicates whether the pump manager is actively receiving events from a given partition.
     * @param partitionId - The partition to check.
     */
    isReceivingFromPartition(partitionId: string): boolean;
    /**
     * Stops all PartitionPumps and removes them from the internal map.
     * @param reason - The reason for removing the pump.
     */
    removeAllPumps(reason: CloseReason): Promise<void>;
}
/**
 * The PumpManager handles the creation and removal of PartitionPumps.
 * It also starts a PartitionPump when it is created, and stops a
 * PartitionPump when it is removed.
 * @internal
 */
export declare class PumpManagerImpl implements PumpManager {
    private readonly _eventProcessorName;
    private readonly _options;
    private _partitionIdToPumps;
    constructor(eventProcessorName: string, eventProcessorOptions: CommonEventProcessorOptions);
    /**
     * Returns a list of partitionIds that are actively receiving messages.
     */
    receivingFromPartitions(): string[];
    /**
     * Indicates whether the pump manager is actively receiving events from a given partition.
     * @internal
     */
    isReceivingFromPartition(partitionId: string): boolean;
    /**
     * Creates and starts a PartitionPump.
     * @param startPosition - The position in the partition to start reading from.
     * @param connectionContext - The ConnectionContext to forward to the PartitionPump.
     * @param partitionProcessor - The PartitionProcessor to forward to the PartitionPump.
     */
    createPump(startPosition: EventPosition, connectionContext: ConnectionContext, partitionProcessor: PartitionProcessor, abortSignal: AbortSignalLike): Promise<void>;
    /**
     * Stop a PartitionPump and removes it from the internal map.
     * @param partitionId - The partitionId to remove the associated PartitionPump from.
     * @param reason - The reason for removing the pump.
     */
    removePump(partitionId: string, reason: CloseReason): Promise<void>;
    /**
     * Stops all PartitionPumps and removes them from the internal map.
     * @param reason - The reason for removing the pump.
     */
    removeAllPumps(reason: CloseReason): Promise<void>;
}
//# sourceMappingURL=pumpManager.d.ts.map