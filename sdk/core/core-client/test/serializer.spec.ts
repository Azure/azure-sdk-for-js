// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  createSerializer,
  Mapper,
  EnumMapper,
  SequenceMapper,
  DictionaryMapper,
  CompositeMapper
} from "../src";
import { Mappers } from "./testMappers";

const Serializer = createSerializer(Mappers);
const valid_uuid = "ceaafd1e-f936-429f-bbfc-82ee75dddc33";

function stringToByteArray(str: string): Uint8Array {
  if (typeof Buffer === "function") {
    return Buffer.from(str, "utf-8");
  } else {
    return new TextEncoder().encode(str);
  }
}

describe("Serializer", function() {
  describe("serialize", function() {
    const invalid_uuid = "abcd-efgd90-90890jkh";

    it("should correctly serialize flattened properties", function() {
      const expected = {
        id: 1,
        name: "testProduct",
        details: {
          max_product_capacity: "Large",
          max_product_display_name: "MaxDisplayName"
        }
      };

      const serialized = Serializer.serialize(
        Mappers.SimpleProduct,
        {
          id: 1,
          name: "testProduct",
          maxProductDisplayName: "MaxDisplayName"
        },
        "SimpleProduct"
      );

      assert.deepEqual(serialized, expected);
    });

    it("should correctly serialize flattened properties when flattened constant is defined first", function() {
      const expected = {
        id: 1,
        name: "testProduct",
        details: {
          max_product_capacity: "Large",
          max_product_display_name: "MaxDisplayName"
        }
      };

      const serialized = Serializer.serialize(
        Mappers.SimpleProductConstFirst,
        {
          id: 1,
          name: "testProduct",
          maxProductDisplayName: "MaxDisplayName"
        },
        "SimpleProduct"
      );

      assert.deepEqual(serialized, expected);
    });

    it("should correctly serialize a string if the type is 'any'", function() {
      const mapper: Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any"
      };
      const serializedObject = Serializer.serialize(mapper, "foo", "anyBody");
      assert.equal(serializedObject, "foo");
    });

    it("should correctly serialize an array if the type is 'any'", function() {
      const mapper: Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any"
      };
      const serializedObject = Serializer.serialize(mapper, [1, 2], "anyBody");
      assert.deepEqual(serializedObject, [1, 2]);
    });

    it("should correctly serialize a string", function() {
      const mapper: Mapper = {
        type: { name: "String" },
        required: false,
        serializedName: "string"
      };
      const serializedObject = Serializer.serialize(mapper, "foo", "stringBody");
      assert.equal(serializedObject, "foo");
    });

    it("should correctly serialize a uuid", function() {
      const mapper: Mapper = {
        type: { name: "Uuid" },
        required: false,
        serializedName: "Uuid"
      };
      const serializedObject = Serializer.serialize(mapper, valid_uuid, "uuidBody");
      assert.equal(serializedObject, valid_uuid);
    });

    it("should throw an error if the value is not a valid Uuid", function() {
      const mapper: Mapper = {
        type: { name: "Uuid" },
        required: false,
        serializedName: "Uuid"
      };
      try {
        Serializer.serialize(mapper, invalid_uuid, "uuidBody");
      } catch (error) {
        assert.match(error.message, /.*with value.*must be of type string and a valid uuid/gi);
      }
    });

    it("should correctly serialize a number", function() {
      const mapper: Mapper = {
        type: { name: "Number" },
        required: false,
        serializedName: "Number"
      };
      const serializedObject = Serializer.serialize(mapper, 1.506, "stringBody");
      assert.equal(serializedObject, 1.506);
    });

    it("should correctly serialize a boolean", function() {
      const mapper: Mapper = {
        type: { name: "Boolean" },
        required: false,
        serializedName: "Boolean"
      };
      const serializedObject = Serializer.serialize(mapper, false, "stringBody");
      assert.equal(serializedObject, false);
    });

    it("should correctly serialize an Enum", function() {
      const mapper: EnumMapper = {
        type: { name: "Enum", allowedValues: [1, 2, 3, 4] },
        required: false,
        serializedName: "Enum"
      };
      const serializedObject = Serializer.serialize(mapper, 1, "enumBody");
      assert.equal(serializedObject, 1);
    });

    it("should throw an error if the value is not valid for an Enum", function() {
      const mapper: EnumMapper = {
        type: { name: "Enum", allowedValues: [1, 2, 3, 4] },
        required: false,
        serializedName: "Enum"
      };
      try {
        Serializer.serialize(mapper, 6, "enumBody");
      } catch (error) {
        assert.match(
          error.message,
          /6 is not a valid value for enumBody\. The valid values are: \[1,2,3,4\]/gi
        );
      }
    });

    it("should correctly serialize a ByteArray Object", function() {
      const mapper: Mapper = {
        type: { name: "ByteArray" },
        required: false,
        serializedName: "ByteArray"
      };
      const byteArray = stringToByteArray("Javascript");
      const base64str = "SmF2YXNjcmlwdA==";
      const serializedObject = Serializer.serialize(mapper, byteArray, "stringBody");
      assert.equal(serializedObject, base64str);
    });

    it("should correctly serialize a Date Object", function() {
      const dateObj = new Date("2015-01-01");
      const dateISO = "2015-01-01";
      const mapper: Mapper = {
        type: { name: "Date" },
        required: false,
        serializedName: "Date"
      };
      assert.equal(Serializer.serialize(mapper, dateObj, "dateObj"), dateISO);
    });

    it("should correctly serialize a Date object with max value", function() {
      const mapper: Mapper = {
        type: { name: "DateTime" },
        required: false,
        serializedName: "DateTime"
      };
      const serializedDateString = Serializer.serialize(
        mapper,
        new Date("9999-12-31T23:59:59-12:00"),
        "dateTimeObj"
      );
      assert.equal(serializedDateString, "+010000-01-01T11:59:59.000Z");
    });

    it("should correctly serialize a Date object with max value and format UnixTime", function() {
      const mapper: Mapper = {
        type: { name: "UnixTime" },
        required: false,
        serializedName: "UnixTime"
      };
      const serializedDate = Serializer.serialize(
        mapper,
        new Date("9999-12-31T23:59:59-12:00"),
        "dateTimeObj"
      );
      assert.equal(serializedDate, 253402343999);
    });

    it("should correctly serialize a string in DateTimeRfc1123", function() {
      const mapper: Mapper = {
        type: { name: "DateTimeRfc1123" },
        required: false,
        serializedName: "DateTimeRfc1123"
      };
      const rfc = new Date("Wed, 01 Jan 2020 00:00:00 GMT");
      const serializedDateString = Serializer.serialize(mapper, rfc, "dateTimeObj");
      assert.equal(serializedDateString, "Wed, 01 Jan 2020 00:00:00 GMT");
    });

    it("should correctly serialize an ISO 8601 duration", function() {
      const mapper: Mapper = {
        type: { name: "TimeSpan" },
        required: false,
        serializedName: "TimeSpan"
      };
      const duration = "P123DT22H14M12.011S";
      const serializedDateString = Serializer.serialize(mapper, duration, "dateTimeObj");
      assert.equal(serializedDateString, duration);
    });

    it("should throw an error when given an invalid ISO 8601 duration", function() {
      const mapper: Mapper = {
        type: { name: "TimeSpan" },
        required: false,
        serializedName: "TimeSpan"
      };
      const duration = "P123Z42DT22H14M12.011S";
      assert.throws(() => {
        Serializer.serialize(mapper, duration, "dateTimeObj");
      }, /must be a string in ISO 8601 format/);
    });

    it("should correctly serialize an array of primitives", function() {
      const mapper: SequenceMapper = {
        required: false,
        serializedName: "Sequence",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            required: true,
            serializedName: "sequenceElement"
          }
        }
      };
      const array = ["One", "Two", "three"];
      const serializedArray = Serializer.serialize(mapper, array, "arrayObj");
      assert.deepEqual(array, serializedArray);
    });

    it("should correctly serialize an array of array of primitives", function() {
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
                  name: "Number"
                }
              }
            }
          }
        }
      };
      const array = [[1], [2], [1, 2, 3]];
      const serializedArray = Serializer.serialize(mapper, array, "arrayObj");
      assert.deepEqual(array, serializedArray);
    });

    it("should correctly serialize an array of array of object types", function() {
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
                  name: "Object"
                }
              }
            }
          }
        }
      };
      const array = [[1], ["2"], [1, "2", {}, true, []]];
      const serializedArray = Serializer.serialize(mapper, array, mapper.serializedName);
      assert.deepEqual(array, serializedArray);
    });

    it('should fail while serializing an array of array of "object" types when a null value is provided', function() {
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
                  name: "Object"
                }
              }
            }
          }
        }
      };
      const array = [[1], ["2"], [undefined], [1, "2", {}, true, []]];
      try {
        Serializer.serialize(mapper, array, mapper.serializedName);
      } catch (err) {
        assert.equal(err.message, "arrayObj cannot be null or undefined.");
      }
    });

    it("should correctly serialize an array of dictionary of primitives", function() {
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
                  name: "Boolean"
                }
              }
            }
          }
        }
      };
      const array = [{ 1: true }, { 2: false }, { 1: true, 2: false, 3: true }];
      const serializedArray = Serializer.serialize(mapper, array, "arrayObj");
      assert.deepEqual(array, serializedArray);
    });

    it("should correctly serialize a dictionary of primitives", function() {
      const mapper: DictionaryMapper = {
        required: false,
        serializedName: "Dictionary",
        type: {
          name: "Dictionary",
          value: {
            required: true,
            serializedName: "valueElement",
            type: {
              name: "String"
            }
          }
        }
      };
      const dict = { 1: "One", 2: "Two", 3: "three" };
      const serializedDictionary = Serializer.serialize(mapper, dict, "dictObj");
      assert.deepEqual(dict, serializedDictionary);
    });

    it("should correctly serialize a dictionary of array of primitives", function() {
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
                  name: "Number"
                }
              }
            }
          }
        }
      };
      const dict = { One: [1], Two: [1, 2], three: [1, 2, 3] };
      const serializedDictionary = Serializer.serialize(mapper, dict, "dictObj");
      assert.deepEqual(dict, serializedDictionary);
    });

    it("should correctly serialize a dictionary of dictionary of primitives", function() {
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
                  name: "Boolean"
                }
              }
            }
          }
        }
      };
      const dict = { 1: { One: true }, 2: { Two: false }, 3: { three: true } };
      const serializedDictionary = Serializer.serialize(mapper, dict, "dictObj");
      assert.deepEqual(dict, serializedDictionary);
    });

    it("should correctly serialize a composite type", function() {
      const mapper = Mappers.Product;
      const serializer = createSerializer(Mappers);
      const productObj = {
        id: 101,
        name: "TestProduct",
        provisioningState: "Succeeded",
        tags: {
          tag1: "value1",
          tag2: "value2"
        },
        dispatchTime: new Date("2015-01-01T12:35:36.009Z"),
        invoiceInfo: {
          invId: 1002,
          invDate: "2015-12-25",
          invProducts: [
            {
              Product1: {
                id: 101,
                name: "TestProduct"
              }
            },
            {
              Product2: {
                id: 104,
                name: "TestProduct1"
              }
            }
          ]
        },
        subProducts: [
          {
            subId: 102,
            subName: "SubProduct1",
            makeTime: new Date("2015-12-21T01:01:01"),
            invoiceInfo: {
              invId: 1002,
              invDate: "2015-12-25"
            }
          },
          {
            subId: 103,
            subName: "SubProduct2",
            makeTime: new Date("2015-12-21T01:01:01"),
            invoiceInfo: {
              invId: 1003,
              invDate: "2015-12-25"
            }
          }
        ]
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
            JSON.stringify(productObj.dispatchTime)
          );
        } else if (prop === "invoiceInfo") {
          assert.equal(
            JSON.stringify(serializedProduct[prop]).length -
              JSON.stringify(productObj.invoiceInfo).length,
            4
          );
        } else if (prop === "subProducts") {
          assert.equal(
            JSON.stringify(serializedProduct[prop]).length -
              JSON.stringify(productObj.subProducts).length,
            8
          );
        }
      }
    });

    it("should correctly serialize object version of polymorphic discriminator", function() {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.SawShark;
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
            species: "predator"
          },
          {
            fishtype: "sawshark",
            age: 105,
            birthday: new Date("1900-01-05T01:00:00Z"),
            length: 10.0,
            picture: new Uint8Array([255, 255, 255, 255, 254]),
            species: "dangerous"
          }
        ]
      };
      const serializedSawshark = serializer.serialize(mapper, sawshark, "result");
      assert.equal(serializedSawshark.age, 22);
      assert.equal(serializedSawshark["fish.type"], "sawshark");
      assert.equal(serializedSawshark.siblings.length, 2);
      assert.equal(serializedSawshark.siblings[0]["fish.type"], "shark");
      assert.equal(serializedSawshark.siblings[0].age, 6);
      assert.equal(
        serializedSawshark.siblings[0].birthday,
        new Date("2012-01-05T01:00:00Z").toISOString()
      );
      assert.equal(serializedSawshark.siblings[1]["fish.type"], "sawshark");
      assert.equal(serializedSawshark.siblings[1].age, 105);
      assert.equal(
        serializedSawshark.siblings[1].birthday,
        new Date("1900-01-05T01:00:00Z").toISOString()
      );
      assert.equal(serializedSawshark.siblings[1].picture, "//////4=");
      assert.equal(serializedSawshark.picture, "//////4=");
    });

    it("should correctly serialize additionalProperties when the mapper knows that additional properties are allowed", function() {
      const bodyParameter = {
        id: 5,
        name: "Funny",
        odatalocation: "westus",
        additionalProperties1: {
          height: 5.61,
          weight: 599,
          footsize: 11.5
        },
        color: "red",
        city: "Seattle",
        food: "tikka masala",
        birthdate: "2017-12-13T02:29:51.000Z"
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

    it("should allow null when required: true and nullable: true", function() {
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
                name: "Number"
              }
            }
          }
        }
      };

      const result = Serializer.serialize(mapper, { length: null }, "testobj");
      assert.exists(result);
    });

    it("should not allow undefined when required: true and nullable: true", function() {
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
                name: "Number"
              }
            }
          }
        }
      };

      assert.throws(() => {
        Serializer.serialize(mapper, { length: undefined }, "testobj");
      }, "testobj.length cannot be undefined.");
    });

    it("should not allow null when required: true and nullable: false", function() {
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
                name: "Number"
              }
            }
          }
        }
      };

      assert.throws(() => {
        Serializer.serialize(mapper, { length: undefined }, "testobj");
      }, "testobj.length cannot be null or undefined.");
    });

    it("should not allow undefined when required: true and nullable: false", function() {
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
                name: "Number"
              }
            }
          }
        }
      };

      assert.throws(() => {
        Serializer.serialize(mapper, { length: undefined }, "testobj");
      }, "testobj.length cannot be null or undefined.");
    });

    it("should not allow null when required: true and nullable is undefined", function() {
      const mapper: Mapper = {
        serializedName: "foo",
        required: true,
        type: {
          name: "String"
        }
      };
      assert.throws(() => {
        Serializer.serialize(mapper, undefined, "testobj");
      }, "testobj cannot be null or undefined.");
    });

    it("should not allow undefined when required: true and nullable is undefined", function() {
      const mapper: Mapper = {
        serializedName: "foo",
        required: true,
        type: {
          name: "String"
        }
      };
      assert.throws(() => {
        Serializer.serialize(mapper, undefined, "testobj");
      }, "testobj cannot be null or undefined.");
    });

    it("should allow null when required: false and nullable: true", function() {
      const mapper: Mapper = {
        serializedName: "foo",
        required: false,
        nullable: true,
        type: {
          name: "String"
        }
      };

      Serializer.serialize(mapper, undefined, "testobj");
    });

    it("should not allow null when required: false and nullable: false", function() {
      const mapper: Mapper = {
        serializedName: "foo",
        required: false,
        nullable: false,
        type: {
          name: "String"
        }
      };

      assert.throws(() => {
        Serializer.serialize(mapper, null, "testobj");
      }, "testobj cannot be null.");
    });

    it("should allow null when required: false and nullable is undefined", function() {
      const mapper: Mapper = {
        serializedName: "foo",
        required: false,
        type: {
          name: "String"
        }
      };

      Serializer.serialize(mapper, undefined, "testobj");
    });

    it("should allow undefined when required: false and nullable: true", function() {
      const mapper: Mapper = {
        serializedName: "foo",
        required: false,
        nullable: true,
        type: {
          name: "String"
        }
      };

      Serializer.serialize(mapper, undefined, "testobj");
    });

    it("should allow undefined when required: false and nullable: false", function() {
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
                name: "String"
              }
            }
          }
        }
      };

      Serializer.serialize(mapper, { length: undefined }, "testobj");
    });

    it("should allow undefined when required: false and nullable is undefined", function() {
      const mapper: Mapper = {
        serializedName: "foo",
        required: false,
        type: {
          name: "String"
        }
      };

      Serializer.serialize(mapper, undefined, "testobj");
    });
  });

  describe("deserialize", function() {
    it("should correctly deserialize a Date if the type is 'any'", function() {
      const mapper: Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any"
      };
      const d = new Date();
      const deserializedObject = Serializer.deserialize(mapper, d, "anyResponseBody");
      assert.equal(deserializedObject, d);
    });
    it("should correctly deserialize an array if the type is 'any'", function() {
      const mapper: Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any"
      };
      const buf = [1, 2, 3];
      const deserializedObject = Serializer.deserialize(mapper, buf, "anyBody");
      assert.equal(deserializedObject, buf);
    });
    it("should correctly deserialize a uuid", function() {
      const mapper: Mapper = {
        type: { name: "Uuid" },
        required: false,
        serializedName: "Uuid"
      };
      const serializedObject = Serializer.deserialize(mapper, valid_uuid, "uuidBody");
      assert.equal(serializedObject, valid_uuid);
    });
    it("should correctly deserialize a composite type", function() {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.Product;
      const responseBody = {
        id: 101,
        name: "TestProduct",
        properties: {
          provisioningState: "Succeeded"
        },
        tags: {
          tag1: "value1",
          tag2: "value2"
        },
        dispatchTime: new Date("2015-01-01T12:35:36.009Z"),
        invoiceInfo: {
          invoiceId: 1002,
          invDate: "2015-12-25",
          invProducts: [
            {
              Product1: {
                id: 101,
                name: "TestProduct"
              }
            },
            {
              Product2: {
                id: 104,
                name: "TestProduct1"
              }
            }
          ]
        },
        subProducts: [
          {
            subId: 102,
            subName: "SubProduct1",
            makeTime: new Date("2015-12-21T01:01:01"),
            invoiceInfo: {
              invoiceId: 1002,
              invDate: "2015-12-25"
            }
          },
          {
            subId: 103,
            subName: "SubProduct2",
            makeTime: new Date("2015-12-21T01:01:01"),
            invoiceInfo: {
              invoiceId: 1003,
              invDate: "2015-12-25"
            }
          }
        ]
      };
      const deserializedProduct = serializer.deserialize(mapper, responseBody, "responseBody");
      for (const prop in deserializedProduct) {
        if (prop === "provisioningState") {
          assert.equal(
            deserializedProduct.provisioningState,
            responseBody.properties.provisioningState
          );
        } else if (prop === "id") {
          assert.equal(deserializedProduct[prop], responseBody.id);
        } else if (prop === "name") {
          assert.equal(deserializedProduct[prop], responseBody.name);
        } else if (prop === "tags") {
          assert.equal(
            JSON.stringify(deserializedProduct[prop]),
            JSON.stringify(responseBody.tags)
          );
        } else if (prop === "dispatchTime") {
          assert.equal(
            JSON.stringify(deserializedProduct[prop]),
            JSON.stringify(responseBody.dispatchTime)
          );
        } else if (prop === "invoiceInfo") {
          assert.equal(
            JSON.stringify(deserializedProduct[prop]).length -
              JSON.stringify(responseBody.invoiceInfo).length,
            10
          );
        } else if (prop === "subProducts") {
          assert.equal(
            JSON.stringify(deserializedProduct[prop]).length -
              JSON.stringify(responseBody.subProducts).length,
            20
          );
        }
      }
    });

    it("should correctly deserialize a pageable type without nextLink", function() {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.ProductListResult;
      const responseBody = {
        value: [
          {
            id: 101,
            name: "TestProduct",
            properties: {
              provisioningState: "Succeeded"
            }
          },
          {
            id: 104,
            name: "TestProduct1",
            properties: {
              provisioningState: "Failed"
            }
          }
        ]
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

    it("should correctly deserialize a pageable type with nextLink", function() {
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.ProductListResultNextLink;
      const responseBody = {
        value: [
          {
            id: 101,
            name: "TestProduct",
            properties: {
              provisioningState: "Succeeded"
            }
          },
          {
            id: 104,
            name: "TestProduct1",
            properties: {
              provisioningState: "Failed"
            }
          }
        ],
        nextLink: "https://helloworld.com"
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

    it("should correctly deserialize object version of polymorphic discriminator", function() {
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
            species: "predator"
          },
          {
            "fish.type": "sawshark",
            age: 105,
            birthday: new Date("1900-01-05T01:00:00Z").toISOString(),
            length: 10.0,
            picture: "/////g==",
            species: "dangerous"
          }
        ]
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
        "2012-01-05T01:00:00.000Z"
      );
      assert.equal(deserializedSawshark.siblings[1].fishtype, "sawshark");
      assert.equal(deserializedSawshark.siblings[1].age, 105);
      assert.equal(
        deserializedSawshark.siblings[1].birthday.toISOString(),
        "1900-01-05T01:00:00.000Z"
      );
    });

    it("should correctly deserialize an array of array of object types", function() {
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
                  name: "Object"
                }
              }
            }
          }
        }
      };
      const array = [[1], ["2"], [1, "2", {}, true, []]];
      const deserializedArray = Serializer.deserialize(mapper, array, mapper.serializedName!);
      assert.deepEqual(array, deserializedArray);
    });

    it("should correctly deserialize without failing when encountering unrecognized discriminator", function() {
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
                species: "predator"
              }
            ]
          }
        ]
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

    it("should correctly deserialize additionalProperties when the mapper knows that additional properties are allowed", function() {
      const responseBody = {
        id: 5,
        name: "Funny",
        status: true,
        "@odata.location": "westus",
        additionalProperties: {
          height: 5.61,
          weight: 599,
          footsize: 11.5
        },
        color: "red",
        city: "Seattle",
        food: "tikka masala",
        birthdate: "2017-12-13T02:29:51Z"
      };
      const serializer = createSerializer(Mappers);
      const mapper = Mappers.PetAP;
      const result = serializer.deserialize(mapper, responseBody, "responseBody");
      assert.equal(result.id, 5);
      assert.equal(result.status, true);
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

    it("should deserialize headerCollectionPrefix", function() {
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
                    name: "String"
                  }
                }
              },
              headerCollectionPrefix: "foo-bar-"
            },
            unrelated: {
              serializedName: "unrelated",
              type: {
                name: "Number"
              }
            }
          }
        }
      };

      const rawHeaders = {
        "foo-bar-alpha": "hello",
        "foo-bar-beta": "world",
        unrelated: "42"
      };

      const expected = {
        metadata: {
          alpha: "hello",
          beta: "world"
        },
        unrelated: 42
      };
      const actual = Serializer.deserialize(mapper, rawHeaders, "headers");
      assert.deepEqual(actual, expected);
    });

    describe("composite type", () => {
      it("should be deserialized properly when polymorphicDiscriminator specified", function() {
        const fish: CompositeMapper = {
          serializedName: "Fish",
          type: {
            name: "Composite",
            polymorphicDiscriminator: {
              serializedName: "fishtype",
              clientName: "fishtype"
            },
            uberParent: "Fish",
            className: "Fish",
            modelProperties: {
              fishtype: {
                required: true,
                serializedName: "fishtype",
                type: {
                  name: "String"
                }
              }
            }
          }
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
                  name: "Number"
                }
              }
            }
          }
        };

        const mappers = {
          Fish: fish,
          Shark: shark,
          discriminators: {
            Fish: fish,
            "Fish.shark": shark
          }
        };
        const serializer = createSerializer(mappers);
        const result = serializer.deserialize(
          fish,
          {
            fishtype: "shark",
            age: 10
          },
          ""
        );

        assert.strictEqual("shark", result.fishtype);
        assert.strictEqual(10, result.age);
      });

      it("should be deserialized properly when polymorphicDiscriminator specified in nested property", function() {
        const fish: CompositeMapper = {
          serializedName: "Fish",
          type: {
            name: "Composite",
            polymorphicDiscriminator: {
              serializedName: "fishtype",
              clientName: "fishtype"
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
                    clientName: "fishtype"
                  },
                  uberParent: "Fish",
                  className: "Fish"
                }
              },
              fishtype: {
                required: true,
                serializedName: "fishtype",
                type: {
                  name: "String"
                }
              }
            }
          }
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
                  name: "Number"
                }
              }
            }
          }
        };

        const mappers = {
          Fish: fish,
          Shark: shark,
          discriminators: {
            Fish: fish,
            "Fish.shark": shark
          }
        };
        const serializer = createSerializer(mappers);
        const result = serializer.deserialize(
          fish,
          {
            fishtype: "shark",
            age: 10,
            sibling: { fishtype: "shark", age: 15 }
          },
          ""
        );

        assert.strictEqual("shark", result.fishtype);
        assert.strictEqual(10, result.age);
        assert.strictEqual("shark", result.sibling.fishtype);
        assert.strictEqual(15, result.sibling.age);
      });

      it("should be deserialized properly when polymorphicDiscriminator specified in the parent", function() {
        const fish: CompositeMapper = {
          serializedName: "Fish",
          type: {
            name: "Composite",
            polymorphicDiscriminator: {
              serializedName: "fishtype",
              clientName: "fishtype"
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
                  className: "Fish"
                }
              },
              fishtype: {
                required: true,
                serializedName: "fishtype",
                type: {
                  name: "String"
                }
              }
            }
          }
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
                  name: "Number"
                }
              }
            }
          }
        };

        const mappers = {
          Fish: fish,
          Shark: shark,
          discriminators: {
            Fish: fish,
            "Fish.shark": shark
          }
        };
        const serializer = createSerializer(mappers);
        const result = serializer.deserialize(
          fish,
          {
            fishtype: "shark",
            age: 10,
            sibling: { fishtype: "shark", age: 15 }
          },
          ""
        );

        assert.strictEqual("shark", result.fishtype);
        assert.strictEqual(10, result.age);
        assert.strictEqual("shark", result.sibling.fishtype);
        assert.strictEqual(15, result.sibling.age);
      });

      it("should be deserialized properly when responseBody is an empty string", function() {
        const fish: CompositeMapper = {
          serializedName: "Fish",
          type: {
            name: "Composite",
            className: "Fish",
            modelProperties: {}
          }
        };

        const mappers = {
          Fish: fish
        };
        const serializer = createSerializer(mappers);
        const result: any = serializer.deserialize(fish, "", "mockFishProperty");

        assert.deepEqual(result, {});
      });
    });

    describe("polymorphic composite type array", () => {
      const Fish: CompositeMapper = {
        serializedName: "Fish",
        type: {
          name: "Composite",
          polymorphicDiscriminator: {
            serializedName: "fishtype",
            clientName: "fishtype"
          },
          uberParent: "Fish",
          className: "Fish",
          modelProperties: {
            species: {
              serializedName: "species",
              type: {
                name: "String"
              }
            },
            length: {
              required: true,
              serializedName: "length",
              type: {
                name: "Number"
              }
            },
            siblings: {
              serializedName: "siblings",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "Fish"
                  }
                }
              }
            },
            fishtype: {
              required: true,
              serializedName: "fishtype",
              type: {
                name: "String"
              }
            }
          }
        }
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
                name: "String"
              }
            },
            iswild: {
              serializedName: "iswild",
              type: {
                name: "Boolean"
              }
            }
          }
        }
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
                name: "Number"
              }
            },
            birthday: {
              required: true,
              serializedName: "birthday",
              type: {
                name: "DateTime"
              }
            }
          }
        }
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
                name: "ByteArray"
              }
            }
          }
        }
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
                name: "Number"
              }
            },
            color: {
              serializedName: "color",
              defaultValue: "gray",
              type: {
                name: "String"
              }
            }
          }
        }
      };

      const mappers = {
        discriminators: {
          Fish: Fish,
          "Fish.salmon": Salmon,
          "Fish.shark": Shark,
          "Fish.sawshark": Sawshark,
          "Fish.goblin": Goblinshark
        },
        Fish,
        Salmon,
        Shark,
        Sawshark,
        Goblinshark
      };

      it("should be deserialized with child properties", function() {
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
              species: "predator"
            },
            {
              fishtype: "sawshark",
              age: 105,
              birthday: "1900-01-05T01:00:00Z",
              length: 10,
              picture: "//////4=",
              species: "dangerous"
            },
            {
              fishtype: "goblin",
              age: 1,
              birthday: "2015-08-08T00:00:00Z",
              length: 30,
              species: "scary",
              jawsize: 5,
              color: "pinkish-gray"
            }
          ]
        };

        const serializer = createSerializer(mappers);
        const result = serializer.deserialize(Fish, body, "");

        assert.equal(result.siblings.length, 3);
        assert(result.siblings[1].picture);
        assert.equal(result.siblings[2].jawsize, 5);
      });

      it("should be serialized with child properties", function() {
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
              species: "predator"
            },
            {
              fishtype: "sawshark",
              age: 105,
              birthday: new Date("1900-01-05T01:00:00Z"),
              length: 10.0,
              picture: new Uint8Array([255, 255, 255, 255, 254]),
              species: "dangerous"
            },
            {
              fishtype: "goblin",
              color: "pinkish-gray",
              age: 1,
              length: 30,
              species: "scary",
              birthday: new Date("2015-08-08T00:00:00Z"),
              jawsize: 5
            }
          ]
        };

        const serializer = createSerializer(mappers);
        const result = serializer.serialize(Fish, body, "");

        assert.equal(result.siblings.length, 3);
        assert(result.siblings[1].picture);
        assert.equal(result.siblings[2].jawsize, 5);
      });
    });
  });
});
