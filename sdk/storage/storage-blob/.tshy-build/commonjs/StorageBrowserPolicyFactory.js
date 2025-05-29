"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageBrowserPolicyFactory = exports.StorageBrowserPolicy = void 0;
const StorageBrowserPolicy_js_1 = require("./policies/StorageBrowserPolicy.js");
Object.defineProperty(exports, "StorageBrowserPolicy", { enumerable: true, get: function () { return StorageBrowserPolicy_js_1.StorageBrowserPolicy; } });
/**
 * StorageBrowserPolicyFactory is a factory class helping generating StorageBrowserPolicy objects.
 */
class StorageBrowserPolicyFactory {
    /**
     * Creates a StorageBrowserPolicyFactory object.
     *
     * @param nextPolicy -
     * @param options -
     */
    create(nextPolicy, options) {
        return new StorageBrowserPolicy_js_1.StorageBrowserPolicy(nextPolicy, options);
    }
}
exports.StorageBrowserPolicyFactory = StorageBrowserPolicyFactory;
//# sourceMappingURL=StorageBrowserPolicyFactory.js.map