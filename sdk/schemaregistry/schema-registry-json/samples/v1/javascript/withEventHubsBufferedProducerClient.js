// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of JsonSchemaSerializer to create messages with json-serialized payload using schema from Schema Registry and send them to an Event Hub using the EventHub Buffered Producer Client.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { JsonSchemaSerializer } = require("@azure/schema-registry-json");
const { EventHubBufferedProducerClient, createEventDataAdapter } = require("@azure/event-hubs");

// Load the .env file if it exists
require("dotenv").config();

// The fully qualified namespace for schema registry
const schemaRegistryFullyQualifiedNamespace =
  process.env["SCHEMAREGISTRY_JSON_FULLY_QUALIFIED_NAMESPACE"] || "<namespace>";

// The schema group to use for schema registeration or lookup
const groupName = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";

// The connection string for Event Hubs
const eventHubJsonHostName = process.env["EVENTHUB_JSON_HOST_NAME"] || "";

// The name of Event Hub the client will connect to
const eventHubName = process.env["EVENTHUB_NAME"] || "";

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

async function handleError() {
  console.log("An error occured when sending a message");
}

async function main() {
  // Create a credential
  const credential = new DefaultAzureCredential();

  // Create a new client
  const schemaRegistryClient = new SchemaRegistryClient(
    schemaRegistryFullyQualifiedNamespace,
    credential,
  );

  // Register the schema. This would generally have been done somewhere else.
  await schemaRegistryClient.registerSchema(schemaDescription);

  // Create a new serializer backed by the client
  const serializer = new JsonSchemaSerializer(schemaRegistryClient, {
    groupName,
    messageAdapter: createEventDataAdapter(),
  });

  const eventHubsBufferedProducerClient = new EventHubBufferedProducerClient(
    eventHubJsonHostName,
    eventHubName,
    credential,
    {
      onSendEventsErrorHandler: handleError,
    },
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
