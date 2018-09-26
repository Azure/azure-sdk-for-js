// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as log from "./log";
import { HostContextWithCheckpointLeaseManager } from "./hostContext";
import { CompleteLease } from "./completeLease";
import {
  ReceiveHandler, EventHubClient, EventPosition, ReceiveOptions, EventData, MessagingError,
  OnMessage, OnError, ErrorNameConditionMapper
} from "@azure/event-hubs";
import { PartitionContext } from "./partitionContext";
import { CloseReason, OnReceivedMessage, OnReceivedError } from "./modelTypes";
import { AzureBlobLease } from "./azureBlobLease";
import { EPHActionStrings } from "./util/utils";

/**
 * @ignore
 */
export class PartitionPump {
  private _context: HostContextWithCheckpointLeaseManager;
  private _lease: CompleteLease;
  private _partitionContext: PartitionContext;
  private _onMessage: OnReceivedMessage;
  private _onError: OnReceivedError;
  private _client?: EventHubClient;
  private _receiveHandler?: ReceiveHandler;
  private _leaseRenewalTimer?: NodeJS.Timer;

  constructor(context: HostContextWithCheckpointLeaseManager, lease: CompleteLease,
    onMessage: OnReceivedMessage, onError: OnReceivedError) {
    this._context = context;
    this._lease = lease;
    this._partitionContext = new PartitionContext(this._context, lease.partitionId, lease);
    this._onMessage = onMessage;
    this._onError = onError;
  }

  get lease(): CompleteLease {
    return this._lease;
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
    const withHostAndPartition = this._context.withHostAndPartition;
    await this._createNewReceiver();
    await this._scheduleLeaseRenewer();
    log.partitionPump(withHostAndPartition(this._lease,
      "Successfully started the receiver and scheduled lease renewer."));
  }

  async stop(reason: CloseReason): Promise<void> {
    await this._removeReceiver(reason);
  }

