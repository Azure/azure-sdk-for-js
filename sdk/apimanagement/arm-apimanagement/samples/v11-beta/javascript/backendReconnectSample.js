// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to notifies the API Management gateway to create a new connection to the backend after the specified timeout. If no timeout was specified, timeout of 2 minutes is used.
 *
 * @summary notifies the API Management gateway to create a new connection to the backend after the specified timeout. If no timeout was specified, timeout of 2 minutes is used.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementBackendReconnect.json
 */
async function apiManagementBackendReconnect() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.backend.reconnect("rg1", "apimService1", "proxybackend", {
    parameters: { after: "PT3S" },
  });
}

async function main() {
  await apiManagementBackendReconnect();
}

main().catch(console.error);
