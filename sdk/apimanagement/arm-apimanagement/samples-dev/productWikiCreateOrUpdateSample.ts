// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WikiContract, ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new Wiki for a Product or updates an existing one.
 *
 * @summary Creates a new Wiki for a Product or updates an existing one.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateProductWiki.json
 */
async function apiManagementCreateProductWiki(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const productId = "57d1f7558aa04f15146d9d8a";
  const parameters: WikiContract = {
    documents: [{ documentationId: "docId1" }, { documentationId: "docId2" }],
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.productWiki.createOrUpdate(
    resourceGroupName,
    serviceName,
    productId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateProductWiki();
}

main().catch(console.error);
