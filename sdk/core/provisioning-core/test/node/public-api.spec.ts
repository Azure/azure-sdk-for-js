// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("published loop API", () => {
  it("does not export implementation subpaths", () => {
    const packageJson = JSON.parse(
      readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
    ) as {
      exports: Record<string, unknown>;
    };

    expect(packageJson.exports).not.toHaveProperty("./resource");
    expect(packageJson.exports).not.toHaveProperty("./internal-loop");
  });
});
