"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRetryPolicy = void 0;
const index_js_1 = require("../common/index.js");
const TimeoutError_js_1 = require("../request/TimeoutError.js");
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
    TimeoutError_js_1.TimeoutErrorCode,
    BrokenPipe,
];
/**
 * @hidden
 */
function needsRetry(operationType, code) {
    if ((operationType === index_js_1.OperationType.Read || operationType === index_js_1.OperationType.Query) &&
        CONNECTION_ERROR_CODES.indexOf(code) !== -1) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * This class implements the default connection retry policy for requests.
 * @hidden
 */
class DefaultRetryPolicy {
    constructor(operationType) {
        this.operationType = operationType;
        this.maxTries = 10;
        this.currentRetryAttemptCount = 0;
        this.retryAfterInMs = 1000;
    }
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     */
    async shouldRetry(err, diagnosticNode) {
        if (err) {
            if (this.currentRetryAttemptCount < this.maxTries &&
                needsRetry(this.operationType, err.code)) {
                diagnosticNode.addData({ successfulRetryPolicy: "default" });
                this.currentRetryAttemptCount++;
                return true;
            }
        }
        return false;
    }
}
exports.DefaultRetryPolicy = DefaultRetryPolicy;
//# sourceMappingURL=defaultRetryPolicy.js.map