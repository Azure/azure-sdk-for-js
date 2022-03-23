// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { logErrorStackTrace, logger } from "./log";
import { EventHubReceiver } from "./eventHubReceiver";

/**
 * Describes the receive handler object that is returned from the receive() method with handlers.
 * The ReceiveHandler is used to stop receiving more messages.
 * @internal
 */
export class ReceiveHandler {
  /**
   * The underlying EventHubReceiver.
   */
  private _receiver: EventHubReceiver;

  /**
   * Creates an instance of the ReceiveHandler.
   * @internal
   * @param receiver - The underlying EventHubReceiver.
   */
  constructor(receiver: EventHubReceiver) {
    this._receiver = receiver;
  }

  /**
   * The partitionId from which the handler is receiving events.
   * @readonly
   */
  get partitionId(): string | undefined {
    return this._receiver ? this._receiver.partitionId : undefined;
  }

  /**
   * The consumer group from which the handler is receiving events.
   * @readonly
   */
  get consumerGroup(): string | undefined {
    return this._receiver ? this._receiver.consumerGroup : undefined;
  }

  /**
   * Indicates whether the receiver is connected/open.
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
