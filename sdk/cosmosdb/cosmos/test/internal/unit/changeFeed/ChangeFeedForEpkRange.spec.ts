// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChangeFeedForEpkRange, ChangeFeedMode } from "../../../../src/client/ChangeFeed/index.js";
import type { ClientContext } from "../../../../src/index.js";
import { Container, ErrorResponse, TimeoutError } from "../../../../src/index.js";
import { PartitionKeyRangeCache, QueryRange } from "../../../../src/routing/index.js";
import { ChangeFeedRange } from "../../../../src/client/ChangeFeed/ChangeFeedRange.js";
import { MockedClientContext } from "../../../public/common/MockClientContext.js";
import { describe, it, assert, beforeEach, afterEach, vi, expect } from "vitest";

interface Resource {
  id: string;
  [key: string]: any;
}

class MockClientContext extends MockedClientContext {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(partitionKeyRanges: unknown) {
    super(partitionKeyRanges);
  }
  public queryFeed(): any {
    throw new TimeoutError();
  }
  public getClientConfig(): any {
    return {};
  }
  public recordDiagnostics(): void {
    return;
  }
}

describe("ChangeFeedForEpkRange Unit Tests", () => {
  const partitionKeyRanges = [{ id: "0", minInclusive: "", maxExclusive: "FF" }];

  const clientContext: ClientContext = new MockClientContext(partitionKeyRanges) as any;
  const partitionKeyRangeCache = new PartitionKeyRangeCache(clientContext);
  let container: Container;
  let changeFeedForEpkRange: ChangeFeedForEpkRange<Resource>;

  beforeEach(() => {
    vi.mock("../../../../src/index.js", async (importOriginal) => {
      const MockContainer = vi.fn();

      return {
        // eslint-disable-next-line @typescript-eslint/consistent-type-imports
        ...(await importOriginal<typeof import("../../../../src/index.js")>()),
        Container: MockContainer,
      };
    });

    container = new Container(expect.anything(), expect.anything(), expect.anything());

    // Initialize ChangeFeedForEpkRange instance with mocked dependencies
    changeFeedForEpkRange = new ChangeFeedForEpkRange<Resource>(
      clientContext,
      container as unknown as Container,
      partitionKeyRangeCache as PartitionKeyRangeCache,
      "resource-id",
      "/dbs/db/colls/coll",
      "https://localhost:8081/dbs/db/colls/coll",
      {
        continuationToken: undefined,
        startFromNow: false,
        startTime: undefined,
        changeFeedMode: ChangeFeedMode.LatestVersion,
        maxItemCount: 10,
        sessionToken: "session-token",
      },
      new QueryRange("", "FF", true, false),
    );

    vi.spyOn(changeFeedForEpkRange as any, "setIteratorRid").mockResolvedValueOnce({});
    vi.spyOn(changeFeedForEpkRange as any, "fillChangeFeedQueue").mockResolvedValueOnce({});
    (changeFeedForEpkRange as any).isInstantiated = true;

    const mockFeedRange = new ChangeFeedRange("", "FF", "abc");
    (changeFeedForEpkRange as any).queue.enqueue(mockFeedRange);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw TimeOutError instead of handling it internally", async () => {
    const timeOutError = new TimeoutError();

    try {
      await changeFeedForEpkRange.readNext();
      assert.fail("should throw exception");
    } catch (err) {
      assert(err instanceof ErrorResponse);
      assert.strictEqual(err.message, "Timeout Error");
      assert.strictEqual(err.code, timeOutError.code);
    }
  });
});
