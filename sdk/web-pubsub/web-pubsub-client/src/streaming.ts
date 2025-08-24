// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { JSONTypes } from "./webPubSubClient.js";
import type { WebPubSubDataType, StreamAckMessageError } from "./models/messages.js";
import { logger } from "./logger.js";

/**
 * Stream message for buffering
 */
interface StreamMessage {
  content: JSONTypes | ArrayBuffer;
  dataType: WebPubSubDataType;
  sequenceId: number;
  endOfStream: boolean;
}

/**
 * Stream handler for processing stream messages
 */
export class StreamHandler {
  private _onMessage?: (message: JSONTypes | ArrayBuffer) => void;
  private _onComplete?: () => void;
  private _onError?: (error: StreamAckMessageError) => void;

  /**
   * Set the callback for receiving stream messages
   * @param callback - callback function to handle incoming messages
   */
  public onMessage(callback: (message: JSONTypes | ArrayBuffer) => void): void {
    this._onMessage = callback;
  }

  /**
   * Set the callback for stream completion
   * @param callback - callback function to handle stream completion
   */
  public onComplete(callback: () => void): void {
    this._onComplete = callback;
  }

  /**
   * Set the callback for stream errors
   * @param callback - callback function to handle stream errors
   */
  public onError(callback: (error: StreamAckMessageError) => void): void {
    this._onError = callback;
  }

  /**
   * @internal
   * SDK-only method for handling stream messages
   */
  public _handleMessage(message: JSONTypes | ArrayBuffer): void {
    this._onMessage?.(message);
  }

  /**
   * @internal
   * SDK-only method for handling stream completion
   */
  public _handleComplete(): void {
    this._onComplete?.();
  }

  /**
   * @internal
   * SDK-only method for handling stream errors
   */
  public _handleError(error: StreamAckMessageError): void {
    this._onError?.(error);
  }
}

/**
 * Stream configuration options
 */
export interface StreamOptions {
  /**
   * Maximum number of messages to buffer while waiting for acknowledgments
   * Default: 100
   */
  maxBufferSize?: number;

  /**
   * Time-to-live for the stream in milliseconds
   * Default: 300000 (5 minutes)
   */
  timeToLive?: number;

  /**
   * Maximum time to wait for buffer space in milliseconds
   * Default: 30000 (30 seconds)
   */
  bufferWaitTimeout?: number;

  /**
   * Maximum number of times to resend unacked messages
   * Default: 3
   */
  maxResendAttempts?: number;

  /**
   * Delay between resend attempts in milliseconds
   * Default: 1000 (1 second)
   */
  resendInterval?: number;

  /**
   * Whether to use exponential backoff for resend intervals
   * Default: false
   */
  useExponentialBackoff?: boolean;
}

/**
 * Stream for sending messages to a group
 */
export class Stream {
  private readonly _groupName: string;
  private readonly _streamId: string;
  private readonly _sendCallback: (
    groupName: string,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    streamId: string,
    streamSequenceId: number,
    endOfStream: boolean,
    abortSignal?: AbortSignalLike,
  ) => Promise<void>;
  private readonly _options: Required<StreamOptions>;

  private _sequenceId: number = 0;
  private _isCompleted: boolean = false;
  // Flag indicating if the stream is currently resending messages to avoid race condition
  private _isResending: boolean = false;
  // TODO: need better data structure for stream state
  private _buffer: StreamMessage[] = [];
  private _onError?: (error: StreamAckMessageError) => void;
  private _resendAttempts: number = 0;
  private _isDisposed: boolean = false;
  private _waitingQueue: Array<{
    resolve: () => void;
    reject: (error: Error) => void;
  }> = [];

  constructor(
    groupName: string,
    streamId: string,
    sendCallback: (
      groupName: string,
      content: JSONTypes | ArrayBuffer,
      dataType: WebPubSubDataType,
      streamId: string,
      streamSequenceId: number,
      endOfStream: boolean,
      abortSignal?: AbortSignalLike,
    ) => Promise<void>,
    options?: StreamOptions,
  ) {
    this._groupName = groupName;
    this._streamId = streamId;
    this._sendCallback = sendCallback;
    
    // Set default options and merge with provided options
    this._options = {
      maxBufferSize: options?.maxBufferSize ?? 100,
      timeToLive: options?.timeToLive ?? 300000, // Default 5 minutes
      bufferWaitTimeout: options?.bufferWaitTimeout ?? 30000, // Default 30 seconds
      maxResendAttempts: options?.maxResendAttempts ?? 3, // Default 3 attempts
      resendInterval: options?.resendInterval ?? 1000, // Default 1 second
      useExponentialBackoff: options?.useExponentialBackoff ?? false, // Default false
    };

    // Set up TTL cleanup
    setTimeout(() => {
      if (!this._isCompleted && !this._isDisposed) {
        this._handleError({
          name: "StreamTimeout",
          message: "Stream has reached its time-to-live limit",
        });
        this._destroy();
      }
    }, this._options.timeToLive);
  }

