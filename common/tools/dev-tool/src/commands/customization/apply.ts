// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { resolveProject, resolveRoot } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { run } from "../../util/run";
import { leafCommand } from "../../framework/command";
import { makeCommandInfo } from "../../framework/command";
import path from "node:path";
import os from "node:os";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import type { Dirent } from "node:fs";

const log = createPrinter("apply-customization");

export const commandInfo = makeCommandInfo(
  "apply",
  "applies existing customizations to new generated code",
  {
    sourceDirectory: {
      shortName: "s",
      kind: "string",
      default: "generated",
      description: "location of the generated code",
    },
    targetDirectory: {
      shortName: "t",
      kind: "string",
      default: "src",
      description: "directory for customized code. Relative to project root",
    },
    skip: {
      kind: "string",
      description: "file paths (relative to the target directory) that should not be merged",
      allowMultiple: true,
    },
    ["no-cleanup"]: {
      kind: "boolean",
      default: false,
      description: "do not remove the temporary git directory. Useful for debugging",
    },
  },
);

function normalizePathSegments(p: string): string {
  return p.split(path.sep).join("/");
}

async function ensureParentDirectory(filePath: string): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function listFiles(root: string): Promise<string[]> {
  if (!existsSync(root)) {
    return [];
  }

  const entries = (await fs.readdir(root, {
    withFileTypes: true,
    recursive: true,
  })) as Dirent[];

  const results: string[] = [];
  for (const entry of entries) {
    if (entry.isFile() || entry.isSymbolicLink()) {
      const parentDir = entry.parentPath ?? root;
      const fullPath = path.join(parentDir, entry.name);
      const relative = path.relative(root, fullPath);
      results.push(normalizePathSegments(relative));
    }
  }

  return results;
}

function joinRelative(root: string, relative: string): string {
  return relative === "." || relative === "" ? root : path.join(root, relative);
}

async function gitStatus(repoPath: string, relativePath: string): Promise<string> {
  const spec = relativePath === "." ? "." : relativePath;
  const result = await run(["git", "status", "--porcelain", "--", spec], {
    cwd: repoPath,
    captureOutput: true,
  });

  return result.output.trim();
}

/**
 * Core apply algorithm:
 * 1. Create temp workspace:
 *    - base/: committed snapshot of previous generated output.
 *    - custom/: committed snapshot of previous customized tree.
 *    - result/: copy of the freshly regenerated output (merge target).
 * 2. For every previously customized file:
 *    - If in --skip: overwrite regenerated copy with prior customized version.
 *    - If file never existed in previous generated snapshot: copy (pure customization).
 *    - If previously generated but now absent in new generation: drop it.
 *    - Else perform 3‑way merge (new generated vs old generated (base) vs old customized) via `git merge-file --diff3`; record conflicts.
 * 3. Replace the target directory with result; log retained, dropped, skipped, and conflicted files (conflict markers remain for manual resolution).
 */
