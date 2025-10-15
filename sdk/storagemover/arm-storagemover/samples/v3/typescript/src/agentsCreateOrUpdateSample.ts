// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Agent resource, which references a hybrid compute machine that can run jobs.
 *
 * @summary creates or updates an Agent resource, which references a hybrid compute machine that can run jobs.
 * x-ms-original-file: 2025-07-01/Agents_CreateOrUpdate_MaximumSet.json
 */
async function agentsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.agents.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-agentName",
    {
      properties: {
        description: "Example Agent Description",
        arcResourceId:
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.HybridCompute/machines/examples-hybridComputeName",
        arcVmUuid: "3bb2c024-eba9-4d18-9e7a-1d772fcc5fe9",
        uploadLimitSchedule: {
          weeklyRecurrences: [
            {
              days: ["Monday"],
              endTime: { hour: 18, minute: 30 },
              limitInMbps: 2000,
              startTime: { hour: 9, minute: 0 },
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Agent resource, which references a hybrid compute machine that can run jobs.
 *
 * @summary creates or updates an Agent resource, which references a hybrid compute machine that can run jobs.
 * x-ms-original-file: 2025-07-01/Agents_CreateOrUpdate_MinimumSet.json
 */
async function agentsCreateOrUpdateMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.agents.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-agentName",
    {
      properties: {
        arcResourceId:
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.HybridCompute/machines/examples-hybridComputeName",
        arcVmUuid: "3bb2c024-eba9-4d18-9e7a-1d772fcc5fe9",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Agent resource, which references a hybrid compute machine that can run jobs.
 *
 * @summary creates or updates an Agent resource, which references a hybrid compute machine that can run jobs.
 * x-ms-original-file: 2025-07-01/Agents_CreateOrUpdate_UploadLimitSchedule_Overnight.json
 */
async function agentsCreateOrUpdateWithOvernightUploadLimitSchedule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.agents.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-agentName",
    {
      properties: {
        arcResourceId:
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.HybridCompute/machines/examples-hybridComputeName",
        arcVmUuid: "3bb2c024-eba9-4d18-9e7a-1d772fcc5fe9",
        uploadLimitSchedule: {
          weeklyRecurrences: [
            {
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              endTime: { hour: 24, minute: 0 },
              limitInMbps: 2000,
              startTime: { hour: 18, minute: 0 },
            },
            {
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              endTime: { hour: 9, minute: 0 },
              limitInMbps: 2000,
              startTime: { hour: 0, minute: 0 },
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await agentsCreateOrUpdateMaximumSet();
  await agentsCreateOrUpdateMinimumSet();
  await agentsCreateOrUpdateWithOvernightUploadLimitSchedule();
}

main().catch(console.error);
