import { beforeEach, describe, expect, test, vi } from "vitest";
import { ModularSDKType, RunMode } from "../../common/types.js";

const mocks = vi.hoisted(() => ({ calls: [] as string[] }));

vi.mock("../../common/postEmitter.js", () => ({
  preparePackageForBuild: vi.fn(async (_package, _repo, _mode, customize) => {
    await customize?.();
    mocks.calls.push("post-emitter");
  }),
}));

vi.mock("../../common/devToolUtils.js", () => ({
  customizeCodes: vi.fn(async () => mocks.calls.push("customize")),
  formatSdk: vi.fn(),
  lintFix: vi.fn(),
  updateSnippets: vi.fn(),
}));

vi.mock("../../utils/generateInputUtils.js", () => ({
  getModularSDKType: vi.fn(() => ModularSDKType.DataPlane),
}));

vi.mock("../../common/npmUtils.js", () => ({
  getArtifactName: vi.fn(() => "test.tgz"),
  getNpmPackageInfo: vi.fn(async () => ({ name: "@azure/test", version: "1.0.0" })),
}));

vi.mock("../../common/utils.js", () => ({
  cleanupSamplesFolder: vi.fn(),
  runCommandOptions: {},
  runCommand: vi.fn(async (_command, args: string[]) => {
    if (args.includes("install")) mocks.calls.push("install");
    if (args.includes("turbo")) {
      mocks.calls.push("build");
      throw new Error("stop after build boundary");
    }
    if (args.includes("test:node")) mocks.calls.push("test");
  }),
}));

vi.mock("glob", () => ({ glob: vi.fn(async () => []) }));
vi.mock("../../utils/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

describe("MLC PostEmitter integration", () => {
  beforeEach(() => {
    mocks.calls.length = 0;
  });

  test("runs customization then PostEmitter exactly once before build", async () => {
    const { buildPackage } = await import("../../common/rushUtils.js");

    await buildPackage(
      "/repo/sdk/test/package",
      { sdkRepoRoot: "/repo", runMode: RunMode.Batch } as never,
      {} as never,
    );

    expect(mocks.calls.filter((call) => call === "post-emitter")).toHaveLength(1);
    expect(mocks.calls.indexOf("customize")).toBeLessThan(mocks.calls.indexOf("post-emitter"));
    expect(mocks.calls.indexOf("post-emitter")).toBeLessThan(mocks.calls.indexOf("build"));
  });
});
