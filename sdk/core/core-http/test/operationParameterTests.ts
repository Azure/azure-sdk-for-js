// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getPathStringFromParameter, OperationParameter } from "../src/operationParameter";

describe("getParameterPathString()", () => {
  it("should throw when given undefined", () => {
    assert.throws(() => getPathStringFromParameter(undefined as any));
  });

  it("should throw when given null", () => {
    // tslint:disable-next-line:no-null-keyword
    assert.throws(() => getPathStringFromParameter(null as any));
  });

  it("should return the parameterPath value when parameterPath is a string", () => {
    const parameter: OperationParameter = {
      parameterPath: "pathToParameterValue",
      mapper: {
        serializedName: "value",
        type: {
          name: "Number"
        }
      }
    };
    assert.strictEqual(getPathStringFromParameter(parameter), "pathToParameterValue");
  });

  it("should return the dotted version of parameterPath when parameterPath is a string[]", () => {
    const parameter: OperationParameter = {
      parameterPath: ["path", "to", "parameter", "value"],
      mapper: {
        serializedName: "value",
        type: {
          name: "Number"
        }
      }
    };
    assert.strictEqual(getPathStringFromParameter(parameter), "path.to.parameter.value");
  });

  it("should return the escaped dotted version of parameterPath when parameterPath is a string[] with dots", () => {
    const parameter: OperationParameter = {
      parameterPath: ["pa.th", "to", "par.ameter", "valu.e"],
      mapper: {
        serializedName: "value",
        type: {
          name: "Number"
        }
      }
    };
    assert.strictEqual(getPathStringFromParameter(parameter), "pa.th.to.par.ameter.valu.e");
  });

  it("should return the mapper's serialized name when the parameterPath is an object", () => {
    const parameter: OperationParameter = {
      parameterPath: {
        a: "A",
        b: "B"
      },
      mapper: {
        serializedName: "value",
        type: {
          name: "Number"
        }
      }
    };
    assert.strictEqual(getPathStringFromParameter(parameter), "value");
  });
});
