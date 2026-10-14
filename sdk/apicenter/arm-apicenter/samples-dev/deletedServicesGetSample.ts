// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of the soft-deleted service.
 *
 * @summary returns details of the soft-deleted service.
 * x-ms-original-file: 2024-06-01-preview/DeletedServices_Get.json
 */
async function deletedServicesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.deletedServices.get("contoso-resources", "contoso");
  console.log(result);
}

async function main(): Promise<void> {
  await deletedServicesGet();
}

main().catch(console.error);
