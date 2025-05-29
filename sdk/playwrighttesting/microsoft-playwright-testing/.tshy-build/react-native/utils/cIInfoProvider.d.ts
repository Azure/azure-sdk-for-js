export declare enum CI_PROVIDERS {
    GITHUB = "GITHUB",
    ADO = "ADO",
    DEFAULT = "DEFAULT"
}
export type CIInfo = {
    provider: CI_PROVIDERS | null;
    repo: string | null;
    branch: string | null;
    author: string | null;
    commitId: string | null;
    revisionUrl: string | null;
    runId: string | null;
    runAttempt: number | null;
    jobName: string | null;
};
export declare class CIInfoProvider {
    private static isGitHubActions;
    static getCIProvider(): string | null;
    static getCIInfo(): CIInfo;
    private static isAzureDevOps;
    private static getADORunId;
    private static getGHBranchName;
}
//# sourceMappingURL=cIInfoProvider.d.ts.map