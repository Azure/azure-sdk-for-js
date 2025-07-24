// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Organization resource
 *
 * @summary update Organization resource
 * x-ms-original-file: 2024-07-01/Organization_Update.json
 */
async function confluentUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.update("myResourceGroup", "myOrganization", {
    body: { tags: { client: "dev-client", env: "dev" } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await confluentUpdate();
}

main().catch(console.error);
