// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AtlasClient } = require("@azure/arm-mongodbatlas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a OrganizationResource
 *
 * @summary get a OrganizationResource
 * x-ms-original-file: 2025-06-01/Organizations_Get_MaximumSet_Gen.json
 */
async function organizationsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4AFC1287-D389-4265-B2D4-59B96A45CACC";
  const client = new AtlasClient(credential, subscriptionId);
  const result = await client.organizations.get("rgopenapi", "U.1-:7");
  console.log(result);
}

async function main() {
  await organizationsGetMaximumSet();
}

main().catch(console.error);
