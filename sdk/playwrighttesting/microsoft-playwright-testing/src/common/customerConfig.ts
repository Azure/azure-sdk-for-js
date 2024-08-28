// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

class CustomerConfig {
  private static instance: CustomerConfig;
  public globalSetup?: string;
  public globalTeardown?: string;

  public static getInstance(): CustomerConfig {
    if (!CustomerConfig.instance) {
      CustomerConfig.instance = new CustomerConfig();
    }
    return CustomerConfig.instance;
  }
}

const customerConfig = CustomerConfig.getInstance();
export default customerConfig;
