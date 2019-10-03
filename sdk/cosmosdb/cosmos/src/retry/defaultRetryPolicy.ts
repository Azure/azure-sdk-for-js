// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OperationType } from "../common";
import { ErrorResponse } from "../request";
import { TimeoutErrorCode } from "../request/TimeoutError";
import { RetryPolicy } from "./RetryPolicy";

/**
 * @ignore
 */
// Windows Socket Error Codes
const WindowsInterruptedFunctionCall = 10004;
/**
 * @ignore
 */
const WindowsFileHandleNotValid = 10009;
/**
 * @ignore
 */
const WindowsPermissionDenied = 10013;
/**
 * @ignore
 */
const WindowsBadAddress = 10014;
/**
 * @ignore
 */
const WindowsInvalidArgumnet = 10022;
/**
 * @ignore
 */
const WindowsResourceTemporarilyUnavailable = 10035;
/**
 * @ignore
 */
const WindowsOperationNowInProgress = 10036;
/**
 * @ignore
 */
const WindowsAddressAlreadyInUse = 10048;
/**
 * @ignore
 */
const WindowsConnectionResetByPeer = 10054;
/**
 * @ignore
 */
const WindowsCannotSendAfterSocketShutdown = 10058;
/**
 * @ignore
 */
const WindowsConnectionTimedOut = 10060;
/**
 * @ignore
 */
const WindowsConnectionRefused = 10061;
/**
 * @ignore
 */
const WindowsNameTooLong = 10063;
/**
 * @ignore
 */
const WindowsHostIsDown = 10064;
/**
 * @ignore
 */
const WindowsNoRouteTohost = 10065;
/**
 * @ignore
 */

// Linux Error Codes
/**
 * @ignore
 */
const LinuxConnectionReset = "ECONNRESET";

// Node Error Codes
/**
 * @ignore
 */
const BrokenPipe = "EPIPE";

/**
 * @ignore
 */
const CONNECTION_ERROR_CODES = [
  WindowsInterruptedFunctionCall,
  WindowsFileHandleNotValid,
  WindowsPermissionDenied,
  WindowsBadAddress,
  WindowsInvalidArgumnet,
  WindowsResourceTemporarilyUnavailable,
  WindowsOperationNowInProgress,
  WindowsAddressAlreadyInUse,
  WindowsConnectionResetByPeer,
  WindowsCannotSendAfterSocketShutdown,
  WindowsConnectionTimedOut,
  WindowsConnectionRefused,
  WindowsNameTooLong,
  WindowsHostIsDown,
  WindowsNoRouteTohost,
  LinuxConnectionReset,
  TimeoutErrorCode,
  BrokenPipe
];

/**
 * @ignore
 */
function needsRetry(operationType: OperationType, code: number | string) {
  if (
    (operationType === OperationType.Read || operationType === OperationType.Query) &&
    CONNECTION_ERROR_CODES.indexOf(code) !== -1
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * This class implements the default connection retry policy for requests.
 * @property {int} currentRetryAttemptCount           - Current retry attempt count.
 * @hidden
 * @ignore
 */
export class DefaultRetryPolicy implements RetryPolicy {
  private maxTries: number = 10;
  private currentRetryAttemptCount: number = 0;
  public retryAfterInMs: number = 1000;

  constructor(private operationType: OperationType) {}
  /**
   * Determines whether the request should be retried or not.
   * @param {object} err - Error returned by the request.
   */
  public async shouldRetry(err: ErrorResponse): Promise<boolean> {
    if (err) {
      if (
        this.currentRetryAttemptCount < this.maxTries &&
        needsRetry(this.operationType, err.code)
      ) {
        this.currentRetryAttemptCount++;
        return true;
      }
    }
    return false;
  }
}
