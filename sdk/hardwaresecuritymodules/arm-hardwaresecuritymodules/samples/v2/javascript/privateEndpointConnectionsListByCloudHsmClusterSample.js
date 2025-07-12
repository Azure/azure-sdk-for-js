// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the List operation gets information about the private endpoint connections associated with the Cloud HSM Cluster
 *
 * @summary the List operation gets information about the private endpoint connections associated with the Cloud HSM Cluster
 * x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_ListByCloudHsmCluster_MaximumSet_Gen.json
 */
async function cloudHsmClusterPrivateEndpointConnectionListByResourceMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByCloudHsmCluster(
    "rgcloudhsm",
    "chsm1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cloudHsmClusterPrivateEndpointConnectionListByResourceMaximumSetGen();
}

main().catch(console.error);
