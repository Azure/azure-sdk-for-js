// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the kafka configuration for the account
 *
 * @summary gets the kafka configuration for the account
 * x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_Get.json
 */
async function kafkaConfigurationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.kafkaConfigurations.get("rgpurview", "account1", "kafkaConfigName");
  console.log(result);
}

async function main() {
  await kafkaConfigurationsGet();
}

main().catch(console.error);
