// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { spawnSync } = require("node:child_process");
const { copyFileSync, rmSync } = require("node:fs");
const path = require("node:path");

const args = process.argv.slice(2);
if (args.length > 1 || (args.length === 1 && args[0] !== "--release")) {
  throw new Error("Usage: node rust-prototype/build.cjs [--release]");
}
const release = args[0] === "--release";
const addon = path.join(__dirname, "cosmos_js_rust_prototype.node");
// A failed rebuild must not leave a previous probe looking like the new build.
rmSync(addon, { force: true });
const build = spawnSync(
  "cargo",
  [
    "build",
    "--locked",
    "--lib",
    "--message-format=json-render-diagnostics",
    ...(release ? ["--release"] : []),
  ],
  {
    cwd: __dirname,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
    maxBuffer: 16 * 1024 * 1024,
  },
);
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const artifacts = build.stdout
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line))
  .filter(
    (message) =>
      message.reason === "compiler-artifact" &&
      message.target.name === "cosmos_js_rust_prototype" &&
      message.target.crate_types.includes("cdylib"),
  )
  .flatMap((message) => message.filenames)
  .filter((filename) => /\.(dll|dylib|so)$/.test(filename));
if (artifacts.length !== 1) {
  throw new Error(`Expected one native library from Cargo, received ${artifacts.length}.`);
}
copyFileSync(artifacts[0], addon);
console.log(`Built native probe (${release ? "release" : "dev"}): ${addon}`);
