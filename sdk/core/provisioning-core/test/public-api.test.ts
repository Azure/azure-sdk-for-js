// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import * as internalApi from "../src/internal.js";
import * as publicApi from "../src/index.js";
import { Resource } from "../src/constructs/resource/resource.js";
import { Stack } from "../src/constructs/stack.js";

describe("published shape API", () => {
  it("does not expose the internal shape traversal helper", () => {
    expect(internalApi).not.toHaveProperty("isTerminalValueShape");
    expect(publicApi).not.toHaveProperty("isTerminalValueShape");

    // @ts-expect-error Shape traversal helpers are implementation details.
    void internalApi.isTerminalValueShape;
    // @ts-expect-error Shape traversal helpers are not public API.
    void publicApi.isTerminalValueShape;
  });
});

describe("published loop API", () => {
  it("does not export loop primitives from the root entry point", () => {
    expect(publicApi).not.toHaveProperty("Loop");
    expect(publicApi).not.toHaveProperty("LoopedResource");
    expect(publicApi).not.toHaveProperty("isLoopedResource");
    expect(publicApi).not.toHaveProperty("isLoopedResourceOf");
    expect(publicApi).not.toHaveProperty("addLoopedResource");
    expect(publicApi).not.toHaveProperty("getLoopedResources");

    // @ts-expect-error Loop authoring is temporarily not public.
    void publicApi.Loop;
    // @ts-expect-error LoopedResource is temporarily not public.
    void publicApi.LoopedResource;
    // @ts-expect-error Looped stack construction is temporarily not public.
    void publicApi.addLoopedResource;
    // @ts-expect-error Looped stack queries are temporarily not public.
    void publicApi.getLoopedResources;
  });

  it("does not expose loop methods on public classes", () => {
    const stack = new Stack("public-api");

    expect(Resource).not.toHaveProperty("fromLoop");
    expect(stack).not.toHaveProperty("getLoopedResources");

    // @ts-expect-error Resource subclasses must not inherit loop authoring.
    void Resource.fromLoop;
    // @ts-expect-error Stack must not expose loop-specific queries.
    void stack.getLoopedResources;
  });

  it("does not export loop primitives from the internal package entry point", () => {
    expect(internalApi).not.toHaveProperty("Loop");
    expect(internalApi).not.toHaveProperty("LoopedResource");
    expect(internalApi).not.toHaveProperty("createLoopedResource");
    expect(internalApi).not.toHaveProperty("isLoopedResource");
    expect(internalApi).not.toHaveProperty("isLoopedResourceOf");
    expect(internalApi).not.toHaveProperty("addLoopedResource");
    expect(internalApi).not.toHaveProperty("getLoopedResources");

    // @ts-expect-error Loop authoring is workspace-only.
    void internalApi.Loop;
    // @ts-expect-error LoopedResource is workspace-only.
    void internalApi.LoopedResource;
    // @ts-expect-error Looped construction is workspace-only.
    void internalApi.createLoopedResource;
  });

  it("does not export implementation subpaths", () => {
    const packagePath = resolve(fileURLToPath(new URL("..", import.meta.url)), "package.json");
    const packageJson = JSON.parse(readFileSync(packagePath, "utf8")) as {
      exports: Record<string, unknown>;
    };

    expect(packageJson.exports).not.toHaveProperty("./resource");
    expect(packageJson.exports).not.toHaveProperty("./internal-loop");
  });
});
