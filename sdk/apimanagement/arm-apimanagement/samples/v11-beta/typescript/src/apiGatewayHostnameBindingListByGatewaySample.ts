// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all API Management gateway hostname bindings within a gateway.
 *
 * @summary list all API Management gateway hostname bindings within a gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListGatewayHostnameBindings.json
 */
async function apiManagementListGatewayHostnameBindings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiGatewayHostnameBinding.listByGateway("rg1", "standard-gw-1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListGatewayHostnameBindings();
}

main().catch(console.error);
