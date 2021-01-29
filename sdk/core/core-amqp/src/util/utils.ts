// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import AsyncLock from "async-lock";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { WebSocketImpl } from "rhea-promise";

export { AsyncLock };
/**
 * @internal
 *
 * Describes the options that can be provided to create an async lock.
 */
export interface AsyncLockOptions {
  /**
   * @property {number} [timeout] The max timeout. Default is: 0 (never timeout).
   */
  timeout?: number;
  /**
   * @property {number} [maxPending] Maximum pending tasks. Default is: 1000.
   */
  maxPending?: number;
  /**
   * @property {boolean} [domainReentrant] Whether lock can reenter in the same domain.
   * Default is: false.
   */
  domainReentrant?: boolean;
  /**
   * @property {any} [Promise] Your implementation of the promise. Default is: global promise.
   */
  Promise?: any;
}

/**
 * Options to configure the channelling of the AMQP connection over Web Sockets.
 */
export interface WebSocketOptions {
  /**
   * @property
   * The WebSocket constructor used to create an AMQP connection over a WebSocket.
   * This option should be provided in the below scenarios:
   * - The TCP port 5671 which is that is used by the AMQP connection to Event Hubs is blocked in your environment.
   * - Your application needs to be run behind a proxy server.
   * - Your application needs to run in the browser and you want to provide your own choice of Websocket implementation
   *   instead of the built-in WebSocket in the browser.
   */
  webSocket?: WebSocketImpl;
  /**
   * @property
   * Options to be passed to the WebSocket constructor when the underlying `rhea` library instantiates
   * the WebSocket.
   */
  webSocketConstructorOptions?: any;
}

/**
 * @internal
 *
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

/**
 * Defines an object with possible properties defined in T.
 * @type ParsedOutput<T>
 */
export type ParsedOutput<T> = { [P in keyof T]: T[P] };

/**
 * Parses the connection string and returns an object of type T.
 *
 * Connection strings have the following syntax:
 *
 * ConnectionString ::= Part { ";" Part } [ ";" ] [ WhiteSpace ]
 * Part             ::= [ PartLiteral [ "=" PartLiteral ] ]
 * PartLiteral      ::= [ WhiteSpace ] Literal [ WhiteSpace ]
 * Literal          ::= ? any sequence of characters except ; or = or WhiteSpace ?
 * WhiteSpace       ::= ? all whitespace characters including \r and \n ?
 *
 * @param {string} connectionString The connection string to be parsed.
 * @returns {ParsedOutput<T>} ParsedOutput<T>.
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
        "Connection string malformed: each part of the connection string must have an `=` assignment."
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
 * @internal
 *
 * Gets a new instance of the async lock with desired settings.
 * @param {AsyncLockOptions} [options] The async lock options.
 * @returns {AsyncLock} AsyncLock
 */
export function getNewAsyncLock(options?: AsyncLockOptions): AsyncLock {
  return new AsyncLock(options);
}

/**
 * @constant {AsyncLock} defaultLock The async lock instance with default settings.
 */
export const defaultLock: AsyncLock = new AsyncLock({ maxPending: 10000 });

/**
 * @internal
 *
 * Describes a Timeout class that can wait for the specified amount of time and then resolve/reject
 * the promise with the given value.
 * @class Timeout
 */
export class Timeout {
  // Node and browsers return different types from setTimeout
  // Any is the easiest way to avoid type errors in either platform
  private _timer?: any;

  set<T>(t: number, value?: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.clear();
      const callback = value ? () => reject(new Error(`${value}`)) : resolve;
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

  private _promiseFinally<T>(promise: Promise<T>, fn: Function): Promise<T> {
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
 * @param {number} delayInMs - The number of milliseconds to be delayed.
 * @param {AbortSignalLike} abortSignal - The abortSignal associated with containing operation.
 * @param {string} abortErrorMsg - The abort error message associated with containing operation.
 * @param {T} value - The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} - Resolved promise
 */
export function delay<T>(
  delayInMs: number,
  abortSignal?: AbortSignalLike,
  abortErrorMsg?: string,
  value?: T
): Promise<T | void> {
  return new Promise((resolve, reject) => {
    const rejectOnAbort = (): void => {
      return reject(
        new AbortError(abortErrorMsg ? abortErrorMsg : `The delay was cancelled by the user.`)
      );
    };

    const removeListeners = (): void => {
      if (abortSignal) {
        abortSignal.removeEventListener("abort", onAborted);
      }
    };

    const onAborted = (): void => {
      clearTimeout(timer);
      removeListeners();
      return rejectOnAbort();
    };

    if (abortSignal && abortSignal.aborted) {
      return rejectOnAbort();
    }

    const timer = setTimeout(() => {
      removeListeners();
      resolve(value);
    }, delayInMs);

    if (abortSignal) {
      abortSignal.addEventListener("abort", onAborted);
    }
  });
}

/**
 * @internal
 *
 * Generates a random number between the given interval
 * @param {number} min Min number of the range (inclusive).
 * @param {number} max Max number of the range (inclusive).
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
 * @param {Array} promiseFactories An array of promise factories(A function that return a promise)
 *
 * @param {any} [kickstart] Input to the first promise that is used to kickstart the promise chain.
 * If not provided then the promise chain starts with undefined.
 *
 * @return A chain of resolved or rejected promises
 */
export function executePromisesSequentially(
  promiseFactories: Array<any>,
  kickstart?: any
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
 * @param {string} connectionString The connection string.
 * @return {boolean} boolean.
 */
export function isIotHubConnectionString(connectionString: string): boolean {
  connectionString = String(connectionString);

  let result: boolean = false;
  const model: any = parseConnectionString<any>(connectionString);
  if (model && model.HostName && model.SharedAccessKey && model.SharedAccessKeyName) {
    result = true;
  }
  return result;
}

/**
 * @hidden
 * @internal
 */
export function isString(s: any): s is string {
  return typeof s === "string";
}

/**
 * @hidden
 * @internal
 */
export function isNumber(n: any): n is number {
  return typeof n === "number";
}
