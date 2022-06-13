// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of AvroSerializer to create messages with avro-serialized payload using schema from Schema Registry and send them to an Event Hub using the EventHub Producer Client.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { AvroSerializer } = require("@azure/schema-registry-avro");
const { EventHubProducerClient, createEventDataAdapter } = require("@azure/event-hubs");

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

  const eventHubsProducerClient = new EventHubProducerClient(
    eventHubsConnectionString,
    eventHubName
  );

  // serialize an object that matches the schema
  const value = { firstName: "Joe", lastName: "Doe" };
  const message = await serializer.serialize(value, schema);
  console.log("Created message:");
  console.log(message);

  const eventsToSend = [message];

  // By not specifying a partition ID or a partition key we allow the server to choose
  // which partition will accept this message.
  //
  // This pattern works well if the consumers of your events do not have any particular
  // requirements about the ordering of batches against other batches or if you don't care
  // which messages are assigned to which partition.
  //
  // If you would like more control you can pass either a `partitionKey` or a `partitionId`
  // into the createBatch() `options` parameter which will allow you full control over the
  // destination.
  const batchOptions = {
    // The maxSizeInBytes lets you manually control the size of the batch.
    // if this is not set we will get the maximum batch size from Event Hubs.
    //
    // For this sample you can change the batch size to see how different parts
    // of the sample handle batching. In production we recommend using the default
    // and not specifying a maximum size.
    //
    // maxSizeInBytes: 200
  };

  let batch = await eventHubsProducerClient.createBatch(batchOptions);

  let numEventsSent = 0;

  // add events to our batch
  let i = 0;

  while (i < eventsToSend.length) {
    // messages can fail to be added to the batch if they exceed the maximum size configured for
    // the EventHub.
    const isAdded = batch.tryAdd(eventsToSend[i]);

    if (isAdded) {
      console.log(`Added a message with index ${i} to the batch`);
      ++i;
      continue;
    }

    if (batch.count === 0) {
      // If we can't add it and the batch is empty that means the message we're trying to send
      // is too large, even when it would be the _only_ message in the batch.
      //
      // At this point you'll need to decide if you're okay with skipping this message entirely
      // or find some way to shrink it.
      console.log(`Message was too large and can't be sent until it's made smaller. Skipping...`);
      ++i;
      continue;
    }

    // otherwise this just signals a good spot to send our batch
    console.log(`Batch is full - sending ${batch.count} messages as a single batch.`);
    await eventHubsProducerClient.sendBatch(batch);
    numEventsSent += batch.count;

    // and create a new one to house the next set of messages
    batch = await eventHubsProducerClient.createBatch(batchOptions);
  }

  // send any remaining messages, if any.
  if (batch.count > 0) {
    console.log(`Sending remaining ${batch.count} messages as a single batch.`);
    await eventHubsProducerClient.sendBatch(batch);
    numEventsSent += batch.count;
  }

  console.log(`Sent ${numEventsSent} events`);

  if (numEventsSent !== eventsToSend.length) {
    throw new Error(`Not all messages were sent (${numEventsSent}/${eventsToSend.length})`);
  }

  // Wait for a bit before cleaning up the sample
  setTimeout(async () => {
    await eventHubsProducerClient.close();
    console.log(`Exiting sample`);
  }, 3 * 1000);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
