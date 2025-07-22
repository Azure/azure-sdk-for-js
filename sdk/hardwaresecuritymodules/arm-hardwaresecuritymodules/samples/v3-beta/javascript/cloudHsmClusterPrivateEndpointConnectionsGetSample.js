// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private endpoint connection for the Cloud Hsm Cluster.
 *
 * @summary gets the private endpoint connection for the Cloud Hsm Cluster.
 * x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_Get_MaximumSet_Gen.json
 */
async function cloudHsmClusterPrivateEndpointConnectionGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.cloudHsmClusterPrivateEndpointConnections.get(
    "rgcloudhsm",
    "chsm1",
    "sample-pec",
  );
  console.log(result);
}

async function main() {
  await cloudHsmClusterPrivateEndpointConnectionGetMaximumSetGen();
}

main().catch(console.error);
