// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { PartitionKey } from "../../documents";
/**
 * Continuation token for change feed of entire container, or a specific Epk Range.
 * @internal
 */
export class ContinuationTokenForPartitionKey {
  /**
   * rid of the container for which the continuation token is issued.
   */
  public readonly rid: string;
  /**
   * A specific Partition key in the container for which the continuation token is issued.
   */
  public readonly partitionKey: PartitionKey;
  /**
   * Continuation value for the specific Partition key in the container.
   */
  public Continuation: string;

  constructor(rid: string, partitionKey: PartitionKey, continuation: string) {
    this.rid = rid;
    this.partitionKey = partitionKey;
    this.Continuation = continuation;
  }
}
