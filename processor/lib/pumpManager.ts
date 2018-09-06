// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as log from "./log";
import { HostContext } from "./hostContext";
import { PartitionPump } from "./partitionPump";
import { CompleteLease } from "./completeLease";
import { CloseReason } from "./modelTypes";
import { EPHActionStrings } from "./util/utils";

export class PumpManager {
  private _context: HostContext;
  private _pumps: Map<string, PartitionPump> = new Map<string, PartitionPump>();

  constructor(context: HostContext) {
    this._context = context;
  }

  async addPump(lease: CompleteLease): Promise<void> {
    const hostName = this._context.hostName;
    const partitionId = lease.partitionId;
    try {
      const capturedPump = this._pumps.get(partitionId);
      if (capturedPump) {
        const isOpen = !capturedPump.isOpen();
        if (!isOpen) {
          log.error("[%s] The existing pump for partitionId '%s' is open -> %s.",
            hostName, partitionId, isOpen);
          await this.removePump(partitionId, CloseReason.shutdown);
        } else {
          log.pumpManager("[%s] Updating lease for pump for partitionId '%s' since it" +
            "is open -> %s.", hostName, partitionId, isOpen);
          capturedPump.lease = lease;
        }
      } else {
        log.pumpManager("[%s] Creating a new pump with lease %o.", hostName, lease.getInfo());
        const pump = new PartitionPump(this._context, lease, this._context.onMessage!,
          this._context.onError!);
        await pump.start();
        this._pumps.set(partitionId, pump);
      }
    } catch (err) {
      const msg = `An error occurred while adding/updating a pump for partitionId '${partitionId}': ` +
        `${err ? err.stack : JSON.stringify(err)}`;
      log.error("[%s] %s.", this._context.hostName, msg);
      this._context.onEphError({
        hostName: hostName,
        partitionId: partitionId,
        error: new Error(msg),
        action: EPHActionStrings.partitionReceiverManagement
      });
    }
  }

  async removePump(partitionId: string, reason: CloseReason) {
    try {
      const capturedPump = this._pumps.get(partitionId);
      if (capturedPump) {
        log.pumpManager("[%s] Stopping the pump for partitionId '%s'", this._context.hostName,
          partitionId);
        await capturedPump.stop(reason);
      } else {
        log.pumpManager("[%s] No pump was found, to remove for partitionId '%s'",
          this._context.hostName, partitionId);
      }
    } catch (err) {
      const msg = `An error occurred while removing a pump for partitionId '${partitionId}': ` +
        `${err ? err.stack : JSON.stringify(err)}`;
      log.error("[%s] %s.", this._context.hostName, msg);
      this._context.onEphError({
        hostName: this._context.hostName,
        partitionId: partitionId,
        error: new Error(msg),
        action: EPHActionStrings.partitionReceiverManagement
      });
    }
  }

  async removeAllPumps(reason: CloseReason): Promise<void> {
    const tasks: Promise<void>[] = [];
    for (const id of this._pumps.keys()) {
      tasks.push(this.removePump(id, reason));
    }
    log.partitionManager("[%s] Removing all the pumps due to reason %s.",
      this._context.hostName, reason);
    await Promise.all(tasks);
  }
}