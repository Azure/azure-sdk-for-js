// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isDefined } from "../util/typeGuards";

/**
 * @internal
 */
export class PartitionAssigner {
  private _partitions: string[] = [];

  private _lastRoundRobinPartitionIndex: number = -1;

  public setPartitionIds(partitionIds: string[]): void {
    this._partitions = partitionIds;
  }

  assignPartition({
    partitionId,
    partitionKey
  }: {
    partitionId?: string;
    partitionKey?: string;
  }): string {
    if (isDefined(partitionId) && isDefined(partitionKey)) {
      throw new Error(
        `The partitionId (${partitionId}) and partitionKey (${partitionKey}) cannot both be specified.`
      );
    }

    if (!this._partitions.length) {
      throw new Error(`Unable to determine partitionIds, can't assign partitionId.`);
    }

    if (isDefined(partitionId)) {
      return partitionId;
    }

    if (isDefined(partitionKey)) {
      return this._assignPartitionForPartitionKey(partitionKey);
    }

    return this._assignRoundRobinPartition();
  }

  private _assignPartitionForPartitionKey(partitionKey: string): string {
    //TODO: Implement hashing function
    return partitionKey ? this._partitions[0] : this._partitions[0];
  }

  private _assignRoundRobinPartition(): string {
    const maxPartitionIndex = this._partitions.length - 1;
    const proposedPartitionIndex = this._lastRoundRobinPartitionIndex + 1;

    const nextPartitionIndex =
      proposedPartitionIndex > maxPartitionIndex ? 0 : proposedPartitionIndex;

    this._lastRoundRobinPartitionIndex = nextPartitionIndex;
    return this._partitions[nextPartitionIndex];
  }
}
