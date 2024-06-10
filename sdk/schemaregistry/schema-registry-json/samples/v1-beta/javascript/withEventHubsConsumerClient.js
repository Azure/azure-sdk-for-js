// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of JsonSchemaSerializer to deserialize messages with json-serialized payload received from the Event Hub Consumer Client.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { JsonSchemaSerializer } = require("@azure/schema-registry-json");
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

// Sample Json Schema for user with first and last names
const schemaObject = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "student",
  type: "object",
  properties: {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
  },
  required: ["firstName", "lastName"],
};

const schema = JSON.stringify(schemaObject);

// Description of the schema for registration
const schemaDescription = {
  name: `${schemaObject.$id}`,
  groupName,
  format: "Json",
  definition: schema,
};

async function main() {
  // Create a new client
  const schemaRegistryClient = new SchemaRegistryClient(
    schemaRegistryFullyQualifiedNamespace,
    new DefaultAzureCredential(),
  );

  // Register the schema. This would generally have been done somewhere else.
  await schemaRegistryClient.registerSchema(schemaDescription);

  // Create a new serializer backed by the client
  const serializer = new JsonSchemaSerializer(schemaRegistryClient, {
    groupName,
    messageAdapter: createEventDataAdapter(),
  });

  const eventHubConsumerClient = new EventHubConsumerClient(
    consumerGroup,
    eventHubsConnectionString,
    eventHubName,
  );

  const subscription = eventHubConsumerClient.subscribe(
    {
      // The callback where you add your code to process incoming events
      processEvents: async (events, context) => {
        for (const event of events) {
          console.log(
            `Received event: '${JSON.stringify(event)}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`,
          );
          if (event.contentType !== undefined && event.body) {
            const contentTypeParts = event.contentType.split("+");
            if (contentTypeParts[0] === "application/json") {
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
    // Set the skipParsingBodyAsJson option to disable automatic JSON parsing of the message so we can deserialize it with the JSON serializer instead.
    { startPosition: earliestEventPosition, skipParsingBodyAsJson: true },
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
