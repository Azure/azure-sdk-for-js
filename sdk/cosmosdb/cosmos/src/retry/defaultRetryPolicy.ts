// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OperationType } from "../common";
import { ErrorResponse } from "../request";
import { TimeoutErrorCode } from "../request/TimeoutError";
import { RetryPolicy } from "./RetryPolicy";

/**
 * @hidden
 */
// Windows Socket Error Codes
const WindowsInterruptedFunctionCall = 10004;
/**
 * @hidden
 */
const WindowsFileHandleNotValid = 10009;
/**
 * @hidden
 */
const WindowsPermissionDenied = 10013;
/**
 * @hidden
 */
const WindowsBadAddress = 10014;
/**
 * @hidden
 */
const WindowsInvalidArgumnet = 10022;
/**
 * @hidden
 */
const WindowsResourceTemporarilyUnavailable = 10035;
/**
 * @hidden
 */
const WindowsOperationNowInProgress = 10036;
/**
 * @hidden
 */
const WindowsAddressAlreadyInUse = 10048;
/**
 * @hidden
 */
const WindowsConnectionResetByPeer = 10054;
/**
 * @hidden
 */
const WindowsCannotSendAfterSocketShutdown = 10058;
/**
 * @hidden
 */
const WindowsConnectionTimedOut = 10060;
/**
 * @hidden
 */
const WindowsConnectionRefused = 10061;
/**
 * @hidden
 */
const WindowsNameTooLong = 10063;
/**
 * @hidden
 */
const WindowsHostIsDown = 10064;
/**
 * @hidden
 */
const WindowsNoRouteTohost = 10065;
/**
 * @hidden
 */

// Linux Error Codes
/**
 * @hidden
 */
const LinuxConnectionReset = "ECONNRESET";

// Node Error Codes
/**
 * @hidden
 */
const BrokenPipe = "EPIPE";

/**
 * @hidden
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
 * @hidden
 */
function needsRetry(operationType: OperationType, code: number | string): boolean {
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
 * @hidden
 */
export class DefaultRetryPolicy implements RetryPolicy {
  private maxTries: number = 10;
  private currentRetryAttemptCount: number = 0;
  public retryAfterInMs: number = 1000;

  constructor(private operationType: OperationType) {}
  /**
   * Determines whether the request should be retried or not.
   * @param err - Error returned by the request.
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
