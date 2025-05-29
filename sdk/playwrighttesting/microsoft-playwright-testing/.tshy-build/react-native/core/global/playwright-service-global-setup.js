// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { dirname } from "node:path";
import playwrightServiceEntra from "../playwrightServiceEntra.js";
import { loadCustomerGlobalFunction } from "../../common/executor.js";
import customerConfig from "../../common/customerConfig.js";
const playwrightServiceGlobalSetupWrapper = async (config) => {
    const rootDir = config.configFile ? dirname(config.configFile) : process.cwd();
    let customerGlobalSetupFunc = null;
    if (customerConfig.globalSetup && typeof customerConfig.globalSetup === "string") {
        customerGlobalSetupFunc = await loadCustomerGlobalFunction(rootDir, customerConfig.globalSetup);
    }
    await playwrightServiceEntra.globalSetup();
    if (customerGlobalSetupFunc) {
        return customerGlobalSetupFunc(config);
    }
};
export default playwrightServiceGlobalSetupWrapper;
//# sourceMappingURL=playwright-service-global-setup.js.map