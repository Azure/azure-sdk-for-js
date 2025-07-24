// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create confluent environment
 *
 * @summary create confluent environment
 * x-ms-original-file: 2024-07-01/Environment_Create.json
 */
async function environmentCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.environment.createOrUpdate(
    "myResourceGroup",
    "myOrganization",
    "env-1",
    {
      body: {
        properties: { streamGovernanceConfig: { package: "ESSENTIALS" } },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await environmentCreateOrUpdate();
}

main().catch(console.error);
