// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import type { ConfidentialLedgerClient } from "../../src/clientDefinitions.js";
import {
  getLedgerEntry,
  isLoadingResponse,
  MAX_LOADING_RETRIES,
  MAX_NOT_FOUND_RETRIES,
  waitForLedgerEntryCommit,
} from "../../src/pollingHelpers.js";

interface FakeResponse {
  status: string;
  body?: unknown;
}

/**
 * Builds a minimal fake {@link ConfidentialLedgerClient} whose `.path(...).get()`
 * dispatches to a per-path queue of pre-canned responses. Each path is keyed by
 * its template (e.g. `/app/transactions/{transactionId}`).
 */
function createFakeClient(responsesByPath: Record<string, FakeResponse[]>): {
  client: ConfidentialLedgerClient;
  callsByPath: Record<string, number>;
} {
  const callsByPath: Record<string, number> = {};

  const client = {
    path: (pathTemplate: string, ..._args: unknown[]) => {
      return {
        get: async (_options?: unknown) => {
          callsByPath[pathTemplate] = (callsByPath[pathTemplate] ?? 0) + 1;
          const queue = responsesByPath[pathTemplate];
          if (!queue || queue.length === 0) {
            throw new Error(`No more mock responses queued for path ${pathTemplate}`);
          }
          // Replay the last response if the queue is exhausted but still has items.
          const next = queue.length === 1 ? queue[0] : queue.shift()!;
          return next;
        },
      };
    },
  } as unknown as ConfidentialLedgerClient;

  return { client, callsByPath };
}

async function assertThrowsAsync(fn: () => Promise<unknown>, expected: RegExp): Promise<void> {
  let error: unknown;
  try {
    await fn();
  } catch (err) {
    error = err;
  }
  assert.ok(error, "Expected promise to reject but it resolved");
  assert.match((error as Error).message, expected);
}

describe("pollingHelpers / isLoadingResponse", () => {
  it("returns true for HTTP 200 with no entry property", () => {
    assert.isTrue(isLoadingResponse({ status: "200", body: { state: "Loading" } } as never));
  });

  it("returns false for HTTP 200 with an entry property", () => {
    assert.isFalse(
      isLoadingResponse({
        status: "200",
        body: { state: "Ready", entry: { contents: "hi" } },
      } as never),
    );
  });

  it("returns false for non-200 responses", () => {
    assert.isFalse(isLoadingResponse({ status: "404", body: {} } as never));
  });

  it("returns false for responses whose body is not a JSON object", () => {
    assert.isFalse(isLoadingResponse({ status: "200", body: "not-json" } as never));
    assert.isFalse(isLoadingResponse({ status: "200", body: undefined } as never));
  });
});

describe("pollingHelpers / getLedgerEntry", () => {
  const PATH = "/app/transactions/{transactionId}";

  it("returns immediately on first call when the entry is Ready", async () => {
    const ready: FakeResponse = {
      status: "200",
      body: { state: "Ready", entry: { contents: "hello", transactionId: "1.1" } },
    };
    const { client, callsByPath } = createFakeClient({ [PATH]: [ready] });

    const result = await getLedgerEntry(client, "1.1", { pollingIntervalInMs: 0 });

    assert.equal(result.status, "200");
    assert.deepEqual(result.body, ready.body);
    assert.equal(callsByPath[PATH], 1);
  });

  it("polls multiple times while the body is Loading, then returns Ready", async () => {
    const loading: FakeResponse = { status: "200", body: { state: "Loading" } };
    const ready: FakeResponse = {
      status: "200",
      body: { state: "Ready", entry: { contents: "value", transactionId: "2.2" } },
    };
    const { client, callsByPath } = createFakeClient({
      [PATH]: [loading, loading, loading, ready],
    });

    const result = await getLedgerEntry(client, "2.2", { pollingIntervalInMs: 0 });

    assert.equal(result.status, "200");
    assert.deepEqual(result.body, ready.body);
    // 1 initial + 3 polls
    assert.equal(callsByPath[PATH], 4);
  });

  it("stops after MaxLoadingRetries + 1 calls when the entry never becomes Ready", async () => {
    const loading: FakeResponse = { status: "200", body: { state: "Loading" } };
    // Single-element queues are replayed indefinitely by the fake client.
    const { client, callsByPath } = createFakeClient({ [PATH]: [loading] });

    const result = await getLedgerEntry(client, "3.3", { pollingIntervalInMs: 0 });

    assert.equal(result.status, "200");
    assert.deepEqual(result.body, loading.body);
    assert.equal(callsByPath[PATH], MAX_LOADING_RETRIES + 1);
  });

  it("does not retry on a non-200 response", async () => {
    const notFound: FakeResponse = { status: "404", body: { error: { message: "missing" } } };
    const { client, callsByPath } = createFakeClient({ [PATH]: [notFound] });

    const result = await getLedgerEntry(client, "4.4", { pollingIntervalInMs: 0 });

    assert.equal(result.status, "404");
    assert.equal(callsByPath[PATH], 1);
  });

  it("throws on a null/empty transactionId", async () => {
    const { client } = createFakeClient({});
    await assertThrowsAsync(
      () => getLedgerEntry(client, "", { pollingIntervalInMs: 0 }),
      /transactionId/,
    );
    await assertThrowsAsync(
      () => getLedgerEntry(client, undefined as unknown as string, { pollingIntervalInMs: 0 }),
      /transactionId/,
    );
  });

  it("forwards collectionId as a query parameter when provided", async () => {
    const ready: FakeResponse = {
      status: "200",
      body: { state: "Ready", entry: { contents: "hi", transactionId: "5.5" } },
    };
    const get = vi.fn().mockResolvedValue(ready);
    const client = {
      path: vi.fn().mockReturnValue({ get }),
    } as unknown as ConfidentialLedgerClient;

    await getLedgerEntry(client, "5.5", {
      pollingIntervalInMs: 0,
      collectionId: "my-collection",
    });

    assert.deepEqual(get.mock.calls[0][0], {
      queryParameters: { collectionId: "my-collection" },
    });
  });
});

