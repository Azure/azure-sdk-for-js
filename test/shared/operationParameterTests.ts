// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as assert from "assert";
import { getParameterPathString, OperationParameter } from "../../lib/operationParameter";

describe("getParameterPathString()", () => {
  it("should throw when given undefined", () => {
    assert.throws(() => getParameterPathString(undefined as any));
  });

  it("should throw when given null", () => {
    // tslint:disable-next-line:no-null-keyword
    assert.throws(() => getParameterPathString(null as any));
  });

  it("should return the parameterPath value when parameterPath is a string", () => {
    const parameter: OperationParameter = {
      parameterPath: "pathToParameterValue",
      mapper: {
        serializedName: "value",
        type: {
          name: "number"
        }
      }
    };
    assert.strictEqual(getParameterPathString(parameter), "pathToParameterValue");
  });

  it("should return the dotted version of parameterPath when parameterPath is a string[]", () => {
    const parameter: OperationParameter = {
      parameterPath: ["path", "to", "parameter", "value"],
      mapper: {
        serializedName: "value",
        type: {
          name: "number"
        }
      }
    };
    assert.strictEqual(getParameterPathString(parameter), "path.to.parameter.value");
  });

  it("should return the escaped dotted version of parameterPath when parameterPath is a string[] with dots", () => {
    const parameter: OperationParameter = {
      parameterPath: ["pa.th", "to", "par.ameter", "valu.e"],
      mapper: {
        serializedName: "value",
        type: {
          name: "number"
        }
      }
    };
    assert.strictEqual(getParameterPathString(parameter), "pa\\.th.to.par\\.ameter.valu\\.e");
  });

  it("should return the mapper's serialized name when the parameterPath is an object", () => {
    const parameter: OperationParameter = {
      parameterPath: {
        "a": "A",
        "b": "B"
      },
      mapper: {
        serializedName: "value",
        type: {
          name: "number"
        }
      }
    };
    assert.strictEqual(getParameterPathString(parameter), "value");
  });
});