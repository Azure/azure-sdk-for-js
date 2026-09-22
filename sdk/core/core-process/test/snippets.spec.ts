// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFile } from "../src/index.js";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleRunExecutable", async () => {
    const { stdout } = await execFile("git", ["rev-parse", "--show-toplevel"]);
    console.log(stdout);
  });

  it("ReadmeSampleRunWindowsBatchFile", async () => {
    const { stdout } = await execFile("npm", ["--version"], {
      allowWindowsBatchFiles: true,
    });
    console.log(stdout);
  });
});
