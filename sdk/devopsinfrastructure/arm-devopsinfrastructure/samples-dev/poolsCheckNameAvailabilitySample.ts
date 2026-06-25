// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureClient } from "@azure/arm-devopsinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that the pool name is valid and is not already in use.
 *
 * @summary checks that the pool name is valid and is not already in use.
 * x-ms-original-file: 2026-04-17-preview/Pools_CheckNameAvailability.json
 */
async function poolsCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const result = await client.pools.checkNameAvailability({
    name: "mydevopspool",
    type: "Microsoft.DevOpsInfrastructure/pools",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await poolsCheckNameAvailability();
}

main().catch(console.error);
