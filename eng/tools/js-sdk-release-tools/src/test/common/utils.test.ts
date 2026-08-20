import { describe, expect, test, beforeEach, afterEach } from "vitest";
import {
  resolveOptions,
  specifyApiVersionToGenerateSDKByTypeSpec,
  cleanUpPackageDirectory,
  getPackageNameFromTspConfig,
  getApiReviewPath,
} from "../../common/utils.js";
import path from "path";
import { deepStrictEqual, strictEqual } from "assert";
import * as fs from "fs";
import { isStableSDKReleaseType } from "../../utils/version.js";
import { getRandomInt } from "../utils/utils.js";
import { ensureDir, remove, writeFile, pathExists } from "fs-extra";
import { stringify } from "yaml";
import { RunMode } from "../../common/types.js";
import { mkdir, readdir } from "fs/promises";

describe("resolveOptions", () => {
  test("loads config at the given path", async () => {
    const configPath = path.join(__dirname, "config/myConfig.yaml");
    const emitterOutputDir = path.posix.join(__dirname, "/config").replace(/\\/g, "/");
    const options = await resolveOptions(configPath);
    deepStrictEqual(options.options, {
      "@azure-tools/typespec-autorest": {
        "azure-resource-provider-folder": "resource-manager",
        "emitter-output-dir": `${emitterOutputDir}/..`,
        "output-file": "resource-manager/{service-name}/{version-status}/{version}/openapi.json",
      },
      "@azure-tools/typespec-ts": {
        "output-folder": "sdk/informatica/src/generated",
        "package-dir": "op/value",
        "service-dir": "sdk/informatica",
      },
      usingParam: {
        "output-file": "sdk/informaticadatamanagement",
        "output-dir": "params/default/value",
      },
    });
    strictEqual(
      options.configFile.parameters?.["service-dir"]?.default,
      "sdk/informaticadatamanagement",
    );
  });
});

describe("specifiyApiVersionToGenerateSDKByTypeSpec", () => {
  test("Updated API version into tspconfig.yaml", async () => {
    const fakeTspConfig = {
      options: {
        "@azure-tools/typespec-ts": {
          "is-modular-library": true,
        },
      },
    };
    const tempSpecFolder = path.join(__dirname, `tmp/spec-${getRandomInt(10000)}`);
    try {
      await ensureDir(tempSpecFolder);
      await writeFile(path.join(tempSpecFolder, "tspconfig.yaml"), stringify(fakeTspConfig), {
        encoding: "utf8",
        flush: true,
      });
      const expectedVersion = "2023-10-01";
      specifyApiVersionToGenerateSDKByTypeSpec(tempSpecFolder, expectedVersion);
      const data: string = fs.readFileSync(path.join(tempSpecFolder, "tspconfig.yaml"), "utf8");
      expect(data.includes(`api-version: '${expectedVersion}'`)).toBe(true);
    } finally {
      await remove(tempSpecFolder);
    }
  });

  test("tspconfig.yaml does not exist", async () => {
    const tempSpecFolder = path.join(__dirname, `tmp/spec-${getRandomInt(10000)}`);
    try {
      await ensureDir(tempSpecFolder);
      expect(() => specifyApiVersionToGenerateSDKByTypeSpec(tempSpecFolder, "2023-10-01")).toThrow(
        `Failed to find tspconfig.yaml in ${tempSpecFolder}.`,
      );
    } finally {
      await remove(tempSpecFolder);
    }
  });

  test("not found @azure-tools/typespec-ts options in tspconfig.yaml", async () => {
    const fakeTspConfig = {
      options: {
        "@azure-tools/typespec-go": {
          "is-modular-library": true,
        },
      },
    };
    const tempSpecFolder = path.join(__dirname, `tmp/spec-${getRandomInt(10000)}`);
    try {
      await ensureDir(tempSpecFolder);
      await writeFile(path.join(tempSpecFolder, "tspconfig.yaml"), stringify(fakeTspConfig), {
        encoding: "utf8",
        flush: true,
      });
      expect(() => specifyApiVersionToGenerateSDKByTypeSpec(tempSpecFolder, "2023-10-01")).toThrow(
        `Failed to find @azure-tools/typespec-ts options in tspconfig.yaml.`,
      );
    } finally {
      await remove(tempSpecFolder);
    }
  });

  test("Failed to parse tspconfig.yaml", async () => {
    const badYaml = `
            skills:
              - JavaScript
              - Node.js
              - YAML
                - extra-indent-error
        `;
    const tempSpecFolder = path.join(__dirname, `tmp/spec-${getRandomInt(10000)}`);
    try {
      await ensureDir(tempSpecFolder);
      await writeFile(path.join(tempSpecFolder, "tspconfig.yaml"), badYaml, {
        encoding: "utf8",
        flush: true,
      });
      expect(() =>
        specifyApiVersionToGenerateSDKByTypeSpec(tempSpecFolder, "2023-10-01"),
      ).toThrowError("Failed to parse tspconfig.yaml");
    } finally {
      await remove(tempSpecFolder);
    }
  });
});

