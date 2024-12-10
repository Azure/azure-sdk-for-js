// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { describe, it, beforeEach, expect, vi } from "vitest";
import { vol } from "memfs";
import { resolveConfig } from "../src/util/resolveTsConfig";

vi.mock("fs", async () => {
  const memfs = await import("memfs");
  return {
    ...memfs.fs,
  };
});

describe("resolveConfig", () => {
  beforeEach(() => {
    vol.reset();
  });

  it("should resolve a simple tsconfig.json", () => {
    const def = {
      compilerOptions: {
        target: "ES6",
      },
    };
    vol.fromJSON({
      "/project/tsconfig.json": JSON.stringify(def),
    });

    const result = resolveConfig("/project/tsconfig.json");
    expect(result).toEqual(def);
  });

  it("should resolve tsconfig.json with single extend", () => {
    vol.fromJSON({
      "/project/tsconfig.base.json": JSON.stringify({
        compilerOptions: {
          target: "ES5",
          module: "CommonJS",
        },
      }),
      "/project/tsconfig.json": JSON.stringify({
        extends: "./tsconfig.base.json",
        compilerOptions: {
          strict: true,
        },
      }),
    });

    const result = resolveConfig("/project/tsconfig.json");
    expect(result).toEqual({
      compilerOptions: {
        target: "ES5",
        module: "CommonJS",
        strict: true,
      },
    });
  });

  it("should resolve tsconfig.json with single extend and conflicting option", () => {
    vol.fromJSON({
      "/project/tsconfig.base.json": JSON.stringify({
        compilerOptions: {
          target: "ES5",
          outDir: "path1",
        },
      }),
      "/project/tsconfig.json": JSON.stringify({
        extends: "./tsconfig.base.json",
        compilerOptions: {
          strict: true,
          outDir: "path2",
        },
      }),
    });

    const result = resolveConfig("/project/tsconfig.json");
    expect(result).toEqual({
      compilerOptions: {
        target: "ES5",
        strict: true,
        outDir: "path2",
      },
    });
  });

  it("should resolve tsconfig.json with multiple extends with conflicting options in parents", () => {
    vol.fromJSON({
      "/project/tsconfig.base1.json": JSON.stringify({
        compilerOptions: {
          target: "ES5",
          outDir: "path1",
        },
      }),
      "/project/tsconfig.base2.json": JSON.stringify({
        compilerOptions: {
          outDir: "path2",
        },
      }),
      "/project/tsconfig.json": JSON.stringify({
        extends: ["./tsconfig.base1.json", "./tsconfig.base2.json"],
        compilerOptions: {
          strict: true,
        },
      }),
    });

    const result = resolveConfig("/project/tsconfig.json");
    expect(result).toEqual({
      compilerOptions: {
        target: "ES5",
        strict: true,
        outDir: "path2",
      },
    });
  });
});
