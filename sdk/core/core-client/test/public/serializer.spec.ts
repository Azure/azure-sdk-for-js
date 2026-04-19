// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import * as MediaMappers from "../testMappers2.js";
import type {
  CompositeMapper,
  CompositeMapperType,
  DictionaryMapper,
  DictionaryMapperType,
  EnumMapper,
  EnumMapperType,
  Mapper,
  SequenceMapper,
  SequenceMapperType,
} from "../../src/index.js";
import { createSerializer } from "../../src/index.js";
import { Mappers } from "../testMappers1.js";

const Serializer = createSerializer(Mappers);
const valid_uuid = "ceaafd1e-f936-429f-bbfc-82ee75dddc33";

function stringToByteArray(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

describe("Serializer", function () {
  describe("serialize", function () {
    const invalid_uuid = "abcd-efgd90-90890jkh";

    it("should correctly serialize flattened properties", function () {
      const expected = {
        id: 1,
        name: "testProduct",
        details: {
          max_product_capacity: "Large",
          max_product_display_name: "MaxDisplayName",
        },
      };

      const serialized = Serializer.serialize(
        Mappers.SimpleProduct,
        {
          id: 1,
          name: "testProduct",
          maxProductDisplayName: "MaxDisplayName",
        },
        "SimpleProduct",
      );

      assert.deepEqual(serialized, expected);
    });

    it("should correctly serialize flattened properties when flattened constant is defined first", function () {
      const expected = {
        id: 1,
        name: "testProduct",
        details: {
          max_product_capacity: "Large",
          max_product_display_name: "MaxDisplayName",
        },
      };

      const serialized = Serializer.serialize(
        Mappers.SimpleProductConstFirst,
        {
          id: 1,
          name: "testProduct",
          maxProductDisplayName: "MaxDisplayName",
        },
        "SimpleProduct",
      );

      assert.deepEqual(serialized, expected);
    });

    it("should correctly serialize a string if the type is 'any'", function () {
      const mapper: Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any",
      };
      const serializedObject = Serializer.serialize(mapper, "foo", "anyBody");
      assert.equal(serializedObject, "foo");
    });

    it("should correctly serialize an array if the type is 'any'", function () {
      const mapper: Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any",
      };
      const serializedObject = Serializer.serialize(mapper, [1, 2], "anyBody");
      assert.deepEqual(serializedObject, [1, 2]);
    });

    it("should correctly serialize a string", function () {
      const mapper: Mapper = {
        type: { name: "String" },
        required: false,
        serializedName: "string",
      };
      const serializedObject = Serializer.serialize(mapper, "foo", "stringBody");
      assert.equal(serializedObject, "foo");
    });

    it("should correctly serialize a uuid", function () {
      const mapper: Mapper = {
        type: { name: "Uuid" },
        required: false,
        serializedName: "Uuid",
      };
      const serializedObject = Serializer.serialize(mapper, valid_uuid, "uuidBody");
      assert.equal(serializedObject, valid_uuid);
    });

    it("should throw an error if the value is not a valid Uuid", function () {
      const mapper: Mapper = {
        type: { name: "Uuid" },
        required: false,
        serializedName: "Uuid",
      };
      assert.throws(
        () => Serializer.serialize(mapper, invalid_uuid, "uuidBody"),
        /.*with value.*must be of type string and a valid uuid/i,
      );
    });

    it("should correctly serialize a number", function () {
      const mapper: Mapper = {
        type: { name: "Number" },
        required: false,
        serializedName: "Number",
      };
      const serializedObject = Serializer.serialize(mapper, 1.506, "stringBody");
      assert.equal(serializedObject, 1.506);
    });

    it("should correctly serialize a boolean", function () {
      const mapper: Mapper = {
        type: { name: "Boolean" },
        required: false,
        serializedName: "Boolean",
      };
      const serializedObject = Serializer.serialize(mapper, false, "stringBody");
      assert.strictEqual(serializedObject, false);
    });

    it("should correctly serialize an Enum", function () {
      const mapper: EnumMapper = {
        type: { name: "Enum", allowedValues: [1, 2, 3, 4] },
        required: false,
        serializedName: "Enum",
      };
      const serializedObject = Serializer.serialize(mapper, 1, "enumBody");
      assert.equal(serializedObject, 1);
    });

    it("should throw an error if the value is not valid for an Enum", function () {
      const mapper: EnumMapper = {
        type: { name: "Enum", allowedValues: [1, 2, 3, 4] },
        required: false,
        serializedName: "Enum",
      };
      assert.throws(
        () => Serializer.serialize(mapper, 6, "enumBody"),
        /6 is not a valid value for enumBody\. The valid values are: \[1,2,3,4\]/i,
      );
    });

    it("should correctly serialize a ByteArray Object", function () {
      const mapper: Mapper = {
        type: { name: "ByteArray" },
        required: false,
        serializedName: "ByteArray",
      };
      const byteArray = stringToByteArray("Javascript");
      const base64str = "SmF2YXNjcmlwdA==";
      const serializedObject = Serializer.serialize(mapper, byteArray, "stringBody");
      assert.equal(serializedObject, base64str);
    });

    it("should correctly serialize a ByteArray subarray", function () {
      const mapper: Mapper = {
        type: { name: "ByteArray" },
        required: false,
        serializedName: "ByteArray",
      };
      const full = stringToByteArray("XXJavascriptYY");
      const subarray = full.subarray(2, 12);
      const base64str = "SmF2YXNjcmlwdA==";
      const serializedObject = Serializer.serialize(mapper, subarray, "stringBody");
      assert.equal(serializedObject, base64str);
    });

    it("should correctly serialize a Date Object", function () {
      const dateObj = new Date("2015-01-01");
      const dateISO = "2015-01-01";
      const mapper: Mapper = {
        type: { name: "Date" },
        required: false,
        serializedName: "Date",
      };
      assert.equal(Serializer.serialize(mapper, dateObj, "dateObj"), dateISO);
    });

    it("should correctly serialize a Date object with max value", function () {
      const mapper: Mapper = {
        type: { name: "DateTime" },
        required: false,
        serializedName: "DateTime",
      };
      const serializedDateString = Serializer.serialize(
        mapper,
        new Date("9999-12-31T23:59:59-12:00"),
        "dateTimeObj",
      );
      assert.equal(serializedDateString, "+010000-01-01T11:59:59.000Z");
    });

    it("should correctly serialize a Date object with max value and format UnixTime", function () {
      const mapper: Mapper = {
        type: { name: "UnixTime" },
        required: false,
        serializedName: "UnixTime",
      };
      const serializedDate = Serializer.serialize(
        mapper,
        new Date("9999-12-31T23:59:59-12:00"),
        "dateTimeObj",
      );
      assert.equal(serializedDate, 253402343999);
    });

    it("should correctly serialize a string in DateTimeRfc1123", function () {
      const mapper: Mapper = {
        type: { name: "DateTimeRfc1123" },
        required: false,
        serializedName: "DateTimeRfc1123",
      };
      const rfc = new Date("Wed, 01 Jan 2020 00:00:00 GMT");
      const serializedDateString = Serializer.serialize(mapper, rfc, "dateTimeObj");
      assert.equal(serializedDateString, "Wed, 01 Jan 2020 00:00:00 GMT");
    });

    it("should correctly serialize an ISO 8601 duration", function () {
      const mapper: Mapper = {
        type: { name: "TimeSpan" },
        required: false,
        serializedName: "TimeSpan",
      };
      const duration = "P123DT22H14M12.011S";
      const serializedDateString = Serializer.serialize(mapper, duration, "dateTimeObj");
      assert.equal(serializedDateString, duration);
    });

    it("should throw an error when given an invalid ISO 8601 duration", function () {
      const mapper: Mapper = {
        type: { name: "TimeSpan" },
        required: false,
        serializedName: "TimeSpan",
      };
      const duration = "P123Z42DT22H14M12.011S";
      assert.throws(() => {
        Serializer.serialize(mapper, duration, "dateTimeObj");
      }, /must be a string in ISO 8601 format/);
    });

    it("should correctly serialize an array of primitives", function () {
      const mapper: SequenceMapper = {
        required: false,
        serializedName: "Sequence",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            required: true,
            serializedName: "sequenceElement",
          },
        },
      };
      const array = ["One", "Two", "three"];
      const serializedArray = Serializer.serialize(mapper, array, "arrayObj");
      assert.deepEqual(array, serializedArray);
    });

    it("should correctly serialize an array of array of primitives", function () {
      const mapper: SequenceMapper = {
        required: false,
        serializedName: "Sequence",
        type: {
          name: "Sequence",
          element: {
            required: true,
            serializedName: "sequenceElement",
            type: {
              name: "Sequence",
              element: {
                required: true,
                serializedName: "sequenceElement",
                type: {
                  name: "Number",
                },
              },
            },
          },
        },
      };
      const array = [[1], [2], [1, 2, 3]];
      const serializedArray = Serializer.serialize(mapper, array, "arrayObj");
      assert.deepEqual(array, serializedArray);
    });

    it("should correctly serialize an array of array of object types", function () {
      const mapper: SequenceMapper = {
        serializedName: "arrayObj",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Object",
                },
              },
            },
          },
        },
      };
      const array = [[1], ["2"], [1, "2", {}, true, []]];
      const serializedArray = Serializer.serialize(mapper, array, mapper.serializedName);
      assert.deepEqual(array, serializedArray);
    });

    it('should fail while serializing an array of array of "object" types when a null value is provided', function () {
      const mapper: Mapper = {
        serializedName: "arrayObj",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Sequence",
              element: {
                required: true,
                type: {
                  name: "Object",
                },
              },
            },
          },
        },
      };
      const array = [[1], ["2"], [undefined], [1, "2", {}, true, []]];
      assert.throws(
        () => Serializer.serialize(mapper, array, mapper.serializedName),
        /arrayObj cannot be null or undefined\./,
      );
    });

    it("should correctly serialize an array of dictionary of primitives", function () {
      const mapper: SequenceMapper = {
        required: false,
        serializedName: "Sequence",
        type: {
          name: "Sequence",
          element: {
            required: true,
            serializedName: "sequenceElement",
            type: {
              name: "Dictionary",
              value: {
                required: true,
                serializedName: "valueElement",
                type: {
                  name: "Boolean",
                },
              },
            },
          },
        },
      };
      const array = [{ 1: true }, { 2: false }, { 1: true, 2: false, 3: true }];
      const serializedArray = Serializer.serialize(mapper, array, "arrayObj");
      assert.deepEqual(array, serializedArray);
    });

    it("should correctly serialize a dictionary of primitives", function () {
      const mapper: DictionaryMapper = {
        required: false,
        serializedName: "Dictionary",
        type: {
          name: "Dictionary",
          value: {
            required: true,
            serializedName: "valueElement",
            type: {
              name: "String",
            },
          },
        },
      };
      const dict = { 1: "One", 2: "Two", 3: "three" };
      const serializedDictionary = Serializer.serialize(mapper, dict, "dictObj");
      assert.deepEqual(dict, serializedDictionary);
    });

    it("should correctly serialize a dictionary of array of primitives", function () {
      const mapper: DictionaryMapper = {
        required: false,
        serializedName: "Dictionary",
        type: {
          name: "Dictionary",
          value: {
            required: true,
            serializedName: "valueElement",
            type: {
              name: "Sequence",
              element: {
                required: true,
                serializedName: "sequenceElement",
                type: {
                  name: "Number",
                },
              },
            },
          },
        },
      };
      const dict = { One: [1], Two: [1, 2], three: [1, 2, 3] };
      const serializedDictionary = Serializer.serialize(mapper, dict, "dictObj");
      assert.deepEqual(dict, serializedDictionary);
    });

    it("should correctly serialize a dictionary of dictionary of primitives", function () {
      const mapper: DictionaryMapper = {
        required: false,
        serializedName: "Dictionary",
        type: {
          name: "Dictionary",
          value: {
            required: true,
            serializedName: "valueElement",
            type: {
              name: "Dictionary",
              value: {
                required: true,
                serializedName: "valueElement",
                type: {
                  name: "Boolean",
                },
              },
            },
          },
        },
      };
      const dict = { 1: { One: true }, 2: { Two: false }, 3: { three: true } };
      const serializedDictionary = Serializer.serialize(mapper, dict, "dictObj");
      assert.deepEqual(dict, serializedDictionary);
    });

    it("should correctly serialize a composite type", function () {
      const mapper = Mappers.Product;
      const serializer = createSerializer(Mappers);
      const productObj = {
        id: 101,
        name: "TestProduct",
        provisioningState: "Succeeded",
        tags: {
          tag1: "value1",
          tag2: "value2",
        },
        dispatchTime: new Date("2015-01-01T12:35:36.009Z"),
        invoiceInfo: {
          invId: 1002,
          invDate: "2015-12-25",
          invProducts: [
            {
              Product1: {
                id: 101,
                name: "TestProduct",
              },
            },
            {
              Product2: {
                id: 104,
                name: "TestProduct1",
              },
            },
          ],
        },
        subProducts: [
          {
            subId: 102,
            subName: "SubProduct1",
            makeTime: new Date("2015-12-21T01:01:01"),
            invoiceInfo: {
              invId: 1002,
              invDate: "2015-12-25",
            },
          },
          {
            subId: 103,
            subName: "SubProduct2",
            makeTime: new Date("2015-12-21T01:01:01"),
            invoiceInfo: {
              invId: 1003,
              invDate: "2015-12-25",
            },
          },
        ],
      };
      const serializedProduct = serializer.serialize(mapper, productObj, "productObject");
      for (const prop in serializedProduct) {
        if (prop === "properties") {
          assert.equal(serializedProduct[prop].provisioningState, productObj.provisioningState);
        } else if (prop === "id") {
          assert.equal(serializedProduct[prop], productObj.id);
        } else if (prop === "name") {
          assert.equal(serializedProduct[prop], productObj.name);
        } else if (prop === "tags") {
          assert.equal(JSON.stringify(serializedProduct[prop]), JSON.stringify(productObj.tags));
        } else if (prop === "dispatchTime") {
          assert.equal(
            JSON.stringify(serializedProduct[prop]),
            JSON.stringify(productObj.dispatchTime),
          );
        } else if (prop === "invoiceInfo") {
          assert.equal(
            JSON.stringify(serializedProduct[prop]).length -
              JSON.stringify(productObj.invoiceInfo).length,
            4,
          );
        } else if (prop === "subProducts") {
          assert.equal(
            JSON.stringify(serializedProduct[prop]).length -
              JSON.stringify(productObj.subProducts).length,
            8,
          );
        }
      }
    });

    it("should correctly serialize object version of polymorphic discriminator", function () {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.Shark;
      const sawshark = {
        fishtype: "sawshark",
        age: 22,
        birthday: new Date("2012-01-05T01:00:00Z"),
        species: "king",
        length: 1.0,
        picture: new Uint8Array([255, 255, 255, 255, 254]),
        siblings: [
          {
            fishtype: "shark",
            age: 6,
            birthday: new Date("2012-01-05T01:00:00Z"),
            length: 20.0,
            species: "predator",
          },
          {
            fishtype: "sawshark",
            age: 105,
            birthday: new Date("1900-01-05T01:00:00Z"),
            length: 10.0,
            picture: new Uint8Array([255, 255, 255, 255, 254]),
            species: "dangerous",
          },
        ],
      };
      const serializedSawshark = serializer.serialize(mapper, sawshark, "result");
      assert.equal(serializedSawshark.age, 22);
      assert.equal(serializedSawshark["fish.type"], "sawshark");
      assert.equal(serializedSawshark.siblings.length, 2);
      assert.equal(serializedSawshark.siblings[0]["fish.type"], "shark");
      assert.equal(serializedSawshark.siblings[0].age, 6);
      assert.equal(
        serializedSawshark.siblings[0].birthday,
        new Date("2012-01-05T01:00:00Z").toISOString(),
      );
      assert.equal(serializedSawshark.siblings[1]["fish.type"], "sawshark");
      assert.equal(serializedSawshark.siblings[1].age, 105);
      assert.equal(
        serializedSawshark.siblings[1].birthday,
        new Date("1900-01-05T01:00:00Z").toISOString(),
      );
      assert.equal(serializedSawshark.siblings[1].picture, "//////4=");
      assert.equal(serializedSawshark.picture, "//////4=");
    });

    it("should correctly serialize additionalProperties when the mapper knows that additional properties are allowed", function () {
      const bodyParameter = {
        id: 5,
        name: "Funny",
        odatalocation: "westus",
        additionalProperties1: {
          height: 5.61,
          weight: 599,
          footsize: 11.5,
        },
        color: "red",
        city: "Seattle",
        food: "tikka masala",
        birthdate: "2017-12-13T02:29:51.000Z",
      };
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.PetAP;
      const result = serializer.serialize(mapper, bodyParameter, "bodyParameter");
      assert.equal(result.id, 5);
      assert.equal(result.eyeColor, "brown");
      assert.isUndefined(result.favoriteFood);
      assert.equal(result["@odata.location"], "westus");
      assert.equal(result.color, "red");
      assert.equal(result.city, "Seattle");
      assert.equal(result.food, "tikka masala");
      assert.equal(result.additionalProperties.height, 5.61);
      assert.equal(result.additionalProperties.weight, 599);
      assert.equal(result.additionalProperties.footsize, 11.5);
      assert.equal(result.name, "Funny");
      assert.equal(result.birthdate, "2017-12-13T02:29:51.000Z");
    });

    it("should set __proto__ as an own data property when serializing additional properties", function () {
      const bodyParameter = JSON.parse(
        `{"id":5,"name":"Funny","odatalocation":"westus","color":"red","__proto__":{"isAdmin": true}}`,
      );

      const serializer = createSerializer(Mappers);
      const result = serializer.serialize(Mappers.MonitorDomain, bodyParameter, "bodyParameter");

      // "__proto__" must be an own data property on result, not a prototype-setter side-effect.
      assert.isUndefined(result.isAdmin);
      assert.isTrue(Object.prototype.hasOwnProperty.call(result, "__proto__"));
      assert.deepEqual(result.__proto__, { isAdmin: true });
    });

    it("should allow null when required: true and nullable: true", function () {
      const mapper: Mapper = {
        required: false,
        serializedName: "testmodel",
        type: {
          name: "Composite",
          className: "testmodel",
          modelProperties: {
            length: {
              required: true,
              nullable: true,
              serializedName: "length",
              type: {
                name: "Number",
              },
            },
          },
        },
      };

      const result = Serializer.serialize(mapper, { length: null }, "testobj");
      assert.exists(result);
    });

    it("should not allow undefined when required: true and nullable: true", function () {
      const mapper: Mapper = {
        required: false,
        serializedName: "testmodel",
        type: {
          name: "Composite",
          className: "testmodel",
          modelProperties: {
            length: {
              required: true,
              nullable: true,
              serializedName: "length",
              type: {
                name: "Number",
              },
            },
          },
        },
      };

      assert.throws(() => {
        Serializer.serialize(mapper, { length: undefined }, "testobj");
      }, "testobj.length cannot be undefined.");
    });

    it("should not allow null when required: true and nullable: false", function () {
      const mapper: Mapper = {
        required: false,
        serializedName: "testmodel",
        type: {
          name: "Composite",
          className: "testmodel",
          modelProperties: {
            length: {
              required: true,
              nullable: false,
              serializedName: "length",
              type: {
                name: "Number",
              },
            },
          },
        },
      };

      assert.throws(() => {
        Serializer.serialize(mapper, { length: undefined }, "testobj");
      }, "testobj.length cannot be null or undefined.");
    });

    it("should not allow undefined when required: true and nullable: false", function () {
      const mapper: Mapper = {
        required: false,
        serializedName: "testmodel",
        type: {
          name: "Composite",
          className: "testmodel",
          modelProperties: {
            length: {
              required: true,
              nullable: false,
              serializedName: "length",
              type: {
                name: "Number",
              },
            },
          },
        },
      };

      assert.throws(() => {
        Serializer.serialize(mapper, { length: undefined }, "testobj");
      }, "testobj.length cannot be null or undefined.");
    });

    it("should not allow null when required: true and nullable is undefined", function () {
      const mapper: Mapper = {
        serializedName: "foo",
        required: true,
        type: {
          name: "String",
        },
      };
      assert.throws(() => {
        Serializer.serialize(mapper, undefined, "testobj");
      }, "testobj cannot be null or undefined.");
    });

    it("should not allow undefined when required: true and nullable is undefined", function () {
      const mapper: Mapper = {
        serializedName: "foo",
        required: true,
        type: {
          name: "String",
        },
      };
      assert.throws(() => {
        Serializer.serialize(mapper, undefined, "testobj");
      }, "testobj cannot be null or undefined.");
    });

    it("should allow null when required: false and nullable: true", function () {
      const mapper: Mapper = {
        serializedName: "foo",
        required: false,
        nullable: true,
        type: {
          name: "String",
        },
      };

      Serializer.serialize(mapper, undefined, "testobj");
    });

    it("should not allow null when required: false and nullable: false", function () {
      const mapper: Mapper = {
        serializedName: "foo",
        required: false,
        nullable: false,
        type: {
          name: "String",
        },
      };

      assert.throws(() => {
        Serializer.serialize(mapper, null, "testobj");
      }, "testobj cannot be null.");
    });

    it("should allow null when required: false and nullable is undefined", function () {
      const mapper: Mapper = {
        serializedName: "foo",
        required: false,
        type: {
          name: "String",
        },
      };

      Serializer.serialize(mapper, undefined, "testobj");
    });

    it("should allow undefined when required: false and nullable: true", function () {
      const mapper: Mapper = {
        serializedName: "foo",
        required: false,
        nullable: true,
        type: {
          name: "String",
        },
      };

      Serializer.serialize(mapper, undefined, "testobj");
    });

    it("should allow undefined when required: false and nullable: false", function () {
      const mapper: Mapper = {
        serializedName: "fooType",
        type: {
          name: "Composite",
          className: "fooType",
          modelProperties: {
            length: {
              serializedName: "length",
              required: false,
              nullable: false,
              type: {
                name: "String",
              },
            },
          },
        },
      };

      Serializer.serialize(mapper, { length: undefined }, "testobj");
    });

    it("should allow undefined when required: false and nullable is undefined", function () {
      const mapper: Mapper = {
        serializedName: "foo",
        required: false,
        type: {
          name: "String",
        },
      };

      Serializer.serialize(mapper, undefined, "testobj");
    });
  });

  it("should correctly serialize polymorphic children of a sequence of polymorphic elements", function () {
    const bumperJobInputAsset = {
      odataType: "#Microsoft.Media.JobInputAsset",
      assetName: "input2",
      start: {
        odataType: "#Microsoft.Media.AbsoluteClipTime",
        time: "PT0S",
      },
      label: "bumper",
    };

    const mainJobInputAsset = {
      odataType: "#Microsoft.Media.JobInputAsset",
      assetName: "input",
      start: {
        odataType: "#Microsoft.Media.AbsoluteClipTime",
        time: "PT0S",
      },
      label: "main",
    };

    const input = {
      odataType: "#Microsoft.Media.JobInputSequence",
      inputs: [bumperJobInputAsset, mainJobInputAsset],
    };
    const outputs = [
      {
        odataType: "#Microsoft.Media.JobOutputAsset",
        assetName: "outputAssetName",
      },
    ];
    const requestBody = {
      input,
      outputs,
    };

    const MediaSerializer = createSerializer(MediaMappers);
    const result = MediaSerializer.serialize(MediaMappers.Job, requestBody);
    // assetName can get clipped off if this fails, since input.inputs
    // elements will get serialized as JobInputClip instead of JobInputAsset
    assert.deepStrictEqual(result, {
      properties: {
        input: {
          "@odata.type": "#Microsoft.Media.JobInputSequence",
          inputs: [
            {
              "@odata.type": "#Microsoft.Media.JobInputAsset",
              start: {
                "@odata.type": "#Microsoft.Media.AbsoluteClipTime",
                time: "PT0S",
              },
              label: "bumper",
              assetName: "input2",
            },
            {
              "@odata.type": "#Microsoft.Media.JobInputAsset",
              start: {
                "@odata.type": "#Microsoft.Media.AbsoluteClipTime",
                time: "PT0S",
              },
              label: "main",
              assetName: "input",
            },
          ],
        },
        outputs: [
          {
            "@odata.type": "#Microsoft.Media.JobOutputAsset",
            assetName: "outputAssetName",
          },
        ],
      },
    });
  });

  describe("deserialize", function () {
    it("should correctly deserialize a Date if the type is 'any'", function () {
      const mapper: Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any",
      };
      const d = new Date();
      const deserializedObject = Serializer.deserialize(mapper, d, "anyResponseBody");
      assert.equal(deserializedObject, d);
    });
    it("should correctly deserialize an array if the type is 'any'", function () {
      const mapper: Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any",
      };
      const buf = [1, 2, 3];
      const deserializedObject = Serializer.deserialize(mapper, buf, "anyBody");
      assert.equal(deserializedObject, buf);
    });
    it("should correctly deserialize a uuid", function () {
      const mapper: Mapper = {
        type: { name: "Uuid" },
        required: false,
        serializedName: "Uuid",
      };
      const serializedObject = Serializer.deserialize(mapper, valid_uuid, "uuidBody");
      assert.equal(serializedObject, valid_uuid);
    });
    it("should correctly deserialize a composite type", function () {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.Product;
      const responseBody = {
        id: 101,
        name: "TestProduct",
        properties: {
          provisioningState: "Succeeded",
        },
        tags: {
          tag1: "value1",
          tag2: "value2",
        },
        dispatchTime: new Date("2015-01-01T12:35:36.009Z"),
        invoiceInfo: {
          invoiceId: 1002,
          invDate: "2015-12-25",
          invProducts: [
            {
              Product1: {
                id: 101,
                name: "TestProduct",
              },
            },
            {
              Product2: {
                id: 104,
                name: "TestProduct1",
              },
            },
          ],
        },
        subProducts: [
          {
            subId: 102,
            subName: "SubProduct1",
            makeTime: new Date("2015-12-21T01:01:01"),
            invoiceInfo: {
              invoiceId: 1002,
              invDate: "2015-12-25",
            },
          },
          {
            subId: 103,
            subName: "SubProduct2",
            makeTime: new Date("2015-12-21T01:01:01"),
            invoiceInfo: {
              invoiceId: 1003,
              invDate: "2015-12-25",
            },
          },
        ],
      };
      const deserializedProduct = serializer.deserialize(mapper, responseBody, "responseBody");
      for (const prop in deserializedProduct) {
        if (prop === "provisioningState") {
          assert.equal(
            deserializedProduct.provisioningState,
            responseBody.properties.provisioningState,
          );
        } else if (prop === "id") {
          assert.equal(deserializedProduct[prop], responseBody.id);
        } else if (prop === "name") {
          assert.equal(deserializedProduct[prop], responseBody.name);
        } else if (prop === "tags") {
          assert.equal(
            JSON.stringify(deserializedProduct[prop]),
            JSON.stringify(responseBody.tags),
          );
        } else if (prop === "dispatchTime") {
          assert.equal(
            JSON.stringify(deserializedProduct[prop]),
            JSON.stringify(responseBody.dispatchTime),
          );
        } else if (prop === "invoiceInfo") {
          assert.equal(
            JSON.stringify(deserializedProduct[prop]).length -
              JSON.stringify(responseBody.invoiceInfo).length,
            10,
          );
        } else if (prop === "subProducts") {
          assert.equal(
            JSON.stringify(deserializedProduct[prop]).length -
              JSON.stringify(responseBody.subProducts).length,
            20,
          );
        }
      }
    });

    it("should correctly deserialize a pageable type without nextLink", function () {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.ProductListResult;
      const responseBody = {
        value: [
          {
            id: 101,
            name: "TestProduct",
            properties: {
              provisioningState: "Succeeded",
            },
          },
          {
            id: 104,
            name: "TestProduct1",
            properties: {
              provisioningState: "Failed",
            },
          },
        ],
      };
      const deserializedProduct = serializer.deserialize(mapper, responseBody, "responseBody");
      assert.isTrue(Array.isArray(deserializedProduct));
      assert.equal(deserializedProduct.length, 2);
      for (let i = 0; i < deserializedProduct.length; i++) {
        if (i === 0) {
          assert.equal(deserializedProduct[i].id, 101);
          assert.equal(deserializedProduct[i].name, "TestProduct");
          assert.equal(deserializedProduct[i].provisioningState, "Succeeded");
        } else if (i === 1) {
          assert.equal(deserializedProduct[i].id, 104);
          assert.equal(deserializedProduct[i].name, "TestProduct1");
          assert.equal(deserializedProduct[i].provisioningState, "Failed");
        }
      }
    });

    it("should correctly deserialize a pageable type with nextLink  first in mapper", function () {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.ProductListResultNextLinkFirst;
      const responseBody = {
        value: [
          {
            id: 101,
            name: "TestProduct",
            properties: {
              provisioningState: "Succeeded",
            },
          },
          {
            id: 104,
            name: "TestProduct1",
            properties: {
              provisioningState: "Failed",
            },
          },
        ],
        nextLink: "https://helloworld.com",
      };
      const deserializedProduct = serializer.deserialize(mapper, responseBody, "responseBody");
      assert.isTrue(Array.isArray(deserializedProduct));
      assert.equal(deserializedProduct.length, 2);
      assert.equal(deserializedProduct.nextLink, "https://helloworld.com");
      for (let i = 0; i < deserializedProduct.length; i++) {
        if (i === 0) {
          assert.equal(deserializedProduct[i].id, 101);
          assert.equal(deserializedProduct[i].name, "TestProduct");
          assert.equal(deserializedProduct[i].provisioningState, "Succeeded");
        } else if (i === 1) {
          assert.equal(deserializedProduct[i].id, 104);
          assert.equal(deserializedProduct[i].name, "TestProduct1");
          assert.equal(deserializedProduct[i].provisioningState, "Failed");
        }
      }
    });

    it("should correctly deserialize a pageable type with nextLink", function () {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.ProductListResultNextLink;
      const responseBody = {
        value: [
          {
            id: 101,
            name: "TestProduct",
            properties: {
              provisioningState: "Succeeded",
            },
          },
          {
            id: 104,
            name: "TestProduct1",
            properties: {
              provisioningState: "Failed",
            },
          },
        ],
        nextLink: "https://helloworld.com",
      };
      const deserializedProduct = serializer.deserialize(mapper, responseBody, "responseBody");
      assert.isTrue(Array.isArray(deserializedProduct));
      assert.equal(deserializedProduct.length, 2);
      assert.equal(deserializedProduct.nextLink, "https://helloworld.com");
      for (let i = 0; i < deserializedProduct.length; i++) {
        if (i === 0) {
          assert.equal(deserializedProduct[i].id, 101);
          assert.equal(deserializedProduct[i].name, "TestProduct");
          assert.equal(deserializedProduct[i].provisioningState, "Succeeded");
        } else if (i === 1) {
          assert.equal(deserializedProduct[i].id, 104);
          assert.equal(deserializedProduct[i].name, "TestProduct1");
          assert.equal(deserializedProduct[i].provisioningState, "Failed");
        }
      }
    });

    it("should correctly deserialize object version of polymorphic discriminator", function () {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.Fish;
      const responseBody = {
        "fish.type": "sawshark",
        age: 22,
        birthday: new Date("2012-01-05T01:00:00Z").toISOString(),
        species: "king",
        length: 1.0,
        picture: "/////g==",
        siblings: [
          {
            "fish.type": "shark",
            age: 6,
            birthday: new Date("2012-01-05T01:00:00Z"),
            length: 20.0,
            species: "predator",
          },
          {
            "fish.type": "sawshark",
            age: 105,
            birthday: new Date("1900-01-05T01:00:00Z").toISOString(),
            length: 10.0,
            picture: "/////g==",
            species: "dangerous",
          },
        ],
      };
      const deserializedSawshark = serializer.deserialize(mapper, responseBody, "responseBody");
      assert.equal(deserializedSawshark.age, 22);
      assert.equal(deserializedSawshark.fishtype, "sawshark");

      assert.instanceOf(deserializedSawshark.picture, Uint8Array);
      assert.equal(deserializedSawshark.picture.length, 4);
      assert.equal(deserializedSawshark.picture[0], 255);
      assert.equal(deserializedSawshark.picture[1], 255);
      assert.equal(deserializedSawshark.picture[2], 255);
      assert.equal(deserializedSawshark.picture[3], 254);

      assert.equal(deserializedSawshark.siblings.length, 2);
      assert.equal(deserializedSawshark.siblings[0].fishtype, "shark");
      assert.equal(deserializedSawshark.siblings[0].age, 6);
      assert.equal(
        deserializedSawshark.siblings[0].birthday.toISOString(),
        "2012-01-05T01:00:00.000Z",
      );
      assert.equal(deserializedSawshark.siblings[1].fishtype, "sawshark");
      assert.equal(deserializedSawshark.siblings[1].age, 105);
      assert.equal(
        deserializedSawshark.siblings[1].birthday.toISOString(),
        "1900-01-05T01:00:00.000Z",
      );
    });

    it("should correctly deserialize an array of array of object types", function () {
      const mapper: Mapper = {
        serializedName: "arrayObj",
        required: true,
        type: {
          name: "Sequence",
          element: {
            serializedName: "ObjectElementType",
            type: {
              name: "Sequence",
              element: {
                serializedName: "ObjectElementType",
                type: {
                  name: "Object",
                },
              },
            },
          },
        },
      };
      const array = [[1], ["2"], [1, "2", {}, true, []]];
      const deserializedArray = Serializer.deserialize(mapper, array, mapper.serializedName!);
      assert.deepEqual(array, deserializedArray);
    });

    it("should correctly deserialize without failing when encountering unrecognized discriminator", function () {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.Fish;
      const responseBody = {
        "fish.type": "sawshark",
        age: 22,
        birthday: new Date("2012-01-05T01:00:00Z").toISOString(),
        species: "king",
        length: 1.0,
        picture: "/////g==",
        siblings: [
          {
            "fish.type": "mutatedshark",
            age: 105,
            birthday: new Date("1900-01-05T01:00:00Z").toISOString(),
            length: 10.0,
            picture: "/////g==",
            species: "dangerous",
            siblings: [
              {
                "fish.type": "mutatedshark",
                age: 6,
                length: 20.0,
                species: "predator",
              },
            ],
          },
        ],
      };
      const deserializedSawshark = serializer.deserialize(mapper, responseBody, "responseBody");
      assert.equal(deserializedSawshark.siblings.length, 1);
      assert.equal(deserializedSawshark.siblings[0].fishtype, "mutatedshark");
      assert.equal(deserializedSawshark.siblings[0].species, "dangerous");
      assert.equal(deserializedSawshark.siblings[0].birthday, "1900-01-05T01:00:00.000Z");
      assert.equal(deserializedSawshark.siblings[0].age, 105);
      assert.equal(deserializedSawshark.siblings[0].siblings[0].fishtype, "mutatedshark");
      assert.equal(deserializedSawshark.siblings[0].siblings[0].species, "predator");
      assert.notProperty(deserializedSawshark.siblings[0].siblings[0], "birthday");
      assert.equal(deserializedSawshark.siblings[0].siblings[0].age, 6);
    });

    it("should correctly deserialize additionalProperties when the mapper knows that additional properties are allowed", function () {
      const responseBody = {
        id: 5,
        name: "Funny",
        status: true,
        "@odata.location": "westus",
        additionalProperties: {
          height: 5.61,
          weight: 599,
          footsize: 11.5,
        },
        color: "red",
        city: "Seattle",
        food: "tikka masala",
        birthdate: "2017-12-13T02:29:51Z",
      };
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.PetAP;
      const result = serializer.deserialize(mapper, responseBody, "responseBody");
      assert.equal(result.id, 5);
      assert.isTrue(result.status);
      assert.equal(result.eyeColor, "brown");
      assert.equal(result.favoriteFood, "bones");
      assert.equal(result.odatalocation, "westus");
      assert.equal(result.color, "red");
      assert.equal(result.city, "Seattle");
      assert.equal(result.food, "tikka masala");
      assert.equal(result.birthdate, "2017-12-13T02:29:51Z");
      assert.equal(result.additionalProperties1.height, 5.61);
      assert.equal(result.additionalProperties1.weight, 599);
      assert.equal(result.additionalProperties1.footsize, 11.5);
      assert.equal(result.name, "Funny");
    });

    it("should not include polluted Object.prototype properties when deserializing", function () {
      const pollutedKey = "__copilot_test_polluted__";
      (Object.prototype as any)[pollutedKey] = "injected";
      try {
        const responseBody = {
          id: 5,
          name: "Funny",
          status: true,
          "@odata.location": "westus",
          color: "red",
        };
        const serializer = createSerializer(Mappers);
        const result = serializer.deserialize(Mappers.PetAP, responseBody, "responseBody");

        // The polluted prototype property must NOT appear as an own property on the result.
        assert.isFalse(
          Object.prototype.hasOwnProperty.call(result, pollutedKey),
          "Deserialized result must not include properties inherited from a polluted Object.prototype",
        );
      } finally {
        delete (Object.prototype as any)[pollutedKey];
      }
    });

    it("should deserialize headerCollectionPrefix", function () {
      const mapper: CompositeMapper = {
        serializedName: "something",
        type: {
          name: "Composite",
          className: "CustomHeadersType",
          modelProperties: {
            metadata: {
              serializedName: "metadata",
              type: {
                name: "Dictionary",
                value: {
                  serializedName: "element",
                  type: {
                    name: "String",
                  },
                },
              },
              headerCollectionPrefix: "foo-bar-",
            },
            unrelated: {
              serializedName: "unrelated",
              type: {
                name: "Number",
              },
            },
          },
        },
      };

      const rawHeaders = {
        "foo-bar-alpha": "hello",
        "foo-bar-beta": "world",
        unrelated: "42",
      };

      const expected = {
        metadata: {
          alpha: "hello",
          beta: "world",
        },
        unrelated: 42,
      };
      const actual = Serializer.deserialize(mapper, rawHeaders, "headers");
      assert.deepEqual(actual, expected);
    });

    describe("composite type", () => {
      it("should be deserialized properly when polymorphicDiscriminator specified", function () {
        const fish: CompositeMapper = {
          serializedName: "Fish",
          type: {
            name: "Composite",
            polymorphicDiscriminator: {
              serializedName: "fishtype",
              clientName: "fishtype",
            },
            uberParent: "Fish",
            className: "Fish",
            modelProperties: {
              fishtype: {
                required: true,
                serializedName: "fishtype",
                type: {
                  name: "String",
                },
              },
            },
          },
        };

        const shark: CompositeMapper = {
          serializedName: "shark",
          type: {
            name: "Composite",
            polymorphicDiscriminator: fish.type.polymorphicDiscriminator,
            uberParent: "Fish",
            className: "Shark",
            modelProperties: {
              ...fish.type.modelProperties,
              age: {
                serializedName: "age",
                type: {
                  name: "Number",
                },
              },
            },
          },
        };

        const mappers = {
          Fish: fish,
          Shark: shark,
          discriminators: {
            Fish: fish,
            "Fish.shark": shark,
          },
        };
        const serializer = createSerializer(mappers);
        const result = serializer.deserialize(
          fish,
          {
            fishtype: "shark",
            age: 10,
          },
          "",
        );

        assert.strictEqual(result.fishtype, "shark");
        assert.strictEqual(result.age, 10);
      });

      it("should be deserialized properly when polymorphicDiscriminator specified in nested property", function () {
        const fish: CompositeMapper = {
          serializedName: "Fish",
          type: {
            name: "Composite",
            polymorphicDiscriminator: {
              serializedName: "fishtype",
              clientName: "fishtype",
            },
            uberParent: "Fish",
            className: "Fish",
            modelProperties: {
              sibling: {
                required: false,
                serializedName: "sibling",
                type: {
                  name: "Composite",
                  polymorphicDiscriminator: {
                    serializedName: "fishtype",
                    clientName: "fishtype",
                  },
                  uberParent: "Fish",
                  className: "Fish",
                },
              },
              fishtype: {
                required: true,
                serializedName: "fishtype",
                type: {
                  name: "String",
                },
              },
            },
          },
        };

        const shark: CompositeMapper = {
          serializedName: "shark",
          type: {
            name: "Composite",
            polymorphicDiscriminator: fish.type.polymorphicDiscriminator,
            uberParent: "Fish",
            className: "Shark",
            modelProperties: {
              ...fish.type.modelProperties,
              age: {
                serializedName: "age",
                type: {
                  name: "Number",
                },
              },
            },
          },
        };

        const mappers = {
          Fish: fish,
          Shark: shark,
          discriminators: {
            Fish: fish,
            "Fish.shark": shark,
          },
        };
        const serializer = createSerializer(mappers);
        const result = serializer.deserialize(
          fish,
          {
            fishtype: "shark",
            age: 10,
            sibling: { fishtype: "shark", age: 15 },
          },
          "",
        );

        assert.strictEqual(result.fishtype, "shark");
        assert.strictEqual(result.age, 10);
        assert.strictEqual(result.sibling.fishtype, "shark");
        assert.strictEqual(result.sibling.age, 15);
      });

      it("should be deserialized properly when polymorphicDiscriminator specified in the parent", function () {
        const fish: CompositeMapper = {
          serializedName: "Fish",
          type: {
            name: "Composite",
            polymorphicDiscriminator: {
              serializedName: "fishtype",
              clientName: "fishtype",
            },
            uberParent: "Fish",
            className: "Fish",
            modelProperties: {
              sibling: {
                required: false,
                serializedName: "sibling",
                type: {
                  name: "Composite",
                  uberParent: "Fish",
                  className: "Fish",
                },
              },
              fishtype: {
                required: true,
                serializedName: "fishtype",
                type: {
                  name: "String",
                },
              },
            },
          },
        };

        const shark: CompositeMapper = {
          serializedName: "shark",
          type: {
            name: "Composite",
            polymorphicDiscriminator: fish.type.polymorphicDiscriminator,
            uberParent: "Fish",
            className: "Shark",
            modelProperties: {
              ...fish.type.modelProperties,
              age: {
                serializedName: "age",
                type: {
                  name: "Number",
                },
              },
            },
          },
        };

        const mappers = {
          Fish: fish,
          Shark: shark,
          discriminators: {
            Fish: fish,
            "Fish.shark": shark,
          },
        };
        const serializer = createSerializer(mappers);
        const result = serializer.deserialize(
          fish,
          {
            fishtype: "shark",
            age: 10,
            sibling: { fishtype: "shark", age: 15 },
          },
          "",
        );

        assert.strictEqual(result.fishtype, "shark");
        assert.strictEqual(result.age, 10);
        assert.strictEqual(result.sibling.fishtype, "shark");
        assert.strictEqual(result.sibling.age, 15);
      });

      it("should be deserialized properly when responseBody is an empty string", function () {
        const fish: CompositeMapper = {
          serializedName: "Fish",
          type: {
            name: "Composite",
            className: "Fish",
            modelProperties: {},
          },
        };

        const mappers = {
          Fish: fish,
        };
        const serializer = createSerializer(mappers);
        const result: any = serializer.deserialize(fish, "", "mockFishProperty");

        assert.deepEqual(result, {});
      });

      it("should be deserialized properly when item list wrapper is an empty string", function () {
        const blobServiceProperties: CompositeMapper = {
          xmlName: "StorageServiceProperties",
          serializedName: "BlobServiceProperties",
          type: {
            name: "Composite",
            className: "BlobServiceProperties",
            modelProperties: {
              cors: {
                xmlIsWrapped: true,
                xmlName: "Cors",
                xmlElementName: "CorsRule",
                serializedName: "Cors",
                type: {
                  name: "Sequence",
                  element: {
                    type: {
                      name: "Composite",
                      className: "CorsRule",
                    },
                  },
                },
              },
            },
          },
        };

        const mappers = {
          BlobServiceProperties: blobServiceProperties,
        };
        const serializer = createSerializer(mappers, true);
        const result: any = serializer.deserialize(
          blobServiceProperties,
          { Cors: "" },
          "mockedBlobServiceProperties",
        );

        assert.deepEqual(result, { cors: [] });
      });

      it("should handle xmlIsMsText flag", function () {
        const stringEncoded: CompositeMapper = {
          serializedName: "StringEncoded",
          type: {
            name: "Composite",
            className: "StringEncoded",
            modelProperties: {
              encoded: {
                serializedName: "Encoded",
                xmlName: "Encoded",
                xmlIsAttribute: true,
                type: {
                  name: "Boolean",
                },
              },
              content: {
                serializedName: "content",
                xmlName: "content",
                xmlIsMsText: true,
                type: {
                  name: "String",
                },
              },
            },
          },
        };

        const mappers = {
          StringEncoded: stringEncoded,
        };
        const serializer = createSerializer(mappers, true);
        const result: any = serializer.deserialize(
          stringEncoded,
          { $: { Encoded: true }, _: "dir%EF%BF%BE0166562954291707607" },
          "mockedStringEncoded",
        );

        assert.deepEqual(result, { encoded: true, content: "dir%EF%BF%BE0166562954291707607" });
      });

      it("should handle xmlIsMsText flag for degenerated string case", function () {
        const stringEncoded: CompositeMapper = {
          serializedName: "StringEncoded",
          type: {
            name: "Composite",
            className: "StringEncoded",
            modelProperties: {
              encoded: {
                serializedName: "Encoded",
                xmlName: "Encoded",
                xmlIsAttribute: true,
                type: {
                  name: "Boolean",
                },
              },
              content: {
                serializedName: "content",
                xmlName: "content",
                xmlIsMsText: true,
                type: {
                  name: "String",
                },
              },
            },
          },
        };

        const mappers = {
          StringEncoded: stringEncoded,
        };
        const serializer = createSerializer(mappers, true);
        const result: any = serializer.deserialize(
          stringEncoded,
          "justastring",
          "mockedStringEncoded",
        );

        assert.equal(result.content, "justastring");
        assert.isUndefined(result.encoded);
      });

      it("should handle xmlIsMsText flag with customized XML_CHARKEY", function () {
        const stringEncoded: CompositeMapper = {
          serializedName: "StringEncoded",
          type: {
            name: "Composite",
            className: "StringEncoded",
            modelProperties: {
              encoded: {
                serializedName: "Encoded",
                xmlName: "Encoded",
                xmlIsAttribute: true,
                type: {
                  name: "Boolean",
                },
              },
              content: {
                serializedName: "content",
                xmlName: "content",
                xmlIsMsText: true,
                type: {
                  name: "String",
                },
              },
            },
          },
        };

        const mappers = {
          StringEncoded: stringEncoded,
        };
        const serializer = createSerializer(mappers, true);
        const result: any = serializer.deserialize(
          stringEncoded,
          { $: { Encoded: true }, "#": "dir%EF%BF%BE0166562954291707607" },
          "mockedStringEncoded",
          {
            xml: { xmlCharKey: "#" },
          },
        );

        assert.deepEqual(result, { encoded: true, content: "dir%EF%BF%BE0166562954291707607" });
      });

      it("should not copy extra properties when xmlName is different from serializedName", function () {
        const DirectoryItem: CompositeMapper = {
          serializedName: "DirectoryItem",
          xmlName: "Directory",
          type: {
            name: "Composite",
            className: "DirectoryItem",
            modelProperties: {
              name: {
                serializedName: "Name",
                xmlName: "Name",
                type: {
                  name: "String",
                },
              },
            },
          },
        };

        const FilesAndDirectoriesListSegment: CompositeMapper = {
          serializedName: "FilesAndDirectoriesListSegment",
          xmlName: "Entries",
          type: {
            name: "Composite",
            className: "FilesAndDirectoriesListSegment",
            modelProperties: {
              directoryItems: {
                serializedName: "DirectoryItems",
                required: true,
                xmlName: "DirectoryItems",
                xmlElementName: "Directory",
                type: {
                  name: "Sequence",
                  element: {
                    type: {
                      name: "Composite",
                      className: "DirectoryItem",
                    },
                  },
                },
              },
            },
          },
        };
        const mappers = {
          FilesAndDirectoriesListSegment,
          DirectoryItem,
        };
        const serializer = createSerializer(mappers, true);

        const value = {
          Directory: [{ Name: "d1" }, { Name: "d2" }],
        };
        const result: any = serializer.deserialize(
          FilesAndDirectoriesListSegment,
          value,
          "mockedEntries",
        );

        assert.deepEqual(result, { directoryItems: [{ name: "d1" }, { name: "d2" }] });
      });
    });

    describe("polymorphic composite type array", () => {
      const Fish: CompositeMapper = {
        serializedName: "Fish",
        type: {
          name: "Composite",
          polymorphicDiscriminator: {
            serializedName: "fishtype",
            clientName: "fishtype",
          },
          uberParent: "Fish",
          className: "Fish",
          modelProperties: {
            species: {
              serializedName: "species",
              type: {
                name: "String",
              },
            },
            length: {
              required: true,
              serializedName: "length",
              type: {
                name: "Number",
              },
            },
            siblings: {
              serializedName: "siblings",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "Fish",
                  },
                },
              },
            },
            fishtype: {
              required: true,
              serializedName: "fishtype",
              type: {
                name: "String",
              },
            },
          },
        },
      };

      const Salmon: CompositeMapper = {
        serializedName: "salmon",
        type: {
          name: "Composite",
          polymorphicDiscriminator: Fish.type.polymorphicDiscriminator,
          uberParent: "Fish",
          className: "Salmon",
          modelProperties: {
            ...Fish.type.modelProperties,
            location: {
              serializedName: "location",
              type: {
                name: "String",
              },
            },
            iswild: {
              serializedName: "iswild",
              type: {
                name: "Boolean",
              },
            },
          },
        },
      };

      const Shark: CompositeMapper = {
        serializedName: "shark",
        type: {
          name: "Composite",
          polymorphicDiscriminator: Fish.type.polymorphicDiscriminator,
          uberParent: "Fish",
          className: "Shark",
          modelProperties: {
            ...Fish.type.modelProperties,
            age: {
              serializedName: "age",
              type: {
                name: "Number",
              },
            },
            birthday: {
              required: true,
              serializedName: "birthday",
              type: {
                name: "DateTime",
              },
            },
          },
        },
      };

      const Sawshark: CompositeMapper = {
        serializedName: "sawshark",
        type: {
          name: "Composite",
          polymorphicDiscriminator: Fish.type.polymorphicDiscriminator,
          uberParent: "Fish",
          className: "Sawshark",
          modelProperties: {
            ...Shark.type.modelProperties,
            picture: {
              serializedName: "picture",
              type: {
                name: "ByteArray",
              },
            },
          },
        },
      };

      const Goblinshark: CompositeMapper = {
        serializedName: "goblin",
        type: {
          name: "Composite",
          polymorphicDiscriminator: Fish.type.polymorphicDiscriminator,
          uberParent: "Fish",
          className: "Goblinshark",
          modelProperties: {
            ...Shark.type.modelProperties,
            jawsize: {
              serializedName: "jawsize",
              type: {
                name: "Number",
              },
            },
            color: {
              serializedName: "color",
              defaultValue: "gray",
              type: {
                name: "String",
              },
            },
          },
        },
      };

      const mappers = {
        discriminators: {
          Fish: Fish,
          "Fish.salmon": Salmon,
          "Fish.shark": Shark,
          "Fish.sawshark": Sawshark,
          "Fish.goblin": Goblinshark,
        },
        Fish,
        Salmon,
        Shark,
        Sawshark,
        Goblinshark,
      };

      it("should be deserialized with child properties", function () {
        const body = {
          fishtype: "salmon",
          location: "alaska",
          iswild: true,
          species: "king",
          length: 1,
          siblings: [
            {
              fishtype: "shark",
              age: 6,
              birthday: "2012-01-05T01:00:00Z",
              length: 20,
              species: "predator",
            },
            {
              fishtype: "sawshark",
              age: 105,
              birthday: "1900-01-05T01:00:00Z",
              length: 10,
              picture: "//////4=",
              species: "dangerous",
            },
            {
              fishtype: "goblin",
              age: 1,
              birthday: "2015-08-08T00:00:00Z",
              length: 30,
              species: "scary",
              jawsize: 5,
              color: "pinkish-gray",
            },
          ],
        };

        const serializer = createSerializer(mappers);
        const result = serializer.deserialize(Fish, body, "");

        assert.equal(result.siblings.length, 3);
        assert.exists(result.siblings[1].picture);
        assert.equal(result.siblings[2].jawsize, 5);
      });

      it("should be serialized with child properties", function () {
        const body = {
          fishtype: "salmon",
          location: "alaska",
          iswild: true,
          species: "king",
          length: 1.0,
          siblings: [
            {
              fishtype: "shark",
              age: 6,
              birthday: new Date("2012-01-05T01:00:00Z"),
              length: 20.0,
              species: "predator",
            },
            {
              fishtype: "sawshark",
              age: 105,
              birthday: new Date("1900-01-05T01:00:00Z"),
              length: 10.0,
              picture: new Uint8Array([255, 255, 255, 255, 254]),
              species: "dangerous",
            },
            {
              fishtype: "goblin",
              color: "pinkish-gray",
              age: 1,
              length: 30,
              species: "scary",
              birthday: new Date("2015-08-08T00:00:00Z"),
              jawsize: 5,
            },
          ],
        };

        const serializer = createSerializer(mappers);
        const result = serializer.serialize(Fish, body, "");

        assert.equal(result.siblings.length, 3);
        assert.exists(result.siblings[1].picture);
        assert.equal(result.siblings[2].jawsize, 5);
      });
    });

    it("should correctly deserialize polymorphic children of a sequence of polymorphic elements", function () {
      const serializedPayload = {
        properties: {
          input: {
            "@odata.type": "#Microsoft.Media.JobInputSequence",
            inputs: [
              {
                "@odata.type": "#Microsoft.Media.JobInputAsset",
                start: {
                  "@odata.type": "#Microsoft.Media.AbsoluteClipTime",
                  time: "PT0S",
                },
                label: "bumper",
                assetName: "input2",
              },
              {
                "@odata.type": "#Microsoft.Media.JobInputAsset",
                start: {
                  "@odata.type": "#Microsoft.Media.AbsoluteClipTime",
                  time: "PT0S",
                },
                label: "main",
                assetName: "input",
              },
            ],
          },
          outputs: [
            {
              "@odata.type": "#Microsoft.Media.JobOutputAsset",
              assetName: "outputAssetName",
            },
          ],
        },
      };

      const MediaSerializer = createSerializer(MediaMappers);
      const result = MediaSerializer.deserialize(
        MediaMappers.Job,
        serializedPayload,
        "anyResponseBody",
      );
      // This can fail by "@odata.type" properties not turning into odataType
      assert.deepStrictEqual(result, {
        input: {
          odataType: "#Microsoft.Media.JobInputSequence",
          inputs: [
            {
              odataType: "#Microsoft.Media.JobInputAsset",
              start: {
                odataType: "#Microsoft.Media.AbsoluteClipTime",
                time: "PT0S",
              },
              label: "bumper",
              assetName: "input2",
            },
            {
              odataType: "#Microsoft.Media.JobInputAsset",
              start: {
                odataType: "#Microsoft.Media.AbsoluteClipTime",
                time: "PT0S",
              },
              label: "main",
              assetName: "input",
            },
          ],
        },
        outputs: [
          {
            odataType: "#Microsoft.Media.JobOutputAsset",
            assetName: "outputAssetName",
          },
        ],
      });
    });
  });
});

