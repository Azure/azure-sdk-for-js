// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventHubClient } from "./impl/eventHubClient";
import { EventPosition } from "./eventPosition";
import { FullEventProcessorOptions, CloseReason } from "./eventProcessor";
import { PartitionProcessor } from "./partitionProcessor";
import { PartitionPump } from "./partitionPump";
import { logger, logErrorStackTrace } from "./log";

/**
 * The PumpManager handles the creation and removal of PartitionPumps.
 * It also starts a PartitionPump when it is created, and stops a
 * PartitionPump when it is removed.
 * @ignore
 * @internal
 */
export interface PumpManager {
  /**
   * Creates and starts a PartitionPump.
   * @param eventHubClient The EventHubClient to forward to the PartitionPump.
   * @param initialEventPosition The EventPosition to forward to the PartitionPump.
   * @param partitionProcessor The PartitionProcessor to forward to the PartitionPump.
   * @param abortSignal Used to cancel pump creation.
   * @ignore
   */
  createPump(
    eventHubClient: EventHubClient,
    initialEventPosition: EventPosition | undefined,
    partitionProcessor: PartitionProcessor
  ): Promise<void>;

  /**
   * Stops all PartitionPumps and removes them from the internal map.
   * @param reason The reason for removing the pump.
   * @ignore
   */
  removeAllPumps(reason: CloseReason): Promise<void>;
}

/**
 * The PumpManager handles the creation and removal of PartitionPumps.
 * It also starts a PartitionPump when it is created, and stops a
 * PartitionPump when it is removed.
 * @ignore
 * @internal
 */
export class PumpManagerImpl implements PumpManager {
  private readonly _eventProcessorName: string;
  private readonly _options: FullEventProcessorOptions;
  private _partitionIdToPumps: {
    [partitionId: string]: PartitionPump | undefined;
  } = {};

  /**
   * @ignore
   */
  constructor(eventProcessorName: string, eventProcessorOptions: FullEventProcessorOptions) {
    this._eventProcessorName = eventProcessorName;
    this._options = eventProcessorOptions;
  }

  /**
   * Returns a list of partitionIds that are actively receiving messages.
   * @ignore
   */
  public receivingFromPartitions(): string[] {
    return Object.keys(this._partitionIdToPumps).filter((id) => {
      const pump = this._partitionIdToPumps[id];
      return Boolean(pump && pump.isReceiving);
    });
  }

  /**
   * Creates and starts a PartitionPump.
   * @param eventHubClient The EventHubClient to forward to the PartitionPump.
   * @param initialEventPosition The EventPosition to forward to the PartitionPump.
   * @param partitionProcessor The PartitionProcessor to forward to the PartitionPump.
   * @param abortSignal Used to cancel pump creation.
   * @ignore
   */
  public async createPump(
    eventHubClient: EventHubClient,
    initialEventPosition: EventPosition | undefined,
    partitionProcessor: PartitionProcessor
  ): Promise<void> {
    const partitionId = partitionProcessor.partitionId;
    // attempt to get an existing pump
    const existingPump = this._partitionIdToPumps[partitionId];
    if (existingPump) {
      if (existingPump.isReceiving) {
        logger.verbose(
          `[${this._eventProcessorName}] [${partitionId}] The existing pump is running.`
        );
        return;
      }
      logger.verbose(
        `[${this._eventProcessorName}] [${partitionId}] The existing pump is not running.`
      );
      await this.removePump(partitionId, CloseReason.OwnershipLost);
    }

    logger.verbose(`[${this._eventProcessorName}] [${partitionId}] Creating a new pump.`);

    const pump = new PartitionPump(
      eventHubClient,
      partitionProcessor,
      initialEventPosition,
      this._options
    );

    try {
      await pump.start();
      this._partitionIdToPumps[partitionId] = pump;
    } catch (err) {
      logger.verbose(
        `[${this._eventProcessorName}] [${partitionId}] An error occured while adding/updating a pump: ${err}`
      );
      logErrorStackTrace(err);
    }
  }

  /**
   * Stop a PartitionPump and removes it from the internal map.
   * @param partitionId The partitionId to remove the associated PartitionPump from.
   * @param reason The reason for removing the pump.
   * @ignore
   */
  public async removePump(partitionId: string, reason: CloseReason): Promise<void> {
    try {
      const pump = this._partitionIdToPumps[partitionId];
      if (pump) {
        delete this._partitionIdToPumps[partitionId];
        logger.verbose(`[${this._eventProcessorName}] [${partitionId}] Stopping the pump.`);
        await pump.stop(reason);
      } else {
        logger.verbose(
          `[${this._eventProcessorName}] [${partitionId}] No pump was found to remove.`
        );
      }
    } catch (err) {
      logger.verbose(
        `[${this._eventProcessorName}] [${partitionId}] An error occured while removing a pump: ${err}`
      );
      logErrorStackTrace(err);
    }
  }

  /**
   * Stops all PartitionPumps and removes them from the internal map.
   * @param reason The reason for removing the pump.
   * @ignore
   */
  public async removeAllPumps(reason: CloseReason): Promise<void> {
    const partitionIds = Object.keys(this._partitionIdToPumps);

    logger.verbose(`[${this._eventProcessorName}] Removing all pumps due to reason ${reason}.`);

    const tasks: PromiseLike<void>[] = [];
    for (const partitionId of partitionIds) {
      const pump = this._partitionIdToPumps[partitionId];
      if (pump) {
        tasks.push(pump.stop(reason));
      }
    }

    try {
      await Promise.all(tasks);
    } catch (err) {
      logger.verbose(
        `[${this._eventProcessorName}] An error occured while removing all pumps: ${err}`
      );
      logErrorStackTrace(err);
    } finally {
      this._partitionIdToPumps = {};
    }
  }
}
