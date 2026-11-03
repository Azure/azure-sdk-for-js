// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update Kafka Configuration
 *
 * @summary create or update Kafka Configuration
 * x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_CreateOrUpdate.json
 */
async function kafkaConfigurationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.kafkaConfigurations.createOrUpdate(
    "rgpurview",
    "account1",
    "kafkaConfigName",
    {
      consumerGroup: "consumerGroup",
      credentials: {
        type: "UserAssigned",
        identityId:
          "/subscriptions/47e8596d-ee73-4eb2-b6b4-cc13c2b87ssd/resourceGroups/testRG/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testId",
      },
      eventHubPartitionId: "partitionId",
      eventHubResourceId:
        "/subscriptions/225be6fe-ec1c-4d51-a368-f69348d2e6c5/resourceGroups/testRG/providers/Microsoft.EventHub/namespaces/eventHubNameSpaceName",
      eventHubType: "Notification",
      eventStreamingState: "Enabled",
      eventStreamingType: "Azure",
    },
  );
  console.log(result);
}

async function main() {
  await kafkaConfigurationsCreateOrUpdate();
}

main().catch(console.error);
