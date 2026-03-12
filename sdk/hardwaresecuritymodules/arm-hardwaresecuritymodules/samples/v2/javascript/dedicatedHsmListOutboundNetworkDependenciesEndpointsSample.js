// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified dedicated hsm resource. The operation returns properties of each egress endpoint.
 *
 * @summary gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified dedicated hsm resource. The operation returns properties of each egress endpoint.
 * x-ms-original-file: 2025-03-31/GetOutboundNetworkDependenciesEndpointsList.json
 */
async function listOutboundNetworkDependenciesEndpointsByManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHsm.listOutboundNetworkDependenciesEndpoints(
    "hsm-group",
    "hsm1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOutboundNetworkDependenciesEndpointsByManagedCluster();
}

main().catch(console.error);
