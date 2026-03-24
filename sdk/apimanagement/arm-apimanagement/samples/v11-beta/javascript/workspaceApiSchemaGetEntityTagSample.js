// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the schema specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the schema specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadWorkspaceApiSchema.json
 */
async function apiManagementHeadWorkspaceApiSchema() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceApiSchema.getEntityTag(
    "rg1",
    "apimService1",
    "wks1",
    "57d1f7558aa04f15146d9d8a",
    "ec12520d-9d48-4e7b-8f39-698ca2ac63f1",
  );
}

async function main() {
  await apiManagementHeadWorkspaceApiSchema();
}

main().catch(console.error);
