// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import path from "path";

import { resolveProject } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { leafCommand } from "../../framework/command";
import { makeCommandInfo } from "../../framework/command";

import { execSync } from "child_process";
import fs from "fs-extra";
import os from "os";
import { copySync } from "fs-extra";

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
    execSync(`git init`, { cwd: tempDir });
    execSync(`git branch -m newly-generated`, { cwd: tempDir });

    log("Creating baseline using git stash");

    // 1. Our baseline is the old generated code. Stash unstaged changes to the generated code to get at them
    let stashOutput: string;
    try {
      stashOutput = execSync(`git stash push -- ${sourceDirectory}`, {
        stdio: [],
        encoding: "utf-8",
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
    await fs.copy(sourceDirectory, stagingDir);
    execSync(`git stash pop`);
    execSync(`git add .`, { cwd: tempDir });
    execSync(`git commit -m "Existing code"`, { cwd: tempDir });

    // 2. Commit the new generated changes on top of it
    await fs.rm(stagingDir, { recursive: true, force: true });
    copySync(sourceDirectory, stagingDir);
    execSync(`git add .`, { cwd: tempDir });
    execSync(`git commit --allow-empty -m "New codegen"`, { cwd: tempDir });

    // 3. Commit the customizations on top of the old changes on another branch
    execSync(`git checkout HEAD~`, { cwd: tempDir });
    execSync(`git checkout -b customization`, { cwd: tempDir });
    await fs.rm(stagingDir, { recursive: true, force: true });
    copySync(targetDirectory, stagingDir);
    execSync(`git add .`, { cwd: tempDir });
    execSync(`git commit --allow-empty -m "Customizations"`, { cwd: tempDir });

    // 4. Try and merge (but don't try make a merge commit); conflict markers may be present
    execSync(`git checkout newly-generated`, { cwd: tempDir });

    try {
      execSync(`git merge --no-commit --into-name newly-generated customization`, {
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
    await fs.copy(stagingDir, targetDirectory);
  } finally {
    if (options["no-cleanup"]) {
      log("Temporary git dir is available for inspection at", tempDir);
    } else {
      await fs.rm(tempDir, { force: true, recursive: true });
    }
  }

  return true;
});
