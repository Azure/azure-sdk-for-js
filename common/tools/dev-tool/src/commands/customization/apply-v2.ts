// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { resolveProject } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { run } from "../../util/run";
import { leafCommand } from "../../framework/command";
import { makeCommandInfo } from "../../framework/command";
import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";

const log = createPrinter("apply-customization");

export const commandInfo = makeCommandInfo(
  "apply-v2",
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
    ["no-cleanup"]: {
      kind: "boolean",
      default: false,
      description: "do not remove the temporary git directory. Useful for debugging",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  const info = await resolveProject(process.cwd());
  const sourceDirectory = path.join(info.path, options.sourceDirectory);
  const targetDirectory = path.join(info.path, options.targetDirectory);

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "azsdk-dev-tool"));

  try {
    // Create a temporary git repo to work in
    const stagingDir = path.join(tempDir, "src");
    await run("git init", { cwd: tempDir });
    await run("git branch -m newly-generated", { cwd: tempDir });

    log("Creating baseline using git stash");

    // 1. Our baseline is the old generated code. Stash unstaged changes to the generated code to get at them
    let stashOutput: string;
    try {
      stashOutput = await run(["git", "stash", "push", "--", sourceDirectory], {
        captureOutput: true,
      });
    } catch (e: unknown) {
      log(
        "Failed to stash changes to the generated code. This is likely because the generated code is not tracked. Commit the generated code and try again.",
      );
      return false;
    }

    if (stashOutput.includes("No local changes to save")) {
      log("ℹ️  No changes were made to the generated code, nothing to do");
      return true;
    }

    // Copy old generated code to the staging directory and make an initial commit
    try {
      await fs.cp(sourceDirectory, stagingDir, { recursive: true });
    } finally {
      await run(`git stash pop`, {});
    }

    await run(`git add .`, { cwd: tempDir });
    await run(["git", "commit", "-m", "Existing code"], { cwd: tempDir });

    // 2. Commit the new generated changes on top of it
    await fs.rm(stagingDir, { recursive: true, force: true });
    await fs.cp(sourceDirectory, stagingDir, { recursive: true });
    await run(`git add .`, { cwd: tempDir });
    await run(["git", "commit", "--allow-empty", "-m", "New codegen"], { cwd: tempDir });

    // 3. Commit the customizations on top of the old changes on another branch
    await run(`git checkout HEAD~`, { cwd: tempDir });
    await run(`git checkout -b customization`, { cwd: tempDir });
    await fs.rm(stagingDir, { recursive: true, force: true });
    await fs.cp(targetDirectory, stagingDir, { recursive: true });
    await run(`git add .`, { cwd: tempDir });
    await run(`git commit --allow-empty -m Customizations`, { cwd: tempDir });

    // 4. Try and merge (but don't try make a merge commit); conflict markers may be present
    await run(`git checkout newly-generated`, { cwd: tempDir });

    try {
      await run(`git merge --no-commit --into-name newly-generated customization`, {
        cwd: tempDir,
      });
      log(
        "✅ Success! The existing customizations were applied to the newly generated code successfully and no conflicts were found.",
      );
    } catch (e) {
      // Non-zero exit code implies there are merge conflicts. This is fine, but means further action is required.
      log(
        "⚠️  The customization was applied to the newly generated code, but there are merge conflicts to be resolved.",
      );
      log("   Resolve the conflicts manually before committing.");
    }

    // 5. Copy result to target directory. User can fix merge conflict themselves if markers are present
    await fs.rm(targetDirectory, { force: true, recursive: true });
    await fs.cp(stagingDir, targetDirectory, { recursive: true });
  } finally {
    if (options["no-cleanup"]) {
      log("Temporary git dir is available for inspection at", tempDir);
    } else {
      await fs.rm(tempDir, { force: true, recursive: true });
    }
  }

  return true;
});
