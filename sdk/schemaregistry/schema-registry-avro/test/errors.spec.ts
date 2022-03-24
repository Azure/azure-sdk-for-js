// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { AvroSerializationError } from "../src/models";
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

async function assertError<T>(
  p: Promise<T>,
  expectations: {
    innerMessage?: RegExp;
    message?: RegExp;
  } = {}
): Promise<void> {
  const { innerMessage, message } = expectations;
  try {
    await p;
  } catch (e) {
    assert.instanceOf(e, AvroSerializationError);
    const error = e as AvroSerializationError;
    if (message) {
      assert.match(error.message, message);
    }
    if (innerMessage) {
      assert.isDefined(error.innerError, "innerError is not found");
      const innerError = error.innerError as Error;
      assert.match(innerError.message, innerMessage);
    }
  }
}

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
      await assertError(
        serializer.deserializeMessageData(message, {
          schema: JSON.stringify(incompatibleReaderSchema),
        }),
        {
          innerMessage: /no matching field for default-less validation.AvroUser.age/,
        }
      );
    });
    it("null schema", async function () {
      await assertError(
        /**
         * The type checking will prevent this from happening but I am including
         * it for completeness.
         */
        serializer.serializeMessageData(null, null as any),
        {
          innerMessage: /invalid type: null/,
        }
      );
    });
    it("schema without a name", async function () {
      /**
       * The serializer expects a record schema as the top-level schema
       */
      await assertError(
        serializer.serializeMessageData(
          null,
          JSON.stringify({
            type: "array",
            items: "int",
          })
        ),
        {
          message: /Schema must have a name/,
        }
      );
    });
    it("enum schema without symbols", async function () {
      await assertError(
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
        {
          innerMessage: /invalid enum symbols: undefined/,
        }
      );
    });
    it("fixed schema without size", async function () {
      await assertError(
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
        {
          innerMessage: /invalid fixed size/,
        }
      );
    });
    it("array schema without items", async function () {
      await assertError(
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
        {
          innerMessage: /missing array items: {"type":"array"}/,
        }
      );
    });
    it("map schema without values", async function () {
      await assertError(
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
        {
          innerMessage: /missing map values: {"type":"map"}/,
        }
      );
    });
    it("record schema without fields", async function () {
      await assertError(
        serializer.serializeMessageData(
          null,
          JSON.stringify({
            type: "record",
            name: "foo",
          })
        ),
        {
          innerMessage: /non-array record fields: undefined/,
        }
      );
    });
  });
  describe("Unserialized value validation", function () {
    it.skip("schema is not registered if serialization fails", async function () {
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
      await assertError(
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
        {
          innerMessage: /invalid "null": 1/,
        }
      );
    });
    it("null", async function () {
      await assertError(
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
        {
          innerMessage: /invalid "null": 1/,
        }
      );
    });
    it("boolean", async function () {
      await assertError(
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
        {
          innerMessage: /invalid "boolean": 1/,
        }
      );
    });
    it("int", async function () {
      await assertError(
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
        {
          innerMessage: /invalid "int": null/,
        }
      );
    });
    it("long", async function () {
      await assertError(
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
        {
          innerMessage: /invalid "long": 9007199254740991/,
        }
      );
    });
    it("float", async function () {
      await assertError(
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
        {
          innerMessage: /invalid "float": ""/,
        }
      );
    });
    it("double", async function () {
      await assertError(
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
        {
          innerMessage: /invalid "double": ""/,
        }
      );
    });
    it("string", async function () {
      await assertError(
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
        {
          innerMessage: /invalid "string": 1/,
        }
      );
    });
    it("bytes", async function () {
      await assertError(
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
        {
          innerMessage: /invalid "bytes": 1/,
        }
      );
    });
    it("union", async function () {
      await assertError(
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
        {
          innerMessage: /invalid \["null","string"\]: 1/,
        }
      );
    });
    it("enum", async function () {
      await assertError(
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
        {
          innerMessage:
            /invalid {"name":"validation.foo","type":"enum","symbols":\["A","B"\]}: "x"/,
        }
      );
    });
    it("fixed", async function () {
      await assertError(
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
        {
          innerMessage: /invalid {"name":"validation.foo","type":"fixed","size":16}: "x"/,
        }
      );
    });
    it("map", async function () {
      await assertError(
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
        {
          innerMessage: /invalid {"type":"map","values":"long"}: "x"/,
        }
      );
    });
    it("array", async function () {
      await assertError(
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
        {
          innerMessage: /invalid {"type":"array","items":"long"}: "x"/,
        }
      );
    });
    it("record", async function () {
      await assertError(
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
        {
          innerMessage: /invalid "int": undefined/,
        }
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
      await assertError(serializer.deserializeMessageData(serializedValue), {
        innerMessage: /truncated buffer/,
      });
      serializedValue.body = Buffer.from([2, 2, 120, 5]);
      await assertError(serializer.deserializeMessageData(serializedValue), {
        innerMessage: /trailing data/,
      });
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
      await assertError(serializer.deserializeMessageData(serializedValue), {
        innerMessage: /potential precision loss/,
      });
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
      await assertError(serializer.deserializeMessageData(serializedValue), {
        innerMessage: /invalid union index: -3/,
      });
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
      await assertError(serializer.deserializeMessageData(serializedValue), {
        innerMessage: /invalid validation.foo enum index: 5/,
      });
    });
  });
});
