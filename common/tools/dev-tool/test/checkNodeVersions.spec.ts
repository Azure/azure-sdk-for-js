// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import {
  buildRunSamplesScript,
  validateNodeVersions,
} from "../src/commands/samples/checkNodeVersions.ts";

describe("check-node-versions command safety", () => {
  it("generates a static script that quotes positional data", () => {
    const script = buildRunSamplesScript();

    expect(script).toContain("artifact_url=$3");
    expect(script).toContain('run_command npm install -- "${artifact_url}"');
    expect(script).toContain('"$@" >> "${log_file_path}" 2>&1');
    expect(script).not.toContain("${artifactURL}");
  });

  it("accepts supported Node.js version forms", () => {
    expect(validateNodeVersions(["20", "22.1", "24.0.1", "22"])).toEqual([
      "20",
      "22.1",
      "24.0.1",
      "22",
    ]);
  });

  it.each(["22;touch marker", "22\n24", "latest", "22-alpine", " 22"])(
    "rejects an unsafe Docker image version %j",
    (version) => {
      expect(() => validateNodeVersions([version])).toThrow(/Invalid Node\.js version/);
    },
  );
});
