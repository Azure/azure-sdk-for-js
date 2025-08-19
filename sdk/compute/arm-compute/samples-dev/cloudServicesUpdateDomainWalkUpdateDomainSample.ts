// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the role instances in the specified update domain.
 *
 * @summary Updates the role instances in the specified update domain.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudServiceUpdateDomain_Update.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateCloudServiceToSpecifiedDomain(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const updateDomain = 1;
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result =
    await client.cloudServicesUpdateDomain.beginWalkUpdateDomainAndWait(
      resourceGroupName,
      cloudServiceName,
      updateDomain,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await updateCloudServiceToSpecifiedDomain();
}

main().catch(console.error);
