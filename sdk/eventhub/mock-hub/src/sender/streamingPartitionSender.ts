// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortError, AbortSignalLike } from "@azure/abort-controller";
import { DeliveryAnnotations, Sender, SenderEvents, types } from "rhea";
import { MessageRecord, MessageStore } from "../storage/messageStore";
import { EventPosition } from "../utils/eventPosition";
import { Message } from "rhea";

/**
 * The StreamingPartitionSender is responsible for sending stored events to a client
 * listening for events on a partition.
 *
 */
export class StreamingPartitionSender {
  private _messageStore: MessageStore;
  private _messageIterator: ReturnType<MessageStore["getMessageIterator"]>;
  private _partitionId: string;
  private _sender: Sender;
  private _abortController = new AbortController();
  private _enableRuntimeMetric: boolean;

  /**
   * Instantiates a `StreamingPartitionSender`.
   * @param messageStore - The `MessageStore` that contains all of the messages sent to the service.
   * @param sender - The sender link that should be used to send messages to.
   * @param partitionId - Specifies which partition to send messages from.
   * @param startPosition - Specifies which message to start iterating from.
   * @param enableRuntimeMetric - Indicates whether partition info should be sent on each event.
   */
  constructor(
    messageStore: MessageStore,
    sender: Sender,
    partitionId: string,
    startPosition: EventPosition,
    enableRuntimeMetric: boolean
  ) {
    this._messageStore = messageStore;
    this._messageIterator = messageStore.getMessageIterator(partitionId, startPosition);
    this._sender = sender;
    this._partitionId = partitionId;
    this._enableRuntimeMetric = enableRuntimeMetric;
  }

  /**
   * Starts sending messages.
   */
  start(): void {
    this._sendMessages().catch((err) => {
      console.error(`Unexpected error while sending messages`, err);
    });
  }

  /**
   * Stops sending messages.
   */
  stop(): void {
    this._abortController.abort();
  }

  private async _sendMessages(): Promise<void> {
    const abortSignal = this._abortController.signal;
    const iterator = this._messageIterator;
    const sender = this._sender;

    let nextResult: IteratorResult<MessageRecord, void> | undefined;
    do {
      try {
        nextResult = await iterator.next(/* shouldStop */ abortSignal.aborted);
        // Check if the iterator is completed and we should exit the loop.
        const value = nextResult.value;
        if (!value || abortSignal.aborted) {
          break;
        }

        // Set the message's message annotations.
        const messageAnnotations = value.message.message_annotations ?? {};
        messageAnnotations["x-opt-sequence-number"] = types.wrap_long(value.sequenceNumber);
        messageAnnotations["x-opt-offset"] = `${value.offset}`;
        messageAnnotations["x-opt-enqueued-time"] = value.enqueuedTime;
        if (value.partitionKey) {
          messageAnnotations["x-opt-partition-key"] = value.partitionKey;
        }

        // Set the `PartitionInfo` if `enableRuntimeMetric` is turned on.
        const deliveryAnnotations: DeliveryAnnotations = {};
        if (this._enableRuntimeMetric) {
          const partitionInfo = this._messageStore.getPartitionInfo(this._partitionId);
          deliveryAnnotations["last_enqueued_offset"] = partitionInfo.lastEnqueuedOffset;
          deliveryAnnotations["last_enqueued_sequence_number"] = types.wrap_long(
            partitionInfo.lastEnqueuedSequenceNumber
          );
          deliveryAnnotations["last_enqueued_time_utc"] = partitionInfo.lastEnqueuedTimeUtc;
          deliveryAnnotations["runtime_info_retrieval_time_utc"] = new Date();
        }

        // Wait for the sender link to have credit available before sending the message.
        if (!sender.has_credit()) {
          await this._waitForSendable(sender, abortSignal);
        }

        const outgoingMessage: Message = {
          ...value.message,
        };
        if (Object.keys(messageAnnotations).length) {
          outgoingMessage.message_annotations = messageAnnotations;
        }
        if (Object.keys(deliveryAnnotations).length) {
          outgoingMessage.delivery_annotations = deliveryAnnotations;
        }
        // And away it goes!
        sender.send(outgoingMessage);
      } catch (err) {
        if (err?.name !== "AbortError") {
          console.error(`Unexpected error while streaming events: `, err);
        }
      }
    } while (!abortSignal.aborted && !nextResult?.done);
  }

  private _waitForSendable(sender: Sender, abortSignal: AbortSignalLike): Promise<void> {
    return new Promise((resolve, reject) => {
      const onAbort = (): void => {
        sender.removeListener(SenderEvents.sendable, onSendable);
        abortSignal.removeEventListener("abort", onAbort);
        reject(new AbortError("Cancelled operation."));
      };

      const onSendable = (): void => {
        abortSignal.removeEventListener("abort", onAbort);
        resolve();
      };

      sender.once(SenderEvents.sendable, onSendable);

      abortSignal.addEventListener("abort", onAbort);
    });
  }
}
