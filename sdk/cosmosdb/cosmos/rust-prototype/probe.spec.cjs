// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const path = require("node:path");
const { test } = require("node:test");
const bindingPath =
  process.env.AZURE_COSMOS_EXPERIMENTAL_NATIVE_BINDING_PATH ??
  path.join(__dirname, "cosmos_js_rust_prototype.node");
assert.ok(path.isAbsolute(bindingPath), "The native test binding path must be absolute");
const { NativeReadClient, probeAsync } = require(bindingPath);

test("the compiled Rust probe returns a Promise with the supplied item ID", async () => {
  const result = probeAsync("order-17");
  assert.ok(result instanceof Promise);
  assert.equal(await result, "rust-probe:order-17");
});

test("string conversion preserves Unicode and embedded null characters", async () => {
  const input = "order-\u00e9-\ud83d\ude80-\0-17";
  assert.equal(await probeAsync(input), `rust-probe:${input}`);
});

test("a Rust error rejects the Promise without preventing subsequent calls", async () => {
  const result = probeAsync("");
  assert.ok(result instanceof Promise);
  await assert.rejects(result, {
    code: "InvalidArg",
    message: "The native probe requires a non-empty value.",
  });
  assert.equal(await probeAsync("order-17"), "rust-probe:order-17");
});

test("overlapping calls retain their own inputs", async () => {
  const inputs = Array.from({ length: 32 }, (_, index) => `order-${index}`);
  const results = await Promise.all(inputs.map((input) => probeAsync(input)));
  assert.deepEqual(
    results,
    inputs.map((input) => `rust-probe:${input}`),
  );
});

test("native client construction must go through its asynchronous factory", () => {
  assert.throws(() => new NativeReadClient(), /constructor/i);
});

test("invalid account endpoints reject before driver initialization", async () => {
  for (const endpoint of [
    "not-a-url",
    "http://localhost:8081",
    "https://user:password@example.invalid",
    "https://example.invalid/dbs/sales",
    "https://example.invalid?query=value",
    "https://example.invalid#fragment",
  ]) {
    const result = NativeReadClient.create(endpoint, "unused-test-key");
    assert.ok(result instanceof Promise);
    await assert.rejects(result, { code: "InvalidArg" });
  }
});

test("missing account keys reject before driver initialization", async () => {
  for (const key of ["", "   "]) {
    await assert.rejects(NativeReadClient.create("https://example.invalid", key), {
      code: "InvalidArg",
      message: "An account key is required.",
    });
  }
});
