// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createEventDataAdapter } from "@azure/event-hubs";
import { JsonSchemaSerializer } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { SchemaRegistryClient } from "@azure/schema-registry";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleSerializeDeserialize", async () => {
    const client = new SchemaRegistryClient(
      "<fully qualified namespace>",
      new DefaultAzureCredential(),
    );
    const serializer = new JsonSchemaSerializer(client, {
      groupName: "<group>",
      messageAdapter: createEventDataAdapter(),
    });
    // @ts-preserve-whitespace
    // Example Json schema
    const schema = JSON.stringify({
      $schema: "http://json-schema.org/draft-04/schema#",
      $id: "person",
      title: "Student",
      description: "A student in the class",
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the student",
        },
      },
      required: ["name"],
    });
    // @ts-preserve-whitespace
    // Example value that matches the Json schema above
    const value = { name: "Bob" };
    // @ts-preserve-whitespace
    // Serialize value to a message
    const message = await serializer.serialize(value, schema);
    // @ts-preserve-whitespace
    // Deserialize a message to value
    const deserializedValue = await serializer.deserialize(message);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
