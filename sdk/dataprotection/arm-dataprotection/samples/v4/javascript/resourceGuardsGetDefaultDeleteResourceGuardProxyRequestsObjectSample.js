// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @summary returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 * x-ms-original-file: 2025-07-01/ResourceGuardCRUD/GetDefaultDeleteResourceGuardProxyRequests.json
 */
async function getDefaultOperationsRequestObject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.resourceGuards.getDefaultDeleteResourceGuardProxyRequestsObject(
    "SampleResourceGroup",
    "swaggerExample",
    "default",
  );
  console.log(result);
}

async function main() {
  await getDefaultOperationsRequestObject();
}

main().catch(console.error);
