// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch API for managed network settings of a cognitive services account.
 *
 * @summary patch API for managed network settings of a cognitive services account.
 * x-ms-original-file: 2026-01-15-preview/ManagedNetwork/patchManagedNetworkV2.json
 */
async function patchManagedNetworkSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedNetworkSettings.patch(
    "test-rg",
    "cognitive-account-name",
    "default",
    {
      body: {
        properties: {
          managedNetwork: {
            firewallSku: "Standard",
            isolationMode: "AllowOnlyApprovedOutbound",
            outboundRules: {
              rule_name_1: {
                type: "FQDN",
                category: "UserDefined",
                destination: "destination_endpoint",
              },
            },
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchManagedNetworkSettings();
}

main().catch(console.error);