describe("serializer", () => {
  const serializer = createSerializer({}, false);

  describe("bufferToBase64Url / base64UrlToByteArray", () => {
    it("should serialize Base64Url type with valid Uint8Array", () => {
      const result = serializer.serialize(
        { type: { name: "Base64Url" }, serializedName: "test" },
        new Uint8Array([1, 2, 3]),
        "testObj",
      );
      assert.isString(result);
    });

    it("should deserialize Base64Url type", () => {
      const result = serializer.deserialize(
        { type: { name: "Base64Url" }, serializedName: "test" },
        "AQID",
        "testObj",
      );
      assert.instanceOf(result, Uint8Array);
    });

    it("should return undefined for falsy Base64Url deserialization", () => {
      const result = serializer.deserialize(
        { type: { name: "Base64Url" }, serializedName: "test" },
        "",
        "testObj",
      );
      assert.isUndefined(result);
    });

    it("should return undefined for falsy buffer in bufferToBase64Url path", () => {
      const result = serializer.serialize(
        { type: { name: "Base64Url" }, serializedName: "test" },
        null,
        "testObj",
      );
      assert.isNull(result);
    });
  });

  describe("serializeBasicTypes", () => {
    it("should throw for Number type with non-number value", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "Number" }, serializedName: "test" },
            "notANumber",
            "testObj",
          ),
        /must be of type number/,
      );
    });

    it("should throw for String type with non-string value", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "String" }, serializedName: "test" },
            123,
            "testObj",
          ),
        /must be of type string/,
      );
    });

    it("should throw for Boolean type with non-boolean value", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "Boolean" }, serializedName: "test" },
            "notBool",
            "testObj",
          ),
        /must be of type boolean/,
      );
    });

    it("should throw for Uuid type with invalid uuid", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "Uuid" }, serializedName: "test" },
            "not-a-uuid",
            "testObj",
          ),
        /must be of type string and a valid uuid/,
      );
    });

    it("should throw for Stream type with invalid stream value", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "Stream" }, serializedName: "test" },
            12345,
            "testObj",
          ),
        /must be a string, Blob, ArrayBuffer/,
      );
    });

    it("should accept a function as Stream type", () => {
      const fn = () => {};
      const result = serializer.serialize(
        { type: { name: "Stream" }, serializedName: "test" },
        fn,
        "testObj",
      );
      assert.strictEqual(result, fn);
    });

    it("should accept ArrayBuffer as Stream type", () => {
      const buf = new ArrayBuffer(8);
      const result = serializer.serialize(
        { type: { name: "Stream" }, serializedName: "test" },
        buf,
        "testObj",
      );
      assert.strictEqual(result, buf);
    });

    it("should accept ArrayBufferView as Stream type", () => {
      const view = new Uint8Array(8);
      const result = serializer.serialize(
        { type: { name: "Stream" }, serializedName: "test" },
        view,
        "testObj",
      );
      assert.strictEqual(result, view);
    });
  });

  describe("serializeDateTypes", () => {
    it("should serialize Date type from Date object", () => {
      const d = new Date("2023-06-15T00:00:00Z");
      const result = serializer.serialize(
        { type: { name: "Date" }, serializedName: "test" },
        d,
        "testObj",
      );
      assert.strictEqual(result, "2023-06-15");
    });

    it("should serialize Date type from string", () => {
      const result = serializer.serialize(
        { type: { name: "Date" }, serializedName: "test" },
        "2023-06-15",
        "testObj",
      );
      assert.strictEqual(result, "2023-06-15");
    });

    it("should throw for Date type with invalid value", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "Date" }, serializedName: "test" },
            12345,
            "testObj",
          ),
        /must be an instanceof Date or a string in ISO8601 format/,
      );
    });

    it("should serialize DateTime type from Date object", () => {
      const d = new Date("2023-06-15T10:30:00Z");
      const result = serializer.serialize(
        { type: { name: "DateTime" }, serializedName: "test" },
        d,
        "testObj",
      );
      assert.include(result, "2023-06-15");
    });

    it("should serialize DateTime type from string", () => {
      const result = serializer.serialize(
        { type: { name: "DateTime" }, serializedName: "test" },
        "2023-06-15T10:30:00Z",
        "testObj",
      );
      assert.include(result, "2023-06-15");
    });

    it("should throw for DateTime type with invalid value", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "DateTime" }, serializedName: "test" },
            {},
            "testObj",
          ),
        /must be an instanceof Date or a string in ISO8601 format/,
      );
    });

    it("should serialize DateTimeRfc1123 type from Date object", () => {
      const d = new Date("2023-06-15T10:30:00Z");
      const result = serializer.serialize(
        { type: { name: "DateTimeRfc1123" }, serializedName: "test" },
        d,
        "testObj",
      );
      assert.isString(result);
    });

    it("should serialize DateTimeRfc1123 type from string", () => {
      const result = serializer.serialize(
        { type: { name: "DateTimeRfc1123" }, serializedName: "test" },
        "Thu, 15 Jun 2023 10:30:00 GMT",
        "testObj",
      );
      assert.isString(result);
    });

    it("should throw for DateTimeRfc1123 type with invalid value", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "DateTimeRfc1123" }, serializedName: "test" },
            {},
            "testObj",
          ),
        /must be an instanceof Date or a string in RFC-1123 format/,
      );
    });

    it("should serialize UnixTime type from Date object", () => {
      const d = new Date("2023-06-15T10:30:00Z");
      const result = serializer.serialize(
        { type: { name: "UnixTime" }, serializedName: "test" },
        d,
        "testObj",
      );
      assert.isNumber(result);
    });

    it("should serialize UnixTime type from date string", () => {
      const result = serializer.serialize(
        { type: { name: "UnixTime" }, serializedName: "test" },
        "2023-06-15T10:30:00Z",
        "testObj",
      );
      assert.isNumber(result);
      assert.strictEqual(result, Math.floor(new Date("2023-06-15T10:30:00Z").getTime() / 1000));
    });

    it("should throw for UnixTime type with invalid value", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "UnixTime" }, serializedName: "test" },
            {},
            "testObj",
          ),
        /must be an instanceof Date or a string/,
      );
    });

    it("should serialize TimeSpan type with valid duration", () => {
      const result = serializer.serialize(
        { type: { name: "TimeSpan" }, serializedName: "test" },
        "P1D",
        "testObj",
      );
      assert.strictEqual(result, "P1D");
    });

    it("should throw for TimeSpan type with invalid duration", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "TimeSpan" }, serializedName: "test" },
            "notADuration",
            "testObj",
          ),
        /must be a string in ISO 8601 format/,
      );
    });

    it("should deserialize UnixTime type", () => {
      const result = serializer.deserialize(
        { type: { name: "UnixTime" }, serializedName: "test" },
        1686826200,
        "testObj",
      );
      assert.instanceOf(result, Date);
    });

    it("should return undefined for falsy UnixTime deserialization", () => {
      const result = serializer.deserialize(
        { type: { name: "UnixTime" }, serializedName: "test" },
        0,
        "testObj",
      );
      assert.isUndefined(result);
    });
  });

  describe("serializeSequenceType", () => {
    it("should throw for non-array input", () => {
      assert.throws(
        () =>
          serializer.serialize(
            {
              type: {
                name: "Sequence",
                element: { type: { name: "String" } },
              },
              serializedName: "test",
            } as SequenceMapper,
            "notAnArray",
            "testObj",
          ),
        /must be of type Array/,
      );
    });

    it("should throw for missing element metadata", () => {
      assert.throws(
        () =>
          serializer.serialize(
            {
              type: { name: "Sequence" } as unknown as SequenceMapperType,
              serializedName: "test",
            },
            [1, 2],
            "testObj",
          ),
        /element" metadata for an Array must be defined/,
      );
    });
  });

  describe("serializeDictionaryType", () => {
    it("should throw for non-object input", () => {
      assert.throws(
        () =>
          serializer.serialize(
            {
              type: {
                name: "Dictionary",
                value: { type: { name: "String" } },
              },
              serializedName: "test",
            } as DictionaryMapper,
            "notAnObject",
            "testObj",
          ),
        /must be of type object/,
      );
    });

    it("should throw for missing value metadata", () => {
      assert.throws(
        () =>
          serializer.serialize(
            {
              type: { name: "Dictionary" } as unknown as DictionaryMapperType,
              serializedName: "test",
            },
            { a: 1 },
            "testObj",
          ),
        /"value" metadata for a Dictionary must be defined/,
      );
    });
  });

  describe("deserializeDictionaryType", () => {
    it("should throw for missing value metadata", () => {
      assert.throws(
        () =>
          serializer.deserialize(
            {
              type: { name: "Dictionary" } as unknown as DictionaryMapperType,
              serializedName: "test",
            },
            { a: 1 },
            "testObj",
          ),
        /"value" metadata for a Dictionary must be defined/,
      );
    });
  });

  describe("deserializeSequenceType", () => {
    it("should throw for missing element metadata", () => {
      assert.throws(
        () =>
          serializer.deserialize(
            {
              type: { name: "Sequence" } as unknown as SequenceMapperType,
              serializedName: "test",
            },
            [1, 2],
            "testObj",
          ),
        /element" metadata for an Array must be defined/,
      );
    });

    it("should wrap non-array into array (xml2js quirk)", () => {
      const result = serializer.deserialize(
        {
          type: {
            name: "Sequence",
            element: { type: { name: "Number" } },
          },
          serializedName: "test",
        } as SequenceMapper,
        42,
        "testObj",
      );
      assert.deepStrictEqual(result, [42]);
    });

    it("should return falsy responseBody as-is", () => {
      const result = serializer.deserialize(
        {
          type: {
            name: "Sequence",
            element: { type: { name: "Number" } },
          },
          serializedName: "test",
        } as SequenceMapper,
        null,
        "testObj",
      );
      assert.isNull(result);
    });

    it("should look up Composite element by className from modelMappers", () => {
      const childMapper: CompositeMapper = {
        serializedName: "Child",
        type: {
          name: "Composite",
          className: "Child",
          modelProperties: {
            id: { serializedName: "id", type: { name: "Number" } },
          },
        },
      };
      const s = createSerializer({ Child: childMapper }, false);
      const result = s.deserialize(
        {
          type: {
            name: "Sequence",
            element: {
              type: { name: "Composite", className: "Child" },
            },
          },
          serializedName: "test",
        } as SequenceMapper,
        [{ id: 1 }, { id: 2 }],
        "testObj",
      );
      assert.deepStrictEqual(result, [{ id: 1 }, { id: 2 }]);
    });
  });

  describe("resolveModelProperties / resolveReferencedMapper", () => {
    it("should throw when className is not provided", () => {
      assert.throws(
        () =>
          serializer.serialize(
            {
              type: { name: "Composite" } as unknown as CompositeMapperType,
              serializedName: "test",
            },
            { a: 1 },
            "testObj",
          ),
        /Class name for model/,
      );
    });

    it("should throw when referenced mapper is not found", () => {
      assert.throws(
        () =>
          serializer.serialize(
            {
              type: { name: "Composite", className: "NonExistent" },
              serializedName: "test",
            } as CompositeMapper,
            { a: 1 },
            "testObj",
          ),
        /mapper\(\) cannot be null or undefined/,
      );
    });

    it("should throw when modelProperties are not found on referenced mapper", () => {
      const s = createSerializer(
        { Broken: { serializedName: "Broken", type: { name: "Composite", className: "Broken" } } },
        false,
      );
      assert.throws(
        () =>
          s.serialize(
            {
              type: { name: "Composite", className: "Broken" },
              serializedName: "test",
            } as CompositeMapper,
            { a: 1 },
            "testObj",
          ),
        /modelProperties cannot be null or undefined/,
      );
    });
  });

  describe("serializeCompositeType - additionalProperties", () => {
    it("should serialize additionalProperties", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          className: "Test",
          modelProperties: {
            id: { serializedName: "id", type: { name: "Number" } },
          },
          additionalProperties: { type: { name: "String" } },
        },
      };
      const result = serializer.serialize(mapper, { id: 1, extra: "value" }, "testObj");
      assert.strictEqual(result.id, 1);
      assert.strictEqual(result.extra, "value");
    });

    it("should resolve additionalProperties from referenced mapper", () => {
      const refMapper: CompositeMapper = {
        serializedName: "Ref",
        type: {
          name: "Composite",
          className: "Ref",
          modelProperties: {
            id: { serializedName: "id", type: { name: "Number" } },
          },
          additionalProperties: { type: { name: "String" } },
        },
      };
      const s = createSerializer({ Ref: refMapper }, false);
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          className: "Ref",
        },
      };
      const result = s.serialize(mapper, { id: 1, extra: "value" }, "testObj");
      assert.strictEqual(result.id, 1);
      assert.strictEqual(result.extra, "value");
    });
  });

  describe("deserializeCompositeType", () => {
    it("should handle headerCollectionPrefix", () => {
      const mapper: CompositeMapper = {
        serializedName: "Headers",
        type: {
          name: "Composite",
          modelProperties: {
            metadata: {
              serializedName: "metadata",
              type: {
                name: "Dictionary",
                value: { type: { name: "String" } },
              },
              headerCollectionPrefix: "x-ms-meta-",
            } as DictionaryMapper,
          },
        },
      };
      const result = serializer.deserialize(
        mapper,
        {
          "x-ms-meta-key1": "val1",
          "x-ms-meta-key2": "val2",
          other: "ignored",
        },
        "testObj",
      );
      assert.deepStrictEqual(result.metadata, { key1: "val1", key2: "val2" });
    });

    it("should handle ignoreUnknownProperties option", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            id: { serializedName: "id", type: { name: "Number" } },
          },
        },
      };
      const result = serializer.deserialize(mapper, { id: 1, unknownProp: "hello" }, "testObj", {
        xml: {},
        ignoreUnknownProperties: true,
      });
      assert.strictEqual(result.id, 1);
      assert.isUndefined(result.unknownProp);
    });

    it("should pass through unknown properties when ignoreUnknownProperties is false/default", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            id: { serializedName: "id", type: { name: "Number" } },
          },
        },
      };
      const result = serializer.deserialize(mapper, { id: 1, unknownProp: "hello" }, "testObj");
      assert.strictEqual(result.id, 1);
      assert.strictEqual(result.unknownProp, "hello");
    });

    it("should handle paging deserialization (serializedName === '')", () => {
      const mapper: CompositeMapper = {
        serializedName: "PagedResult",
        type: {
          name: "Composite",
          modelProperties: {
            value: {
              serializedName: "",
              type: {
                name: "Sequence",
                element: { type: { name: "Number" } },
              },
            },
            nextLink: {
              serializedName: "nextLink",
              type: { name: "String" },
            },
          },
        },
      };
      // The paging path checks Array.isArray(responseBody[key]) && serializedName === ""
      // responseBody must have a "value" key that is an array
      const body = { value: [1, 2, 3], nextLink: "https://next" };
      const result = serializer.deserialize(mapper, body, "testObj");
      assert.deepStrictEqual(Array.from(result), [1, 2, 3]);
      assert.strictEqual(result.nextLink, "https://next");
    });

    it("should handle nested serializedName paths with null intermediate", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            deepValue: {
              serializedName: "level1.level2",
              type: { name: "String" },
            },
          },
        },
      };
      const result = serializer.deserialize(mapper, { level1: null }, "testObj");
      assert.isUndefined(result.deepValue);
    });

    it("should handle additionalProperties during deserialization", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            id: { serializedName: "id", type: { name: "Number" } },
          },
          additionalProperties: { type: { name: "String" } },
        },
      };
      const result = serializer.deserialize(mapper, { id: 1, extra: "extraVal" }, "testObj");
      assert.strictEqual(result.id, 1);
      assert.strictEqual(result.extra, "extraVal");
    });
  });

  describe("serializeByteArrayType", () => {
    it("should throw for non-Uint8Array input", () => {
      assert.throws(
        () =>
          serializer.serialize(
            { type: { name: "ByteArray" }, serializedName: "test" },
            "notABuffer",
            "testObj",
          ),
        /must be of type Uint8Array/,
      );
    });
  });

  describe("serialize nullable/required", () => {
    it("should throw when required and nullable and value is undefined", () => {
      assert.throws(
        () =>
          serializer.serialize(
            {
              type: { name: "String" },
              serializedName: "test",
              required: true,
              nullable: true,
            },
            undefined,
            "testObj",
          ),
        /cannot be undefined/,
      );
    });

    it("should throw when not required and nullable is false and value is null", () => {
      assert.throws(
        () =>
          serializer.serialize(
            {
              type: { name: "String" },
              serializedName: "test",
              required: false,
              nullable: false,
            },
            null,
            "testObj",
          ),
        /cannot be null/,
      );
    });
  });

  describe("validateConstraints", () => {
    it("should validate ExclusiveMaximum", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "Number" },
              serializedName: "test",
              constraints: { ExclusiveMaximum: 10 },
            },
            10,
            "testObj",
          ),
        /ExclusiveMaximum/,
      );
    });

    it("should validate ExclusiveMinimum", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "Number" },
              serializedName: "test",
              constraints: { ExclusiveMinimum: 5 },
            },
            5,
            "testObj",
          ),
        /ExclusiveMinimum/,
      );
    });

    it("should validate InclusiveMaximum", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "Number" },
              serializedName: "test",
              constraints: { InclusiveMaximum: 10 },
            },
            11,
            "testObj",
          ),
        /InclusiveMaximum/,
      );
    });

    it("should validate InclusiveMinimum", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "Number" },
              serializedName: "test",
              constraints: { InclusiveMinimum: 5 },
            },
            4,
            "testObj",
          ),
        /InclusiveMinimum/,
      );
    });

    it("should validate MaxItems", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "Sequence", element: { type: { name: "String" } } },
              serializedName: "test",
              constraints: { MaxItems: 2 },
            },
            [1, 2, 3],
            "testObj",
          ),
        /MaxItems/,
      );
    });

    it("should validate MinItems", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "Sequence", element: { type: { name: "String" } } },
              serializedName: "test",
              constraints: { MinItems: 2 },
            },
            [1],
            "testObj",
          ),
        /MinItems/,
      );
    });

    it("should validate MaxLength", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "String" },
              serializedName: "test",
              constraints: { MaxLength: 3 },
            },
            "abcd",
            "testObj",
          ),
        /MaxLength/,
      );
    });

    it("should validate MinLength", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "String" },
              serializedName: "test",
              constraints: { MinLength: 3 },
            },
            "ab",
            "testObj",
          ),
        /MinLength/,
      );
    });

    it("should validate MultipleOf", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "Number" },
              serializedName: "test",
              constraints: { MultipleOf: 3 },
            },
            7,
            "testObj",
          ),
        /MultipleOf/,
      );
    });

    it("should validate Pattern", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "String" },
              serializedName: "test",
              constraints: { Pattern: /^[a-z]+$/ },
            },
            "ABC123",
            "testObj",
          ),
        /Pattern/,
      );
    });

    it("should validate UniqueItems", () => {
      assert.throws(
        () =>
          serializer.validateConstraints(
            {
              type: { name: "Sequence", element: { type: { name: "Number" } } },
              serializedName: "test",
              constraints: { UniqueItems: true },
            },
            [1, 2, 2],
            "testObj",
          ),
        /UniqueItems/,
      );
    });

    it("should not validate constraints for null/undefined values", () => {
      // Should not throw
      serializer.validateConstraints(
        {
          type: { name: "Number" },
          serializedName: "test",
          constraints: { InclusiveMaximum: 10 },
        },
        null,
        "testObj",
      );
      serializer.validateConstraints(
        {
          type: { name: "Number" },
          serializedName: "test",
          constraints: { InclusiveMaximum: 10 },
        },
        undefined,
        "testObj",
      );
    });
  });

  describe("serializeEnumType", () => {
    it("should throw for missing allowedValues", () => {
      assert.throws(
        () =>
          serializer.serialize(
            {
              type: { name: "Enum" } as unknown as EnumMapperType,
              serializedName: "test",
            },
            "value",
            "testObj",
          ),
        /Please provide a set of allowedValues/,
      );
    });

    it("should throw for value not in allowedValues", () => {
      assert.throws(
        () =>
          serializer.serialize(
            {
              type: { name: "Enum", allowedValues: ["a", "b"] },
              serializedName: "test",
            },
            "c",
            "testObj",
          ),
        /is not a valid value/,
      );
    });
  });

  describe("XML serialization - sequence element xmlNamespace", () => {
    const xmlSerializer = createSerializer({}, true);

    it("should add xmlns to Composite element in XML sequence", () => {
      const mapper: SequenceMapper = {
        serializedName: "Items",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              modelProperties: {
                id: { serializedName: "id", type: { name: "Number" } },
              },
            },
            xmlNamespace: "http://example.com",
            xmlNamespacePrefix: "ex",
          } as CompositeMapper,
        },
      };
      const result = xmlSerializer.serialize(mapper, [{ id: 1 }], "testObj");
      assert.deepStrictEqual(result[0].$, { "xmlns:ex": "http://example.com" });
    });

    it("should add xmlns to non-Composite element in XML sequence", () => {
      const mapper: SequenceMapper = {
        serializedName: "Items",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            xmlNamespace: "http://example.com",
            serializedName: "item",
          },
        },
      };
      const result = xmlSerializer.serialize(mapper, ["hello"], "testObj");
      assert.strictEqual(result[0]._, "hello");
      assert.deepStrictEqual(result[0].$, { xmlns: "http://example.com" });
    });
  });

  describe("XML deserialization - isXML branches", () => {
    const xmlSerializer = createSerializer({}, true);

    it("should handle xmlIsAttribute", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            name: {
              serializedName: "name",
              xmlName: "name",
              xmlIsAttribute: true,
              type: { name: "String" },
            },
          },
        },
      };
      const result = xmlSerializer.deserialize(mapper, { $: { name: "testValue" } }, "testObj");
      assert.strictEqual(result.name, "testValue");
    });

    it("should handle xmlIsMsText with xmlCharKey", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            content: {
              serializedName: "content",
              xmlName: "content",
              xmlIsMsText: true,
              type: { name: "String" },
            },
          },
        },
      };
      const result = xmlSerializer.deserialize(mapper, { _: "textContent" }, "testObj");
      assert.strictEqual(result.content, "textContent");
    });

    it("should handle xmlIsMsText with string responseBody", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            content: {
              serializedName: "content",
              xmlName: "content",
              xmlIsMsText: true,
              type: { name: "String" },
            },
          },
        },
      };
      const result = xmlSerializer.deserialize(mapper, "directString", "testObj");
      assert.strictEqual(result.content, "directString");
    });

    it("should handle xmlIsWrapped", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            items: {
              serializedName: "items",
              xmlName: "Items",
              xmlElementName: "Item",
              xmlIsWrapped: true,
              type: {
                name: "Sequence",
                element: { type: { name: "String" } },
              },
            },
          },
        },
      };
      const result = xmlSerializer.deserialize(mapper, { Items: { Item: ["a", "b"] } }, "testObj");
      assert.deepStrictEqual(result.items, ["a", "b"]);
    });

    it("should handle xmlIsWrapped with missing wrapped element", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            items: {
              serializedName: "items",
              xmlName: "Items",
              xmlElementName: "Item",
              xmlIsWrapped: true,
              type: {
                name: "Sequence",
                element: { type: { name: "String" } },
              },
            },
          },
        },
      };
      const result = xmlSerializer.deserialize(mapper, { Items: {} }, "testObj");
      assert.deepStrictEqual(result.items, []);
    });

    it("should serialize xmlIsAttribute in Composite", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            name: {
              serializedName: "name",
              xmlName: "name",
              xmlIsAttribute: true,
              type: { name: "String" },
            },
          },
        },
      };
      const result = xmlSerializer.serialize(mapper, { name: "testValue" }, "testObj");
      assert.deepStrictEqual(result.$, { name: "testValue" });
    });

    it("should serialize xmlIsWrapped in Composite", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            items: {
              serializedName: "items",
              xmlName: "Items",
              xmlElementName: "Item",
              xmlIsWrapped: true,
              type: {
                name: "Sequence",
                element: { type: { name: "String" } },
              },
            },
          },
        },
      };
      const result = xmlSerializer.serialize(mapper, { items: ["a", "b"] }, "testObj");
      assert.deepStrictEqual(result.Items, { Item: ["a", "b"] });
    });
  });

  describe("deserialize - XML body with $ and _ keys", () => {
    const xmlSerializer = createSerializer({}, true);

    it("should reduce responseBody to xmlCharKey when both $ and _ present", () => {
      const result = xmlSerializer.deserialize(
        { type: { name: "String" }, serializedName: "test" },
        { $: { attr: "val" }, _: "bodyContent" },
        "testObj",
      );
      assert.strictEqual(result, "bodyContent");
    });
  });

  describe("deserialize - Boolean strings", () => {
    it("should parse 'true' string as boolean true", () => {
      const result = serializer.deserialize(
        { type: { name: "Boolean" }, serializedName: "test" },
        "true",
        "testObj",
      );
      assert.strictEqual(result, true);
    });

    it("should parse 'false' string as boolean false", () => {
      const result = serializer.deserialize(
        { type: { name: "Boolean" }, serializedName: "test" },
        "false",
        "testObj",
      );
      assert.strictEqual(result, false);
    });

    it("should return raw boolean value", () => {
      const result = serializer.deserialize(
        { type: { name: "Boolean" }, serializedName: "test" },
        true,
        "testObj",
      );
      assert.strictEqual(result, true);
    });
  });

  describe("deserialize - Number", () => {
    it("should parse NaN number as raw value", () => {
      const result = serializer.deserialize(
        { type: { name: "Number" }, serializedName: "test" },
        "notANumber",
        "testObj",
      );
      assert.strictEqual(result, "notANumber");
    });
  });

  describe("deserialize - Date types", () => {
    it("should deserialize Date type", () => {
      const result = serializer.deserialize(
        { type: { name: "Date" }, serializedName: "test" },
        "2023-06-15",
        "testObj",
      );
      assert.instanceOf(result, Date);
    });

    it("should deserialize DateTime type", () => {
      const result = serializer.deserialize(
        { type: { name: "DateTime" }, serializedName: "test" },
        "2023-06-15T10:30:00Z",
        "testObj",
      );
      assert.instanceOf(result, Date);
    });

    it("should deserialize DateTimeRfc1123 type", () => {
      const result = serializer.deserialize(
        { type: { name: "DateTimeRfc1123" }, serializedName: "test" },
        "Thu, 15 Jun 2023 10:30:00 GMT",
        "testObj",
      );
      assert.instanceOf(result, Date);
    });

    it("should deserialize ByteArray type", () => {
      const result = serializer.deserialize(
        { type: { name: "ByteArray" }, serializedName: "test" },
        "AQID",
        "testObj",
      );
      assert.instanceOf(result, Uint8Array);
    });
  });

  describe("serialize - readOnly property skipping", () => {
    it("should skip readOnly properties during serialization", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            id: { serializedName: "id", readOnly: true, type: { name: "Number" } },
            name: { serializedName: "name", type: { name: "String" } },
          },
        },
      };
      const result = serializer.serialize(mapper, { id: 1, name: "test" }, "testObj");
      assert.isUndefined(result.id);
      assert.strictEqual(result.name, "test");
    });
  });

  describe("serialize - nested serializedName paths", () => {
    it("should create intermediate objects for nested paths", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            deepProp: {
              serializedName: "level1.level2.value",
              type: { name: "String" },
            },
          },
        },
      };
      const result = serializer.serialize(mapper, { deepProp: "hello" }, "testObj");
      assert.strictEqual(result.level1.level2.value, "hello");
    });
  });

  describe("serialize - isConstant", () => {
    it("should use defaultValue for isConstant mapper", () => {
      const result = serializer.serialize(
        {
          type: { name: "String" },
          serializedName: "test",
          isConstant: true,
          defaultValue: "constantValue",
        },
        "anyValue",
        "testObj",
      );
      assert.strictEqual(result, "constantValue");
    });
  });

  describe("deserialize - isConstant", () => {
    it("should return defaultValue for isConstant mapper during deserialization", () => {
      const result = serializer.deserialize(
        {
          type: { name: "String" },
          serializedName: "test",
          isConstant: true,
          defaultValue: "constantValue",
        },
        "anyResponseValue",
        "testObj",
      );
      assert.strictEqual(result, "constantValue");
    });
  });

  describe("deserialize - defaultValue", () => {
    it("should return defaultValue when responseBody is undefined", () => {
      const result = serializer.deserialize(
        {
          type: { name: "String" },
          serializedName: "test",
          defaultValue: "defaultVal",
        },
        undefined,
        "testObj",
      );
      assert.strictEqual(result, "defaultVal");
    });
  });

  describe("XML Sequence edge case - empty list", () => {
    const xmlSerializer = createSerializer({}, true);

    it("should return empty array for undefined XML non-wrapped Sequence", () => {
      const result = xmlSerializer.deserialize(
        {
          type: {
            name: "Sequence",
            element: { type: { name: "String" } },
          },
          serializedName: "test",
        } as SequenceMapper,
        undefined,
        "testObj",
      );
      assert.deepStrictEqual(result, []);
    });

    it("should return defaultValue for wrapped XML Sequence that is undefined", () => {
      const result = xmlSerializer.deserialize(
        {
          type: {
            name: "Sequence",
            element: { type: { name: "String" } },
          },
          serializedName: "test",
          xmlIsWrapped: true,
          defaultValue: [],
        } as SequenceMapper,
        undefined,
        "testObj",
      );
      assert.deepStrictEqual(result, []);
    });
  });

  describe("serialize - xmlNamespace on Composite", () => {
    const xmlSerializer = createSerializer({}, true);

    it("should add xmlNamespace to Composite root", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        xmlNamespace: "http://example.com",
        xmlNamespacePrefix: "ex",
        type: {
          name: "Composite",
          modelProperties: {
            name: { serializedName: "name", xmlName: "name", type: { name: "String" } },
          },
        },
      };
      const result = xmlSerializer.serialize(mapper, { name: "test" }, "testObj");
      assert.deepStrictEqual(result.$, { "xmlns:ex": "http://example.com" });
    });
  });

  describe("serialize - Dictionary with xmlNamespace", () => {
    const xmlSerializer = createSerializer({}, true);

    it("should add xmlNamespace to Dictionary root", () => {
      const mapper: DictionaryMapper = {
        serializedName: "Dict",
        xmlNamespace: "http://example.com",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } },
        },
      };
      const result = xmlSerializer.serialize(mapper, { key: "val" }, "testObj");
      assert.deepStrictEqual(result.$, { xmlns: "http://example.com" });
    });
  });

  describe("getXmlObjectValue", () => {
    const xmlSerializer = createSerializer({}, true);

    it("should add xmlns to non-Composite type with xmlNamespace", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            value: {
              serializedName: "value",
              xmlName: "value",
              xmlNamespace: "http://example.com",
              type: { name: "String" },
            },
          },
        },
      };
      const result = xmlSerializer.serialize(mapper, { value: "hello" }, "testObj");
      assert.strictEqual(result.value._, "hello");
      assert.deepStrictEqual(result.value.$, { xmlns: "http://example.com" });
    });

    it("should not duplicate xmlns for Composite type that already has $", () => {
      const childMapper: CompositeMapper = {
        serializedName: "Child",
        type: {
          name: "Composite",
          className: "Child",
          modelProperties: {
            id: { serializedName: "id", xmlName: "id", type: { name: "Number" } },
          },
        },
      };
      const s = createSerializer({ Child: childMapper }, true);
      const mapper: CompositeMapper = {
        serializedName: "Parent",
        type: {
          name: "Composite",
          modelProperties: {
            child: {
              serializedName: "child",
              xmlName: "child",
              xmlNamespace: "http://example.com",
              type: {
                name: "Composite",
                className: "Child",
              },
            },
          },
        },
      };
      // Serialize with a child that will get $ added via xmlNamespace on parent property
      const result = s.serialize(mapper, { child: { id: 1 } }, "testObj");
      assert.ok(result.child);
    });
  });

  describe("polymorphic mapper", () => {
    it("should find polymorphic mapper during serialization", () => {
      const baseMapper: CompositeMapper = {
        serializedName: "Animal",
        type: {
          name: "Composite",
          className: "Animal",
          uberParent: "Animal",
          polymorphicDiscriminator: {
            serializedName: "kind",
            clientName: "kind",
          },
          modelProperties: {
            kind: { serializedName: "kind", type: { name: "String" } },
          },
        },
      };
      const dogMapper: CompositeMapper = {
        serializedName: "Dog",
        type: {
          name: "Composite",
          className: "Dog",
          uberParent: "Animal",
          modelProperties: {
            kind: { serializedName: "kind", type: { name: "String" } },
            bark: { serializedName: "bark", type: { name: "Boolean" } },
          },
        },
      };
      const s = createSerializer(
        {
          Animal: baseMapper,
          Dog: dogMapper,
          discriminators: {
            "Animal.Dog": dogMapper,
          },
        },
        false,
      );
      const result = s.serialize(baseMapper, { kind: "Dog", bark: true }, "testObj");
      assert.strictEqual(result.kind, "Dog");
      assert.strictEqual(result.bark, true);
    });

    it("should find polymorphic mapper during deserialization", () => {
      const baseMapper: CompositeMapper = {
        serializedName: "Animal",
        type: {
          name: "Composite",
          className: "Animal",
          uberParent: "Animal",
          polymorphicDiscriminator: {
            serializedName: "kind",
            clientName: "kind",
          },
          modelProperties: {
            kind: { serializedName: "kind", type: { name: "String" } },
          },
        },
      };
      const dogMapper: CompositeMapper = {
        serializedName: "Dog",
        type: {
          name: "Composite",
          className: "Dog",
          uberParent: "Animal",
          modelProperties: {
            kind: { serializedName: "kind", type: { name: "String" } },
            bark: { serializedName: "bark", type: { name: "Boolean" } },
          },
        },
      };
      const s = createSerializer(
        {
          Animal: baseMapper,
          Dog: dogMapper,
          discriminators: {
            "Animal.Dog": dogMapper,
          },
        },
        false,
      );
      const result = s.deserialize(baseMapper, { kind: "Dog", bark: true }, "testObj");
      assert.strictEqual(result.kind, "Dog");
      assert.strictEqual(result.bark, true);
    });
  });

  describe("splitSerializeName with escaped dots", () => {
    it("should handle escaped dots in serializedName", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            dotProp: {
              serializedName: "level1\\.level2",
              type: { name: "String" },
            },
          },
        },
      };
      const result = serializer.serialize(mapper, { dotProp: "value" }, "testObj");
      assert.strictEqual(result["level1.level2"], "value");
    });
  });

  describe("Composite serialization - polymorphic discriminator default value", () => {
    it("should use mapper serializedName as discriminator value when toSerialize is undefined", () => {
      const baseMapper: CompositeMapper = {
        serializedName: "BaseType",
        type: {
          name: "Composite",
          className: "BaseType",
          uberParent: "BaseType",
          polymorphicDiscriminator: {
            serializedName: "type",
            clientName: "type",
          },
          modelProperties: {
            type: { serializedName: "type", type: { name: "String" } },
            name: { serializedName: "name", type: { name: "String" } },
          },
        },
      };
      const s = createSerializer(
        {
          BaseType: baseMapper,
          discriminators: {},
        },
        false,
      );
      const result = s.serialize(baseMapper, { name: "test" }, "testObj");
      assert.strictEqual(result.type, "BaseType");
    });
  });

  describe("serialize - Composite with empty object for undefined/null values", () => {
    it("should handle null values in Composite", () => {
      const mapper: CompositeMapper = {
        serializedName: "Test",
        type: {
          name: "Composite",
          modelProperties: {
            value: { serializedName: "value", type: { name: "String" } },
          },
        },
      };
      const result = serializer.serialize(mapper, null, "testObj");
      assert.isNull(result);
    });
  });

  describe("getPolymorphicDiscriminatorRecursively - uberParent/className lookup", () => {
    it("should look up polymorphicDiscriminator from uberParent", () => {
      const parentMapper: CompositeMapper = {
        serializedName: "Parent",
        type: {
          name: "Composite",
          className: "Parent",
          uberParent: "Parent",
          polymorphicDiscriminator: {
            serializedName: "type",
            clientName: "type",
          },
          modelProperties: {
            type: { serializedName: "type", type: { name: "String" } },
          },
        },
      };
      const childMapper: CompositeMapper = {
        serializedName: "Child",
        type: {
          name: "Composite",
          className: "Child",
          uberParent: "Parent",
          modelProperties: {
            type: { serializedName: "type", type: { name: "String" } },
            extra: { serializedName: "extra", type: { name: "String" } },
          },
        },
      };
      const s = createSerializer(
        {
          Parent: parentMapper,
          Child: childMapper,
          discriminators: { "Parent.Child": childMapper },
        },
        false,
      );
      const result = s.deserialize(childMapper, { type: "Child", extra: "val" }, "testObj");
      assert.strictEqual(result.extra, "val");
    });
  });
});

