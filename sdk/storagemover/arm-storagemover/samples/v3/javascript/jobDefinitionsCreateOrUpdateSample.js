// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 *
 * @summary creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 * x-ms-original-file: 2026-05-01/JobDefinitions_CreateOrUpdate.json
 */
async function jobDefinitionsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.jobDefinitions.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    "examples-jobDefinitionName",
    {
      properties: {
        description: "Example Job Definition Description",
        agentName: "migration-agent",
        copyMode: "Additive",
        jobType: "OnPremToCloud",
        sourceName: "examples-sourceEndpointName",
        sourceSubpath: "/",
        targetName: "examples-targetEndpointName",
        targetSubpath: "/",
        connections: [
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.StorageMover/storageMovers/examples-storageMoverName/connections/example-connection",
        ],
        syncMode: "FullScan",
        moverSyncedUntil: new Date("2026-05-01T00:00:00Z"),
        preservePermissions: false,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 *
 * @summary creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 * x-ms-original-file: 2026-05-01/JobDefinitions_CreateOrUpdate_CloudToCloud.json
 */
async function jobDefinitionsCreateOrUpdateCloudToCloud() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.jobDefinitions.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    "examples-jobDefinitionName",
    {
      properties: {
        description: "Example Job Definition Description",
        copyMode: "Additive",
        jobType: "CloudToCloud",
        sourceName: "examples-sourceEndpointName",
        sourceSubpath: "/",
        targetName: "examples-targetEndpointName",
        targetSubpath: "/",
        agentName: "dummy-agent",
        connections: [
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.StorageMover/storageMovers/examples-storageMoverName/connections/example-connection",
        ],
        syncMode: "SnapshotBased",
        moverSyncedUntil: new Date("2026-05-01T00:00:00Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 *
 * @summary creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 * x-ms-original-file: 2026-05-01/JobDefinitions_CreateOrUpdate_CrossTenant.json
 */
async function jobDefinitionsCreateOrUpdateCrossTenant() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.jobDefinitions.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    "examples-jobDefinitionName",
    {
      properties: {
        description:
          "Cross-tenant Blob-to-Blob copy job. JobDefinition lives in the source (host) tenant alongside the local source endpoint; the target endpoint lives in a partner (guest) tenant.",
        agentName: "migration-agent",
        copyMode: "Additive",
        jobType: "CloudToCloud",
        sourceName: "examples-sourceEndpointName",
        sourceSubpath: "/",
        targetName: "partner-targetEndpoint",
        targetSubpath: "/",
        isCrossTenantJob: true,
        crossTenantEndpointTenantId: "11111111-2222-3333-4444-555555555555",
        crossTenantEndpointResourceId:
          "/subscriptions/0a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809/resourceGroups/partner-rg/providers/Microsoft.StorageMover/storageMovers/partner-storageMover/endpoints/partner-targetEndpoint",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 *
 * @summary creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 * x-ms-original-file: 2026-05-01/JobDefinitions_CreateOrUpdate_With_Schedule.json
 */
async function jobDefinitionsCreateOrUpdateWithSchedule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.jobDefinitions.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-projectName",
    "examples-jobDefinitionName",
    {
      properties: {
        description: "Example Job Definition Description",
        copyMode: "Additive",
        jobType: "CloudToCloud",
        sourceName: "examples-sourceEndpointName",
        sourceSubpath: "/",
        targetName: "examples-targetEndpointName",
        targetSubpath: "/",
        agentName: "dummy-agent",
        connections: [
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.StorageMover/storageMovers/examples-storageMoverName/connections/example-connection",
        ],
        schedule: {
          frequency: "Weekly",
          isActive: true,
          startDate: new Date("2026-05-01T00:00:00Z"),
          endDate: new Date("2025-12-31T12:00:00Z"),
          executionTime: { hour: 9, minute: 0 },
          daysOfWeek: ["Monday", "Wednesday", "Friday"],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await jobDefinitionsCreateOrUpdate();
  await jobDefinitionsCreateOrUpdateCloudToCloud();
  await jobDefinitionsCreateOrUpdateCrossTenant();
  await jobDefinitionsCreateOrUpdateWithSchedule();
}

main().catch(console.error);
