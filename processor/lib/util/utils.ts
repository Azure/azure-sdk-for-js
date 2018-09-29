// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as log from "../log";
import { StorageError } from "azure-storage";
import { EPHDiagnosticInfo } from "../modelTypes";

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
    if (type === "Array") {
      if (!Array.isArray(paramValue)) {
        throw new TypeError(`${paramName} must be of type "${type}".`);
      }
    } else if (type === "Date") {
      if (!(paramValue instanceof Date)) {
        throw new TypeError(`${paramName} must be of type "${type}".`);
      }
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
  acquireLease = "Acquire Lease",
  gettingPartitionIds = "Getting PartitionIds",
  gettingAllLeases = "Getting All Leases",
  creatingAllLeases = "Creating All Leases",
  scanningLeases = "Scanning leases",
  checkingLeases = "Checking Leases",
  checkingExpiredLeases = "Checking Expired Leases",
  renewingLease = "Renewing Lease",
  stealingLease = "Stealing Lease",
  creatingLease = "Creating Lease",
  creatingCheckpoint = "Creating Checkpoint",
  updatingCheckpoint = "Updating Checkpoint",
  creatingCheckpointStore = "Creating Checkpoint Store",
  creatingEventProcessor = "Creating Event Processor",
  creatingLeaseStore = "Creating Lease Store",
  initializingStores = "Initializing Stores",
  partitionManagerCleanup = "Partition Manager Cleanup",
  partitionManagerMainLoop = "Partition Manager Main Loop",
  partitionReceiverManagement = "Partition Receiver Management",
  deletingLeaseStore = "Deleting Lease Store"
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
