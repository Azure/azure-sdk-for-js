// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to called by Client (Portal, CLI, etc) to get a list of all external outbound dependencies (FQDNs) programmatically.
 *
 * @summary called by Client (Portal, CLI, etc) to get a list of all external outbound dependencies (FQDNs) programmatically.
 * x-ms-original-file: 2025-12-01/ExternalFQDN/get.json
 */
async function listOutboundNetworkDependenciesEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.listOutboundNetworkDependenciesEndpoints(
    "workspace-1234",
    "testworkspace",
  );
  console.log(result);
}

async function main() {
  await listOutboundNetworkDependenciesEndpoints();
}

main().catch(console.error);
