// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const { runInNewContext } = require("node:vm");

const source = readFileSync(path.join(__dirname, "build.cjs"), "utf8");
const library = path.join(__dirname, "target", "release", "libcosmos_js_rust_prototype.so");
const addon = path.join(__dirname, "cosmos_js_rust_prototype.node");
const artifact = {
  reason: "compiler-artifact",
  target: { name: "cosmos_js_rust_prototype", crate_types: ["cdylib"] },
  filenames: [library],
};

function runBuild(args, result, events) {
  runInNewContext(source, {
    __dirname,
    process: {
      argv: ["node", "build.cjs", ...args],
      exit(status) {
        throw new Error(`exit ${status}`);
      },
    },
    console: { log() {} },
    require(name) {
      if (name === "node:path") return path;
      if (name === "node:fs") {
        return {
          rmSync(filename) {
            events.push(["remove", filename]);
          },
          copyFileSync(from, to) {
            events.push(["copy", from, to]);
          },
        };
      }
      assert.equal(name, "node:child_process");
      return {
        spawnSync(command, cargoArgs, options) {
          events.push(["cargo", command, Array.from(cargoArgs)]);
          assert.equal(options.cwd, __dirname);
          return result;
        },
      };
    },
  });
}

for (const args of [[], ["--release"]]) {
  test(`build preserves locked dependencies with ${args.length ? "release" : "default dev"} profile`, () => {
    const events = [];
    runBuild(args, { status: 0, stdout: JSON.stringify(artifact) }, events);
    assert.deepEqual(events, [
      ["remove", addon],
      [
        "cargo",
        "cargo",
        ["build", "--locked", "--lib", "--message-format=json-render-diagnostics", ...args],
      ],
      ["copy", library, addon],
    ]);
  });
}

test("invalid build arguments fail before removing the existing addon", () => {
  for (const args of [["--unknown"], ["--release", "--release"]]) {
    const events = [];
    assert.throws(() => runBuild(args, undefined, events), /Usage:/);
    assert.deepEqual(events, []);
  }
});

test("a failed Cargo build removes the stale addon without copying a library", () => {
  const events = [];
  assert.throws(() => runBuild(["--release"], { status: 101, stdout: "" }, events), /exit 101/);
  assert.equal(events[0][0], "remove");
  assert.equal(events.length, 2);
});

test("a failed Cargo launch is surfaced without copying a library", () => {
  const events = [];
  const error = new Error("cargo unavailable");
  assert.throws(
    () => runBuild([], { error }, events),
    (actual) => actual === error,
  );
  assert.equal(events.length, 2);
});

test("missing or ambiguous native artifacts fail without copying a library", () => {
  for (const messages of [[], [artifact, artifact]]) {
    const events = [];
    assert.throws(
      () =>
        runBuild(
          [],
          { status: 0, stdout: messages.map((message) => JSON.stringify(message)).join("\n") },
          events,
        ),
      /Expected one native library/,
    );
    assert.equal(events.length, 2);
  }
});
