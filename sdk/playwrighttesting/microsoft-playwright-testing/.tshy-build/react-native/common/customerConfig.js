// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
class CustomerConfig {
    static getInstance() {
        if (!CustomerConfig.instance) {
            CustomerConfig.instance = new CustomerConfig();
        }
        return CustomerConfig.instance;
    }
}
const customerConfig = CustomerConfig.getInstance();
export default customerConfig;
//# sourceMappingURL=customerConfig.js.map