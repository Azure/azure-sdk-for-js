// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of an asynchronous NeuroShield operation.
 *
 * @summary gets the status of an asynchronous NeuroShield operation.
 * x-ms-original-file: 2026-10-01-preview/NeuroShieldOperationStatuses_Get.json
 */
async function neuroShieldOperationStatusesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShieldOperationStatuses.get(
    "eastus2",
    "00000000-0000-0000-0000-000000000001",
  );
  console.log(result);
}

async function main() {
  await neuroShieldOperationStatusesGet();
}

main().catch(console.error);
