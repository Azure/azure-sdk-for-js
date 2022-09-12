// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a SchemaRegistryClient to register and retrieve schema.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { SchemaRegistryClient, SchemaDescription } from "@azure/schema-registry";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Set these environment variables or edit the following values
const fullyQualifiedNamespace =
  process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<fullyQualifiedNamespace>";
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

const name = `${schemaObject.namespace}-${schemaObject.name}`;

// Description of the schema for registration
const schemaDescription: SchemaDescription = {
  name,
  groupName,
  format: "Avro",
  definition: JSON.stringify(schemaObject),
};

export async function main() {
  // Create a new client
  const client = new SchemaRegistryClient(fullyQualifiedNamespace, new DefaultAzureCredential());

  // Register a schema and get back its ID.
  const { id, version } = await client.registerSchema(schemaDescription);
  console.log(
    `Registered schema with the following properties:\n- ID=${id}\n- Version: ${version}`
  );

  // Get definition of existing schema by its ID
  const foundSchema = await client.getSchema(id);
  if (foundSchema) {
    console.log(`Got schema definition=${foundSchema.definition}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
