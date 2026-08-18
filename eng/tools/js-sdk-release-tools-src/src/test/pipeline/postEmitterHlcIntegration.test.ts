import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { RunMode } from "../../common/types.js";

const mocks = vi.hoisted(() => ({
  calls: [] as string[],
  packageDirectory: "",
  postEmitterRunModes: [] as string[],
}));
const tempDirectories: string[] = [];

vi.mock("node:child_process", () => ({
  execSync: vi.fn((command: string) => {
    if (command.startsWith("autorest")) mocks.calls.push("emit");
    if (command === "pnpm install") mocks.calls.push("install");
    if (command.includes(" build")) mocks.calls.push("build");
    if (command.includes(" pack")) mocks.calls.push("pack");
  }),
}));
vi.mock("../../common/postEmitter.js", () => ({
  preparePackageForBuild: vi.fn(async (_package, _repo, runMode) => {
    mocks.postEmitterRunModes.push(runMode);
    mocks.calls.push("post-emitter");
  }),
}));
vi.mock("../../utils/git.js", () => ({
  getChangedPackageDirectory: vi.fn(async () => new Set(["sdk/test/arm-test"])),
  getChangedCiYmlFilesInSpecificFolder: vi.fn(),
}));
vi.mock("../../common/changelog/automaticGenerateChangeLogAndBumpVersion.js", () => ({
  generateChangelogAndBumpVersion: vi.fn(async () => undefined),
}));
vi.mock("../../utils/changeCiYaml.js", () => ({ modifyOrGenerateCiYml: vi.fn() }));
vi.mock("../../utils/changeConfigOfTestAndSample.js", () => ({
  changeConfigOfTestAndSample: vi.fn(),
  ChangeModel: { Change: "change", Revert: "revert" },
  SdkType: { Hlc: "hlc" },
}));
vi.mock("../../hlc/utils/changeReadmeMd.js", () => ({ changeReadmeMd: vi.fn() }));
vi.mock("../../utils/getOutputPackageInfo.js", () => ({ getOutputPackageInfo: vi.fn() }));
vi.mock("../../hlc/utils/getReleaseTool.js", () => ({ getReleaseTool: vi.fn(() => "test") }));
vi.mock("../../utils/addApiViewInfo.js", () => ({ addApiViewInfo: vi.fn() }));
vi.mock("../../common/utils.js", () => ({
  defaultChildProcessTimeout: 60_000,
  sanitizeAdditionalArgs: vi.fn((value) => value),
}));
vi.mock("../../common/devToolUtils.js", () => ({
  lintFix: vi.fn(),
  updateSnippets: vi.fn(),
}));
vi.mock("../../common/rushUtils.js", () => ({ ensurePnpmInstalled: vi.fn() }));
vi.mock("../../utils/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

beforeEach(async () => {
  mocks.calls.length = 0;
  mocks.postEmitterRunModes.length = 0;
  const repoRoot = await mkdtemp(path.join(tmpdir(), "post-emitter-hlc-"));
  tempDirectories.push(repoRoot);
  mocks.packageDirectory = path.join(repoRoot, "sdk", "test", "arm-test");
  await mkdir(mocks.packageDirectory, { recursive: true });
  await writeFile(
    path.join(mocks.packageDirectory, "package.json"),
    JSON.stringify({ name: "@azure/arm-test", version: "1.0.0" }),
  );
});

afterEach(async () => {
  await Promise.all(
    tempDirectories.splice(0).map((directory) => rm(directory, { recursive: true })),
  );
});

describe("HLC PostEmitter integration", () => {
  test("runs PostEmitter exactly once after emit and before build", async () => {
    const { generateMgmt } = await import("../../hlc/generateMgmt.js");
    const repoRoot = path.resolve(mocks.packageDirectory, "../../..");

    await generateMgmt({
      sdkRepo: repoRoot,
      swaggerRepo: path.join(repoRoot, "spec"),
      readmeMd: "service/resource-manager/readme.md",
      gitCommitId: "a".repeat(40),
      apiVersion: undefined,
      sdkReleaseType: undefined,
      runMode: RunMode.Batch,
    });

    expect(mocks.calls.filter((call) => call === "post-emitter")).toHaveLength(1);
    expect(mocks.calls.indexOf("emit")).toBeLessThan(mocks.calls.indexOf("post-emitter"));
    expect(mocks.calls.indexOf("post-emitter")).toBeLessThan(mocks.calls.indexOf("build"));
  });

  test("uses an explicit unspecified run mode when the local HLC caller omits it", async () => {
    const { generateMgmt } = await import("../../hlc/generateMgmt.js");
    const repoRoot = path.resolve(mocks.packageDirectory, "../../..");

    await generateMgmt({
      sdkRepo: repoRoot,
      swaggerRepo: path.join(repoRoot, "spec"),
      readmeMd: "service/resource-manager/readme.md",
      gitCommitId: "a".repeat(40),
      apiVersion: undefined,
      sdkReleaseType: undefined,
    });

    expect(mocks.postEmitterRunModes).toEqual(["unspecified"]);
  });
});
