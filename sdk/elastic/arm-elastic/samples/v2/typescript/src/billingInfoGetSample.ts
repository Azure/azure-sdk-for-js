// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve marketplace and organization billing information mapped to the given Elastic monitor resource.
 *
 * @summary retrieve marketplace and organization billing information mapped to the given Elastic monitor resource.
 * x-ms-original-file: 2025-06-01/BillingInfo_Get.json
 */
async function billingInfoGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.billingInfo.get("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await billingInfoGet();
}

main().catch(console.error);
