// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { JSONTypes } from "./webPubSubClient.js";
import type { WebPubSubDataType, AckMessageError } from "./models/messages.js";

/**
 * Stream handler for processing stream messages
 */
export class StreamHandler {
  private _onMessage?: (message: JSONTypes | ArrayBuffer) => void;
  private _onComplete?: () => void;
  private _onError?: (error: AckMessageError) => void;

  /**
   * Set the callback for receiving stream messages
   */
  public set onMessage(callback: (message: JSONTypes | ArrayBuffer) => void) {
    this._onMessage = callback;
  }

  /**
   * Set the callback for stream completion
   */
  public set onComplete(callback: () => void) {
    this._onComplete = callback;
  }

  /**
   * Set the callback for stream errors
   */
  public set onError(callback: (error: AckMessageError) => void) {
    this._onError = callback;
  }

  /**
   * @internal SDK-only method for handling stream messages
   */
  public _handleMessage(message: JSONTypes | ArrayBuffer): void {
    this._onMessage?.(message);
  }

  /**
   * @internal SDK-only method for handling stream completion
   */
  public _handleComplete(): void {
    this._onComplete?.();
  }

  /**
   * @internal SDK-only method for handling stream errors
   */
  public _handleError(error: AckMessageError): void {
    this._onError?.(error);
  }
}

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
 * Stream for sending messages to a group
 */
export class Stream {
  private readonly _groupName: string;
  private readonly _streamId: string;
  private readonly _timeToLive: number;
  private readonly _sendCallback: (
    groupName: string,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    streamId: string,
    streamSequenceId: number,
    endOfStream: boolean,
    abortSignal?: AbortSignalLike,
  ) => Promise<void>;

  private _sequenceId: number = 1;
  private _isCompleted: boolean = false;
  private _buffer: StreamMessage[] = [];
  private _onError?: (error: AckMessageError) => void;
  private readonly _maxBufferSize: number = 1000;
  private _lastAckedSequenceId: number = 0;
  private _isDisposed: boolean = false;

  constructor(
    groupName: string,
    streamId: string,
    timeToLive: number,
    sendCallback: (
      groupName: string,
      content: JSONTypes | ArrayBuffer,
      dataType: WebPubSubDataType,
      streamId: string,
      streamSequenceId: number,
      endOfStream: boolean,
      abortSignal?: AbortSignalLike,
    ) => Promise<void>,
  ) {
    this._groupName = groupName;
    this._streamId = streamId;
    this._timeToLive = timeToLive;
    this._sendCallback = sendCallback;

    // Set up TTL cleanup
    setTimeout(() => {
      if (!this._isCompleted && !this._isDisposed) {
        this._handleError({
          name: "StreamTimeout",
          message: "Stream has reached its time-to-live limit"
        });
        this._destroy();
      }
    }, this._timeToLive);
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
   * Set the error callback
   */
  public onError(callback: (error: AckMessageError) => void): void {
    this._onError = callback;
  }

  /**
   * Publish a message to the stream
   */
  public async publish(
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType = "json",
    abortSignal?: AbortSignalLike,
  ): Promise<void> {
    if (this._isCompleted) {
      throw new Error("Stream is already completed");
    }
    if (this._isDisposed) {
      throw new Error("Stream is disposed");
    }

    const message: StreamMessage = {
      content,
      dataType,
      sequenceId: this._sequenceId++,
      endOfStream: false,
    };

    await this._sendMessage(message, abortSignal);
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
      return;
    }
    if (this._isDisposed) {
      throw new Error("Stream is disposed");
    }

    let message: StreamMessage;
    if (content !== undefined) {
      message = {
        content,
        dataType,
        sequenceId: this._sequenceId++,
        endOfStream: true,
      };
    } else {
      message = {
        content: "",
        dataType: "text",
        sequenceId: this._sequenceId++,
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
  public _handleStreamAck(sequenceId: number, success: boolean, error?: AckMessageError): void {
    if (success) {
      this._lastAckedSequenceId = Math.max(this._lastAckedSequenceId, sequenceId);
      // Remove acked messages from buffer
      this._buffer = this._buffer.filter(msg => msg.sequenceId > sequenceId);
    } else {
      this._handleError(error || {
        name: "StreamError",
        message: "Stream message failed"
      });
    }
  }

  /**
   * @internal
   * Resend unacked messages (for connection recovery)
   */
  public async _resendUnackedMessages(abortSignal?: AbortSignalLike): Promise<void> {
    if (this._isDisposed) {
      return;
    }

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
          message: `Failed to resend message with sequence ID ${message.sequenceId}: ${error}`
        });
        break;
      }
    }
  }

  private async _sendMessage(message: StreamMessage, abortSignal?: AbortSignalLike): Promise<void> {
    if (this._buffer.length >= this._maxBufferSize) {
      this._handleError({
        name: "StreamBufferOverflow",
        message: "Stream buffer has reached maximum size"
      });
      return;
    }

    // Add to buffer
    this._buffer.push(message);

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
        message: `Failed to send message: ${error}`
      });
    }
  }

  private _handleError(error: AckMessageError): void {
    this._onError?.(error);
  }

  private _destroy(): void {
    this._isDisposed = true;
    this._buffer = [];
  }
}
