// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgriculturePlatformClient } from "@azure/arm-agricultureplatform";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a AgriServiceResource
 *
 * @summary create a AgriServiceResource
 * x-ms-original-file: 2024-06-01-preview/AgriService_CreateOrUpdate_MaximumSet_Gen.json
 */
async function agriServiceCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "83D293F5-DEFD-4D48-B120-1DC713BE338A";
  const client = new AgriculturePlatformClient(credential, subscriptionId);
  const result = await client.agriService.createOrUpdate("rgopenapi", "abc123", {
    properties: {
      config: {},
      managedOnBehalfOfConfiguration: {},
      dataConnectorCredentials: [
        {
          key: "BackendAADApplicationCredentials",
          value: { clientId: "dce298a8-1eec-481a-a8f9-a3cd5a8257b2" },
        },
      ],
      installedSolutions: [
        {
          key: "bayerAgPowered.cwum",
          value: { applicationName: "bayerAgPowered.cwum" },
        },
      ],
    },
    identity: { type: "None", userAssignedIdentities: { key4955: {} } },
    sku: {
      name: "kfl",
      tier: "Free",
      size: "r",
      family: "xerdhxyjwrypvxphavgrtjphtohf",
      capacity: 20,
    },
    tags: { key137: "oxwansfetzzgdwl" },
    location: "pkneuknooprpqirnugzwbkiie",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await agriServiceCreateOrUpdate();
}

main().catch(console.error);
