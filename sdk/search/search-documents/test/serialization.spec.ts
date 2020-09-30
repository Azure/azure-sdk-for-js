// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { serialize, deserialize } from "../src/serialization";
import GeographyPoint from "../src/geographyPoint";

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
    const result = deserialize({ a: "1975-04-04T00:00:00.000Z" });
    assert.deepEqual(result, { a: new Date(Date.UTC(1975, 3, 4)) });
  });

  it("doesn't deserialize as Date if text before", () => {
    const value = "before 1975-04-04T00:00:00.000Z";
    const result = deserialize({ a: value });
    assert.deepEqual(result, { a: value });
  });

  it("doesn't deserialize as Date if text after", () => {
    const value = "1975-04-04T00:00:00.000Z after";
    const result = deserialize({ a: value });
    assert.deepEqual(result, { a: value });
  });

  it("doesn't deserialize as Date if text before and after", () => {
    const value = "before 1975-04-04T00:00:00.000Z after";
    const result = deserialize({ a: value });
    assert.deepEqual(result, { a: value });
  });

  it("GeographyPoint", () => {
    const result: { location: GeographyPoint } = deserialize({
      location: {
        type: "Point",
        coordinates: [-84.527771, 37.989769],
        crs: { type: "name", properties: { name: "EPSG:4326" } }
      }
    });
    assert.instanceOf(result.location, GeographyPoint);
    assert.equal(result.location.latitude, -84.527771);
    assert.equal(result.location.longitude, 37.989769);
  });

  afterEach(() => {
    sinon.restore();
  });
});
