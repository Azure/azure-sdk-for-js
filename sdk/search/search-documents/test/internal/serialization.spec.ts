// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import GeographyPoint from "../../src/geographyPoint";
import { deserialize, serialize } from "../../src/serialization";

describe("serialization.serialize", function () {
  it("nested", function () {
    const nestedInput = { a: { b: { c: { d: [42] } } } };
    const result = serialize(nestedInput);
    assert.deepEqual(nestedInput, result);
  });

  it("circular", function () {
    const circularInput: any = { a: null };
    circularInput.a = circularInput;
    const result = serialize(circularInput);
    assert.deepEqual(circularInput, result);
  });

  it("recursive 1", function () {
    const child = { hello: "world" };
    const documents = [
      { id: "1", children: [child] },
      { id: "2", children: [child] },
    ];
    const result = serialize(documents);
    assert.deepEqual(documents, result);
  });

  it("recursive 2", function () {
    const child = { hello: Infinity, world: -Infinity, universe: NaN };
    const expectChild = { hello: "INF", world: "-INF", universe: "NaN" };
    const documents = [
      { id: "1", children: [child] },
      { id: "2", children: [child] },
      { id: "3", children: [child] },
    ];
    const expect = documents.map((doc) => ({ ...doc, children: [expectChild] }));

    const result = serialize(documents);
    assert.deepEqual(result, expect);
  });

  it("NaN", function () {
    const result = serialize({ a: NaN });
    assert.deepEqual(result, { a: "NaN" });
  });

  it("Infinity", function () {
    const result = serialize({ a: Infinity });
    assert.deepEqual(result, { a: "INF" });
  });

  it("Negative Infinity", function () {
    const result = serialize({ a: -Infinity });
    assert.deepEqual(result, { a: "-INF" });
  });

  it("GeographyPoint", function () {
    const result = serialize({
      location: new GeographyPoint({ latitude: 37.989769, longitude: -84.527771 }),
    });
    const expect = {
      location: {
        type: "Point",
        coordinates: [-84.527771, 37.989769],
        crs: { type: "name", properties: { name: "EPSG:4326" } },
      },
    };
    assert.deepEqual(result, expect);
  });

  afterEach(function () {
    sinon.restore();
  });
});

describe("serialization.deserialize", function () {
  it("nested", function () {
    const nestedInput = { a: { b: { c: { d: [42] } } } };
    const result = deserialize(nestedInput);
    assert.deepEqual(nestedInput, result);
  });

  it("circular", function () {
    const circularInput: any = { a: null };
    circularInput.a = circularInput;
    const result = deserialize(circularInput);
    assert.deepEqual(circularInput, result);
  });

  it("recursive 1", function () {
    const child = { hello: "world" };
    const documents = [
      { id: "1", children: [child] },
      { id: "2", children: [child] },
    ];
    const result = deserialize(documents);
    assert.deepEqual(documents, result);
  });

  it("recursive 2", function () {
    const child = { hello: "INF", world: "-INF", universe: "NaN" };
    const expectChild = { hello: Infinity, world: -Infinity, universe: NaN };
    const documents = [
      { id: "1", children: [child] },
      { id: "2", children: [child] },
      { id: "3", children: [child] },
    ];
    const expect = documents.map((doc) => ({ ...doc, children: [expectChild] }));

    const result = deserialize(documents);
    assert.deepEqual(result, expect);
  });

  it("NaN", function () {
    const result = deserialize({ a: "NaN" });
    assert.deepEqual(result, { a: NaN });
  });

  it("Infinity", function () {
    const result = deserialize({ a: "INF" });
    assert.deepEqual(result, { a: Infinity });
  });

  it("Negative Infinity", function () {
    const result = deserialize({ a: "-INF" });
    assert.deepEqual(result, { a: -Infinity });
  });

  it("Date", function () {
    const result = deserialize({ a: "1975-04-04T00:00:00.000Z" });
    assert.deepEqual(result, { a: new Date(Date.UTC(1975, 3, 4)) });
  });

  it("Date with truncated ms field", function () {
    const result = deserialize({ a: "1975-04-04T00:00:00.0Z" });
    assert.deepEqual(result, { a: new Date(Date.UTC(1975, 3, 4)) });
  });

  it("doesn't deserialize as Date if text before", function () {
    const value = "before 1975-04-04T00:00:00.000Z";
    const result = deserialize({ a: value });
    assert.deepEqual(result, { a: value });
  });

  it("doesn't deserialize as Date if text after", function () {
    const value = "1975-04-04T00:00:00.000Z after";
    const result = deserialize({ a: value });
    assert.deepEqual(result, { a: value });
  });

  it("doesn't deserialize as Date if text before and after", function () {
    const value = "before 1975-04-04T00:00:00.000Z after";
    const result = deserialize({ a: value });
    assert.deepEqual(result, { a: value });
  });

  it("GeographyPoint", function () {
    const result: { location: GeographyPoint } = deserialize({
      location: {
        type: "Point",
        coordinates: [-84.527771, 37.989769],
        crs: { type: "name", properties: { name: "EPSG:4326" } },
      },
    });
    assert.instanceOf(result.location, GeographyPoint);
    assert.equal(result.location.latitude, 37.989769);
    assert.equal(result.location.longitude, -84.527771);
  });

  afterEach(function () {
    sinon.restore();
  });
});
