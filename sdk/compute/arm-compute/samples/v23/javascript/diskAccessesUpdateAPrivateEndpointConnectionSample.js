// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection.
 *
 * @summary Approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/DiskRP/stable/2025-01-02/examples/diskAccessExamples/DiskAccessPrivateEndpointConnection_Approve.json
 */
async function approveAPrivateEndpointConnectionUnderADiskAccessResource() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const diskAccessName = "myDiskAccess";
  const privateEndpointConnectionName = "myPrivateEndpointConnection";
  const privateEndpointConnection = {
    privateLinkServiceConnectionState: {
      description: "Approving myPrivateEndpointConnection",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.diskAccesses.beginUpdateAPrivateEndpointConnectionAndWait(
    resourceGroupName,
    diskAccessName,
    privateEndpointConnectionName,
    privateEndpointConnection,
  );
  console.log(result);
}

async function main() {
  await approveAPrivateEndpointConnectionUnderADiskAccessResource();
}

main().catch(console.error);
