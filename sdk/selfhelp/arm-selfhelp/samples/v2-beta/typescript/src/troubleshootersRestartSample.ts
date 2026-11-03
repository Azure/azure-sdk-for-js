// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts the troubleshooter API using applicable troubleshooter resource name as the input.<br/> It returns new resource name which should be used in subsequent request. The old resource name is obsolete after this API is invoked.
 *
 * @summary restarts the troubleshooter API using applicable troubleshooter resource name as the input.<br/> It returns new resource name which should be used in subsequent request. The old resource name is obsolete after this API is invoked.
 * x-ms-original-file: 2024-03-01-preview/Troubleshooter_Restart.json
 */
async function troubleshootersRestart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.troubleshooters.restart(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "abf168ed-1b54-454a-86f6-e4b62253d3b1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await troubleshootersRestart();
}

main().catch(console.error);
