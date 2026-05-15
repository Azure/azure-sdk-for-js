// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a network access rule.
 *
 * @summary creates or updates a network access rule.
 * x-ms-original-file: 2025-05-01/NspAccessRulePut.json
 */
async function nspAccessRulePut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterAccessRules.createOrUpdate(
    "rg1",
    "nsp1",
    "profile1",
    "accessRule1",
    { addressPrefixes: ["10.11.0.0/16", "10.10.1.0/24"], direction: "Inbound" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspAccessRulePut();
}

main().catch(console.error);
