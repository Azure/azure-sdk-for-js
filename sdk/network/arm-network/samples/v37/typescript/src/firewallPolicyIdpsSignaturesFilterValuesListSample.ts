// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the current filter values for the signatures overrides
 *
 * @summary retrieves the current filter values for the signatures overrides
 * x-ms-original-file: 2025-05-01/FirewallPolicyQuerySignatureOverridesFilterValues.json
 */
async function querySignatureOverrides(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyIdpsSignaturesFilterValues.list(
    "rg1",
    "firewallPolicy",
    { filterName: "severity" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await querySignatureOverrides();
}

main().catch(console.error);
