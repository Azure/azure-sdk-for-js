export interface ChangeFeedCursor {
    CursorVersion: number;
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
//# sourceMappingURL=ChangeFeedCursor.d.ts.map