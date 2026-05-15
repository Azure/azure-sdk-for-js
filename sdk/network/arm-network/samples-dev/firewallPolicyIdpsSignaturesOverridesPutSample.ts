// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to will override/create a new signature overrides for the policy's IDPS
 *
 * @summary will override/create a new signature overrides for the policy's IDPS
 * x-ms-original-file: 2025-05-01/FirewallPolicySignatureOverridesPut.json
 */
async function putSignatureOverrides(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e747cc13-97d4-4a79-b463-42d7f4e558f2";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyIdpsSignaturesOverrides.put("rg1", "firewallPolicy", {
    type: "Microsoft.Network/firewallPolicies/signatureOverrides",
    id: "/subscriptions/e747cc13-97d4-4a79-b463-42d7f4e558f2/resourceGroups/rg1/providers/Microsoft.Network/firewallPolicies/firewallPolicy/signatureOverrides/default",
    properties: { signatures: { "2000105": "Off", "2000106": "Deny" } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putSignatureOverrides();
}

main().catch(console.error);
