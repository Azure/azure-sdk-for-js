// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventHubReceiver } from "./eventHubReceiver";
import { logErrorStackTrace, logger } from "./log";

/**
 * Describes the receive handler object that is returned from the receive() method with handlers.
 * The ReceiveHandler is used to stop receiving more messages.
 * @class ReceiveHandler
 * @ignore
 * @internal
 */
export class ReceiveHandler {
  /**
   * @property _receiver  The underlying EventHubReceiver.
   */
  private _receiver: EventHubReceiver;

  /**
   * Creates an instance of the ReceiveHandler.
   * @constructor
   * @internal
   * @param receiver The underlying EventHubReceiver.
   */
  constructor(receiver: EventHubReceiver) {
    this._receiver = receiver;
  }

  /**
   * @property The partitionId from which the handler is receiving events.
   * @readonly
   */
  get partitionId(): string | undefined {
    return this._receiver ? this._receiver.partitionId : undefined;
  }

  /**
   * @property The consumer group from which the handler is receiving events.
   * @readonly
   */
  get consumerGroup(): string | undefined {
    return this._receiver ? this._receiver.consumerGroup : undefined;
  }

  /**
   * @property Indicates whether the receiver is connected/open.
   * `true` - is open; `false` otherwise.
   * @readonly
   */
  get isReceiverOpen(): boolean {
    return this._receiver ? this._receiver.isOpen() : false;
  }

  /**
   * Stops the underlying EventHubReceiver from receiving more messages.
   * @returns Promise<void>
   * @throws Error if the underlying connection encounters an error while closing.
   */
  async stop(): Promise<void> {
    if (this._receiver) {
      try {
        await this._receiver.close();
      } catch (err) {
        logger.warning(
          "An error occurred while stopping the receiver '%s' with address '%s': %s",
          this._receiver.name,
          this._receiver.address,
          `${err?.name}: ${err?.message}`
        );
        logErrorStackTrace(err);
      }
    }
  }
}
