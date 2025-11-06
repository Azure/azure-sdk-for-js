// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execSync } from "child_process";
import { platform } from "os";

/**
 * Global setup for Vitest that runs before any modules are imported.
 */
export default function setup(): void {
  // Only run on Linux
  if (platform() === "linux") {
    // Try to install the dependency
    try {
      execSync("sudo dpkg --configure -a && sudo -n apt-get update -qq && sudo -n apt-get install -y libsecret-1-0", {
        stdio: "inherit",
        timeout: 60000,
      });
    } catch (error) {
      console.error("Failed to install libsecret-1-0 automatically");
    }
  }
}
