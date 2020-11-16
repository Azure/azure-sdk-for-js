// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getRequestUrl } from "../src/urlHelpers";
import { OperationSpec, OperationURLParameter, createSerializer } from "../src";

describe("getRequestUrl", function() {
  const urlParameter: OperationURLParameter = {
    parameterPath: "url",
    mapper: {
      serializedName: "url",
      required: true,
      xmlName: "url",
      type: {
        name: "String"
      }
    },
    skipEncoding: true
  };

  const tableParameter: OperationURLParameter = {
    parameterPath: "table",
    mapper: {
      serializedName: "table",
      required: true,
      xmlName: "table",
      type: {
        name: "String"
      }
    }
  };

  const serializer = createSerializer({}, false);

  const operationSpec: OperationSpec = {
    path: "/Tables('{table}')",
    httpMethod: "DELETE",
    responses: {},
    urlParameters: [urlParameter, tableParameter],
    serializer
  };

  it("should handle nested replacements", function() {
    const result = getRequestUrl(
      "{url}",
      operationSpec,
      { table: "TestTable" },
      { url: "https://test.com" }
    );
    assert.strictEqual(result, "https://test.com/Tables('TestTable')");
  });

  it("should handle query parameters on the base url", function() {
    const result = getRequestUrl(
      "{url}",
      operationSpec,
      { table: "TestTable" },
      { url: "https://test.com?superSecretKey=awesome" }
    );
    assert.strictEqual(result, "https://test.com/Tables('TestTable')?superSecretKey=awesome");
  });

  it("should not modify needlessly encoded query parameters", function() {
    const specWithQueryParams: OperationSpec = {
      ...operationSpec,
      queryParameters: [
        {
          parameterPath: "extraValue",
          mapper: { type: { name: "String" }, serializedName: "extraValue", required: true },
          skipEncoding: true
        }
      ]
    };
    const result = getRequestUrl(
      "{url}",
      specWithQueryParams,
      { table: "TestTable", extraValue: "%27blah%27" },
      { url: "https://test.com?superSecretKey=Qai%2B4%2FIM%3D" }
    );
    assert.strictEqual(
      result,
      "https://test.com/Tables('TestTable')?superSecretKey=Qai%2B4%2FIM%3D&extraValue=%27blah%27"
    );
  });
});
