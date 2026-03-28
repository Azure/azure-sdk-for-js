// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the details of the Api VersionSet specified by its identifier.
 *
 * @summary updates the details of the Api VersionSet specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateApiVersionSet.json
 */
async function apiManagementUpdateApiVersionSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiVersionSet.update("rg1", "apimService1", "vs1", "*", {
    description: "Version configuration",
    displayName: "api set 1",
    versioningScheme: "Segment",
  });
  console.log(result);
}

async function main() {
  await apiManagementUpdateApiVersionSet();
}

main().catch(console.error);
