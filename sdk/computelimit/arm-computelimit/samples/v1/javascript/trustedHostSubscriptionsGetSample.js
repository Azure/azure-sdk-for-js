// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a host subscription that the guest subscription trusts.
 *
 * @summary gets a host subscription that the guest subscription trusts.
 * x-ms-original-file: 2026-07-31/TrustedHostSubscriptions_Get.json
 */
async function getATrustedHostSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.trustedHostSubscriptions.get(
    "eastus",
    "22222222-2222-2222-2222-222222222222",
  );
  console.log(result);
}

async function main() {
  await getATrustedHostSubscription();
}

main().catch(console.error);
