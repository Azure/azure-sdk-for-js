// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { JsonSerializer } from "../../src";
import { Context } from "mocha";
import { SchemaRegistry } from "@azure/schema-registry";
import { assertError } from "./utils/assertError";
import chaiPromises from "chai-as-promised";
import { createTestRegistry } from "./utils/mockedRegistryClient";
import { createTestSerializer } from "./utils/mockedSerializer";
import { testGroup, testSchemaObject } from "./utils/dummies";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { v4 as uuid } from "uuid";

chaiUse(chaiPromises);

describe("Error scenarios", function () {
  let serializer: JsonSerializer;
  let serializerNoAutoReg: JsonSerializer;
  let registry: SchemaRegistry;
  let recorder: Recorder;

  beforeEach(async function () {
    recorder = new Recorder(this.currentTest);
    registry = createTestRegistry({ recorder });
    serializer = await createTestSerializer({
      registry,
      serializerOptions: {
        autoRegisterSchemas: true,
        groupName: testGroup,
      },
      recorder,
    });
    serializerNoAutoReg = await createTestSerializer({
      serializerOptions: {
        autoRegisterSchemas: false,
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
        /avro\/binary.*application\/json/
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
        /Invalid schema type for PUT request.*notjson/
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
        }
      });
      await assert.isRejected(serializerNoAutoReg.serialize({ name: "Bob" }, schema), /not found/);
    });
    it("schema to deserialize with is not found", async function () {
      await assert.isRejected(
        serializerNoAutoReg.deserialize({
          data: Uint8Array.from([0]),
          contentType: `application/json+${uuid()}`,
        }),
        /does not exist/
      );
    });
    it("invalid schema at time of deserializing", async function (this: Context) {
      /**
       * This test can not run in live mode because the service will validate the schema.
       */
      if (isLiveMode()) {
        this.skip();
      }
      const { id } = await registry.registerSchema({
        definition: "",
        format: "json",
        groupName: testGroup,
        name: "test",
      });
      const { data } = await serializer.serialize(
        {
          name: "",
          favoriteNumber: 1,
        },
        JSON.stringify(testSchemaObject)
      ); serializer.deserialize({
        data,
        contentType: `application/json+${id}`,
      })
      await assertError(
        serializer.deserialize({
          data,
          contentType: `application/json+${id}`,
        }),
        {
          causeMessage: /Unexpected end of JSON input/,
        }
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
        }
      );
    });
    it("schema with invalid enum", async function () {
      await assertError(
        serializer.serialize(
          null,
          JSON.stringify({
            $schema: "http://json-schema.org/draft-04/schema#",
            $id: "student",
            title: "Student",
            description: "A student in the class",
            type: "object",
            properties: {
              name: {
                type: "array",
                items: {
                  type: "string",
                  enum: "string"
                }
              },
            },
            required: ["name"]
          })
        ),
        {
          message: /Unexpected token encountered when reading value for 'enum'/,
        }
      );
    });
    it("schema without an ID", async function () {
      await assertError(
        serializer.serialize(
          null,
          JSON.stringify({
            $schema: "http://json-schema.org/draft-04/schema#",
            title: "Student",
            description: "A student in the class",
            type: "string",
          }

          )
        ),
        {
          message: /Schema must have an ID/,
        }
      );
    });
    it("schema with invalid type", async function () {
      await assertError(
        serializer.serialize(
          {
            name: "Anne"
          },
          JSON.stringify({
            $schema: "http://json-schema.org/draft-04/schema#",
            $id: "student",
            title: "Student",
            description: "A student in the class",
            type: "none",
          })
        ),
        {
          message: /Invalid JSON schema type: none/,
        }
      );
    });
  });
});
