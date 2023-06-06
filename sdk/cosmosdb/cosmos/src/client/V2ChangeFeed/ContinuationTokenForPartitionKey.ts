import { PartitionKey } from "../../documents";

export class ContinuationTokenForPartitionKey {
  public readonly rid: string;

  public readonly partitionKey: PartitionKey;

  public Continuation: string;

  constructor(rid: string, partitionKey: PartitionKey, continuation: string) {
    this.rid = rid;
    this.partitionKey = partitionKey;
    this.Continuation = continuation;
  }
}
