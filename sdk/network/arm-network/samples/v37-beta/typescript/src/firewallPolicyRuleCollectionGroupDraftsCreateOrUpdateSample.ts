// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update Rule Collection Group Draft.
 *
 * @summary create or Update Rule Collection Group Draft.
 * x-ms-original-file: 2025-05-01/FirewallPolicyRuleCollectionGroupDraftPut.json
 */
async function createOrUpdateRuleCollectionGroupDraft(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyRuleCollectionGroupDrafts.createOrUpdate(
    "rg1",
    "firewallPolicy",
    "ruleCollectionGroup1",
    {
      priority: 100,
      ruleCollections: [
        {
          name: "Example-Filter-Rule-Collection",
          action: { type: "Deny" },
          priority: 100,
          ruleCollectionType: "FirewallPolicyFilterRuleCollection",
          rules: [
            {
              name: "network-rule1",
              destinationAddresses: ["*"],
              destinationPorts: ["*"],
              ipProtocols: ["TCP"],
              ruleType: "NetworkRule",
              sourceAddresses: ["10.1.25.0/24"],
            },
          ],
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRuleCollectionGroupDraft();
}

main().catch(console.error);
