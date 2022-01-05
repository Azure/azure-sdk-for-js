// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of SchemaRegistryAvroEncoder to create messages with avro-encoded payload using schema from Schema Registry and send them to an Event Hub using the EventHub Buffered Producer Client.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { SchemaRegistryClient, SchemaDescription } from "@azure/schema-registry";
import { SchemaRegistryAvroEncoder } from "@azure/schema-registry-avro";
import { EventHubBufferedProducerClient } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Set these environment variables or edit the following values
const schemaRegistryFullyQualifiedNamespace =
  process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";
const schemaGroupName = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";
const eventHubsConnectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";

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

// Matching TypeScript interface for schema
interface User {
  firstName: string;
  lastName: string;
}

const schema = JSON.stringify(schemaObject);

// Description of the schema for registration
const schemaDescription: SchemaDescription = {
  name: `${schemaObject.namespace}.${schemaObject.name}`,
  groupName: schemaGroupName,
  format: "Avro",
  definition: schema,
};

async function handleError(): Promise<void> {
  console.log("An error occured when sending a message");
}

export async function main() {
  // Create a new client
  const schemaRegistryClient = new SchemaRegistryClient(
    schemaRegistryFullyQualifiedNamespace,
    new DefaultAzureCredential()
  );

  // Register the schema. This would generally have been done somewhere else.
  // You can also skip this step and let `encodeMessageData` automatically register
  // schemas using autoRegisterSchemas=true, but that is NOT recommended in production.
  await schemaRegistryClient.registerSchema(schemaDescription);

  // Create a new encoder backed by the client
  const encoder = new SchemaRegistryAvroEncoder(schemaRegistryClient, {
    groupName: schemaGroupName,
  });

  const eventHubsBufferedProducerClient = new EventHubBufferedProducerClient(
    eventHubsConnectionString,
    {
      onSendEventsErrorHandler: handleError,
    }
  );

  // encode an object that matches the schema
  const value: User = { firstName: "Jane", lastName: "Doe" };
  const message = await encoder.encodeMessageData(value, schema);
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
