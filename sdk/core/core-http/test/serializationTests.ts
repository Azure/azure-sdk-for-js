// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */

import { assert } from "chai";
import "chai/register-should";

import * as msRest from "../src/coreHttp";
import { TestClient } from "./data/TestClient/src/testClient";
import { Mappers } from "./data/TestClient/src/models/mappers";

const Serializer = new msRest.Serializer({});
const valid_uuid = "ceaafd1e-f936-429f-bbfc-82ee75dddc33";

function stringToByteArray(str: string): Uint8Array {
  if (typeof Buffer === "function" && msRest.isNode) {
    return Buffer.from(str, "utf-8");
  } else {
    return new TextEncoder().encode(str);
  }
}

describe("msrest", function() {
  describe("serializeObject", function() {
    it("should correctly serialize flattened properties", (done) => {
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
      done();
    });

    it("should correctly serialize flattened properties when flattened constant is defined first", (done) => {
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
      done();
    });

    it("should correctly serialize a Date Object", function(done) {
      const dateObj = new Date("2015-01-01");
      const dateISO = "2015-01-01T00:00:00.000Z";
      msRest.serializeObject(dateObj).should.equal(dateISO);
      done();
    });

    it("should correctly serialize a Date object with max value", function(done) {
      const serializedDateString = msRest.serializeObject(new Date("9999-12-31T23:59:59-12:00"));
      serializedDateString.should.equal("+010000-01-01T11:59:59.000Z");
      done();
    });

    it("should correctly serialize a Uint8Array Object", function(done) {
      const byteArray = stringToByteArray("Javascript");
      const base64str = "SmF2YXNjcmlwdA==";
      msRest.serializeObject(byteArray).should.equal(base64str);
      done();
    });

    it("should correctly serialize Primitive types", function(done) {
      msRest.serializeObject(true).should.equal(true);
      msRest.serializeObject(false).should.equal(false);
      msRest.serializeObject("true").should.equal("true");
      msRest.serializeObject(1).should.equal(1);
      msRest.serializeObject(100.0123).should.equal(100.0123);
      assert.equal(msRest.serializeObject(undefined), undefined);
      done();
    });

    it("should correctly serialize an empty array and an empty dictionary", function(done) {
      assert.deepEqual(msRest.serializeObject([]), []);
      assert.deepEqual(msRest.serializeObject({}), {});
      done();
    });

    it("should correctly serialize a complex JSON object", function(done) {
      const o1: unknown = {
        p1: "value1",
        p2: "value2",
        "top-buf": stringToByteArray("top string"),
        "top-date": new Date("2014"),
        "top-dates": [new Date("1900"), new Date("1901")],
        insider: {
          "insider-buf": stringToByteArray("insider string"),
          "insider-date": new Date("2015"),
          "insider-dates": [new Date("2100"), new Date("2101")],
          "insider-dictionary": {
            k1: new Date("2015"),
            k2: new Date("2016"),
            k3: new Date("2017")
          },
          "top-complex": {
            id: 1,
            name: "Joey",
            age: 23.36,
            male: true,
            birthday: "1992-01-01T00:00:00.000Z",
            anniversary: new Date("2013-12-08"),
            memory: stringToByteArray("Yadadadada")
          }
        }
      };

      const o2: unknown = {
        p1: "value1",
        p2: "value2",
        "top-buf": "dG9wIHN0cmluZw==",
        "top-date": "2014-01-01T00:00:00.000Z",
        "top-dates": ["1900-01-01T00:00:00.000Z", "1901-01-01T00:00:00.000Z"],
        insider: {
          "insider-buf": "aW5zaWRlciBzdHJpbmc=",
          "insider-date": "2015-01-01T00:00:00.000Z",
          "insider-dates": ["2100-01-01T00:00:00.000Z", "2101-01-01T00:00:00.000Z"],
          "insider-dictionary": {
            k1: "2015-01-01T00:00:00.000Z",
            k2: "2016-01-01T00:00:00.000Z",
            k3: "2017-01-01T00:00:00.000Z"
          },
          "top-complex": {
            id: 1,
            name: "Joey",
            age: 23.36,
            male: true,
            birthday: "1992-01-01T00:00:00.000Z",
            anniversary: "2013-12-08T00:00:00.000Z",
            memory: "WWFkYWRhZGFkYQ=="
          }
        }
      };
      assert.deepEqual(msRest.serializeObject(o1), o2);
      done();
    });
  });

  describe("serialize", function() {
    const invalid_uuid = "abcd-efgd90-90890jkh";
    it("should correctly serialize a string if the type is 'any'", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any"
      };
      const serializedObject = Serializer.serialize(mapper, "foo", "anyBody");
      serializedObject.should.equal("foo");
      done();
    });

    it("should correctly serialize an array if the type is 'any'", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any"
      };
      const serializedObject = Serializer.serialize(mapper, [1, 2], "anyBody");
      assert.deepEqual(serializedObject, [1, 2]);
      done();
    });

    it("should correctly serialize a string", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "String" },
        required: false,
        serializedName: "string"
      };
      const serializedObject = Serializer.serialize(mapper, "foo", "stringBody");
      serializedObject.should.equal("foo");
      done();
    });

    it("should correctly serialize a uuid", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "Uuid" },
        required: false,
        serializedName: "Uuid"
      };
      const serializedObject = Serializer.serialize(mapper, valid_uuid, "uuidBody");
      serializedObject.should.equal(valid_uuid);
      done();
    });

    it("should throw an error if the value is not a valid Uuid", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "Uuid" },
        required: false,
        serializedName: "Uuid"
      };
      try {
        Serializer.serialize(mapper, invalid_uuid, "uuidBody");
      } catch (error) {
        error.message.should.match(/.*with value.*must be of type string and a valid uuid/gi);
        done();
      }
    });

    it("should correctly serialize a number", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "Number" },
        required: false,
        serializedName: "Number"
      };
      const serializedObject = Serializer.serialize(mapper, 1.506, "stringBody");
      serializedObject.should.equal(1.506);
      done();
    });

    it("should correctly serialize a boolean", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "Boolean" },
        required: false,
        serializedName: "Boolean"
      };
      const serializedObject = Serializer.serialize(mapper, false, "stringBody");
      serializedObject.should.equal(false);
      done();
    });

    it("should correctly serialize an Enum", function(done) {
      const mapper: msRest.EnumMapper = {
        type: { name: "Enum", allowedValues: [1, 2, 3, 4] },
        required: false,
        serializedName: "Enum"
      };
      const serializedObject = Serializer.serialize(mapper, 1, "enumBody");
      serializedObject.should.equal(1);
      done();
    });

    it("should throw an error if the value is not valid for an Enum", function(done) {
      const mapper: msRest.EnumMapper = {
        type: { name: "Enum", allowedValues: [1, 2, 3, 4] },
        required: false,
        serializedName: "Enum"
      };
      try {
        Serializer.serialize(mapper, 6, "enumBody");
      } catch (error) {
        error.message.should.match(
          /6 is not a valid value for enumBody\. The valid values are: \[1,2,3,4\]/gi
        );
        done();
      }
    });

    it("should correctly serialize a ByteArray Object", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "ByteArray" },
        required: false,
        serializedName: "ByteArray"
      };
      const byteArray = stringToByteArray("Javascript");
      const base64str = "SmF2YXNjcmlwdA==";
      const serializedObject = Serializer.serialize(mapper, byteArray, "stringBody");
      serializedObject.should.equal(base64str);
      done();
    });

    it("should correctly serialize a Date Object", function(done) {
      const dateObj = new Date("2015-01-01");
      const dateISO = "2015-01-01";
      const mapper: msRest.Mapper = {
        type: { name: "Date" },
        required: false,
        serializedName: "Date"
      };
      Serializer.serialize(mapper, dateObj, "dateObj").should.equal(dateISO);
      done();
    });

    it("should correctly serialize a Date object with max value", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "DateTime" },
        required: false,
        serializedName: "DateTime"
      };
      const serializedDateString = Serializer.serialize(
        mapper,
        new Date("9999-12-31T23:59:59-12:00"),
        "dateTimeObj"
      );
      serializedDateString.should.equal("+010000-01-01T11:59:59.000Z");
      done();
    });

    it("should correctly serialize a Date object with max value and format UnixTime", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "UnixTime" },
        required: false,
        serializedName: "UnixTime"
      };
      const serializedDate = Serializer.serialize(
        mapper,
        new Date("9999-12-31T23:59:59-12:00"),
        "dateTimeObj"
      );
      serializedDate.should.equal(253402343999);
      done();
    });

    it("should correctly serialize a string in DateTimeRfc1123", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "DateTimeRfc1123" },
        required: false,
        serializedName: "DateTimeRfc1123"
      };
      const rfc = new Date("Wed, 01 Jan 2020 00:00:00 GMT");
      const serializedDateString = Serializer.serialize(mapper, rfc, "dateTimeObj");
      serializedDateString.should.equal("Wed, 01 Jan 2020 00:00:00 GMT");
      done();
    });

    it("should correctly serialize an ISO 8601 duration", function() {
      const mapper: msRest.Mapper = {
        type: { name: "TimeSpan" },
        required: false,
        serializedName: "TimeSpan"
      };
      const duration = "P123DT22H14M12.011S";
      const serializedDateString = Serializer.serialize(mapper, duration, "dateTimeObj");
      serializedDateString.should.equal(duration);
    });

    it("should throw an error when given an invalid ISO 8601 duration", function() {
      const mapper: msRest.Mapper = {
        type: { name: "TimeSpan" },
        required: false,
        serializedName: "TimeSpan"
      };
      const duration = "P123Z42DT22H14M12.011S";
      (() => Serializer.serialize(mapper, duration, "dateTimeObj")).should.throw(
        /must be a string in ISO 8601 format/
      );
    });

    it("should correctly serialize an array of primitives", function(done) {
      const mapper: msRest.SequenceMapper = {
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
      done();
    });

    it("should correctly serialize an array of array of primitives", function(done) {
      const mapper: msRest.SequenceMapper = {
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
      done();
    });

    it("should correctly serialize an array of array of object types", function(done) {
      const mapper: msRest.SequenceMapper = {
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
      done();
    });

    it('should fail while serializing an array of array of "object" types when a null value is provided', function(done) {
      const mapper: msRest.Mapper = {
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
      done();
    });

    it("should correctly serialize an array of dictionary of primitives", function(done) {
      const mapper: msRest.SequenceMapper = {
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
      done();
    });

    it("should correctly serialize a dictionary of primitives", function(done) {
      const mapper: msRest.DictionaryMapper = {
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
      done();
    });

    it("should correctly serialize a dictionary of array of primitives", function(done) {
      const mapper: msRest.DictionaryMapper = {
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
      done();
    });

    it("should correctly serialize a dictionary of dictionary of primitives", function(done) {
      const mapper: msRest.DictionaryMapper = {
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
      done();
    });

    it("should correctly serialize a composite type", function(done) {
      const client = new TestClient("http://localhost:9090");
      const mapper = Mappers.Product;
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
      const serializedProduct = client.serializer.serialize(mapper, productObj, "productObject");
      for (const prop in serializedProduct) {
        if (prop === "properties") {
          serializedProduct[prop].provisioningState.should.equal(productObj.provisioningState);
        } else if (prop === "id") {
          serializedProduct[prop].should.equal(productObj.id);
        } else if (prop === "name") {
          serializedProduct[prop].should.equal(productObj.name);
        } else if (prop === "tags") {
          JSON.stringify(serializedProduct[prop]).should.equal(JSON.stringify(productObj.tags));
        } else if (prop === "dispatchTime") {
          JSON.stringify(serializedProduct[prop]).should.equal(
            JSON.stringify(productObj.dispatchTime)
          );
        } else if (prop === "invoiceInfo") {
          (
            JSON.stringify(serializedProduct[prop]).length -
            JSON.stringify(productObj.invoiceInfo).length
          ).should.equal(4);
        } else if (prop === "subProducts") {
          (
            JSON.stringify(serializedProduct[prop]).length -
            JSON.stringify(productObj.subProducts).length
          ).should.equal(8);
        }
      }
      done();
    });

    it("should correctly serialize object version of polymorphic discriminator", function(done) {
      const client = new TestClient("http://localhost:9090");
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
      const serializedSawshark = client.serializer.serialize(mapper, sawshark, "result");
      serializedSawshark.age.should.equal(22);
      serializedSawshark["fish.type"].should.equal("sawshark");
      serializedSawshark.siblings.length.should.equal(2);
      serializedSawshark.siblings[0]["fish.type"].should.equal("shark");
      serializedSawshark.siblings[0].age.should.equal(6);
      serializedSawshark.siblings[0].birthday.should.equal(
        new Date("2012-01-05T01:00:00Z").toISOString()
      );
      serializedSawshark.siblings[1]["fish.type"].should.equal("sawshark");
      serializedSawshark.siblings[1].age.should.equal(105);
      serializedSawshark.siblings[1].birthday.should.equal(
        new Date("1900-01-05T01:00:00Z").toISOString()
      );
      serializedSawshark.siblings[1].picture.should.equal("//////4=");
      serializedSawshark.picture.should.equal("//////4=");
      done();
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
      const client = new TestClient("http://localhost:9090");
      const mapper = Mappers.PetAP;
      const result = client.serializer.serialize(mapper, bodyParameter, "bodyParameter");
      result.id.should.equal(5);
      result.eyeColor.should.equal("brown");
      assert.isUndefined(result.favoriteFood);
      result["@odata.location"].should.equal("westus");
      result.color.should.equal("red");
      result.city.should.equal("Seattle");
      result.food.should.equal("tikka masala");
      result.additionalProperties.height.should.equal(5.61);
      result.additionalProperties.weight.should.equal(599);
      result.additionalProperties.footsize.should.equal(11.5);
      result.name.should.equal("Funny");
      result.birthdate.should.equal("2017-12-13T02:29:51.000Z");
    });

    it("should allow null when required: true and nullable: true", function() {
      const mapper: msRest.Mapper = {
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

      // tslint:disable-next-line
      const result = Serializer.serialize(mapper, { length: null }, "testobj");
      result.should.exist;
    });

    it("should not allow undefined when required: true and nullable: true", function() {
      const mapper: msRest.Mapper = {
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

      (function() {
        Serializer.serialize(mapper, { length: undefined }, "testobj");
      }.should.throw("testobj.length cannot be undefined."));
    });

    it("should not allow null when required: true and nullable: false", function() {
      const mapper: msRest.Mapper = {
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

      (function() {
        Serializer.serialize(mapper, { length: undefined }, "testobj");
      }.should.throw("testobj.length cannot be null or undefined."));
    });

    it("should not allow undefined when required: true and nullable: false", function() {
      const mapper: msRest.Mapper = {
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

      (function() {
        Serializer.serialize(mapper, { length: undefined }, "testobj");
      }.should.throw("testobj.length cannot be null or undefined."));
    });

    it("should not allow null when required: true and nullable is undefined", function() {
      const mapper: msRest.Mapper = {
        serializedName: "foo",
        required: true,
        type: {
          name: "String"
        }
      };
      (function() {
        Serializer.serialize(mapper, undefined, "testobj");
      }.should.throw("testobj cannot be null or undefined."));
    });

    it("should not allow undefined when required: true and nullable is undefined", function() {
      const mapper: msRest.Mapper = {
        serializedName: "foo",
        required: true,
        type: {
          name: "String"
        }
      };
      (function() {
        Serializer.serialize(mapper, undefined, "testobj");
      }.should.throw("testobj cannot be null or undefined."));
    });

    it("should allow null when required: false and nullable: true", function() {
      const mapper: msRest.Mapper = {
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
      const mapper: msRest.Mapper = {
        serializedName: "foo",
        required: false,
        nullable: false,
        type: {
          name: "String"
        }
      };

      // tslint:disable-next-line
      (function() {
        Serializer.serialize(mapper, null, "testobj");
      }.should.throw("testobj cannot be null."));
    });

    it("should allow null when required: false and nullable is undefined", function() {
      const mapper: msRest.Mapper = {
        serializedName: "foo",
        required: false,
        type: {
          name: "String"
        }
      };

      Serializer.serialize(mapper, undefined, "testobj");
    });

    it("should allow undefined when required: false and nullable: true", function() {
      const mapper: msRest.Mapper = {
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
      const mapper: msRest.Mapper = {
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
      const mapper: msRest.Mapper = {
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
    it("should correctly deserialize a Date if the type is 'any'", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any"
      };
      const d = new Date();
      const deserializedObject = Serializer.deserialize(mapper, d, "anyResponseBody");
      deserializedObject.should.equal(d);
      done();
    });
    it("should correctly deserialize an array if the type is 'any'", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "any" },
        required: false,
        serializedName: "any"
      };
      const buf = [1, 2, 3];
      const deserializedObject = Serializer.deserialize(mapper, buf, "anyBody");
      deserializedObject.should.equal(buf);
      done();
    });
    it("should correctly deserialize a uuid", function(done) {
      const mapper: msRest.Mapper = {
        type: { name: "Uuid" },
        required: false,
        serializedName: "Uuid"
      };
      const serializedObject = Serializer.deserialize(mapper, valid_uuid, "uuidBody");
      serializedObject.should.equal(valid_uuid);
      done();
    });
    it("should correctly deserialize a composite type", function(done) {
      const client = new TestClient("http://localhost:9090");
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
      const deserializedProduct = client.serializer.deserialize(
        mapper,
        responseBody,
        "responseBody"
      );
      for (const prop in deserializedProduct) {
        if (prop === "provisioningState") {
          deserializedProduct.provisioningState.should.equal(
            responseBody.properties.provisioningState
          );
        } else if (prop === "id") {
          deserializedProduct[prop].should.equal(responseBody.id);
        } else if (prop === "name") {
          deserializedProduct[prop].should.equal(responseBody.name);
        } else if (prop === "tags") {
          JSON.stringify(deserializedProduct[prop]).should.equal(JSON.stringify(responseBody.tags));
        } else if (prop === "dispatchTime") {
          JSON.stringify(deserializedProduct[prop]).should.equal(
            JSON.stringify(responseBody.dispatchTime)
          );
        } else if (prop === "invoiceInfo") {
          (
            JSON.stringify(deserializedProduct[prop]).length -
            JSON.stringify(responseBody.invoiceInfo).length
          ).should.equal(10);
        } else if (prop === "subProducts") {
          (
            JSON.stringify(deserializedProduct[prop]).length -
            JSON.stringify(responseBody.subProducts).length
          ).should.equal(20);
        }
      }
      done();
    });

    it("should correctly deserialize a pageable type without nextLink", function(done) {
      const client = new TestClient("http://localhost:9090");
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
      const deserializedProduct = client.serializer.deserialize(
        mapper,
        responseBody,
        "responseBody"
      );
      Array.isArray(deserializedProduct).should.be.true;
      deserializedProduct.length.should.equal(2);
      for (let i = 0; i < deserializedProduct.length; i++) {
        if (i === 0) {
          deserializedProduct[i].id.should.equal(101);
          deserializedProduct[i].name.should.equal("TestProduct");
          deserializedProduct[i].provisioningState.should.equal("Succeeded");
        } else if (i === 1) {
          deserializedProduct[i].id.should.equal(104);
          deserializedProduct[i].name.should.equal("TestProduct1");
          deserializedProduct[i].provisioningState.should.equal("Failed");
        }
      }
      done();
    });

    it("should correctly deserialize a pageable type with nextLink", function(done) {
      const client = new TestClient("http://localhost:9090");
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
      const deserializedProduct = client.serializer.deserialize(
        mapper,
        responseBody,
        "responseBody"
      );
      Array.isArray(deserializedProduct).should.be.true;
      deserializedProduct.length.should.equal(2);
      deserializedProduct.nextLink.should.equal("https://helloworld.com");
      for (let i = 0; i < deserializedProduct.length; i++) {
        if (i === 0) {
          deserializedProduct[i].id.should.equal(101);
          deserializedProduct[i].name.should.equal("TestProduct");
          deserializedProduct[i].provisioningState.should.equal("Succeeded");
        } else if (i === 1) {
          deserializedProduct[i].id.should.equal(104);
          deserializedProduct[i].name.should.equal("TestProduct1");
          deserializedProduct[i].provisioningState.should.equal("Failed");
        }
      }
      done();
    });

    it("should correctly deserialize object version of polymorphic discriminator", function(done) {
      const client = new TestClient("http://localhost:9090");
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
      const deserializedSawshark = client.serializer.deserialize(
        mapper,
        responseBody,
        "responseBody"
      );
      deserializedSawshark.age.should.equal(22);
      deserializedSawshark.fishtype.should.equal("sawshark");

      deserializedSawshark.picture.should.be.instanceof(Uint8Array);
      deserializedSawshark.picture.length.should.equal(4);
      deserializedSawshark.picture[0].should.equal(255);
      deserializedSawshark.picture[1].should.equal(255);
      deserializedSawshark.picture[2].should.equal(255);
      deserializedSawshark.picture[3].should.equal(254);

      deserializedSawshark.siblings.length.should.equal(2);
      deserializedSawshark.siblings[0].fishtype.should.equal("shark");
      deserializedSawshark.siblings[0].age.should.equal(6);
      deserializedSawshark.siblings[0].birthday
        .toISOString()
        .should.equal("2012-01-05T01:00:00.000Z");
      deserializedSawshark.siblings[1].fishtype.should.equal("sawshark");
      deserializedSawshark.siblings[1].age.should.equal(105);
      deserializedSawshark.siblings[1].birthday
        .toISOString()
        .should.equal("1900-01-05T01:00:00.000Z");
      done();
    });

    it("should correctly deserialize an array of array of object types", function(done) {
      const mapper: msRest.Mapper = {
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
      done();
    });

    it("should correctly deserialize without failing when encountering unrecognized discriminator", function(done) {
      const client = new TestClient("http://localhost:9090");
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
      const deserializedSawshark = client.serializer.deserialize(
        mapper,
        responseBody,
        "responseBody"
      );
      deserializedSawshark.siblings.length.should.equal(1);
      deserializedSawshark.siblings[0].fishtype.should.equal("mutatedshark");
      deserializedSawshark.siblings[0].species.should.equal("dangerous");
      deserializedSawshark.siblings[0].birthday.should.equal("1900-01-05T01:00:00.000Z");
      deserializedSawshark.siblings[0].age.should.equal(105);
      deserializedSawshark.siblings[0].siblings[0].fishtype.should.equal("mutatedshark");
      deserializedSawshark.siblings[0].siblings[0].species.should.equal("predator");
      deserializedSawshark.siblings[0].siblings[0].should.not.have.property("birthday");
      deserializedSawshark.siblings[0].siblings[0].age.should.equal(6);
      done();
    });

    it("should correctly deserialize additionalProperties when the mapper knows that additional properties are allowed", function(done) {
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
      const client = new TestClient("http://localhost:9090");
      const mapper = Mappers.PetAP;
      const result = client.serializer.deserialize(mapper, responseBody, "responseBody");
      result.id.should.equal(5);
      result.status.should.equal(true);
      result.eyeColor.should.equal("brown");
      result.favoriteFood.should.equal("bones");
      result.odatalocation.should.equal("westus");
      result.color.should.equal("red");
      result.city.should.equal("Seattle");
      result.food.should.equal("tikka masala");
      result.birthdate.should.equal("2017-12-13T02:29:51Z");
      result.additionalProperties1.height.should.equal(5.61);
      result.additionalProperties1.weight.should.equal(599);
      result.additionalProperties1.footsize.should.equal(11.5);
      result.name.should.equal("Funny");
      done();
    });

    it("should deserialize headerCollectionPrefix", function() {
      const mapper: msRest.CompositeMapper = {
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
        const fish: msRest.CompositeMapper = {
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

        const shark: msRest.CompositeMapper = {
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
        const serializer = new msRest.Serializer(mappers);
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
        const fish: msRest.CompositeMapper = {
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

        const shark: msRest.CompositeMapper = {
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
        const serializer = new msRest.Serializer(mappers);
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
        const fish: msRest.CompositeMapper = {
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

        const shark: msRest.CompositeMapper = {
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
        const serializer = new msRest.Serializer(mappers);
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
        const fish: msRest.CompositeMapper = {
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
        const serializer = new msRest.Serializer(mappers);
        const result: any = serializer.deserialize(fish, "", "mockFishProperty");

        assert.deepEqual(result, {});
      });
    });

    describe("polymorphic composite type array", () => {
      const Fish: msRest.CompositeMapper = {
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

      const Salmon: msRest.CompositeMapper = {
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

      const Shark: msRest.CompositeMapper = {
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

      const Sawshark: msRest.CompositeMapper = {
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

      const Goblinshark: msRest.CompositeMapper = {
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

        const serializer = new msRest.Serializer(mappers);
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

        const serializer = new msRest.Serializer(mappers);
        const result = serializer.serialize(Fish, body, "");

        assert.equal(result.siblings.length, 3);
        assert(result.siblings[1].picture);
        assert.equal(result.siblings[2].jawsize, 5);
      });
    });
  });
});
