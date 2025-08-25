// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AvroSerializer } from "@azure/schema-registry-avro";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { SchemaRegistryClient } from "@azure/schema-registry";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSample_SerializeDeserializeEventHubMessage", async () => {
    // The schema group to use for schema registration or lookup
    const groupName = "AzureSdkSampleGroup";
    // @ts-preserve-whitespace
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
    // @ts-preserve-whitespace
    const schema = JSON.stringify(schemaObject);
    // @ts-preserve-whitespace
    // Description of the schema for registration
    const schemaDescription = {
      name: `${schemaObject.namespace}.${schemaObject.name}`,
      groupName,
      format: "Avro",
      definition: schema,
    };
    // @ts-preserve-whitespace
    // Create a new client
    const client = new SchemaRegistryClient("<endpoint>", new DefaultAzureCredential());
    // @ts-preserve-whitespace
    // Register the schema. This would generally have been done somewhere else.
    // You can also skip this step and let `serialize` automatically register
    // schemas using autoRegisterSchemas=true, but that is NOT recommended in production.
    await client.registerSchema(schemaDescription);
    // @ts-preserve-whitespace
    // Create a new serializer backed by the client
    const serializer = new AvroSerializer(client, { groupName });
    // @ts-preserve-whitespace
    // serialize an object that matches the schema and put it in a message
    const value = { firstName: "Jane", lastName: "Doe" };
    const message = await serializer.serialize(value, schema);
    console.log("Created message:");
    console.log(JSON.stringify(message));
    // @ts-preserve-whitespace
    // deserialize the message back to an object
    const deserializedObject = await serializer.deserialize(message);
    console.log("Deserialized object:");
    console.log(JSON.stringify(deserializedObject));
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
