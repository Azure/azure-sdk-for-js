// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a role instance from a cloud service.
 *
 * @summary Deletes a role instance from a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudServiceRoleInstance_Delete.json
 */
async function deleteCloudServiceRoleInstance(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const roleInstanceName = "{roleInstance-name}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServiceRoleInstances.beginDeleteAndWait(
    roleInstanceName,
    resourceGroupName,
    cloudServiceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteCloudServiceRoleInstance();
}

main().catch(console.error);
