// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get marketplace and organization info mapped to the given monitor.
 *
 * @summary get marketplace and organization info mapped to the given monitor.
 * x-ms-original-file: 2025-12-26-preview/BillingInfo_Get.json
 */
async function billingInfoGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.billingInfo.get("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await billingInfoGet();
}

main().catch(console.error);
