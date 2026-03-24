// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an API Management gateway config connection. This is long running operation and could take several minutes to complete.
 *
 * @summary creates or updates an API Management gateway config connection. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateGatewayConfigConnection.json
 */
async function apiManagementCreateGatewayConfigConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGatewayConfigConnection.createOrUpdate(
    "rg1",
    "standard-gw-01",
    "gcc-01",
    {
      sourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/services/apim-service-1/workspaces/ws-001",
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateGatewayConfigConnection();
}

main().catch(console.error);