describe("serializer - Dictionary deserialization with falsy body", () => {
  it("should return falsy responseBody for Dictionary (0)", () => {
    const serializer = createSerializer({}, false);
    // 0 is falsy but not null/undefined, so it passes the null check at line 233
    // and reaches deserializeDictionaryType which returns it at line 1091
    const result = serializer.deserialize(
      {
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } },
        },
        serializedName: "test",
      } as DictionaryMapper,
      0,
      "testObj",
    );
    assert.strictEqual(result, 0);
  });
  it("should return falsy responseBody for Dictionary (empty string)", () => {
    const serializer = createSerializer({}, false);
    const result = serializer.deserialize(
      {
        type: {
          name: "Dictionary",
          value: { type: { name: "String" } },
        },
        serializedName: "test",
      } as DictionaryMapper,
      "",
      "testObj",
    );
    assert.strictEqual(result, "");
  });
});

describe("serializer - Sequence deserialization with falsy body", () => {
  it("should return falsy responseBody for Sequence (0)", () => {
    const serializer = createSerializer({}, false);
    const result = serializer.deserialize(
      {
        type: {
          name: "Sequence",
          element: { type: { name: "String" } },
        },
        serializedName: "test",
      } as SequenceMapper,
      0,
      "testObj",
    );
    assert.strictEqual(result, 0);
  });
  it("should return falsy responseBody for Sequence (false)", () => {
    const serializer = createSerializer({}, false);
    const result = serializer.deserialize(
      {
        type: {
          name: "Sequence",
          element: { type: { name: "String" } },
        },
        serializedName: "test",
      } as SequenceMapper,
      false,
      "testObj",
    );
    assert.strictEqual(result, false);
  });
});

