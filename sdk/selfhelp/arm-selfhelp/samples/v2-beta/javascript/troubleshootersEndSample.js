// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HelpRP } = require("@azure/arm-selfhelp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to ends the troubleshooter action
 *
 * @summary ends the troubleshooter action
 * x-ms-original-file: 2024-03-01-preview/Troubleshooter_End.json
 */
async function troubleshootersEnd() {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  await client.troubleshooters.end(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "abf168ed-1b54-454a-86f6-e4b62253d3b1",
  );
}

async function main() {
  await troubleshootersEnd();
}

main().catch(console.error);
