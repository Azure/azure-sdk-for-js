// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a SchemaRegistryClient to register and retrieve schema.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");

// Load the .env file if it exists
require("dotenv").config();

// Set these environment variables or edit the following values
const fullyQualifiedNamespace =
  process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<fullyQualifiedNamespace>";
const group = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";

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

// Description of the schema for registration
const schemaDescription = {
  name: `${schemaObject.namespace}-${schemaObject.name}`,
  groupName: group,
  format: "Avro",
  definition: JSON.stringify(schemaObject),
};

async function main() {
  // Create a new client
  const client = new SchemaRegistryClient(fullyQualifiedNamespace, new DefaultAzureCredential());

  // Register a schema and get back its ID.
  const registered = await client.registerSchema(schemaDescription);
  console.log(`Registered schema with ID=${registered.id}`);

  // Get ID for existing schema by its description.
  // Note that this would throw if it had not been previously registered.
  const found = await client.getSchemaProperties(schemaDescription);
  if (found) {
    console.log(`Got schema ID=${found.id}`);
  }

  // Get definition of existing schema by its ID
  const foundSchema = await client.getSchema(registered.id);
  if (foundSchema) {
    console.log(`Got schema definition=${foundSchema.definition}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
