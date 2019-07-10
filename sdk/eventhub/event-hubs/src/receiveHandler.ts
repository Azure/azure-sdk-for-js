import * as log from "./log";
import { BaseConsumer } from "./baseReceiver";
import { AbortSignalLike } from "@azure/abort-controller";

/**
 * Describes the receive handler object that is returned from the receive() method with handlers.
 * The ReceiveHandler is used to stop receiving more messages.
 * @class ReceiveHandler
 */
export class ReceiveHandler {
  /**
   * @property _receiver  The underlying EventHubReceiver.
   * @private
   */
  private _consumer: BaseConsumer;

  /**
   * Creates an instance of the ReceiveHandler.
   * @constructor
   * @internal
   * @param receiver The underlying EventHubReceiver.
   */
  constructor(consumer: BaseConsumer, abortSignal?: AbortSignalLike) {
    this._consumer = consumer;
  }

  /**
   * @property The partitionId from which the handler is receiving events.
   * @readonly
   */
  get partitionId(): string | undefined {
    return this._consumer ? this._consumer.partitionId : undefined;
  }

  /**
   * @property The consumer group from which the handler is receiving events.
   * @readonly
   */
  get consumerGroup(): string | undefined {
    return this._consumer ? this._consumer.consumerGroup : undefined;
  }

  /**
   * @property Indicates whether the receiver is connected/open.
   * `true` - is open; `false` otherwise.
   * @readonly
   */
  get isReceiverOpen(): boolean {
    return this._consumer ? this._consumer.isOpen() : false;
  }

  /**
   * Stops the underlying EventHubReceiver from receiving more messages.
   * @returns Promise<void>
   * @throws {Error} Thrown if the underlying connection encounters an error while closing.
   */
  async stop(): Promise<void> {
    if (this._consumer) {
      try {
        this._consumer.clearHandlers();
        await this._consumer.close();
      } catch (err) {
        log.error(
          "An error occurred while stopping the receiver '%s' with address '%s': %O",
          this._consumer.name,
          this._consumer.address,
          err
        );
      }
    }
  }
}
