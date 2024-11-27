// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MockedQueryIterator } from "./MockQueryIterator";
export class MockedClientContext {
  constructor(private partitionKeyRanges: unknown) {}
  public readPartitionKeyRanges(): MockedQueryIterator {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }

  public queryPartitionKeyRanges(): MockedQueryIterator {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }
}
