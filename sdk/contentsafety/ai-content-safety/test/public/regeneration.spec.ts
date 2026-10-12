// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { assert, describe, it } from "vitest";

describe("pagination customization regeneration", () => {
  it("merges a generated default API version update without losing paging options", () => {
    const source = readFileSync(
      new URL("../../src/blocklist/api/operations.ts", import.meta.url),
      "utf8",
    );
    const baseline = readFileSync(
      new URL("../../generated/blocklist/api/operations.ts", import.meta.url),
      "utf8",
    );
    const version = /context\.apiVersion \?\? "([^"]+)"/.exec(baseline);
    assert.isNotNull(version);
    const regenerated = baseline.replaceAll(version![1], "2099-01-01-preview");
    const directory = mkdtempSync(join(tmpdir(), "contentsafety-regeneration-"));
    try {
      const paths = ["customized.ts", "baseline.ts", "regenerated.ts"].map((name) =>
        join(directory, name),
      );
      for (const [index, text] of [source, baseline, regenerated].entries()) {
        writeFileSync(paths[index], text);
      }
      const merged = execFileSync("git", ["merge-file", "-p", ...paths], { encoding: "utf8" });

      assert.notMatch(merged, /^(<<<<<<<|=======|>>>>>>>)/m);
      assert.equal(merged.match(/requestOptions: options/g)?.length, 2);
      assert.include(merged, 'maxPageSizeParamName: "maxpagesize"');
      assert.notInclude(merged, version![1]);
      assert.include(merged, "2099-01-01-preview");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it("preserves open strings and native Agent Hooks JSON customizations", () => {
    const source = readFileSync(new URL("../../src/models/models.ts", import.meta.url), "utf8");
    const baseline = readFileSync(
      new URL("../../generated/models/models.ts", import.meta.url),
      "utf8",
    );
    const regenerated = baseline.replace(
      "Copyright (c) Microsoft Corporation.",
      "Copyright (c) Microsoft Corporation. Generated refresh.",
    );
    const directory = mkdtempSync(join(tmpdir(), "contentsafety-model-regeneration-"));
    try {
      const paths = ["customized.ts", "baseline.ts", "regenerated.ts"].map((name) =>
        join(directory, name),
      );
      for (const [index, text] of [source, baseline, regenerated].entries()) {
        writeFileSync(paths[index], text);
      }
      const merged = execFileSync("git", ["merge-file", "-p", ...paths], { encoding: "utf8" });

      assert.notMatch(merged, /^(<<<<<<<|=======|>>>>>>>)/m);
      assert.match(merged, /export type AacsSubjectRole =[^;]+\| \(string & \{\}\);/s);
      assert.match(merged, /export type AgentPolicyLayerKind =[^;]+\| \(string & \{\}\);/s);
      assert.match(merged, /export type AgentEvaluationErrorCode =[^;]+\| \(string & \{\}\);/s);
      assert.include(
        merged,
        "return serializeRecord(item, undefined, agentHarmResultDeserializer);",
      );
      assert.include(
        merged,
        'target: agentInitializationSerializer(item["target"] as AgentInitialization)',
      );
      assert.include(merged, 'item["target"] === item["toolCall"].args');
      assert.include(merged, "Generated refresh.");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
