// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "assert";
import sinon from "sinon";
import { ChangeFeedForEpkRange, ChangeFeedMode } from "../../../../src/client/ChangeFeed";
import type { ClientContext } from "../../../../src";
import { Container, ErrorResponse, TimeoutError } from "../../../../src";
import { PartitionKeyRangeCache, QueryRange } from "../../../../src/routing";
import { ChangeFeedRange } from "../../../../src/client/ChangeFeed/ChangeFeedRange";
import { MockedClientContext } from "../../../public/common/MockClientContext";

interface Resource {
  id: string;
  [key: string]: any;
}

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
  let container: sinon.SinonStubbedInstance<Container>;
  let changeFeedForEpkRange: ChangeFeedForEpkRange<Resource>;

  beforeEach(() => {
    container = sinon.createStubInstance(Container);

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

    sinon.stub(changeFeedForEpkRange as any, "setIteratorRid").resolves();
    sinon.stub(changeFeedForEpkRange as any, "fillChangeFeedQueue").resolves();
    (changeFeedForEpkRange as any).isInstantiated = true;

    const mockFeedRange = new ChangeFeedRange("", "FF", "abc");
    (changeFeedForEpkRange as any).queue.enqueue(mockFeedRange);
  });

  afterEach(() => {
    sinon.restore();
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