  /**
   * Get the stream ID
   */
  public get streamId(): string {
    return this._streamId;
  }

  /**
   * Get the group name
   */
  public get groupName(): string {
    return this._groupName;
  }

  /**
   * Set the callback for stream errors
   * @param callback - callback function to handle stream publish errors
   */
  public onError(callback: (error: StreamAckMessageError) => void): void {
    this._onError = callback;
  }

  /**
   * Auto-detect data type based on content
   */
  private _detectDataType(content: JSONTypes | ArrayBuffer): WebPubSubDataType {
    if (content instanceof ArrayBuffer || content instanceof Uint8Array) {
      return "binary";
    }
    if (typeof content === "string") {
      return "text";
    }
    return "json";
  }

  /**
   * Publish a message to the stream
   */
  public async publish(
    content: JSONTypes | ArrayBuffer,
    dataType?: WebPubSubDataType,
    abortSignal?: AbortSignalLike,
  ): Promise<void> {
    if (this._isCompleted) {
      logger.warning(`Stream ${this._streamId} publish is already completed`);
      return;
    }
    if (this._isDisposed) {
      throw new Error("Stream is disposed");
    }

    const actualDataType = dataType ?? this._detectDataType(content);

    const message: StreamMessage = {
      content,
      dataType: actualDataType,
      sequenceId: ++this._sequenceId,
      endOfStream: false,
    };

    await this._sendMessage(message, abortSignal);
  }

  /**
   * Publish a message to the stream
   */
  public async publishWithSequenceId(
    sequenceId: number,
    content: JSONTypes | ArrayBuffer,
    dataType?: WebPubSubDataType,
    abortSignal?: AbortSignalLike,
  ): Promise<void> {
    if (this._isCompleted) {
      logger.warning(`Stream ${this._streamId} publish is already completed`);
      return;
    }
    if (this._isDisposed) {
      throw new Error("Stream is disposed");
    }

    const actualDataType = dataType ?? this._detectDataType(content);

    const message: StreamMessage = {
      content,
      dataType: actualDataType,
      sequenceId,
      endOfStream: false,
    };

    await this._sendMessage(message, abortSignal);
    this._sequenceId = sequenceId;
  }

  /**
   * Complete the stream with an optional final message
   */
  public async complete(
    content?: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType = "json",
    abortSignal?: AbortSignalLike,
  ): Promise<void> {
    if (this._isCompleted) {
      logger.warning(`Stream ${this._streamId} publish is already completed`);
    }
    if (this._isDisposed) {
      throw new Error("Stream is disposed");
    }

    let message: StreamMessage;
    if (content !== undefined) {
      message = {
        content,
        dataType,
        sequenceId: ++this._sequenceId,
        endOfStream: true,
      };
    } else {
      message = {
        content: "",
        dataType: "text",
        sequenceId: ++this._sequenceId,
        endOfStream: true,
      };
    }
    await this._sendMessage(message, abortSignal);
    this._isCompleted = true;
  }

  /**
   * @internal
   * Handle stream ack from service
   */
  public _handleStreamAck(
    sequenceId: number,
    success: boolean,
    autoResendStreamMessages: boolean,
    error?: StreamAckMessageError,
  ): void {
    if (success) {
      const beforeSize = this._buffer.length;
      this._buffer = this._buffer.filter((msg) => msg.sequenceId > sequenceId);
      const afterSize = this._buffer.length;

      // If buffer size decreased, notify waiting publishers and reset resend attempts
      if (afterSize < beforeSize) {
        this._resendAttempts = 0;
        this._notifyWaitingPublishers();
      }
    } else {
      // Resend unacked (buffered) messages if receive InvalidSequenceId exception
      if (autoResendStreamMessages && error && error.name === "InvalidSequenceId") {
        this._resendUnackedMessages();
      }
      this._handleError(
        error || {
          name: "StreamError",
          message: "Stream message failed",
        },
      );
    }
  }

