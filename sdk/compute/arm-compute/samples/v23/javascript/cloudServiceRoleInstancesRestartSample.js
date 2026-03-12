// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The Reboot Role Instance asynchronous operation requests a reboot of a role instance in the cloud service.
 *
 * @summary The Reboot Role Instance asynchronous operation requests a reboot of a role instance in the cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2024-11-04/examples/CloudServiceRoleInstance_Restart.json
 */
async function restartCloudServiceRoleInstance() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const roleInstanceName = "{roleInstance-name}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.cloudServiceRoleInstances.beginRestartAndWait(
    roleInstanceName,
    resourceGroupName,
    cloudServiceName,
  );
  console.log(result);
}

async function main() {
  await restartCloudServiceRoleInstance();
}

main().catch(console.error);
