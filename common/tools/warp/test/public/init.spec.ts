// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { init, findWarpConfig } from "../../src/index.ts";

async function createTmpDir(): Promise<string> {
  return await fs.mkdtemp(path.join(os.tmpdir(), "warp-init-"));
}

describe("init", () => {
  it("scaffolds explicit ./package.json export", async () => {
    const tmpDir = await createTmpDir();

    try {
      await fs.mkdir(path.join(tmpDir, "src"), { recursive: true });
      await fs.writeFile(path.join(tmpDir, "src", "index.ts"), "export const x = 1;\n");

      await init({ cwd: tmpDir });

      const configPath = path.join(tmpDir, "warp.config.yml");
      const configText = await fs.readFile(configPath, "utf-8");
      expect(configText).toContain('"./package.json": "./package.json"');

      const resolved = await findWarpConfig(tmpDir);
      expect(resolved).toBeDefined();
      expect(resolved!.config.exports["./package.json"]).toBe("./package.json");
      expect(resolved!.config.exports["."]).toBe("./src/index.ts");
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  });
});
