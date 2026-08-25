import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import path from "path";
import fs from "fs";
import { mkdir, writeFile, rm } from "fs/promises";

const realMkdirSync = fs.mkdirSync;

describe("generateChangelogAndBumpVersion beta version test", () => {
  let tempTestDir: string;
  let packageDir: string;
  let mockMakeChangesForReleasingTrack2: any;
  let mockTryReadNpmPackageChangelog: any;

  beforeEach(async () => {
    // Create a unique temporary directory for each test
    tempTestDir = path.join(
      __dirname,
      `tmp/generate-changelog-test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    );
    packageDir = path.join(tempTestDir, "arm-testservice");

    await mkdir(packageDir, { recursive: true });
    await mkdir(path.join(packageDir, "review"), { recursive: true });

    // Mock function for changelog generation
    mockMakeChangesForReleasingTrack2 = vi.fn().mockResolvedValue(undefined);
    vi.doMock("../../common/changelog/modifyChangelogFileAndBumpVersion.js", () => ({
      makeChangesForFirstRelease: vi.fn().mockResolvedValue(undefined),
      makeChangesForMigrateTrack1ToTrack2: vi.fn().mockResolvedValue(undefined),
      makeChangesForPatchReleasingTrack2: vi.fn().mockResolvedValue(undefined),
      makeChangesForReleasingTrack2: mockMakeChangesForReleasingTrack2,
    }));

    // Mock child_process and shell utilities
    vi.doMock("child_process", () => ({
      execSync: vi.fn((cmd) => {
        return "";
      }),
    }));

    vi.doMock("shelljs", () => ({
      default: {
        pwd: () => tempTestDir,
      },
    }));

    vi.doMock("../../xlc/apiVersion/apiVersionTypeExtractor.js", () => ({
      getApiVersionType: vi.fn().mockResolvedValue("Preview"),
    }));

    vi.doMock("../../changelog/v2/DifferenceDetector.js", () => ({
      DifferenceDetector: vi.fn().mockImplementation(function () {
        return {
          detect: vi.fn().mockResolvedValue({
            hasBreakingChange: false,
            hasFeature: true,
          }),
          getDetectContext: vi.fn().mockReturnValue({}),
        };
      }),
    }));

    vi.doMock("../../utils/version.js", async () => {
      const actual = (await vi.importActual("../../utils/version.js")) as any;
      return {
        ...actual,
        getLatestStableVersion: vi.fn((npmViewResult) => {
          return npmViewResult && npmViewResult["dist-tags"]
            ? npmViewResult["dist-tags"]["latest"]
            : "1.2.0";
        }),
        getversionDate: vi.fn((npmViewResult, version) => {
          return npmViewResult && npmViewResult["time"]
            ? npmViewResult["time"][version]
            : undefined;
        }),
      };
    });

    vi.doMock("../../common/utils.js", async () => {
      const actual = (await vi.importActual("../../common/utils.js")) as any;
      mockTryReadNpmPackageChangelog = vi.fn((changelogPath, npmViewParams) => {
        if (npmViewParams) {
          if (npmViewParams.version === "2.0.0-beta.1") {
            return "# Release History\n\n## 2.0.0-beta.1 (2023-04-01)\n\n### Features\n\n- Beta feature from npm package";
          } else if (npmViewParams.version === "2.0.0-beta.2") {
            return "# Release History\n\n## 2.0.0-beta.2 (2023-05-01)\n\n### Features\n\n- More recent beta feature";
          } else if (npmViewParams.version === "2.0.0-next.1") {
            return "# Release History\n\n## 2.0.0-next.1 (2023-04-01)\n\n### Features\n\n- Next feature from npm";
          } else if (npmViewParams.version === "2.0.0-next.2") {
            return "# Release History\n\n## 2.0.0-next.2 (2023-05-01)\n\n### Features\n\n- More recent next feature";
          } else if (npmViewParams.version === "1.2.0") {
            return "# Release History\n\n## 1.2.0 (2023-03-01)\n\n### Features\n\n- Latest stable feature";
          }
        }
        return "# Release History\n\n## 1.2.0 (2023-03-01)\n\n### Features\n\n- Default previous feature";
      });
      return {
        ...actual,
        getNpmPackageName: vi.fn(() => "@azure/arm-testservice"),
        getSDKType: vi.fn(() => "mgmt"),
        fixChangelogFormat: vi.fn((content) => content),
        tryReadNpmPackageChangelog: mockTryReadNpmPackageChangelog,
        extractNpmPackage: vi.fn(),
        extractNextVersionPackage: vi.fn((packageFolderPath, packageName, nextVersion) => {
          const nextDir = path.join(packageFolderPath, "changelog-temp", "next", "package");
          try {
            realMkdirSync(path.join(packageFolderPath, "changelog-temp", "next"), {
              recursive: true,
            });
            realMkdirSync(nextDir, { recursive: true });
            realMkdirSync(path.join(nextDir, "review"), { recursive: true });

            const nextPackageJson = {
              name: packageName,
              version: nextVersion,
              "sdk-type": "mgmt",
            };
            fs.writeFileSync(
              path.join(nextDir, "package.json"),
              JSON.stringify(nextPackageJson, null, 2),
            );

            const changelogContent = `# Release History\n\n## ${nextVersion} (2023-05-01)\n\n### Features\n\n- Next version feature`;
            fs.writeFileSync(path.join(nextDir, "CHANGELOG.md"), changelogContent);

            const apiContent = `// Next version API content\nexport interface TestServiceClient {\n    nextVersionOperation(): Promise<string>;\n}`;
            fs.writeFileSync(
              path.join(nextDir, "review", `${path.basename(packageFolderPath)}-node.api.md`),
              apiContent,
            );
          } catch (error) {
            console.error(`Failed to create next version package structure:`, error);
          }
        }),
        cleanupResources: vi.fn(),
        getApiReviewPath: vi.fn((packageRoot) => {
          const packageName = path.basename(packageRoot);
          return path.join(packageRoot, "review", `${packageName}-node.api.md`);
        }),
      };
    });

    fs.mkdirSync = vi.fn((path, options) => {
      return undefined;
    });
  });

  afterEach(async () => {
    try {
      if (fs.existsSync(tempTestDir)) {
        await rm(tempTestDir, { recursive: true, force: true });
      }
    } catch (error) {
      console.warn("Failed to clean up temp directory:", error);
    }
    fs.mkdirSync = realMkdirSync;
    vi.clearAllMocks();
    vi.resetModules();
  });

  test("should handle case when beta tag is more recent than next tag", async () => {
    const npmViewWithRecentBeta = {
      versions: ["1.0.0", "1.1.0", "1.2.0", "2.0.0-next.1", "2.0.0-beta.2"],
      "dist-tags": {
        latest: "1.2.0",
        next: "2.0.0-next.1",
        beta: "2.0.0-beta.2",
      },
      time: {
        "1.0.0": "2023-01-01T00:00:00.000Z",
        "1.1.0": "2023-02-01T00:00:00.000Z",
        "1.2.0": "2023-03-01T00:00:00.000Z",
        "2.0.0-next.1": "2023-04-01T00:00:00.000Z",
        "2.0.0-beta.2": "2023-05-01T00:00:00.000Z",
      },
    };

    const packageJson = {
      name: "@azure/arm-testservice",
      version: "2.0.0-beta.2",
      "sdk-type": "mgmt",
    };

    await writeFile(path.join(packageDir, "package.json"), JSON.stringify(packageJson, null, 2));

    // Create basic API file
    await writeFile(
      path.join(packageDir, "review", "arm-testservice-node.api.md"),
      `// Beta API content\nexport interface TestServiceClient {\n    betaOperation(): Promise<string>;\n}`,
    );

    vi.doMock("../../common/npmUtils.js", () => ({
      tryGetNpmView: vi.fn().mockResolvedValue(npmViewWithRecentBeta),
      tryCreateLastestStableNpmViewFromGithub: vi.fn().mockResolvedValue(undefined),
    }));

    vi.doMock("../../changelog/v2/ChangelogGenerator.js", () => ({
      ChangelogGenerator: vi.fn().mockImplementation(function () {
        return {
          generate: vi.fn().mockReturnValue({
            hasBreakingChange: false,
            hasFeature: true,
            content: "## 2.0.0 (2023-05-01)\n\n### Features\n\n- Added new feature",
          }),
        };
      }),
    }));

    const changelogTempDir = path.join(packageDir, "changelog-temp", "package");
    await mkdir(changelogTempDir, { recursive: true });
    await mkdir(path.join(changelogTempDir, "review"), { recursive: true });

    const npmPackageJson = {
      name: "@azure/arm-testservice",
      version: "2.0.0-beta.1",
      "sdk-type": "mgmt",
    };
    await writeFile(
      path.join(changelogTempDir, "package.json"),
      JSON.stringify(npmPackageJson, null, 2),
    );

    await writeFile(
      path.join(changelogTempDir, "review", "arm-testservice-node.api.md"),
      `// Old Beta API content\nexport interface TestServiceClient {\n    oldBetaOperation(): Promise<string>;\n}`,
    );

    vi.resetModules();
    const { generateChangelogAndBumpVersion } =
      await import("../../common/changelog/automaticGenerateChangeLogAndBumpVersion.js");

    const changelog = await generateChangelogAndBumpVersion("arm-testservice", {
      apiVersion: "2023-05-01-preview",
      sdkReleaseType: "beta",
    });

    expect(mockMakeChangesForReleasingTrack2).toHaveBeenCalled();

    expect(mockTryReadNpmPackageChangelog).toHaveBeenCalled();
    const calls = mockTryReadNpmPackageChangelog.mock.calls;
    const callsWithVersion = calls.filter((call) => call[1] && call[1].version);
    if (callsWithVersion.length > 0) {
      const lastCallWithVersion = callsWithVersion[callsWithVersion.length - 1];
      expect(lastCallWithVersion[1].version).toBe("2.0.0-beta.2");
    }

    if (changelog) {
      expect(changelog.content).toContain("## 2.0.0 (2023-05-01)");
      expect(changelog.content).toContain("### Features");
      expect(changelog.content).toContain("- Added new feature");
    }
  });

  test("should handle case when next tag is more recent than beta tag", async () => {
    const npmViewWithRecentNext = {
      versions: ["1.0.0", "1.1.0", "1.2.0", "2.0.0-beta.1", "2.0.0-next.2"],
      "dist-tags": {
        latest: "1.2.0",
        next: "2.0.0-next.2",
        beta: "2.0.0-beta.1",
      },
      time: {
        "1.0.0": "2023-01-01T00:00:00.000Z",
        "1.1.0": "2023-02-01T00:00:00.000Z",
        "1.2.0": "2023-03-01T00:00:00.000Z",
        "2.0.0-beta.1": "2023-04-01T00:00:00.000Z",
        "2.0.0-next.2": "2023-05-01T00:00:00.000Z",
      },
    };

    const packageJson = {
      name: "@azure/arm-testservice",
      version: "2.0.0-next.2",
      "sdk-type": "mgmt",
    };

    await writeFile(path.join(packageDir, "package.json"), JSON.stringify(packageJson, null, 2));

    await writeFile(
      path.join(packageDir, "review", "arm-testservice-node.api.md"),
      `// Next API content\nexport interface TestServiceClient {\n    nextOperation(): Promise<string>;\n}`,
    );

    vi.doMock("../../common/npmUtils.js", () => ({
      tryGetNpmView: vi.fn().mockResolvedValue(npmViewWithRecentNext),
      tryCreateLastestStableNpmViewFromGithub: vi.fn().mockResolvedValue(undefined),
    }));

    vi.doMock("../../changelog/v2/ChangelogGenerator.js", () => ({
      ChangelogGenerator: vi.fn().mockImplementation(function () {
        return {
          generate: vi.fn().mockReturnValue({
            hasBreakingChange: false,
            hasFeature: true,
            content: "## 2.0.0 (2023-05-01)\n\n### Features\n\n- Added new feature",
          }),
        };
      }),
    }));

    const changelogTempDir = path.join(packageDir, "changelog-temp", "package");
    await mkdir(changelogTempDir, { recursive: true });
    await mkdir(path.join(changelogTempDir, "review"), { recursive: true });

    const npmPackageJson = {
      name: "@azure/arm-testservice",
      version: "2.0.0-beta.1",
      "sdk-type": "mgmt",
    };
    await writeFile(
      path.join(changelogTempDir, "package.json"),
      JSON.stringify(npmPackageJson, null, 2),
    );

    await writeFile(
      path.join(changelogTempDir, "review", "arm-testservice-node.api.md"),
      `// Old Beta API content\nexport interface TestServiceClient {\n    oldBetaOperation(): Promise<string>;\n}`,
    );

    vi.resetModules();
    const { generateChangelogAndBumpVersion } =
      await import("../../common/changelog/automaticGenerateChangeLogAndBumpVersion.js");

    const changelog = await generateChangelogAndBumpVersion("arm-testservice", {
      apiVersion: "2023-05-01-preview",
      sdkReleaseType: "beta",
    });

    expect(mockMakeChangesForReleasingTrack2).toHaveBeenCalled();

    expect(mockTryReadNpmPackageChangelog).toHaveBeenCalled();
    const calls = mockTryReadNpmPackageChangelog.mock.calls;
    const callsWithVersion = calls.filter((call) => call[1] && call[1].version);
    if (callsWithVersion.length > 0) {
      const lastCallWithVersion = callsWithVersion[callsWithVersion.length - 1];
      expect(lastCallWithVersion[1].version).toBe("2.0.0-next.2");
    }

    if (changelog) {
      expect(changelog.content).toContain("## 2.0.0 (2023-05-01)");
      expect(changelog.content).toContain("### Features");
      expect(changelog.content).toContain("- Added new feature");
    }
  });

  test("should handle case when only beta tag exists", async () => {
    const npmViewWithOnlyBeta = {
      versions: ["1.0.0", "1.1.0", "1.2.0", "2.0.0-beta.1"],
      "dist-tags": {
        latest: "1.2.0",
        beta: "2.0.0-beta.1",
      },
      time: {
        "1.0.0": "2023-01-01T00:00:00.000Z",
        "1.1.0": "2023-02-01T00:00:00.000Z",
        "1.2.0": "2023-03-01T00:00:00.000Z",
        "2.0.0-beta.1": "2023-04-01T00:00:00.000Z",
      },
    };

    const packageJson = {
      name: "@azure/arm-testservice",
      version: "2.0.0-beta.1",
      "sdk-type": "mgmt",
    };

    await writeFile(path.join(packageDir, "package.json"), JSON.stringify(packageJson, null, 2));

    await writeFile(
      path.join(packageDir, "review", "arm-testservice-node.api.md"),
      `// Beta API content\nexport interface TestServiceClient {\n    betaOperation(): Promise<string>;\n}`,
    );

    vi.doMock("../../common/npmUtils.js", () => ({
      tryGetNpmView: vi.fn().mockResolvedValue(npmViewWithOnlyBeta),
      tryCreateLastestStableNpmViewFromGithub: vi.fn().mockResolvedValue(undefined),
    }));

    vi.doMock("../../changelog/v2/ChangelogGenerator.js", () => ({
      ChangelogGenerator: vi.fn().mockImplementation(function () {
        return {
          generate: vi.fn().mockReturnValue({
            hasBreakingChange: false,
            hasFeature: true,
            content: "## 2.0.0 (2023-04-01)\n\n### Features\n\n- Added beta feature",
          }),
        };
      }),
    }));

    const changelogTempDir = path.join(packageDir, "changelog-temp", "package");
    await mkdir(changelogTempDir, { recursive: true });
    await mkdir(path.join(changelogTempDir, "review"), { recursive: true });

    const npmPackageJson = {
      name: "@azure/arm-testservice",
      version: "2.0.0-beta.1",
      "sdk-type": "mgmt",
    };
    await writeFile(
      path.join(changelogTempDir, "package.json"),
      JSON.stringify(npmPackageJson, null, 2),
    );

    await writeFile(
      path.join(changelogTempDir, "review", "arm-testservice-node.api.md"),
      `// Old Beta API content\nexport interface TestServiceClient {\n    oldBetaOperation(): Promise<string>;\n}`,
    );

    vi.resetModules();
    const { generateChangelogAndBumpVersion } =
      await import("../../common/changelog/automaticGenerateChangeLogAndBumpVersion.js");

    const changelog = await generateChangelogAndBumpVersion("arm-testservice", {
      apiVersion: undefined,
      sdkReleaseType: undefined,
    });

    expect(mockMakeChangesForReleasingTrack2).toHaveBeenCalled();

    expect(mockTryReadNpmPackageChangelog).toHaveBeenCalled();
    const calls = mockTryReadNpmPackageChangelog.mock.calls;
    const callsWithVersion = calls.filter((call) => call[1] && call[1].version);
    if (callsWithVersion.length > 0) {
      const lastCallWithVersion = callsWithVersion[callsWithVersion.length - 1];
      expect(lastCallWithVersion[1].version).toBe("2.0.0-beta.1");
    }

    if (changelog) {
      expect(changelog.content).toBeTruthy();
      expect(changelog.hasFeature).toBe(true);
      expect(changelog.hasBreakingChange).toBe(false);
    }
  });

  test("report-only mode returns changes without modifying CHANGELOG.md or bumping version", async () => {
    const npmViewWithStable = {
      versions: ["1.0.0", "1.1.0", "1.2.0"],
      "dist-tags": {
        latest: "1.2.0",
      },
      time: {
        "1.0.0": "2023-01-01T00:00:00.000Z",
        "1.1.0": "2023-02-01T00:00:00.000Z",
        "1.2.0": "2023-03-01T00:00:00.000Z",
      },
    };

    const packageJson = {
      name: "@azure/arm-testservice",
      version: "2.0.0",
      "sdk-type": "mgmt",
    };

    await writeFile(path.join(packageDir, "package.json"), JSON.stringify(packageJson, null, 2));

    await writeFile(
      path.join(packageDir, "review", "arm-testservice-node.api.md"),
      `// New API content\nexport interface TestServiceClient {\n    newOperation(): Promise<string>;\n}`,
    );

    vi.doMock("../../common/npmUtils.js", () => ({
      tryGetNpmView: vi.fn().mockResolvedValue(npmViewWithStable),
      tryCreateLastestStableNpmViewFromGithub: vi.fn().mockResolvedValue(undefined),
    }));

    vi.doMock("../../changelog/v2/ChangelogGenerator.js", () => ({
      ChangelogGenerator: vi.fn().mockImplementation(function () {
        return {
          generate: vi.fn().mockReturnValue({
            hasBreakingChange: true,
            hasFeature: true,
            content:
              "### Features Added\n\n  - Added operation\n\n### Breaking Changes\n\n  - Removed operation group",
          }),
        };
      }),
    }));

    const changelogTempDir = path.join(packageDir, "changelog-temp", "package");
    await mkdir(changelogTempDir, { recursive: true });
    await mkdir(path.join(changelogTempDir, "review"), { recursive: true });

    const npmPackageJson = {
      name: "@azure/arm-testservice",
      version: "1.2.0",
      "sdk-type": "mgmt",
    };
    await writeFile(
      path.join(changelogTempDir, "package.json"),
      JSON.stringify(npmPackageJson, null, 2),
    );

    await writeFile(
      path.join(changelogTempDir, "review", "arm-testservice-node.api.md"),
      `// Old API content\nexport interface TestServiceClient {\n    oldOperation(): Promise<string>;\n}`,
    );

    vi.resetModules();
    const { generateChangelogAndBumpVersion, UpdateMode } =
      await import("../../common/changelog/automaticGenerateChangeLogAndBumpVersion.js");

    const changelog = await generateChangelogAndBumpVersion(
      "arm-testservice",
      { apiVersion: undefined, sdkReleaseType: undefined },
      UpdateMode.ChangelogOnly,
      undefined,
      true,
    );

    // Report-only mode must not write CHANGELOG.md or compute a new version.
    expect(mockMakeChangesForReleasingTrack2).not.toHaveBeenCalled();

    expect(changelog).toBeDefined();
    expect(changelog!.hasBreakingChange).toBe(true);
    expect(changelog!.content).toContain("### Breaking Changes");
    expect(changelog!.content).toContain("### Features Added");
  });
});
