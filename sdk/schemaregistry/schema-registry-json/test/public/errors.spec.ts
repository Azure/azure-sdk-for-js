// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "@azure-tools/test-utils";
import { JsonSchemaSerializer } from "../../src";
import { Context } from "mocha";
import { SchemaRegistry } from "@azure/schema-registry";
import { assertError } from "./utils/assertError";
import { createTestRegistry } from "./utils/mockedRegistryClient";
import { createTestSerializer, registerTestSchema } from "./utils/mockedSerializer";
import { createContentType, testGroup, testSchema } from "./utils/dummies";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { randomUUID } from "@azure/core-util";

describe("Error scenarios", function () {
  let serializer: JsonSchemaSerializer;
  let registry: SchemaRegistry;
  let recorder: Recorder;

  beforeEach(async function () {
    recorder = new Recorder(this.currentTest);
    registry = createTestRegistry({ recorder });
    serializer = await createTestSerializer({
      registry,
      serializerOptions: {
        groupName: testGroup,
      },
      recorder,
    });
  });

  describe("Schema validation", function () {
    it("unrecognized content type", async function () {
      await assert.isRejected(
        serializer.deserialize({
          data: new Uint8Array(1),
          contentType: "avro/binary+1234",
        }),
        /avro\/binary.*application\/json/,
      );
    });
    it("a schema with non-json format", async function (this: Context) {
      await assert.isRejected(
        registry.registerSchema({
          name: "Name",
          definition: "Definition",
          format: "notjson",
          groupName: testGroup,
        }),
        /Invalid schema type for PUT request.*notjson/,
      );
    });
    it("schema to serialize with is not found", async function () {
      const schema = JSON.stringify({
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "student",
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the student",
          },
        },
      });
      await assert.isRejected(serializer.serialize({ name: "Bob" }, schema), /not found/);
    });
    it("schema to deserialize with is not found", async function () {
      await assert.isRejected(
        serializer.deserialize({
          data: Uint8Array.from([0]),
          contentType: createContentType(randomUUID()),
        }),
        /does not exist/,
      );
    });
    it("invalid schema at time of deserializing", async function (this: Context) {
      /**
       * This test can not run in live mode because the service will validate the schema.
       */
      if (isLiveMode()) {
        this.skip();
      }
      const id = await registerTestSchema(registry);
      const { data } = await serializer.serialize(
        {
          name: "",
          favoriteNumber: 1,
        },
        testSchema,
      );
      await assertError(
        serializer.deserialize({
          data,
          contentType: createContentType(id),
        }),
        {
          causeMessage: /Unexpected end of JSON input/,
        },
      );
    });
    it("not JSON schema", async function () {
      await assertError(serializer.serialize(null, ""), {
        causeMessage: /Unexpected end of JSON input/,
      });
    });
    it("null schema", async function () {
      await assertError(
        /**
         * The type checking will prevent this from happening but I am including
         * it for completeness.
         */
        serializer.serialize(null, null as any),
        {
          causeMessage: /invalid type: null/,
        },
      );
    });
    it("schema with invalid enum", async function () {
      if (!isLiveMode()) {
        this.skip();
      }
      const schema = JSON.stringify({
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "studentTest",
        title: "Student",
        description: "A student in the class",
        type: "object",
        properties: {
          name: {
            type: "array",
            items: {
              type: "string",
              enum: "string",
            },
          },
        },
        required: ["name"],
      });
      await assertError(
        registry.registerSchema({
          groupName: testGroup,
          name: `studentTest`,
          format: "json",
          definition: schema,
        }),
        {
          message: /Unexpected token encountered when reading value for 'enum'/,
        },
      );
    });
    it("schema without an ID", async function () {
      await assertError(
        serializer.serialize(
          null,
          JSON.stringify({
            $schema: "https://json-schema.org/draft/2020-12/schema",
            title: "Student",
            description: "A student in the class",
            type: "string",
          }),
        ),
        {
          message: /Schema must have an ID/,
        },
      );
    });
    it("schema with invalid ID", async function () {
      if (!isLiveMode()) {
        this.skip();
      }
      await assertError(
        serializer.serialize(
          null,
          JSON.stringify({
            $schema: "https://json-schema.org/draft/2020-12/schema",
            $id: "https://example.com/product.schema.json",
          }),
        ),
        {
          message: /contain invalid characters/,
        },
      );
    });
    it("schema with invalid type", async function () {
      if (!isLiveMode()) {
        this.skip();
      }

      const schema = JSON.stringify({
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: "student",
        title: "Student",
        description: "A student in the class",
        type: "none",
      });

      await assertError(
        registry.registerSchema({
          groupName: testGroup,
          name: `studentTest`,
          format: "json",
          definition: schema,
        }),
        {
          message: /Invalid JSON schema type: none/,
        },
      );
    });
    it("parsing json errors", async function () {
      await registerTestSchema(registry);
      const serializedValue = await serializer.serialize(
        {
          favoriteNumber: 1,
          name: "x",
        },
        testSchema,
      );
      assert.deepEqual(
        serializedValue.data,
        Uint8Array.from([
          123, 34, 102, 97, 118, 111, 114, 105, 116, 101, 78, 117, 109, 98, 101, 114, 34, 58, 49,
          44, 34, 110, 97, 109, 101, 34, 58, 34, 120, 34, 125,
        ]),
      );
      serializedValue.data = Uint8Array.from([
        123, 34, 102, 97, 118, 111, 114, 105, 116, 101, 78, 117, 109, 98, 101, 114,
      ]);

      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /[Unexpected end of JSON input]|[Unterminated string in JSON at position]/,
      });
      serializedValue.data = Uint8Array.from([
        123, 34, 102, 97, 118, 111, 114, 105, 116, 101, 78, 117, 109, 98, 101, 114, 34, 58, 49, 44,
        34, 110, 97, 109, 101, 34, 58, 34, 120, 34, 125, 110,
      ]);
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage:
          /[Unexpected token n in JSON at position]|[Unexpected non-whitespace character]/,
      });
    });
  });
});
