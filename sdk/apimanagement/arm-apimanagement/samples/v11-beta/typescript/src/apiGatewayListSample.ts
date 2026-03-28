// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all API Management gateways within a subscription.
 *
 * @summary list all API Management gateways within a subscription.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListGatewaysBySubscription.json
 */
async function apiManagementListGatewaysBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiGateway.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListGatewaysBySubscription();
}

main().catch(console.error);
