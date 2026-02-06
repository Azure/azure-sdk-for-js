// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a machine in the specified agent pool.
 *
 * @summary creates or updates a machine in the specified agent pool.
 * x-ms-original-file: 2025-10-02-preview/MachineCreate_Update.json
 */
async function createOrUpdateMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.machines.createOrUpdate(
    "rg1",
    "clustername1",
    "agentpool1",
    "machine1",
    {
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
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateMachine();
}

main().catch(console.error);
