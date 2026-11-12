// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";

import { isExpression } from "../src/expression/expressions.js";
import { OutputCollection } from "../src/constructs/output.js";
import { ParameterCollection } from "../src/constructs/parameter.js";
import { VariableCollection } from "../src/constructs/variable.js";
import { Stack } from "../src/constructs/stack.js";
import { resource } from "./support.js";

describe("ParameterCollection", () => {
  it("stores handles and metadata in insertion order and supports deletion", () => {
    const parameters = new ParameterCollection();
    const environment = parameters.add("environment", "string", {
      defaultValue: "dev",
      description: "Deployment environment",
      allowed: ["dev", "prod"] as const,
    });
    const replicas = parameters.add("replicas", "int", { defaultValue: 2 });

    expect(isExpression(environment)).toBe(true);
    expect(parameters.get("environment")).toBe(environment);
    expect(parameters.list()).toEqual([environment, replicas]);
    expect(parameters.getMetadata("environment")).toEqual({
      name: "environment",
      type: "string",
      defaultValue: "dev",
      description: "Deployment environment",
      allowed: ["dev", "prod"],
    });
    expect(parameters.size).toBe(2);
    expect(parameters.delete("missing")).toBe(false);
    expect(parameters.delete("environment")).toBe(true);
    expect(parameters.get("environment")).toBeUndefined();
    expect([...parameters]).toEqual([replicas]);
  });

  it("rejects duplicate names", () => {
    const parameters = new ParameterCollection();
    parameters.add("environment", "string");

    expect(() => parameters.add("environment", "string")).toThrow(
      "Duplicate deployment parameter name: environment",
    );
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6komHQ:
  // "A name such as db-password or 1region serializes an invalid Bicep declaration."
  it.each(["db-password", "1region"])("rejects invalid Bicep identifier %s", (name) => {
    expect(() => new ParameterCollection().add(name, "string")).toThrow(
      "must be a valid Bicep identifier",
    );
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6e15lD:
  // "defaultValue is not narrowed by allowed, and runtime validation checks only primitive type."
  it("rejects a literal default outside allowed values", () => {
    const parameters = new ParameterCollection();
    expect(() =>
      parameters.add("environment", "string", {
        allowed: ["dev", "prod"] as const,
        // @ts-expect-error Regression coverage for JavaScript/untyped consumers.
        defaultValue: "staging",
      }),
    ).toThrow("default value must be one of its allowed values");
  });
});

describe("VariableCollection", () => {
  it("stores expression handles separately from declaration metadata", () => {
    const variables = new VariableCollection();
    const config = variables.add(
      "config",
      { enabled: true, regions: ["eastus", "westus"] },
      { description: "Shared configuration", export: true },
    );

    expect(isExpression(config)).toBe(true);
    expect(variables.get("config")).toBe(config);
    expect(variables.getMetadata("config")).toEqual({
      name: "config",
      value: { enabled: true, regions: ["eastus", "westus"] },
      description: "Shared configuration",
      export: true,
    });
    expect(variables.list()).toEqual([config]);
    expect(variables.size).toBe(1);
    expect(variables.delete("config")).toBe(true);
    expect(variables.size).toBe(0);
  });

  it("rejects duplicate names", () => {
    const variables = new VariableCollection();
    variables.add("config", "first");

    expect(() => variables.add("config", "second")).toThrow(
      "Duplicate deployment variable name: config",
    );
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6komHi:
  // "Inputs such as cache-url are accepted here but produce an invalid declaration."
  it("rejects invalid Bicep identifiers", () => {
    expect(() => new VariableCollection().add("cache-url", "value")).toThrow(
      "must be a valid Bicep identifier",
    );
  });
});

describe("OutputCollection", () => {
  it("stores terminal output metadata in insertion order and supports deletion", () => {
    const outputs = new OutputCollection();
    const endpoint = outputs.add("endpoint", "string", "https://example.test", {
      description: "Service endpoint",
    });
    const enabled = outputs.add("enabled", "bool", true);

    expect(outputs.get("endpoint")).toBe(endpoint);
    expect(outputs.list()).toEqual([endpoint, enabled]);
    expect([...outputs]).toEqual([endpoint, enabled]);
    expect(outputs.size).toBe(2);
    expect(outputs.delete("missing")).toBe(false);
    expect(outputs.delete("endpoint")).toBe(true);
    expect(outputs.get("endpoint")).toBeUndefined();
  });

  it("rejects duplicate names", () => {
    const outputs = new OutputCollection();
    outputs.add("endpoint", "string", "first");

    expect(() => outputs.add("endpoint", "string", "second")).toThrow(
      "Duplicate deployment output name: endpoint",
    );
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6komG9:
  // "Arbitrary strings accepted here (for example vault-uri) generate invalid Bicep."
  it("rejects invalid Bicep identifiers", () => {
    expect(() => new OutputCollection().add("vault-uri", "string", "value")).toThrow(
      "must be a valid Bicep identifier",
    );
  });

  // Azure/azure-sdk-for-js#39825 Copilot review PRRT_kwDOBnSy6c6eW0El:
  // "The scalar overload accepts any Resource, so outputs.add('x', 'bool', vault) type-checks."
  it("rejects resource handles for scalar outputs", () => {
    const stack = new Stack("outputs");
    const handle = resource(stack, {
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
      name: "widget",
    });
    const outputs = new OutputCollection();

    const assertInvalidOutputType = (): void => {
      // @ts-expect-error A resource is not a scalar output value.
      outputs.add("widget", "string", handle);
    };
    void assertInvalidOutputType;
    expect(() => outputs.add("widget", "string", handle as any)).toThrow(
      'expected type "string" but got resource',
    );
  });
});
