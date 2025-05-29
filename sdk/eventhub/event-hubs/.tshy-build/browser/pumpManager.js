// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { logErrorStackTrace, logger } from "./logger.js";
import { CloseReason } from "./models/public.js";
import { PartitionPump } from "./partitionPump.js";
/**
 * The PumpManager handles the creation and removal of PartitionPumps.
 * It also starts a PartitionPump when it is created, and stops a
 * PartitionPump when it is removed.
 * @internal
 */
export class PumpManagerImpl {
    constructor(eventProcessorName, eventProcessorOptions) {
        this._partitionIdToPumps = {};
        this._eventProcessorName = eventProcessorName;
        this._options = eventProcessorOptions;
    }
    /**
     * Returns a list of partitionIds that are actively receiving messages.
     */
    receivingFromPartitions() {
        return Object.keys(this._partitionIdToPumps).filter((id) => {
            const pump = this._partitionIdToPumps[id];
            return Boolean(pump && pump.isReceiving);
        });
    }
    /**
     * Indicates whether the pump manager is actively receiving events from a given partition.
     * @internal
     */
    isReceivingFromPartition(partitionId) {
        const pump = this._partitionIdToPumps[partitionId];
        return Boolean(pump && pump.isReceiving);
    }
    /**
     * Creates and starts a PartitionPump.
     * @param startPosition - The position in the partition to start reading from.
     * @param connectionContext - The ConnectionContext to forward to the PartitionPump.
     * @param partitionProcessor - The PartitionProcessor to forward to the PartitionPump.
     */
    async createPump(startPosition, connectionContext, partitionProcessor, abortSignal) {
        const partitionId = partitionProcessor.partitionId;
        if (abortSignal.aborted) {
            logger.verbose(`${this._eventProcessorName}] The subscription was closed before creating the pump for partition ${partitionId}.`);
            return;
        }
        // attempt to get an existing pump
        const existingPump = this._partitionIdToPumps[partitionId];
        if (existingPump) {
            if (existingPump.isReceiving) {
                logger.verbose(`[${this._eventProcessorName}] [${partitionId}] The existing pump is running.`);
                return;
            }
            logger.verbose(`[${this._eventProcessorName}] [${partitionId}] The existing pump is not running.`);
            await this.removePump(partitionId, CloseReason.OwnershipLost);
        }
        logger.verbose(`[${this._eventProcessorName}] [${partitionId}] Creating a new pump.`);
        const pump = new PartitionPump(connectionContext, partitionProcessor, startPosition, this._options);
        try {
            // Set the pump before starting it in case the user
            // closes the subscription while `start()` is in progress.
            this._partitionIdToPumps[partitionId] = pump;
            await pump.start();
        }
        catch (err) {
            logger.verbose(`[${this._eventProcessorName}] [${partitionId}] An error occured while adding/updating a pump: ${err}`);
            logErrorStackTrace(err);
        }
    }
    /**
     * Stop a PartitionPump and removes it from the internal map.
     * @param partitionId - The partitionId to remove the associated PartitionPump from.
     * @param reason - The reason for removing the pump.
     */
    async removePump(partitionId, reason) {
        try {
            const pump = this._partitionIdToPumps[partitionId];
            if (pump) {
                delete this._partitionIdToPumps[partitionId];
                logger.verbose(`[${this._eventProcessorName}] [${partitionId}] Stopping the pump.`);
                await pump.stop(reason);
            }
            else {
                logger.verbose(`[${this._eventProcessorName}] [${partitionId}] No pump was found to remove.`);
            }
        }
        catch (err) {
            logger.verbose(`[${this._eventProcessorName}] [${partitionId}] An error occured while removing a pump: ${err}`);
            logErrorStackTrace(err);
        }
    }
    /**
     * Stops all PartitionPumps and removes them from the internal map.
     * @param reason - The reason for removing the pump.
     */
    async removeAllPumps(reason) {
        const partitionIds = Object.keys(this._partitionIdToPumps);
        logger.verbose(`[${this._eventProcessorName}] Removing all pumps due to reason ${reason}.`);
        const tasks = [];
        for (const partitionId of partitionIds) {
            const pump = this._partitionIdToPumps[partitionId];
            if (pump) {
                tasks.push(pump.stop(reason));
            }
        }
        try {
            await Promise.all(tasks);
        }
        catch (err) {
            logger.verbose(`[${this._eventProcessorName}] An error occured while removing all pumps: ${err}`);
            logErrorStackTrace(err);
        }
        finally {
            this._partitionIdToPumps = {};
        }
    }
}
//# sourceMappingURL=pumpManager.js.map