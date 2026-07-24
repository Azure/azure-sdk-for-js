// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DiscoveryRule
 *
 * @summary get a DiscoveryRule
 * x-ms-original-file: 2026-05-01-preview/DiscoveryRules_Get.json
 */
async function discoveryRulesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.discoveryRules.get(
    "online-store-rg",
    "online-store",
    "discover-web-apps",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await discoveryRulesGet();
}

main().catch(console.error);
