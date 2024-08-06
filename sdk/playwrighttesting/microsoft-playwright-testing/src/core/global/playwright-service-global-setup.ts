// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { dirname } from "path";
import { FullConfig } from "../../common/types";
import playwrightServiceEntra from "../playwrightServiceEntra";
import { loadCustomerGlobalFunction } from "../../common/executor";
import customerConfig from "../../common/customerConfig";

const playwrightServiceGlobalSetupWrapper = async (config: FullConfig): Promise<any> => {
  const rootDir = config.configFile ? dirname(config.configFile!) : process.cwd();
  const customerGlobalSetupFunc = await loadCustomerGlobalFunction(
    rootDir,
    customerConfig.globalSetup,
  );

  await playwrightServiceEntra.globalSetup();
  if (customerGlobalSetupFunc) {
    return customerGlobalSetupFunc(config);
  }
};

export default playwrightServiceGlobalSetupWrapper;
