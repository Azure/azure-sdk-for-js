// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the named value specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the named value specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadNamedValue.json
 */
async function apiManagementHeadNamedValue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.namedValue.getEntityTag("rg1", "apimService1", "testarmTemplateproperties2");
}

async function main() {
  await apiManagementHeadNamedValue();
}

main().catch(console.error);
