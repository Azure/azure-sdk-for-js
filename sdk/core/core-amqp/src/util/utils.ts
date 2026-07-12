// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CancellableAsyncLock } from "./lock.js";
import { CancellableAsyncLockImpl } from "./lock.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { WebSocketImpl } from "rhea-promise";
import { delay as wrapperDelay } from "@azure/core-util";

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
  const output: Record<string, string> = {};
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

  return output as ParsedOutput<T>;
}

/**
 * The cancellable async lock instance.
 */
export const defaultCancellableLock: CancellableAsyncLock = new CancellableAsyncLockImpl();

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
