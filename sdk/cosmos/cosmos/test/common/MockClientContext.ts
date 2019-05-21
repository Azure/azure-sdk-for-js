import { MockedQueryIterator } from "./MockQueryIterator";

/** @hidden */
export class MockedClientContext {
  constructor(private partitionKeyRanges: any, private collectionId: any) {}
  public readPartitionKeyRanges(collectionLink: any) {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }

  public queryPartitionKeyRanges(collectionLink: any) {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }
}
