// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a FleetManagedNamespace
 *
 * @summary create a FleetManagedNamespace
 * x-ms-original-file: 2025-08-01-preview/FleetManagedNamespaces_CreateOrUpdate.json
 */
async function fleetManagedNamespacesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleetManagedNamespaces.createOrUpdate(
    "rgfleets",
    "fleet1",
    "namespace1",
    {
      properties: {
        managedNamespaceProperties: {
          labels: { key1: "value1" },
          annotations: { key2: "value2" },
          defaultResourceQuota: {
            cpuRequest: "1",
            cpuLimit: "1",
            memoryRequest: "10Gi",
            memoryLimit: "32Gi",
          },
          defaultNetworkPolicy: {
            ingress: "AllowSameNamespace",
            egress: "AllowAll",
          },
        },
        adoptionPolicy: "Never",
        deletePolicy: "Keep",
        propagationPolicy: {
          type: "Placement",
          placementProfile: {
            defaultClusterResourcePlacement: {
              policy: {
                placementType: "PickAll",
                affinity: {
                  clusterAffinity: {
                    requiredDuringSchedulingIgnoredDuringExecution: {
                      clusterSelectorTerms: [
                        {
                          labelSelector: {
                            matchLabels: { gpu: "true" },
                            matchExpressions: [
                              {
                                key: "region",
                                operator: "In",
                                values: ["production1", "production2"],
                              },
                            ],
                          },
                          propertySelector: {
                            matchExpressions: [{ name: "zones", operator: "Gt", values: ["1"] }],
                          },
                        },
                      ],
                    },
                  },
                },
                tolerations: [
                  {
                    key: "AIWorkloadOnly",
                    operator: "Exists",
                    value: "true",
                    effect: "NoSchedule",
                  },
                ],
              },
            },
          },
        },
        status: { lastOperationError: {} },
      },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main() {
  await fleetManagedNamespacesCreateOrUpdate();
}

main().catch(console.error);
