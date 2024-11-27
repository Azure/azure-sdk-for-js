// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { env } from "@azure-tools/test-recorder";

export const testSchemaObject = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "student",
  title: "Student",
  description: "A student in the class",
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "The name of the student",
    },
    favoriteNumber: {
      type: "integer",
      description: "The favorite number of the student",
    },
  },
  required: ["name"],
};

export const testGroup = env.SCHEMA_REGISTRY_GROUP || "azsdk_js_test_group";

export const testSchemaIds = [
  "{773E17BE-793E-40B0-98F1-0A6EA3C11895}",
  "{DC7EF290-CDB1-4245-8EE8-3DD52965866E}",
].map((x) => x.replace(/[{\-}]/g, ""));

export const testSchema = JSON.stringify(testSchemaObject);
export const testValue = { name: "Nick", favoriteNumber: 42 };

export const encoder = new TextEncoder();
export const decoder = new TextDecoder();

export function createContentType(id: string): string {
  return `application/json+${id}`;
}
