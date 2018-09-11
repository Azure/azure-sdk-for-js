// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as log from "./log";
import { HostContextWithCheckpointLeaseManager } from "./hostContext";
import { PartitionPump } from "./partitionPump";
import { CompleteLease } from "./completeLease";
import { CloseReason } from "./modelTypes";
import { EPHActionStrings } from "./util/utils";

export class PumpManager {
  pumps: Map<string, PartitionPump> = new Map<string, PartitionPump>();
  private _context: HostContextWithCheckpointLeaseManager;

  constructor(context: HostContextWithCheckpointLeaseManager) {
    this._context = context;
  }

  async addPump(lease: CompleteLease): Promise<void> {
    const hostName = this._context.hostName;
    const partitionId = lease.partitionId;
    const withHostAndPartition = this._context.withHostAndPartition;
    try {
      const capturedPump = this.pumps.get(partitionId);
      if (capturedPump) {
        const isOpen = capturedPump.isOpen();
        if (!isOpen) {
          log.error(withHostAndPartition(partitionId, "The existing pump is open -> %s."), isOpen);
          await this.removePump(partitionId, CloseReason.shutdown);
        } else {
          log.pumpManager(withHostAndPartition(partitionId, "Updating lease for pump since it" +
            "is open -> %s."), partitionId, isOpen);
          capturedPump.lease = lease;
        }
      } else {
        log.pumpManager(withHostAndPartition(partitionId, "Creating a new pump with lease %o."),
          lease.getInfo());
        const pump = new PartitionPump(this._context, lease, this._context.onMessage!,
          this._context.onError!);
        await pump.start();
        this.pumps.set(partitionId, pump);
      }
    } catch (err) {
      const msg = `An error occurred while adding/updating a pump for partitionId ` +
        `'${partitionId}': ${err ? err.stack : JSON.stringify(err)}`;
      log.error(withHostAndPartition(partitionId, "%s."), msg);
      this._context.onEphError({
        hostName: hostName,
        partitionId: partitionId,
        error: new Error(msg),
        action: EPHActionStrings.partitionReceiverManagement
      });
    }
  }

  async removePump(partitionId: string, reason: CloseReason): Promise<void> {
    const withHostAndPartition = this._context.withHostAndPartition;
    try {
      const capturedPump = this.pumps.get(partitionId);
      if (capturedPump) {
        log.pumpManager(withHostAndPartition(partitionId, "Stopping the pump."));
        this.pumps.delete(partitionId);
        log.pumpManager(withHostAndPartition(partitionId, "Deleted the pump from internal map."));
        await capturedPump.stop(reason);
      } else {
        log.pumpManager(withHostAndPartition(partitionId, "No pump was found, to remove."));
      }
    } catch (err) {
      const msg = `An error occurred while removing a pump for partitionId '${partitionId}': ` +
        `${err ? err.stack : JSON.stringify(err)}`;
      log.error(withHostAndPartition(partitionId, "%s."), msg);
      this._context.onEphError({
        hostName: this._context.hostName,
        partitionId: partitionId,
        error: new Error(msg),
        action: EPHActionStrings.partitionReceiverManagement
      });
    }
  }

  async removeAllPumps(reason: CloseReason): Promise<void> {
    const withHost = this._context.withHost;
    const tasks: Promise<void>[] = [];
    for (const id of this.pumps.keys()) {
      tasks.push(this.removePump(id, reason));
    }
    log.partitionManager(withHost("Removing all the pumps due to reason %s."), reason);
    await Promise.all(tasks);
  }
}
