// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches trace collected by gateway.
 *
 * @summary fetches trace collected by gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGatewayListTrace.json
 */
async function apiManagementGatewayListTrace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.listTrace("rg1", "apimService1", "gw1", {
    traceId: "CrDvXXXXXXXXXXXXXVU3ZA2-1",
  });
  console.log(result);
}

async function main() {
  await apiManagementGatewayListTrace();
}

main().catch(console.error);