  private async _createNewReceiver(): Promise<void> {
    const partitionId = this._partitionContext.partitionId;
    const withHostAndPartition = this._context.withHostAndPartition;
    try {
      this._client = this._context.getEventHubClient();
    } catch (err) {
      log.error(withHostAndPartition(partitionId, "An error occurred while creating " +
        "the eventhub client: %O."), err);
      throw err;
    }
    log.partitionPump(withHostAndPartition(partitionId, "Getting the initial offset."));
    const eventPosition: EventPosition = await this._partitionContext.getInitialOffset();
    this._context.pumps.set(partitionId, this);
    log.partitionPump(withHostAndPartition(partitionId, "Added the pump to the internal map."));
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
      log.error(withHostAndPartition(partitionId, "Receiver '%s' received an error: %O."),
        receiveHandler.address, error);
      // Let the user know about the error only if it is not ReceiverDisconnectedError.
      // This error happens when another instance of EPH connects a receiver with a higher epoch
      // value to a partition in the same consumer group that this receiver was connected to.
      // This happens due to lease being stolen or current lease expiring, which is expected.
      // Hence not reporting suxh errors to the user will try to make it less confusing for the user.
      if (!this._isReceiverDisconnectedError(error)) {
        this._onError!(error);
      }
      try {
        await this._removeReceiver(CloseReason.shutdown);
      } catch (err) {
        log.error(withHostAndPartition(partitionId, "Since we received an error %O " +
          "on the error handler for receiver with address '%s', we tried closing it. However, " +
          "error occurred while closing it and it is: %O."), error, receiveHandler.address, err);
      }
    };
    log.partitionPump(withHostAndPartition(partitionId, "Trying to create receiver in " +
      "consumergroup: '%s' with epoch %d from offset: %s."), rcvrOptions.consumerGroup,
      rcvrOptions.epoch, eventPosition.getExpression());
    receiveHandler = this._client.receive(partitionId, onMessage, onError, rcvrOptions);
    this._receiveHandler = receiveHandler;
    log.partitionPump(withHostAndPartition(partitionId, "Created receiver '%s' with eventPosition: %s"),
      receiveHandler.address, eventPosition.getExpression());
  }

  private async _leaseRenewer(): Promise<void> {
    const withHostAndPartition = this._context.withHostAndPartition;
    let result: boolean = true;
    let error: Error | undefined;
    log.partitionPump(withHostAndPartition(this._lease, "Lease renewer is active after " +
      "%d seconds. Trying to renew the lease"), this._context.leaseRenewInterval);
    try {
      result = await this._context.leaseManager.renewLease(this._lease);
      if (result) {
        log.partitionPump(withHostAndPartition(this._lease, "Successfully renewed the lease."));
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
      log.error(withHostAndPartition(this._lease, msg));
    }
    if (!result) {
      log.error(withHostAndPartition(this._lease, "Failed to renew the lease, result: %s. " +
        "Shutting down the receiver."), result);
      await this._removeReceiver(CloseReason.leaseLost);
    } else {
      this._scheduleLeaseRenewer();
    }
  }

  private _scheduleLeaseRenewer(): void {
    const withHostAndPartition = this._context.withHostAndPartition;
    const renewalTime = this._context.leaseRenewInterval * 1000;
    log.partitionPump(withHostAndPartition(this._lease, "Scheduling lease renewal in %d seconds."),
      this._context.leaseRenewInterval);
    this._leaseRenewalTimer = setTimeout(async () => {
      try {
        await this._leaseRenewer();
      } catch (err) {
        log.error(withHostAndPartition(this._lease, "An error occurred in the _leaseRenewer(): %O"),
          err);
      }
    }, renewalTime);
  }

  private async _removeReceiver(reason: CloseReason): Promise<void> {
    const receiveHandler = this._receiveHandler;
    const partitionContext = this._partitionContext;
    const partitionId = partitionContext.partitionId;
    const leaseId = (this._lease as AzureBlobLease).token;
    const withHostAndPartition = this._context.withHostAndPartition;

    if (receiveHandler && this._client) {
      try {
        this._context.pumps.delete(partitionId);
        log.partitionPump(withHostAndPartition(partitionId, "Deleted the pump from internal map."));
        clearTimeout(this._leaseRenewalTimer as NodeJS.Timer);
        log.partitionPump(withHostAndPartition(partitionId,
          "Removing receiver '%s', due to reason '%s'."), receiveHandler.address, partitionId, reason);
        await this._client.close();
        log.partitionPump(withHostAndPartition(partitionId,
          "Successfully stopped the receiver '%s' for partitionId '%s' due to reason '%s'."),
          receiveHandler.address, partitionId, reason);
      } catch (err) {
        const msg = `An error occurred while closing the receiver '${receiveHandler.address}' : ` +
          `${err ? err.stack : JSON.stringify(err)}`;
        log.error(withHostAndPartition(partitionId, "%s"), msg);
      }
      this._receiveHandler = undefined;
      this._client = undefined;
      // Release the lease if it was not lost.
      if (reason !== CloseReason.leaseLost) {
        try {
          log.partitionPump(withHostAndPartition(partitionContext,
            "Releasing lease %s after closing the receiver '%s' due to reason '%s'."), leaseId,
            receiveHandler.address, reason);
          await this._context.leaseManager.releaseLease(partitionContext.lease);
        } catch (err) {
          const msg = `An error occurred while releasing the lease ${leaseId} ` +
            `the receiver '${receiveHandler.address}' : ${err ? err.stack : JSON.stringify(err)} `;
          log.error(withHostAndPartition(partitionId, "%s"), msg);
          throw err;
        }
      }
    } else {
      log.partitionPump(withHostAndPartition(partitionId, "No receiver was found to remove."));
    }
  }

  private _isReceiverDisconnectedError(error: MessagingError | Error): boolean {
    const partitionId = this._partitionContext.partitionId;
    const withHostAndPartition = this._context.withHostAndPartition;
    let result = false;
    if (error) {
      // condition is "amqp:link:stolen"
      if ((error as MessagingError).condition === ErrorNameConditionMapper.ReceiverDisconnectedError) {
        result = true;
      } else if (error.message.match(/.*New receiver with higher epoch.*/i) !== null) {
        result = true;
        log.error(withHostAndPartition(partitionId, "It looks like the error should have " +
          "been a 'ReceiverDisconnectedError', however it was not translated correctly: %O."), error);
      }
    }
    return result;
  }
}
