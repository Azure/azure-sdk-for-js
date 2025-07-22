// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the private endpoint connection for the Cloud Hsm Cluster.
 *
 * @summary deletes the private endpoint connection for the Cloud Hsm Cluster.
 * x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_Delete_MaximumSet_Gen.json
 */
async function cloudHsmClusterPrivateEndpointConnectionDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  await client.cloudHsmClusterPrivateEndpointConnections.delete(
    "rgcloudhsm",
    "chsm1",
    "sample-pec",
  );
}

async function main() {
  await cloudHsmClusterPrivateEndpointConnectionDeleteMaximumSetGen();
}

main().catch(console.error);
