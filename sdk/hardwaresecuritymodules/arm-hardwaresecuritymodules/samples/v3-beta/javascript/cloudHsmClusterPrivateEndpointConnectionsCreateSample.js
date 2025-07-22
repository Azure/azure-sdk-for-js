// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the private endpoint connection for the Cloud Hsm Cluster.
 *
 * @summary creates or updates the private endpoint connection for the Cloud Hsm Cluster.
 * x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_Create_MaximumSet_Gen.json
 */
async function cloudHsmClusterPrivateEndpointConnectionCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.cloudHsmClusterPrivateEndpointConnections.create(
    "rgcloudhsm",
    "chsm1",
    "sample-pec",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "My name is Joe and I'm approving this.",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await cloudHsmClusterPrivateEndpointConnectionCreateMaximumSetGen();
}

main().catch(console.error);