describe("pollingHelpers / waitForLedgerEntryCommit (PostLedgerEntry LRO)", () => {
  const STATUS_PATH = "/app/transactions/{transactionId}/status";

  it("returns immediately when the very first response is Committed", async () => {
    const committed: FakeResponse = {
      status: "200",
      body: { state: "Committed", transactionId: "1.1" },
    };
    const { client, callsByPath } = createFakeClient({ [STATUS_PATH]: [committed] });

    const result = await waitForLedgerEntryCommit(client, "1.1", { pollingIntervalInMs: 0 });

    assert.equal(result.status, "200");
    assert.equal(callsByPath[STATUS_PATH], 1);
  });

  it("treats HTTP 406 as Pending and keeps polling indefinitely", async () => {
    const pending406: FakeResponse = { status: "406", body: { error: { message: "no quorum" } } };
    const committed: FakeResponse = {
      status: "200",
      body: { state: "Committed", transactionId: "2.2" },
    };
    const { client, callsByPath } = createFakeClient({
      // > 3 consecutive 406s should be tolerated (no retry cap).
      [STATUS_PATH]: [pending406, pending406, pending406, pending406, pending406, committed],
    });

    const result = await waitForLedgerEntryCommit(client, "2.2", { pollingIntervalInMs: 0 });

    assert.equal(result.status, "200");
    assert.equal((result as { body: { state: string } }).body.state, "Committed");
    assert.equal(callsByPath[STATUS_PATH], 6);
  });

  it("tolerates up to MAX_NOT_FOUND_RETRIES consecutive 404s and then succeeds", async () => {
    const notFound: FakeResponse = { status: "404", body: { error: { message: "unknown txn" } } };
    const committed: FakeResponse = {
      status: "200",
      body: { state: "Committed", transactionId: "3.3" },
    };
    const { client, callsByPath } = createFakeClient({
      [STATUS_PATH]: [notFound, notFound, notFound, committed],
    });

    const result = await waitForLedgerEntryCommit(client, "3.3", { pollingIntervalInMs: 0 });

    assert.equal(result.status, "200");
    assert.equal(callsByPath[STATUS_PATH], 4);
  });

  it("surfaces failure after MAX_NOT_FOUND_RETRIES + 1 consecutive 404s", async () => {
    const notFound: FakeResponse = { status: "404", body: { error: { message: "unknown txn" } } };
    const { client, callsByPath } = createFakeClient({ [STATUS_PATH]: [notFound] });

    const result = await waitForLedgerEntryCommit(client, "4.4", { pollingIntervalInMs: 0 });

    assert.equal(result.status, "404");
    // 1 initial + MAX_NOT_FOUND_RETRIES additional polls before surfacing failure.
    assert.equal(callsByPath[STATUS_PATH], MAX_NOT_FOUND_RETRIES + 1);
  });

  it("resets the consecutive-404 counter on a 200 response", async () => {
    const notFound: FakeResponse = { status: "404", body: { error: { message: "unknown" } } };
    const pending: FakeResponse = {
      status: "200",
      body: { state: "Pending", transactionId: "5.5" },
    };
    const committed: FakeResponse = {
      status: "200",
      body: { state: "Committed", transactionId: "5.5" },
    };
    // 3x 404 (counter -> 3), 200 Pending (counter reset), 3x 404 again (counter -> 3),
    // then Committed. Without the reset this would exceed MAX_NOT_FOUND_RETRIES.
    const { client, callsByPath } = createFakeClient({
      [STATUS_PATH]: [
        notFound,
        notFound,
        notFound,
        pending,
        notFound,
        notFound,
        notFound,
        committed,
      ],
    });

    const result = await waitForLedgerEntryCommit(client, "5.5", { pollingIntervalInMs: 0 });

    assert.equal(result.status, "200");
    assert.equal((result as { body: { state: string } }).body.state, "Committed");
    assert.equal(callsByPath[STATUS_PATH], 8);
  });

  it("resets the consecutive-404 counter on a 406 response", async () => {
    const notFound: FakeResponse = { status: "404", body: { error: { message: "unknown" } } };
    const pending406: FakeResponse = { status: "406", body: { error: { message: "no quorum" } } };
    const committed: FakeResponse = {
      status: "200",
      body: { state: "Committed", transactionId: "6.6" },
    };
    const { client } = createFakeClient({
      [STATUS_PATH]: [
        notFound,
        notFound,
        notFound,
        pending406,
        notFound,
        notFound,
        notFound,
        committed,
      ],
    });

    const result = await waitForLedgerEntryCommit(client, "6.6", { pollingIntervalInMs: 0 });
    assert.equal(result.status, "200");
  });

  it("returns terminal non-200/404/406 responses unchanged", async () => {
    const serverError: FakeResponse = { status: "500", body: { error: { message: "boom" } } };
    const { client, callsByPath } = createFakeClient({ [STATUS_PATH]: [serverError] });

    const result = await waitForLedgerEntryCommit(client, "7.7", { pollingIntervalInMs: 0 });

    assert.equal(result.status, "500");
    assert.equal(callsByPath[STATUS_PATH], 1);
  });

  it("throws on a null/empty transactionId", async () => {
    const { client } = createFakeClient({});
    await assertThrowsAsync(
      () => waitForLedgerEntryCommit(client, "", { pollingIntervalInMs: 0 }),
      /transactionId/,
    );
  });
});
