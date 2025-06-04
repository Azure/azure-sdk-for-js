// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DiscoveryRule
 *
 * @summary create a DiscoveryRule
 * x-ms-original-file: 2025-05-01-preview/DiscoveryRules_CreateOrUpdate.json
 */
async function discoveryRulesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.discoveryRules.createOrUpdate(
    "myResourceGroup",
    "myHealthModel",
    "myDiscoveryRule",
    {
      properties: {
        entityName: "",
        authenticationSetting: "authSetting1",
        displayName: "myDisplayName",
        discoverRelationships: "Enabled",
        addRecommendedSignals: "Enabled",
        resourceGraphQuery:
          "resources | where subscriptionId == '7ddfffd7-9b32-40df-1234-828cbd55d6f4' | where resourceGroup == 'my-rg'",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await discoveryRulesCreateOrUpdate();
}

main().catch(console.error);
