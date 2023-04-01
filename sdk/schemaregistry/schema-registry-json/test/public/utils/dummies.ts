// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure-tools/test-recorder";
import Ajv, { SchemaObject } from "ajv/dist/jtd";

export const testSchemaObject: SchemaObject = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://example.com/product.schema.json",
  title: "Product",
  description: "A product from Acme's catalog",
  type: "object",
  properties: {
    name: {
      type: "string",
      required: true,
    },
    favoriteNumber: {
      type: "integer",
      required: true,
    },
  },
};

export const testGroup = env.SCHEMA_REGISTRY_GROUP || "azsdk_js_test_group";

export const testSchemaIds = [
  "{773E17BE-793E-40B0-98F1-0A6EA3C11895}",
  "{DC7EF290-CDB1-4245-8EE8-3DD52965866E}",
].map((x) => x.replace(/[{\-}]/g, ""));

export const testSchema = JSON.stringify(testSchemaObject);
export const testValue = { name: "Nick", favoriteNumber: 42 };
const ajv = new Ajv();
export function createSerializer(schema: SchemaObject): ReturnType<Ajv["compileSerializer"]> {
  return ajv.compileSerializer(schema);
}
export function createDeserializer(schema: SchemaObject): ReturnType<Ajv["compileParser"]> {
  return ajv.compileParser(schema);
}
export const testSerialize = createSerializer(testSchemaObject);
export const testDeserialize = createDeserializer(testSchemaObject);
export const encoder = new TextEncoder();
export const decoder = new TextDecoder();