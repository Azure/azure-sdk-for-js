// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { spawn } from "child_process";
import { tmpdir } from "os";

import path from "path";

/**
 * Uses the git command line to ask whether a path has any tracked, unstaged changes (if they would appear in a git
 * diff).
 *
 * @param treePath - path to a tree to test for a diff (relative or absolute)
 * @returns true if there are any changes to any tracked files
 */
export function hasDiff(treePath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (treePath.startsWith(tmpdir())) {
      resolve(false);
    } else {
      const command = spawn("git", [
        "diff",
        "--quiet",
        "HEAD",
        "--",
        path.resolve(process.cwd(), treePath),
      ]);

      // git diff --quiet returns nonzero if a diff exists.
      command.on("exit", (code) => resolve(code !== 0));
      command.on("error", reject);
    }
  });
}
