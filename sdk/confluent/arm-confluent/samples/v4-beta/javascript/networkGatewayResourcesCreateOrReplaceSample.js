// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or replace a confluent network gateway
 *
 * @summary create or replace a confluent network gateway
 * x-ms-original-file: 2026-06-02-preview/NetworkGatewayResources_CreateOrReplace_MaximumSet_Gen.json
 */
async function networkGatewayResourcesCreateOrReplaceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.networkGatewayResources.createOrReplace(
    "rgconfluent",
    "myOrganization",
    "env-abc123",
    "gw-def456",
    {
      properties: {
        networkGatewayName: "my-network-gateway",
        region: "eastus",
        dictionary: [{ key: "gatewayType", value: "PrivateNetworkInterface" }],
      },
    },
  );
  console.log(result);
}

async function main() {
  await networkGatewayResourcesCreateOrReplaceMaximumSet();
}

main().catch(console.error);
