// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SchemaRegistryClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new SchemaRegistryClient(
      "<fullyQualifiedNamespace>",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleRegisterSchema", async () => {
    const client = new SchemaRegistryClient(
      "<fullyQualifiedNamespace>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const description = {
      name: "<name>",
      groupName: "<group name>",
      format: "<schema format>",
      definition: "<schema definition>",
    };
    // @ts-preserve-whitespace
    const registered = await client.registerSchema(description);
    console.log(`Registered schema id: ${registered}`);
  });

  it("ReadmeSampleGetSchemaId", async () => {
    const client = new SchemaRegistryClient(
      "<fullyQualifiedNamespace>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const description = {
      name: "<name>",
      groupName: "<group name>",
      format: "<schema format>",
      definition: "<schema definition>",
    };
    // @ts-preserve-whitespace
    const found = await client.getSchemaProperties(description);
    if (found) {
      console.log(`Got schema ID ${found.id}`);
    }
  });

  it("ReadmeSampleGetSchemaById", async () => {
    const client = new SchemaRegistryClient(
      "<fullyQualifiedNamespace>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const foundSchema = await client.getSchema("<id>");
    if (foundSchema) {
      console.log(`Got schema definition ${foundSchema.definition}`);
    }
  });

  it("ReadmeSampleGetSchemaByVersion", async () => {
    const client = new SchemaRegistryClient(
      "<fullyQualifiedNamespace>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const foundSchema = await client.getSchema("<schema name>", "<group name>", 1);
    if (foundSchema) {
      console.log(`Got schema definition=${foundSchema.definition}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
