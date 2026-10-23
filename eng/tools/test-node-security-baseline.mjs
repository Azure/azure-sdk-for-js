// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

const template = readFileSync(
  new URL("../pipelines/templates/steps/use-node-version.yml", import.meta.url),
  "utf8",
).replace(/\r\n/g, "\n");
const verification = template
  .split("  - pwsh: |\n")[1]
  ?.split('    displayName: "Verify Node Version"')[0]
  .replace(/^      /gm, "");
assert.ok(verification, "The template must verify the selected Node.js runtime.");

function verify(expected, actual, exitCode = 0) {
  const script = `
    $ErrorActionPreference = 'Stop'
    function node { $global:LASTEXITCODE = ${exitCode}; '${actual}' }
    function npm { 'test-npm-version' }
    ${verification.replace("${{ parameters.NodeVersion }}", expected)}
  `;
  const result = spawnSync("pwsh", ["-NoProfile", "-NonInteractive", "-Command", script], {
    encoding: "utf8",
    timeout: 30000,
  });
  if (result.error) throw result.error;
  assert.notEqual(result.status, null, result.stderr);
  return result;
}

for (const [expected, actual] of [
  ["22.23.4", "v22.23.4"],
  ["24.22.1", "v24.22.1"],
  ["26.12.1", "v26.12.1"],
  ["22", "v22.23.4"],
  ["22.x", "v22.23.4"],
  ["24.x", "v24.22.1"],
  ["26.x", "v26.12.1"],
  ["22.x", "v22.24.0"],
  ["24.x", "v24.23.0"],
  ["26.x", "v26.13.0"],
]) {
  test(`accepts ${actual} for ${expected}`, () => {
    const result = verify(expected, actual);
    assert.equal(result.status, 0, result.stderr);
  });
}

for (const [expected, actual] of [
  ["22.x", "v22.23.3"],
  ["24.x", "v24.22.0"],
  ["26.x", "v26.12.0"],
  ["22.x", "v22.0.0"],
  ["24.x", "v24.18.0"],
  ["20.x", "v20.20.0"],
  ["23.x", "v23.11.1"],
  ["25.x", "v25.9.0"],
  ["22.23.4", "v22.24.0"],
  ["24.22.1", "v24.22.2"],
  ["22.x", "v24.22.1"],
  ["26.x", "v26.12.1-rc.1"],
  ["22.x", "not-a-version"],
]) {
  test(`rejects ${actual} for ${expected}`, () => {
    const result = verify(expected, actual);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Node\.js/);
  });
}

test("fails when node --version fails", () => {
  assert.notEqual(verify("22.x", "v22.23.4", 1).status, 0);
});

test("pins the fixed CI runtimes and verifies even when installation is skipped", () => {
  const globals = readFileSync(
    new URL("../pipelines/templates/variables/globals.yml", import.meta.url),
    "utf8",
  );
  for (const [line, version] of [
    ["MAINTENANCE", "22.23.4"],
    ["ACTIVE", "24.22.1"],
    ["CURRENT", "26.12.1"],
  ]) {
    assert.ok(globals.includes(`NODE_VERSION_LTS_${line}: '${version}'`));
  }
  assert.match(template, /version: \$\{\{ parameters\.NodeVersion \}\}/);
  assert.equal((template.match(/condition:/g) ?? []).length, 1);
  assert.match(template, /condition: \$\{\{ parameters\.InstallCondition \}\}/);
  assert.equal(readFileSync(new URL("../../.nvmrc", import.meta.url), "utf8").trim(), "22.23.4");
});

test("passes the perf Node selector through without appending another wildcard", () => {
  const perf = readFileSync(
    new URL("../pipelines/templates/jobs/perf.yml", import.meta.url),
    "utf8",
  );
  assert.match(perf, /NodeVersion: \$\{\{ parameters\.LanguageVersion \}\}\s*$/m);
});

test("keeps Monitor packages on the same security baseline", () => {
  const expected = "^22.23.4 || ^24.22.1 || >=26.12.1";
  for (const pkg of [
    "monitor-opentelemetry",
    "monitor-opentelemetry-exporter",
    "monitor-opentelemetry-perf-tests",
  ]) {
    const base = new URL(`../../sdk/monitor/${pkg}/`, import.meta.url);
    const manifest = JSON.parse(readFileSync(new URL("package.json", base), "utf8"));
    assert.equal(manifest.engines.node, expected, pkg);
  }
});
