import { MockedQueryIterator } from "./MockQueryIterator";

export class MockedDocumentClient {
  constructor(private partitionKeyRanges: any, private collectionId: any) {}
  public readPartitionKeyRanges(collectionLink: any) {
    return new MockedQueryIterator(this.partitionKeyRanges);
  }
  public getIdFromLink() {
    return this.collectionId;
  }
}
