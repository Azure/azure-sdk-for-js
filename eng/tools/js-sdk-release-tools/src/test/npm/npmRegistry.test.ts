import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import * as fetch from "npm-registry-fetch";
import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { configureNpmFromRepo, tryGetNpmView } from "../../common/npmUtils.js";

vi.mock("npm-registry-fetch", () => ({
  json: vi.fn().mockResolvedValue({ name: "test-package" }),
}));

describe("npm registry", () => {
  let originalRegistry: string | undefined;
  let originalUserConfig: string | undefined;

  beforeAll(() => {
    originalRegistry = process.env.npm_config_registry;
    originalUserConfig = process.env.npm_config_userconfig;
  });

  afterEach(() => {
    delete process.env.npm_config_registry;
    if (originalUserConfig) {
      process.env.npm_config_userconfig = originalUserConfig;
    } else {
      delete process.env.npm_config_userconfig;
    }
    vi.clearAllMocks();
  });

  afterAll(() => {
    if (originalRegistry) {
      process.env.npm_config_registry = originalRegistry;
    }
    if (originalUserConfig) {
      process.env.npm_config_userconfig = originalUserConfig;
    }
  });

  test("loads configuration from the repository root", () => {
    const repoPath = mkdtempSync(join(tmpdir(), "release-tools-npm-"));
    const npmConfigPath = join(repoPath, ".npmrc");
    const userConfig = process.env.npm_config_userconfig;
    writeFileSync(npmConfigPath, "registry=https://example.test/repository/npm/\n");

    try {
      configureNpmFromRepo(repoPath);

      expect(process.env.npm_config_userconfig).toBe(userConfig);
      expect(process.env.npm_config_registry).toBe("https://example.test/repository/npm/");
    } finally {
      rmSync(repoPath, { recursive: true, force: true });
    }
  });

  test("uses the registry from npm configuration", async () => {
    process.env.npm_config_registry = "https://example.test/npm/registry/";

    await tryGetNpmView("test-package");

    expect(fetch.json).toHaveBeenCalledWith("/test-package", {
      registry: "https://example.test/npm/registry/",
    });
  });

  test("uses the default registry when npm configuration is unavailable", async () => {
    await tryGetNpmView("test-package");

    expect(fetch.json).toHaveBeenCalledWith("/test-package", undefined);
  });
});
