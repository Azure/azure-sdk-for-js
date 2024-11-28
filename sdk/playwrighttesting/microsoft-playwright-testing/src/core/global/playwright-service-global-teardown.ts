// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { dirname } from "path";
import type { FullConfig } from "../../common/types";
import playwrightServiceEntra from "../playwrightServiceEntra";
import { loadCustomerGlobalFunction } from "../../common/executor";
import customerConfig from "../../common/customerConfig";

const playwrightServiceGlobalTeardownWrapper = async (config: FullConfig): Promise<void> => {
  const rootDir = config.configFile ? dirname(config.configFile!) : process.cwd();
  let customerGlobalTeardownFunc: any = null;
  if (customerConfig.globalTeardown && typeof customerConfig.globalTeardown === "string") {
    customerGlobalTeardownFunc = await loadCustomerGlobalFunction(
      rootDir,
      customerConfig.globalTeardown,
    );
  }

  playwrightServiceEntra.globalTeardown();
  if (customerGlobalTeardownFunc) {
    await customerGlobalTeardownFunc(config);
  }
};

export default playwrightServiceGlobalTeardownWrapper;
