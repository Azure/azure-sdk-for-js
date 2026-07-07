// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a postgres Instance resource
 *
 * @summary creates or replaces a postgres Instance resource
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdatePostgresInstance.json
 */
async function createOrUpdateAPostgresInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.postgresInstances.create("testrg", "testpostgresInstance", {
    extendedLocation: {
      name: "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.ExtendedLocation/customLocations/arclocation",
      type: "CustomLocation",
    },
    location: "eastus",
    properties: {
      admin: "admin",
      basicLoginInformation: { password: "********", username: "username" },
      dataControllerId: "dataControllerId",
      k8SRaw: {
        apiVersion: "apiVersion",
        kind: "postgresql-12",
        metadata: {
          name: "pg1",
          creationTimestamp: "2020-08-25T14:55:10Z",
          generation: 1,
          namespace: "test",
          resourceVersion: "527780",
          selfLink: "/apis/arcdata.microsoft.com/v1alpha1/namespaces/test/postgresql-12s/pg1",
          uid: "1111aaaa-ffff-ffff-ffff-99999aaaaaaa",
        },
        spec: {
          backups: {
            deltaMinutes: 3,
            fullMinutes: 10,
            tiers: [
              {
                retention: { maximums: ["6", "512MB"], minimums: ["3"] },
                storage: { volumeSize: "1Gi" },
              },
            ],
          },
          engine: { extensions: [{ name: "citus" }] },
          scale: { shards: 3 },
          scheduling: { default: { resources: { requests: { memory: "256Mi" } } } },
          service: { type: "NodePort" },
          storage: {
            data: { className: "local-storage", size: "5Gi" },
            logs: { className: "local-storage", size: "5Gi" },
          },
        },
        status: { externalEndpoint: null, readyPods: "4/4", state: "Ready" },
      },
    },
    sku: { name: "default", dev: true, tier: "Hyperscale" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAPostgresInstance();
}

main().catch(console.error);
