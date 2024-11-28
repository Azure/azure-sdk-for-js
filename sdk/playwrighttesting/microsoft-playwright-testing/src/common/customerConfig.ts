// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

class CustomerConfig {
  private static instance: CustomerConfig;
  public globalSetup?: string | string[];
  public globalTeardown?: string | string[];

  public static getInstance(): CustomerConfig {
    if (!CustomerConfig.instance) {
      CustomerConfig.instance = new CustomerConfig();
    }
    return CustomerConfig.instance;
  }
}

const customerConfig = CustomerConfig.getInstance();
export default customerConfig;
