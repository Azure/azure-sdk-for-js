// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a DiscoveryRule
 *
 * @summary create a DiscoveryRule
 * x-ms-original-file: 2026-05-01-preview/DiscoveryRules_CreateOrUpdate.json
 */
async function discoveryRulesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.discoveryRules.createOrUpdate(
    "online-store-rg",
    "online-store",
    "discover-web-apps",
    {
      properties: {
        authenticationSetting: "default-auth",
        displayName: "Discover web apps",
        discoverRelationships: "Enabled",
        addRecommendedSignals: "Enabled",
        specification: {
          kind: "ResourceGraphQuery",
          resourceGraphQuery:
            "resources | where type =~ 'microsoft.web/sites' and resourceGroup =~ 'online-store-rg' | project id, name, location",
        },
        addResourceHealthSignal: "Enabled",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await discoveryRulesCreateOrUpdate();
}

main().catch(console.error);
