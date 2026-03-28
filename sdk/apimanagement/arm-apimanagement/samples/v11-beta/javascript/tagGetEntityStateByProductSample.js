// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state version of the tag specified by its identifier.
 *
 * @summary gets the entity state version of the tag specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadProductTag.json
 */
async function apiManagementHeadProductTag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.tag.getEntityStateByProduct(
    "rg1",
    "apimService1",
    "59306a29e4bbd510dc24e5f8",
    "59306a29e4bbd510dc24e5f9",
  );
}

async function main() {
  await apiManagementHeadProductTag();
}

main().catch(console.error);
