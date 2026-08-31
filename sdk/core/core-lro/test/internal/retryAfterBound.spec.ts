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
import { MAX_POLLING_INTERVAL_IN_MS } from "../../src/poller/constants.js";

describe("poller bounds oversized polling intervals", () => {
  beforeEach(() => {
    delayCalls.length = 0;
  });

  it("bounds an oversized server-provided Retry-After value", async () => {
    const pollingPath = "path/poll-oversized-retry";
    const poller = createTestPoller({
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
          headers: {
            // Oversized value from the bug report. Converted to milliseconds this
            // is 999999999000, which Node.js would clamp to a 1 ms timer.
            "retry-after": "999999999",
          },
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

    assert.isNotEmpty(delayCalls, "poller should have scheduled at least one delay");
    // The oversized interval must be bounded to the platform maximum rather than
    // overflowing into a near-continuous (1 ms) polling loop.
    assert.include(delayCalls, MAX_POLLING_INTERVAL_IN_MS);
    for (const interval of delayCalls) {
      assert.isAtMost(interval, MAX_POLLING_INTERVAL_IN_MS);
      assert.isAbove(interval, 1, "interval should not collapse to a near-continuous loop");
    }
  });

  it("bounds an oversized caller-provided intervalInMs", async () => {
    const pollingPath = "path/poll-oversized-interval";
    const poller = createTestPoller({
      // A caller-supplied interval that exceeds the platform timer range. Without
      // bounding, Node.js would schedule this as a 1 ms timer.
      intervalInMs: 999999999000,
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
          // No retry-after header, so the configured intervalInMs is used.
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

    assert.isNotEmpty(delayCalls, "poller should have scheduled at least one delay");
    assert.include(delayCalls, MAX_POLLING_INTERVAL_IN_MS);
    for (const interval of delayCalls) {
      assert.isAtMost(interval, MAX_POLLING_INTERVAL_IN_MS);
      assert.isAbove(interval, 1, "interval should not collapse to a near-continuous loop");
    }
  });
});
