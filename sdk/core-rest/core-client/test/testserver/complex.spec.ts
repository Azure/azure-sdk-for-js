// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.bigint" />
import { PipelinePolicy } from "@azure/core-rest-pipeline";
import { Client, getClient } from "../../src";
import { assert } from "chai";

const intBody = { field1: -1, field2: 2 };
const longBody = { field1: 1099511627775, field2: -999511627788 };
const floatBody = { field1: 1.05, field2: -0.003 };
const doubleBody = {
  field1: 3e-100,
  field_56_zeros_after_the_dot_and_negative_zero_before_dot_and_this_is_a_long_field_name_on_purpose: -0.000000000000000000000000000000000000000000000000000000005,
};
const boolBody = { field_true: true, field_false: false };
const stringBody = { field: "goodrequest", empty: "", null: null };
const stringBodyInbound = { field: "goodrequest", empty: "" };
const dateBody = { field: "0001-01-01", leap: "2016-02-29" };
const datetimeBody = { field: "0001-01-01T00:00:00Z", now: "2015-05-18T18:38:00Z" };

const datetimeRfc1123Body = {
  field: "Mon, 01 Jan 0001 00:00:00 GMT",
  now: "Mon, 18 May 2015 11:38:00 GMT",
};
const arrayValidBody = {
  array: ["1, 2, 3, 4", "", null, "&S#$(*Y", "The quick brown fox jumps over the lazy dog"],
};

const durationBody = { field: "P123DT22H14M12.011S" };
const dictionaryValidBody = {
  defaultProgram: { txt: "notepad", bmp: "mspaint", xls: "excel", exe: "", "": null },
};

