// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of SchemaRegistryAvroSerializer to serialize and deserialize using schema from Schema Registry.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { SchemaRegistryAvroSerializer } = require("@azure/schema-registry-avro");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// Set these environment variables or edit the following values
const endpoint = process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";
const groupName = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";

// Sample Avro Schema for user with first and last names
const schemaObject = {
  type: "record",
  name: "User",
  namespace: "com.azure.schemaregistry.samples",
  fields: [
    {
      name: "firstName",
      type: "string"
    },
    {
      name: "lastName",
      type: "string"
    }
  ]
};

const schema = JSON.stringify(schemaObject);

// Description of the schema for registration
const schemaDescription = {
  name: `${schemaObject.namespace}.${schemaObject.name}`,
  groupName,
  format: "Avro",
  definition: schema
};

async function main() {
  // Create a new client
  const client = new SchemaRegistryClient(endpoint, new DefaultAzureCredential());

  // Register the schema. This would generally have been done somewhere else.
  // You can also skip this step and let serialize automatically register schemas
  // using autoRegisterSchemas=true, but that is NOT recommended in production.
  await client.registerSchema(schemaDescription);

  // Create a new serializer backed by the client
  const serializer = new SchemaRegistryAvroSerializer(client, { groupName });

  // serialize an object that matches the schema
  const value = { firstName: "Jane", lastName: "Doe" };
  const buffer = await serializer.serialize(value, schema);
  console.log("Serialized:");
  console.log(buffer);

  // deserialize the result back to an object
  const deserializedValue = await serializer.deserialize(buffer);
  console.log("Deserialized:");
  console.log(`${deserializedValue.firstName} ${deserializedValue.lastName}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
