// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a KafkaConfiguration resource.
 *
 * @summary deletes a KafkaConfiguration resource.
 * x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_Delete.json
 */
async function kafkaConfigurationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  await client.kafkaConfigurations.delete("rgpurview", "account1", "kafkaConfigName");
}

async function main() {
  await kafkaConfigurationsDelete();
}

main().catch(console.error);