export default leafCommand(commandInfo, async (options) => {
  const info = await resolveProject(process.cwd());
  const generatedDirectory = path.join(info.path, options.sourceDirectory);
  const customizedDirectory = path.join(info.path, options.targetDirectory);

  if (!existsSync(generatedDirectory)) {
    log(`❌ Could not find source directory ${generatedDirectory}`);
    return false;
  }

  if (!existsSync(customizedDirectory)) {
    log(`❌ Could not find target directory ${customizedDirectory}`);
    return false;
  }

  const generatedRelative = normalizePathSegments(
    path.relative(info.path, generatedDirectory) || ".",
  );
  const customizedRelative = normalizePathSegments(
    path.relative(info.path, customizedDirectory) || ".",
  );
  const repoRoot = await resolveRoot(info.path);
  const generatedRepoRelative = normalizePathSegments(
    path.relative(repoRoot, generatedDirectory) || ".",
  );
  const customizedRepoRelative = normalizePathSegments(
    path.relative(repoRoot, customizedDirectory) || ".",
  );

  const skipPatterns = new Set();
  for (const skip of options.skip ?? []) {
    skipPatterns.add(path.posix.normalize(normalizePathSegments(skip)));
  }

  const generatedStatus = await gitStatus(info.path, generatedRelative);

  if (generatedStatus.length === 0) {
    log("ℹ️  No changes were detected in the generated code, nothing to do");
    return true;
  }

  const customizedStatus = await gitStatus(info.path, customizedRelative);

  if (customizedStatus.length > 0) {
    log(
      "❌ Uncommitted changes were detected in the target directory. Please commit or stash them before running apply.",
    );
    return false;
  }

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "azsdk-dev-tool"));

  try {
    const generatedSnapshotDir = path.join(tempDir, "base");
    const customizedSnapshotDir = path.join(tempDir, "custom");
    const mergeResultDir = path.join(tempDir, "result");

    await fs.mkdir(generatedSnapshotDir, { recursive: true });
    await fs.mkdir(customizedSnapshotDir, { recursive: true });
    await fs.mkdir(mergeResultDir, { recursive: true });

    try {
      await run(
        [
          "git",
          "--work-tree",
          generatedSnapshotDir,
          "checkout",
          "HEAD",
          "--",
          generatedRepoRelative,
        ],
        { cwd: repoRoot, captureOutput: true },
      );
    } catch (e) {
      log(
        "❌ Could not find a committed copy of the generated directory in git history. Commit the generated/ folder before regenerating and re-running apply.",
      );
      return false;
    }

    try {
      await run(
        [
          "git",
          "--work-tree",
          customizedSnapshotDir,
          "checkout",
          "HEAD",
          "--",
          customizedRepoRelative === "." ? "." : customizedRepoRelative,
        ],
        { cwd: repoRoot, captureOutput: true },
      );
    } catch (e) {
      log(
        "❌ No committed customizations were found in the target directory. Please commit the customized src/ tree before running apply.",
      );
      return false;
    }

    const previousGeneratedRoot = joinRelative(generatedSnapshotDir, generatedRepoRelative);
    const previousCustomizedRoot = joinRelative(customizedSnapshotDir, customizedRepoRelative);
    const newMergedRoot = joinRelative(mergeResultDir, customizedRelative);

    await fs.mkdir(newMergedRoot, { recursive: true });
    await fs.cp(generatedDirectory, newMergedRoot, { recursive: true });

    const previousCustomizedFiles = await listFiles(previousCustomizedRoot);
    const skipped: string[] = [];
    const conflicts: string[] = [];
    const additions: string[] = []; // customization-only or preserved customized copies
    const removedCustomized: string[] = [];

    for (const relative of previousCustomizedFiles.sort()) {
      const normalized = path.posix.normalize(normalizePathSegments(relative));
      const previousGeneratedFile = joinRelative(previousGeneratedRoot, normalized);
      const previousCustomizedFile = joinRelative(previousCustomizedRoot, normalized);
      const stagedResultFile = joinRelative(newMergedRoot, normalized);

      const hadPreviousGenerated = existsSync(previousGeneratedFile);
      const hasNewGenerated = existsSync(stagedResultFile); // present in newly generated baseline
      const isSkipped = skipPatterns.has(normalized);

      if (isSkipped) {
        // Always preserve previous customization when skipped
        await ensureParentDirectory(stagedResultFile);
        await fs.copyFile(previousCustomizedFile, stagedResultFile);
        skipped.push(normalized);
        additions.push(normalized);
        continue;
      }

      if (!hadPreviousGenerated) {
        // Pure customization-only file (never generated before). Keep it.
        await ensureParentDirectory(stagedResultFile);
        await fs.copyFile(previousCustomizedFile, stagedResultFile);
        additions.push(normalized);
        continue;
      }

      if (hadPreviousGenerated && !hasNewGenerated) {
        // Previously generated & customized, but generator removed it now: drop it.
        removedCustomized.push(normalized);
        continue;
      }

      // Merge: previously generated + previously customized + new generated present
      await ensureParentDirectory(stagedResultFile);
      const mergeResult = await run(
        [
          "git",
          "merge-file",
          "--diff3",
          "--",
          stagedResultFile,
          previousGeneratedFile,
          previousCustomizedFile,
        ],
        {
          captureExitCode: true,
          captureOutput: true,
          cwd: info.path,
        },
      );

      // The exit value of this program is negative on error, and the number of conflicts otherwise (truncated to 127 if there are more than that many conflicts). If the merge was clean, the exit value is 0.
      if (mergeResult.exitCode > 0) {
        conflicts.push(normalized);
      } else if (mergeResult.exitCode < 0) {
        log(`❌ Failed to merge ${normalized} due to error ${mergeResult.output}.`);
        return false;
      }
    }

    await fs.rm(customizedDirectory, { force: true, recursive: true });
    await fs.mkdir(path.dirname(customizedDirectory), { recursive: true });
    await fs.cp(newMergedRoot, customizedDirectory, { recursive: true });

    if (additions.length > 0) {
      log(`➕ Retained or applied previous customization for ${additions.length} file(s).`);
    }

    if (removedCustomized.length > 0) {
      log(
        `➖ Dropped ${removedCustomized.length} previously customized file(s) removed by the new generation (not skipped).`,
      );
    }

    if (skipped.length > 0) {
      log(`⏭️  Skipped ${skipped.length} file(s) due to --skip option.`);
    }

    if (conflicts.length > 0) {
      log("⚠️  Merge conflicts detected in the following files:");
      for (const file of conflicts) {
        log(`   - ${file}`);
      }
      log("   Resolve the conflicts in the target directory before committing.");
    } else {
      log("✅ Success! Customizations were applied to the newly generated code.");
    }
  } catch (e) {
    log("❌ An error occurred:", (e as Error).message);
    return false;
  } finally {
    if (options["no-cleanup"]) {
      log("Temporary git dir is available for inspection at", tempDir);
    } else {
      await fs.rm(tempDir, { force: true, recursive: true });
    }
  }

  return true;
});
