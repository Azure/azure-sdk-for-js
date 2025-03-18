// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import {
  __calculateRetryDelay,
  __cancelablePromiseRace,
  __computeSha256Hash,
  __computeSha256Hmac,
  __createAbortablePromise,
  __delay,
  __getErrorMessage,
  __getRandomIntegerInclusive,
  __isBrowser,
  __isBun,
  __isDefined,
  __isDeno,
  __isError,
  __isNodeLike,
  __isNodeRuntime,
  __isObject,
  __isObjectWithProperties,
  __isReactNative,
  __isWebWorker,
  __objectHasProperty,
  __randomUUID,
  __isNode,
  __stringToUint8Array,
  __uint8ArrayToString,
} from "@typespec/ts-http-runtime/__internal/util";

/**
 * Calculates the delay interval for retry attempts using exponential delay with jitter.
 *
 * @param retryAttempt - The current retry attempt number.
 *
 * @param config - The exponential retry configuration.
 *
 * @returns An object containing the calculated retry delay.
 */
export function calculateRetryDelay(
  retryAttempt: number,
  config: {
    retryDelayInMs: number;
    maxRetryDelayInMs: number;
  },
): {
  retryAfterInMs: number;
} {
  return __calculateRetryDelay(retryAttempt, config);
}

/**
 * promise.race() wrapper that aborts rest of promises as soon as the first promise settles.
 */
export function cancelablePromiseRace<T extends unknown[]>(
  abortablePromiseBuilders: AbortablePromiseBuilder<T[number]>[],
  options?: {
    abortSignal?: AbortSignalLike;
  },
): Promise<T[number]> {
  return __cancelablePromiseRace(abortablePromiseBuilders, options);
}

/**
 * Generates a SHA-256 hash.
 *
 * @param content - The data to be included in the hash.
 *
 * @param encoding - The textual encoding to use for the returned hash.
 */
export function computeSha256Hash(content: string, encoding: "base64" | "hex"): Promise<string> {
  return __computeSha256Hash(content, encoding);
}

/**
 * Generates a SHA-256 HMAC signature.
 *
 * @param key - The HMAC key represented as a base64 string, used to generate the cryptographic HMAC hash.
 *
 * @param stringToSign - The data to be signed.
 *
 * @param encoding - The textual encoding to use for the returned HMAC digest.
 */
export function computeSha256Hmac(
  key: string,
  stringToSign: string,
  encoding: "base64" | "hex",
): Promise<string> {
  return __computeSha256Hmac(key, stringToSign, encoding);
}

/**
 * Creates an abortable promise.
 *
 * @param buildPromise - A function that takes the resolve and reject functions as parameters.
 *
 * @param options - The options for the abortable promise.
 *
 * @returns A promise that can be aborted.
 */
export function createAbortablePromise<T>(
  buildPromise: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void,
  ) => void,
  options?: CreateAbortablePromiseOptions,
): Promise<T> {
  return __createAbortablePromise(buildPromise, options);
}

/**
 * A wrapper for setTimeout that resolves a promise after timeInMs milliseconds.
 *
 * @param timeInMs - The number of milliseconds to be delayed.
 *
 * @param options - The options for delay - currently abort options
 *
 * @returns Promise that is resolved after timeInMs
 */
export function delay(timeInMs: number, options?: DelayOptions): Promise<void> {
  return __delay(timeInMs, options);
}

/**
 * Given what is thought to be an error object, return the message if possible. If the message is missing, returns a stringified version of the input.
 *
 * @param e - Something thrown from a try block
 *
 * @returns The error message or a string of the input
 */
export function getErrorMessage(e: unknown): string {
  return __getErrorMessage(e);
}

/**
 * Returns a random integer value between a lower and upper bound, inclusive of both bounds. Note that this uses Math.random and isn't secure. If you need to use this for any kind of security purpose, find a better source of random.
 *
 * @param min - The smallest integer value allowed.
 *
 * @param max - The largest integer value allowed.
 */
export function getRandomIntegerInclusive(min: number, max: number): number {
  return __getRandomIntegerInclusive(min, max);
}

/**
 * Helper TypeGuard that checks if something is defined or not.
 *
 * @param thing - Anything
 */
export function isDefined<T>(thing: T | undefined | null): thing is T {
  return __isDefined(thing);
}

