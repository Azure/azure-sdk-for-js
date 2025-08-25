// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CancellableAsyncLock } from "./lock.js";
import { CancellableAsyncLockImpl } from "./lock.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { WebSocketImpl } from "rhea-promise";
import { delay as wrapperDelay } from "@azure/core-util";

/**
 * @internal
 *
 * Describes the options that can be provided to create an async lock.
 */
export interface AsyncLockOptions {
  /**
   * The max timeout. Default is: 0 (never timeout).
   */
  timeout?: number;
  /**
   * Maximum pending tasks. Default is: 1000.
   */
  maxPending?: number;
  /**
   * Whether lock can reenter in the same domain.
   * Default is: false.
   */
  domainReentrant?: boolean;
  /**
   * Your implementation of the promise. Default is: global promise.
   */
  Promise?: any;
}

/**
 * Options to configure the channelling of the AMQP connection over Web Sockets.
 */
export interface WebSocketOptions {
  /**
   * The WebSocket constructor used to create an AMQP connection over a WebSocket.
   * This option should be provided in the below scenarios:
   * - The TCP port 5671 which is that is used by the AMQP connection to Event Hubs is blocked in your environment.
   * - Your application needs to be run behind a proxy server.
   * - Your application needs to run in the browser and you want to provide your own choice of Websocket implementation
   *   instead of the built-in WebSocket in the browser.
   */
  webSocket?: WebSocketImpl;
  /**
   * Options to be passed to the WebSocket constructor when the underlying `rhea` library instantiates
   * the WebSocket.
   */
  webSocketConstructorOptions?: any;
}

/**
 * Defines an object with possible properties defined in T.
 */
export type ParsedOutput<T> = { [P in keyof T]: T[P] };

/**
 * Parses the connection string and returns an object of type T.
 *
 * Connection strings have the following syntax:
 *
 * ConnectionString ::= `Part { ";" Part } [ ";" ] [ WhiteSpace ]`
 * Part             ::= [ PartLiteral [ "=" PartLiteral ] ]
 * PartLiteral      ::= [ WhiteSpace ] Literal [ WhiteSpace ]
 * Literal          ::= ? any sequence of characters except ; or = or WhiteSpace ?
 * WhiteSpace       ::= ? all whitespace characters including `\r` and `\n` ?
 *
 * @param connectionString - The connection string to be parsed.
 * @returns ParsedOutput<T>.
 */
export function parseConnectionString<T>(connectionString: string): ParsedOutput<T> {
  const output: { [k: string]: string } = {};
  const parts = connectionString.trim().split(";");

  for (let part of parts) {
    part = part.trim();

    if (part === "") {
      // parts can be empty
      continue;
    }

    const splitIndex = part.indexOf("=");
    if (splitIndex === -1) {
      throw new Error(
        "Connection string malformed: each part of the connection string must have an `=` assignment.",
      );
    }

    const key = part.substring(0, splitIndex).trim();
    if (key === "") {
      throw new Error("Connection string malformed: missing key for assignment");
    }

    const value = part.substring(splitIndex + 1).trim();

    output[key] = value;
  }

  return output as any;
}

/**
 * The cancellable async lock instance.
 */
export const defaultCancellableLock: CancellableAsyncLock = new CancellableAsyncLockImpl();

/**
 * @internal
 *
 * Describes a Timeout class that can wait for the specified amount of time and then resolve/reject
 * the promise with the given value.
 */
export class Timeout {
  private _timer?: ReturnType<typeof setTimeout>;

  set<T>(t: number, value?: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.clear();
      const callback: (args: any) => void = value ? () => reject(new Error(`${value}`)) : resolve;
      this._timer = setTimeout(callback, t);
    });
  }

  clear(): void {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }

  wrap<T>(promise: Promise<T>, t: number, value?: T): Promise<T> {
    const wrappedPromise = this._promiseFinally(promise, () => this.clear());
    const timer = this.set(t, value);
    return Promise.race([wrappedPromise, timer]);
  }

  private _promiseFinally<T>(promise: Promise<T>, fn: (...args: any[]) => void): Promise<T> {
    const success = (result: T): T => {
      fn();
      return result;
    };
    const error = (e: Error): Promise<never> => {
      fn();
      return Promise.reject(e);
    };
    return Promise.resolve(promise).then(success, error);
  }

  static set<T>(t: number, value?: T): Promise<T> {
    return new Timeout().set(t, value);
  }

  static wrap<T>(promise: Promise<T>, t: number, value?: T): Promise<T> {
    return new Timeout().wrap(promise, t, value);
  }
}

/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param delayInMs - The number of milliseconds to be delayed.
 * @param abortSignal - The abortSignal associated with containing operation.
 * @param abortErrorMsg - The abort error message associated with containing operation.
 * @param value - The value to be resolved with after a timeout of t milliseconds.
 * @returns - Resolved promise
 */
export async function delay<T>(
  delayInMs: number,
  abortSignal?: AbortSignalLike,
  abortErrorMsg?: string,
  value?: T,
): Promise<T | void> {
  await wrapperDelay(delayInMs, {
    abortSignal: abortSignal,
    abortErrorMsg: abortErrorMsg,
  });
  if (value !== undefined) {
    return value;
  }
}

/**
 * Checks if an address is localhost.
 * @param address - The address to check.
 * @returns true if the address is localhost, false otherwise.
 */
export function isLoopbackAddress(address: string): boolean {
  return /^(.*:\/\/)?(127\.[\d.]+|[0:]+1|localhost)/.test(address.toLowerCase());
}

/**
 * @internal
 *
 * Generates a random number between the given interval
 * @param min - Min number of the range (inclusive).
 * @param max - Max number of the range (inclusive).
 */
export function randomNumberFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @internal
 *
 * Type declaration for a Function type where T is the input to the function and V is the output
 * of the function.
 */
export type Func<T, V> = (a: T) => V;

/**
 * @internal
 *
 * Executes an array of promises sequentially. Inspiration of this method is here:
 * https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html. An awesome blog on promises!
 *
 * @param promiseFactories - An array of promise factories(A function that return a promise)
 *
 * @param kickstart - Input to the first promise that is used to kickstart the promise chain.
 * If not provided then the promise chain starts with undefined.
 *
 * @returns A chain of resolved or rejected promises
 */
export function executePromisesSequentially(
  promiseFactories: Array<any>,
  kickstart?: unknown,
): Promise<any> {
  let result = Promise.resolve(kickstart);
  promiseFactories.forEach((promiseFactory) => {
    result = result.then(promiseFactory);
  });
  return result;
}

/**
 * @internal
 *
 * Determines whether the given connection string is an iothub connection string.
 * @param connectionString - The connection string.
 * @returns boolean.
 */
export function isIotHubConnectionString(connectionString: string): boolean {
  const cs = String(connectionString);

  let result: boolean = false;
  const model: any = parseConnectionString<any>(cs);
  if (model && model.HostName && model.SharedAccessKey && model.SharedAccessKeyName) {
    result = true;
  }
  return result;
}

/**
 * @internal
 */
export function isString(s: unknown): s is string {
  return typeof s === "string";
}

/**
 * @internal
 */
export function isNumber(n: unknown): n is number {
  return typeof n === "number";
}

/**
 * @internal
 * Safely read a property from the global object by key.
 * Returns undefined if the property or global object is unavailable.
 */
export function getGlobalProperty<T = any>(key: string): T | undefined {
  try {
    const g: any = globalThis as any;
    return g?.[key] as T | undefined;
  } catch {
    return undefined;
  }
}
