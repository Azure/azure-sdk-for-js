// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { MockedQueryIterator } from "./MockQueryIterator";

/** @hidden */
export class MockedClientContext {
  constructor(private partitionKeyRanges: unknown) {}
  public readPartitionKeyRanges(): MockedQueryIterator {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }

  public queryPartitionKeyRanges(): MockedQueryIterator {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }
}
