// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as AsyncLock from "async-lock";
import { DeliveryAnnotations, MessageAnnotations } from "../../rhea-promise";
import { ConnectionConfig } from "../connectionConfig";

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

export interface ServiceBusConnectionStringModel {
  Endpoint: string;
  SharedAccessKeyName: string;
  SharedAccessKey: string;
  EntityPath?: string;
  [x: string]: any;
}

export interface EventHubConnectionStringModel {
  Endpoint: string;
  SharedAccessKeyName: string;
  SharedAccessKey: string;
  EntityPath?: string;
  [x: string]: any;
}

export interface StorageConnectionStringModel {
  DefaultEndpointsProtocol: string;
  AccountName: string;
  AccountKey: string;
  EndpointSuffix: string;
  [x: string]: any;
}

export interface IotHubConnectionStringModel {
  HostName: string;
  SharedAccessKeyName: string;
  SharedAccessKey: string;
  DeviceId?: string;
}

export type ParsedOutput<T> = {
  [P in keyof T]: T[P];
};

export function parseConnectionString<T>(connectionString: string): ParsedOutput<T> {
  return connectionString.split(';').reduce((acc, part) => {
    const splitIndex = part.indexOf('=');
    return {
      ...acc,
      [part.substring(0, splitIndex)]: part.substring(splitIndex + 1)
    };
  }, {} as any);
}

/**
 * Gets a new instance of the async lock with desired settings.
 * @param {AsyncLockOptions} [options] The async lock options.
 */
export function getNewAsyncLock(options?: AsyncLockOptions): AsyncLock {
  return new AsyncLock(options);
}

/**
 * @constant {AsyncLock} defaultLock The async lock instance with default settings.
 */
export const defaultLock: AsyncLock = new AsyncLock();

export class Timeout {

  private _timer?: NodeJS.Timer;

  set<T>(t: number, value?: T): Promise<T> {
    const self = this;
    return new Promise<T>((resolve) => {
      self._timer = setTimeout(() => resolve(value), t);
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
    const success = (result: T) => {
      fn();
      return result;
    };
    const error = (e: Error) => {
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
 * @param {number} t - The number of milliseconds to be delayed.
 * @param {T} value - The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} - Resolved promise
 */
export function delay<T>(t: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

/**
 * Generates a random number between the given interval
 * @param {number} min Min number of the range (inclusive).
 * @param {number} max Max number of the range (inclusive).
 */
export function randomNumberFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Type declaration for a Function type where T is the input to the function and V is the output of the function.
 */
export type Func<T, V> = (a: T) => V;

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
export function executePromisesSequentially(promiseFactories: Array<any>, kickstart?: any): Promise<any> {
  let result = Promise.resolve(kickstart);
  promiseFactories.forEach((promiseFactory) => {
    result = result.then(promiseFactory);
  });
  return result;
}

/**
 * Determines whether the given connection string is an iothub connection string.
 * @param {string} connectionString The connection string.
 * @return {boolean} boolean.
 */
export function isIotHubConnectionString(connectionString: string): boolean {
  if (!connectionString || typeof connectionString !== "string") {
    throw new Error("connectionString is a required parameter and must be of type string.");
  }
  let result: boolean = false;
  const model: any = parseConnectionString<any>(connectionString);
  if (model && model.HostName && model.SharedAccessKey && model.SharedAccessKeyName) {
    result = true;
  }
  return result;
}

export function setIfDefined(obj: any, key: string, value: any): void {
  if (value !== undefined) {
    obj[key] = value;
  }
}

export function verifyType(value: any, type: 'string' | 'number'): void {
  if (value != undefined && typeof value !== type) {
    throw new TypeError(`Invalid type provided. Value must be a ${type}.`);
  }
}

export function verifyClass(value: any, clazz: Function, className: string): void {
  if (value != undefined && !(value instanceof clazz)) {
    throw new TypeError(`Invalid type provided. Value must be an instance of ${className}.`);
  }
}

/**
 * Describes the delivery annotations.
 * @interface
 */
export interface EventHubDeliveryAnnotations extends DeliveryAnnotations {
  /**
   * @property {string} [last_enqueued_offset] The offset of the last event.
   */
  last_enqueued_offset?: string;
  /**
   * @property {number} [last_enqueued_sequence_number] The sequence number of the last event.
   */
  last_enqueued_sequence_number?: number;
  /**
   * @property {number} [last_enqueued_time_utc] The enqueued time of the last event.
   */
  last_enqueued_time_utc?: number;
  /**
   * @property {number} [runtime_info_retrieval_time_utc] The retrieval time of the last event.
   */
  runtime_info_retrieval_time_utc?: number;
  /**
   * @property {string} Any unknown delivery annotations.
   */
  [x: string]: any;
}

/**
 * Describes the delivery annotations.
 * @interface
 */
export interface ServiceBusDeliveryAnnotations extends DeliveryAnnotations {
  /**
   * @property {string} [last_enqueued_offset] The offset of the last event.
   */
  last_enqueued_offset?: string;
  /**
   * @property {number} [last_enqueued_sequence_number] The sequence number of the last event.
   */
  last_enqueued_sequence_number?: number;
  /**
   * @property {number} [last_enqueued_time_utc] The enqueued time of the last event.
   */
  last_enqueued_time_utc?: number;
  /**
   * @property {number} [runtime_info_retrieval_time_utc] The retrieval time of the last event.
   */
  runtime_info_retrieval_time_utc?: number;
  /**
   * @property {string} Any unknown delivery annotations.
   */
  [x: string]: any;
}

/**
 * Map containing message attributes that will be held in the message header.
 */
export interface EventHubMessageAnnotations extends MessageAnnotations {
  /**
   * @property {string | null} [x-opt-partition-key] Annotation for the partition key set for the event.
   */
  "x-opt-partition-key"?: string | null;
  /**
   * @property {number} [x-opt-sequence-number] Annontation for the sequence number of the event.
   */
  "x-opt-sequence-number"?: number;
  /**
   * @property {number} [x-opt-enqueued-time] Annotation for the enqueued time of the event.
   */
  "x-opt-enqueued-time"?: number;
  /**
   * @property {string} [x-opt-offset] Annotation for the offset of the event.
   */
  "x-opt-offset"?: string;
  /**
   * @property {any} Any other annotation that can be added to the message.
   */
  [x: string]: any;
}

/**
 * Map containing message attributes that will be held in the message header.
 */
export interface ServiceBusMessageAnnotations extends MessageAnnotations {
  /**
   * @property {string | null} [x-opt-partition-key] Annotation for the partition key set for the event.
   */
  "x-opt-partition-key"?: string | null;
  /**
   * @property {number} [x-opt-sequence-number] Annontation for the sequence number of the event.
   */
  "x-opt-sequence-number"?: number;
  /**
   * @property {number} [x-opt-enqueued-time] Annotation for the enqueued time of the event.
   */
  "x-opt-enqueued-time"?: number;
  /**
   * @property {string} [x-opt-offset] Annotation for the offset of the event.
   */
  "x-opt-offset"?: string;
  /**
   * @property {string} [x-opt-locked-until] Annotation for the message being locked until.
   */
  "x-opt-locked-until"?: Date | number;
}

export interface CreateConnectionPrameters {
  config: ConnectionConfig;
  userAgent: string;
  packageVersion: string;
  useSaslPlain?: boolean;
}
