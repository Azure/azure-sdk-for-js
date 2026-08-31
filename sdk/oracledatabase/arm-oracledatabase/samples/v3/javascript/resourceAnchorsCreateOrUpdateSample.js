// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a ResourceAnchor
 *
 * @summary create a ResourceAnchor
 * x-ms-original-file: 2025-11-01-preview/ResourceAnchors_CreateOrUpdate_MaximumSet_Gen.json
 */
async function resourceAnchorsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.resourceAnchors.createOrUpdate("rgopenapi", "resourceanchor1", {
    properties: {},
    tags: { key236: "wbucrnidikivbujndfk" },
    location: "at",
  });
  console.log(result);
}

async function main() {
  await resourceAnchorsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
