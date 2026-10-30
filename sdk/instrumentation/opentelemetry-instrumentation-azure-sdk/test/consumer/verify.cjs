// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const { copyFileSync, mkdtempSync, readdirSync, rmSync, writeFileSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join, resolve } = require("node:path");
const { createRequire } = require("node:module");

const packageRoot = resolve(__dirname, "../..");
const pnpmCli = process.env.npm_execpath;
if (!pnpmCli) throw new Error("Run this verifier with pnpm test:consumer");
const directory = mkdtempSync(join(tmpdir(), "azure-otel-sdk3-consumer-"));

try {
  let dependency = process.argv[2];
  if (!dependency) {
    const tarball = join(directory, "azure-instrumentation.tgz");
    execFileSync(process.execPath, [pnpmCli, "pack", "--out", tarball], {
      cwd: packageRoot,
      stdio: "pipe",
      timeout: 60000,
    });
    dependency = `file:${tarball}`;
  } else if (dependency.endsWith(".tgz")) {
    dependency = `file:${resolve(dependency)}`;
  }
  writeFileSync(
    join(directory, "package.json"),
    JSON.stringify(
      {
        name: "azure-otel-sdk3-consumer",
        private: true,
        type: "module",
        dependencies: {
          "@azure/opentelemetry-instrumentation-azure-sdk": dependency,
          "@azure/storage-blob": "12.34.0",
          "@opentelemetry/api": "1.10.0",
          "@opentelemetry/core": "3.0.0",
          "@opentelemetry/instrumentation": "0.300.0",
          "@opentelemetry/instrumentation-express": "0.72.0",
          "@opentelemetry/instrumentation-http": "0.300.0",
          "@opentelemetry/sdk-node": "0.300.0",
          "@opentelemetry/sdk-trace": "3.0.0",
          express: "4.22.3",
        },
      },
      null,
      2,
    ),
  );
  const diagnostic = process.argv.includes("--diagnostic-nonstrict");
  if (diagnostic) {
    console.warn("Diagnostic only: peer validation disabled to isolate baseline runtime behavior");
  }
  execFileSync(
    process.execPath,
    [
      pnpmCli,
      "install",
      diagnostic ? "--strict-peer-dependencies=false" : "--strict-peer-dependencies",
      "--ignore-scripts",
      "--registry=https://registry.npmjs.org",
    ],
    {
      cwd: directory,
      stdio: "inherit",
      timeout: 120000,
    },
  );
  for (const name of readdirSync(__dirname)) {
    if (name !== "verify.cjs") copyFileSync(join(__dirname, name), join(directory, name));
  }
  // One root hook must cover both the contrib Express and Azure load paths.
  const consumerRequire = createRequire(join(directory, "package.json"));
  const results = [];
  let runtimeFailure;
  for (const [mode, arguments_] of [
    ["cjs", ["--require", "./bootstrap.cjs", "application.cjs"]],
    ["esm", ["--import", "./loader.mjs", "--import", "./bootstrap.mjs", "application.mjs"]],
  ]) {
    try {
      const stdout = execFileSync(process.execPath, arguments_, {
        cwd: directory,
        encoding: "utf8",
        timeout: 15000,
      });
      results.push({ mode, ...JSON.parse(stdout) });
    } catch (error) {
      runtimeFailure = error;
      results.push({ mode, failed: true });
    }
  }
  const azureBase = consumerRequire.resolve("@opentelemetry/instrumentation", {
    paths: [consumerRequire.resolve("@azure/opentelemetry-instrumentation-azure-sdk")],
  });
  const coreBase = consumerRequire.resolve("@opentelemetry/instrumentation");
  const azureIitm = createRequire(azureBase).resolve("import-in-the-middle");
  const coreIitm = createRequire(coreBase).resolve("import-in-the-middle");
  console.log(
    JSON.stringify(
      {
        results,
        sharedLoader: azureIitm === coreIitm,
        hook: consumerRequire.resolve("@opentelemetry/instrumentation/hook.mjs"),
      },
      null,
      2,
    ),
  );
  if (runtimeFailure) throw runtimeFailure;
  assert.equal(azureIitm, coreIitm, "Azure and the root loader must share the same IITM instance");
} finally {
  rmSync(directory, { recursive: true, force: true });
}
