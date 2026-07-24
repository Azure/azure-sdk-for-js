// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevOpsInfrastructureClient } = require("@azure/arm-devopsinfrastructure");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a synchronous resource action.
 *
 * @summary a synchronous resource action.
 * x-ms-original-file: 2026-07-03-preview/Pools_DeleteResources.json
 */
async function poolsDeleteResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  await client.pools.deleteResources("my-resource-group", "my-dev-ops-pool", {
    resourceIds: [
      "/subscriptions/a2e95d27-c161-4b61-bda4-11512c14c2c2/resourceGroups/my-resource-group/providers/Microsoft.DevOpsInfrastructure/pools/my-dev-ops-pool/resources/dd8cc705c_0",
      "/subscriptions/a2e95d27-c161-4b61-bda4-11512c14c2c2/resourceGroups/my-resource-group/providers/Microsoft.DevOpsInfrastructure/pools/my-dev-ops-pool/resources/dd8cc705c_1",
    ],
  });
}

async function main() {
  await poolsDeleteResources();
}

main().catch(console.error);
