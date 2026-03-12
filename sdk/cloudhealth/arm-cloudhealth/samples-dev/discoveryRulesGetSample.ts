// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a DiscoveryRule
 *
 * @summary get a DiscoveryRule
 * x-ms-original-file: 2025-05-01-preview/DiscoveryRules_Get.json
 */

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

async function discoveryRulesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.discoveryRules.get(
    "myResourceGroup",
    "myHealthModel",
    "myDiscoveryRule",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await discoveryRulesGet();
}

main().catch(console.error);
