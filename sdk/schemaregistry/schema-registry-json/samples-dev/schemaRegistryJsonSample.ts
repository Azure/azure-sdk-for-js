// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of JsonSerializer to create messages with json-serialized payload using schema from Schema Registry.
 */

import { DefaultAzureCredential } from "@azure/identity";
import {
  SchemaRegistryClient,
  SchemaDescription,
  KnownSchemaFormats,
} from "@azure/schema-registry";
import { JsonSerializer } from "@azure/schema-registry-json";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// The fully qualified namespace for schema registry
const schemaRegistryFullyQualifiedNamespace =
  process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";

// The schema group to use for schema registration or lookup
const groupName = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";

// Sample Json Schema for user with first and last names
export const schemaObject = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://example.com/product.schema.json",
  title: "User",
  description: "A user for the product",
  type: "object",
  properties: {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
  },
};

// Matching TypeScript interface for schema
interface User {
  firstName: string;
  lastName: string;
}

const schema = JSON.stringify(schemaObject);

// Description of the schema for registration
const schemaDescription: SchemaDescription = {
  name: schemaObject.$id,
  groupName,
  format: KnownSchemaFormats.Json,
  definition: schema,
};

export async function main() {
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
  const serializer = new JsonSerializer(client, { groupName });

  // serialize an object that matches the schema and put it in a message
  const value: User = { firstName: "Jane", lastName: "Doe" };
  const message = await serializer.serialize(value, schema);
  console.log("Created message:");
  console.log(JSON.stringify(message));

  // deserialize the message back to an object
  const deserializedObject = await serializer.deserialize(message);
  console.log("Deserialized object:");
  console.log(JSON.stringify(deserializedObject as User));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
