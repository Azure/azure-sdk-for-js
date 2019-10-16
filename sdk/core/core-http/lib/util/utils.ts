// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import uuidv4 from "uuid/v4";
import { HttpOperationResponse } from "../httpOperationResponse";
import { RestError } from "../restError";
import { WebResource } from "../webResource";
import { Constants } from "./constants";

const validUuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/gi;

/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode =
  typeof process !== "undefined" &&
  !!process.version &&
  !!process.versions &&
  !!process.versions.node;

/**
 * Checks if a parsed URL is HTTPS
 *
 * @param {object} urlToCheck The url to check
 * @return {boolean} True if the URL is HTTPS; false otherwise.
 */
export function urlIsHTTPS(urlToCheck: { protocol: string }): boolean {
  return urlToCheck.protocol.toLowerCase() === Constants.HTTPS;
}

/**
 * Encodes an URI.
 *
 * @param {string} uri The URI to be encoded.
 * @return {string} The encoded URI.
 */
export function encodeUri(uri: string): string {
  return encodeURIComponent(uri)
    .replace(/!/g, "%21")
    .replace(/"/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
}

/**
 * Returns a stripped version of the Http Response which only contains body,
 * headers and the status.
 *
 * @param {HttpOperationResponse} response The Http Response
 *
 * @return {object} The stripped version of Http Response.
 */
export function stripResponse(response: HttpOperationResponse): any {
  const strippedResponse: any = {};
  strippedResponse.body = response.bodyAsText;
  strippedResponse.headers = response.headers;
  strippedResponse.status = response.status;
  return strippedResponse;
}

/**
 * Returns a stripped version of the Http Request that does not contain the
 * Authorization header.
 *
 * @param {WebResource} request The Http Request object
 *
 * @return {WebResource} The stripped version of Http Request.
 */
export function stripRequest(request: WebResource): WebResource {
  const strippedRequest = request.clone();
  if (strippedRequest.headers) {
    strippedRequest.headers.remove("authorization");
  }
  return strippedRequest;
}

/**
 * Validates the given uuid as a string
 *
 * @param {string} uuid The uuid as a string that needs to be validated
 *
 * @return {boolean} True if the uuid is valid; false otherwise.
 */
export function isValidUuid(uuid: string): boolean {
  return validUuidRegex.test(uuid);
}

/**
 * Generated UUID
 *
 * @return {string} RFC4122 v4 UUID.
 */
export function generateUuid(): string {
  return uuidv4();
}

/**
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
export function executePromisesSequentially(promiseFactories: Array<any>, kickstart: any) {
  let result = Promise.resolve(kickstart);
  promiseFactories.forEach((promiseFactory) => {
    result = result.then(promiseFactory);
  });
  return result;
}

/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param {number} t The number of milliseconds to be delayed.
 * @param {T} value The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} Resolved promise
 */
export function delay<T>(t: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

/**
 * Service callback that is returned for REST requests initiated by the service client.
 */
export interface ServiceCallback<TResult> {
  /**
   * A method that will be invoked as a callback to a service function.
   * @param {Error | RestError | null} err The error occurred if any, while executing the request; otherwise null.
   * @param {TResult} [result] The deserialized response body if an error did not occur.
   * @param {WebResource} [request] The raw/actual request sent to the server if an error did not occur.
   * @param {HttpOperationResponse} [response] The raw/actual response from the server if an error did not occur.
   */
  (
    err: Error | RestError | null,
    result?: TResult,
    request?: WebResource,
    response?: HttpOperationResponse
  ): void;
}

/**
 * Converts a Promise to a callback.
 * @param {Promise<any>} promise The Promise to be converted to a callback
 * @returns {Function} A function that takes the callback (cb: Function): void
 * @deprecated generated code should instead depend on responseToBody
 */
export function promiseToCallback(promise: Promise<any>): Function {
  if (typeof promise.then !== "function") {
    throw new Error("The provided input is not a Promise.");
  }
  return (cb: Function): void => {
    promise.then(
      (data: any) => {
        cb(undefined, data);
      },
      (err: Error) => {
        cb(err);
      }
    );
  };
}

/**
 * Converts a Promise to a service callback.
 * @param {Promise<HttpOperationResponse>} promise - The Promise of HttpOperationResponse to be converted to a service callback
 * @returns {Function} A function that takes the service callback (cb: ServiceCallback<T>): void
 */
export function promiseToServiceCallback<T>(promise: Promise<HttpOperationResponse>): Function {
  if (typeof promise.then !== "function") {
    throw new Error("The provided input is not a Promise.");
  }
  return (cb: ServiceCallback<T>): void => {
    promise.then(
      (data: HttpOperationResponse) => {
        process.nextTick(cb, undefined, data.parsedBody as T, data.request, data);
      },
      (err: Error) => {
        process.nextTick(cb, err);
      }
    );
  };
}

export function prepareXMLRootList(obj: any, elementName: string) {
  if (!Array.isArray(obj)) {
    obj = [obj];
  }
  return { [elementName]: obj };
}

/**
 * Applies the properties on the prototype of sourceCtors to the prototype of targetCtor
 * @param {object} targetCtor The target object on which the properties need to be applied.
 * @param {Array<object>} sourceCtors An array of source objects from which the properties need to be taken.
 */
export function applyMixins(targetCtor: any, sourceCtors: any[]): void {
  sourceCtors.forEach((sourceCtors) => {
    Object.getOwnPropertyNames(sourceCtors.prototype).forEach((name) => {
      targetCtor.prototype[name] = sourceCtors.prototype[name];
    });
  });
}

const validateISODuration = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

/**
 * Indicates whether the given string is in ISO 8601 format.
 * @param {string} value The value to be validated for ISO 8601 duration format.
 * @return {boolean} `true` if valid, `false` otherwise.
 */
export function isDuration(value: string): boolean {
  return validateISODuration.test(value);
}

/**
 * Replace all of the instances of searchValue in value with the provided replaceValue.
 * @param {string | undefined} value The value to search and replace in.
 * @param {string} searchValue The value to search for in the value argument.
 * @param {string} replaceValue The value to replace searchValue with in the value argument.
 * @returns {string | undefined} The value where each instance of searchValue was replaced with replacedValue.
 */
export function replaceAll(
  value: string | undefined,
  searchValue: string,
  replaceValue: string
): string | undefined {
  return !value || !searchValue ? value : value.split(searchValue).join(replaceValue || "");
}

/**
 * Determines whether the given entity is a basic/primitive type
 * (string, number, boolean, null, undefined).
 * @param {any} value Any entity
 * @return {boolean} - true is it is primitive type, false otherwise.
 */
export function isPrimitiveType(value: any): boolean {
  return (typeof value !== "object" && typeof value !== "function") || value === null;
}
