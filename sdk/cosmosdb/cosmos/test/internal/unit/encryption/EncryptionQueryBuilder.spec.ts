// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosEncryptedNumber } from "$internal/encryption/index.js";
import {
  EncryptionQueryBuilder,
  CosmosEncryptedNumberType,
} from "@azure/cosmos";
import { TypeMarker } from "$internal/encryption/enums/TypeMarker.js";
import type { JSONArray, JSONObject, SqlParameter } from "@azure/cosmos";
import { describe, it, assert } from "vitest";

describe("EncryptionQueryBuilder.addParameter", () => {
  it("should add a null parameter", () => {
    const builder = new EncryptionQueryBuilder("SELECT * FROM c");
    builder.addParameter("@nullParam", null, "/nullPath");
    const spec = builder.toEncryptionSqlQuerySpec();
    assert.deepStrictEqual(spec.parameters, [
      { name: "@nullParam", value: null, path: "/nullPath" } as SqlParameter,
    ]);
  });

  it("should add a boolean parameter", () => {
    const builder = new EncryptionQueryBuilder("SELECT * FROM c");
    builder.addParameter("@bool", true, "/boolPath");
    const spec = builder.toEncryptionSqlQuerySpec();
    assert.deepStrictEqual(spec.parameters[0], {
      name: "@bool",
      value: true,
      type: TypeMarker.Boolean,
      path: "/boolPath",
    } as SqlParameter);
  });

  it("should add a string parameter", () => {
    const builder = new EncryptionQueryBuilder("SELECT * FROM c");
    builder.addParameter("@string", "testString", "/stringPath");
    const spec = builder.toEncryptionSqlQuerySpec();
    assert.deepStrictEqual(spec.parameters[0], {
      name: "@string",
      value: "testString",
      type: TypeMarker.String,
      path: "/stringPath",
    } as SqlParameter);
  });

  it("should add a Date parameter as an ISO string", () => {
    const builder = new EncryptionQueryBuilder("SELECT * FROM c");
    const date = new Date("2023-01-01T00:00:00Z");
    builder.addParameter("@date", date, "/datePath");
    const spec = builder.toEncryptionSqlQuerySpec();
    assert.deepStrictEqual(spec.parameters[0], {
      name: "@date",
      value: date.toISOString(),
      type: TypeMarker.String,
      path: "/datePath",
    } as SqlParameter);
  });

  it("should add a CosmosEncryptedNumber parameter as Double when value contains decimals", () => {
    const builder = new EncryptionQueryBuilder("SELECT * FROM c");
    const encryptedNumDecimal: CosmosEncryptedNumber = {
      value: 12.34,
      numberType: CosmosEncryptedNumberType.Float,
    };
    builder.addParameter("@encryptedDecimal", encryptedNumDecimal, "/encryptedPath");
    const spec = builder.toEncryptionSqlQuerySpec();
    assert.deepStrictEqual(spec.parameters[0], {
      name: "@encryptedDecimal",
      value: 12.34,
      type: TypeMarker.Double,
      path: "/encryptedPath",
    } as SqlParameter);
  });

  it("should add a CosmosEncryptedNumber parameter as Long when value is whole", () => {
    const builder = new EncryptionQueryBuilder("SELECT * FROM c");
    const encryptedNumWhole: CosmosEncryptedNumber = {
      value: 123,
      numberType: CosmosEncryptedNumberType.Integer,
    };
    builder.addParameter("@encryptedWhole", encryptedNumWhole, "/encryptedPath");
    const spec = builder.toEncryptionSqlQuerySpec();
    assert.deepStrictEqual(spec.parameters[0], {
      name: "@encryptedWhole",
      value: 123,
      type: TypeMarker.Long,
      path: "/encryptedPath",
    } as SqlParameter);
  });

  it("should add a JSONArray parameter", () => {
    const builder = new EncryptionQueryBuilder("SELECT * FROM c");
    const arr: JSONArray = [1, "two", true];
    builder.addParameter("@array", arr, "/arrayPath");
    const spec = builder.toEncryptionSqlQuerySpec();
    assert.deepStrictEqual(spec.parameters[0], {
      name: "@array",
      value: arr,
      path: "/arrayPath",
    } as SqlParameter);
  });

  it("should add a JSONObject parameter", () => {
    const builder = new EncryptionQueryBuilder("SELECT * FROM c");
    const obj: JSONObject = { key: "value", num: 10 };
    builder.addParameter("@object", obj, "/objectPath");
    const spec = builder.toEncryptionSqlQuerySpec();
    assert.deepStrictEqual(spec.parameters[0], {
      name: "@object",
      value: obj,
      path: "/objectPath",
    } as SqlParameter);
  });
});
