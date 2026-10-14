import { serialize } from "@azure/provisioning-core/serialization";
import { describe, expect, it } from "vitest";
import { Stack } from "../src/constructs/stack.js";
import * as fn from "../src/fn.js";
import { namingRequiredPolicy } from "../src/naming/naming-policy.js";
import { resource } from "./support.js";

describe("fn helpers", () => {
  it("fn.guid serializes correctly", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const myResource = resource(root, {
      name: "myResource",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      testGuid: undefined as unknown,
    });
    (myResource as any).testGuid = fn.guid("a", "b", "c");

    const [file] = serialize(root).infras;
    const res = file?.resources?.resource;
    expect(res?.value.kind).toBe("object");
    if (res?.value.kind !== "object") throw new Error("expected object");

    expect(res.value.value.testGuid).toEqual({
      kind: "function-call",
      target: "guid",
      args: [
        { kind: "string", value: "a" },
        { kind: "string", value: "b" },
        { kind: "string", value: "c" },
      ],
    });
  });

  it("fn.subscriptionResourceId serializes correctly", () => {
    const root = new Stack("infra", {
      targetScope: "resourceGroup",
      namingPolicy: namingRequiredPolicy,
    });
    const myResource = resource(root, {
      name: "myResource",
      type: "Contoso.Test/resources",
      apiVersion: "2024-01-01",
      testId: undefined as unknown,
    });
    (myResource as any).testId = fn.subscriptionResourceId(
      "Microsoft.Authorization/roleDefinitions",
      "some-guid",
    );

    const [file] = serialize(root).infras;
    const res = file?.resources?.resource;
    expect(res?.value.kind).toBe("object");
    if (res?.value.kind !== "object") throw new Error("expected object");

    expect(res.value.value.testId).toEqual({
      kind: "function-call",
      target: "subscriptionResourceId",
      args: [
        { kind: "string", value: "Microsoft.Authorization/roleDefinitions" },
        { kind: "string", value: "some-guid" },
      ],
    });
  });
});
