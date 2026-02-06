// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://docs.microsoft.com/azure/aks/private-clusters#aks-run-command-preview).
 *
 * @summary aKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://docs.microsoft.com/azure/aks/private-clusters#aks-run-command-preview).
 * x-ms-original-file: 2025-10-02-preview/RunCommandRequest.json
 */
async function submitNewCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.runCommand("rg1", "clustername1", {
    clusterToken: "",
    command: "kubectl apply -f ns.yaml",
    context: "",
  });
  console.log(result);
}

async function main() {
  await submitNewCommand();
}

main().catch(console.error);
