// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { dirname } from "node:path";
import type { FullConfig } from "@playwright/test";
import playwrightServiceEntra, { PlaywrightServiceEntra } from "../playwrightServiceEntra.js";
import { loadCustomerGlobalFunction } from "../../common/executor.js";
import customerConfig, { CustomerConfig } from "../../common/customerConfig.js";

const playwrightServiceGlobalTeardownWrapper = async (config: FullConfig): Promise<void> => {
  const entraInstance: PlaywrightServiceEntra =
    config.metadata.azurePlaywright?.playwrightServiceEntra ?? playwrightServiceEntra;
  const customerConfigInstance: CustomerConfig =
    config.metadata.azurePlaywright?.customerConfig ?? customerConfig;

  const rootDir = config.configFile ? dirname(config.configFile!) : process.cwd();
  let customerGlobalTeardownFunc: any = null;
  if (
    customerConfigInstance.globalTeardown &&
    typeof customerConfigInstance.globalTeardown === "string"
  ) {
    customerGlobalTeardownFunc = await loadCustomerGlobalFunction(
      rootDir,
      customerConfigInstance.globalTeardown,
    );
  }

  entraInstance.globalTeardown();
  if (customerGlobalTeardownFunc) {
    await customerGlobalTeardownFunc(config);
  }
};

export default playwrightServiceGlobalTeardownWrapper;
