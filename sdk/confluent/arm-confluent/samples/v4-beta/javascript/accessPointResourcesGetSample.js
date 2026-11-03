// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get confluent access point by Id
 *
 * @summary get confluent access point by Id
 * x-ms-original-file: 2026-06-02-preview/AccessPointResources_Get_MaximumSet_Gen.json
 */
async function accessPointResourcesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.accessPointResources.get(
    "rgconfluent",
    "myOrganization",
    "env-abc123",
    "gw-def456",
    "ap-xyz789",
  );
  console.log(result);
}

async function main() {
  await accessPointResourcesGetMaximumSet();
}

main().catch(console.error);
