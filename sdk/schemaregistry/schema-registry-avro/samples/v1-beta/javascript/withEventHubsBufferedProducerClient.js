// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of AvroSerializer to create messages with avro-serialized payload using schema from Schema Registry and send them to an Event Hub using the EventHub Buffered Producer Client.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { AvroSerializer } = require("@azure/schema-registry-avro");
const { EventHubBufferedProducerClient, createEventDataAdapter } = require("@azure/event-hubs");

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

async function handleError() {
  console.log("An error occured when sending a message");
}

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

  const eventHubsBufferedProducerClient = new EventHubBufferedProducerClient(
    eventHubsConnectionString,
    eventHubName,
    {
      onSendEventsErrorHandler: handleError,
    }
  );

  // serialize an object that matches the schema
  const value = { firstName: "Jane", lastName: "Doe" };
  const message = await serializer.serialize(value, schema);
  console.log("Created message:");
  console.log(message);

  await eventHubsBufferedProducerClient.enqueueEvent(message);
  console.log(`Message was added to the queue and is about to be sent`);

  // Wait for a bit before cleaning up the sample
  setTimeout(async () => {
    await eventHubsBufferedProducerClient.close({ flush: true });
    console.log(`Exiting sample`);
  }, 30 * 1000);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
