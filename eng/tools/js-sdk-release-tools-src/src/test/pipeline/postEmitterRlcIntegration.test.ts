import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { RunMode } from "../../common/types.js";

const mocks = vi.hoisted(() => ({ calls: [] as string[], packagePath: "" }));
const tempDirectories: string[] = [];

vi.mock("node:child_process", () => ({
  execSync: vi.fn((command: string) => {
    if (command.includes("tsp-client")) mocks.calls.push("emit");
    if (command === "pnpm install") mocks.calls.push("install");
    if (command.includes(" build")) mocks.calls.push("build");
    if (command.includes(" pack")) mocks.calls.push("pack");
  }),
}));

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

vi.mock("../../common/rushUtils.js", () => ({ ensurePnpmInstalled: vi.fn() }));
vi.mock("../../common/utils.js", () => ({
  cleanUpPackageDirectory: vi.fn(),
  defaultChildProcessTimeout: 60_000,
  generateRepoDataInTspLocation: vi.fn(() => "Azure/azure-rest-api-specs"),
  getGeneratedPackageDirectory: vi.fn(async () => mocks.packagePath),
  specifyApiVersionToGenerateSDKByTypeSpec: vi.fn(),
}));
vi.mock("../../utils/addApiViewInfo.js", () => ({ addApiViewInfo: vi.fn() }));
vi.mock("../../utils/changeCiYaml.js", () => ({ modifyOrGenerateCiYml: vi.fn() }));
vi.mock("../../utils/changeConfigOfTestAndSample.js", () => ({
  changeConfigOfTestAndSample: vi.fn(),
  ChangeModel: { Change: "change", Revert: "revert" },
  SdkType: { Rlc: "rlc" },
}));
vi.mock("../../utils/getOutputPackageInfo.js", () => ({
  getOutputPackageInfo: vi.fn(() => ({
    artifacts: [],
    changelog: {},
    path: [],
    result: "succeeded",
  })),
}));
vi.mock("../../utils/git.js", () => ({ getChangedCiYmlFilesInSpecificFolder: vi.fn() }));
vi.mock("../../utils/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock("../../utils/runningEnvironment.js", () => ({
  RunningEnvironment: { SdkGeneration: "sdk-generation" },
}));
vi.mock("../../llc/utils/prepareCommandToInstallDependenciesForTypeSpecProject.js", () => ({
  prepareCommandToInstallDependenciesForTypeSpecProject: vi.fn(),
}));
vi.mock("../../llc/utils/generateSampleReadmeMd.js", () => ({
  replaceRequireInAutorestConfigurationFile: vi.fn(),
}));
vi.mock("../../llc/utils/updateTypeSpecProjectYamlFile.js", () => ({
  updateTypeSpecProjectYamlFile: vi.fn(),
}));
vi.mock("../../common/changelog/automaticGenerateChangeLogAndBumpVersion.js", () => ({
  generateChangelogAndBumpVersion: vi.fn(async () => undefined),
}));
vi.mock("../../common/packageResultUtils.js", () => ({ updateChangelogResult: vi.fn() }));

beforeEach(async () => {
  mocks.calls.length = 0;
  const repoRoot = await mkdtemp(path.join(tmpdir(), "post-emitter-rlc-"));
  tempDirectories.push(repoRoot);
  mocks.packagePath = path.join(repoRoot, "sdk", "test", "package");
  await mkdir(mocks.packagePath, { recursive: true });
  await writeFile(
    path.join(mocks.packagePath, "package.json"),
    JSON.stringify({ name: "@azure-rest/test", version: "1.0.0" }),
  );
});

afterEach(async () => {
  await Promise.all(
    tempDirectories.splice(0).map((directory) => rm(directory, { recursive: true })),
  );
});

describe("RLC PostEmitter integration", () => {
  test("runs customization then PostEmitter exactly once after emit and before build", async () => {
    const { generateRLCInPipeline } =
      await import("../../llc/generateRLCInPipeline/generateRLCInPipeline.js");
    const repoRoot = path.resolve(mocks.packagePath, "../../..");

    await generateRLCInPipeline({
      sdkRepo: repoRoot,
      swaggerRepo: path.join(repoRoot, "spec"),
      typespecProject: "project",
      readmeMd: undefined,
      sdkGenerationType: "script",
      swaggerRepoUrl: "https://github.com/Azure/azure-rest-api-specs",
      gitCommitId: "a".repeat(40),
      typespecEmitter: "@azure-tools/typespec-ts",
      apiVersion: undefined,
      sdkReleaseType: undefined,
      runMode: RunMode.Batch,
    });

    expect(mocks.calls).toEqual(["emit", "install", "customize", "post-emitter", "build", "pack"]);
  });
});
