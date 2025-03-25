// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChangeFeedForEpkRange, ChangeFeedMode } from "../../../../src/client/ChangeFeed/index.js";
import type { ClientContext } from "../../../../src/index.js";
import { Container, ErrorResponse, TimeoutError } from "../../../../src/index.js";
import { PartitionKeyRangeCache, QueryRange } from "../../../../src/routing/index.js";
import { ChangeFeedRange } from "../../../../src/client/ChangeFeed/ChangeFeedRange.js";
import { MockedClientContext } from "../../../public/common/MockClientContext.js";
import { describe, it, assert, expect, beforeEach, afterEach, vi } from "vitest";

interface Resource {
  id: string;
  [key: string]: any;
}

vi.mock("../../../../src/index.js", async (importActual) => {
  const ContainerMock = vi.fn();

  const actual = await importActual<typeof import("../../../../src/index.js")>();
  return {
    ...actual,
    Container: ContainerMock,
  };
});

class MockClientContext extends MockedClientContext {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(partitionKeyRanges: unknown) {
    super(partitionKeyRanges);
  }
  public queryFeed() {
    throw new TimeoutError();
  }
  public getClientConfig() {
    return {};
  }
  public recordDiagnostics() {
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
    container = new Container(expect.anything(), expect.anything(), expect.anything());

    // Initialize ChangeFeedForEpkRange instance with mocked dependencies
    changeFeedForEpkRange = new ChangeFeedForEpkRange<Resource>(
      clientContext,
      container,
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

    vi.mocked((changeFeedForEpkRange as any).setIteratorRid).mockResolvedValue();
    vi.mocked((changeFeedForEpkRange as any).fillChangeFeedQueue).mockResolvedValue();
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
