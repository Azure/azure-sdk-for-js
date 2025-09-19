// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the private link resources possible under disk access resource
 *
 * @summary Gets the private link resources possible under disk access resource
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskAccessExamples/DiskAccessPrivateLinkResources_Get.json
 */
async function listAllPossiblePrivateLinkResourcesUnderDiskAccessResource() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskAccessName = "myDiskAccess";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.diskAccesses.getPrivateLinkResources(
    resourceGroupName,
    diskAccessName,
  );
  console.log(result);
}

async function main() {
  await listAllPossiblePrivateLinkResourcesUnderDiskAccessResource();
}

main().catch(console.error);
