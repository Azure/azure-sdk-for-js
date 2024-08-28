// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { dirname } from "path";
import { FullConfig } from "../../common/types";
import playwrightServiceEntra from "../playwrightServiceEntra";
import { loadCustomerGlobalFunction } from "../../common/executor";
import customerConfig from "../../common/customerConfig";

const playwrightServiceGlobalTeardownWrapper = async (config: FullConfig): Promise<void> => {
  const rootDir = config.configFile ? dirname(config.configFile!) : process.cwd();
  const customerGlobalTeardownFunc = await loadCustomerGlobalFunction(
    rootDir,
    customerConfig.globalTeardown,
  );

  playwrightServiceEntra.globalTeardown();
  if (customerGlobalTeardownFunc) {
    await customerGlobalTeardownFunc(config);
  }
};

export default playwrightServiceGlobalTeardownWrapper;
