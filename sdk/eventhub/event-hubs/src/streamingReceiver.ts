// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Constants } from "@azure/core-amqp";
import { ReceiverEvents } from "rhea-promise";
import { EventHubConsumerOptions } from "./eventHubClient";
import { EventHubReceiver, OnMessage, OnError } from "./eventHubReceiver";
import { ConnectionContext } from "./connectionContext";
import * as log from "./log";
import { AbortSignalLike } from "@azure/abort-controller";
import { EventPosition } from "./eventPosition";

/**
 * Describes the receive handler object that is returned from the receive() method with handlers is
 * called. The ReceiveHandler is used to stop receiving more messages.
 * @class ReceiveHandler
 */
export class ReceiveHandler {
  /**
   * @property {EventHubReceiver} _receiver  The underlying EventHubReceiver.
   * @private
   */
  private _receiver: EventHubReceiver;

  /**
   * Creates an instance of the ReceiveHandler.
   * @constructor
   * @private
   * @param {EventHubReceiver} receiver The underlying EventHubReceiver.
   */
  constructor(receiver: EventHubReceiver) {
    this._receiver = receiver;
  }

  /**
   * @property {string | number} [partitionId] The partitionId from which the handler is receiving
   * events from.
   * @readonly
   */

  get partitionId(): string | number | undefined {
    return this._receiver ? this._receiver.partitionId : undefined;
  }

  /**
   * @property {string} [consumerGroup] The consumer group from which the handler is receiving
   * events from.
   * @readonly
   */

  get consumerGroup(): string | undefined {
    return this._receiver ? this._receiver.consumerGroup : undefined;
  }

  /**
   * @property {boolean} isReceiverOpen Indicates whether the receiver is connected/open.
   * `true` - is open; `false` otherwise.
   * @readonly
   */
  get isReceiverOpen(): boolean {
    return this._receiver ? this._receiver.isOpen() : false;
  }

  /**
   * Stops the underlying EventHubReceiver from receiving more messages.
   * @return {Promise<void>} Promise<void>
   */
  async stop(): Promise<void> {
    if (this._receiver) {
      try {
        await this._receiver.close();
      } catch (err) {
        log.error(
          "An error occurred while stopping the receiver '%s' with address '%s': %O",
          this._receiver.name,
          this._receiver.address,
          err
        );
      }
    }
  }
}

/**
 * Describes the streaming receiver where the user can receive the message
 * by providing handler functions.
 * @ignore
 * @class StreamingReceiver
 * @extends EventHubReceiver
 */
export class StreamingReceiver extends EventHubReceiver {
  receiveHandler: ReceiveHandler;
  /**
   * Instantiate a new receiver from the AMQP `Receiver`. Used by `EventHubClient`.
   * @ignore
   * @constructor
   * @param {EventHubClient} client          The EventHub client.
   * @param {string} consumerGroup The consumer group from which the receiver should receive events from.
   * @param {string} partitionId             Partition ID from which to receive.
   * @param {EventPosition} eventPosition    The event position in the partition at
   * @param {EventHubConsumerOptions} [options]       Options for how you'd like to connect.
   */
  constructor(
    context: ConnectionContext,
    consumerGroup: string,
    partitionId: string | number,
    eventPosition: EventPosition,
    options?: EventHubConsumerOptions
  ) {
    super(context, consumerGroup, partitionId, eventPosition, options);
    this.receiveHandler = new ReceiveHandler(this);
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   * @ignore
   * @param {OnMessage} onMessage The message handler to receive event data objects.
   * @param {OnError} onError The error handler to receive an error that occurs while receivin messages.
   * @param {AbortSignalLike} abortSignal Signal to cancel current operation.
   */
  receive(onMessage: OnMessage, onError: OnError, abortSignal?: AbortSignalLike): ReceiveHandler {
    this._onMessage = onMessage;
    this._onError = onError;
    if (abortSignal) {
      // exit early if operation already cancelled
      if (abortSignal.aborted) {
        this._onAbort();
        return this.receiveHandler;
      }

      this._abortSignal = abortSignal;
      this._abortSignal.addEventListener("abort", this._onAbort);
    }
    if (!this.isOpen()) {
      this._init()
        .then(() => {
          if (abortSignal && abortSignal.aborted) {
            return this._onAbort();
          }
        })
        .catch(err => {
          this._onError!(err);
        });
    } else {
      // It is possible that the receiver link has been established due to a previous receive() call. If that
      // is the case then add message and error event handlers to the receiver. When the receiver will be closed
      // these handlers will be automatically removed.
      log.streaming(
        "[%s] Receiver link is already present for '%s' due to previous receive() calls. " +
          "Hence reusing it and attaching message and error handlers.",
        this._context.connectionId,
        this.name
      );
      this._receiver!.on(ReceiverEvents.message, this._onAmqpMessage);
      this._receiver!.on(ReceiverEvents.receiverError, this._onAmqpError);
      this._receiver!.setCreditWindow(Constants.defaultPrefetchCount);
      this._receiver!.addCredit(Constants.defaultPrefetchCount);
      log.streaming(
        "[%s] Receiver '%s', set the prefetch count to 1000 and " + "providing a credit of the same amount.",
        this._context.connectionId,
        this.name
      );
    }
    return this.receiveHandler;
  }

  /**
   * Creates a streaming receiver.
   * @static
   * @ignore
   * @param {ConnectionContext} context    The connection context.
   * @param {string} consumerGroup The consumer group from which the receiver should receive events from.
   * @param {string | number} partitionId  The partitionId to receive events from.
   * @param {EventPosition} eventPosition The event position in the partition at which to start receiving messages.
   * @param {EventHubConsumerOptions} [options]     Receive options.
   */
  static create(
    context: ConnectionContext,
    consumerGroup: string,
    partitionId: string | number,
    eventPosition: EventPosition,
    options?: EventHubConsumerOptions
  ): StreamingReceiver {
    const sReceiver = new StreamingReceiver(context, consumerGroup, partitionId, eventPosition, options);
    context.receivers[sReceiver.name] = sReceiver;
    return sReceiver;
  }
}
