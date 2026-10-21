// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it } from "vitest";
import { Stack } from "../../src/constructs/stack.js";
import { deserialize } from "../../src/serialization/index.js";

describe("deserialize", () => {
  beforeEach(() => {
    Stack.clearRoots();
  });

  it("works with existing sample JSON", () => {
    const samplePath = new URL(
      "../../demo/samples/hello-storage/js/output/json/hello-storage.json",
      import.meta.url,
    );
    const json = readFileSync(samplePath, "utf-8");
    const imported = deserialize(json);

    expect(imported.length).toBeGreaterThan(0);

    const allResources = imported.flatMap((stack) => stack.getResources());
    const storageResource = allResources.find(
      (resource) => resource.type === "Microsoft.Storage/storageAccounts",
    );
    expect(storageResource).toBeDefined();
  });
});
