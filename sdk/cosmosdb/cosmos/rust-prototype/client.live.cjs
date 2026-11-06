// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { NativeReadClient } = require("./cosmos_js_rust_prototype.node");

test(
  "initialize and release a real account driver without reading or modifying items",
  {
    timeout: 120_000,
  },
  async () => {
    const endpoint = process.env.ACCOUNT_HOST;
    const key = process.env.ACCOUNT_KEY;
    assert.ok(endpoint, "ACCOUNT_HOST must be set.");
    assert.ok(key, "ACCOUNT_KEY must be set.");

    const creation = NativeReadClient.create(endpoint, key);
    assert.ok(creation instanceof Promise);
    const client = await creation;
    try {
      assert.ok(client instanceof NativeReadClient);
      // Do not include account configuration in assertion failure output.
      assert.ok(client.accountEndpoint === new URL(endpoint).href, "Driver endpoint must match.");
    } finally {
      client.close();
    }
    client.close();
    assert.throws(() => client.accountEndpoint, /native read client is closed/);
  },
);
