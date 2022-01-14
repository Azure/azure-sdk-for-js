// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Send events to Event Grid with Avro-encoded payloads using the Cloud Events 1.0 Schema.
 * @azsdk-weight 1
 */

import {
  EventGridPublisherClient,
  AzureKeyCredential,
  SendCloudEventInput,
} from "@azure/eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import { SchemaDescription, SchemaRegistryClient } from "@azure/schema-registry";
import { SchemaRegistryAvroEncoder } from "@azure/schema-registry-avro";
import * as dotenv from "dotenv";

// Load the .env file if it exists
dotenv.config();

// The fully qualified namespace for schema registry
const schemaRegistryFullyQualifiedNamespace =
  process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";

// The schema group to use for schema registeration or lookup
const groupName = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";

// The URL of the endpoint of the Event Grid topic.
const endpoint = process.env["EVENT_GRID_TOPIC_ENDPOINT"] || "";

// You can find the access keys in the Azure portal.
// Navigate to Settings > Access keys in your Event Grid topic's menu blade to see both access keys (you may use either).
const accessKey = process.env["EEVENT_GRID_TOPIC_API_KEY"] || "";

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
  groupName: groupName,
  format: "Avro",
  definition: schema,
};

export async function main(): Promise<void> {
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
    groupName,
  });
  // Create the client used to publish events to the Event Grid Service
  const eventGridPublisherClient = new EventGridPublisherClient(
    endpoint,
    "CloudEvent",
    new AzureKeyCredential(accessKey)
  );

  // Encode an object that matches the schema
  const value: User = { firstName: "Joe", lastName: "Doe" };
  const message = await encoder.encodeMessageData(value, schema, {
    messageFactory: {
      createMessage: (
        binaryData: Uint8Array,
        contentType: string
      ): SendCloudEventInput<{ payload: Uint8Array }> => ({
        type: "azure.sdk.schemaregistry.samples.cloudevent",
        source: "/azure/sdk/schemaregistry/samples/withEventGrid",
        datacontenttype: contentType,
        data: {
          payload: binaryData,
        },
      }),
    },
  });

  console.log("Created message:");
  console.log(JSON.stringify(message));

  // Send an event with the Avro-encoded payload to the Event Grid Service,
  // using the Cloud Event schema.
  // A random ID will be generated for this event, since one is not provided.
  await eventGridPublisherClient.send([message]);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
