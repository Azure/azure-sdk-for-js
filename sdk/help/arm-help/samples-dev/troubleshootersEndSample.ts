// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpClient } from "@azure/arm-help";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to ends the troubleshooter action
 *
 * @summary ends the troubleshooter action
 * x-ms-original-file: 2024-03-01-preview/Troubleshooter_End.json
 */
async function troubleshootersEnd(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HelpClient(credential, subscriptionId);
  await client.troubleshooters.end(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "abf168ed-1b54-454a-86f6-e4b62253d3b1",
  );
}

async function main(): Promise<void> {
  await troubleshootersEnd();
}

main().catch(console.error);
