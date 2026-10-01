// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets troubleshooter instance result which includes the step status/result of the troubleshooter resource name that is being executed.<br/> Get API is used to retrieve the result of a Troubleshooter instance, which includes the status and result of each step in the Troubleshooter workflow. This API requires the Troubleshooter resource name that was created using the Create API.
 *
 * @summary gets troubleshooter instance result which includes the step status/result of the troubleshooter resource name that is being executed.<br/> Get API is used to retrieve the result of a Troubleshooter instance, which includes the status and result of each step in the Troubleshooter workflow. This API requires the Troubleshooter resource name that was created using the Create API.
 * x-ms-original-file: 2024-03-01-preview/Troubleshooter_Get.json
 */
async function troubleshootersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.troubleshooters.get(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "abf168ed-1b54-454a-86f6-e4b62253d3b1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await troubleshootersGet();
}

main().catch(console.error);
