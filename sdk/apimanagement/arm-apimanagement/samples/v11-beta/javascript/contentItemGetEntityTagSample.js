// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the entity state (ETag) version of the developer portal's content item specified by its identifier.
 *
 * @summary returns the entity state (ETag) version of the developer portal's content item specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadContentTypeContentItem.json
 */
async function apiManagementHeadContentTypeContentItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.contentItem.getEntityTag(
    "rg1",
    "apimService1",
    "page",
    "4e3cf6a5-574a-ba08-1f23-2e7a38faa6d8",
  );
}

async function main() {
  await apiManagementHeadContentTypeContentItem();
}

main().catch(console.error);
