// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const assert = require("node:assert/strict");
const { randomUUID } = require("node:crypto");
const { isDeepStrictEqual } = require("node:util");
const { test } = require("node:test");
const { CosmosClient } = require("../dist/commonjs/index.js");
const { NativeReadClient } = require("./cosmos_js_rust_prototype.node");

async function observe(promise) {
  try {
    return { response: await promise };
  } catch (error) {
    return { error };
  }
}

function safeOutcome(outcome) {
  // Driver messages and response bodies can contain account or customer information.
  const status = outcome.response?.statusCode ?? outcome.error?.statusCode ?? outcome.error?.code;
  const safeStatus = Number.isInteger(status) ? status : "unavailable";
  const stage = ["resolveContainer", "readItem"].includes(outcome.error?.stage)
    ? outcome.error.stage
    : "unavailable";
  return `status=${safeStatus}, rejected=${Boolean(outcome.error)}, stage=${stage}`;
}

function assertDiagnostics(diagnostics) {
  assert.ok(diagnostics, "Native diagnostics must be present.");
  assert.ok(Number.isInteger(diagnostics.requestCount));
  assert.equal(diagnostics.retainedRequestCount, diagnostics.requests.length);
  assert.ok(diagnostics.requestCount >= diagnostics.retainedRequestCount);
  for (const request of diagnostics.requests) {
    assert.ok(["metadata", "data_plane"].includes(request.pipeline));
    assert.ok(["gateway", "gateway_v2"].includes(request.transport));
    assert.ok(Number.isInteger(request.statusCode));
    assert.ok(!Object.hasOwn(request, "endpoint"), "Do not expose endpoints in this projection.");
  }
}

function assertDriverFailure(error) {
  assert.ok(error instanceof Error);
  assert.ok(["resolveContainer", "readItem"].includes(error.stage));
  assert.ok(Number.isInteger(error.statusCode));
  assert.equal(typeof error.fromWire, "boolean");
  if (error.fromWire) {
    assert.ok(error.response, "A wire failure must retain its response.");
    assert.equal(error.response.statusCode, error.statusCode);
    assert.ok(error.response.body === undefined || Buffer.isBuffer(error.response.body));
  } else {
    assert.equal(error.response, undefined);
  }
  if (error.diagnostics) assertDiagnostics(error.diagnostics);
}

