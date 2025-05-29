"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageRetryPolicyFactory = exports.StorageRetryPolicy = exports.StorageRetryPolicyType = void 0;
const StorageRetryPolicy_js_1 = require("./policies/StorageRetryPolicy.js");
Object.defineProperty(exports, "StorageRetryPolicy", { enumerable: true, get: function () { return StorageRetryPolicy_js_1.StorageRetryPolicy; } });
const StorageRetryPolicyType_js_1 = require("./policies/StorageRetryPolicyType.js");
Object.defineProperty(exports, "StorageRetryPolicyType", { enumerable: true, get: function () { return StorageRetryPolicyType_js_1.StorageRetryPolicyType; } });
/**
 * StorageRetryPolicyFactory is a factory class helping generating {@link StorageRetryPolicy} objects.
 */
class StorageRetryPolicyFactory {
    /**
     * Creates an instance of StorageRetryPolicyFactory.
     * @param retryOptions -
     */
    constructor(retryOptions) {
        this.retryOptions = retryOptions;
    }
    /**
     * Creates a StorageRetryPolicy object.
     *
     * @param nextPolicy -
     * @param options -
     */
    create(nextPolicy, options) {
        return new StorageRetryPolicy_js_1.StorageRetryPolicy(nextPolicy, options, this.retryOptions);
    }
}
exports.StorageRetryPolicyFactory = StorageRetryPolicyFactory;
//# sourceMappingURL=StorageRetryPolicyFactory.js.map