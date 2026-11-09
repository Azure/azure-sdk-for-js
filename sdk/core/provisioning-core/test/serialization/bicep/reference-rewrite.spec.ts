// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it } from "vitest";
import { Resource, ResourceGroup, fn } from "../../../src/index.js";
import { Stack } from "../../../src/index.js";
import { wrapExpression, unwrapExpression } from "../../../src/expression/expressions.js";
import {
  identifierExpressionNode,
  propertyAccessExpressionNode,
  arrayAccessExpressionNode,
} from "../../../src/expression/ast-nodes.js";
import { Loop, createLoopedResource } from "../../../src/internal-loop.js";
import { renderBicepFiles } from "../../../src/internal.js";
import { compile, files, subscriptionStack, widget } from "./support.js";

function destination(stack: Stack, name: string) {
  return new ResourceGroup(stack, { name, location: "eastus" });
}

describe("authored cross-file reference rewriting", () => {
  beforeEach(() => Stack.clearRoots());

  it("prepares a producer output and arguments for multiple consumers, including forward references", () => {
    const { stack, group } = subscriptionStack("references");
    const producer = widget(group, "producer");
    const consumerGroup = destination(stack, "consumer-rg");
    const consumer = widget(consumerGroup, "consumer", {
      properties: { input: producer.name },
    });
    widget(destination(stack, "second-rg"), "second", {
      properties: { input: producer.name },
    });
    stack.outputs.add("name", "string", producer.name);
    // Visit the producer's RG after both consumer RGs.
    stack.children.push(stack.children.splice(0, 1)[0]!);
    const result = files(stack);
    expect(result).toHaveLength(4);
    const producerFile = result.find((file) =>
      Object.values(file.resources ?? {}).some(
        (node) =>
          node.value.kind === "object" &&
          node.value.value.name?.kind === "string" &&
          node.value.value.name.value === "producer",
      ),
    )!;
    expect(Object.keys(producerFile.outputs!)).toHaveLength(1);
    expect(producerFile.parameters).toBeUndefined();
    const text = renderBicepFiles(stack)
      .map((file) => file.contents)
      .join("\n");
    expect(text).toContain("outputs.widget3Name");
    expect(consumer.parent).toBe(consumerGroup);
  });

  it("keeps safe and reverse access modifiers in producer outputs", () => {
    const { stack, group } = subscriptionStack("modifiers");
    const source = widget(group, "source");
    const base = propertyAccessExpressionNode(identifierExpressionNode(source), "items", {
      nullish: true,
    });
    const forward = wrapExpression(
      arrayAccessExpressionNode(base, 1, { nullish: false, fromEnd: false }),
    );
    const reverse = wrapExpression(
      arrayAccessExpressionNode(base, 1, { nullish: true, fromEnd: true }),
    );
    widget(destination(stack, "consumer-rg"), "consumer", {
      properties: { values: [forward, reverse] },
    });
    const result = files(stack);
    expect(Object.keys(result[1]!.outputs!)).toHaveLength(2);
    expect(Object.keys(result[2]!.parameters!)).toHaveLength(2);
    const text = renderBicepFiles(stack)[1]!.contents;
    expect(text).toContain("widget.?items[1]");
    expect(text).toContain("widget.?items[?^1]");
  });

  it("respects lexical loop shadowing and avoids generated parameter capture", () => {
    const { stack, group } = subscriptionStack("shadowing");
    const source = widget(group, "source");
    const reference = propertyAccessExpressionNode(identifierExpressionNode(source), "name");
    const loop = new Loop([source.name], { itemVariable: "widget" });
    createLoopedResource(Resource, loop, destination(stack, "consumer-rg"), {
      type: "Contoso.Test/consumers",
      apiVersion: "2024-01-01",
      name: loop.item,
      properties: { value: wrapExpression(reference) },
    });
    const captured = new Loop(["local"], { itemVariable: "widgetName" });
    createLoopedResource(Resource, captured, destination(stack, "captured-rg"), {
      type: "Contoso.Test/consumers",
      apiVersion: "2024-01-01",
      name: captured.item,
      properties: { value: wrapExpression(reference) },
    });
    const result = files(stack);
    expect(result[3]!.parameters!.widgetName).toBeUndefined();
    const rendered = renderBicepFiles(stack);
    expect(rendered[2]!.contents).toContain("value: widget.name");
    expect(rendered[3]!.contents).toContain("widgetWidgetName");
  });

  it("rewrites static prefixes but retains computed indexes as local expressions", () => {
    const { stack, group } = subscriptionStack("indexes");
    const source = widget(group, "source");
    const loop = new Loop(["0"], { itemVariable: "position" });
    const expression = wrapExpression(
      arrayAccessExpressionNode(
        propertyAccessExpressionNode(identifierExpressionNode(source), "items"),
        unwrapExpression(loop.item),
        { nullish: true, fromEnd: true },
      ),
    );
    createLoopedResource(Resource, loop, destination(stack, "consumer-rg"), {
      type: "Contoso.Test/consumers",
      apiVersion: "2024-01-01",
      name: loop.item,
      properties: { expression },
    });
    const text = renderBicepFiles(stack)[2]!.contents;
    expect(text).toContain("widgetItems[?^position]");
    expect(Object.keys(files(stack)[1]!.outputs!)).toEqual(["widgetItems"]);
  });

  it("deduplicates producer expressions even when consumer parameter names collide", () => {
    const { stack, group } = subscriptionStack("collisions");
    const source = widget(group, "producer");
    const input = stack.parameters.add("widgetName", "string");
    widget(destination(stack, "first-rg"), "first", {
      properties: { value: source.name, input },
    });
    widget(destination(stack, "second-rg"), "second", {
      properties: { value: source.name },
    });
    const result = files(stack);
    expect(Object.keys(result[1]!.outputs!)).toHaveLength(1);
    expect(Object.keys(result[2]!.parameters!)).toEqual(["widgetName", "widgetWidgetName"]);
    expect(Object.keys(result[3]!.parameters!)).toEqual(["widgetName"]);
  });

  it("avoids mixed-case authored parameters and fallback names when wiring modules", () => {
    const { stack, group } = subscriptionStack("case-collisions");
    const source = widget(group, "producer");
    const names = ["WidgetName", "WIDGETWIDGETNAME", "WidgetWidgetName2"];
    const inputs = names.map((name) => stack.parameters.add(name, "string"));
    widget(destination(stack, "consumer-rg"), "consumer", {
      properties: { value: source.name, inputs },
    });
    const result = files(stack);
    expect(Object.keys(result[2]!.parameters!)).toEqual([...names, "widgetWidgetName3"]);
    const rendered = compile(stack);
    expect(rendered[2]!.contents).toContain("value: widgetWidgetName3");
  }, 60_000);

  it("keeps entry-local resource references as direct module arguments", () => {
    const { stack, group } = subscriptionStack("entry-values");
    widget(group, "consumer", { properties: { name: group.name } });
    const text = renderBicepFiles(stack)[0]!.contents;
    expect(text).toContain("rgName: rg.name");
  });

  it("includes explicit existing lookup dependencies in variables without giving them a producer module", () => {
    const { stack, group } = subscriptionStack("lookup-vars");
    const lookup = new Resource(group, {
      type: "Contoso.Test/lookups",
      apiVersion: "2024-01-01",
      name: "shared",
      existing: true,
      scope: fn.resourceGroup("external"),
    });
    const value = stack.variables.add("lookupValue", lookup.id);
    widget(group, "consumer", { properties: { value } });
    stack.outputs.add("id", "string", value);
    const result = files(stack);
    expect(result).toHaveLength(2);
    expect(result.every((file) => file.resources?.lookup?.existing)).toBe(true);
    expect(result[1]!.outputs).toBeUndefined();
  });
});
