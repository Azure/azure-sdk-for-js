// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");
const { resolve } = require("node:path");
const { isDeepStrictEqual } = require("node:util");
const { test } = require("node:test");

function createClient(CosmosClient, implementation) {
  const selector = "AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION";
  const previous = process.env[selector];
  try {
    process.env[selector] = implementation;
    return new CosmosClient({
      endpoint: process.env.ACCOUNT_HOST,
      key: process.env.ACCOUNT_KEY,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });
  } finally {
    if (previous === undefined) delete process.env[selector];
    else process.env[selector] = previous;
  }
}

function assertV2(response, statusCode) {
  const evidence = response.diagnostics.experimentalRustRead;
  assert.equal(evidence?.coverage, "partial");
  const requests = evidence.requests.requests.filter(
    (request) => request.pipeline === "data_plane",
  );
  assert.ok(
    requests.some(
      (request) => request.transport === "gateway_v2" && request.statusCode === statusCode,
    ),
    "The public Rust read must retain Gateway V2 evidence.",
  );
  assert.ok(
    !requests.some(
      (request) => request.transport === "gateway" && request.statusCode === statusCode,
    ),
    "Gateway V1 fallback does not qualify.",
  );
}

for (const format of ["commonjs", "esm"]) {
  test(`public legacy/Rust read parity (${format})`, { timeout: 120_000 }, async (t) => {
    assert.ok(
      process.env.ACCOUNT_HOST && process.env.ACCOUNT_KEY,
      "Account credentials are required.",
    );
    const endpoint = new URL(process.env.ACCOUNT_HOST);
    assert.ok(
      endpoint.protocol === "https:" && endpoint.hostname.split(".")[0] === "rust-migration-eastus",
      "This live check is restricted to the authorized prototype account.",
    );
    const sdk =
      format === "commonjs"
        ? require("../dist/commonjs/index.js")
        : await import("../dist/esm/index.js");
    const bindingVariable = "AZURE_COSMOS_EXPERIMENTAL_NATIVE_BINDING_PATH";
    const previousBinding = process.env[bindingVariable];
    process.env[bindingVariable] = resolve(__dirname, "cosmos_js_rust_prototype.node");
    const legacy = createClient(sdk.CosmosClient, "javascript");
    const rust = createClient(sdk.CosmosClient, "rust");
    const target = (client, id = "order-17") =>
      client
        .database("js_rust_read_item_db")
        .container("js_rust_read_item_container")
        .item(id, "customer-17");
    try {
      const legacyItem = target(legacy);
      const rustItem = target(rust);
      await t.test("public ItemResponse, resource and metadata match", async () => {
        const [legacyResponse, rustResponse] = await Promise.all([
          legacyItem.read(),
          rustItem.read(),
        ]);
        // Original documentCRUDTest read assertions, with retained read-only setup.
        for (const response2 of [legacyResponse, rustResponse]) {
          const document2 = response2.resource;
          assert.equal("order-17", document2.id);
          assert.equal(typeof response2.requestCharge, "number");
          assert.equal(response2.statusCode, 200);
          assert.ok(response2 instanceof sdk.ItemResponse);
          assert.ok(Number.isFinite(Number(response2.headers["x-ms-request-charge"])));
          assert.ok(typeof response2.activityId === "string" && response2.activityId.length > 0);
        }
        assert.ok(rustResponse.item === rustItem);
        assert.ok(legacyResponse.item === legacyItem);
        assert.ok(
          rustResponse.etag === legacyResponse.etag,
          "Both reads must observe the same version.",
        );
        assert.ok(
          isDeepStrictEqual(rustResponse.resource, legacyResponse.resource),
          "Bodies must match.",
        );
        assertV2(rustResponse, 200);
        t.diagnostic(
          `Public Rust evidence: ${JSON.stringify(rustResponse.diagnostics.experimentalRustRead)}`,
        );
      });
      await t.test("missing items return public 404 responses rather than rejecting", async () => {
        const missingId = `missing-${randomUUID()}`;
        for (const owner of [legacy, rust]) {
          const response = await target(owner, missingId).read();
          // Original documentCRUDTest post-deletion assertions, without deleting data.
          assert.equal(response.statusCode, 404, "response should return error code 404");
          assert.equal(response.resource, undefined);
          assert.ok(response instanceof sdk.ItemResponse);
          if (owner === rust) assertV2(response, 404);
        }
      });
      await t.test("unsupported inputs reject explicitly", async () => {
        await assert.rejects(rustItem.read({ sessionToken: "0:1" }), /request options/);
        await assert.rejects(
          rust
            .database("js_rust_read_item_db")
            .container("js_rust_read_item_container")
            .item("order-17")
            .read(),
          /explicit single string partition key/,
        );
      });
      await t.test(
        "disposal preserves an accepted public read and rejects subsequent reads",
        async () => {
          const pending = rustItem.read();
          rust.dispose();
          rust.dispose();
          const response = await pending;
          assert.equal(response.statusCode, 200);
          assertV2(response, 200);
          await assert.rejects(rustItem.read(), /disposed/);
        },
      );
    } finally {
      legacy.dispose();
      rust.dispose();
      if (previousBinding === undefined) delete process.env[bindingVariable];
      else process.env[bindingVariable] = previousBinding;
    }
  });
}
