// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GroupStateRecord } from "./models/index.js";

const GROUP_STATE_UPDATE_RETENTION_IN_MS = 5 * 60 * 1000;
const GROUP_STATE_CLEAR_RECORD_LIMIT = 200;

interface GroupStateCacheRecord {
  record: GroupStateRecord;
  /**
   * True when this record came from a recent real-time update and should survive a
   * snapshot that does not include it. Snapshot-origin records are not protected.
   */
  isProtectedFromSnapshotPrune: boolean;
  /** Client local time, in Unix epoch milliseconds, used to expire snapshot-prune protection. */
  latestUpdateReceivedAt?: number;
}

export class GroupStateManager {
  private readonly _records = new Map<string, GroupStateCacheRecord>();
  private _clearRecordCount = 0;

  public listStates(): GroupStateRecord[] {
    return Array.from(this._records.values())
      .map((entry) => entry.record)
      .filter((record) => record.state !== undefined)
      .map((record) => this._cloneRecord(record));
  }

  public applySnapshot(records: readonly GroupStateRecord[], now: number = Date.now()): boolean {
    this._pruneExpiredClearRecords(now);

    let hasMutation = false;
    const snapshotConnectionIds = new Set<string>();

    for (const record of records) {
      snapshotConnectionIds.add(record.connectionId);
      hasMutation =
        this._applyRecord(record, {
          isProtectedFromSnapshotPrune: false,
        }) || hasMutation;
    }

    this._records.forEach((entry, connectionId) => {
      if (!snapshotConnectionIds.has(connectionId) && !entry.isProtectedFromSnapshotPrune) {
        this._deleteRecord(connectionId);
        hasMutation = entry.record.state !== undefined || hasMutation;
      }
    });

    return hasMutation;
  }

  public applyUpdates(records: readonly GroupStateRecord[], now: number = Date.now()): boolean {
    let hasMutation = false;

    for (const record of records) {
      hasMutation =
        this._applyRecord(record, {
          isProtectedFromSnapshotPrune: true,
          latestUpdateReceivedAt: now,
        }) || hasMutation;
    }

    if (this._clearRecordCount > GROUP_STATE_CLEAR_RECORD_LIMIT) {
      this._pruneExpiredClearRecords(now);
      this._trimClearRecordsToLimit();
    }

    return hasMutation;
  }

  private _applyRecord(
    record: GroupStateRecord,
    options: {
      isProtectedFromSnapshotPrune: boolean;
      latestUpdateReceivedAt?: number;
    },
  ): boolean {
    const existing = this._records.get(record.connectionId);
    if (existing !== undefined && existing.record.updatedAt >= record.updatedAt) {
      return false;
    }

    const wasVisible = existing != null && existing.record.state !== undefined;
    this._setRecord(record.connectionId, {
      record: this._cloneRecord(record),
      isProtectedFromSnapshotPrune: options.isProtectedFromSnapshotPrune,
      latestUpdateReceivedAt: options.latestUpdateReceivedAt,
    });
    return wasVisible || record.state !== undefined;
  }

  private _pruneExpiredClearRecords(now: number): void {
    this._records.forEach((entry, connectionId) => {
      if (this._isProtectionExpired(entry, now)) {
        if (entry.record.state === undefined) {
          this._deleteRecord(connectionId);
        } else {
          this._setRecord(connectionId, {
            record: entry.record,
            isProtectedFromSnapshotPrune: false,
          });
        }
      }
    });
  }

  private _trimClearRecordsToLimit(): void {
    if (this._clearRecordCount <= GROUP_STATE_CLEAR_RECORD_LIMIT) {
      return;
    }

    const clearRecords = Array.from(this._records.entries())
      .filter(([, entry]) => entry.record.state === undefined)
      .sort(([, left], [, right]) => left.latestUpdateReceivedAt! - right.latestUpdateReceivedAt!);

    for (const [connectionId] of clearRecords) {
      if (this._clearRecordCount <= GROUP_STATE_CLEAR_RECORD_LIMIT) {
        break;
      }
      this._deleteRecord(connectionId);
    }
  }

  private _setRecord(connectionId: string, entry: GroupStateCacheRecord): void {
    const existing = this._records.get(connectionId);
    if (existing != null && existing.record.state === undefined) {
      this._clearRecordCount--;
    }
    if (entry.record.state === undefined) {
      this._clearRecordCount++;
    }
    this._records.set(connectionId, entry);
  }

  private _deleteRecord(connectionId: string): boolean {
    const existing = this._records.get(connectionId);
    if (existing == null) {
      return false;
    }

    if (existing.record.state === undefined) {
      this._clearRecordCount--;
    }
    return this._records.delete(connectionId);
  }

  private _isProtectionExpired(entry: GroupStateCacheRecord, now: number): boolean {
    return (
      entry.isProtectedFromSnapshotPrune &&
      entry.latestUpdateReceivedAt !== undefined &&
      now - entry.latestUpdateReceivedAt >= GROUP_STATE_UPDATE_RETENTION_IN_MS
    );
  }

  private _cloneRecord(record: GroupStateRecord): GroupStateRecord {
    return {
      connectionId: record.connectionId,
      userId: record.userId,
      state: record.state == null ? undefined : { ...record.state },
      updatedAt: record.updatedAt,
    };
  }
}
