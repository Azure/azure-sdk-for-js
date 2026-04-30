// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cloud provider regions available for creating Schema Registry clusters.
 *
 * @summary cloud provider regions available for creating Schema Registry clusters.
 * x-ms-original-file: 2025-08-18-preview/Organization_ListRegions_MaximumSet_Gen.json
 */
async function organizationListRegionsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.listRegions("rgconfluent", "bnu", {
    searchFilters: { key8083: "ft" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to cloud provider regions available for creating Schema Registry clusters.
 *
 * @summary cloud provider regions available for creating Schema Registry clusters.
 * x-ms-original-file: 2025-08-18-preview/Organization_ListRegions_MinimumSet_Gen.json
 */
async function organizationListRegionsMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.listRegions(
    "rgconfluent",
    "dvfvoveezvifybaptbuvprerr",
    {},
  );
  console.log(result);
}

async function main() {
  await organizationListRegionsMaximumSet();
  await organizationListRegionsMinimumSet();
}

main().catch(console.error);
