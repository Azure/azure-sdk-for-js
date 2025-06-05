// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { VectorDbClient } = require("@azure/arm-pineconevectordb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a OrganizationResource
 *
 * @summary get a OrganizationResource
 * x-ms-original-file: 2024-10-22-preview/Organizations_Get_MaximumSet_Gen.json
 */
async function organizationsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "76a38ef6-c8c1-4f0d-bfe0-00ec782c8077";
  const client = new VectorDbClient(credential, subscriptionId);
  const result = await client.organizations.get("rgopenapi", "example-organization-name");
  console.log(result);
}

async function main() {
  await organizationsGetMaximumSet();
}

main().catch(console.error);
