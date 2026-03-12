// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import { delay } from "@azure/core-util";
import { logger } from "./logger.js";
import type {
  EndStreamOptions,
  SendStreamKeepaliveOptions,
  StreamDataError,
} from "./models/index.js";
import type { WebPubSubDataType } from "./models/messages.js";
import { AsyncSeqQueue } from "./asyncSeqQueue.js";
import { abortablePromise } from "./utils/abortablePromise.js";

type JSONTypes = string | number | boolean | object;

interface Deferred<T> {
  promise: Promise<T>;
  resolve(value: T): void;
  reject(reason?: unknown): void;
}

type OutboundStreamAction = OutboundStreamDataAction | OutboundStreamEndAction;

interface OutboundStreamDataAction {
  type: "data";
  data: JSONTypes | ArrayBuffer;
  dataType: WebPubSubDataType;
  completion: Deferred<void>;
}

interface OutboundStreamEndAction {
  type: "end";
  options?: EndStreamOptions;
  completion: Deferred<void>;
}

const SEND_RETRY_INITIAL_DELAY_MS = 10;
const SEND_RETRY_MAX_DELAY_MS = 5000;

export interface OutboundStreamSessionOptions {
  streamId: string;
  groupName: string;
  idleTimeoutMs?: number;
  canSend(): boolean;
  sendStart(): Promise<void>;
  sendData(
    sequenceId: number,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
  ): Promise<void>;
  sendEnd(options?: EndStreamOptions): Promise<void>;
  sendKeepalive(options?: SendStreamKeepaliveOptions): Promise<void>;
}

export class OutboundStreamSession {
  public readonly streamId: string;
  public readonly groupName: string;
  public readonly idleTimeoutMs?: number;

  private readonly _queue: AsyncSeqQueue<OutboundStreamAction>;
  private readonly _errorHandlers: Set<(error: StreamDataError) => void>;
  private readonly _pendingActionCompletions: Map<number, Deferred<void>>;
  private readonly _abortController: AbortController;
  private readonly _canSend: () => boolean;
  private readonly _sendStart: () => Promise<void>;
  private readonly _sendData: (
    sequenceId: number,
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
  ) => Promise<void>;
  private readonly _sendEnd: (options?: EndStreamOptions) => Promise<void>;
  private readonly _sendKeepalive: (options?: SendStreamKeepaliveOptions) => Promise<void>;

  private _started = false;
  private _writeClosed = false;
  private _aborted = false;
  private _paused = false;
  private readonly _startCompletion: Deferred<void>;
  private _startingPromise?: Promise<void>;

  constructor(options: OutboundStreamSessionOptions) {
    this.streamId = options.streamId;
    this.groupName = options.groupName;
    this.idleTimeoutMs = options.idleTimeoutMs;
    this._queue = new AsyncSeqQueue<OutboundStreamAction>();
    this._errorHandlers = new Set<(error: StreamDataError) => void>();
    this._pendingActionCompletions = new Map<number, Deferred<void>>();
    this._abortController = new AbortController();
    this._startCompletion = createDeferred<void>();
    this._canSend = options.canSend;
    this._sendStart = options.sendStart;
    this._sendData = options.sendData;
    this._sendEnd = options.sendEnd;
    this._sendKeepalive = options.sendKeepalive;

    void this._runSendLoop();
  }

  public async start(abortSignal?: AbortSignalLike): Promise<void> {
    this._throwIfClosed();
    if (this._started) {
      return;
    }

    if (this._startingPromise == null) {
      this._startingPromise = (async (): Promise<void> => {
        await this._sendStart();
        await this._startCompletion.promise;
        this._started = true;
      })();
    }

    try {
      if (abortSignal == null) {
        await this._startingPromise;
      } else {
        await abortablePromise(this._startingPromise, abortSignal);
      }
    } finally {
      this._startingPromise = undefined;
    }
  }

  public onError(listener: (error: StreamDataError) => void): () => void {
    this._errorHandlers.add(listener);
    return () => {
      this._errorHandlers.delete(listener);
    };
  }

  public async publish(
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
    abortSignal?: AbortSignalLike,
  ): Promise<void> {
    this._throwIfClosed();
    const completion = await this._enqueueDataAction(content, dataType);
    await this._waitForActionCompletion(completion.promise, abortSignal);
  }

  public async keepalive(options?: SendStreamKeepaliveOptions): Promise<void> {
    this._throwIfClosed();
    if (this._paused || !this._canSend()) {
      throw new Error(
        `Stream '${this.streamId}' cannot send keepalive while connection is unavailable.`,
      );
    }

    await this._sendKeepalive(options);
  }

  public async complete(options?: EndStreamOptions): Promise<void> {
    this._throwIfClosed();
    this._writeClosed = true;

    const endCompletion = await this._enqueueEndAction(
      options?.error == null ? undefined : { error: options.error },
    );
    await this._waitForActionCompletion(endCompletion.promise, options?.abortSignal);
  }

