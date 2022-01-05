// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of SchemaRegistryAvroEncoder to decode messages with avro-encoded payload received from the Event Hub Consumer Client.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { SchemaRegistryClient, SchemaDescription } from "@azure/schema-registry";
import { SchemaRegistryAvroEncoder } from "@azure/schema-registry-avro";
import { EventHubConsumerClient, earliestEventPosition } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Set these environment variables or edit the following values
const endpoint = process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";
const groupName = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";
const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";
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
const schemaDescription: SchemaDescription = {
  name: `${schemaObject.namespace}.${schemaObject.name}`,
  groupName,
  format: "Avro",
  definition: schema,
};

export async function main() {
  // Create a new client
  const schemaRegistryClient = new SchemaRegistryClient(endpoint, new DefaultAzureCredential());

  // Register the schema. This would generally have been done somewhere else.
  // You can also skip this step and let `encodeMessageData` automatically register
  // schemas using autoRegisterSchemas=true, but that is NOT recommended in production.
  await schemaRegistryClient.registerSchema(schemaDescription);

  // Create a new encoder backed by the client
  const encoder = new SchemaRegistryAvroEncoder(schemaRegistryClient, { groupName });

  const eventHubConsumerClient = new EventHubConsumerClient(
    consumerGroup,
    connectionString,
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
              const decodedEvent = await encoder.decodeMessageData({
                contentType: event.contentType,
                data: Uint8Array.from(Object.values(event.body)),
              });
              console.log(`Decoded message: '${JSON.stringify(decodedEvent)}'`);
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
