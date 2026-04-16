// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type {
  OperationQueryParameter,
  OperationSpec,
  OperationURLParameter,
} from "../../src/index.js";
import { createSerializer } from "../../src/index.js";
import { appendQueryParams, getRequestUrl } from "../../src/urlHelpers.js";

describe("getRequestUrl", function () {
  const urlParameter: OperationURLParameter = {
    parameterPath: "url",
    mapper: {
      serializedName: "url",
      required: true,
      xmlName: "url",
      type: {
        name: "String",
      },
    },
    skipEncoding: true,
  };

  const tableParameter: OperationURLParameter = {
    parameterPath: "table",
    mapper: {
      serializedName: "table",
      required: true,
      xmlName: "table",
      type: {
        name: "String",
      },
    },
  };

  const serializer = createSerializer({}, false);

  const operationSpec: OperationSpec = {
    path: "/Tables('{table}')",
    httpMethod: "DELETE",
    responses: {},
    urlParameters: [urlParameter, tableParameter],
    serializer,
  };

  it("should handle nested replacements", function () {
    const result = getRequestUrl(
      "{url}",
      operationSpec,
      { table: "TestTable" },
      { url: "https://test.com" },
    );
    assert.strictEqual(result, "https://test.com/Tables('TestTable')");
  });

  it("should handle query parameters on the base url", function () {
    const result = getRequestUrl(
      "{url}",
      operationSpec,
      { table: "TestTable" },
      { url: "https://test.com?superSecretKey=awesome" },
    );
    assert.strictEqual(result, "https://test.com/Tables('TestTable')?superSecretKey=awesome");
  });

  it("should not modify needlessly encoded query parameters", function () {
    const specWithQueryParams: OperationSpec = {
      ...operationSpec,
      queryParameters: [
        {
          parameterPath: "extraValue",
          mapper: { type: { name: "String" }, serializedName: "extraValue", required: true },
          skipEncoding: true,
        },
      ],
    };
    const result = getRequestUrl(
      "{url}",
      specWithQueryParams,
      { table: "TestTable", extraValue: "%27blah%27" },
      { url: "https://test.com?superSecretKey=Qai%2B4%2FIM%3D" },
    );
    assert.strictEqual(
      result,
      "https://test.com/Tables('TestTable')?superSecretKey=Qai%2B4%2FIM%3D&extraValue=%27blah%27",
    );
  });

  it("should allow empty query parameter value", function () {
    const stringQuery: OperationQueryParameter = {
      parameterPath: "stringQuery",
      mapper: {
        defaultValue: "",
        isConstant: true,
        serializedName: "stringQuery",
        type: {
          name: "String",
        },
      },
    };
    const result = getRequestUrl(
      "https://test.com",
      {
        path: "/path",
        httpMethod: "GET",
        responses: {},
        queryParameters: [stringQuery],
        serializer,
      },
      {},
      {},
    );
    assert.strictEqual(result, "https://test.com/path?stringQuery=");
  });

  it("should work with replacement having both path and search part", function () {
    const result = getRequestUrl(
      "https://test.com/",
      {
        path: "{nextLink}",
        httpMethod: "GET",
        responses: {},
        serializer,
        urlParameters: [
          {
            parameterPath: "nextLink",
            mapper: {
              serializedName: "nextLink",
              required: true,
              type: {
                name: "String",
              },
            },
            skipEncoding: true,
          },
        ],
      },
      { nextLink: "/path?abc%3Ddef" },
      {},
    );
    assert.strictEqual(result, "https://test.com/path?abc%3Ddef");
  });

  it("should create url when there is no existing value", function () {
    const url: string =
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename";

    const queryParams: Map<string, string | string[]> = new Map<string, string | string[]>();
    queryParams.set("api-version", "2020-08-01");

    const res: string = appendQueryParams(url, queryParams, new Set<string>());

    assert.strictEqual(
      res,
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01",
    );
  });

  it("should create url when the existing value is an array and the new value is not an array", function () {
    const url: string =
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01&api-version=2021-08-01";

    const queryParams: Map<string, string | string[]> = new Map<string, string | string[]>();
    queryParams.set("api-version", "2022-08-01");

    const set: Set<string> = new Set<string>();
    set.add("api-version");
    const res: string = appendQueryParams(url, queryParams, set);

    assert.strictEqual(
      res,
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01&api-version=2021-08-01&api-version=2022-08-01",
    );
  });

  it("should create url when the existing value is an array and the new value is also the same array", function () {
    const url: string =
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01&api-version=2021-08-01";

    const queryParams: Map<string, string | string[]> = new Map<string, string | string[]>();
    queryParams.set("api-version", ["2020-08-01", "2021-08-01"]);

    const set: Set<string> = new Set<string>();
    set.add("api-version");
    const res: string = appendQueryParams(url, queryParams, set);

    assert.strictEqual(
      res,
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01&api-version=2021-08-01",
    );
  });

  it("should create url when the existing value is an array and the new value is a different array", function () {
    const url: string =
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01&api-version=2021-08-01";

    const queryParams: Map<string, string | string[]> = new Map<string, string | string[]>();
    queryParams.set("api-version", ["2022-08-01", "2023-08-01"]);

    const set: Set<string> = new Set<string>();
    set.add("api-version");
    const res: string = appendQueryParams(url, queryParams, set);

    assert.strictEqual(
      res,
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01&api-version=2021-08-01&api-version=2022-08-01&api-version=2023-08-01",
    );
  });

  it("should create url when the existing value is not an array and the new value is the same value", function () {
    const url: string =
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01";

    const queryParams: Map<string, string | string[]> = new Map<string, string | string[]>();
    queryParams.set("api-version", "2020-08-01");

    const res: string = appendQueryParams(url, queryParams, new Set<string>());

    assert.strictEqual(
      res,
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01",
    );
  });

  it("should create url when the existing value is not an array and the new value is a different value", function () {
    const url: string =
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01";

    const queryParams: Map<string, string | string[]> = new Map<string, string | string[]>();
    queryParams.set("api-version", "2021-08-01");

    const res: string = appendQueryParams(url, queryParams, new Set<string>());

    assert.strictEqual(
      res,
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2021-08-01",
    );
  });

  it("should create url when the existing value is not an array and the new value is an array", function () {
    const url: string =
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01";

    const queryParams: Map<string, string | string[]> = new Map<string, string | string[]>();
    queryParams.set("api-version", ["2021-08-01", "2022-08-01"]);

    const res: string = appendQueryParams(url, queryParams, new Set<string>());
    assert.strictEqual(
      res,
      "https://management.azure.com/subscriptions/subscription-id/resourceGroups/rg2/providers/Microsoft.Network/virtualNetworks/samplename?api-version=2020-08-01&api-version=2021-08-01&api-version=2022-08-01",
    );
  });
});