  public pause(): void {
    if (this._aborted) {
      return;
    }

    if (!this._started) {
      this.close(
        new Error(
          `Stream '${this.streamId}' failed before start acknowledgement because connection is unavailable.`,
        ),
      );
      return;
    }

    this._paused = true;
    this._queue.pause();
  }

  public resume(): void {
    if (this._aborted) {
      return;
    }

    if (!this._paused) {
      return;
    }

    this._paused = false;
    this._queue.reset(this._queue.oldestUnackedSequenceId);
    this._queue.resume();
  }

  public ack(expectedSequenceId: number): void {
    if (this._aborted) {
      return;
    }

    if (!this._started && expectedSequenceId === 1) {
      this._startCompletion.resolve();
    }
    this._queue.ack(expectedSequenceId);
  }

  public close(error?: Error | string): void {
    if (this._aborted) {
      return;
    }

    this._aborted = true;
    this._writeClosed = true;
    const effectiveError =
      error == null
        ? new Error(`Stream '${this.streamId}' is completed.`)
        : typeof error === "string"
          ? new Error(error)
          : error;
    this._queue.close(effectiveError);
    if (error != null) {
      this._notifyError(this._toStreamDataError(error));
    }
    try {
      this._abortController.abort();
    } catch {
      /** empty */
    }

    if (this._startingPromise != null) {
      this._startCompletion.reject(effectiveError);
    }

    this._pendingActionCompletions.forEach((completion) => {
      completion.reject(effectiveError);
    });
    this._pendingActionCompletions.clear();
  }

  private async _enqueueDataAction(
    content: JSONTypes | ArrayBuffer,
    dataType: WebPubSubDataType,
  ): Promise<Deferred<void>> {
    const completion = createDeferred<void>();
    const sequenceId = await this._queue.enqueue({
      type: "data",
      data: content,
      dataType,
      completion,
    });
    this._pendingActionCompletions.set(sequenceId, completion);
    return completion;
  }

  private async _enqueueEndAction(options?: EndStreamOptions): Promise<Deferred<void>> {
    const completion = createDeferred<void>();
    const sequenceId = await this._queue.enqueue({
      type: "end",
      options,
      completion,
    });
    this._pendingActionCompletions.set(sequenceId, completion);
    return completion;
  }

  private async _waitForActionCompletion(
    completion: Promise<void>,
    abortSignal?: AbortSignalLike,
  ): Promise<void> {
    if (abortSignal == null) {
      await completion;
      return;
    }

    await abortablePromise(completion, abortSignal);
  }

  private async _runSendLoop(): Promise<void> {
    let nextRetryDelayMs = SEND_RETRY_INITIAL_DELAY_MS;

    while (!this._aborted) {
      let item;
      try {
        item = await this._queue.dequeue(this._abortController.signal);
      } catch {
        return;
      }

      try {
        if (item.value.type === "data") {
          await this._sendData(item.sequenceId, item.value.data, item.value.dataType);
        } else {
          await this._sendEnd(item.value.options);
        }
        this._resolveActionCompletion(item.sequenceId);
        nextRetryDelayMs = SEND_RETRY_INITIAL_DELAY_MS;
      } catch (err) {
        if (this._aborted) {
          this._rejectActionCompletion(item.sequenceId, err);
          return;
        }

        // Ack can advance the queue window while sendData/sendEnd is in-flight.
        // Clamp replay start to current oldest unacked to avoid resetting to an expired sequence id.
        const replayFrom = Math.max(item.sequenceId, this._queue.oldestUnackedSequenceId);
        this._queue.reset(replayFrom);
        try {
          await abortablePromise(delay(nextRetryDelayMs), this._abortController.signal);
        } catch {
          return;
        }
        nextRetryDelayMs = Math.min(nextRetryDelayMs * 2, SEND_RETRY_MAX_DELAY_MS);
      }
    }
  }

  private _resolveActionCompletion(sequenceId: number): void {
    const completion = this._pendingActionCompletions.get(sequenceId);
    if (completion != null) {
      this._pendingActionCompletions.delete(sequenceId);
      completion.resolve();
    }
  }

  private _rejectActionCompletion(sequenceId: number, reason: unknown): void {
    const completion = this._pendingActionCompletions.get(sequenceId);
    if (completion != null) {
      this._pendingActionCompletions.delete(sequenceId);
      completion.reject(reason);
    }
  }

  private _throwIfClosed(): void {
    if (this._aborted || this._writeClosed) {
      throw new Error(`Stream '${this.streamId}' is completed.`);
    }
  }

  private _notifyError(error: StreamDataError): void {
    this._errorHandlers.forEach((handler) => {
      try {
        handler(error);
      } catch (err) {
        logger.warning("Outbound stream error handler failed.", err);
      }
    });
  }

  private _toStreamDataError(error: Error | string): StreamDataError {
    if (error instanceof Error) {
      return {
        name: error.name || "Error",
        message: error.message,
      };
    }

    return {
      name: "Error",
      message: String(error),
    };
  }
}

function createDeferred<T>(): Deferred<T> {
  let resolvePromise!: (value: T) => void;
  let rejectPromise!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  return {
    promise,
    resolve: resolvePromise,
    reject: rejectPromise,
  };
}
