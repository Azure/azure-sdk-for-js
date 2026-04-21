// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { CompositeMapper } from "../../src/index.js";
import { createSerializer } from "../../src/index.js";
import type { PipelineRequest } from "@azure/core-rest-pipeline";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import {
  getOperationArgumentValueFromParameter,
  getOperationRequestInfo,
} from "../../src/operationHelpers.js";

describe("operationHelpers", () => {
  it("should handle composite parameterPath (object form)", () => {
    const result = getOperationArgumentValueFromParameter(
      { propA: "valueA", propB: "valueB" },
      {
        parameterPath: {
          propA: "propA",
          propB: "propB",
        },
        mapper: {
          serializedName: "composite",
          required: true,
          type: {
            name: "Composite",
            modelProperties: {
              propA: {
                serializedName: "propA",
                type: { name: "String" },
              },
              propB: {
                serializedName: "propB",
                type: { name: "String" },
              },
            },
          },
        } satisfies CompositeMapper,
      },
    );
    assert.deepStrictEqual(result, { propA: "valueA", propB: "valueB" });
  });

  it("should handle composite parameterPath with non-required mapper and no matching args", () => {
    const result = getOperationArgumentValueFromParameter(
      {},
      {
        parameterPath: {
          propA: "propA",
        },
        mapper: {
          serializedName: "composite",
          required: false,
          type: {
            name: "Composite",
            modelProperties: {
              propA: {
                serializedName: "propA",
                type: { name: "String" },
              },
            },
          },
        } satisfies CompositeMapper,
      },
    );
    assert.isUndefined(result);
  });

  it("should handle composite parameterPath where mapper is not required but property is found", () => {
    const result = getOperationArgumentValueFromParameter(
      { propA: "hello" },
      {
        parameterPath: {
          propA: "propA",
          propB: "propB",
        },
        mapper: {
          serializedName: "composite",
          required: false,
          type: {
            name: "Composite",
            modelProperties: {
              propA: {
                serializedName: "propA",
                type: { name: "String" },
              },
              propB: {
                serializedName: "propB",
                type: { name: "String" },
              },
            },
          },
        } satisfies CompositeMapper,
      },
    );
    assert.deepStrictEqual(result, { propA: "hello" });
  });

  it("should follow originalRequest symbol in getOperationRequestInfo", () => {
    const originalRequestSymbol = Symbol.for("@azure/core-client original request");
    const innerRequest = createPipelineRequest({ url: "https://example.com" });
    const outerRequest = createPipelineRequest({
      url: "https://example.com/outer",
    }) as PipelineRequest & Record<symbol, unknown>;
    outerRequest[originalRequestSymbol] = innerRequest;

    const info1 = getOperationRequestInfo(innerRequest);
    info1.operationSpec = { httpMethod: "GET", responses: {}, serializer: createSerializer() };

    const info2 = getOperationRequestInfo(outerRequest);
    assert.strictEqual(info2.operationSpec?.httpMethod, "GET");
  });
});

describe("operationHelpers - array parameterPath empty check", () => {
  it("should handle empty string parameterPath", () => {
    const result = getOperationArgumentValueFromParameter(
      { "": "rootValue" },
      {
        parameterPath: "",
        mapper: {
          serializedName: "test",
          type: { name: "String" },
        },
      },
    );
    // Empty string parameterPath becomes [""], which has length > 0
    assert.strictEqual(result, "rootValue");
  });
});