describe("serializer - polymorphic discriminator default during deserialization", () => {
  it("should use mapper.serializedName as discriminator when value is missing", () => {
    const baseMapper: CompositeMapper = {
      serializedName: "Animal",
      type: {
        name: "Composite",
        className: "Animal",
        uberParent: "Animal",
        polymorphicDiscriminator: {
          serializedName: "kind",
          clientName: "kind",
        },
        modelProperties: {
          kind: { serializedName: "kind", type: { name: "String" } },
          name: { serializedName: "name", type: { name: "String" } },
        },
      },
    };
    const s = createSerializer({ Animal: baseMapper, discriminators: {} }, false);
    // When kind is not present in the response body, it should default to mapper.serializedName
    const result = s.deserialize(baseMapper, { name: "Fido" }, "testObj");
    assert.strictEqual(result.kind, "Animal");
  });
});

describe("serializer - Sequence element className lookup", () => {
  it("should look up Composite element by className from modelMappers during serialization", () => {
    const childMapper: CompositeMapper = {
      serializedName: "Child",
      type: {
        name: "Composite",
        className: "Child",
        modelProperties: {
          id: { serializedName: "id", type: { name: "Number" } },
          name: { serializedName: "name", type: { name: "String" } },
        },
      },
    };
    const s = createSerializer({ Child: childMapper }, false);
    const result = s.serialize(
      {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "Child" },
          },
        },
        serializedName: "test",
      } as SequenceMapper,
      [{ id: 1, name: "a" }],
      "testObj",
    );
    assert.deepStrictEqual(result, [{ id: 1, name: "a" }]);
  });
});

