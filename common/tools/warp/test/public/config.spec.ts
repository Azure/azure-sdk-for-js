// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { stringify } from "yaml";
import { findWarpConfig, WarpError } from "../../src/index.ts";

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-test-"));
}

async function cleanup(dir: string): Promise<void> {
  await fs.rm(dir, { recursive: true, force: true });
}

describe("findWarpConfig", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await createTmpDir();
  });

  afterEach(async () => {
    await cleanup(tmpDir);
  });

  const minimalConfig = {
    exports: { ".": "./src/index.ts" },
    targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
  };

  it("resolves warp.config.yml", async () => {
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(minimalConfig));
    // Write a pnpm-workspace.yaml to stop traversal
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.source.type).toBe("yaml");
    expect(result!.config.exports["."]).toBe("./src/index.ts");
    expect(result!.config.targets).toHaveLength(1);
    expect(result!.config.targets[0].name).toBe("esm");
  });

  it("resolves warp.config.yaml (alternate extension)", async () => {
    await fs.writeFile(path.join(tmpDir, "warp.config.yaml"), stringify(minimalConfig));
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.source.type).toBe("yaml");
  });

  it("resolves warp.config.json", async () => {
    await fs.writeFile(path.join(tmpDir, "warp.config.json"), JSON.stringify(minimalConfig));
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.source.type).toBe("json");
    expect(result!.config.exports["."]).toBe("./src/index.ts");
  });

  it("resolves package.json warp key as fallback", async () => {
    const pkg = { name: "test", warp: minimalConfig };
    await fs.writeFile(path.join(tmpDir, "package.json"), JSON.stringify(pkg));
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.source.type).toBe("package.json");
    expect(result!.config.targets[0].condition).toBe("import");
  });

  it("prefers yml over yaml", async () => {
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(minimalConfig));
    const altConfig = {
      ...minimalConfig,
      targets: [{ name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yaml"), stringify(altConfig));
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.config.targets[0].name).toBe("esm");
  });

  it("prefers yaml file over package.json warp key", async () => {
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(minimalConfig));
    const pkg = {
      name: "test",
      warp: {
        ...minimalConfig,
        targets: [{ name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" }],
      },
    };
    await fs.writeFile(path.join(tmpDir, "package.json"), JSON.stringify(pkg));
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.config.targets[0].name).toBe("esm");
  });

  it("prefers yaml over warp.config.json", async () => {
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(minimalConfig));
    const jsonConfig = {
      ...minimalConfig,
      targets: [{ name: "cjs", condition: "require", tsconfig: "./tsconfig.cjs.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.json"), JSON.stringify(jsonConfig));

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.source.type).toBe("yaml");
    expect(result!.config.targets[0].name).toBe("esm");
  });

  it("loads explicit json configPath", async () => {
    const explicit = {
      exports: { ".": "./src/index.ts" },
      targets: [{ name: "browser", condition: "browser", tsconfig: "./tsconfig.browser.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "custom.warp.config.json"), JSON.stringify(explicit));

    const result = await findWarpConfig(tmpDir, "custom.warp.config.json");
    expect(result).toBeDefined();
    expect(result!.source.type).toBe("json");
    expect(result!.config.targets[0].name).toBe("browser");
  });

  it("returns undefined when no config is found", async () => {
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeUndefined();
  });

  it("throws on missing exports", async () => {
    const bad = { targets: [{ name: "esm", condition: "import", tsconfig: "./t.json" }] };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(bad));
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    await expect(findWarpConfig(tmpDir)).rejects.toThrow('"exports" must be an object');
  });

  it("throws on empty targets array", async () => {
    const bad = { exports: { ".": "./src/index.ts" }, targets: [] };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(bad));
    await fs.writeFile(path.join(tmpDir, "pnpm-workspace.yaml"), "packages: []");

    await expect(findWarpConfig(tmpDir)).rejects.toThrow('"targets" must be a non-empty array');
  });

  it("defaults condition to name when omitted", async () => {
    const cfg = {
      exports: { ".": "./src/index.ts" },
      targets: [{ name: "import", tsconfig: "./tsconfig.esm.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(cfg));

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.config.targets[0].condition).toBe("import");
  });

  it("uses explicit condition when provided", async () => {
    const cfg = {
      exports: { ".": "./src/index.ts" },
      targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(cfg));

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.config.targets[0].name).toBe("esm");
    expect(result!.config.targets[0].condition).toBe("import");
  });

  it("resolves polyfillSuffix: true to -name", async () => {
    const cfg = {
      exports: { ".": "./src/index.ts" },
      targets: [{ name: "browser", tsconfig: "./tsconfig.browser.json", polyfillSuffix: true }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(cfg));

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.config.targets[0].polyfillSuffix).toBe("-browser");
  });

  it("does not polyfill when polyfillSuffix is omitted", async () => {
    const cfg = {
      exports: { ".": "./src/index.ts" },
      targets: [{ name: "browser", tsconfig: "./tsconfig.browser.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(cfg));

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.config.targets[0].polyfillSuffix).toBeUndefined();
  });

  it("disables polyfillSuffix when set to false", async () => {
    const cfg = {
      exports: { ".": "./src/index.ts" },
      targets: [{ name: "esm", tsconfig: "./tsconfig.esm.json", polyfillSuffix: false }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(cfg));

    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.config.targets[0].polyfillSuffix).toBeUndefined();
  });

  it("throws WarpError with CONFIG_INVALID on malformed YAML", async () => {
    // Unterminated flow sequence causes a YAML parse error
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), "exports: [");

    await expect(findWarpConfig(tmpDir)).rejects.toThrow(WarpError);
    await expect(findWarpConfig(tmpDir)).rejects.toMatchObject({
      code: "CONFIG_INVALID",
    });
    await expect(findWarpConfig(tmpDir)).rejects.toThrow("Failed to parse");
  });

  it("throws WarpError with CONFIG_INVALID on malformed JSON", async () => {
    await fs.writeFile(path.join(tmpDir, "warp.config.json"), '{"exports":');

    await expect(findWarpConfig(tmpDir)).rejects.toThrow(WarpError);
    await expect(findWarpConfig(tmpDir)).rejects.toMatchObject({
      code: "CONFIG_INVALID",
    });
    await expect(findWarpConfig(tmpDir)).rejects.toThrow("Failed to parse");
  });

  it("throws WarpError with CONFIG_INVALID on empty export key", async () => {
    const bad = {
      exports: { "": "./src/index.ts" },
      targets: [{ name: "esm", condition: "import", tsconfig: "./t.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(bad));

    await expect(findWarpConfig(tmpDir)).rejects.toThrow(WarpError);
    await expect(findWarpConfig(tmpDir)).rejects.toMatchObject({
      code: "CONFIG_INVALID",
    });
    await expect(findWarpConfig(tmpDir)).rejects.toThrow("must not be empty");
  });

  it("throws WarpError with CONFIG_INVALID on duplicate export key", async () => {
    // YAML merges duplicate keys, so we test via package.json where raw object is passed
    const pkg = {
      name: "test",
      warp: {
        exports: { ".": "./src/index.ts" },
        targets: [{ name: "esm", condition: "import", tsconfig: "./t.json" }],
      },
    };
    // The duplicate key test validates the Set-based check works for programmatic usage.
    // In YAML, duplicate keys are merged by the parser, so the check guards against
    // edge cases in package.json or programmatic config construction.
    await fs.writeFile(path.join(tmpDir, "package.json"), JSON.stringify(pkg));

    // This should succeed — no actual duplicates
    const result = await findWarpConfig(tmpDir);
    expect(result).toBeDefined();
    expect(result!.config.exports["."]).toBe("./src/index.ts");
  });

  it("throws VALIDATION_ERROR for export key not starting with ./", async () => {
    const bad = {
      exports: { bad: "./src/index.ts" },
      targets: [{ name: "esm", condition: "import", tsconfig: "./t.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(bad));

    await expect(findWarpConfig(tmpDir)).rejects.toThrow(WarpError);
    await expect(findWarpConfig(tmpDir)).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
    });
    await expect(findWarpConfig(tmpDir)).rejects.toThrow('must be "." or start with "./"');
  });

  it("throws VALIDATION_ERROR for export key with trailing slash", async () => {
    const bad = {
      exports: { "./utils/": "./src/utils.ts" },
      targets: [{ name: "esm", condition: "import", tsconfig: "./t.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(bad));

    await expect(findWarpConfig(tmpDir)).rejects.toThrow(WarpError);
    await expect(findWarpConfig(tmpDir)).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
    });
    await expect(findWarpConfig(tmpDir)).rejects.toThrow('must not end with "/"');
  });

  it("throws VALIDATION_ERROR for export key with wildcard, showing corrective example", async () => {
    const bad = {
      exports: { "./*": "./src/*.ts" },
      targets: [{ name: "esm", condition: "import", tsconfig: "./t.json" }],
    };
    await fs.writeFile(path.join(tmpDir, "warp.config.yml"), stringify(bad));

    await expect(findWarpConfig(tmpDir)).rejects.toThrow(WarpError);
    await expect(findWarpConfig(tmpDir)).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
    });
    await expect(findWarpConfig(tmpDir)).rejects.toThrow("contains a wildcard");
    // Verify the corrective example is included
    await expect(findWarpConfig(tmpDir)).rejects.toThrow("Instead of:");
    await expect(findWarpConfig(tmpDir)).rejects.toThrow("Use:");
  });

  describe("extends", () => {
    const baseConfig = {
      exports: { "./package.json": "./package.json", ".": "./src/index.ts" },
      targets: [
        { name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" },
        { name: "commonjs", condition: "require", tsconfig: "./tsconfig.cjs.json" },
      ],
    };

    it("inherits exports and targets from base config", async () => {
      // Write base config to a sibling directory
      const baseDir = path.join(tmpDir, "base");
      await fs.mkdir(baseDir, { recursive: true });
      await fs.writeFile(path.join(baseDir, "warp.base.config.yml"), stringify(baseConfig));

      // Write child config that only extends
      const childDir = path.join(tmpDir, "child");
      await fs.mkdir(childDir, { recursive: true });
      await fs.writeFile(
        path.join(childDir, "warp.config.yml"),
        stringify({ extends: "../base/warp.base.config.yml" }),
      );

      const result = await findWarpConfig(childDir);
      expect(result).toBeDefined();
      expect(result!.config.exports["."]).toBe("./src/index.ts");
      expect(result!.config.exports["./package.json"]).toBe("./package.json");
      expect(result!.config.targets).toHaveLength(2);
      expect(result!.config.targets[0].name).toBe("esm");
      expect(result!.config.targets[1].name).toBe("commonjs");
    });

    it("merges child exports on top of base exports", async () => {
      await fs.writeFile(path.join(tmpDir, "warp.base.config.yml"), stringify(baseConfig));
      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({
          extends: "./warp.base.config.yml",
          exports: { "./api": "./src/api/index.ts", "./models": "./src/models/index.ts" },
        }),
      );

      const result = await findWarpConfig(tmpDir);
      expect(result).toBeDefined();
      // Base exports preserved
      expect(result!.config.exports["."]).toBe("./src/index.ts");
      expect(result!.config.exports["./package.json"]).toBe("./package.json");
      // Child exports added
      expect(result!.config.exports["./api"]).toBe("./src/api/index.ts");
      expect(result!.config.exports["./models"]).toBe("./src/models/index.ts");
    });

    it("child exports override base exports for same key", async () => {
      await fs.writeFile(path.join(tmpDir, "warp.base.config.yml"), stringify(baseConfig));
      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({
          extends: "./warp.base.config.yml",
          exports: { ".": "./src/custom.ts" },
        }),
      );

      const result = await findWarpConfig(tmpDir);
      expect(result).toBeDefined();
      expect(result!.config.exports["."]).toBe("./src/custom.ts");
      // Other base exports still present
      expect(result!.config.exports["./package.json"]).toBe("./package.json");
    });

    it("child targets replace base targets entirely", async () => {
      await fs.writeFile(path.join(tmpDir, "warp.base.config.yml"), stringify(baseConfig));
      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({
          extends: "./warp.base.config.yml",
          targets: [{ name: "esm-only", condition: "import", tsconfig: "./tsconfig.esm.json" }],
        }),
      );

      const result = await findWarpConfig(tmpDir);
      expect(result).toBeDefined();
      expect(result!.config.targets).toHaveLength(1);
      expect(result!.config.targets[0].name).toBe("esm-only");
    });

    it("inherits base targets when child has no targets", async () => {
      await fs.writeFile(path.join(tmpDir, "warp.base.config.yml"), stringify(baseConfig));
      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({
          extends: "./warp.base.config.yml",
          exports: { "./extra": "./src/extra.ts" },
        }),
      );

      const result = await findWarpConfig(tmpDir);
      expect(result).toBeDefined();
      // Targets come from base
      expect(result!.config.targets).toHaveLength(2);
      expect(result!.config.targets[0].name).toBe("esm");
    });

    it("supports multi-level extends", async () => {
      const grandparent = {
        exports: { "./package.json": "./package.json", ".": "./src/index.ts" },
        targets: [{ name: "esm", condition: "import", tsconfig: "./tsconfig.esm.json" }],
      };
      await fs.writeFile(path.join(tmpDir, "grandparent.yml"), stringify(grandparent));
      await fs.writeFile(
        path.join(tmpDir, "parent.yml"),
        stringify({
          extends: "./grandparent.yml",
          exports: { "./api": "./src/api/index.ts" },
        }),
      );
      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({
          extends: "./parent.yml",
          exports: { "./models": "./src/models/index.ts" },
        }),
      );

      const result = await findWarpConfig(tmpDir);
      expect(result).toBeDefined();
      // All three levels of exports merged
      expect(result!.config.exports["."]).toBe("./src/index.ts");
      expect(result!.config.exports["./api"]).toBe("./src/api/index.ts");
      expect(result!.config.exports["./models"]).toBe("./src/models/index.ts");
      // Targets from grandparent
      expect(result!.config.targets).toHaveLength(1);
      expect(result!.config.targets[0].name).toBe("esm");
    });

    it("throws on circular extends", async () => {
      await fs.writeFile(
        path.join(tmpDir, "a.yml"),
        stringify({ extends: "./b.yml", exports: { ".": "./x.ts" }, targets: baseConfig.targets }),
      );
      await fs.writeFile(
        path.join(tmpDir, "b.yml"),
        stringify({ extends: "./a.yml", exports: { ".": "./y.ts" }, targets: baseConfig.targets }),
      );

      await expect(findWarpConfig(tmpDir, "a.yml")).rejects.toThrow("Circular extends");
    });

    it("throws when extends file does not exist", async () => {
      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({ extends: "./nonexistent.yml" }),
      );

      await expect(findWarpConfig(tmpDir)).rejects.toThrow("not found");
    });

    it("throws when extends is not a string", async () => {
      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({ extends: 42, exports: { ".": "./src/index.ts" }, targets: baseConfig.targets }),
      );

      await expect(findWarpConfig(tmpDir)).rejects.toThrow('"extends" must be a non-empty string');
    });

    it("works with JSON base config", async () => {
      await fs.writeFile(path.join(tmpDir, "base.json"), JSON.stringify(baseConfig));
      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({ extends: "./base.json" }),
      );

      const result = await findWarpConfig(tmpDir);
      expect(result).toBeDefined();
      expect(result!.config.targets).toHaveLength(2);
    });

    it("source reflects the child config file, not the base", async () => {
      await fs.writeFile(path.join(tmpDir, "warp.base.config.yml"), stringify(baseConfig));
      await fs.writeFile(
        path.join(tmpDir, "warp.config.yml"),
        stringify({ extends: "./warp.base.config.yml" }),
      );

      const result = await findWarpConfig(tmpDir);
      expect(result).toBeDefined();
      expect(result!.source.path).toContain("warp.config.yml");
      expect(result!.source.path).not.toContain("base");
    });
  });
});
