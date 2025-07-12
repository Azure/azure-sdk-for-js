// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { dirname } from "node:path";
import type { FullConfig } from "@playwright/test";
import playwrightServiceEntra from "../playwrightServiceEntra.js";
import { loadCustomerGlobalFunction } from "../../common/executor.js";
import customerConfig from "../../common/customerConfig.js";
import { PlaywrightServiceConfig } from "../../common/playwrightServiceConfig.js";
import { initializePlaywrightServiceTestRun } from "../initializePlaywrightServiceTestRun.js";

const playwrightServiceGlobalSetupWrapper = async (config: FullConfig): Promise<any> => {
  const rootDir = config.configFile ? dirname(config.configFile!) : process.cwd();
  let customerGlobalSetupFunc: any = null;
  if (customerConfig.globalSetup && typeof customerConfig.globalSetup === "string") {
    customerGlobalSetupFunc = await loadCustomerGlobalFunction(rootDir, customerConfig.globalSetup);
  }
  const serviceAuthType = PlaywrightServiceConfig.instance.serviceAuthType;
  if (serviceAuthType === "ENTRA_ID") {
    await playwrightServiceEntra.globalSetup();
  }
  await initializePlaywrightServiceTestRun(config);
  if (customerGlobalSetupFunc) {
    return customerGlobalSetupFunc(config);
  }
};

export default playwrightServiceGlobalSetupWrapper;
