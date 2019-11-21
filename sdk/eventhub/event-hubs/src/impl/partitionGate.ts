// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

export class PartitionGate {
  private _partitions = new Set<string>();

  add(partitionId: string | "all") {
    this._validatePartitionId(partitionId);

    if ((partitionId === "all" && this._partitions.size > 0) || this._partitions.has(partitionId) || this._partitions.has("all")) {
      throw new Error(`Partition ${partitionId} (or a subset) is already being processed`);
    }

    this._partitions.add(partitionId);
  }

  remove(partitionId: string | "all") {
    this._partitions.delete(partitionId);
  }

  private _validatePartitionId(partitionId: string) {
    if (partitionId === "all") {
      return;
    }

    const partitionNumber = parseInt(partitionId, 10);

    if (isNaN(partitionNumber)) {
      throw new TypeError(`Invalid partition number ${partitionId}`);
    }
  }
}
