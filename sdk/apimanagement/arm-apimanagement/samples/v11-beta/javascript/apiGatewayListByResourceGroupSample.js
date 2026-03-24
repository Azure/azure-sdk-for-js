// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all API Management gateways within a resource group.
 *
 * @summary list all API Management gateways within a resource group.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListGatewaysBySubscriptionAndResourceGroup.json
 */
async function apiManagementListGatewaysBySubscriptionAndResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiGateway.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListGatewaysBySubscriptionAndResourceGroup();
}

main().catch(console.error);
