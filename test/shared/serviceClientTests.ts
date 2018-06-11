// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as assert from "assert";
import { getPropertyParent, PropertyParent, applyParameterTransformations } from "../../lib/serviceClient";
import { OperationArguments } from "../../lib/operationArguments";
import { Serializer } from "../../lib/serializer";

describe("applyParameterTransformations()", () => {
  it("should do nothing if provided an undefined operationArguments", () => {
    applyParameterTransformations(
      undefined as any,
      {
        baseUrl: "https://my.base.url",
        httpMethod: "GET",
        serializer: new Serializer()
      });
  });

  it("should do nothing if provided a null operationArguments", () => {
    applyParameterTransformations(
      // tslint:disable-next-line:no-null-keyword
      null as any,
      {
        baseUrl: "https://my.base.url",
        httpMethod: "GET",
        serializer: new Serializer()
      });
  });

  it("should do nothing if provided an operationArguments with an undefined arguments property", () => {
    applyParameterTransformations(
      {
        arguments: undefined as any
      },
      {
        baseUrl: "https://my.base.url",
        httpMethod: "GET",
        serializer: new Serializer()
      });
  });

  it("should do nothing if provided an operationArguments with a null arguments property", () => {
    applyParameterTransformations(
      {
        // tslint:disable-next-line:no-null-keyword
        arguments: null as any
      },
      {
        baseUrl: "https://my.base.url",
        httpMethod: "GET",
        serializer: new Serializer()
      });
  });

  it("should do nothing if provided an operationArguments with an undefined arguments property", () => {
    applyParameterTransformations(
      {
        arguments: undefined as any
      },
      {
        baseUrl: "https://my.base.url",
        httpMethod: "GET",
        serializer: new Serializer()
      });
  });

  it("should do nothing if provided an undefined operationSpec", () => {
    applyParameterTransformations(
      {
        arguments: {}
      },
      undefined as any);
  });

  it("should do nothing if provided a null operationSpec", () => {
    applyParameterTransformations(
      {
        arguments: {}
      },
      // tslint:disable-next-line:no-null-keyword
      null as any);
  });

  it("should do nothing if provided an operationSpec with an undefined parameterTransformations property", () => {
    applyParameterTransformations(
      {
        arguments: {}
      },
      {
        baseUrl: "https://my.base.url",
        httpMethod: "GET",
        parameterTransformations: undefined,
        serializer: new Serializer()
      });
  });

  it("should do nothing if provided an operationSpec with a null parameterTransformations property", () => {
    applyParameterTransformations(
      {
        arguments: {}
      },
      {
        baseUrl: "https://my.base.url",
        httpMethod: "GET",
        // tslint:disable-next-line:no-null-keyword
        parameterTransformations: null as any,
        serializer: new Serializer()
      });
  });

  it("should do nothing if provided an operationSpec with an empty parameterTransformations property", () => {
    applyParameterTransformations(
      {
        arguments: {}
      },
      {
        baseUrl: "https://my.base.url",
        httpMethod: "GET",
        serializer: new Serializer(),
        parameterTransformations: []
      });
  });

  it("should set the target property to undefined when a parameter transformation exists but the source property doesn't exist", async () => {
    const operationArguments: OperationArguments = {
      arguments: {}
    };
    applyParameterTransformations(
        operationArguments,
        {
          baseUrl: "https://my.base.url",
          httpMethod: "GET",
          serializer: new Serializer(),
          parameterTransformations: [
            {
              sourcePath: ["a"],
              targetPath: ["b"]
            }
          ]
        });
    assert.deepEqual(operationArguments.arguments, { b: undefined });
  });

  it("should set the target property to the source property's value when a parameter transformation exists with an existing source property", async () => {
    const operationArguments: OperationArguments = {
      arguments: {
        a: 5
      }
    };
    applyParameterTransformations(
        operationArguments,
        {
          baseUrl: "https://my.base.url",
          httpMethod: "GET",
          serializer: new Serializer(),
          parameterTransformations: [
            {
              sourcePath: ["a"],
              targetPath: ["b"]
            }
          ]
        });
    assert.deepEqual(operationArguments.arguments, { a: 5, b: 5 });
  });

  it("should set the target property to the source property's value when a parameter transformation exists with an existing deep source property", async () => {
    const operationArguments: OperationArguments = {
      arguments: {
        a: {
          c: {
            d: 5
          }
        }
      }
    };
    applyParameterTransformations(
        operationArguments,
        {
          baseUrl: "https://my.base.url",
          httpMethod: "GET",
          serializer: new Serializer(),
          parameterTransformations: [
            {
              sourcePath: ["a", "c", "d"],
              targetPath: ["b"]
            }
          ]
        });
    assert.deepEqual(operationArguments.arguments, { a: { c: { d: 5 } }, b: 5 });
  });

  it("should set the target property to the source property's value when a parameter transformation exists with an existing deep target property", async () => {
    const operationArguments: OperationArguments = {
      arguments: {
        a: 5
      }
    };
    applyParameterTransformations(
        operationArguments,
        {
          baseUrl: "https://my.base.url",
          httpMethod: "GET",
          serializer: new Serializer(),
          parameterTransformations: [
            {
              sourcePath: ["a"],
              targetPath: ["b", "c", "d"]
            }
          ]
        });
    assert.deepEqual(operationArguments.arguments, { a: 5, b: { c: { d: 5 } } });
  });
});

describe("getPropertyParent()", () => {
  it("should return undefined when given an undefined parent", () => {
    assert.strictEqual(getPropertyParent(undefined as any, ["a", "b"]), undefined);
  });

  it("should return null when given an null parent", () => {
    // tslint:disable-next-line:no-null-keyword
    assert.strictEqual(getPropertyParent(null as any, ["a", "b"]), null);
  });

  it("should return the provided parent when the property path is undefined", () => {
    const propertyParent: PropertyParent = {};
    assert.strictEqual(getPropertyParent(propertyParent, undefined as any), propertyParent);
  });

  it("should return the provided parent when the property path is null", () => {
    const propertyParent: PropertyParent = {};
    // tslint:disable-next-line:no-null-keyword
    assert.strictEqual(getPropertyParent(propertyParent, null as any), propertyParent);
  });

  it("should return the provided parent when the property path is empty", () => {
    const propertyParent: PropertyParent = {};
    assert.strictEqual(getPropertyParent(propertyParent, []), propertyParent);
  });

  it("should return the provided parent when the property path has one value", () => {
    const propertyParent: PropertyParent = {};
    assert.strictEqual(getPropertyParent(propertyParent, ["a"]), propertyParent);
  });

  it("should return a newly created property parent when the property path has two values and the first one doesn't appear in the provided property parent", () => {
    const propertyParent: PropertyParent = {};
    const result: PropertyParent = getPropertyParent(propertyParent, ["a", "b"]);
    assert.deepEqual(result, {});
    assert.strictEqual(propertyParent.a, result);
  });

  it("should return an existing property parent when the property path has two values and the first already existed in the provided property parent", () => {
    const propertyParent: PropertyParent = {};
    propertyParent.a = {
      c: "d"
    };
    const result: PropertyParent = getPropertyParent(propertyParent, ["a", "b"]);
    assert.deepEqual(result, { c: "d" });
    assert.strictEqual(propertyParent.a, result);
  });
});