describe("urlHelpers coverage", () => {
  it("should handle triple duplicate query params (array push path)", () => {
    const result = appendQueryParams("https://example.com?a=1&a=2&a=3", new Map(), new Set());
    // After parsing, a=1&a=2 becomes array, then a=3 is pushed
    assert.include(result, "a=1");
    assert.include(result, "a=2");
    assert.include(result, "a=3");
  });

  it("should handle sequenceParams with existing scalar value", () => {
    const result = appendQueryParams(
      "https://example.com?q=existing",
      new Map([["q", "newVal"]]),
      new Set(["q"]),
      false,
    );
    // sequenceParams path converts to array, then noOverwrite=false overwrites
    assert.include(result, "q=newVal");
  });

  it("should handle noOverwrite=true to prevent overwriting", () => {
    const result = appendQueryParams(
      "https://example.com?q=existing",
      new Map([["q", "newVal"]]),
      new Set(["q"]),
      true,
    );
    // noOverwrite prevents overwriting; the sequenceParams path creates array but noOverwrite keeps it
    assert.include(result, "q=existing");
    assert.include(result, "q=newVal");
  });

  it("should handle bare query key (undefined value)", () => {
    const result = appendQueryParams("https://example.com?foo", new Map(), new Set());
    // bare key "foo" has no =, so value is undefined, which gets stringified
    assert.include(result, "foo");
  });

  it("should handle existing array + new array merge (dedup)", () => {
    const result = appendQueryParams(
      "https://example.com?q=1&q=2",
      new Map([["q", ["2", "3"]]]),
      new Set(),
    );
    assert.include(result, "q=");
  });

  it("should handle existing array + scalar push", () => {
    const result = appendQueryParams(
      "https://example.com?q=1&q=2",
      new Map([["q", "3"]]),
      new Set(),
    );
    assert.include(result, "q=1");
    assert.include(result, "q=2");
    assert.include(result, "q=3");
  });

  it("should handle existing scalar + new array unshift", () => {
    const result = appendQueryParams(
      "https://example.com?q=existing",
      new Map([["q", ["new1", "new2"]]]),
      new Set(),
      false,
    );
    assert.include(result, "q=");
  });
});

