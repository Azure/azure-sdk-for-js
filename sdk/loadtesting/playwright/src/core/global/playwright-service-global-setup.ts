// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { dirname } from "node:path";
import type { FullConfig } from "@playwright/test";
import playwrightServiceEntra from "../playwrightServiceEntra.js";
import { loadCustomerGlobalFunction } from "../../common/executor.js";
import customerConfig from "../../common/customerConfig.js";
import { PlaywrightServiceApiCall } from "../../utils/playwrightServiceApicall.js";
import { getTestRunConfig, getRunName } from "../../utils/utils.js";
import { CIInfoProvider } from "../../utils/cIInfoProvider.js";
import { InternalEnvironmentVariables } from "../../common/constants.js";

const playwrightServiceGlobalSetupWrapper = async (config: FullConfig): Promise<any> => {
  const rootDir = config.configFile ? dirname(config.configFile!) : process.cwd();
  let customerGlobalSetupFunc: any = null;
  if (customerConfig.globalSetup && typeof customerConfig.globalSetup === "string") {
    customerGlobalSetupFunc = await loadCustomerGlobalFunction(rootDir, customerConfig.globalSetup);
  }
  const playwrightServiceApiClient = new PlaywrightServiceApiCall();
  await playwrightServiceEntra.globalSetup();
  const ciConfigInfo = CIInfoProvider.getCIInfo();
  const TestRunCreatepayload = {
    displayName:
      process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] || getRunName(ciConfigInfo),
    config: getTestRunConfig(config),
    ciConfig: ciConfigInfo,
  };

  await playwrightServiceApiClient.patchTestRunAPI(TestRunCreatepayload);

  if (customerGlobalSetupFunc) {
    return customerGlobalSetupFunc(config);
  }
};

export default playwrightServiceGlobalSetupWrapper;