describe("getReleaseStatus", () => {
  test("apiVersion is stable, sdkReleaseType is stable", async () => {
    const result = await isStableSDKReleaseType("Preview", {
      apiVersion: "2023-10-01",
      sdkReleaseType: "stable",
    });
    expect(result).toBe(true);
  });

  test("apiVersion is stable, sdkReleaseType is beta", async () => {
    const result = await isStableSDKReleaseType("Preview", {
      apiVersion: "2023-10-01",
      sdkReleaseType: "beta",
    });
    expect(result).toBe(false);
  });

  test("apiVersion is preview, sdkReleaseType is stable", async () => {
    const result = await isStableSDKReleaseType("Stable", {
      apiVersion: "2023-10-01-preview",
      sdkReleaseType: "stable",
    });
    expect(result).toBe(true);
  });

  test("apiVersion is preview, sdkReleaseType is beta", async () => {
    const result = await isStableSDKReleaseType("Stable", {
      apiVersion: "2023-10-01-preview",
      sdkReleaseType: "beta",
    });
    expect(result).toBe(false);
  });

  test("apiVersion not be provided", async () => {
    const result = await isStableSDKReleaseType("Preview", {
      apiVersion: "",
      sdkReleaseType: "stable",
    });
    expect(result).toBe(true);
  });
});

