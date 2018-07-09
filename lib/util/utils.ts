// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as xml2js from "isomorphic-xml2js";
import * as uuidv4 from "uuid/v4";
import { HttpOperationResponse } from "../httpOperationResponse";
import { RestError } from "../restError";
import { WebResource } from "../webResource";
import { Constants } from "./constants";

/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode = typeof navigator === "undefined" && typeof process !== "undefined";

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
 * Checks if a value is null or undefined.
 *
 * @param {object} value The value to check for null or undefined.
 * @return {boolean} True if the value is null or undefined, false otherwise.
 */
// TODO: Audit the usages of this and remove them.
// Read: https://medium.com/@basarat/null-vs-undefined-in-typescript-land-dc0c7a5f240a
// https://github.com/Microsoft/TypeScript/issues/7426
export function objectIsNull(value: any): boolean {
  return value === null || value === undefined;
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
 * @param {HttpOperationResponse} response - The Http Response
 *
 * @return {object} strippedResponse - The stripped version of Http Response.
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
 * @param {object} request - The Http Request object
 *
 * @return {object} strippedRequest - The stripped version of Http Request.
 */
export function stripRequest(request: WebResource): WebResource {
  let strippedRequest = new WebResource();
  try {
    strippedRequest = request.clone();
    if (strippedRequest.headers) {
      strippedRequest.headers.remove("authorization");
    }
  } catch (err) {
    const errMsg = err.message;
    err.message = `Error - "${errMsg}" occured while creating a stripped version of the request object - "${request}".`;
    return err;
  }

  return strippedRequest;
}

/**
 * Validates the given uuid as a string
 *
 * @param {string} uuid - The uuid as a string that needs to be validated
 *
 * @return {boolean} result - True if the uuid is valid; false otherwise.
 */
export function isValidUuid(uuid: string): boolean {
  const validUuidRegex = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", "ig");
  return validUuidRegex.test(uuid);
}

/**
 * Provides an array of values of an object. For example
 * for a given object { "a": "foo", "b": "bar" }, the method returns ["foo", "bar"].
 *
 * @param {object} obj - An object whose properties need to be enumerated so that it"s values can be provided as an array
 *
 * @return {array} result - An array of values of the given object.
 */
export function objectValues(obj: { [key: string]: any; }): any[] {
  const result: any[] = [];
  if (obj && obj instanceof Object) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result.push((<any>obj)[key]);
      }
    }
  } else {
    throw new Error(`The provided object ${JSON.stringify(obj, undefined, 2)} is not a valid object that can be ` +
      `enumerated to provide its values as an array.`);
  }
  return result;
}

/**
 * Generated UUID
 *
 * @return {string} RFC4122 v4 UUID.
 */
export function generateUuid(): string {
  return uuidv4();
}

/*
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

/*
 * Merges source object into the target object
 * @param {object} source The object that needs to be merged
 *
 * @param {object} target The object to be merged into
 *
 * @returns {object} target - Returns the merged target object.
 */
export function mergeObjects(source: { [key: string]: any; }, target: { [key: string]: any; }) {
  Object.keys(source).forEach((key) => {
    target[key] = source[key];
  });
  return target;
}

/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param {number} t - The number of milliseconds to be delayed.
 * @param {T} value - The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} - Resolved promise
 */
export function delay<T>(t: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

/**
 * Service callback that is returned for REST requests initiated by the service client.
 *
 * @property {Error|RestError} err         - The error occurred if any, while executing the request; otherwise null
 * @property {TResult} result                 - The deserialized response body if an error did not occur.
 * @property {WebResource}  request           - The raw/actual request sent to the server if an error did not occur.
 * @property {HttpOperationResponse} response  - The raw/actual response from the server if an error did not occur.
 */
export interface ServiceCallback<TResult> { (err: Error | RestError, result?: TResult, request?: WebResource, response?: HttpOperationResponse): void; }

/**
 * Converts a Promise to a callback.
 * @param {Promise<any>} promise - The Promise to be converted to a callback
 * @returns {Function} fn - A function that takes the callback (cb: Function): void
 */
export function promiseToCallback(promise: Promise<any>): Function {
  if (typeof promise.then !== "function") {
    throw new Error("The provided input is not a Promise.");
  }
  return (cb: Function): void => {
    promise.then((data: any) => {
      cb(undefined, data);
    }, (err: Error) => {
      cb(err);
    });
  };
}

/**
 * Converts a Promise to a service callback.
 * @param {Promise<HttpOperationResponse>} promise - The Promise of HttpOperationResponse to be converted to a service callback
 * @returns {Function} fn - A function that takes the service callback (cb: ServiceCallback<T>): void
 */
export function promiseToServiceCallback<T>(promise: Promise<HttpOperationResponse>): Function {
  if (typeof promise.then !== "function") {
    throw new Error("The provided input is not a Promise.");
  }
  return (cb: ServiceCallback<T>): void => {
    promise.then((data: HttpOperationResponse) => {
      process.nextTick(cb, undefined, data.parsedBody as T, data.request, data);
    }, (err: Error) => {
      process.nextTick(cb, err);
    });
  };
}

export function stringifyXML(obj: any, opts?: { rootName?: string }) {
  const builder = new xml2js.Builder({
    explicitArray: false,
    explicitCharkey: false,
    rootName: (opts || {}).rootName,
    renderOpts: {
      pretty: false
    }
  });
  return builder.buildObject(obj);
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
  sourceCtors.forEach(sourceCtors => {
    Object.getOwnPropertyNames(sourceCtors.prototype).forEach(name => {
      targetCtor.prototype[name] = sourceCtors.prototype[name];
    });
  });
}

const validateISODuration = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

/**
 * Indicates whether the given string is in ISO 8601 format.
 * @param {string} value - The value to be validated for ISO 8601 duration format.
 * @return {boolean} result - `true` if valid, `false` otherwise.
 */
export function isDuration(value: string): boolean {
  return validateISODuration.test(value);
}

/**
 * Replace all of the instances of searchValue in value with the provided replaceValue.
 */
export function replaceAll(value: string | undefined, searchValue: string, replaceValue: string): string | undefined {
  return !value || !searchValue ? value : value.split(searchValue).join(replaceValue || "");
}