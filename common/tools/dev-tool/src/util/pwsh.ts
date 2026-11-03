// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFile } from "@azure/core-process";

const commandStack =
  process.platform === "win32" ? ["pwsh.exe", "pwsh-preview.exe"] : ["pwsh", "pwsh-preview"];

/**
 * Determines whether or not PowerShell is installed on the system.
 */
export async function hasPowerShell(): Promise<boolean> {
  for (const command of commandStack) {
    try {
      await execFile(command, ["-Command", "$PSVersionTable.PSVersion.Major"], {
        encoding: "utf8",
      });
      return true;
    } catch {
      // Try the next supported PowerShell executable.
    }
  }

  return false;
}
