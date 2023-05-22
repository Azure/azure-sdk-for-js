// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest, getEnvVar } from "@azure/test-utils-perf";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class NetworkTest<TOptions> extends PerfTest<TOptions> {
  client: NetworkManagementClient

  constructor() {
    super();
    const credential = new DefaultAzureCredential();
    this.client = new NetworkManagementClient(credential, getEnvVar("AZURE_SUBSCRIPTION_ID"));
  }
}
