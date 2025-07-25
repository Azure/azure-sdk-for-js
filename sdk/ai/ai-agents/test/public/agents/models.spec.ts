// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  agentsResponseFormatOptionSerializer,
  agentsResponseFormatOptionDeserializer,
  type AgentsResponseFormat,
  type ResponseFormatJsonSchemaType,
  type ResponseFormatJsonSchema,
  type AgentsResponseFormatMode,
} from "../../../src/models/models.js";

describe("AgentsResponseFormatOption Serialization", () => {
  describe("agentsResponseFormatOptionSerializer", () => {
    it("should serialize string values directly", () => {
      const input = "text";
      const result = agentsResponseFormatOptionSerializer(input);
      assert.strictEqual(result, "text");
    });

    it("should serialize AgentsResponseFormatMode values directly", () => {
      const autoMode: AgentsResponseFormatMode = "auto";
      const noneMode: AgentsResponseFormatMode = "none";

      assert.strictEqual(agentsResponseFormatOptionSerializer(autoMode), "auto");
      assert.strictEqual(agentsResponseFormatOptionSerializer(noneMode), "none");
    });

    it("should serialize AgentsResponseFormat objects directly", () => {
      const format: AgentsResponseFormat = {
        type: "text",
      };

      const result = agentsResponseFormatOptionSerializer(format);
      assert.deepStrictEqual(result, { type: "text" });
    });

    it("should serialize AgentsResponseFormat with json_object type", () => {
      const format: AgentsResponseFormat = {
        type: "json_object",
      };

      const result = agentsResponseFormatOptionSerializer(format);
      assert.deepStrictEqual(result, { type: "json_object" });
    });

    it("should serialize ResponseFormatJsonSchemaType using responseFormatJsonSchemaTypeSerializer", () => {
      const jsonSchema: ResponseFormatJsonSchema = {
        name: "test_schema",
        description: "A test schema",
        schema: {
          type: "object",
          properties: {
            name: { type: "string" },
            age: { type: "number" },
          },
          required: ["name"],
        },
      };

      const format: ResponseFormatJsonSchemaType = {
        type: "json_schema",
        jsonSchema,
      };

      const result = agentsResponseFormatOptionSerializer(format);
      assert.deepStrictEqual(result, {
        type: "json_schema",
        json_schema: {
          name: "test_schema",
          description: "A test schema",
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              age: { type: "number" },
            },
            required: ["name"],
          },
        },
      });
    });
  });

  describe("agentsResponseFormatOptionDeserializer", () => {
    it("should deserialize string values directly", () => {
      const input = "text";
      const result = agentsResponseFormatOptionDeserializer(input);
      assert.strictEqual(result, "text");
    });

    it("should deserialize AgentsResponseFormatMode strings directly", () => {
      assert.strictEqual(agentsResponseFormatOptionDeserializer("auto"), "auto");
      assert.strictEqual(agentsResponseFormatOptionDeserializer("none"), "none");
    });

    it("should deserialize objects without json_schema type directly", () => {
      const input = { type: "text" };
      const result = agentsResponseFormatOptionDeserializer(input);
      assert.deepStrictEqual(result, { type: "text" });
    });

    it("should deserialize objects with json_object type directly", () => {
      const input = { type: "json_object" };
      const result = agentsResponseFormatOptionDeserializer(input);
      assert.deepStrictEqual(result, { type: "json_object" });
    });

    it("should deserialize json_schema type using responseFormatJsonSchemaTypeDeserializer", () => {
      const input = {
        type: "json_schema",
        json_schema: {
          name: "test_schema",
          description: "A test schema",
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              age: { type: "number" },
            },
            required: ["name"],
          },
        },
      };

      const result = agentsResponseFormatOptionDeserializer(input);
      assert.deepStrictEqual(result, {
        type: "json_schema",
        jsonSchema: {
          name: "test_schema",
          description: "A test schema",
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              age: { type: "number" },
            },
            required: ["name"],
          },
        },
      });
    });
  });
});
