// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { spawn } from "child_process";

import path from "path";

export function hasDiff(relativePath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const command = spawn("git", [
      "diff",
      "--quiet",
      "HEAD",
      "--",
      path.resolve(process.cwd(), relativePath),
    ]);

    // git diff --quiet returns nonzero if a diff exists.
    command.on("exit", (code) => resolve(code !== 0));
    command.on("error", reject);
  });
}
