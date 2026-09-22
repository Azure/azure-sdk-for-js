// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { WebPubSubResult } from "./models/index.js";
import { SendMessageError } from "./errors/index.js";
import { abortablePromise } from "./utils/abortablePromise.js";

export interface AckRegistration {
  ackId: number;
  wait(abortSignal?: AbortSignalLike): Promise<WebPubSubResult>;
}

/**
 * Manages ack id generation and pending ack entries.
 */
export class AckManager {
  private readonly _ackEntries = new Map<number, AckEntity>();
  private _ackId: number;

  constructor(initialAckId = 0) {
    this._ackId = initialAckId;
  }

  public registerAck(ackId?: number): AckRegistration {
    const resolvedAckId = ackId ?? this._generateAckId();
    let entry = this._ackEntries.get(resolvedAckId);
    if (!entry) {
      entry = new AckEntity(resolvedAckId);
      this._ackEntries.set(resolvedAckId, entry);
    }
    const ackEntry = entry;
    return {
      ackId: resolvedAckId,
      wait: (abortSignal?: AbortSignalLike) => this._waitForEntry(ackEntry, abortSignal),
    };
  }

  public resolveAck(ackId: number, result: WebPubSubResult): boolean {
    const entry = this._ackEntries.get(ackId);
    if (!entry) {
      return false;
    }
    this._ackEntries.delete(ackId);
    entry.resolve(result);
    return true;
  }

  public rejectAck(ackId: number, reason: unknown): boolean {
    const entry = this._ackEntries.get(ackId);
    if (!entry) {
      return false;
    }
    this._ackEntries.delete(ackId);
    entry.reject(reason);
    return true;
  }

  public discard(ackId: number): void {
    this._ackEntries.delete(ackId);
  }

  public rejectAll(createReason: (ackId: number) => unknown): void {
    this._ackEntries.forEach((entry, ackId) => {
      if (this._ackEntries.delete(ackId)) {
        entry.reject(createReason(ackId));
      }
    });
  }

  private _waitForEntry(entry: AckEntity, abortSignal?: AbortSignalLike): Promise<WebPubSubResult> {
    if (!abortSignal) {
      return entry.promise();
    }

    return abortablePromise(entry.promise(), abortSignal).catch((err) => {
      if (err instanceof Error && err.name === "AbortError") {
        throw new SendMessageError("Cancelled by abortSignal", { ackId: entry.ackId });
      }
      throw err;
    });
  }

  private _generateAckId(): number {
    this._ackId += 1;
    return this._ackId;
  }
}

class AckEntity {
  private readonly _promise: Promise<WebPubSubResult>;
  private _resolve: ((value: WebPubSubResult | PromiseLike<WebPubSubResult>) => void) | undefined;
  private _reject: ((reason?: unknown) => void) | undefined;

  constructor(public readonly ackId: number) {
    this._promise = new Promise<WebPubSubResult>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  public promise(): Promise<WebPubSubResult> {
    return this._promise;
  }

  public resolve(value: WebPubSubResult | PromiseLike<WebPubSubResult>): void {
    const callback = this._resolve;
    if (!callback) {
      return;
    }
    this._resolve = undefined;
    this._reject = undefined;
    callback(value);
  }

  public reject(reason?: unknown): void {
    const callback = this._reject;
    if (!callback) {
      return;
    }
    this._resolve = undefined;
    this._reject = undefined;
    callback(reason);
  }
}
