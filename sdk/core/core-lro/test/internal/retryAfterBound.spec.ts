// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, beforeEach } from "vitest";
import type * as coreUtil from "@azure/core-util";

// Capture every interval that the poller schedules with `delay` and resolve
// immediately so the test does not actually wait for the (bounded) interval.
const { delayCalls } = vi.hoisted(() => ({ delayCalls: [] as number[] }));

vi.mock("@azure/core-util", async (importOriginal) => {
  const original = await importOriginal<typeof coreUtil>();
  return {
    ...original,
    delay: vi.fn(async (timeInMs: number): Promise<void> => {
      delayCalls.push(timeInMs);
    }),
  };
});

import { createTestPoller } from "../utils/router.js";
import { MAX_POLLING_INTERVAL_IN_MS, POLL_INTERVAL_IN_MS } from "../../src/poller/constants.js";

async function runPoller(options: { intervalInMs?: number; retryAfter?: string }): Promise<void> {
  const { intervalInMs, retryAfter } = options;
  const pollingPath = "path/poll";
  const poller = createTestPoller({
    ...(intervalInMs === undefined ? {} : { intervalInMs }),
    routes: [
      {
        method: "PUT",
        status: 202,
        headers: {
          "operation-location": pollingPath,
        },
      },
      {
        method: "GET",
        path: pollingPath,
        status: 200,
        ...(retryAfter === undefined ? {} : { headers: { "retry-after": retryAfter } }),
        body: JSON.stringify({ status: "InProgress" }),
      },
      {
        method: "GET",
        path: pollingPath,
        status: 200,
        body: JSON.stringify({ status: "Succeeded" }),
      },
      {
        method: "GET",
        path: "path",
        status: 200,
        body: JSON.stringify({ id: "done" }),
      },
    ],
    throwOnNon2xxResponse: true,
  });

  const result = await poller.pollUntilDone();
  assert.equal(result.statusCode, 200);
}

describe("poller bounds oversized polling intervals", () => {
  beforeEach(() => {
    delayCalls.length = 0;
  });

  it("bounds an oversized server-provided Retry-After value", async () => {
    // Converted to milliseconds this is 999999999000, which Node.js would clamp
    // to a 1 ms timer if it were scheduled without bounding.
    await runPoller({ retryAfter: "999999999" });

    assert.deepEqual(delayCalls, [MAX_POLLING_INTERVAL_IN_MS]);
  });

  it("bounds a far-future HTTP-date Retry-After value", async () => {
    const retryAfter = new Date(Date.now() + MAX_POLLING_INTERVAL_IN_MS + 60_000).toUTCString();

    await runPoller({ retryAfter });

    assert.deepEqual(delayCalls, [MAX_POLLING_INTERVAL_IN_MS]);
  });

  it("bounds an oversized caller-provided intervalInMs", async () => {
    await runPoller({ intervalInMs: 999999999000 });

    assert.deepEqual(delayCalls, [MAX_POLLING_INTERVAL_IN_MS]);
  });

  it("preserves a caller-provided interval at the maximum", async () => {
    await runPoller({ intervalInMs: MAX_POLLING_INTERVAL_IN_MS });

    assert.deepEqual(delayCalls, [MAX_POLLING_INTERVAL_IN_MS]);
  });

  it("uses the default for a non-finite caller-provided interval", async () => {
    await runPoller({ intervalInMs: Infinity });

    assert.deepEqual(delayCalls, [POLL_INTERVAL_IN_MS]);
  });

  it("preserves the configured interval for a non-finite Retry-After value", async () => {
    const configuredIntervalInMs = 5000;

    await runPoller({
      intervalInMs: configuredIntervalInMs,
      retryAfter: "9".repeat(400),
    });

    assert.deepEqual(delayCalls, [configuredIntervalInMs]);
  });
});
