// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { serialize, deserialize } from "../src/serialization";

describe("serialization.serialize", () => {
  it("nested", () => {
    const nestedInput = { a: { b: { c: { d: [42] } } } };
    const result = serialize(nestedInput);
    assert.deepEqual(nestedInput, result);
  });

  it("circular", () => {
    const circluarInput: any = { a: null };
    circluarInput.a = circluarInput;
    assert.throws(() => serialize(circluarInput));
  });

  it("NaN", () => {
    const result = serialize({ a: NaN });
    assert.deepEqual(result, { a: "NaN" });
  });

  it("Infinity", () => {
    const result = serialize({ a: Infinity });
    assert.deepEqual(result, { a: "INF" });
  });

  it("Negative Infinity", () => {
    const result = serialize({ a: -Infinity });
    assert.deepEqual(result, { a: "-INF" });
  });

  afterEach(() => {
    sinon.restore();
  });
});

describe("serialization.deserialize", () => {
  it("nested", () => {
    const nestedInput = { a: { b: { c: { d: [42] } } } };
    const result = deserialize(nestedInput);
    assert.deepEqual(nestedInput, result);
  });

  it("circular", () => {
    const circluarInput: any = { a: null };
    circluarInput.a = circluarInput;
    assert.throws(() => deserialize(circluarInput));
  });

  it("NaN", () => {
    const result = deserialize({ a: "NaN" });
    assert.deepEqual(result, { a: NaN });
  });

  it("Infinity", () => {
    const result = deserialize({ a: "INF" });
    assert.deepEqual(result, { a: Infinity });
  });

  it("Negative Infinity", () => {
    const result = deserialize({ a: "-INF" });
    assert.deepEqual(result, { a: -Infinity });
  });

  it("Date", () => {
    const result = deserialize({ a: "1975-04-04T07:00:00.000Z" });
    assert.deepEqual(result, { a: new Date(1975, 3, 4) });
  });

  afterEach(() => {
    sinon.restore();
  });
});
