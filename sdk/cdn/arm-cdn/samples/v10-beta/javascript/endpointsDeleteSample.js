// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 *
 * @summary deletes an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 * x-ms-original-file: 2025-12-01/Endpoints_Delete.json
 */
async function endpointsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.endpoints.delete("RG", "profile1", "endpoint1");
}

async function main() {
  await endpointsDelete();
}

main().catch(console.error);
