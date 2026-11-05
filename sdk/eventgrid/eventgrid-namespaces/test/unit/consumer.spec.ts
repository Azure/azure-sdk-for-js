// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import { isNodeLike } from "@azure/core-util";
import { EventGridDeserializer } from "../../src/consumer.js";

describe("EventGridDeserializer", () => {
  const deserializer = new EventGridDeserializer();
  const required = { specVersion: "1.0", id: "event-id", source: "/source", type: "example" };
  const expected = { specversion: undefined, id: "event-id", source: "/source", type: "example" };

  it("accepts JSON and object inputs, including batches and empty batches", async () => {
    assert.deepEqual(await deserializer.deserializeCloudEvents(required), [expected]);
    assert.deepEqual(await deserializer.deserializeCloudEvents(JSON.stringify(required)), [
      expected,
    ]);
    assert.deepEqual(
      await deserializer.deserializeCloudEvents(JSON.stringify([required, required])),
      [expected, expected],
    );
    // Arrays are supported at runtime, but are not part of the public overloads.
    // @ts-expect-error Testing the existing runtime array input support.
    assert.deepEqual(await deserializer.deserializeCloudEvents([required]), [expected]);
    assert.deepEqual(await deserializer.deserializeCloudEvents("[]"), []);
  });

  it("characterizes the mismatch between public and wire property names", async () => {
    const [event] = await deserializer.deserializeCloudEvents({
      ...required,
      specversion: "1.0",
      dataContentType: "ignored/content-type",
      dataSchema: "/ignored-schema",
      datacontenttype: "application/json",
      dataschema: "/schema",
    });
    expect(event).toEqual({
      ...expected,
      specversion: "1.0",
      datacontenttype: "application/json",
      dataschema: "/schema",
      extensionAttributes: {
        specversion: "1.0",
        datacontenttype: "application/json",
        dataschema: "/schema",
      },
    });
  });

  it("currently rejects a wire-only specversion", async () => {
    const { specVersion: _specVersion, ...event } = required;
    await expect(
      deserializer.deserializeCloudEvents({ ...event, specversion: "1.0" }),
    ).rejects.toThrow(/missing required property 'specVersion'/);
  });

  it("preserves null wire metadata without coercion", async () => {
    const [event] = await deserializer.deserializeCloudEvents({
      ...required,
      datacontenttype: null,
      dataschema: null,
    });
    expect(event).toEqual({
      ...expected,
      datacontenttype: null,
      dataschema: null,
      extensionAttributes: { datacontenttype: null, dataschema: null },
    });
  });

  it("does not coerce wire metadata", async () => {
    const [event] = await deserializer.deserializeCloudEvents({
      ...required,
      datacontenttype: 42,
      dataschema: false,
    });
    expect(event).toEqual({
      ...expected,
      datacontenttype: 42,
      dataschema: false,
      extensionAttributes: { datacontenttype: 42, dataschema: false },
    });
  });

  it("requires encoded timestamps rather than Date object inputs", async () => {
    await expect(
      deserializer.deserializeCloudEvents({ ...required, time: new Date("2024-06-11T00:00:00Z") }),
    ).rejects.toThrow(TypeError);
  });

  it("does not validate or normalize wire aliases", async () => {
    for (const specversion of ["0.3", null, 42]) {
      const [event] = await deserializer.deserializeCloudEvents({
        ...required,
        specversion,
        dataContentType: "public/content-type",
        datacontenttype: "wire/content-type",
      });
      expect(event).toEqual({
        ...expected,
        specversion,
        datacontenttype: "wire/content-type",
        extensionAttributes: { specversion, datacontenttype: "wire/content-type" },
      });
    }
  });

  for (const data of [null, false, 0, "", "text", [1, 2], { nested: true }]) {
    it(`preserves data ${JSON.stringify(data)}`, async () => {
      const [event] = await deserializer.deserializeCloudEvents({ ...required, data });
      assert.deepEqual(event, { ...expected, data });
      assert.strictEqual(event.data, data);
    });
  }

  it("omits missing and undefined optional fields", async () => {
    assert.deepEqual(
      await deserializer.deserializeCloudEvents({
        ...required,
        time: undefined,
        subject: undefined,
        data: undefined,
        data_base64: undefined,
        specversion: undefined,
        datacontenttype: undefined,
        dataschema: undefined,
      }),
      [expected],
    );
  });

  it("converts timestamps and preserves invalid Date results", async () => {
    const [event] = await deserializer.deserializeCloudEvents({
      ...required,
      time: "2024-06-11T12:34:56.789Z",
      subject: "subject",
    });
    assert.deepEqual(event, {
      ...expected,
      time: new Date("2024-06-11T12:34:56.789Z"),
      subject: "subject",
    });
    const [invalid] = await deserializer.deserializeCloudEvents({ ...required, time: "invalid" });
    assert.instanceOf(invalid.time, Date);
    assert.isNaN(invalid.time!.getTime());
  });

  it("decodes base64, including an empty payload", async () => {
    const [event] = await deserializer.deserializeCloudEvents({
      ...required,
      data_base64: "AAH+/w==",
    });
    assert.instanceOf(event.data, Uint8Array);
    assert.deepEqual(Array.from(event.data as Uint8Array), [0, 1, 254, 255]);
    const [empty] = await deserializer.deserializeCloudEvents({ ...required, data_base64: "" });
    assert.instanceOf(empty.data, Uint8Array);
    assert.lengthOf(empty.data as Uint8Array, 0);
    assert.notProperty(event, "dataBase64");
    assert.notProperty(event, "data_base64");
  });

  for (const data of [null, false, 0, "", {}]) {
    it(`rejects data ${JSON.stringify(data)} together with data_base64`, async () => {
      await expect(
        deserializer.deserializeCloudEvents({ ...required, data, data_base64: "" }),
      ).rejects.toThrow("event contains both a data and data_base64 field");
    });
  }

  it("rejects a null data_base64", async () => {
    await expect(
      deserializer.deserializeCloudEvents({ ...required, data_base64: null }),
    ).rejects.toThrow("event data_base64 property is not an instance of Uint8Array");
  });

  it("preserves the dataBase64 property override", async () => {
    const bytes = new Uint8Array([0, 1, 254, 255]);
    const [event] = await deserializer.deserializeCloudEvents({
      ...required,
      data_base64: "aGVsbG8=",
      dataBase64: bytes,
    });
    assert.strictEqual(event.data, bytes);
    assert.deepEqual(event, { ...expected, data: bytes });
    assert.deepEqual(
      await deserializer.deserializeCloudEvents({
        ...required,
        data_base64: "aGVsbG8=",
        dataBase64: undefined,
      }),
      [expected],
    );
  });

  it("rejects nonbinary dataBase64 overrides", async () => {
    for (const dataBase64 of [null, "", 42, {}]) {
      await expect(
        deserializer.deserializeCloudEvents({ ...required, dataBase64 }),
      ).rejects.toThrow("event data_base64 property is not an instance of Uint8Array");
    }
  });

  it("rejects an object data_base64", async () => {
    await expect(
      deserializer.deserializeCloudEvents({ ...required, data_base64: {} }),
    ).rejects.toThrow();
  });

  it("preserves platform-specific base64 coercion", async () => {
    for (const [data_base64, bytes] of [
      [42, [227]],
      [true, [182, 187, 158]],
    ] as const) {
      const result = deserializer.deserializeCloudEvents({ ...required, data_base64 });
      if (isNodeLike) {
        await expect(result).rejects.toThrow(TypeError);
      } else {
        const [event] = await result;
        assert.deepEqual(Array.from(event.data as Uint8Array), [...bytes]);
      }
    }
  });

  it("retains extension values without mutating input objects or batches", async () => {
    const extension = Object.freeze({ nested: true });
    const input = Object.freeze({
      ...required,
      data: Object.freeze({ message: "hello" }),
      traceparent: "trace",
      custom: extension,
      nullExtension: null,
      undefinedExtension: undefined,
    });
    const [event] = await deserializer.deserializeCloudEvents(input);
    assert.deepEqual(event, {
      ...expected,
      data: input.data,
      extensionAttributes: {
        traceparent: "trace",
        custom: extension,
        nullExtension: null,
        undefinedExtension: undefined,
      },
    });
    assert.strictEqual(event.extensionAttributes!.custom, extension);
    assert.notStrictEqual(event, input);
    assert.deepEqual(Object.keys(input), [
      ...Object.keys(required),
      "data",
      "traceparent",
      "custom",
      "nullExtension",
      "undefinedExtension",
    ]);
  });

  it("preserves extension names that are also Object prototype properties", async () => {
    const [event] = await deserializer.deserializeCloudEvents(
      JSON.stringify(required).replace(
        /}$/,
        ',"__proto__":{"custom":true},"constructor":"extension"}',
      ),
    );
    assert.isTrue(Object.hasOwn(event.extensionAttributes!, "__proto__"));
    assert.deepEqual(event.extensionAttributes!["__proto__"], { custom: true });
    assert.equal(event.extensionAttributes!["constructor"], "extension");
    assert.strictEqual(Object.getPrototypeOf(event.extensionAttributes), Object.prototype);
  });

  it("does not mutate frozen batches when converting dates and binary payloads", async () => {
    const time = "2024-06-11T12:34:56.789Z";
    const input = Object.freeze({ ...required, time, data_base64: "AAH+/w==" });
    const batch = Object.freeze([input, input]);
    // @ts-expect-error Testing the existing runtime array input support.
    const events = await deserializer.deserializeCloudEvents(batch);
    assert.lengthOf(events, 2);
    expect(events).not.toBe(batch);
    assert.notStrictEqual(events[0], events[1]);
    assert.notStrictEqual(events[0].data, events[1].data);
    assert.deepEqual(events[0].time, new Date(time));
    assert.strictEqual(input.time, time);
    assert.strictEqual(input.data_base64, "AAH+/w==");
    assert.strictEqual(batch[0], input);
  });

  it("preserves nested extensionAttributes as an unknown attribute", async () => {
    const extensionAttributes = { custom: "value" };
    const [event] = await deserializer.deserializeCloudEvents({ ...required, extensionAttributes });
    assert.deepEqual(event.extensionAttributes, { extensionAttributes });
    assert.strictEqual(event.extensionAttributes!.extensionAttributes, extensionAttributes);
  });

  it("ignores symbol attributes", async () => {
    const [event] = await deserializer.deserializeCloudEvents({
      ...required,
      custom: "value",
      [Symbol("extension")]: "ignored",
    });
    assert.deepEqual(event.extensionAttributes, { custom: "value" });
    assert.isEmpty(Object.getOwnPropertySymbols(event.extensionAttributes!));
  });

  it("preserves inherited known wire metadata but not inherited extensions", async () => {
    const input = {
      ...required,
      __proto__: { specversion: "1.0", dataschema: "/schema", custom: "ignored" },
    };
    const [event] = await deserializer.deserializeCloudEvents(input);
    expect(event).toEqual({
      ...expected,
      specversion: "1.0",
      dataschema: "/schema",
      extensionAttributes: { specversion: "1.0", dataschema: "/schema" },
    });
  });

  for (const property of ["id", "source", "type", "specVersion"]) {
    it(`validates the required ${property} property`, async () => {
      const input: Record<string, unknown> = { ...required };
      delete input[property];
      await expect(deserializer.deserializeCloudEvents(input)).rejects.toThrow(
        `event is missing required property '${property}'`,
      );
      for (const value of [null, 1, true, {}, []]) {
        await expect(
          deserializer.deserializeCloudEvents({ ...required, [property]: value }),
        ).rejects.toThrow(TypeError);
      }
    });
  }

  for (const property of ["time", "subject", "dataContentType", "dataSchema"]) {
    it(`validates the optional ${property} property`, async () => {
      for (const value of [null, 1, true, {}, []]) {
        await expect(
          deserializer.deserializeCloudEvents({ ...required, [property]: value }),
        ).rejects.toThrow(TypeError);
      }
    });
  }

  it("rejects unsupported spec versions and malformed JSON", async () => {
    await expect(
      deserializer.deserializeCloudEvents({ ...required, specVersion: "0.3" }),
    ).rejects.toThrow("event is not in the Cloud Event 1.0 schema");
    await expect(deserializer.deserializeCloudEvents("{")).rejects.toThrow(SyntaxError);
  });

  for (const input of ["null", "42", "true", '""', "[null]"]) {
    it(`rejects a non-event input ${input}`, async () => {
      await expect(deserializer.deserializeCloudEvents(input)).rejects.toThrow();
    });
  }
});
