// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Constants } from "./amqp-common";
import { ReceiverEvents } from "./rhea-promise";
import { ReceiveOptions } from "./eventHubClient";
import { EventHubReceiver, ReceiverRuntimeInfo, OnMessage, OnError } from "./eventHubReceiver";
import { ConnectionContext } from "./connectionContext";
import * as log from "./log";

/**
 * Describes the receive handler object that is returned from the receive() method with handlers is
 * called. The ReceiveHandler is used to stop receiving more messages.
 * @class ReceiveHandler
 */
export class ReceiveHandler {
  /**
   * @property {string} name The Receiver handler name.
   * @readonly
   */
  readonly name: string;

  /**
   * @property {EventHubReceiver} _receiver  The underlying EventHubReceiver.
   * @private
   */
  private _receiver: EventHubReceiver;

  /**
   * Creates an instance of the ReceiveHandler.
   * @constructor
   * @param {EventHubReceiver} receiver The underlying EventHubReceiver.
   */
  constructor(receiver: EventHubReceiver) {
    this._receiver = receiver;
    this.name = receiver ? receiver.name : "ReceiveHandler";
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
   * @property {string} [address] The address of the underlying receiver.
   * @readonly
   */
  get address(): string | undefined {
    return this._receiver ? this._receiver.address : undefined;
  }

  /**
   * @property {number} [epoch] The epoch value of the underlying receiver, if present.
   * @readonly
   */
  get epoch(): number | undefined {
    return this._receiver ? this._receiver.epoch : undefined;
  }

  /**
   * @property {string} [identifier] The identifier of the underlying receiver, if present.
   * @readonly
   */
  get identifier(): string | undefined {
    return this._receiver ? this._receiver.identifier : undefined;
  }

  /**
   * @property {ReceiverRuntimeInfo} [runtimeInfo] The receiver runtime info. This property will only
   * be enabled when `enableReceiverRuntimeMetric` option is set to true in the
   * `client.receive()` method.
   * @readonly
   */
  get runtimeInfo(): ReceiverRuntimeInfo | undefined {
    return this._receiver ? this._receiver.runtimeInfo : undefined;
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
        log.error("An error occurred while stopping the receiver '%s' with address '%s': %O",
          this._receiver.name, this._receiver.address, err);
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

  /**
   * Instantiate a new receiver from the AMQP `Receiver`. Used by `EventHubClient`.
   * @ignore
   * @constructor
   * @param {EventHubClient} client                            The EventHub client.
   * @param {string} partitionId                               Partition ID from which to receive.
   * @param {ReceiveOptions} [options]                         Options for how you'd like to connect.
   * @param {string} [options.consumerGroup]                   Consumer group from which to receive.
   * @param {number} [options.prefetchCount]                   The upper limit of events this receiver will
   * actively receive regardless of whether a receive operation is pending.
   * @param {boolean} [options.enableReceiverRuntimeMetric]    Provides the approximate receiver runtime information
   * for a logical partition of an Event Hub if the value is true. Default false.
   * @param {number} [options.epoch]                           The epoch value that this receiver is currently
   * using for partition ownership. A value of undefined means this receiver is not an epoch-based receiver.
   * @param {EventPosition} [options.eventPosition]            The position of EventData in the EventHub parition from
   * where the receiver should start receiving. Only one of offset, sequenceNumber, enqueuedTime, customFilter can be specified.
   * `EventPosition.withCustomFilter()` should be used if you want more fine-grained control of the filtering.
   * See https://github.com/Azure/amqpnetlite/wiki/Azure%20Service%20Bus%20Event%20Hubs for details.
   */
  constructor(context: ConnectionContext, partitionId: string | number, options?: ReceiveOptions) {
    super(context, partitionId, options);
  }

  /**
   * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
   * @ignore
   * @param {OnMessage} onMessage The message handler to receive event data objects.
   * @param {OnError} onError The error handler to receive an error that occurs while receivin messages.
   */
  receive(onMessage: OnMessage, onError: OnError): void {
    if (!onMessage || typeof onMessage !== "function") {
      throw new Error("'onMessage' is a required parameter and must be of type 'function'.");
    }
    if (!onError || typeof onError !== "function") {
      throw new Error("'onError' is a required parameter and must be of type 'function'.");
    }
    this._onMessage = onMessage;
    this._onError = onError;
    if (!this.isOpen()) {
      this._init().catch((err) => {
        this._onError!(err);
      });
    } else {
      // It is possible that the receiver link has been established due to a previous receive() call. If that
      // is the case then add message and error event handlers to the receiver. When the receiver will be closed
      // these handlers will be automatically removed.
      log.streaming("[%s] Receiver link is already present for '%s' due to previous receive() calls. " +
        "Hence reusing it and attaching message and error handlers.", this._context.connectionId, this.name);
      this._receiver!.registerHandler(ReceiverEvents.message, this._onAmqpMessage);
      this._receiver!.registerHandler(ReceiverEvents.receiverError, this._onAmqpError);
      this._receiver!.setCreditWindow(Constants.defaultPrefetchCount);
      this._receiver!.addCredit(Constants.defaultPrefetchCount);
      log.streaming("[%s] Receiver '%s', set the prefetch count to 1000 and " +
        "providing a credit of the same amount.", this._context.connectionId, this.name);
    }
  }

  /**
   * Creates a streaming receiver.
   * @static
   * @ignore
   * @param {ConnectionContext} context    The connection context.
   * @param {string | number} partitionId  The partitionId to receive events from.
   * @param {ReceiveOptions} [options]     Receive options.
   */
  static create(context: ConnectionContext, partitionId: string | number, options?: ReceiveOptions): StreamingReceiver {
    const sReceiver = new StreamingReceiver(context, partitionId, options);
    context.receivers[sReceiver.name] = sReceiver;
    return sReceiver;
  }
}
