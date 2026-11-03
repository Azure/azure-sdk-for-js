// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the Kafka configurations in the Account
 *
 * @summary lists the Kafka configurations in the Account
 * x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_ListByAccount.json
 */
async function kafkaConfigurationsListByAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.kafkaConfigurations.listByAccount("rgpurview", "account1", {
    skipToken: "token",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await kafkaConfigurationsListByAccount();
}

main().catch(console.error);
