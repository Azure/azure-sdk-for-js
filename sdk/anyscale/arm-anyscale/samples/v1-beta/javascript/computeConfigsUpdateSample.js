// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a compute config.
 *
 * @summary updates a compute config.
 * x-ms-original-file: 2026-09-01/ComputeConfigs_Update.json
 */
async function computeConfigsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.computeConfigs.update(
    "rganyscale",
    "testcloud",
    "testcomputeconfig",
    {
      properties: {
        spec: {
          options: [
            {
              cloudResourceNames: [
                "/subscriptions/14AB8053-986C-414E-96B3-11D82B8B478D/resourceGroups/rganyscale/providers/Anyscale.Platform/clouds/testcloud/cloudResources/eastus-cloud-resource",
              ],
              headNode: {
                name: "head-node",
                instanceType: "Standard_D8s_v5",
                resources: {
                  cpu: 8,
                  gpu: 0,
                  memory: 32,
                  objectStoreMemory: 8,
                  customResources: {},
                },
                requiredResources: {
                  cpu: 8,
                  gpu: 0,
                  memory: 32,
                  tpu: 0,
                  accelerator: "",
                  cpuArchitecture: "x86_64",
                },
                labels: {},
                requiredLabels: {},
                advancedInstanceConfig: "{}",
                flags: {},
              },
              workerNodes: [
                {
                  minNodes: 1,
                  maxNodes: 10,
                  marketType: "ON_DEMAND",
                  name: "gpu-worker",
                  instanceType: "Standard_NC24ads_A100_v4",
                  resources: {
                    cpu: 24,
                    gpu: 1,
                    memory: 220,
                    objectStoreMemory: 50,
                    customResources: {},
                  },
                  requiredResources: {
                    cpu: 24,
                    gpu: 1,
                    memory: 220,
                    tpu: 0,
                    accelerator: "A100",
                    cpuArchitecture: "x86_64",
                  },
                  labels: {},
                  requiredLabels: {},
                  advancedInstanceConfig: "{}",
                  flags: {},
                },
              ],
              zones: ["eastus-1"],
              advancedInstanceConfig: "{}",
              flags: {},
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await computeConfigsUpdate();
}

main().catch(console.error);
