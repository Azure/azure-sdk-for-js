// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { deref, namingRequiredPolicy, Stack } from "@azure/provisioning-core";
import { renderBicepFiles } from "@azure/provisioning-core/internal";
import { deserialize, serialize } from "@azure/provisioning-core/serialization";
import {
  AnalyticsItem,
  type AnalyticsItemProps,
  ApplicationInsightsComponentAnalyticsItem,
  Component,
} from "@azure/provisioning-appinsights";
import { assert, describe, expect, expectTypeOf, it } from "vitest";

function createStack(): Stack {
  return new Stack("analytics-items", {
    targetScope: "resourceGroup",
    namingPolicy: namingRequiredPolicy,
  });
}

describe("expanded Analytics Items resources", () => {
  it("preserves both resource types and case-sensitive body metadata through restoration", () => {
    expectTypeOf<AnalyticsItemProps>().toHaveProperty("Id");
    expectTypeOf<AnalyticsItemProps>().toHaveProperty("Name");
    expectTypeOf<AnalyticsItemProps>().toHaveProperty("Type");
    expectTypeOf<AnalyticsItemProps>().toHaveProperty("Scope");
    expectTypeOf<AnalyticsItemProps>().not.toHaveProperty("id");
    expectTypeOf<AnalyticsItemProps>().not.toHaveProperty("type");
    expectTypeOf<AnalyticsItemProps>().not.toHaveProperty("scope");
    expectTypeOf<AnalyticsItemProps>().not.toHaveProperty("name");
    const stack = createStack();
    const component = new Component(stack, {
      existing: true,
      name: "application",
    });
    const props = {
      Id: "query-id",
      Name: "Requests query",
      Type: "query",
      Scope: "shared",
      content: "requests | take 5",
      properties: { functionAlias: "getRequests" },
    };
    const resources = [
      new AnalyticsItem(component, props),
      new ApplicationInsightsComponentAnalyticsItem(component, {
        ...props,
        Scope: "user",
      }),
    ];
    for (const resource of resources) {
      expect(deref(resource.name)).toBe("item");
      expect(deref(resource.Id)).toBe("query-id");
      expect(deref(resource.Name)).toBe("Requests query");
      resource.Type = "function";
      expect(deref(resource.Type)).toBe("function");
      expect(resource.apiVersion).toBe("2015-05-01");
      expect(resource.type).toMatch(
        /^Microsoft\.Insights\/components\/(?:myanalyticsItems|analyticsItems)$/,
      );
    }
    const document = serialize(stack);
    const nodes = document.infras[0]?.resources;
    assert(nodes);
    for (const resource of resources) {
      const node = Object.values(nodes).find((candidate) => candidate.type === resource.type);
      assert(node);
      expect(node.value).toMatchObject({
        kind: "object",
        value: {
          name: { kind: "string", value: "item" },
          Id: { kind: "string", value: "query-id" },
          Name: { kind: "string", value: "Requests query" },
          Type: { kind: "string", value: "function" },
          Scope: { kind: "string", value: deref(resource.Scope) },
          Content: { kind: "string", value: "requests | take 5" },
          Properties: {
            kind: "object",
            value: { functionAlias: { kind: "string", value: "getRequests" } },
          },
        },
      });
      assert(node.value.kind === "object");
      expect(node.value.value).not.toHaveProperty("id");
      expect(node.value.value).not.toHaveProperty("type");
      expect(node.value.value).not.toHaveProperty("scope");
    }
    const bicep = renderBicepFiles(stack)
      .map((file) => file.contents)
      .join("\n");
    expect(bicep).toContain("Microsoft.Insights/components/analyticsItems@2015-05-01");
    expect(bicep).toContain("Microsoft.Insights/components/myanalyticsItems@2015-05-01");
    expect(bicep).toContain("name: 'item'");
    expect(bicep).toContain("Name: 'Requests query'");
    expect(bicep).toContain("Type: 'function'");
    expect(bicep).toContain("Scope: 'shared'");
    expect(bicep).toContain("Scope: 'user'");
    const [restored] = deserialize(JSON.stringify(document));
    assert(restored);
    const shared = restored.getResources(AnalyticsItem)[0];
    const personal = restored.getResources(ApplicationInsightsComponentAnalyticsItem)[0];
    expect(shared).toBeInstanceOf(AnalyticsItem);
    expect(personal).toBeInstanceOf(ApplicationInsightsComponentAnalyticsItem);
    assert(shared && personal);
    expect(deref(shared.Id)).toBe("query-id");
    expect(deref(shared.Scope)).toBe("shared");
    expect(deref(personal.Scope)).toBe("user");
    expect(serialize(restored)).toEqual(document);
  });

  it("restores fixed-name existing references under their component parent", () => {
    const stack = createStack();
    const component = new Component(stack, {
      existing: true,
      name: "application",
    });
    new AnalyticsItem(component, { existing: true });
    new ApplicationInsightsComponentAnalyticsItem(component, {
      existing: true,
    });
    const document = serialize(stack);
    const [restored] = deserialize(JSON.stringify(document));
    assert(restored);
    expect(deref(restored.getResources(AnalyticsItem)[0]!.name)).toBe("item");
    expect(deref(restored.getResources(ApplicationInsightsComponentAnalyticsItem)[0]!.name)).toBe(
      "item",
    );
    expect(serialize(restored)).toEqual(document);
  });
});
