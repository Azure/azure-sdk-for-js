// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of SchemaRegistryAvroSerializer to serialize and deserialize using schema from Schema Registry.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { SchemaRegistryClient, SchemaDescription } from "@azure/schema-registry";
import { SchemaRegistryAvroSerializer } from "@azure/schema-registry-avro";

// Load the .env file if it exists
import * as dotenv from "dotenv";
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

// Matching TypeScript interface for schema
interface User {
  firstName: string;
  lastName: string;
}

const schema = JSON.stringify(schemaObject);

// Description of the schema for registration
const schemaDescription: SchemaDescription = {
  name: `${schemaObject.namespace}.${schemaObject.name}`,
  groupName,
  serializationType: "avro",
  content: schema
};

export async function main() {
  // Create a new client
  const client = new SchemaRegistryClient(endpoint, new DefaultAzureCredential());

  // Register the schema. This would generally have been done somewhere else.
  // You can also skip this step and let serialize automatically register schemas
  // using autoRegisterSchemas=true, but that is NOT recommended in production.
  await client.registerSchema(schemaDescription);

  // Create a new serializer backed by the client
  const serializer = new SchemaRegistryAvroSerializer(client, groupName);

  // serialize an object that matches the schema
  const value: User = { firstName: "Jane", lastName: "Doe" };
  const buffer = await serializer.serialize(value, schema);
  console.log("Serialized:");
  console.log(buffer);

  // deserialize the result back to an object
  const deserializedValue = (await serializer.deserialize(buffer)) as User;
  console.log("Deserialized:");
  console.log(`${deserializedValue.firstName} ${deserializedValue.lastName}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
