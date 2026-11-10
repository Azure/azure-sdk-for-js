// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { spawnSync } = require("node:child_process");
const { copyFileSync, rmSync } = require("node:fs");
const path = require("node:path");

const args = process.argv.slice(2);
if (
  args.some((arg) => !["--release", "--allocator=system", "--allocator=mimalloc"].includes(arg)) ||
  new Set(args).size !== args.length ||
  args.filter((arg) => arg.startsWith("--allocator=")).length > 1
) {
  throw new Error("Usage: node rust-prototype/build.cjs [--release] [--allocator=system|mimalloc]");
}
const release = args.includes("--release");
const allocator = args.includes("--allocator=mimalloc") ? "mimalloc" : "system";
const addon = path.join(
  __dirname,
  allocator === "mimalloc"
    ? "cosmos_js_rust_prototype_mimalloc.node"
    : "cosmos_js_rust_prototype.node",
);
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
    ...(allocator === "mimalloc" ? ["--features", "allocator-mimalloc"] : []),
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
console.log(`Built native probe (${release ? "release" : "dev"}, ${allocator}): ${addon}`);
