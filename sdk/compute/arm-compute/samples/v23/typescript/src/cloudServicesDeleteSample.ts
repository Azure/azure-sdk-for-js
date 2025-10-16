// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a cloud service.
 *
 * @summary Deletes a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudService_Delete.json
 */
async function deleteCloudService(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServices.beginDeleteAndWait(
    resourceGroupName,
    cloudServiceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteCloudService();
}

main().catch(console.error);