describe("cleanUpPackageDirectory", () => {
  // Test the cleanup behavior based on package type and run mode:
  // - RestLevelClient (@azure-rest/*):
  //   * Release/Local mode: Cleanup is skipped (handled by emitter)
  //   * SpecPullRequest/Batch modes: All files are cleaned up
  // - Data Plane (non-arm, non-rest):
  //   * Release/Local mode: Cleanup is skipped (handled by emitter)
  //   * SpecPullRequest/Batch modes: All files are cleaned up
  // - Management Plane (arm-*) HighLevelClient:
  //   * Release/Local mode: Preserves test and assets.json, cleans up everything else including src
  //   * SpecPullRequest/Batch modes: All files are cleaned up
  // - Management Plane (arm-*) Non-HighLevelClient:
  //   * All modes: Cleanup is skipped (handled by emitter)

  async function createTestDirectoryStructure(
    baseDir: string,
    packageType: "management" | "dataplane" | "restlevel" = "management",
    isHighLevelClient: boolean = false,
  ): Promise<string> {
    // Create different directory names based on package type to trigger correct logic
    // Management packages must contain 'arm-' in the path to be detected as ManagementPlane
    // RestLevelClient packages must have @azure-rest/ prefix
    let packageName: string;
    let dirName: string;

    if (packageType === "management") {
      packageName = `@azure/arm-test-${getRandomInt(10000)}`;
      dirName = `tmp/arm-package-${getRandomInt(10000)}`;
    } else if (packageType === "restlevel") {
      packageName = `@azure-rest/test-${getRandomInt(10000)}`;
      dirName = `tmp/rest-package-${getRandomInt(10000)}`;
    } else {
      packageName = `@azure/test-${getRandomInt(10000)}`;
      dirName = `tmp/package-${getRandomInt(10000)}`;
    }

    const tempPackageDir = path.join(baseDir, dirName);

    // Create main directories
    await ensureDir(tempPackageDir);
    await ensureDir(path.join(tempPackageDir, "dist"));

    // Create src directory with subfolders and files
    await ensureDir(path.join(tempPackageDir, "src"));
    await ensureDir(path.join(tempPackageDir, "src", "common"));
    await ensureDir(path.join(tempPackageDir, "src", "utils"));
    await writeFile(
      path.join(tempPackageDir, "src", "index.ts"),
      "export * from './common';\nexport * from './utils';",
      "utf8",
    );
    await writeFile(
      path.join(tempPackageDir, "src", "common", "index.ts"),
      "// Common module exports",
      "utf8",
    );
    await writeFile(
      path.join(tempPackageDir, "src", "utils", "helpers.ts"),
      "// Helper functions",
      "utf8",
    );

    // For HighLevelClient packages, create parameters.ts to identify them
    if (isHighLevelClient) {
      await ensureDir(path.join(tempPackageDir, "src", "models"));
      await writeFile(
        path.join(tempPackageDir, "src", "models", "parameters.ts"),
        "// parameters file",
        "utf8",
      );
    }

    // Create test directory with subfolders and files
    await ensureDir(path.join(tempPackageDir, "test"));
    await ensureDir(path.join(tempPackageDir, "test", "common"));
    await ensureDir(path.join(tempPackageDir, "test", "utils"));
    await writeFile(
      path.join(tempPackageDir, "test", "index.test.ts"),
      "import { describe, test } from 'vitest';\n\ndescribe('index', () => {\n  test('exports', () => {});\n});",
      "utf8",
    );
    await writeFile(
      path.join(tempPackageDir, "test", "common", "utils.test.ts"),
      "// Common utils tests",
      "utf8",
    );

    // Create root files with proper package.json including name
    await writeFile(path.join(tempPackageDir, "assets.json"), "{}", "utf8");
    await writeFile(
      path.join(tempPackageDir, "package.json"),
      JSON.stringify({ name: packageName, version: "1.0.0" }),
      "utf8",
    );

    return tempPackageDir;
  }

  test("skips cleanup for RestLevelClient in Release mode (handled by emitter)", async () => {
    // Create a RestLevelClient package (@azure-rest/*) to test that cleanup is skipped
    const tempPackageDir = await createTestDirectoryStructure(__dirname, "restlevel");

    try {
      // Run the function with Release mode
      await cleanUpPackageDirectory(tempPackageDir, RunMode.Release);

      // Verify that cleanup was skipped - all files should still exist
      const testDirExists = await pathExists(path.join(tempPackageDir, "test"));
      const srcDirExists = await pathExists(path.join(tempPackageDir, "src"));
      const distDirExists = await pathExists(path.join(tempPackageDir, "dist"));
      const packageJsonExists = await pathExists(path.join(tempPackageDir, "package.json"));
      const assetsFileExists = await pathExists(path.join(tempPackageDir, "assets.json"));

      // Assert all files/directories are preserved
      expect(testDirExists).toBe(true);
      expect(srcDirExists).toBe(true);
      expect(distDirExists).toBe(true);
      expect(packageJsonExists).toBe(true);
      expect(assetsFileExists).toBe(true);
    } finally {
      await remove(tempPackageDir);
    }
  });

  test("skips cleanup for DataPlane in Release mode (handled by emitter)", async () => {
    // Create a data plane package (non-arm, non-rest) to test that cleanup is skipped
    const tempPackageDir = await createTestDirectoryStructure(__dirname, "dataplane");

    try {
      // Run the function with Release mode
      await cleanUpPackageDirectory(tempPackageDir, RunMode.Release);

      // Verify that cleanup was skipped - all files should still exist
      const testDirExists = await pathExists(path.join(tempPackageDir, "test"));
      const testCommonDirExists = await pathExists(path.join(tempPackageDir, "test", "common"));
      const testUtilsDirExists = await pathExists(path.join(tempPackageDir, "test", "utils"));
      const testIndexFileExists = await pathExists(
        path.join(tempPackageDir, "test", "index.test.ts"),
      );
      const testUtilsFileExists = await pathExists(
        path.join(tempPackageDir, "test", "common", "utils.test.ts"),
      );
      const assetsFileExists = await pathExists(path.join(tempPackageDir, "assets.json"));
      const srcDirExists = await pathExists(path.join(tempPackageDir, "src"));
      const distDirExists = await pathExists(path.join(tempPackageDir, "dist"));
      const packageJsonExists = await pathExists(path.join(tempPackageDir, "package.json"));

      // Assert all files/directories are preserved
      expect(testDirExists).toBe(true);
      expect(testCommonDirExists).toBe(true);
      expect(testUtilsDirExists).toBe(true);
      expect(testIndexFileExists).toBe(true);
      expect(testUtilsFileExists).toBe(true);
      expect(assetsFileExists).toBe(true);
      expect(srcDirExists).toBe(true);
      expect(distDirExists).toBe(true);
      expect(packageJsonExists).toBe(true);
    } finally {
      await remove(tempPackageDir);
    }
  });

  test("removes all files and directories for RestLevelClient in SpecPullRequest and Batch mode", async () => {
    // Test both SpecPullRequest and Batch modes that have the same behavior
    const runModes = [RunMode.SpecPullRequest, RunMode.Batch];

    for (const runMode of runModes) {
      const tempPackageDir = await createTestDirectoryStructure(__dirname, "restlevel");

      try {
        // Run the function
        await cleanUpPackageDirectory(tempPackageDir, runMode);

        // Verify all files and directories are removed
        const finalEntries = await readdir(tempPackageDir);
        expect(finalEntries.length).toBe(0);
      } finally {
        await remove(tempPackageDir);
      }
    }
  });

  test("removes all files and directories for DataPlane in SpecPullRequest and Batch mode", async () => {
    // Test both SpecPullRequest and Batch modes that have the same behavior
    const runModes = [RunMode.SpecPullRequest, RunMode.Batch];

    for (const runMode of runModes) {
      const tempPackageDir = await createTestDirectoryStructure(__dirname, "dataplane");

      try {
        // Run the function
        await cleanUpPackageDirectory(tempPackageDir, runMode);

        // Verify all files and directories are removed
        const finalEntries = await readdir(tempPackageDir);
        expect(finalEntries.length).toBe(0);
      } finally {
        await remove(tempPackageDir);
      }
    }
  });

  test("skips cleanup for Management Plane non-HighLevelClient packages in all run modes", async () => {
    const tempPackageDir = await createTestDirectoryStructure(__dirname, "management", false);

    try {
      // Test one mode as all modes have the same behavior for non-HighLevelClient Management Plane
      await cleanUpPackageDirectory(tempPackageDir, RunMode.Release);

      // Verify that cleanup was skipped - all files should still exist
      const srcDirExists = await pathExists(path.join(tempPackageDir, "src"));
      const packageJsonExists = await pathExists(path.join(tempPackageDir, "package.json"));
      const testDirExists = await pathExists(path.join(tempPackageDir, "test"));

      expect(srcDirExists).toBe(true);
      expect(packageJsonExists).toBe(true);
      expect(testDirExists).toBe(true);
    } finally {
      await remove(tempPackageDir);
    }
  });

  test("preserves test and assets.json for Management Plane HighLevelClient in Release/Local mode", async () => {
    const tempPackageDir = await createTestDirectoryStructure(__dirname, "management", true);

    try {
      // Run the function with Release mode
      await cleanUpPackageDirectory(tempPackageDir, RunMode.Release);

      // Verify that only test and assets.json are preserved, others are removed
      const srcDirExists = await pathExists(path.join(tempPackageDir, "src"));
      const packageJsonExists = await pathExists(path.join(tempPackageDir, "package.json"));
      const testDirExists = await pathExists(path.join(tempPackageDir, "test"));
      const assetsFileExists = await pathExists(path.join(tempPackageDir, "assets.json"));
      const distDirExists = await pathExists(path.join(tempPackageDir, "dist"));

      expect(srcDirExists).toBe(false);
      expect(packageJsonExists).toBe(false);
      expect(distDirExists).toBe(false);
      expect(testDirExists).toBe(true);
      expect(assetsFileExists).toBe(true);
    } finally {
      await remove(tempPackageDir);
    }
  });

  test("removes all files for Management Plane HighLevelClient in SpecPullRequest and Batch mode", async () => {
    // Test both SpecPullRequest and Batch modes that have the same behavior
    const runModes = [RunMode.SpecPullRequest, RunMode.Batch];

    for (const runMode of runModes) {
      const tempPackageDir = await createTestDirectoryStructure(__dirname, "management", true);

      try {
        // Run the function
        await cleanUpPackageDirectory(tempPackageDir, runMode);

        // Verify all files and directories are removed
        const finalEntries = await readdir(tempPackageDir);
        expect(finalEntries.length).toBe(0);
      } finally {
        await remove(tempPackageDir);
      }
    }
  });
});

