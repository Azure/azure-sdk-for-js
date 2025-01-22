// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { dirname } from "path";
import type { FullConfig } from "@playwright/test";
import playwrightServiceEntra from "../playwrightServiceEntra";
import { loadCustomerGlobalFunction } from "../../common/executor";
import customerConfig from "../../common/customerConfig";

const playwrightServiceGlobalSetupWrapper = async (config: FullConfig): Promise<any> => {
  const rootDir = config.configFile ? dirname(config.configFile!) : process.cwd();
  let customerGlobalSetupFunc: any = null;
  if (customerConfig.globalSetup && typeof customerConfig.globalSetup === "string") {
    customerGlobalSetupFunc = await loadCustomerGlobalFunction(rootDir, customerConfig.globalSetup);
  }

  await playwrightServiceEntra.globalSetup();
  if (customerGlobalSetupFunc) {
    return customerGlobalSetupFunc(config);
  }
};

export default playwrightServiceGlobalSetupWrapper;
