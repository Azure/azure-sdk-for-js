// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CompanionAPIClient } = require("@azure/arm-napsteromniagentapi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a OrganizationResource
 *
 * @summary delete a OrganizationResource
 * x-ms-original-file: 2025-12-24-preview/Organizations_Delete_MaximumSet_Gen.json
 */
async function organizationsDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0F0FBCF9-8374-47FC-B189-B79B84033EA3";
  const client = new CompanionAPIClient(credential, subscriptionId);
  await client.organizations.delete("rgopenapi", "contosoOrg");
}

async function main() {
  await organizationsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
