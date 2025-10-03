// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Machine} from "@azure/arm-containerservice";
import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a machine in the specified agent pool.
 *
 * @summary Creates or updates a machine in the specified agent pool.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/MachineCreate_Update.json
 */
async function createOrUpdateMachine(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const agentPoolName = "agentpool1";
  const machineName = "machine1";
  const parameters: Machine = {
    properties: {
      hardware: { vmSize: "Standard_DS1_v2" },
      kubernetes: {
        kubeletDiskType: "OS",
        maxPods: 110,
        nodeLabels: { key1: "val1" },
        nodeTaints: ["Key1=Value1:NoSchedule"],
        orchestratorVersion: "1.30",
      },
      mode: "User",
      operatingSystem: { enableFips: false, osSKU: "Ubuntu", osType: "Linux" },
      priority: "Spot",
      tags: { name1: "val1" },
    },
    zones: ["1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.machines.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    agentPoolName,
    machineName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateMachine();
}

main().catch(console.error);
