// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of machines in the specified agent pool.
 *
 * @summary Gets a list of machines in the specified agent pool.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/MachineList.json
 */
async function listMachinesInAnAgentpoolByManagedCluster() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const agentPoolName = "agentpool1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.machines.list(resourceGroupName, resourceName, agentPoolName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listMachinesInAnAgentpoolByManagedCluster();
}

main().catch(console.error);
