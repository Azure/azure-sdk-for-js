import type { FullResult } from "@playwright/test/reporter";
import type { EnvironmentVariables } from "../common/environmentVariables.js";
import type { Shard, UploadMetadata } from "../model/shard.js";
import type { StorageUri } from "../model/storageUri.js";
import type { TestResult } from "../model/testResult.js";
import type { TestRun } from "../model/testRun.js";
import type { CIInfo } from "./cIInfoProvider.js";
import type ReporterUtils from "./reporterUtils.js";
export declare class ServiceClient {
    private httpService;
    private readonly envVariables;
    private readonly reporterUtils;
    private readonly addInformationalMessage;
    private isInformationMessagePresent;
    private addKeyToInformationMessage;
    constructor(envVariables: EnvironmentVariables, reporterUtils: ReporterUtils, addErrorInformation: (errorMessage: string) => void, isInformationMessagePresent: (key: string) => boolean, addKeyToInformationMessage: (key: string) => void);
    patchTestRun(ciInfo: CIInfo): Promise<TestRun>;
    postTestRunShardStart(): Promise<Shard>;
    postTestRunShardEnd(result: FullResult, shard: Shard, errorMessages: string[], attachmentMetadata: UploadMetadata, workers: number): Promise<TestRun>;
    postTestResults(testResults: TestResult[]): Promise<void>;
    createStorageUri(): Promise<StorageUri>;
    private getServiceEndpoint;
    private handleErrorResponse;
}
//# sourceMappingURL=serviceClient.d.ts.map