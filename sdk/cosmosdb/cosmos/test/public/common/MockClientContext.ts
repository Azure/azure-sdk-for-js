// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MockedQueryIterator } from "./MockQueryIterator.js";
import { PartitionKeyRangeCache } from "../../../src/routing/index.js";

export class MockedClientContext {
  public partitionKeyRangeCache: PartitionKeyRangeCache;
  constructor(private partitionKeyRanges: unknown) {
    this.partitionKeyRangeCache = new PartitionKeyRangeCache(this as any);
  }
  public readPartitionKeyRanges(): MockedQueryIterator {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }

  public queryPartitionKeyRanges(): MockedQueryIterator {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }
}
