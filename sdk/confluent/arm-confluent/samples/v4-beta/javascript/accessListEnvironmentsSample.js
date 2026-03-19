// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to environment list of an organization
 *
 * @summary environment list of an organization
 * x-ms-original-file: 2025-08-18-preview/Access_ListEnvironments_MaximumSet_Gen.json
 */
async function accessListEnvironmentsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listEnvironments("rgconfluent", "rnbjtcdqddweb", {
    searchFilters: { key8083: "ft" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to environment list of an organization
 *
 * @summary environment list of an organization
 * x-ms-original-file: 2025-08-18-preview/Access_ListEnvironments_MinimumSet_Gen.json
 */
async function accessListEnvironmentsMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listEnvironments("rgconfluent", "mv", {});
  console.log(result);
}

async function main() {
  await accessListEnvironmentsMaximumSet();
  await accessListEnvironmentsMinimumSet();
}

main().catch(console.error);
