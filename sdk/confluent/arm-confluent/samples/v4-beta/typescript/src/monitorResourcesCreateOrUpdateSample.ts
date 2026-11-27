// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces a monitor with the Confluent environment, cluster, and
 * topic to which selected Azure logs are sent.
 *
 * @summary creates or replaces a monitor with the Confluent environment, cluster, and
 * topic to which selected Azure logs are sent.
 * x-ms-original-file: 2026-10-21-preview/MonitorResources_CreateOrUpdate_MaximumSet_Gen.json
 */
async function monitorResourcesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.monitorResources.createOrUpdate(
    "rgconfluent",
    "myOrganization",
    "productionLogs",
    {
      location: "eastus",
      tags: { environment: "production" },
      properties: {
        organizationId: "org-xyz789",
        environmentId: "env-abc123",
        environmentName: "Production",
        clusterId: "lkc-def456",
        clusterName: "Production Cluster",
        topicId: "topic-ghi789",
        topicName: "azure-logs",
        dictionary: [{ key: "source", value: "azure" }],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorResourcesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