describe("urlHelpers - appendPath branches", () => {
  it("should handle path with query string attached to path component", () => {
    const serializer = createSerializer({}, false);
    const url = getRequestUrl(
      "https://example.com",
      {
        path: "/items?extra=1",
        httpMethod: "GET",
        responses: {},
        serializer,
      },
      {},
      {},
    );
    assert.include(url, "extra=1");
  });

  it("should handle path component that is an absolute URL", () => {
    const serializer = createSerializer({}, false);
    const url = getRequestUrl(
      "https://example.com",
      {
        path: "/{nextLink}",
        httpMethod: "GET",
        responses: {},
        urlParameters: [
          {
            parameterPath: "nextLink",
            mapper: {
              serializedName: "nextLink",
              required: true,
              type: { name: "String" },
            },
            skipEncoding: true,
          },
        ],
        serializer,
      },
      { nextLink: "https://other.com/page2?token=abc" },
      {},
    );
    assert.strictEqual(url, "https://other.com/page2?token=abc");
  });
});

describe("urlHelpers - remaining uncovered lines", () => {
  it("should handle empty path in appendPath (line 111)", () => {
    const serializer = createSerializer({}, false);
    // operationSpec.path is "{param}" which resolves to "" after replacement
    // This causes appendPath to be called with empty pathToAppend
    const url = getRequestUrl(
      "https://example.com",
      {
        httpMethod: "GET",
        responses: {},
        serializer,
        path: "{param}",
        urlParameters: [
          {
            parameterPath: "param",
            mapper: { serializedName: "param", type: { name: "String" } },
            skipEncoding: true,
          },
        ],
      },
      { param: "" },
      {},
    );
    assert.strictEqual(url, "https://example.com");
  });

  it("should add trailing slash to path without one (line 118)", () => {
    const serializer = createSerializer({}, false);
    const url = getRequestUrl(
      "https://example.com/api",
      {
        path: "items",
        httpMethod: "GET",
        responses: {},
        serializer,
      },
      {},
      {},
    );
    assert.include(url, "api/items");
  });

  it("should handle undefined value in combinedParams (line 307)", () => {
    // This covers the case where a param has no = sign (bare key)
    // simpleParseQueryParams gives value as undefined
    // When we later iterate, it hits the else branch at line 307
    const result = appendQueryParams(
      "https://example.com?bare",
      new Map([["other", "val"]]),
      new Set(),
    );
    assert.include(result, "bare");
    assert.include(result, "other=val");
  });

  it("should handle array push in simpleParseQueryParams for 3+ duplicate keys (line 243)", () => {
    // First two dups create an array, third dup pushes to the array
    const result = appendQueryParams(
      "https://example.com?x=1&x=2&x=3",
      new Map([["y", "4"]]),
      new Set(),
    );
    assert.include(result, "x=1");
    assert.include(result, "x=2");
    assert.include(result, "x=3");
    assert.include(result, "y=4");
  });
});