describe("TestServer - Complex", () => {
  let client: Client;
  beforeEach(() => {
    client = getClient("http://localhost:3000");
    const policy: PipelinePolicy = {
      name: "allowInsecureConnections",
      sendRequest: (req, next) => {
        req.allowInsecureConnection = true;
        return next(req);
      },
    };

    client.pipeline.addPolicy(policy);
  });

  describe("basic", () => {
    it("putComplexBasicValid", async () => {
      const result = await client
        .pathUnchecked("/complex/basic/valid")
        .put({ body: { id: 2, name: "abc", color: "Magenta" } });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("getComplexBasicValid", async () => {
      const result = await client.pathUnchecked("/complex/basic/valid").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, { id: 2, name: "abc", color: "YELLOW" });
    });

    it("getComplexBasicEmpty", async () => {
      const result = await client.pathUnchecked("/complex/basic/empty").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, {});
    });

    it("getComplexBasicNotProvided", async () => {
      const result = await client.pathUnchecked("/complex/basic/notprovided").get();
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("getComplexBasicNull", async () => {
      const result = await client.pathUnchecked("/complex/basic/null").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, { id: null, name: null });
    });

    it("getComplexBasicInvalid", async () => {
      const result = await client.pathUnchecked("/complex/basic/invalid").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, { id: "a", name: "abc" });
    });
  });

  describe("primitive properties", () => {
    it("putComplexPrimitiveInteger", async () => {
      const result = await client
        .pathUnchecked("/complex/primitive/integer")
        .put({ body: intBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("putComplexPrimitiveLong", async () => {
      const result = await client.pathUnchecked("/complex/primitive/long").put({ body: longBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("putComplexPrimitiveFloat", async () => {
      const result = await client
        .pathUnchecked("/complex/primitive/float")
        .put({ body: floatBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("putComplexPrimitiveDouble", async () => {
      const result = await client
        .pathUnchecked("/complex/primitive/double")
        .put({ body: doubleBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("putComplexPrimitiveBool", async () => {
      const result = await client.pathUnchecked("/complex/primitive/bool").put({ body: boolBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("putComplexPrimitiveString", async () => {
      const result = await client
        .pathUnchecked("/complex/primitive/string")
        .put({ body: stringBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);

      const resultWithNull = await client
        .pathUnchecked("/complex/primitive/string")
        .put({ body: stringBodyInbound });
      assert.equal(resultWithNull.status, "200");
      assert.isUndefined(resultWithNull.body);
    });

    it("putComplexPrimitiveDate", async () => {
      const result = await client.pathUnchecked("/complex/primitive/date").put({ body: dateBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("putComplexPrimitiveDateTime", async () => {
      const result = await client
        .pathUnchecked("/complex/primitive/datetime")
        .put({ body: datetimeBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("putComplexPrimitiveDateTimeRfc1123", async () => {
      const result = await client
        .pathUnchecked("/complex/primitive/datetimerfc1123")
        .put({ body: datetimeRfc1123Body });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("putComplexPrimitiveDuration", async () => {
      const result = await client
        .pathUnchecked("/complex/primitive/duration")
        .put({ body: durationBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    // TODO: Figure out the experience for RLCs with bytes. Do we serialize UInt8Array or do we expect
    // customers to send an alredy encoded string?
    // it("putComplexPrimitiveByte", async () => {
    //   const result = await client.pathUnchecked("/complex/primitive/byte").put({ body: byteBody });
    //   assert.equal(result.status, "200");
    //   assert.isUndefined(result.body);
    // });

    it("getComplexPrimitiveInteger", async () => {
      const result = await client.pathUnchecked("/complex/primitive/integer").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, intBody);
    });

    it("getComplexPrimitiveLong", async () => {
      const result = await client.pathUnchecked("/complex/primitive/long").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, longBody);
    });

    it("getComplexPrimitiveFloat", async () => {
      const result = await client.pathUnchecked("/complex/primitive/float").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, floatBody);
    });

    it("getComplexPrimitiveDouble", async () => {
      const result = await client.pathUnchecked("/complex/primitive/double").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, doubleBody);
    });

    it("getComplexPrimitiveBool", async () => {
      const result = await client.pathUnchecked("/complex/primitive/bool").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, boolBody);
    });

    it("getComplexPrimitiveString", async () => {
      const result = await client.pathUnchecked("/complex/primitive/string").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, stringBody);
    });

    it("getComplexPrimitiveDate", async () => {
      const result = await client.pathUnchecked("/complex/primitive/date").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, dateBody);
    });

    it("getComplexPrimitiveDateTime", async () => {
      const result = await client.pathUnchecked("/complex/primitive/datetime").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, datetimeBody);
    });

    it("getComplexPrimitiveDateTTimeRfc1123", async () => {
      const result = await client.pathUnchecked("/complex/primitive/datetimerfc1123").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, datetimeRfc1123Body);
    });

    it("getComplexPrimitiveDuration", async () => {
      const result = await client.pathUnchecked("/complex/primitive/duration").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, durationBody);
    });
  });

  describe("array properties", () => {
    it("putComplexArrayValid", async () => {
      const result = await client
        .pathUnchecked("/complex/array/valid")
        .put({ body: arrayValidBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("putComplexArrayEmpty", async () => {
      const result = await client
        .pathUnchecked("/complex/array/empty")
        .put({ body: { array: [] } });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("getComplexArrayValid", async () => {
      const result = await client.pathUnchecked("/complex/array/valid").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, arrayValidBody);
    });

    it("getComplexArrayValid", async () => {
      const result = await client.pathUnchecked("/complex/array/empty").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, { array: [] });
    });

    it("getComplexArrayValid", async () => {
      const result = await client.pathUnchecked("/complex/array/notprovided").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, {});
    });

    it("putComplexArrayEmpty", async () => {
      const result = await client
        .pathUnchecked("/complex/array/empty")
        .put({ body: { array: [] } });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });
  });

  describe("dictionary properties", () => {
    it("putComplexDictionaryValid", async () => {
      const result = await client
        .pathUnchecked("/complex/dictionary/typed/valid")
        .put({ body: dictionaryValidBody });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("putComplexDictionaryEmpty", async () => {
      const result = await client
        .pathUnchecked("/complex/dictionary/typed/empty")
        .put({ body: { defaultProgram: {} } });
      assert.equal(result.status, "200");
      assert.isUndefined(result.body);
    });

    it("getComplexDictionaryValid", async () => {
      const result = await client.pathUnchecked("/complex/dictionary/typed/valid").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, dictionaryValidBody);
    });

    it("getComplexDictionaryEmpty", async () => {
      const result = await client.pathUnchecked("/complex/dictionary/typed/empty").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, { defaultProgram: {} });
    });

    it("getComplexDictionaryNull", async () => {
      const result = await client.pathUnchecked("/complex/dictionary/typed/null").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, { defaultProgram: null });
    });

    it("getComplexDictionaryNotProvided", async () => {
      const result = await client.pathUnchecked("/complex/dictionary/typed/notprovided").get();
      assert.equal(result.status, "200");
      assert.deepEqual(result.body, {});
    });
  });
});
