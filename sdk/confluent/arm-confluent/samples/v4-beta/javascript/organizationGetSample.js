// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of a specific Organization resource.
 *
 * @summary get the properties of a specific Organization resource.
 * x-ms-original-file: 2025-08-18-preview/Organization_Get_MaximumSet_Gen.json
 */
async function organizationGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.get("rgconfluent", "nnyqgkogkmwjubhfaynme");
  console.log(result);
}

async function main() {
  await organizationGetMaximumSet();
}

main().catch(console.error);