/**
 * Typeguard for an error object shape (has name and message)
 *
 * @param e - Something caught by a catch clause.
 */
export function isError(e: unknown): e is Error {
  return __isError(e);
}

/**
 * Helper to determine when an input is a generic JS object.
 *
 * @returns true when input is an object type that is not null, Array, RegExp, or Date.
 */
export function isObject(input: unknown): input is UnknownObject {
  return __isObject(input);
}

/**
 * Helper TypeGuard that checks if the input is an object with the specified properties.
 *
 * @param thing - Anything.
 *
 * @param properties - The name of the properties that should appear in the object.
 */
export function isObjectWithProperties<Thing, PropertyName extends string>(
  thing: Thing,
  properties: PropertyName[],
): thing is Thing & Record<PropertyName, unknown> {
  return __isObjectWithProperties(thing, properties);
}

/**
 * Helper TypeGuard that checks if the input is an object with the specified property.
 *
 * @param thing - Any object.
 *
 * @param property - The name of the property that should appear in the object.
 */
export function objectHasProperty<Thing, PropertyName extends string>(
  thing: Thing,
  property: PropertyName,
): thing is Thing & Record<PropertyName, unknown> {
  return __objectHasProperty(thing, property);
}

/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 */
export function randomUUID(): string {
  return __randomUUID();
}

/**
 * Options related to abort controller.
 */
export interface AbortOptions {
  /**
   * The abort error message associated with containing operation.
   */
  abortErrorMsg?: string;
  /**
   * The abortSignal associated with containing operation.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options for the createAbortablePromise function.
 */
export interface CreateAbortablePromiseOptions extends AbortOptions {
  /**
   * A function to be called if the promise was aborted
   */
  cleanupBeforeAbort?: () => void;
}

/**
 * Options for support abort functionality for the delay method
 */
export interface DelayOptions extends AbortOptions {}

/**
 * Represents a function that returns a promise that can be aborted.
 */
export type AbortablePromiseBuilder<T> = (abortOptions: {
  abortSignal?: AbortSignalLike;
}) => Promise<T>;

/**
 * Supported HTTP methods to use when making requests.
 *
 * @public
 */
export type HttpMethods =
  | "GET"
  | "PUT"
  | "POST"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "TRACE";

/**
 * A generic shape for a plain JS object.
 */
export type UnknownObject = {
  [s: string]: unknown;
};

/**
 * A constant that indicates whether the environment the code is running is a Web Browser.
 */
export const isBrowser: boolean = __isBrowser;
/**
 * A constant that indicates whether the environment the code is running is Bun.sh.
 */
export const isBun: boolean = __isBun;
/**
 * A constant that indicates whether the environment the code is running is Deno.
 */
export const isDeno: boolean = __isDeno;
/**
 * A constant that indicates whether the environment the code is running is a Node.js compatible environment.
 *
 * @deprecated
 *
 * Use `isNodeLike` instead.
 */
export const isNode: boolean = __isNode;
/**
 * A constant that indicates whether the environment the code is running is a Node.js compatible environment.
 */
export const isNodeLike: boolean = __isNodeLike;
/**
 * A constant that indicates whether the environment the code is running is Node.JS.
 */
export const isNodeRuntime: boolean = __isNodeRuntime;
/**
 * A constant that indicates whether the environment the code is running is in React-Native.
 */
export const isReactNative: boolean = __isReactNative;
/**
 * A constant that indicates whether the environment the code is running is a Web Worker.
 */
export const isWebWorker: boolean = __isWebWorker;

/** The supported character encoding type */
export type EncodingType = "utf-8" | "base64" | "base64url" | "hex";

/**
 * The helper that transforms bytes with specific character encoding into string
 * @param bytes - the uint8array bytes
 * @param format - the format we use to encode the byte
 * @returns a string of the encoded string
 */
export function uint8ArrayToString(bytes: Uint8Array, format: EncodingType): string {
  return __uint8ArrayToString(bytes, format);
}

/**
 * The helper that transforms string to specific character encoded bytes array.
 * @param value - the string to be converted
 * @param format - the format we use to decode the value
 * @returns a uint8array
 */
export function stringToUint8Array(value: string, format: EncodingType): Uint8Array {
  return __stringToUint8Array(value, format);
}
