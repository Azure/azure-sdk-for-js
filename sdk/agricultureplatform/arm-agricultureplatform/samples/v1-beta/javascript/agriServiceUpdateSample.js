// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgriculturePlatformClient } = require("@azure/arm-agricultureplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a AgriServiceResource
 *
 * @summary update a AgriServiceResource
 * x-ms-original-file: 2024-06-01-preview/AgriService_Update_MaximumSet_Gen.json
 */
async function agriServiceUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "83D293F5-DEFD-4D48-B120-1DC713BE338A";
  const client = new AgriculturePlatformClient(credential, subscriptionId);
  const result = await client.agriService.update("rgopenapi", "abc123", {
    identity: { type: "None", userAssignedIdentities: { key4771: {} } },
    sku: {
      name: "tbdtdfffkar",
      tier: "Free",
      size: "iusaqqj",
      family: "hxojswlgs",
      capacity: 22,
    },
    tags: { key9006: "kuzlwpujbql" },
    properties: {
      config: {},
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
  });
  console.log(result);
}

async function main() {
  await agriServiceUpdate();
}

main().catch(console.error);
