import type { ShardInfo } from "./shard.js";
export declare class TestRun {
    testRunId: string;
    displayName: string;
    creatorId: string;
    creatorName?: string;
    startTime: string;
    ciConfig?: CIConfig;
    testRunConfig?: TestRunConfig;
    cloudReportingEnabled: string;
}
export type CIConfig = {
    ciProviderName: string;
    branch: string;
    author: string;
    commitId: string;
    revisionUrl: string;
};
export type TestRunConfig = {
    workers: number;
    pwVersion: string;
    timeout: number;
    shards: ShardInfo;
    retries?: number;
    repeatEach?: number;
    testFramework: TestFramework;
    testType: string;
    testSdkLanguage: string;
    reporterPackageVersion: string;
};
export type TestFramework = {
    name: string;
    version: string;
    runnerName: string;
};
//# sourceMappingURL=testRun.d.ts.map