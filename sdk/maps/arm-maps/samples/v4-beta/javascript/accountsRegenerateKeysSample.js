// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerate either the primary or secondary key for use with the Maps APIs. The old key will stop working immediately.
 *
 * @summary regenerate either the primary or secondary key for use with the Maps APIs. The old key will stop working immediately.
 * x-ms-original-file: 2025-10-01-preview/RegenerateKey.json
 */
async function regenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.accounts.regenerateKeys("myResourceGroup", "myMapsAccount", {
    keyType: "primary",
  });
  console.log(result);
}

async function main() {
  await regenerateKey();
}

main().catch(console.error);
