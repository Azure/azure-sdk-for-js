// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get confluent topic by Name
 *
 * @summary get confluent topic by Name
 * x-ms-original-file: 2024-07-01/Topics_Get.json
 */
async function topicsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.topics.get(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "dlz-f3a90de",
    "topic-1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await topicsGet();
}

main().catch(console.error);
