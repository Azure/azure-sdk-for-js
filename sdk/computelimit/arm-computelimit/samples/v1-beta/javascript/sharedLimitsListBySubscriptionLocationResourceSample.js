// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all compute limits shared by the host subscription with its guest subscriptions.
 *
 * @summary lists all compute limits shared by the host subscription with its guest subscriptions.
 * x-ms-original-file: 2025-08-15/SharedLimits_List.json
 */
async function listAllSharedLimitsForAScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sharedLimits.listBySubscriptionLocationResource("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllSharedLimitsForAScope();
}

main().catch(console.error);
