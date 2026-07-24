import { beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  calls: [] as string[],
  packageResult: {
    artifacts: [] as string[],
    path: [] as string[],
    result: "pending",
  },
}));

vi.mock("../../common/rushUtils.js", () => ({
  buildPackage: vi.fn(async () => mocks.calls.push("build")),
  installDependencies: vi.fn(async () => mocks.calls.push("install")),
  tryBuildSamples: vi.fn(async () => mocks.calls.push("samples")),
  createArtifact: vi.fn(async () => "/sdk/pkg/test.tgz"),
}));

vi.mock("../../common/packageResultUtils.js", () => ({
  initPackageResult: vi.fn(() => mocks.packageResult),
  updateChangelogResult: vi.fn(),
  updateNpmPackageResult: vi.fn(),
}));

vi.mock("../../common/ciYamlUtils.js", () => ({
  createOrUpdateCiYaml: vi.fn(async () => undefined),
}));

vi.mock("../../common/changelog/automaticGenerateChangeLogAndBumpVersion.js", () => ({
  generateChangelogAndBumpVersion: vi.fn(async () => {
    mocks.calls.push("changelog");
    return undefined;
  }),
}));

vi.mock("../../mlc/clientGenerator/utils/typeSpecUtils.js", () => ({
  generateTypeScriptCodeFromTypeSpec: vi.fn(),
}));

vi.mock("../../common/utils.js", () => ({
  getGeneratedPackageDirectory: vi.fn(async () => "/sdk/pkg"),
  specifyApiVersionToGenerateSDKByTypeSpec: vi.fn(),
  cleanUpPackageDirectory: vi.fn(),
}));

vi.mock("../../common/npmUtils.js", () => ({
  getNpmPackageInfo: vi.fn(async () => ({
    name: "@azure/test",
    version: "1.0.0-beta.1",
  })),
}));

vi.mock("../../utils/logger.js", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("fs-extra", () => ({
  exists: vi.fn(async () => false),
}));

vi.mock("../../common/codeOwnersAndIgnoreLink/codeOwnersAndIgnoreLinkGenerator.js", () => ({
  codeOwnersAndIgnoreLinkGenerator: vi.fn(),
}));

vi.mock("../../hlc/utils/changeReadmeMd.js", () => ({
  changeReadmeMd: vi.fn(),
}));

describe("generateAzureSDKPackage", () => {
  beforeEach(() => {
    mocks.calls.length = 0;
    mocks.packageResult.artifacts.length = 0;
    mocks.packageResult.path.length = 0;
    mocks.packageResult.result = "pending";
  });

  test("reinstalls dependencies after package metadata changes", async () => {
    const { generateAzureSDKPackage } =
      await import("../../mlc/clientGenerator/modularClientPackageGenerator.js");

    await generateAzureSDKPackage({
      typeSpecDirectory: "/spec/project",
      sdkRepoRoot: "/sdk",
      specRepoRoot: "/spec",
      runMode: "spec-pull-request",
    } as never);

    expect(mocks.calls).toEqual(["build", "changelog", "install", "samples"]);
  });
});
