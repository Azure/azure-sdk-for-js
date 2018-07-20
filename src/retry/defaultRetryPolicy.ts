import { ErrorResponse } from "../request";

/**
 * This class implements the default connection retry policy for requests.
 * @property {int} currentRetryAttemptCount           - Current retry attempt count.
 * @hidden
 */
export class DefaultRetryPolicy {
  private maxRetryAttemptCount: number = 10;
  private currentRetryAttemptCount: number = 0;
  public retryAfterInMilliseconds: number = 1000;

  // Windows Socket Error Codes
  private WindowsInterruptedFunctionCall: number = 10004;
  private WindowsFileHandleNotValid: number = 10009;
  private WindowsPermissionDenied: number = 10013;
  private WindowsBadAddress: number = 10014;
  private WindowsInvalidArgumnet: number = 10022;
  private WindowsResourceTemporarilyUnavailable: number = 10035;
  private WindowsOperationNowInProgress: number = 10036;
  private WindowsAddressAlreadyInUse: number = 10048;
  private WindowsConnectionResetByPeer: number = 10054;
  private WindowsCannotSendAfterSocketShutdown: number = 10058;
  private WindowsConnectionTimedOut: number = 10060;
  private WindowsConnectionRefused: number = 10061;
  private WindowsNameTooLong: number = 10063;
  private WindowsHostIsDown: number = 10064;
  private WindowsNoRouteTohost: number = 10065;

  // Linux Error Codes
  private LinuxConnectionReset = "ECONNRESET";

  private CONNECTION_ERROR_CODES: any[] = [
    this.WindowsInterruptedFunctionCall,
    this.WindowsFileHandleNotValid,
    this.WindowsPermissionDenied,
    this.WindowsBadAddress,
    this.WindowsInvalidArgumnet,
    this.WindowsResourceTemporarilyUnavailable,
    this.WindowsOperationNowInProgress,
    this.WindowsAddressAlreadyInUse,
    this.WindowsConnectionResetByPeer,
    this.WindowsCannotSendAfterSocketShutdown,
    this.WindowsConnectionTimedOut,
    this.WindowsConnectionRefused,
    this.WindowsNameTooLong,
    this.WindowsHostIsDown,
    this.WindowsNoRouteTohost,
    this.LinuxConnectionReset
  ];

  /**
   * @constructor ResourceThrottleRetryPolicy
   * @param {string} operationType - The type of operation being performed.
   */
  constructor(private operationType: string) {}
  /**
   * Determines whether the request should be retried or not.
   * @param {object} err - Error returned by the request.
   * @param {function} callback - The callback function which takes bool argument which
   *                              specifies whether the request will be retried or not.
   */
  public async shouldRetry(err: ErrorResponse): Promise<boolean> {
    if (err) {
      if (this.currentRetryAttemptCount < this.maxRetryAttemptCount && this.needs_retry(err.code)) {
        this.currentRetryAttemptCount++;
        return true;
      }
    }
    return false;
  }

  private needs_retry(code: number | string) {
    if (
      (this.operationType === "read" || this.operationType === "query") &&
      this.CONNECTION_ERROR_CODES.indexOf(code) !== -1
    ) {
      return true;
    } else {
      return false;
    }
  }
}
