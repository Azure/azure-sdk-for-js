// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Organization resource
 *
 * @summary delete Organization resource
 * x-ms-original-file: 2025-08-18-preview/Organization_Delete_MaximumSet_Gen.json
 */
async function organizationDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.organization.delete("rgconfluent", "zqp");
}

/**
 * This sample demonstrates how to delete Organization resource
 *
 * @summary delete Organization resource
 * x-ms-original-file: 2025-08-18-preview/Organization_Delete_MinimumSet_Gen.json
 */
async function organizationDeleteMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.organization.delete("rgconfluent", "w");
}

async function main() {
  await organizationDeleteMaximumSet();
  await organizationDeleteMinimumSet();
}

main().catch(console.error);
