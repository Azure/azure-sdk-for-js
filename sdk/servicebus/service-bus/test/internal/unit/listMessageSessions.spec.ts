// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ACTIVE_SESSIONS_SENTINEL_MS, ServiceBusClient } from "../../../src/serviceBusClient.js";
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

/**
 * Verifies what listMessageSessions actually puts on the wire, by stubbing the
 * management client and recording each request. These assertions fail if the
 * sentinel stops reaching the service, if the skip cursor stops advancing, or if
 * a zero page size is passed through as a request for zero sessions.
 */
describe("listMessageSessions request", function (): void {
  function stubbedClient(pages: string[][]): {
    client: ServiceBusClient;
    calls: Array<{ skip: number; top: number; lastUpdatedTime?: Date }>;
  } {
    const client = new ServiceBusClient(
      "Endpoint=sb://fake.servicebus.windows.net/;SharedAccessKeyName=key;SharedAccessKey=c2VjcmV0",
    );
    const calls: Array<{ skip: number; top: number; lastUpdatedTime?: Date }> = [];
    const queue = [...pages];
    (client as any)._connectionContext.getManagementClient = () => ({
      listMessageSessions: async (
        skip: number,
        top: number,
        lastUpdatedTime?: Date,
      ): Promise<string[]> => {
        calls.push({ skip, top, lastUpdatedTime });
        return queue.shift() ?? [];
      },
    });
    return { client, calls };
  }

  it("puts the active-messages sentinel Date on the wire by default", async () => {
    const { client, calls } = stubbedClient([["s1"]]);
    const ids: string[] = [];
    for await (const id of client.listMessageSessions("myqueue")) {
      ids.push(id);
    }
    expect(ids).to.eql(["s1"]);
    expect(calls).to.have.lengthOf(1);
    expect(calls[0].lastUpdatedTime).to.be.instanceOf(Date);
    expect(calls[0].lastUpdatedTime!.getTime()).to.equal(ACTIVE_SESSIONS_SENTINEL_MS);
    expect(calls[0].skip).to.equal(0);
    expect(calls[0].top).to.equal(100);
    await client.close();
  });

  it("puts the caller timestamp on the wire in updated-since mode", async () => {
    const since = new Date("2026-01-01T00:00:00.000Z");
    const { client, calls } = stubbedClient([["s1"]]);
    for await (const _id of client.listMessageSessions("myqueue", {
      sessionStateUpdatedAfter: since,
    })) {
      // drain
    }
    expect(calls[0].lastUpdatedTime!.getTime()).to.equal(since.getTime());
    await client.close();
  });

  it("advances skip by the returned page size across pages", async () => {
    const fullPage = Array.from({ length: 100 }, (_, i) => `s${i}`);
    const { client, calls } = stubbedClient([fullPage, ["tail"]]);
    const ids: string[] = [];
    for await (const id of client.listMessageSessions("myqueue")) {
      ids.push(id);
    }
    expect(ids).to.have.lengthOf(101);
    expect(calls).to.have.lengthOf(2);
    expect(calls[0].skip).to.equal(0);
    expect(calls[1].skip).to.equal(100);
    await client.close();
  });

  it("treats a zero maxPageSize as unset instead of asking for zero sessions", async () => {
    const { client, calls } = stubbedClient([["s1"]]);
    for await (const _page of client.listMessageSessions("myqueue").byPage({ maxPageSize: 0 })) {
      // drain
    }
    expect(calls[0].top).to.equal(100);
    await client.close();
  });
});
