// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execSync } from "child_process";
import { platform } from "os";
import { beforeAll } from "vitest";

beforeAll(async () => {
  // Only run on Linux
  if (platform() === "linux") {
    try {
      execSync("sudo apt-get update && sudo apt-get install -y libsecret-1-0");
    } catch (error) {
      console.error("Failed to install libsecret:", error);
    }
  }
});
