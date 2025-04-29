// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { VectorDbClient } = require("@azure/arm-pineconevectordb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a OrganizationResource
 *
 * @summary update a OrganizationResource
 * x-ms-original-file: 2024-10-22-preview/Organizations_Update_MaximumSet_Gen.json
 */
async function organizationsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "76a38ef6-c8c1-4f0d-bfe0-00ec782c8077";
  const client = new VectorDbClient(credential, subscriptionId);
  const result = await client.organizations.update("rgopenapi", "example-organization-name", {
    tags: { "new-tag": "new.tag.value" },
    identity: {
      type: "None",
      userAssignedIdentities: { ident573739201: {} },
    },
  });
  console.log(result);
}

async function main() {
  await organizationsUpdateMaximumSet();
}

main().catch(console.error);
