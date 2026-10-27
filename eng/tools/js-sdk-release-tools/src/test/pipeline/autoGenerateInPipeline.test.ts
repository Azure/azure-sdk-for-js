import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { SDKType } from "../../common/types.js";

const mocks = vi.hoisted(() => ({
  sdkType: "ModularClient",
  inputJsonPath: "",
  outputJsonPath: "",
  modular: vi.fn(async () => ({ result: "succeeded" })),
  provisioning: vi.fn(async () => ({ result: "succeeded" })),
}));

vi.mock("command-line-args", () => ({
  default: () => ({
    inputJsonPath: mocks.inputJsonPath,
    outputJsonPath: mocks.outputJsonPath,
    local: true,
    typespecEmitter:
      mocks.sdkType === "Provisioning" ? "@azure-tools/typespec-ts-provisioning" : undefined,
  }),
}));
vi.mock("../../utils/generateInputUtils.js", () => ({
  parseInputJson: vi.fn(async () => ({
    sdkType: mocks.sdkType,
    specFolder: "/spec",
    typespecProject: "project",
    gitCommitId: "abc",
    repoHttpsUrl: "https://github.com/Azure/azure-rest-api-specs",
    outputJson: { packages: [], language: "JavaScript" },
    runMode: "local",
  })),
}));
vi.mock("../../mlc/clientGenerator/modularClientPackageGenerator.js", () => ({
  generateAzureSDKPackage: mocks.modular,
}));
vi.mock("../../provisioning/provisioningPackageGenerator.js", () => ({
  generateProvisioningSDKPackage: mocks.provisioning,
}));
vi.mock("../../common/npmUtils.js", () => ({ configureNpmFromRepo: vi.fn() }));
vi.mock("../../utils/backupNodeModules.js", () => ({
  backupNodeModules: vi.fn(),
  restoreNodeModules: vi.fn(),
}));
vi.mock("../../hlc/generateMgmt.js", () => ({ generateMgmt: vi.fn() }));
vi.mock("../../llc/generateRLCInPipeline/generateRLCInPipeline.js", () => ({
  generateRLCInPipeline: vi.fn(),
}));
vi.mock("../../utils/logger.js", () => ({ logger: { error: vi.fn(), info: vi.fn() } }));

describe("autoGenerateInPipeline package routing", () => {
  let temporaryDirectory: string;

  beforeEach(() => {
    vi.resetModules();
    mocks.modular.mockClear();
    mocks.provisioning.mockClear();
    temporaryDirectory = mkdtempSync(join(tmpdir(), "release-tool-dispatch-"));
    mocks.inputJsonPath = join(temporaryDirectory, "input.json");
    mocks.outputJsonPath = join(temporaryDirectory, "output.json");
    writeFileSync(mocks.inputJsonPath, "{}");
  });

  afterEach(() => {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  test.each([
    [SDKType.ModularClient, "modular"],
    [SDKType.Provisioning, "provisioning"],
  ])("routes %s to its own generator", async (sdkType, generator) => {
    mocks.sdkType = sdkType;
    await import("../../autoGenerateInPipeline.js");
    await vi.waitFor(() => expect(existsSync(mocks.outputJsonPath)).toBe(true));

    expect(mocks.modular).toHaveBeenCalledTimes(generator === "modular" ? 1 : 0);
    expect(mocks.provisioning).toHaveBeenCalledTimes(generator === "provisioning" ? 1 : 0);
  });
});
