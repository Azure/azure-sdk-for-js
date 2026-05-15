// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the specified Security Partner Provider.
 *
 * @summary creates or updates the specified Security Partner Provider.
 * x-ms-original-file: 2025-05-01/SecurityPartnerProviderPut.json
 */
async function createSecurityPartnerProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityPartnerProviders.createOrUpdate(
    "rg1",
    "securityPartnerProvider",
    {
      location: "West US",
      securityProviderName: "ZScaler",
      virtualHub: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualHubs/hub1",
      },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main() {
  await createSecurityPartnerProvider();
}

main().catch(console.error);
