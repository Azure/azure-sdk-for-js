// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { AvroSerializer } from "../../src";
import { Context } from "mocha";
import { SchemaRegistry } from "@azure/schema-registry";
import { assertAvroError } from "./utils/assertAvroError";
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
        serializer.deserialize({
          data: Buffer.alloc(1),
          contentType: "application/json+1234",
        }),
        /application\/json.*avro\/binary/
      );
    });
    it("a schema with non-avro format", async function (this: Context) {
      await assert.isRejected(
        registry.registerSchema({
          name: "_",
          definition: "_",
          format: "notavro",
          groupName: testGroup,
        }),
        /Invalid schema type for PUT request.*notavro/
      );
    });
    it("schema to serialize with is not found", async function () {
      const schema = JSON.stringify({
        type: "record",
        name: "NeverRegistered",
        namespace: "my.example",
        fields: [{ name: "count", type: "int" }],
      });
      await assert.isRejected(serializerNoAutoReg.serialize({ count: 42 }, schema), /not found/);
    });
    it("schema to deserialize with is not found", async function () {
      await assert.isRejected(
        serializerNoAutoReg.deserialize({
          data: Uint8Array.from([0]),
          contentType: `avro/binary+${uuid()}`,
        }),
        /does not exist/
      );
    });
    it("invalid reader schema", async function () {
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
      const invalidReaderSchema = {
        type: "record",
        name: "AvroUser",
        namespace: "validation",
        fields: [
          {
            name: "name",
            type: {
              type: "array",
              values: [],
            },
          },
        ],
      };
      const message = await serializer.serialize(
        {
          name: "",
          favoriteNumber: 1,
        },
        JSON.stringify(writerSchema)
      );
      await assertAvroError(
        serializer.deserialize(message, {
          schema: JSON.stringify(invalidReaderSchema),
        }),
        {
          innerMessage: /missing array items/,
          schemaId: true,
        }
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
      const message = await serializer.serialize(
        {
          name: "",
          favoriteNumber: 1,
        },
        JSON.stringify(writerSchema)
      );
      await assertAvroError(
        serializer.deserialize(message, {
          schema: JSON.stringify(incompatibleReaderSchema),
        }),
        {
          innerMessage: /no matching field for default-less validation.AvroUser.age/,
          schemaId: true,
        }
      );
    });
    it("invalid writer schema at time of deserializing", async function (this: Context) {
      /**
       * This test can not run in live mode because the service will validate the schema.
       */
      if (isLive) {
        this.skip();
      }
      const { id } = await registry.registerSchema({
        definition: "",
        format: "avro",
        groupName: testGroup,
        name: "test",
      });
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
      const { data } = await serializer.serialize(
        {
          name: "",
          favoriteNumber: 1,
        },
        JSON.stringify(writerSchema)
      );
      await assertAvroError(
        serializer.deserialize({
          data,
          contentType: `avro/binary+${id}`,
        }),
        {
          innerMessage: /Unexpected end of JSON input/,
          schemaId: true,
        }
      );
    });
    it("incompatible writer schema", async function () {
      const writerSchema1 = {
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
      const writerSchema2 = {
        type: "record",
        name: "AvroUser",
        namespace: "validation",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
        ],
      };
      const { id } = await registry.registerSchema({
        definition: JSON.stringify(writerSchema2),
        format: "avro",
        groupName: testGroup,
        name: "test",
      });
      const { data } = await serializer.serialize(
        {
          name: "",
          favoriteNumber: 1,
        },
        JSON.stringify(writerSchema1)
      );
      await assertAvroError(
        serializer.deserialize({
          data,
          contentType: `avro/binary+${id}`,
        }),
        {
          innerMessage: /truncated buffer/,
          schemaId: true,
        }
      );
    });
    it("not JSON schema", async function () {
      await assertAvroError(serializer.serialize(null, ""), {
        innerMessage: /Unexpected end of JSON input/,
      });
    });
    it("null schema", async function () {
      await assertAvroError(
        /**
         * The type checking will prevent this from happening but I am including
         * it for completeness.
         */
        serializer.serialize(null, null as any),
        {
          innerMessage: /invalid type: null/,
        }
      );
    });
    it("schema without a name", async function () {
      /**
       * The serializer expects a record schema as the top-level schema
       */
      await assertAvroError(
        serializer.serialize(
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
      await assertAvroError(
        serializer.serialize(
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
      await assertAvroError(
        serializer.serialize(
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
      await assertAvroError(
        serializer.serialize(
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
      await assertAvroError(
        serializer.serialize(
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
      await assertAvroError(
        serializer.serialize(
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
    it("schema is still registered if serialization fails", async function (this: Context) {
      /**
       * This test checks for service calls using the onResponse callback but
       * onResponse is not implemented in the mocked registry because it will
       * add very little value so the test is skipped in playback mode.
       */
      if (!isLive) {
        this.skip();
      }
      let ran = false;
      const unusedRegistry = createTestRegistry({
        registerSchemaOptions: {
          onResponse: () => {
            ran = true;
          },
        },
      });
      const customSerializer = await createTestSerializer({
        registry: unusedRegistry,
        serializerOptions: {
          autoRegisterSchemas: true,
          groupName: testGroup,
        },
      });
      await assertAvroError(
        customSerializer.serialize(
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
          schemaId: true,
        }
      );
      assert.isTrue(ran, `Expected a service call to register the schema but non was sent!`);
    });
    it("null", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("boolean", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("int", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("long", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("float", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("double", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("string", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("bytes", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("union", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("enum", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("fixed", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("map", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("array", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
    it("record", async function () {
      await assertAvroError(
        serializer.serialize(
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
          schemaId: true,
        }
      );
    });
  });
  describe("Serialized value validation", function () {
    it("record", async function () {
      const serializedValue = await serializer.serialize(
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
      assert.deepEqual(serializedValue.data, Uint8Array.from([2, 2, 120]));
      serializedValue.data = Buffer.from([2, 2]);
      await assertAvroError(serializer.deserialize(serializedValue), {
        innerMessage: /truncated buffer/,
        schemaId: true,
      });
      serializedValue.data = Buffer.from([2, 2, 120, 5]);
      await assertAvroError(serializer.deserialize(serializedValue), {
        innerMessage: /trailing data/,
        schemaId: true,
      });
    });
    it("long", async function () {
      const serializedValue = await serializer.serialize(
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
        serializedValue.data,
        Uint8Array.from([252, 255, 255, 255, 255, 255, 255, 31])
      );
      serializedValue.data = Uint8Array.from([252, 255, 255, 255, 255, 255, 255, 32]);
      await assertAvroError(serializer.deserialize(serializedValue), {
        innerMessage: /potential precision loss/,
        schemaId: true,
      });
    });
    it("union", async function () {
      const serializedValue = await serializer.serialize(
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
      assert.deepEqual(serializedValue.data, Uint8Array.from([2, 2, 120]));
      serializedValue.data = Uint8Array.from([5, 2, 120]);
      await assertAvroError(serializer.deserialize(serializedValue), {
        innerMessage: /invalid union index: -3/,
        schemaId: true,
      });
    });
    it("enum", async function () {
      const serializedValue = await serializer.serialize(
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
      assert.deepEqual(serializedValue.data, Uint8Array.from([0]));
      serializedValue.data = Uint8Array.from([10]);
      await assertAvroError(serializer.deserialize(serializedValue), {
        innerMessage: /invalid validation.foo enum index: 5/,
        schemaId: true,
      });
    });
  });
});
