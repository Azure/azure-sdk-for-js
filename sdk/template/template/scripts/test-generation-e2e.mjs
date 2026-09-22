// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFile } from "node:child_process";
import { access, cp, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const packageDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sdkRepository = path.resolve(packageDirectory, "../../..");
const workspaceRoot = path.resolve(sdkRepository, "..");
const specRepository =
  process.env.AZURE_REST_API_SPECS ?? path.join(workspaceRoot, "azure-rest-api-specs");
const specProject = path.join(specRepository, "specification/widget/data-plane/WidgetAnalytics");
const facadeFiles = [
  "src/index.ts",
  "src/api/index.ts",
  "src/api/widgets/index.ts",
  "src/models/index.ts",
];
const temporaryRoot = await mkdtemp(path.join(tmpdir(), "template-generation-e2e-"));
const worktree = path.join(temporaryRoot, "azure-sdk-for-js");

try {
  await run("git", ["worktree", "add", "--detach", worktree, "HEAD"], sdkRepository);
  await applyWorkingTreeChanges();
  await installDependencies();

  const generatedDirectory = path.join(worktree, "sdk/template/template/src/generated");
  const sentinel = path.join(generatedDirectory, "__generation-e2e-sentinel.ts");
  await writeFile(sentinel, "throw new Error('The emitter must remove this file.');\n");

  const facadeContents = new Map();
  for (const relativePath of facadeFiles) {
    facadeContents.set(
      relativePath,
      await readFile(path.join(worktree, "sdk/template/template", relativePath), "utf-8"),
    );
  }

  const specCommit = (await run("git", ["rev-parse", "HEAD"], specRepository)).stdout.trim();
  const tspClientDirectory = path.join(worktree, "eng/common/tsp-client");
  const worktreePackageDirectory = path.join(worktree, "sdk/template/template");

  await run(
    "npm",
    [
      "exec",
      "--prefix",
      tspClientDirectory,
      "--no",
      "--",
      "tsp-client",
      "update",
      "--no-prompt",
      "--debug",
      "--tsp-config",
      path.join(specProject, "tspconfig.yaml"),
      "--local-spec-repo",
      specProject,
      "--repo",
      "Azure/azure-rest-api-specs",
      "--commit",
      specCommit,
    ],
    worktreePackageDirectory,
  );

  await expectMissing(sentinel);
  await expectMissing(path.join(worktreePackageDirectory, "generated"));
  await expectFile(path.join(generatedDirectory, "index.ts"));
  await expectFile(path.join(generatedDirectory, "api/widgetAnalyticsContext.ts"));

  for (const [relativePath, expectedContent] of facadeContents) {
    const actualContent = await readFile(
      path.join(worktreePackageDirectory, relativePath),
      "utf-8",
    );
    if (actualContent !== expectedContent) {
      throw new Error(`Generation changed the handwritten facade '${relativePath}'.`);
    }
  }

  await run("pnpm", ["turbo", "build", "--filter=@azure/template...", "--token", "1"], worktree);

  console.log("Template generation E2E test passed.");
} finally {
  await run("git", ["worktree", "remove", "--force", worktree], sdkRepository, true);
  await rm(temporaryRoot, { force: true, recursive: true });
}

async function applyWorkingTreeChanges() {
  const diff = await run(
    "git",
    ["--no-pager", "diff", "--no-ext-diff", "--no-color", "--binary", "HEAD"],
    sdkRepository,
  );
  if (diff.stdout.trim()) {
    const patchPath = path.join(temporaryRoot, "working-tree.patch");
    await writeFile(patchPath, diff.stdout);
    await run("git", ["apply", "--whitespace=nowarn", patchPath], worktree);
  }

  const untracked = (
    await run("git", ["ls-files", "--others", "--exclude-standard"], sdkRepository)
  ).stdout
    .split(/\r?\n/)
    .filter(Boolean);

  for (const relativePath of untracked) {
    const source = path.join(sdkRepository, relativePath);
    const target = path.join(worktree, relativePath);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(source, target, { recursive: true });
  }
}

async function installDependencies() {
  await run("pnpm", ["install", "--frozen-lockfile"], worktree);
  await run("npm", ["ci", "--no-audit", "--no-fund"], path.join(worktree, "eng/common/tsp-client"));
}

async function expectFile(filePath) {
  try {
    await access(filePath);
  } catch {
    throw new Error(`Expected generation output '${filePath}' was not found.`);
  }
}

async function expectMissing(filePath) {
  try {
    await access(filePath);
  } catch {
    return;
  }
  throw new Error(`Expected generation to remove '${filePath}'.`);
}

async function run(command, args, cwd, ignoreFailure = false) {
  try {
    return await execFileAsync(command, args, {
      cwd,
      maxBuffer: 20 * 1024 * 1024,
    });
  } catch (error) {
    if (ignoreFailure) {
      return { stdout: "", stderr: "" };
    }
    const stdout = error.stdout ? `\n${error.stdout}` : "";
    const stderr = error.stderr ? `\n${error.stderr}` : "";
    throw new Error(`Command failed: ${command} ${args.join(" ")}${stdout}${stderr}`, {
      cause: error,
    });
  }
}
