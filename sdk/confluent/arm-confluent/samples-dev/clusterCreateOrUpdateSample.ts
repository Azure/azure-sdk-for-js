// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create confluent clusters
 *
 * @summary create confluent clusters
 * x-ms-original-file: 2024-07-01/Cluster_Create.json
 */
async function clusterCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.cluster.createOrUpdate(
    "myResourceGroup",
    "myOrganization",
    "env-1",
    "cluster-1",
    {
      body: {
        properties: {
          spec: {
            environment: { id: "env-1" },
            package: "ESSENTIALS",
            region: "us-east4",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clusterCreateOrUpdate();
}

main().catch(console.error);
