// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RoleInstances,
  CloudServicesRebuildOptionalParams,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Rebuild Role Instances reinstalls the operating system on instances of web roles or worker roles and initializes the storage resources that are used by them. If you do not want to initialize storage resources, you can use Reimage Role Instances.
 *
 * @summary Rebuild Role Instances reinstalls the operating system on instances of web roles or worker roles and initializes the storage resources that are used by them. If you do not want to initialize storage resources, you can use Reimage Role Instances.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudServiceRoleInstance_Rebuild_ByCloudService.json
 */
async function rebuildCloudServiceRoleInstancesInACloudService(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const parameters: RoleInstances = {
    roleInstances: ["ContosoFrontend_IN_0", "ContosoBackend_IN_1"],
  };
  const options: CloudServicesRebuildOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServices.beginRebuildAndWait(
    resourceGroupName,
    cloudServiceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await rebuildCloudServiceRoleInstancesInACloudService();
}

main().catch(console.error);
