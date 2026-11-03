// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CompanionAPIClient } = require("@azure/arm-napsteromniagentapi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a OrganizationResource
 *
 * @summary update a OrganizationResource
 * x-ms-original-file: 2025-12-24-preview/Organizations_Update_MaximumSet_Gen.json
 */
async function organizationsUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0F0FBCF9-8374-47FC-B189-B79B84033EA3";
  const client = new CompanionAPIClient(credential, subscriptionId);
  const result = await client.organizations.update("rgopenapi", "contosoOrg", {
    tags: {},
    identity: { type: "None", userAssignedIdentities: {} },
  });
  console.log(result);
}

async function main() {
  await organizationsUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
