// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DEFAULT_LISTING_SENTINEL_MS, ServiceBusClient } from "../../../src/serviceBusClient.js";
import { translateServiceBusError } from "../../../src/serviceBusError.js";
import { describe, it } from "vitest";
import { expect } from "../../public/utils/chai.js";

/**
 * Unit tests for the default-listing sentinel value used by listMessageSessions.
 *
 * The service checks `lastUpdatedTime != DateTime.MaxValue` (exact equality) to switch
 * between default listing mode and updated-since mode. Default listing mode returns
 * sessions with active messages or stored session state. The .NET AMQP library
 * (TimeStampEncoding.cs) encodes DateTime.MaxValue as 253402300800000 ms
 * (10000-01-01T00:00:00Z) due to double-to-long rounding in TotalMilliseconds.
 * Sending 253402300799999 (1 ms less) fails this check and the service returns
 * empty results instead of sessions with active messages or stored session state.
 */
describe("listMessageSessions sentinel", function (): void {
  it("sentinel matches .NET AMQP encoding of DateTime.MaxValue (253402300800000 ms)", () => {
    // The only pin on the literal number in the repo: the constant is @internal,
    // so no api.md diff guards it, and the wire-value assertions elsewhere compare
    // against the constant itself. It must be 253402300800000, not 253402300799999
    // (the last ms of year 9999): sending the lower value fails the service's
    // DateTime.MaxValue equality check and takes the updated-since code path.
    expect(DEFAULT_LISTING_SENTINEL_MS).to.equal(253402300800000);
  });

  it("sentinel represents 10000-01-01T00:00:00.000Z", () => {
    // Pins the expanded-year ISO form (normative per ECMA-262), independent of
    // the numeric assertion above.
    const d = new Date(DEFAULT_LISTING_SENTINEL_MS);
    expect(d.toISOString()).to.equal("+010000-01-01T00:00:00.000Z");
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

  it("puts the default-listing sentinel Date on the wire by default", async () => {
    const { client, calls } = stubbedClient([["s1"]]);
    const ids: string[] = [];
    for await (const id of client.listMessageSessions("myqueue")) {
      ids.push(id);
    }
    expect(ids).to.eql(["s1"]);
    expect(calls).to.have.lengthOf(1);
    expect(calls[0].lastUpdatedTime).to.be.instanceOf(Date);
    expect(calls[0].lastUpdatedTime!.getTime()).to.equal(DEFAULT_LISTING_SENTINEL_MS);
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

  it("yields zero sessions (not one undefined) when the first page is empty", async () => {
    // getPagedAsyncIterator surfaces the raw value of a non-array first page, so
    // returning undefined for an empty first page would yield a single
    // `undefined` element. An empty array page must yield zero elements.
    const { client } = stubbedClient([[]]);
    const ids: string[] = [];
    for await (const id of client.listMessageSessions("myqueue")) {
      ids.push(id);
    }
    expect(ids).to.have.lengthOf(0);
    await client.close();
  });

  it("yields zero sessions (not one undefined) on a MessageNotFound rejection", async () => {
    const client = new ServiceBusClient(
      "Endpoint=sb://fake.servicebus.windows.net/;SharedAccessKeyName=key;SharedAccessKey=c2VjcmV0",
    );
    (client as any)._connectionContext.getManagementClient = () => ({
      listMessageSessions: async (): Promise<string[]> => {
        // Build the error the way the management path does: an AMQP rejection
        // carrying com.microsoft:message-not-found, run through
        // translateServiceBusError. This produces a ServiceBusError with
        // code === "MessageNotFound" and no statusCode -- the exact shape
        // production throws. A hand-assigned statusCode would make the guard
        // pass for a shape production can never emit.
        throw translateServiceBusError({
          condition: "com.microsoft:message-not-found",
          description: "The requested message was not found.",
        } as any);
      },
    });
    const ids: string[] = [];
    for await (const id of client.listMessageSessions("myqueue")) {
      ids.push(id);
    }
    expect(ids).to.have.lengthOf(0);
    await client.close();
  });
});
