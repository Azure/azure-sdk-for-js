// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * RetryPolicy types.
 */
export var StorageRetryPolicyType;
(function (StorageRetryPolicyType) {
    /**
     * Exponential retry. Retry time delay grows exponentially.
     */
    StorageRetryPolicyType[StorageRetryPolicyType["EXPONENTIAL"] = 0] = "EXPONENTIAL";
    /**
     * Linear retry. Retry time delay grows linearly.
     */
    StorageRetryPolicyType[StorageRetryPolicyType["FIXED"] = 1] = "FIXED";
})(StorageRetryPolicyType || (StorageRetryPolicyType = {}));
//# sourceMappingURL=StorageRetryPolicyType.js.map