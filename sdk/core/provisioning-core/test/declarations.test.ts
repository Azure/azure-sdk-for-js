// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";

import { isExpression } from "../src/expression/expressions.js";
import { OutputCollection } from "../src/constructs/output.js";
import { ParameterCollection } from "../src/constructs/parameter.js";
import { VariableCollection } from "../src/constructs/variable.js";

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
    expect(parameters.getAll()).toEqual([environment, replicas]);
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
    expect(variables.getAll()).toEqual([config]);
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
});

describe("OutputCollection", () => {
  it("stores terminal output metadata in insertion order and supports deletion", () => {
    const outputs = new OutputCollection();
    const endpoint = outputs.add("endpoint", "string", "https://example.test", {
      description: "Service endpoint",
    });
    const enabled = outputs.add("enabled", "bool", true);

    expect(outputs.get("endpoint")).toBe(endpoint);
    expect(outputs.getAll()).toEqual([endpoint, enabled]);
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
});
