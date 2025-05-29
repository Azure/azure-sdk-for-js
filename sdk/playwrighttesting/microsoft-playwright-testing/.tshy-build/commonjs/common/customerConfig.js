"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerConfig {
    static getInstance() {
        if (!CustomerConfig.instance) {
            CustomerConfig.instance = new CustomerConfig();
        }
        return CustomerConfig.instance;
    }
}
const customerConfig = CustomerConfig.getInstance();
exports.default = customerConfig;
//# sourceMappingURL=customerConfig.js.map