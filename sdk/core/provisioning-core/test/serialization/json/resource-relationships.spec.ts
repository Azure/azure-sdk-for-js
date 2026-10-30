// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { Resource, Stack } from "../../../src/index.js";
import { createLoopedResource, getLoopedResources, Loop } from "../../../src/internal-loop.js";
import { deserialize, serialize } from "../../../src/serialization/index.js";
import type { ExpressionNode } from "../../../src/serialization/ast/index.js";

describe("resource relationship restoration", () => {
  beforeEach(() => Stack.clearRoots());

  it("preserves scalar and looped dependency identities and order", () => {
    const stack = new Stack("dependencies", { targetScope: "resourceGroup" });
    const scalar = new Resource(stack, {
      name: "scalar",
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
    });
    const looped = createLoopedResource(Resource, new Loop(["first", "second"]), stack, {
      name: "looped",
      type: "Contoso.Test/widgets",
      apiVersion: "2024-01-01",
    });
    new Resource(
      stack,
      {
        name: "consumer",
        type: "Contoso.Test/consumers",
        apiVersion: "2024-01-01",
      },
      { dependsOn: [looped, scalar] },
    );
    const [restored] = deserialize(JSON.stringify(serialize(stack)));
    if (!restored) throw new Error("Expected restored Stack");
    const consumer = restored
      .getResources()
      .find((resource) => resource.type === "Contoso.Test/consumers")!;
    expect(consumer.dependsOn).toEqual([
      getLoopedResources(restored)[0],
      restored.getResources().find((resource) => resource.type === scalar.type),
    ]);
    expect(consumer.dependsOn![0]).not.toBe(looped);
    expect(consumer.dependsOn![1]).not.toBe(scalar);
  });

  it("preserves an empty dependency array", () => {
    const stack = new Stack("empty-dependencies", {
      targetScope: "resourceGroup",
    });
    new Resource(
      stack,
      {
        name: "consumer",
        type: "Contoso.Test/consumers",
        apiVersion: "2024-01-01",
      },
      { dependsOn: [] },
    );
    const [restored] = deserialize(JSON.stringify(serialize(stack)));
    expect(restored!.getResources()[0]!.dependsOn).toEqual([]);
  });

  it.each<{
    value: ExpressionNode;
    message: string;
    parameter?: boolean;
  }>([
    {
      value: { kind: "identifier", id: "source" },
      message: 'Resource "consumer" has an invalid "dependsOn" value; expected an array.',
    },
    {
      value: { kind: "array", items: [{ kind: "string", value: "source" }] },
      message:
        'Resource "consumer" has an invalid "dependsOn" reference; expected a resource identifier.',
    },
    {
      value: { kind: "array", items: [{ kind: "identifier", id: "source" }] },
      message: 'Resource "consumer" references unknown resource "source" in "dependsOn".',
    },
    {
      value: { kind: "array", items: [{ kind: "identifier", id: "source" }] },
      message: 'Resource "consumer" references non-resource symbol "source" in "dependsOn".',
      parameter: true,
    },
  ])("rejects invalid dependencies: $message", ({ value, message, parameter }) => {
    const document = {
      infras: [
        {
          fileName: "invalid-dependencies.bicep",
          ...(parameter
            ? {
                parameters: {
                  source: {
                    bicepIdentifier: "source",
                    valueType: {
                      kind: "primitive-type" as const,
                      name: "string" as const,
                    },
                  },
                },
              }
            : {}),
          resources: {
            consumer: {
              bicepIdentifier: "consumer",
              type: "Contoso.Test/consumers",
              apiVersion: "2024-01-01",
              existing: false,
              value: {
                kind: "object",
                value: {
                  name: { kind: "string", value: "consumer" },
                  dependsOn: value,
                },
              },
            },
          },
        },
      ],
    };
    expect(() => deserialize(JSON.stringify(document))).toThrow(message);
  });
});
