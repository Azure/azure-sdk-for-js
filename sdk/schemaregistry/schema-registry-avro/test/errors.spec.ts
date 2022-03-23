// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { AvroSerializer } from "../src/avroSerializer";
import { Context } from "mocha";
import { SchemaRegistry } from "@azure/schema-registry";
import chaiPromises from "chai-as-promised";
import { createTestRegistry } from "./utils/mockedRegistryClient";
import { createTestSerializer } from "./utils/mockedSerializer";
import { isLive } from "./utils/isLive";
import { testGroup } from "./utils/dummies";
import { v4 as uuid } from "uuid";

chaiUse(chaiPromises);

describe("Error scenarios", function () {
  let serializer: AvroSerializer;
  let registry: SchemaRegistry;
  let serializerNoAutoReg: AvroSerializer;
  before(async function () {
    registry = createTestRegistry();
    serializer = await createTestSerializer({
      registry,
      serializerOptions: {
        autoRegisterSchemas: true,
        groupName: testGroup,
      },
    });
    serializerNoAutoReg = await createTestSerializer({
      serializerOptions: {
        autoRegisterSchemas: false,
        groupName: testGroup,
      },
    });
  });
  describe("Schema validation", function () {
    it("unrecognized content type", async function () {
      await assert.isRejected(
        serializer.deserializeMessageData({
          body: Buffer.alloc(1),
          contentType: "application/json+1234",
        }),
        /application\/json.*avro\/binary/
      );
    });
    it("a schema with non-avro format", async function (this: Context) {
      if (isLive) {
        this.skip();
      }
      const schema = await registry.registerSchema({
        name: "_",
        definition: "_",
        format: "NotAvro",
        groupName: testGroup,
      });
      await assert.isRejected(
        serializer.deserializeMessageData({
          body: Buffer.alloc(1),
          contentType: `avro/binary+${schema.id}`,
        }),
        new RegExp(`${schema.id}.*NotAvro.*avro`)
      );
    });
    it("schema to serialize with is not found", async function () {
      const schema = JSON.stringify({
        type: "record",
        name: "NeverRegistered",
        namespace: "my.example",
        fields: [{ name: "count", type: "int" }],
      });
      await assert.isRejected(
        serializerNoAutoReg.serializeMessageData({ count: 42 }, schema),
        /not found/
      );
    });
    it("schema to deserialize with is not found", async function () {
      await assert.isRejected(
        serializerNoAutoReg.deserializeMessageData({
          body: Uint8Array.from([0]),
          contentType: `avro/binary+${uuid()}`,
        }),
        /does not exist/
      );
    });
    it("incompatible reader schema", async function () {
      const writerSchema = {
        type: "record",
        name: "AvroUser",
        namespace: "validation",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "favoriteNumber",
            type: "int",
          },
        ],
      };
      const incompatibleReaderSchema = {
        type: "record",
        name: "AvroUser",
        namespace: "validation",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "age",
            type: "int",
          },
        ],
      };
      const message = await serializer.serializeMessageData(
        {
          name: "",
          favoriteNumber: 1,
        },
        JSON.stringify(writerSchema)
      );
      assert.isRejected(
        serializer.deserializeMessageData(message, {
          schema: JSON.stringify(incompatibleReaderSchema),
        }),
        /no matching field for default-less validation.AvroUser.age/
      );
    });
    it("null schema", async function () {
      await assert.isRejected(
        /**
         * The type checking will prevent this from happening but I am including
         * it for completeness.
         */
        serializer.serializeMessageData(null, null as any),
        /invalid type: null/
      );
    });
    it("schema without a name", async function () {
      /**
       * The serializer expects a record schema as the top-level schema
       */
      await assert.isRejected(
        serializer.serializeMessageData(
          null,
          JSON.stringify({
            type: "array",
            items: "int",
          })
        ),
        /Schema must have a name/
      );
    });
    it("enum schema without symbols", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          null,
          JSON.stringify({
            type: "record",
            name: "foo",
            fields: [
              {
                name: "enum",
                type: {
                  type: "enum",
                },
              },
            ],
          })
        ),
        /invalid enum symbols: undefined/
      );
    });
    it("fixed schema without size", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          null,
          JSON.stringify({
            type: "record",
            name: "foo",
            fields: [
              {
                name: "fixed",
                type: {
                  type: "fixed",
                },
              },
            ],
          })
        ),
        /invalid fixed size/
      );
    });
    it("array schema without items", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          null,
          JSON.stringify({
            type: "record",
            name: "foo",
            fields: [
              {
                name: "array",
                type: {
                  type: "array",
                },
              },
            ],
          })
        ),
        /missing array items: {"type":"array"}/
      );
    });
    it("map schema without values", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          null,
          JSON.stringify({
            type: "record",
            name: "foo",
            fields: [
              {
                name: "map",
                type: {
                  type: "map",
                },
              },
            ],
          })
        ),
        /missing map values: {"type":"map"}/
      );
    });
    it("record schema without fields", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          null,
          JSON.stringify({
            type: "record",
            name: "foo",
          })
        ),
        /non-array record fields: undefined/
      );
    });
  });
  describe("Unserialized value validation", function () {
    it("schema is not registered if serialization fails", async function () {
      const unusedRegistry = createTestRegistry({
        registerSchemaOptions: {
          onResponse: () => assert.fail(`unexpected service call`),
        },
      });
      const customSerializer = await createTestSerializer({
        registry: unusedRegistry,
        serializerOptions: {
          autoRegisterSchemas: true,
          groupName: testGroup,
        },
      });
      await assert.isRejected(
        customSerializer.serializeMessageData(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "null",
              },
            ],
          })
        ),
        /invalid "null": 1/
      );
    });
    it("null", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "null",
              },
            ],
          })
        ),
        /invalid "null": 1/
      );
    });
    it("boolean", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "boolean",
              },
            ],
          })
        ),
        /invalid "boolean": 1/
      );
    });
    it("int", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: null,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "int",
              },
            ],
          })
        ),
        /invalid "int": null/
      );
    });
    it("long", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: 9007199254740991,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "long",
              },
            ],
          })
        ),
        /invalid "long": 9007199254740991/
      );
    });
    it("float", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: "",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "float",
              },
            ],
          })
        ),
        /invalid "float": ""/
      );
    });
    it("double", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: "",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "double",
              },
            ],
          })
        ),
        /invalid "double": ""/
      );
    });
    it("string", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "string",
              },
            ],
          })
        ),
        /invalid "string": 1/
      );
    });
    it("bytes", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "bytes",
              },
            ],
          })
        ),
        /invalid "bytes": 1/
      );
    });
    it("union", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: ["null", "string"],
              },
            ],
          })
        ),
        /invalid \["null","string"\]: 1/
      );
    });
    it("enum", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: "x",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: {
                  type: "enum",
                  name: "foo",
                  symbols: ["A", "B"],
                },
              },
            ],
          })
        ),
        /invalid {"name":"validation.foo","type":"enum","symbols":\["A","B"\]}: "x"/
      );
    });
    it("fixed", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: "x",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: {
                  type: "fixed",
                  name: "foo",
                  size: 16,
                },
              },
            ],
          })
        ),
        /invalid {"name":"validation.foo","type":"fixed","size":16}: "x"/
      );
    });
    it("map", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: "x",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: {
                  type: "map",
                  /**
                   * Map keys are assumed to be strings.
                   */
                  values: "long",
                  default: {},
                },
              },
            ],
          })
        ),
        /invalid {"type":"map","values":"long"}: "x"/
      );
    });
    it("array", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          {
            field: "x",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: {
                  type: "array",
                  /**
                   * Map keys are assumed to be strings.
                   */
                  items: "long",
                  default: [],
                },
              },
            ],
          })
        ),
        /invalid {"type":"array","items":"long"}: "x"/
      );
    });
    it("record", async function () {
      await assert.isRejected(
        serializer.serializeMessageData(
          "x",
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "int",
              },
            ],
          })
        ),
        /invalid "int": undefined/
      );
    });
  });
  describe("Serialized value validation", function () {
    it("record", async function () {
      const serializedValue = await serializer.serializeMessageData(
        {
          field1: 1,
          field2: "x",
        },
        JSON.stringify({
          type: "record",
          name: "User",
          namespace: "validation",
          fields: [
            {
              name: "field1",
              type: "int",
            },
            {
              name: "field2",
              type: "string",
            },
          ],
        })
      );
      assert.deepEqual(serializedValue.body, Uint8Array.from([2, 2, 120]));
      serializedValue.body = Buffer.from([2, 2]);
      await assert.isRejected(
        serializer.deserializeMessageData(serializedValue),
        /truncated buffer/
      );
      serializedValue.body = Buffer.from([2, 2, 120, 5]);
      await assert.isRejected(serializer.deserializeMessageData(serializedValue), /trailing data/);
    });
    it("long", async function () {
      const serializedValue = await serializer.serializeMessageData(
        {
          field: 9007199254740990,
        },
        JSON.stringify({
          type: "record",
          name: "User",
          namespace: "validation",
          fields: [
            {
              name: "field",
              type: "long",
            },
          ],
        })
      );
      assert.deepEqual(
        serializedValue.body,
        Uint8Array.from([252, 255, 255, 255, 255, 255, 255, 31])
      );
      serializedValue.body = Uint8Array.from([252, 255, 255, 255, 255, 255, 255, 32]);
      await assert.isRejected(
        serializer.deserializeMessageData(serializedValue),
        /potential precision loss/
      );
    });
    it("union", async function () {
      const serializedValue = await serializer.serializeMessageData(
        {
          field: "x",
        },
        JSON.stringify({
          type: "record",
          name: "User",
          namespace: "validation",
          fields: [
            {
              name: "field",
              type: ["null", "string"],
            },
          ],
        })
      );
      assert.deepEqual(serializedValue.body, Uint8Array.from([2, 2, 120]));
      serializedValue.body = Uint8Array.from([5, 2, 120]);
      await assert.isRejected(
        serializer.deserializeMessageData(serializedValue),
        /invalid union index: -3/
      );
    });
    it("enum", async function () {
      const serializedValue = await serializer.serializeMessageData(
        {
          field: "A",
        },
        JSON.stringify({
          type: "record",
          name: "User",
          namespace: "validation",
          fields: [
            {
              name: "field",
              type: {
                type: "enum",
                name: "foo",
                symbols: ["A", "B"],
              },
            },
          ],
        })
      );
      assert.deepEqual(serializedValue.body, Uint8Array.from([0]));
      serializedValue.body = Uint8Array.from([10]);
      await assert.isRejected(
        serializer.deserializeMessageData(serializedValue),
        /invalid validation.foo enum index: 5/
      );
    });
  });
});
