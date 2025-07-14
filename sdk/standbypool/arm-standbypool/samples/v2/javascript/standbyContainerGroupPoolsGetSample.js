// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StandbyPoolManagementClient } = require("@azure/arm-standbypool");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a StandbyContainerGroupPoolResource
 *
 * @summary get a StandbyContainerGroupPoolResource
 * x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_Get.json
 */
async function standbyContainerGroupPoolsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const result = await client.standbyContainerGroupPools.get("rgstandbypool", "pool");
  console.log(result);
}

async function main() {
  await standbyContainerGroupPoolsGet();
}

main().catch(console.error);
