// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a DiscoveryRule
 *
 * @summary delete a DiscoveryRule
 * x-ms-original-file: 2025-05-01-preview/DiscoveryRules_Delete.json
 */

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

async function discoveryRulesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.discoveryRules.delete("my-resource-group", "my-health-model", "my-discovery-rule");
}

async function main(): Promise<void> {
  await discoveryRulesDelete();
}

main().catch(console.error);
