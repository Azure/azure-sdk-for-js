// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ACTIVE_SESSIONS_SENTINEL_MS } from "../../../src/serviceBusClient.js";
import { describe, it } from "vitest";
import { expect } from "../../public/utils/chai.js";

/**
 * Unit tests for the active-messages sentinel value used by listMessageSessions.
 *
 * The service checks `lastUpdatedTime != DateTime.MaxValue` (exact equality) to switch
 * between "active messages" mode and "updated since" mode. The .NET AMQP library
 * (TimeStampEncoding.cs) encodes DateTime.MaxValue as 253402300800000 ms
 * (10000-01-01T00:00:00Z) due to double-to-long rounding in TotalMilliseconds.
 * Sending 253402300799999 (1 ms less) fails this check and the service returns
 * empty results instead of sessions with active messages.
 */
describe("listMessageSessions sentinel", function (): void {
  it("sentinel matches .NET AMQP encoding of DateTime.MaxValue (253402300800000 ms)", () => {
    expect(ACTIVE_SESSIONS_SENTINEL_MS).to.equal(253402300800000);
  });

  it("sentinel represents 10000-01-01T00:00:00.000Z", () => {
    const d = new Date(ACTIVE_SESSIONS_SENTINEL_MS);
    expect(d.getTime()).to.equal(253402300800000);
    expect(d.toISOString()).to.equal("+010000-01-01T00:00:00.000Z");
  });

  it("sentinel is exactly 1ms more than DateTime.MaxValue at ms precision (253402300799999)", () => {
    // 253402300799999 is 9999-12-31T23:59:59.999Z — the last ms of year 9999.
    // The .NET AMQP decoder does NOT clamp this to DateTime.MaxValue, so the
    // service takes the wrong code path. Our sentinel must be the next ms.
    expect(ACTIVE_SESSIONS_SENTINEL_MS).to.equal(253402300799999 + 1);
  });
});