describe("getPackageNameFromTspConfig", () => {
  // Store the original function for spying
  const originalResolveOptions = resolveOptions;

  // Create an interception wrapper
  let mockConfigForTest;
  const interceptResolveOptions = async (dir) => {
    return mockConfigForTest;
  };

  beforeEach(() => {
    // Replace original function with our interceptor
    global.resolveOptions = interceptResolveOptions;
  });

  afterEach(() => {
    // Restore original function
    global.resolveOptions = originalResolveOptions;
    mockConfigForTest = undefined;
  });

  // Test utilities
  async function setupTempDirectory() {
    const tempSpecFolder = path.join(__dirname, `tmp/spec-${getRandomInt(10000)}`);
    await ensureDir(tempSpecFolder);
    return tempSpecFolder;
  }

  async function writeTspConfig(tempSpecFolder, config) {
    await writeFile(path.join(tempSpecFolder, "tspconfig.yaml"), stringify(config), {
      encoding: "utf8",
    });
  }

  test("extracts package name from package-details.name when it exists", async () => {
    const tempSpecFolder = await setupTempDirectory();

    try {
      const tspConfig = {
        parameters: {
          "package-dir": {
            default: "sdk/contoso",
          },
        },
        options: {
          "@azure-tools/typespec-ts": {
            "package-dir": "arm-something-else",
            "package-details": {
              name: "@azure/arm-contoso",
            },
          },
        },
      };

      await writeTspConfig(tempSpecFolder, tspConfig);

      // Setup mock result for this test
      mockConfigForTest = {
        options: tspConfig.options,
        configFile: {
          parameters: tspConfig.parameters,
        },
      };

      // Call function and verify result
      const result = await getPackageNameFromTspConfig(tempSpecFolder);
      expect(result).toBe("@azure/arm-contoso");
    } finally {
      await remove(tempSpecFolder);
    }
  });

  test("returns undefined when package-details.name doesn't exist", async () => {
    const tempSpecFolder = await setupTempDirectory();

    try {
      const tspConfig = {
        parameters: {
          "package-dir": {
            default: "arm-contoso",
          },
        },
        options: {
          "@azure-tools/typespec-ts": {
            "package-dir": "arm-contoso",
          },
        },
      };

      await writeTspConfig(tempSpecFolder, tspConfig);

      // Setup mock result for this test
      mockConfigForTest = {
        options: tspConfig.options,
        configFile: {
          parameters: tspConfig.parameters,
        },
      };

      // Call function and verify result
      const result = await getPackageNameFromTspConfig(tempSpecFolder);
      expect(result).toBeUndefined();
    } finally {
      await remove(tempSpecFolder);
    }
  });

  test("returns undefined when options are empty", async () => {
    const tempSpecFolder = await setupTempDirectory();

    try {
      const tspConfig = {
        parameters: {},
        options: {
          "@azure-tools/typespec-ts": {},
        },
      };

      await writeTspConfig(tempSpecFolder, tspConfig);

      // Setup mock result for this test
      mockConfigForTest = {
        options: tspConfig.options,
        configFile: {
          parameters: tspConfig.parameters,
        },
      };

      // Call function and verify result
      const result = await getPackageNameFromTspConfig(tempSpecFolder);
      expect(result).toBeUndefined();
    } finally {
      await remove(tempSpecFolder);
    }
  });
});

