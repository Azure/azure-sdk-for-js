"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageRetryPolicyType = void 0;
/**
 * RetryPolicy types.
 */
var StorageRetryPolicyType;
(function (StorageRetryPolicyType) {
    /**
     * Exponential retry. Retry time delay grows exponentially.
     */
    StorageRetryPolicyType[StorageRetryPolicyType["EXPONENTIAL"] = 0] = "EXPONENTIAL";
    /**
     * Linear retry. Retry time delay grows linearly.
     */
    StorageRetryPolicyType[StorageRetryPolicyType["FIXED"] = 1] = "FIXED";
})(StorageRetryPolicyType || (exports.StorageRetryPolicyType = StorageRetryPolicyType = {}));
//# sourceMappingURL=StorageRetryPolicyType.js.map