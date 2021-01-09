// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../shims-public.d.ts" />

type AbortEventListener = (this: AbortSignalLike, ev?: any) => any;

const listenersMap = new WeakMap<AbortSignal, AbortEventListener[]>();
const abortedMap = new WeakMap<AbortSignal, boolean>();

/**
 * Allows the request to be aborted upon firing of the "abort" event.
 * Compatible with the browser built-in AbortSignal and common polyfills.
 */
export interface AbortSignalLike {
  /**
   * Indicates if the signal has already been aborted.
   */
  readonly aborted: boolean;
  /**
   * Add new "abort" event listener, only support "abort" event.
   */
  addEventListener(
    type: "abort",
    listener: (this: AbortSignalLike, ev: any) => any,
    options?: any
  ): void;
  /**
   * Remove "abort" event listener, only support "abort" event.
   */
  removeEventListener(
    type: "abort",
    listener: (this: AbortSignalLike, ev: any) => any,
    options?: any
  ): void;
}

/**
 * An aborter instance implements AbortSignal interface, can abort HTTP requests.
 *
 * - Call AbortSignal.none to create a new AbortSignal instance that cannot be cancelled.
 * Use `AbortSignal.none` when you are required to pass a cancellation token but the operation
 * cannot or will not ever be cancelled.
 *
 * @example
 * Abort without timeout
 * ```ts
 * await doAsyncWork(AbortSignal.none);
 * ```
 */
export class AbortSignal implements AbortSignalLike {
  constructor() {
    listenersMap.set(this, []);
    abortedMap.set(this, false);
  }

  /**
   * Status of whether aborted or not.
   *
   * @readonly
   */
  public get aborted(): boolean {
    if (!abortedMap.has(this)) {
      throw new TypeError("Expected `this` to be an instance of AbortSignal.");
    }

    return abortedMap.get(this)!;
  }

  /**
   * Creates a new AbortSignal instance that will never be aborted.
   *
   * @readonly
   */
  public static get none(): AbortSignal {
    return new AbortSignal();
  }

  /**
   * onabort event listener.
   */
  public onabort: ((ev?: Event) => any) | null = null;

  /**
   * Added new "abort" event listener, only support "abort" event.
   *
   * @param _type - Only support "abort" event
   * @param listener - The listener to be added
   */
  public addEventListener(
    // tslint:disable-next-line:variable-name
    _type: "abort",
    listener: (this: AbortSignalLike, ev: any) => any
  ): void {
    if (!listenersMap.has(this)) {
      throw new TypeError("Expected `this` to be an instance of AbortSignal.");
    }

    const listeners = listenersMap.get(this)!;
    listeners.push(listener);
  }

  /**
   * Remove "abort" event listener, only support "abort" event.
   *
   * @param _type - Only support "abort" event
   * @param listener - The listener to be removed
   */
  public removeEventListener(
    // tslint:disable-next-line:variable-name
    _type: "abort",
    listener: (this: AbortSignalLike, ev: any) => any
  ): void {
    if (!listenersMap.has(this)) {
      throw new TypeError("Expected `this` to be an instance of AbortSignal.");
    }

    const listeners = listenersMap.get(this)!;

    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  /**
   * Dispatches a synthetic event to the AbortSignal.
   */
  dispatchEvent(_event: Event): boolean {
    throw new Error(
      "This is a stub dispatchEvent implementation that should not be used.  It only exists for type-checking purposes."
    );
  }
}

/**
 * Helper to trigger an abort event immediately, the onabort and all abort event listeners will be triggered.
 * Will try to trigger abort event for all linked AbortSignal nodes.
 *
 * - If there is a timeout, the timer will be cancelled.
 * - If aborted is true, nothing will happen.
 *
 * @internal
 */
// eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
export function abortSignal(signal: AbortSignal): void {
  if (signal.aborted) {
    return;
  }

  if (signal.onabort) {
    signal.onabort.call(signal);
  }

  const listeners = listenersMap.get(signal)!;
  if (listeners) {
    listeners.forEach((listener) => {
      listener.call(signal, { type: "abort" });
    });
  }

  abortedMap.set(signal, true);
}
