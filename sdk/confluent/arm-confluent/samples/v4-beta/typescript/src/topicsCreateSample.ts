// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create confluent topics by Name
 *
 * @summary create confluent topics by Name
 * x-ms-original-file: 2024-07-01/Topics_Create.json
 */
async function topicsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.topics.create(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "dlz-f3a90de",
    "topic-1",
    {
      body: {
        properties: {
          inputConfigs: [
            { name: "cleanup.policy", value: "compact" },
            { name: "retention.ms", value: "86400000" },
          ],
          partitionsCount: "1",
          replicationFactor: "3",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await topicsCreate();
}

main().catch(console.error);
