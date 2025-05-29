// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { dirname } from "node:path";
import playwrightServiceEntra from "../playwrightServiceEntra.js";
import { loadCustomerGlobalFunction } from "../../common/executor.js";
import customerConfig from "../../common/customerConfig.js";
const playwrightServiceGlobalTeardownWrapper = async (config) => {
    const rootDir = config.configFile ? dirname(config.configFile) : process.cwd();
    let customerGlobalTeardownFunc = null;
    if (customerConfig.globalTeardown && typeof customerConfig.globalTeardown === "string") {
        customerGlobalTeardownFunc = await loadCustomerGlobalFunction(rootDir, customerConfig.globalTeardown);
    }
    playwrightServiceEntra.globalTeardown();
    if (customerGlobalTeardownFunc) {
        await customerGlobalTeardownFunc(config);
    }
};
export default playwrightServiceGlobalTeardownWrapper;
//# sourceMappingURL=playwright-service-global-teardown.js.map