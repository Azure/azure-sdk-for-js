// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the API operation policy specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the API operation policy specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadWorkspaceApiOperationPolicy.json
 */
async function apiManagementHeadWorkspaceApiOperationPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceApiOperationPolicy.getEntityTag(
    "rg1",
    "apimService1",
    "wks1",
    "5600b539c53f5b0062040001",
    "5600b53ac53f5b0062080006",
    "policy",
  );
}

async function main() {
  await apiManagementHeadWorkspaceApiOperationPolicy();
}

main().catch(console.error);
