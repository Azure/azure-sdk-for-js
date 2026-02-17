// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import type { Config, ResolvedConfigResult } from "../src/util/resolveTsConfig.ts";
import { configIncludesSrc } from "../src/commands/run/build-test.ts";

function makeConfig(overrides: Partial<Config> = {}): Config {
  return {
    compilerOptions: {},
    ...overrides,
  };
}

describe("configIncludesSrc", () => {
  it("returns true when include/files are omitted", () => {
    const resolved: ResolvedConfigResult = {
      config: makeConfig(),
      references: [],
    };

    expect(configIncludesSrc(resolved)).toBe(true);
  });

  it("returns false when include/files are explicitly empty", () => {
    const resolved: ResolvedConfigResult = {
      config: makeConfig({ include: [], files: [] }),
      references: [],
    };

    expect(configIncludesSrc(resolved)).toBe(false);
  });

  it("returns true when a config includes src", () => {
    const resolved: ResolvedConfigResult = {
      config: makeConfig({ include: ["./src/index.ts"] }),
      references: [],
    };

    expect(configIncludesSrc(resolved)).toBe(true);
  });

  it("checks referenced configs for src", () => {
    const resolved: ResolvedConfigResult = {
      config: makeConfig({ include: ["./test/sample.ts"] }),
      references: [
        {
          path: "/ref/tsconfig.json",
          config: makeConfig({ include: ["./src/ref.ts"] }),
        },
      ],
    };

    expect(configIncludesSrc(resolved)).toBe(true);
  });
});
