import { describe, expect, it } from "vitest";
import { Resource } from "../src/constructs/resource/resource.js";
import { Stack } from "../src/constructs/stack.js";
import { eq } from "../src/fn.js";
import { namingRequiredPolicy } from "../src/naming/naming-policy.js";

describe("Resource ctor — `options.condition`", () => {
  it("accepts `options.condition` as a raw ExpressionOrValue<boolean>", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const isProd = eq("env", "prod");

    const r = new Resource(
      stack,
      {
        type: "Microsoft.Storage/storageAccounts",
        apiVersion: "2024-01-01",
        name: "sa1",
      },
      { condition: isProd },
    );

    expect(r.condition).toBe(isProd);
  });
});

describe("condition inheritance — child inherits its parent's condition", () => {
  it("a child created under a conditional parent inherits the parent's condition", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const isProd = eq("env", "prod");

    const parent = new Resource(
      stack,
      {
        type: "Contoso.X/parents",
        apiVersion: "2024-01-01",
        name: "p1",
      },
      { condition: isProd },
    );
    const child = new Resource(parent, {
      type: "Contoso.X/parents/children",
      apiVersion: "2024-01-01",
      name: "c1",
    });

    // Bicep requires a child of a conditional resource to share the same
    // guard; the ctor inherits it when the child supplies none.
    expect(child.condition).toBe(parent.condition);
    expect(child.condition).toBe(isProd);
  });

  it("an explicit child condition overrides the inherited one", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const parentCond = eq("env", "prod");
    const childCond = eq("region", "eastus");

    const parent = new Resource(
      stack,
      {
        type: "Contoso.X/parents",
        apiVersion: "2024-01-01",
        name: "p1",
      },
      { condition: parentCond },
    );
    const child = new Resource(
      parent,
      {
        type: "Contoso.X/parents/children",
        apiVersion: "2024-01-01",
        name: "c1",
      },
      { condition: childCond },
    );

    expect(child.condition).toBe(childCond);
  });

  it("a child under an unconditional parent has no condition", () => {
    const stack = new Stack("t", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });

    const parent = new Resource(stack, {
      type: "Contoso.X/parents",
      apiVersion: "2024-01-01",
      name: "p1",
    });
    const child = new Resource(parent, {
      type: "Contoso.X/parents/children",
      apiVersion: "2024-01-01",
      name: "c1",
    });

    expect(child.condition).toBeUndefined();
  });
});
