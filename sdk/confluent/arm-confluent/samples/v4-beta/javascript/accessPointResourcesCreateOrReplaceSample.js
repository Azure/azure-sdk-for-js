// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or replace a confluent access point
 *
 * @summary create or replace a confluent access point
 * x-ms-original-file: 2026-06-02-preview/AccessPointResources_CreateOrReplace_MaximumSet_Gen.json
 */
async function accessPointResourcesCreateOrReplaceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.accessPointResources.createOrReplace(
    "rgconfluent",
    "myOrganization",
    "env-abc123",
    "gw-def456",
    "ap-xyz789",
    {
      properties: {
        accessPointName: "my-access-point",
        region: "eastus",
        vnetInjection: {
          virtualNetworkResourceId:
            "/subscriptions/DC34558A-05D3-4370-AED8-75E60B381F94/resourceGroups/rgconfluent/providers/Microsoft.Network/virtualNetworks/myVnet",
          subnetResourceId:
            "/subscriptions/DC34558A-05D3-4370-AED8-75E60B381F94/resourceGroups/rgconfluent/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
        },
        egressRoutes: ["10.0.0.0/8", "172.16.0.0/12"],
        dictionary: [{ key: "accessPointType", value: "EgressPrivateLink" }],
      },
    },
  );
  console.log(result);
}

async function main() {
  await accessPointResourcesCreateOrReplaceMaximumSet();
}

main().catch(console.error);
