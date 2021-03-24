// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//@@TS-MAGIC-NEWLINE@@
/**
 * @summary Demonstrates the use of SchemaRegistryAvroSerializer to serialize and deserialize using schema from Schema Registry.
 */
//@@TS-MAGIC-NEWLINE@@
const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { SchemaRegistryAvroSerializer } = require("@azure/schema-registry-avro");
//@@TS-MAGIC-NEWLINE@@
// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();
//@@TS-MAGIC-NEWLINE@@
// Set these environment variables or edit the following values
const endpoint = process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";
const group = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";
//@@TS-MAGIC-NEWLINE@@
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
//@@TS-MAGIC-NEWLINE@@
const schema = JSON.stringify(schemaObject);
//@@TS-MAGIC-NEWLINE@@
// Description of the schema for registration
const schemaDescription = {
  name: `${schemaObject.namespace}.${schemaObject.name}`,
  group,
  serializationType: "avro",
  content: schema
};
//@@TS-MAGIC-NEWLINE@@
async function main() {
  // Create a new client
  const client = new SchemaRegistryClient(endpoint, new DefaultAzureCredential());
  //@@TS-MAGIC-NEWLINE@@
  // Register the schema. This would generally have been done somewhere else.
  // You can also skip this step and let serialize automatically register schemas
  // using autoRegisterSchemas=true, but that is NOT recommended in production.
  await client.registerSchema(schemaDescription);
  //@@TS-MAGIC-NEWLINE@@
  // Create a new serializer backed by the client
  const serializer = new SchemaRegistryAvroSerializer(client, group);
  //@@TS-MAGIC-NEWLINE@@
  // serialize an object that matches the schema
  const value = { firstName: "Jane", lastName: "Doe" };
  const buffer = await serializer.serialize(value, schema);
  console.log("Serialized:");
  console.log(buffer);
  //@@TS-MAGIC-NEWLINE@@
  // deserialize the result back to an object
  const deserializedValue = await serializer.deserialize(buffer);
  console.log("Deserialized:");
  console.log(`${deserializedValue.firstName} ${deserializedValue.lastName}`);
}
//@@TS-MAGIC-NEWLINE@@
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
