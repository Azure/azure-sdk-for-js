// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ChangeFeedCursor {
  CursorVersion: number;
  // The host component of the container URL.
  UrlHost: string;
  EndTime?: string;
  CurrentSegmentCursor: SegmentCursor;
}

export interface SegmentCursor {
  ShardCursors: ShardCursor[];
  CurrentShardPath: string;
  SegmentPath: string;
}

export interface ShardCursor {
  CurrentChunkPath: string;
  BlockOffset: number;
  EventIndex: number;
}
