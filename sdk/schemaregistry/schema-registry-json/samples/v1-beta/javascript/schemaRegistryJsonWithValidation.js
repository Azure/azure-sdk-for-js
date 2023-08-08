// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of JsonSerializer to create messages with json-serialized payload using schema from Schema Registry with validation using a third party library.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient, KnownSchemaFormats } = require("@azure/schema-registry");
const { JsonSerializer } = require("@azure/schema-registry-json");

const Ajv = require("ajv").default;
// Load the .env file if it exists
require("dotenv").config();

// The fully qualified namespace for schema registry
const schemaRegistryFullyQualifiedNamespace =
  process.env["SCHEMA_REGISTRY_ENDPOINT"] || "<endpoint>";

// The schema group to use for schema registration or lookup
const groupName = process.env["SCHEMA_REGISTRY_GROUP"] || "AzureSdkSampleGroup";

// Sample Json Schema for user with first and last names
const schemaObject = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "user",
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

const schema = JSON.stringify(schemaObject);

// Description of the schema for registration
const schemaDescription = {
  name: schemaObject.$id,
  groupName,
  format: KnownSchemaFormats.Json,
  definition: schema,
};

async function main() {
  // Create a new client
  const client = new SchemaRegistryClient(
    schemaRegistryFullyQualifiedNamespace,
    new DefaultAzureCredential()
  );

  // Register the schema. This would generally have been done somewhere else.
  await client.registerSchema(schemaDescription);

  // Create a new serializer backed by the client
  const serializer = new JsonSerializer(client, { groupName });

  // serialize an object that matches the schema and put it in a message
  const value = { firstName: "Jane", lastName: "Doe" };
  const message = await serializer.serialize(value, schema);
  console.log("Created message:");
  console.log(JSON.stringify(message));

  // Validation using a third party library
  const ajv = new Ajv();
  const validator = ajv.compile(JSON.parse(schema));
  let validators = new Map();
  validators.set(schema, validator);

  const validateOptions = {
    validateCallback(value, schema) {
      const validator = validators.get(schema);
      if (validator) {
        const valid = validator(value);
        if (!valid) {
          throw new Error(JSON.stringify(validator.errors));
        }
      }
      throw new Error("Unable to find validator");
    },
  };

  // deserialize the message back to an object with validation
  const deserializedObject = await serializer.deserialize(message, validateOptions);
  console.log("Deserialized object:");
  console.log(JSON.stringify(deserializedObject));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { schemaObject, main };