describe("serializer - getXmlObjectValue Composite with existing $ attr", () => {
  it("should return as-is when Composite already has $ from its own xmlNamespace", () => {
    // Child model WITH xmlNamespace - its serialization adds $ to payload
    const childModel: CompositeMapper = {
      serializedName: "ChildModel",
      xmlNamespace: "http://child.com",
      xmlNamespacePrefix: "ch",
      type: {
        name: "Composite",
        className: "ChildModel",
        modelProperties: {
          text: {
            serializedName: "text",
            xmlName: "text",
            type: { name: "String" },
          },
        },
      },
    };

    const parentMapper: CompositeMapper = {
      serializedName: "ParentModel",
      type: {
        name: "Composite",
        modelProperties: {
          child: {
            serializedName: "child",
            xmlName: "child",
            xmlNamespace: "http://outer.com",
            xmlNamespacePrefix: "outer",
            type: {
              name: "Composite",
              className: "ChildModel",
            },
          } as CompositeMapper,
        },
      },
    };

    const s = createSerializer({ ChildModel: childModel }, true);
    const result = s.serialize(parentMapper, { child: { text: "hello" } }, "testObj");
    // child should have $ from its own xmlNamespace (line 845 path)
    assert.ok(result.child);
    assert.ok(result.child.$);
    assert.strictEqual(result.child.text, "hello");
  });

  it("should add xmlns for Composite without existing $ attr", () => {
    // Child model with NO properties - so the for loop doesn't execute,
    // and $ is never set on the payload by serializeCompositeType
    const childModelEmpty: CompositeMapper = {
      serializedName: "ChildEmpty",
      type: {
        name: "Composite",
        className: "ChildEmpty",
        modelProperties: {},
      },
    };

    const parentMapper: CompositeMapper = {
      serializedName: "ParentModel2",
      type: {
        name: "Composite",
        modelProperties: {
          child: {
            serializedName: "child",
            xmlName: "child",
            xmlNamespace: "http://outer.com",
            type: {
              name: "Composite",
              className: "ChildEmpty",
            },
          } as CompositeMapper,
        },
      },
    };

    const s = createSerializer({ ChildEmpty: childModelEmpty }, true);
    const result = s.serialize(parentMapper, { child: {} }, "testObj");
    // getXmlObjectValue adds $ since child didn't have it (lines 847-849)
    assert.ok(result.child);
    assert.ok(result.child.$);
    assert.strictEqual(result.child.$["xmlns"], "http://outer.com");
  });

  it("should wrap non-Composite value with xmlNamespace", () => {
    // A non-Composite property (e.g., String) with xmlNamespace
    // goes through the non-Composite path in getXmlObjectValue
    const mapper: CompositeMapper = {
      serializedName: "Parent",
      type: {
        name: "Composite",
        modelProperties: {
          value: {
            serializedName: "value",
            xmlName: "value",
            xmlNamespace: "http://ns.com",
            xmlNamespacePrefix: "ns",
            type: { name: "String" },
          },
        },
      },
    };

    const s = createSerializer({}, true);
    const result = s.serialize(mapper, { value: "hello" }, "testObj");
    // The String value should be wrapped: { _: "hello", $: { "xmlns:ns": "http://ns.com" } }
    assert.ok(result.value);
    assert.ok(result.value.$);
    assert.strictEqual(result.value.$["xmlns:ns"], "http://ns.com");
    assert.strictEqual(result.value._, "hello");
  });
});
