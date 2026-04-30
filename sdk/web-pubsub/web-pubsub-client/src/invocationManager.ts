// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { InvokeResponseMessage } from "./models/messages.js";
import { InvocationError } from "./errors/index.js";

export interface InvocationWaitOptions {
  abortSignal?: AbortSignalLike;
}

export interface InvocationRegistration {
  invocationId: string;
  wait(options?: InvocationWaitOptions): Promise<InvokeResponseMessage>;
}

/**
 * Manages pending invocations awaiting invokeResponse frames.
 */
export class InvocationManager {
  private readonly _entries = new Map<string, InvocationEntity>();
  private _nextId = 0;

  public registerInvocation(invocationId?: string): InvocationRegistration {
    const resolvedId = invocationId ?? this._generateInvocationId();
    if (this._entries.has(resolvedId)) {
      throw new InvocationError("Invocation id is already registered.", {
        invocationId: resolvedId,
      });
    }

    const entity = new InvocationEntity(resolvedId);
    this._entries.set(resolvedId, entity);
    return {
      invocationId: resolvedId,
      wait: (options?: InvocationWaitOptions) => this._waitForEntry(entity, options),
    };
  }

  public resolveInvocation(message: InvokeResponseMessage): boolean {
    const entry = this._entries.get(message.invocationId);
    if (!entry) {
      return false;
    }
    this._entries.delete(message.invocationId);
    entry.resolve(message);
    return true;
  }

  public rejectInvocation(invocationId: string, reason: unknown): boolean {
    const entry = this._entries.get(invocationId);
    if (!entry) {
      return false;
    }
    this._entries.delete(invocationId);
    entry.reject(reason);
    return true;
  }

  public discard(invocationId: string): void {
    this._entries.delete(invocationId);
  }

  public rejectAll(createReason: (invocationId: string) => unknown): void {
    this._entries.forEach((entry, invocationId) => {
      if (this._entries.delete(invocationId)) {
        entry.reject(createReason(invocationId));
      }
    });
  }

  private _waitForEntry(
    entry: InvocationEntity,
    options?: InvocationWaitOptions,
  ): Promise<InvokeResponseMessage> {
    const waitPromise = entry.promise();
    const abortSignal = options?.abortSignal;

    if (!abortSignal) {
      return waitPromise;
    }

    if (abortSignal.aborted) {
      if (this._entries.delete(entry.invocationId)) {
        entry.reject(this._createAbortError(entry.invocationId));
      }
      return waitPromise;
    }

    return new Promise<InvokeResponseMessage>((resolve, reject) => {
      const onAbort = (): void => {
        abortSignal.removeEventListener("abort", onAbort);
        if (this._entries.delete(entry.invocationId)) {
          entry.reject(this._createAbortError(entry.invocationId));
        }
      };

      abortSignal.addEventListener("abort", onAbort);

      waitPromise
        .then((result) => {
          abortSignal.removeEventListener("abort", onAbort);
          return resolve(result);
        })
        .catch((err) => {
          abortSignal.removeEventListener("abort", onAbort);
          return reject(err);
        });
    });
  }

  private _generateInvocationId(): string {
    this._nextId += 1;
    return this._nextId.toString();
  }

  private _createAbortError(invocationId: string): InvocationError {
    return new InvocationError("Invocation cancelled by abortSignal.", {
      invocationId,
    });
  }
}

class InvocationEntity {
  private readonly _promise: Promise<InvokeResponseMessage>;
  private _resolve:
    | ((value: InvokeResponseMessage | PromiseLike<InvokeResponseMessage>) => void)
    | undefined;
  private _reject: ((reason?: unknown) => void) | undefined;

  constructor(public readonly invocationId: string) {
    this._promise = new Promise<InvokeResponseMessage>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  public promise(): Promise<InvokeResponseMessage> {
    return this._promise;
  }

  public resolve(value: InvokeResponseMessage | PromiseLike<InvokeResponseMessage>): void {
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
