// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { MockedQueryIterator } from "./MockQueryIterator";

/** @hidden */
export class MockedClientContext {
  constructor(private partitionKeyRanges: any) {}
  public readPartitionKeyRanges(collectionLink: any) {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }

  public queryPartitionKeyRanges(collectionLink: any) {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }
}
