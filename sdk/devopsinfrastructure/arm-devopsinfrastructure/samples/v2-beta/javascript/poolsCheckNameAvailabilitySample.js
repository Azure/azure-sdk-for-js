// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevOpsInfrastructureClient } = require("@azure/arm-devopsinfrastructure");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the pool name is valid and is not already in use.
 *
 * @summary checks that the pool name is valid and is not already in use.
 * x-ms-original-file: 2026-07-03-preview/Pools_CheckNameAvailability.json
 */
async function poolsCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const result = await client.pools.checkNameAvailability({
    name: "mydevopspool",
    type: "Microsoft.DevOpsInfrastructure/pools",
  });
  console.log(result);
}

async function main() {
  await poolsCheckNameAvailability();
}

main().catch(console.error);
