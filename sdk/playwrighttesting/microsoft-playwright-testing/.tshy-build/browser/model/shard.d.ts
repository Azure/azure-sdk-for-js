export declare class Shard {
    shardId: string;
    summary: TestRunSummary;
    workers?: number;
    uploadCompleted: boolean;
}
export declare class TestRunSummary {
    status?: string;
    startTime: string;
    endTime?: string;
    totalTime?: number;
    errorMessages?: string[];
    uploadMetadata?: UploadMetadata;
}
export type TestRunResultsSummary = {
    numTotalTests?: number;
    numFailedTests?: number;
    numSkippedTests?: number;
    numPassedTests?: number;
    numFlakyTests?: number;
    status?: TestResultStatus;
};
export declare enum TestResultStatus {
    PASSED = "passed",
    FAILED = "failed",
    TIMEDOUT = "timedout",
    INTERRUPTED = "interrupted"
}
export declare enum TestRunStatus {
    RUNNING = "RUNNING",
    CLIENT_COMPLETE = "CLIENT_COMPLETE"
}
export type UploadMetadata = {
    numTestResults: number;
    numTotalAttachments: number;
    sizeTotalAttachments: number;
};
export type ShardInfo = {
    total: number;
};
//# sourceMappingURL=shard.d.ts.map