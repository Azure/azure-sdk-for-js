// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of AvroSerializer to deserialize messages with avro-serialized payload received from the Event Hub Consumer Client.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { AvroSerializer } = require("@azure/schema-registry-avro");
const {
  EventHubConsumerClient,
  earliestEventPosition,
  createEventDataAdapter,
} = require("@azure/event-hubs");

// Load the .env file if it exists
require("dotenv").config();

// The fully qualified namespace for schema registry
const schemaRegistryFullyQualifiedNamespace =
  process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";

// The schema group to use for schema registeration or lookup
const groupName = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";

// The connection string for Event Hubs
const eventHubsConnectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";

// The name of Event Hub the client will connect to
const eventHubName = process.env["EVENTHUB_NAME"] || "";

// The name of the Event Hub consumer group from which you want to process events
const consumerGroup = process.env["CONSUMER_GROUP_NAME"] || "";

// Sample Avro Schema for user with first and last names
const schemaObject = {
  type: "record",
  name: "User",
  namespace: "com.azure.schemaregistry.samples",
  fields: [
    {
      name: "firstName",
      type: "string",
    },
    {
      name: "lastName",
      type: "string",
    },
  ],
};

const schema = JSON.stringify(schemaObject);

// Description of the schema for registration
const schemaDescription = {
  name: `${schemaObject.namespace}.${schemaObject.name}`,
  groupName,
  format: "Avro",
  definition: schema,
};

async function main() {
  // Create a new client
  const schemaRegistryClient = new SchemaRegistryClient(
    schemaRegistryFullyQualifiedNamespace,
    new DefaultAzureCredential()
  );

  // Register the schema. This would generally have been done somewhere else.
  // You can also skip this step and let `serialize` automatically register
  // schemas using autoRegisterSchemas=true, but that is NOT recommended in production.
  await schemaRegistryClient.registerSchema(schemaDescription);

  // Create a new serializer backed by the client
  const serializer = new AvroSerializer(schemaRegistryClient, {
    groupName,
    messageAdapter: createEventDataAdapter(),
  });

  const eventHubConsumerClient = new EventHubConsumerClient(
    consumerGroup,
    eventHubsConnectionString,
    eventHubName
  );

  const subscription = eventHubConsumerClient.subscribe(
    {
      // The callback where you add your code to process incoming events
      processEvents: async (events, context) => {
        // Note: It is possible for `events` to be an empty array.
        // This can happen if there were no new events to receive
        // in the `maxWaitTimeInSeconds`, which is defaulted to
        // 60 seconds.
        // The `maxWaitTimeInSeconds` can be changed by setting
        // it in the `options` passed to `subscribe()`.
        for (const event of events) {
          console.log(
            `Received event: '${JSON.stringify(event)}' from partition: '${
              context.partitionId
            }' and consumer group: '${context.consumerGroup}'`
          );
          if (event.contentType !== undefined && event.body) {
            const contentTypeParts = event.contentType.split("+");
            if (contentTypeParts[0] === "avro/binary") {
              const deserializedEvent = await serializer.deserialize(event);
              console.log(`Deserialized message: '${JSON.stringify(deserializedEvent)}'`);
            }
          }
        }
      },
      processError: async (err, context) => {
        console.log(`Error on partition "${context.partitionId}": ${err}`);
      },
    },
    { startPosition: earliestEventPosition }
  );

  // Wait for a bit before cleaning up the sample
  setTimeout(async () => {
    await subscription.close();
    await eventHubConsumerClient.close();
    console.log(`Exiting sample`);
  }, 30 * 1000);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