  /**
   * @internal
   * Resend unacked messages (for connection recovery)
   */
  public async _resendUnackedMessages(abortSignal?: AbortSignalLike): Promise<void> {
    // Safeguard to avoid duplicate resending
    if (this._isResending) {
      logger.warning(`Stream ${this._streamId} in ${this._groupName} is already resending. Abort resend.`);
      return;
    }
    this._isResending = true;

    if (this._isDisposed) {
      logger.warning(`Stream ${this._streamId} in ${this._groupName} is disposed or completed. Abort resend.`);
      return;
    }

    try {
      // Check if we've exceeded the maximum resend attempts
      if (this._resendAttempts >= this._options.maxResendAttempts) {
        logger.error(
          `Stream ${this._streamId} in ${this._groupName} has exceeded maximum resend attempts (${this._options.maxResendAttempts}). Stopping resend.`,
        );
        this._handleError({
          name: "StreamMaxResendAttemptsExceeded",
          message: `Maximum resend attempts (${this._options.maxResendAttempts}) exceeded for stream ${this._streamId} in ${this._groupName}`,
        });
        throw new Error(`Maximum resend attempts exceeded for stream ${this._streamId} in ${this._groupName}`);
      }

      // Add delay before resending (except for first attempt)
      if (this._resendAttempts > 0) {
        const delay = this._options.useExponentialBackoff
          ? this._options.resendInterval * Math.pow(2, this._resendAttempts - 1)
          : this._options.resendInterval;

        logger.info(
          `Waiting ${delay}ms before resend attempt ${this._resendAttempts + 1} for stream ${this._streamId} in ${this._groupName}`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      this._resendAttempts++;
      logger.info(
        `Resending buffered messages for stream ${this._streamId} in ${this._groupName} (attempt ${this._resendAttempts}/${this._options.maxResendAttempts})`,
      );
      // Resend all messages in buffer
      for (const message of this._buffer) {
        try {
          await this._sendCallback(
            this._groupName,
            message.content,
            message.dataType,
            this._streamId,
            message.sequenceId,
            message.endOfStream,
            abortSignal,
          );
        } catch (error) {
          this._handleError({
            name: "StreamResendError",
            message: `Failed to resend message with sequence ID ${message.sequenceId} for ${this._streamId} in ${this._groupName}: ${error}`,
          });
          break;
        }
      }
    } finally {
      this._isResending = false;
    }
  }

  /**
   * @internal
   * Check if the stream has unacked messages that need to be resent
   * @returns true if there are unacked messages in the buffer
   */
  public _hasUnackedMessages(): boolean {
    return this._buffer.length > 0 && !this._isDisposed;
  }

  /**
   * Wait for buffer space to become available
   */
  private async _waitForBufferSpace(): Promise<void> {
    if (this._buffer.length < this._options.maxBufferSize) {
      return; // Buffer has space, no need to wait
    }

    // Create a promise that resolves when buffer space becomes available
    return new Promise<void>((resolve, reject) => {
      if (this._isDisposed) {
        reject(new Error(`Stream ${this._streamId} in ${this._groupName} is disposed`));
        return;
      }

      // Set up timeout
      const timeoutId = setTimeout(() => {
        // Remove from waiting queue if timeout occurs
        const index = this._waitingQueue.findIndex((w) => w.resolve === resolve);
        if (index >= 0) {
          this._waitingQueue.splice(index, 1);
        }
        reject(new Error(`Buffer wait timeout for stream ${this._streamId} in ${this._groupName} after ${this._options.bufferWaitTimeout}ms`));
      }, this._options.bufferWaitTimeout);

      // Add to waiting queue with cleanup on resolve
      this._waitingQueue.push({
        resolve: () => {
          clearTimeout(timeoutId);
          resolve();
        },
        reject: (error: Error) => {
          clearTimeout(timeoutId);
          reject(error);
        },
      });
    });
  }

  /**
   * Notify waiting publishers that buffer space is available
   */
  private _notifyWaitingPublishers(): void {
    while (this._waitingQueue.length > 0 && this._buffer.length < this._options.maxBufferSize) {
      const waiter = this._waitingQueue.shift();
      if (waiter) {
        waiter.resolve();
      }
    }
  }

  private async _sendMessage(message: StreamMessage, abortSignal?: AbortSignalLike): Promise<void> {
    // Wait for buffer space if needed
    await this._waitForBufferSpace();

    // Double-check after waiting (in case stream was disposed while waiting)
    if (this._isDisposed) {
      logger.warning(`Stream ${this._streamId} in ${this._groupName} is disposed or completed when sending message`);
      return;
    }

    // Add to buffer and sort by sequenceId
    // TODO: Need better data structure to optimize buffer management
    this._buffer.push(message);
    this._buffer.sort((a, b) => a.sequenceId - b.sequenceId);

    // Send message
    try {
      await this._sendCallback(
        this._groupName,
        message.content,
        message.dataType,
        this._streamId,
        message.sequenceId,
        message.endOfStream,
        abortSignal,
      );
    } catch (error) {
      this._handleError({
        name: "StreamSendError",
        message: `Failed to send message with sequence ID ${message.sequenceId} for ${this._streamId} in ${this._groupName}: ${error}`,
      });
    }
  }

  private _handleError(error: StreamAckMessageError): void {
    this._onError?.(error);
  }

  private _destroy(): void {
    this._isDisposed = true;
    this._buffer = [];

    // Reject all waiting publishers
    while (this._waitingQueue.length > 0) {
      const waiter = this._waitingQueue.shift();
      if (waiter) {
        waiter.reject(new Error(`Stream ${this._streamId} in ${this._groupName} is disposed`));
      }
    }
  }
}
