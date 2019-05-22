import { OperationType } from "../common";
import { ErrorResponse } from "../request";
import { TimeoutErrorCode } from "../request/TimeoutError";
import { RetryPolicy } from "./RetryPolicy";

// Windows Socket Error Codes
const WindowsInterruptedFunctionCall = 10004;
const WindowsFileHandleNotValid = 10009;
const WindowsPermissionDenied = 10013;
const WindowsBadAddress = 10014;
const WindowsInvalidArgumnet = 10022;
const WindowsResourceTemporarilyUnavailable = 10035;
const WindowsOperationNowInProgress = 10036;
const WindowsAddressAlreadyInUse = 10048;
const WindowsConnectionResetByPeer = 10054;
const WindowsCannotSendAfterSocketShutdown = 10058;
const WindowsConnectionTimedOut = 10060;
const WindowsConnectionRefused = 10061;
const WindowsNameTooLong = 10063;
const WindowsHostIsDown = 10064;
const WindowsNoRouteTohost = 10065;

// Linux Error Codes
const LinuxConnectionReset = "ECONNRESET";

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
  TimeoutErrorCode
];

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
 */
export class DefaultRetryPolicy implements RetryPolicy {
  private maxRetryAttemptCount: number = 10;
  private currentRetryAttemptCount: number = 0;
  public retryAfterInMilliseconds: number = 1000;

  constructor(private operationType: OperationType) {}
  /**
   * Determines whether the request should be retried or not.
   * @param {object} err - Error returned by the request.
   */
  public async shouldRetry(err: ErrorResponse): Promise<boolean> {
    if (err) {
      if (this.currentRetryAttemptCount < this.maxRetryAttemptCount && needsRetry(this.operationType, err.code)) {
        this.currentRetryAttemptCount++;
        return true;
      }
    }
    return false;
  }
}
