// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a routing rule.
 *
 * @summary deletes a routing rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingRuleDelete.json
 */
async function deletesARoutingRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.routingRules.delete(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
    "testRuleCollection",
    "sampleRule",
    { force: false },
  );
}

async function main(): Promise<void> {
  await deletesARoutingRule();
}

main().catch(console.error);
