// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { exec } from "node:child_process";

const commandStack =
  process.platform === "win32" ? ["pwsh.exe", "pwsh-preview.exe"] : ["pwsh", "pwsh-preview"];

/**
 * Determines whether or not PowerShell is installed on the system.
 */
export async function hasPowerShell(): Promise<boolean> {
  for (const command of commandStack) {
    const success = await new Promise<boolean>((resolve) => {
      const cmd = exec(`${command} -Command '$PSVersionTable.PSVersion.Major'`);

      cmd.on("error", () => {
        resolve(false);
      });
      cmd.on("exit", (code) => {
        return code === 0 ? resolve(true) : resolve(false);
      });
    });

    if (success) return true;
  }

  return false;
}
