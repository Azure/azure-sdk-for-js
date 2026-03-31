// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified NSP access rule by name.
 *
 * @summary gets the specified NSP access rule by name.
 * x-ms-original-file: 2025-05-01/NspAccessRuleGet.json
 */
async function nspAccessRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterAccessRules.get(
    "rg1",
    "nsp1",
    "profile1",
    "accessRule1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nspAccessRuleGet();
}

main().catch(console.error);
