import { beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  calls: [] as string[],
  packageResult: {
    artifacts: [] as string[],
    path: [] as string[],
    result: "pending",
  },
  generateTypeScriptCodeFromTypeSpec: vi.fn(),
  getGeneratedPackageDirectory: vi.fn(async () => "/sdk/pkg"),
  specifyApiVersionToGenerateSDKByTypeSpec: vi.fn(),
  codeOwnersAndIgnoreLinkGenerator: vi.fn(),
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
  generateTypeScriptCodeFromTypeSpec: mocks.generateTypeScriptCodeFromTypeSpec,
}));

vi.mock("../../common/utils.js", () => ({
  getGeneratedPackageDirectory: mocks.getGeneratedPackageDirectory,
  specifyApiVersionToGenerateSDKByTypeSpec: mocks.specifyApiVersionToGenerateSDKByTypeSpec,
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

vi.mock("fs-extra", () => {
  const exists = vi.fn(async () => false);
  return {
    default: { exists },
    exists,
  };
});

vi.mock("../../common/codeOwnersAndIgnoreLink/codeOwnersAndIgnoreLinkGenerator.js", () => ({
  codeOwnersAndIgnoreLinkGenerator: mocks.codeOwnersAndIgnoreLinkGenerator,
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
    mocks.generateTypeScriptCodeFromTypeSpec.mockClear();
    mocks.getGeneratedPackageDirectory.mockClear();
    mocks.specifyApiVersionToGenerateSDKByTypeSpec.mockClear();
    mocks.codeOwnersAndIgnoreLinkGenerator.mockClear();
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

  test("uses the provisioning emitter throughout the modular lifecycle", async () => {
    const { generateAzureSDKPackage } =
      await import("../../mlc/clientGenerator/modularClientPackageGenerator.js");
    const options = {
      typeSpecDirectory: "/spec/project",
      sdkRepoRoot: "/sdk",
      specRepoRoot: "/spec",
      emitterName: "@azure-tools/typespec-ts-provisioning",
      apiVersion: "2026-02-01",
      runMode: "spec-pull-request",
    } as never;

    await generateAzureSDKPackage(options);

    expect(mocks.getGeneratedPackageDirectory).toHaveBeenCalledWith(
      "/spec/project",
      "/sdk",
      "@azure-tools/typespec-ts-provisioning",
    );
    expect(mocks.codeOwnersAndIgnoreLinkGenerator).toHaveBeenCalledWith(
      "pkg",
      "/spec/project",
      "spec-pull-request",
      "@azure-tools/typespec-ts-provisioning",
    );
    expect(mocks.specifyApiVersionToGenerateSDKByTypeSpec).toHaveBeenCalledWith(
      "/spec/project",
      "2026-02-01",
      "@azure-tools/typespec-ts-provisioning",
    );
    expect(mocks.generateTypeScriptCodeFromTypeSpec).toHaveBeenCalledWith(
      options,
      undefined,
      "/sdk/pkg",
    );
    expect(mocks.calls).toEqual(["build", "changelog", "install", "samples"]);
  });
});
