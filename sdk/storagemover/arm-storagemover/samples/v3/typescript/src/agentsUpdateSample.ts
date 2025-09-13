// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Agent resource.
 *
 * @summary creates or updates an Agent resource.
 * x-ms-original-file: 2025-07-01/Agents_Update.json
 */
async function agentsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.agents.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-agentName",
    {
      properties: {
        description: "Example Agent Description",
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

async function main(): Promise<void> {
  await agentsUpdate();
}

main().catch(console.error);
