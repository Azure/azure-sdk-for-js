// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { VectorDbClient } = require("@azure/arm-pineconevectordb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a OrganizationResource
 *
 * @summary delete a OrganizationResource
 * x-ms-original-file: 2024-10-22-preview/Organizations_Delete_MaximumSet_Gen.json
 */
async function organizationsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "76a38ef6-c8c1-4f0d-bfe0-00ec782c8077";
  const client = new VectorDbClient(credential, subscriptionId);
  await client.organizations.delete("rgopenapi", "example-organization-name");
}

async function main() {
  await organizationsDeleteMaximumSet();
}

main().catch(console.error);
