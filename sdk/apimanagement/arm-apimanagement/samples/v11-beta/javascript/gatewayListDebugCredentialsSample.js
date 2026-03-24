// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create new debug credentials for gateway.
 *
 * @summary create new debug credentials for gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGatewayListDebugCredentials.json
 */
async function apiManagementGatewayListDebugCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.listDebugCredentials("rg1", "apimService1", "gw1", {
    apiId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/apis/a1",
    credentialsExpireAfter: "PT1H",
    purposes: ["tracing"],
  });
  console.log(result);
}

async function main() {
  await apiManagementGatewayListDebugCredentials();
}

main().catch(console.error);
