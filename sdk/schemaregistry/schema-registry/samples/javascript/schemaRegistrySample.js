// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// Set these environment variables or edit the following values
const endpoint = process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";
const group = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";

// Sample Avro Schema for user with first and last names
const schema = {
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

// Description of the schema for registration
const description = {
  name: `${schema.namespace}.${schema.name}`,
  group,
  serializationType: "avro",
  content: JSON.stringify(schema)
};

async function main() {
  // Create a new client
  const client = new SchemaRegistryClient(endpoint, new DefaultAzureCredential());

  // Register a schema and get back its ID.
  const registered = await client.registerSchema(description);
  console.log(`Registered schema with ID=${registered.id}`);

  // Get ID for exisiting schema by its description.
  // Note that this would throw if it had not been previously registered.
  const found = await client.getSchemaId(description);
  console.log(`Got schema ID=${found.id}`);

  // Get content of existing schema by its ID
  const foundSchema = await client.getSchemaById(registered.id);
  console.log(`Got schema content=${foundSchema.content}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
