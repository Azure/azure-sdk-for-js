// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureClient } from "@azure/arm-devopsinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Pool
 *
 * @summary get a Pool
 * x-ms-original-file: 2024-10-19/GetPool.json
 */
async function poolsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const result = await client.pools.get("rg", "pool");
  console.log(result);
}

async function main() {
  poolsGet();
}

main().catch(console.error);
