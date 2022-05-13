// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of AvroSerializer to create messages with avro-serialized payload using schema from Schema Registry.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { AvroSerializer } = require("@azure/schema-registry-avro");

// Load the .env file if it exists
require("dotenv").config();

// The fully qualified namespace for schema registry
const schemaRegistryFullyQualifiedNamespace =
  process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";

// The schema group to use for schema registeration or lookup
const groupName = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";

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
  const client = new SchemaRegistryClient(
    schemaRegistryFullyQualifiedNamespace,
    new DefaultAzureCredential()
  );

  // Register the schema. This would generally have been done somewhere else.
  // You can also skip this step and let `serialize` automatically register
  // schemas using autoRegisterSchemas=true, but that is NOT recommended in production.
  await client.registerSchema(schemaDescription);

  // Create a new serializer backed by the client
  const serializer = new AvroSerializer(client, { groupName });

  // serialize an object that matches the schema and put it in a message
  const value = { firstName: "Jane", lastName: "Doe" };
  const message = await serializer.serialize(value, schema);
  console.log("Created message:");
  console.log(JSON.stringify(message));

  // deserialize the message back to an object
  const deserializedObject = await serializer.deserialize(message);
  console.log("Deserialized object:");
  console.log(JSON.stringify(deserializedObject));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
