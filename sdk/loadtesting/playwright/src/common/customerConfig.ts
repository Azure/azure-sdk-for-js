// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { state } from "./state.js";

class CustomerConfig {
  public globalSetup?: string | string[];
  public globalTeardown?: string | string[];

  public static getInstance(): CustomerConfig {
    if (!state.customerConfig) {
      state.customerConfig = new CustomerConfig();
    }
    return state.customerConfig;
  }
}

const customerConfig = CustomerConfig.getInstance();
export default customerConfig;