describe("getApiReviewPath - File Priority Tests", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = path.join(__dirname, "temp-getApiReviewPath-test-" + Date.now());
    await ensureDir(tempDir);
  });

  afterEach(async () => {
    await remove(tempDir);
  });

  // Helper function to create a basic package structure
  async function createPackage(packageName: string, isHighLevelClient = false) {
    const packageDir = path.join(tempDir, packageName);
    const reviewDir = path.join(packageDir, "review");
    await ensureDir(reviewDir);

    await writeFile(path.join(packageDir, "package.json"), JSON.stringify({ name: packageName }));

    // Create parameters.ts for HighLevelClient identification
    if (isHighLevelClient) {
      await ensureDir(path.join(packageDir, "src", "models"));
      await writeFile(
        path.join(packageDir, "src", "models", "parameters.ts"),
        "// parameters file",
      );
    }

    return { packageDir, reviewDir };
  }

  test("should prioritize -node.api.md when both files exist", async () => {
    const { packageDir, reviewDir } = await createPackage("@azure/test-package", true);

    // Create both API review files
    const standardApiFile = path.join(reviewDir, "test-package.api.md");
    const nodeApiFile = path.join(reviewDir, "test-package-node.api.md");

    await writeFile(standardApiFile, "// Standard API content");
    await writeFile(nodeApiFile, "// Node API content");

    const result = getApiReviewPath(packageDir);

    expect(result).toBe(nodeApiFile);
    expect(result.endsWith("-node.api.md")).toBe(true);
  });

  test("should fallback to standard .api.md when -node.api.md doesn't exist", async () => {
    const { packageDir, reviewDir } = await createPackage("@azure/test-package", true);

    // Create only standard API review file
    const standardApiFile = path.join(reviewDir, "test-package.api.md");
    await writeFile(standardApiFile, "// Standard API content");

    const result = getApiReviewPath(packageDir);

    expect(result).toBe(standardApiFile);
    expect(result.endsWith(".api.md")).toBe(true);
    expect(result.endsWith("-node.api.md")).toBe(false);
  });

  test("should work with different package types (Modular, Rest, HLC)", async () => {
    // Test with ModularClient package (no parameters.ts)
    const { packageDir: modularDir, reviewDir: modularReview } =
      await createPackage("@azure/modular-package");
    const nodeApiFile = path.join(modularReview, "modular-package-node.api.md");
    await writeFile(nodeApiFile, "// Modular Node API content");

    const modularResult = getApiReviewPath(modularDir);
    expect(modularResult).toBe(nodeApiFile);

    // Test with RestLevelClient package
    const { packageDir: restDir, reviewDir: restReview } = await createPackage(
      "@azure-rest/rest-package",
    );
    const standardApiFile = path.join(restReview, "rest-package.api.md");
    await writeFile(standardApiFile, "// Rest API content");

    const restResult = getApiReviewPath(restDir);
    expect(restResult).toBe(standardApiFile);
  });
});
