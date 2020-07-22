export interface ChangeFeedCursor {
  cursorVersion: number;
  urlHash: number;
  endTime?: string;
  currentSegmentCursor: SegmentCursor;
}

export interface SegmentCursor {
  shardCursors: ShardCursor[];
  shardIndex: number;
  segmentTime: string;
}

export interface ShardCursor {
  chunkIndex: number;
  blockOffset: number;
  eventIndex: number;
}
