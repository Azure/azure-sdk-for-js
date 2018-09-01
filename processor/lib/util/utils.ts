// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as AsyncLock from "async-lock";
import * as log from "../log";
import { StorageError } from "azure-storage";
import { EPHDiagnosticInfo } from "../modelTypes";

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
    return new Promise<T>((resolve) => {
      this._timer = setTimeout(() => resolve(value), t);
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
 * Provides a Dictionary like structure <Key, Value> of Type T.
 * @interface Dictionary
 */
export interface Dictionary<T> {
  [key: string]: T;
}

/**
 * Validates the type and requiredness of a given parameter.
 * @param paramName The name of the parameter.
 * @param paramValue The parameter value
 * @param type The type of the parameter
 */
export function validateType(paramName: string, paramValue: any, required: boolean,
  type: "string" | "number" | "boolean" | "Array" | "object" | "Date" | "function"): void {
  if (required && paramValue == undefined) {
    throw new TypeError(`${paramName} is required. Given value: ${paramValue}. Hence it cannot be null or undefined.`);
  }
  if (paramValue != undefined) {
    if (type === "Array" && !Array.isArray(paramValue)) {
      throw new TypeError(`${paramName} must be of type "${type}".`);
    } else if (type === "Date" && !(paramValue instanceof Date)) {
      throw new TypeError(`${paramName} must be of type "${type}".`);
    } else if (type === "string" || type === "number" || type === "boolean"
      || type === "object" || type === "function") {
      if (typeof paramValue !== type) {
        throw new TypeError(`${paramName} must be of type "${type}".`);
      }
    } else {
      throw new Error(`Invalid argument. type "${type}" is not a valid type. Valid values are: ` +
        `"string", "number", "boolean", "Array", "object", "Date", "function"`);
    }
  }
}

/**
 * @ignore
 */
export interface StorageErrorInfo {
  name: string;
  message: string;
  statusCode: number;
  code: string;
  requestId: string;
}

/**
 * @ignore
 */
export function getStorageError(err: StorageError): StorageErrorInfo {
  return {
    name: err.name,
    message: err.message,
    statusCode: err.statusCode!,
    code: err.code!,
    requestId: err.requestId!
  };
}

/**
 * @ignore
 */
export interface RetryConfig<T> {
  hostName: string;
  operation: () => Promise<T>;
  partitionId?: string;
  retryMessage: string;
  finalFailureMessage: string;
  action: string;
  maxRetries: number;
}

/**
 * @ignore
 */
export enum EPHActionStrings {
  gettingPartitionIds = "Getting PartitionIds",
  gettingAllLeases = "Getting All Leases",
  checkingLeases = "Checking Leases",
  checkingExpiredLeases = "Checking Expired Leases",
  renewingLease = "Renewing Lease",
  renewingLeases = "Renewing Leases",
  stealingLease = "Stealing Lease",
  creatingLease = "Creating Lease",
  creatingCheckpoint = "Creating Checkpoint",
  creatingCheckpointStore = "Creating Checkpoint Store",
  creatingEventProcessor = "Creating Event Processor",
  creatingLeaseStore = "Creating Lease Store",
  initializingStores = "Initializing Stores",
  partitionManagerCleanup = "Partition Manager Cleanup",
  partitionManagerMainLoop = "Partition Manager Main Loop",
  partitionReceiverManagement = "Partition Receiver Management"
}

/**
 * @ignore
 */
export async function retry<T>(config: RetryConfig<T>): Promise<T> {
  let createdOK: boolean = false;
  let retryCount: number = 0;
  let result: T = undefined as any;
  let innerError: Error | undefined = undefined;
  do {
    try {
      result = await config.operation();
      createdOK = true;
      if (config.partitionId) {
        log.util("[%s] Retry attempt: %d. Action '%s' for partitionId: '%s' suceeded.",
          config.hostName, retryCount, config.action, config.partitionId);
      } else {
        log.util("[%s] Retry attempt: %d. Action '%s' suceeded.",
          config.hostName, retryCount, config.action);
      }
    } catch (err) {
      innerError = err;
      if (config.partitionId) {
        log.error("[%s] An error occurred. Retry attempt: %d. PartitionId: '%s'. %s: %O",
          config.hostName, config.partitionId, retryCount, config.retryMessage, err);
      } else {
        log.error("[%s] An error occurred. Retry attempt: %d. %s: %O", config.hostName,
          retryCount, config.retryMessage, err);
      }
      retryCount++;
    }
  } while (!createdOK && (retryCount < config.maxRetries));

  if (!createdOK) {
    let msg: string;
    if (innerError) {
      msg = `${config.finalFailureMessage} while performing the action "${config.action}" ` +
        `due to ${innerError.stack ? innerError.stack : JSON.stringify(innerError)}`;
    } else {
      msg = `${config.finalFailureMessage} while performing the action "${config.action}"`;
    }

    log.error("[%s] %s", config.hostName, msg);
    const info: EPHDiagnosticInfo = {
      action: config.action,
      hostName: config.hostName,
      partitionId: config.partitionId || "N/A",
      error: new Error(msg)
    };
    throw info;
  }
  return result;
}