test(
  "compare the native binding and legacy SDK on the same order",
  { timeout: 120_000 },
  async (t) => {
    const endpoint = process.env.ACCOUNT_HOST;
    const key = process.env.ACCOUNT_KEY;
    assert.ok(endpoint, "ACCOUNT_HOST must be set.");
    assert.ok(key, "ACCOUNT_KEY must be set.");
    const fixtureMode = process.env.COSMOS_RUST_PROTOTYPE_CREATE_TEST_FIXTURE;
    assert.ok(
      fixtureMode === undefined || fixtureMode === "1",
      "COSMOS_RUST_PROTOTYPE_CREATE_TEST_FIXTURE must be unset or exactly 1.",
    );
    const target = [
      fixtureMode === "1"
        ? `rust-prototype-${randomUUID()}`
        : (process.env.COSMOS_RUST_PROTOTYPE_DATABASE ?? "sales"),
      process.env.COSMOS_RUST_PROTOTYPE_CONTAINER ?? "orders",
      "order-17",
      "customer-17",
    ];
    assert.ok(target[0], "The target database name must not be empty.");
    assert.ok(target[1], "The target container name must not be empty.");

    const selector = "AZURE_COSMOS_EXPERIMENTAL_READ_IMPLEMENTATION";
    const previous = process.env[selector];
    let legacy;
    try {
      process.env[selector] = "javascript";
      legacy = new CosmosClient({
        endpoint,
        key,
        connectionPolicy: { enableBackgroundEndpointRefreshing: false },
      });
    } finally {
      if (previous === undefined) delete process.env[selector];
      else process.env[selector] = previous;
    }

    let native;
    let createdDatabase;
    try {
      if (fixtureMode === "1") {
        const database = await observe(legacy.databases.create({ id: target[0] }));
        assert.ok(!database.error, `Test database creation failed; ${safeOutcome(database)}.`);
        createdDatabase = database.response.database;
        console.info(`Temporary test database created: ${target[0]}`);
        const container = await observe(
          createdDatabase.containers.create({
            id: target[1],
            partitionKey: { paths: ["/customerId"] },
          }),
        );
        assert.ok(!container.error, `Test container creation failed; ${safeOutcome(container)}.`);
        const item = await observe(
          container.response.container.items.create({
            id: target[2],
            customerId: target[3],
            status: "submitted",
          }),
        );
        assert.ok(!item.error, `Test item creation failed; ${safeOutcome(item)}.`);
        assert.equal(item.response.statusCode, 201);
      }

      const creation = await observe(NativeReadClient.create(endpoint, key));
      assert.ok(!creation.error, `Native initialization failed; ${safeOutcome(creation)}.`);
      native = creation.response;

      await t.test("empty resource identifiers reject without issuing a read", async () => {
        for (let index = 0; index < 3; index++) {
          const input = [...target];
          input[index] = "";
          const promise = native.readItem(...input);
          assert.ok(promise instanceof Promise);
          await assert.rejects(promise, { code: "InvalidArg" });
        }
      });

      const [legacyOutcome, nativeOutcome] = await Promise.all([
        observe(legacy.database(target[0]).container(target[1]).item(target[2], target[3]).read()),
        observe(native.readItem(...target)),
      ]);
      t.diagnostic(`Legacy: ${safeOutcome(legacyOutcome)}. Native: ${safeOutcome(nativeOutcome)}.`);

      await t.test("native response or rejection preserves structured driver information", () => {
        if (nativeOutcome.error) assertDriverFailure(nativeOutcome.error);
        else {
          assertDiagnostics(nativeOutcome.response.diagnostics);
          t.diagnostic(
            `Native request evidence: ${JSON.stringify(nativeOutcome.response.diagnostics)}`,
          );
        }
      });

      await t.test(
        "successful reads preserve the original read assertions and the same item",
        () => {
          assert.equal(
            legacyOutcome.response?.statusCode,
            200,
            "The authorized item must exist for the legacy read.",
          );
          assert.ok(
            !nativeOutcome.error,
            `Native item read failed; ${safeOutcome(nativeOutcome)}.`,
          );
          const response = nativeOutcome.response;
          assert.equal(response.statusCode, 200);
          assert.ok(Buffer.isBuffer(response.body));
          let resource;
          try {
            resource = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(response.body));
          } catch {
            assert.fail("The native successful body must be valid UTF-8 JSON.");
          }
          // Copied read assertions from test/public/functional/item/item.spec.ts,
          // documentCRUDTest; the selected target replaces its shared write-based setup.
          for (const response2 of [
            legacyOutcome.response,
            { resource, requestCharge: response.requestCharge },
          ]) {
            const document2 = response2.resource;
            assert.equal(target[2], document2.id);
            assert.equal(typeof response2.requestCharge, "number");
          }
          assert.ok(resource.customerId === target[3], "The supplied partition key must match.");
          assert.ok(resource.status === "submitted", "The example order must be submitted.");
          assert.ok(
            response.etag === legacyOutcome.response.etag,
            "Both reads must observe the same item version before comparing content.",
          );
          assert.ok(
            isDeepStrictEqual(resource, legacyOutcome.response.resource),
            "Parsed item bodies must match.",
          );
          assert.ok(typeof response.activityId === "string" && response.activityId.length > 0);
          assert.ok(Number.isFinite(response.requestCharge) && response.requestCharge >= 0);
        },
      );

      await t.test("the successful data read has retained Gateway V2 evidence", () => {
        assert.ok(
          !nativeOutcome.error,
          `No successful native read; ${safeOutcome(nativeOutcome)}.`,
        );
        const response = nativeOutcome.response;
        assert.equal(response.statusCode, 200);
        const requests = response.diagnostics.requests.filter(
          (request) => request.pipeline === "data_plane",
        );
        assert.ok(
          requests.some(
            (request) => request.transport === "gateway_v2" && request.statusCode === 200,
          ),
          "A successful data-plane Gateway V2 attempt must be retained; HTTP/2 or initialization is insufficient.",
        );
        assert.ok(
          !requests.some(
            (request) => request.transport === "gateway" && request.statusCode === 200,
          ),
          "A successful Gateway V1 fallback does not qualify.",
        );
      });

      if (createdDatabase) {
        await t.test(
          "a missing fixture item retains 404 while exposing the native/public difference",
          async () => {
            const missingId = `${target[2]}-missing`;
            const [legacyMissing, nativeMissing] = await Promise.all([
              observe(
                legacy.database(target[0]).container(target[1]).item(missingId, target[3]).read(),
              ),
              observe(native.readItem(target[0], target[1], missingId, target[3])),
            ]);
            assert.ok(
              !legacyMissing.error,
              `Legacy missing-item read failed; ${safeOutcome(legacyMissing)}.`,
            );
            // Copied missing-item assertions from documentCRUDTest's post-deletion read.
            const response = legacyMissing.response;
            assert.equal(response.statusCode, 404, "response should return error code 404");
            assert.equal(response.resource, undefined);
            assert.ok(nativeMissing.error, "The raw native API rejects driver failures.");
            assertDriverFailure(nativeMissing.error);
            assert.equal(nativeMissing.error.statusCode, 404);
            assert.equal(nativeMissing.error.stage, "readItem");
            assert.equal(nativeMissing.error.fromWire, true);
          },
        );
      }

      await t.test(
        "close rejects new reads but preserves an already accepted operation",
        async () => {
          const pending = native.readItem(...target);
          assert.ok(pending instanceof Promise);
          const observed = observe(pending);
          native.close();
          native.close();
          const closedRead = native.readItem(...target);
          assert.ok(closedRead instanceof Promise);
          await assert.rejects(closedRead, /native read client is closed/);
          const outcome = await observed;
          if (createdDatabase) {
            assert.ok(
              !outcome.error,
              `The accepted fixture read must succeed; ${safeOutcome(outcome)}.`,
            );
          }
          // An absent fixture can still prove that close did not replace the driver failure.
          if (outcome.error) assertDriverFailure(outcome.error);
          else {
            assert.equal(outcome.response.statusCode, 200);
            assert.ok(Buffer.isBuffer(outcome.response.body));
          }
        },
      );
    } finally {
      try {
        native?.close();
      } finally {
        try {
          if (createdDatabase) {
            const deletion = await observe(createdDatabase.delete());
            assert.ok(
              !deletion.error && deletion.response.statusCode === 204,
              `Temporary database cleanup failed for ${target[0]}; ${safeOutcome(deletion)}.`,
            );
            console.info(`Temporary test database deleted: ${target[0]}`);
          }
        } finally {
          legacy.dispose();
        }
      }
    }
  },
);
