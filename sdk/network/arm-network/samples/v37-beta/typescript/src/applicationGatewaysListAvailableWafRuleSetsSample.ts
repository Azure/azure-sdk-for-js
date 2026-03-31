// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all available web application firewall rule sets.
 *
 * @summary lists all available web application firewall rule sets.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayAvailableWafRuleSetsGet.json
 */
async function getAvailableWafRuleSets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.listAvailableWafRuleSets();
  console.log(result);
}

async function main(): Promise<void> {
  await getAvailableWafRuleSets();
}

main().catch(console.error);
