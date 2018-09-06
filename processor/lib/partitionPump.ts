// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as log from "./log";
import { HostContext } from "./hostContext";
import { CompleteLease } from "./completeLease";
import {
  ReceiveHandler, EventHubClient, EventPosition, ReceiveOptions, EventData, MessagingError,
  OnMessage, OnError
} from "azure-event-hubs";
import { PartitionContext } from "./partitionContext";
import { CloseReason, OnReceivedMessage, OnReceivedError } from "./modelTypes";
import { AzureBlobLease } from './azureBlobLease';
import { EPHActionStrings } from './util/utils';

export class PartitionPump {
  private _context: HostContext;
  private _lease: CompleteLease;
  private _partitionContext: PartitionContext;
  private _onMessage: OnReceivedMessage;
  private _onError: OnReceivedError;
  private _client?: EventHubClient;
  private _receiveHandler?: ReceiveHandler;
  private _leaseRenewalTimer?: NodeJS.Timer;

  constructor(context: HostContext, lease: CompleteLease, onMessage: OnReceivedMessage,
    onError: OnReceivedError) {
    this._context = context;
    this._lease = lease;
    this._onMessage = onMessage;
    this._onError = onError;
    this._partitionContext = new PartitionContext(this._context, this._lease.partitionId,
      this._lease);
  }

  set lease(newLease: CompleteLease) {
    this._lease = newLease;
    if (this._partitionContext) {
      this._partitionContext.lease = this._lease;
    }
  }

  isOpen(): boolean {
    if (this._receiveHandler && this._receiveHandler.isReceiverOpen) {
      return true;
    } else {
      return false;
    }
  }

  async start(): Promise<void> {
    await this._createNewReceiver();
    await this._scheduleLeaseRenewer();
    log.partitionPump("[%s] Successfully started the receiver for partitionId '%s' and scheduled " +
      "lease renewer.", this._context.hostName, this._lease.partitionId);
  }

  async stop(reason: CloseReason): Promise<void> {
    await this._removeReceiver(reason);
  }

  private async _createNewReceiver(): Promise<void> {
    const hostName = this._context.hostName;
    const partitionId = this._partitionContext.partitionId;
    try {
      this._client = this._context.getEventHubClient();
    } catch (err) {
      log.error("[%s] An error occurred while creating the eventhub client for partitionId '%s': %O.",
        hostName, partitionId, err);
      throw err;
    }
    log.partitionPump("[%s] Getting the initial offset for partitionId '%s'.", hostName, partitionId);
    const eventPosition: EventPosition = await this._partitionContext.getInitialOffset();
    let receiveHandler: ReceiveHandler;
    const rcvrOptions: ReceiveOptions = {
      consumerGroup: this._context.consumerGroup,
      eventPosition: eventPosition,
      epoch: this._lease.epoch
    };
    const onMessage: OnMessage = (eventData: EventData) => {
      this._partitionContext.setOffsetAndSequenceNumber(eventData);
      this._onMessage(this._partitionContext, eventData);
    };
    const onError: OnError = async (error: MessagingError | Error) => {
      log.error("[%s] Receiver '%s' received an error: %O.", hostName, receiveHandler.address, error);
      this._onError!(error);
      try {
        await this._removeReceiver(CloseReason.shutdown);
      } catch (err) {
        log.error("[%s] Since we received an error %O on the error handler for receiver with " +
          "address '%s', we tried closing it. However, an error occurred while closing it " +
          "and it is: %O", hostName, error, receiveHandler.address, err);
      }
    };
    receiveHandler = this._client.receive(partitionId, onMessage, onError, rcvrOptions);
    this._receiveHandler = receiveHandler;
    log.partitionPump("[%s] Attaching receiver '%s' for partition '%s' with eventPosition: %s",
      hostName, receiveHandler.address, partitionId, eventPosition.getExpression());
  }

  private async _leaseRenewer(): Promise<void> {
    let result: boolean = true;
    let error: Error | undefined;
    try {
      result = await this._context.leaseManager.renewLease(this._lease);
      if (result) {
        log.partitionPump("[%s] Successfully renewed the lease for partitionId '%s'.",
          this._context.hostName, this._lease.partitionId);
      }
    } catch (err) {
      const msg = `An error occurred while renewing the lease for partitionId ` +
        `'${this._lease.partitionId}': ${err ? err.stack : JSON.stringify(err)}`;
      error = new Error(msg);
      this._context.onEphError({
        hostName: this._context.hostName,
        partitionId: this._lease.partitionId,
        error: error,
        action: EPHActionStrings.renewingLease
      });
      log.error("[%s] %s", this._context.hostName, msg);
    }
    if (!result) {
      log.error("[%s] Failed to renew the lease for partitionId '%s', result: %s. " +
        "Shutting down the receiver.", this._context.hostName, this._lease.partitionId, result);
      this._removeReceiver(CloseReason.leaseLost);
    } else {
      this._scheduleLeaseRenewer();
    }
  }

  private async _scheduleLeaseRenewer() {
    const renewalTime = this._context.leaseRenewInterval * 1000;
    log.partitionPump("[%s] Scheduling lease renewal for partitionId '%s' in %d seconds.",
      this._context.hostName, this._lease.partitionId, renewalTime);
    this._leaseRenewalTimer = setTimeout(this._leaseRenewer, renewalTime);
  }

  private async _removeReceiver(reason: CloseReason): Promise<void> {
    const hostName = this._context.hostName;
    const receiveHandler = this._receiveHandler;
    const partitionContext = this._partitionContext;
    const partitionId = partitionContext.partitionId;
    const leaseId = (this._lease as AzureBlobLease).token;
    if (receiveHandler && this._client) {
      try {
        clearTimeout(this._leaseRenewalTimer as NodeJS.Timer);
        log.partitionManager("[%s] Removing receiver '%s' for partitionId '%s' due to reason '%s'.",
          hostName, receiveHandler.address, partitionId, reason);
        await this._client.close();
        log.partitionManager("[%s] Successfully stopped the receiver '%s' for partitionId '%s' " +
          "due to reason '%s'.", hostName, receiveHandler.address, partitionId, reason);
      } catch (err) {
        const msg = `An error occurred while closing the receiver '${receiveHandler.address}' : ` +
          `${err ? err.stack : JSON.stringify(err)}`;
        log.error("[%s] %s", hostName, msg);
      }
      this._receiveHandler = undefined;
      this._client = undefined;
      if (reason !== CloseReason.leaseLost) {
        try {
          log.partitionManager("[%s] Releasing lease %s after closing the receiver '%s' due to " +
            "reason '%s'.", hostName, leaseId, receiveHandler.address, reason);
          await this._context.leaseManager.releaseLease(partitionContext.lease);
        } catch (err) {
          const msg = `An error occurred while releasing the lease ${leaseId} ` +
            `the receiver '${receiveHandler.address}' : ${err ? err.stack : JSON.stringify(err)} `;
          log.error("[%s] %s", hostName, msg);
          if (err.name && err.name !== "LeaseLostError") {
            throw err;
          }
        }
      }
    } else {
      log.partitionManager("[%s] No receiver was found to remove for partitionId '%s'",
        hostName, partitionId);
    }
  }
}
