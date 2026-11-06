// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a service.
 *
 * @summary updates a service.
 * x-ms-original-file: 2026-09-01/Services_Update.json
 */
async function servicesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.services.update(
    "rganyscale",
    "testcloud",
    "testproject",
    "testservice",
    {
      properties: {
        deploymentConfig: {
          description: "Production model serving endpoint",
          computeConfig: {
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
            computeConfigName:
              "/subscriptions/14AB8053-986C-414E-96B3-11D82B8B478D/resourceGroups/rganyscale/providers/Anyscale.Platform/clouds/testcloud/computeConfigs/my-compute-config",
          },
          imageUri: "anyscale/ray:2.44.0-py312-cu124",
          applications: [{}],
          rolloutStrategy: "Rollout",
          version: "v1",
          canaryPercent: 0,
          maxSurgePercent: 25,
          autoCompleteRollout: true,
          trafficPercent: 100,
          httpConfig: {},
          grpcConfig: {},
          maxUptimeTimeoutSec: 0,
          envVars: {},
          tracingConfig: { enabled: true, samplingRatio: 1 },
          rayGcsExternalStorageConfig: { address: "redis://my-redis-host:6379" },
          connectionIds: ["connection-01"],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await servicesUpdate();
}

main().catch(console.error);
