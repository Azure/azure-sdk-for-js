// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get confluent network gateway by Id
 *
 * @summary get confluent network gateway by Id
 * x-ms-original-file: 2026-06-02-preview/NetworkGatewayResources_Get_MaximumSet_Gen.json
 */
async function networkGatewayResourcesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.networkGatewayResources.get(
    "rgconfluent",
    "myOrganization",
    "env-abc123",
    "gw-def456",
  );
  console.log(result);
}

async function main() {
  await networkGatewayResourcesGetMaximumSet();
}

main().catch(console.error);
