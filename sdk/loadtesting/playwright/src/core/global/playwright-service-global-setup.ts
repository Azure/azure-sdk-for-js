// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { dirname } from "node:path";
import type { FullConfig } from "@playwright/test";
import playwrightServiceEntra, { PlaywrightServiceEntra } from "../playwrightServiceEntra.js";
import { loadCustomerGlobalFunction } from "../../common/executor.js";
import customerConfig, { CustomerConfig } from "../../common/customerConfig.js";

const playwrightServiceGlobalSetupWrapper = async (config: FullConfig): Promise<any> => {
  const entraInstance: PlaywrightServiceEntra =
    config.metadata.azurePlaywright?.playwrightServiceEntra ?? playwrightServiceEntra;
  const customerConfigInstance: CustomerConfig =
    config.metadata.azurePlaywright?.customerConfig ?? customerConfig;

  const rootDir = config.configFile ? dirname(config.configFile!) : process.cwd();
  let customerGlobalSetupFunc: any = null;
  if (
    customerConfigInstance.globalSetup &&
    typeof customerConfigInstance.globalSetup === "string"
  ) {
    customerGlobalSetupFunc = await loadCustomerGlobalFunction(
      rootDir,
      customerConfigInstance.globalSetup,
    );
  }
  await entraInstance.globalSetup();
  if (customerGlobalSetupFunc) {
    return customerGlobalSetupFunc(config);
  }
};

export default playwrightServiceGlobalSetupWrapper;
