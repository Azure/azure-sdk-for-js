// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import { AvroSerializer } from "../../src";
import { Context } from "mocha";
import { SchemaRegistry } from "@azure/schema-registry";
import { assertError } from "./utils/assertError";
import chaiPromises from "chai-as-promised";
import { createTestRegistry } from "./utils/mockedRegistryClient";
import { createTestSerializer } from "./utils/mockedSerializer";
import { testGroup } from "./utils/dummies";
import { v4 as uuid } from "uuid";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";

chaiUse(chaiPromises);

describe("Error scenarios", function () {
  let serializer: AvroSerializer;
  let registry: SchemaRegistry;
  let serializerNoAutoReg: AvroSerializer;
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
      await assertError(
        serializer.deserialize(message, {
          schema: JSON.stringify(invalidReaderSchema),
        }),
        {
          causeMessage: /missing array items/,
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
      await assertError(
        serializer.deserialize(message, {
          schema: JSON.stringify(incompatibleReaderSchema),
        }),
        {
          causeMessage: /no matching field for default-less validation.AvroUser.age/,
        }
      );
    });
    it("invalid writer schema at time of deserializing", async function (this: Context) {
      /**
       * This test can not run in live mode because the service will validate the schema.
       */
      if (isLiveMode()) {
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
      await assertError(
        serializer.deserialize({
          data,
          contentType: `avro/binary+${id}`,
        }),
        {
          causeMessage: /Unexpected end of JSON input/,
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
      await assertError(
        serializer.deserialize({
          data,
          contentType: `avro/binary+${id}`,
        }),
        {
          causeMessage: /truncated buffer/,
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
    it("schema without a name", async function () {
      /**
       * The serializer expects a record schema as the top-level schema
       */
      await assertError(
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
      await assertError(
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
          causeMessage: /invalid enum symbols: undefined/,
        }
      );
    });
    it("fixed schema without size", async function () {
      await assertError(
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
          causeMessage: /invalid fixed size/,
        }
      );
    });
    it("array schema without items", async function () {
      await assertError(
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
          causeMessage: /missing array items: {"type":"array"}/,
        }
      );
    });
    it("map schema without values", async function () {
      await assertError(
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
          causeMessage: /missing map values: {"type":"map"}/,
        }
      );
    });
    it("record schema without fields", async function () {
      await assertError(
        serializer.serialize(
          null,
          JSON.stringify({
            type: "record",
            name: "foo",
          })
        ),
        {
          causeMessage: /non-array record fields: undefined/,
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
      if (!isLiveMode()) {
        this.skip();
      }
      let ran = false;
      const unusedRegistry = createTestRegistry({
        registerSchemaOptions: {
          onResponse: () => {
            ran = true;
          },
        },
        recorder,
      });
      const customSerializer = await createTestSerializer({
        registry: unusedRegistry,
        serializerOptions: {
          autoRegisterSchemas: true,
          groupName: testGroup,
        },
        recorder,
      });
      await assertError(
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
          causeMessage: /invalid "null": 1/,
        }
      );
      assert.isTrue(ran, `Expected a service call to register the schema but non was sent!`);
    });
    it("null", async function () {
      await assertError(
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
          causeMessage: /invalid "null": 1/,
        }
      );
    });
    it("boolean", async function () {
      await assertError(
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
          causeMessage: /invalid "boolean": 1/,
        }
      );
    });
    it("int", async function () {
      await assertError(
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
          causeMessage: /invalid "int": null/,
        }
      );
    });
    it("long", async function () {
      await assertError(
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
          causeMessage: /invalid "long": 9007199254740991/,
        }
      );
    });
    it("float", async function () {
      await assertError(
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
          causeMessage: /invalid "float": ""/,
        }
      );
    });
    it("double", async function () {
      await assertError(
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
          causeMessage: /invalid "double": ""/,
        }
      );
    });
    it("string", async function () {
      await assertError(
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
          causeMessage: /invalid "string": 1/,
        }
      );
    });
    it("bytes", async function () {
      await assertError(
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
          causeMessage: /invalid "bytes": 1/,
        }
      );
    });
    it("union", async function () {
      await assertError(
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
          causeMessage: /invalid \["null","string"\]: 1/,
        }
      );
    });
    it("enum", async function () {
      await assertError(
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
          causeMessage:
            /invalid {"name":"validation.foo","type":"enum","symbols":\["A","B"\]}: "x"/,
        }
      );
    });
    it("fixed", async function () {
      await assertError(
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
          causeMessage: /invalid {"name":"validation.foo","type":"fixed","size":16}: "x"/,
        }
      );
    });
    it("map", async function () {
      await assertError(
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
          causeMessage: /invalid {"type":"map","values":"long"}: "x"/,
        }
      );
    });
    it("array", async function () {
      await assertError(
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
          causeMessage: /invalid {"type":"array","items":"long"}: "x"/,
        }
      );
    });
    it("record", async function () {
      await assertError(
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
          causeMessage: /invalid "int": undefined/,
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
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /truncated buffer/,
      });
      serializedValue.data = Buffer.from([2, 2, 120, 5]);
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /trailing data/,
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
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /potential precision loss/,
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
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /invalid union index: -3/,
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
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /invalid validation.foo enum index: 5/,
      });
    });
  });
});
