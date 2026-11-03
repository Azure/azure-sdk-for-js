import path from "path";
import { beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  customizeCodes: vi.fn(),
  formatSdk: vi.fn(),
  getModularSDKType: vi.fn(),
  lintFix: vi.fn(),
  runCommand: vi.fn(),
  updateSnippets: vi.fn(),
}));

vi.mock("../../common/devToolUtils.js", () => ({
  customizeCodes: mocks.customizeCodes,
  formatSdk: mocks.formatSdk,
  lintFix: mocks.lintFix,
  updateSnippets: mocks.updateSnippets,
}));

vi.mock("../../utils/generateInputUtils.js", () => ({
  getModularSDKType: mocks.getModularSDKType,
}));

vi.mock("../../common/npmUtils.js", () => ({
  getNpmPackageInfo: vi.fn(async () => ({
    name: "@azure/arm-test",
    version: "1.0.0-beta.1",
  })),
}));

vi.mock("../../common/utils.js", () => ({
  cleanupSamplesFolder: vi.fn(),
  runCommand: mocks.runCommand,
  runCommandOptions: { shell: true },
}));

vi.mock("../../utils/logger.js", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("buildPackage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getModularSDKType.mockReturnValue("ManagementPlane");
    mocks.runCommand.mockImplementation(async (command: string, args: string[]) => {
      if (command === "pnpm" && args[0] === "turbo") {
        throw new Error("Skip the APIView steps in this focused test.");
      }
    });
  });

  test("applies management customizations before linting", async () => {
    const packageDirectory = path.join(process.cwd(), "sdk", "test", "arm-test");
    const { buildPackage } = await import("../../common/rushUtils.js");

    await buildPackage(
      packageDirectory,
      {
        sdkRepoRoot: process.cwd(),
        runMode: "local",
      } as never,
      {} as never,
    );

    expect(mocks.getModularSDKType).toHaveBeenCalledWith(packageDirectory);
    expect(mocks.customizeCodes).toHaveBeenCalledWith(packageDirectory);
    expect(mocks.customizeCodes.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.lintFix.mock.invocationCallOrder[0],
    );
  });
});
