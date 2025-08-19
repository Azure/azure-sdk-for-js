// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ApiManagementServiceCheckNameAvailabilityParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Checks availability and correctness of a name for an API Management service.
 *
 * @summary Checks availability and correctness of a name for an API Management service.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementServiceCheckNameAvailability.json
 */
async function apiManagementServiceCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const parameters: ApiManagementServiceCheckNameAvailabilityParameters = {
    name: "apimService1",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result =
    await client.apiManagementService.checkNameAvailability(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementServiceCheckNameAvailability();
}

main().catch(console.error);
