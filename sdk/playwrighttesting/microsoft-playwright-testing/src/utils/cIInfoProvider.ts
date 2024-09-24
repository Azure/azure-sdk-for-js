// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum CI_PROVIDERS {
  GITHUB = "GITHUB",
  ADO = "ADO",
  DEFAULT = "DEFAULT",
  // Add more CI providers as needed
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
  jobId: string | null;
};

export class CIInfoProvider {
  private static isGitHubActions(): boolean {
    return process.env["GITHUB_ACTIONS"] === "true";
  }

  static getCIProvider(): string | null {
    if (CIInfoProvider.isGitHubActions()) {
      return CI_PROVIDERS.GITHUB;
    } else if (CIInfoProvider.isAzureDevOps()) {
      return CI_PROVIDERS.ADO;
    } else {
      return CI_PROVIDERS.DEFAULT;
    }
  }

  static getCIInfo(): CIInfo {
    const ciProvider = CIInfoProvider.getCIProvider();
    if (ciProvider === CI_PROVIDERS.GITHUB) {
      // Logic to get GitHub Actions CIInfo
      return {
        provider: CI_PROVIDERS.GITHUB,
        repo: process.env["GITHUB_REPOSITORY_ID"] || null,
        branch: this.getGHBranchName() || null,
        author: process.env["GITHUB_ACTOR"] || null,
        commitId: process.env["GITHUB_SHA"] || null,
        revisionUrl: process.env["GITHUB_SERVER_URL"]
          ? `${process.env["GITHUB_SERVER_URL"]}/${process.env["GITHUB_REPOSITORY"]}/commit/${process.env["GITHUB_SHA"]}`
          : null,
        runId: process.env["GITHUB_RUN_ID"] || null,
        runAttempt: process.env["GITHUB_RUN_ATTEMPT"]
          ? parseInt(process.env["GITHUB_RUN_ATTEMPT"], 10)
          : null,
        jobId: process.env["GITHUB_JOB"] || null,
      };
    } else if (ciProvider === CI_PROVIDERS.ADO) {
      // Logic to get Azure DevOps CIInfo
      return {
        provider: CI_PROVIDERS.ADO,
        repo: process.env["BUILD_REPOSITORY_ID"] || null,
        branch: process.env["BUILD_SOURCEBRANCH"] || null,
        author: process.env["BUILD_REQUESTEDFOR"] || null,
        commitId: process.env["BUILD_SOURCEVERSION"] || null,
        revisionUrl: process.env["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"]
          ? `${process.env["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"]}${process.env["SYSTEM_TEAMPROJECT"]}/_git/${process.env["BUILD_REPOSITORY_NAME"]}/commit/${process.env["BUILD_SOURCEVERSION"]}`
          : null,
        runId: this.getADORunId() || null,
        runAttempt: process.env["RELEASE_ATTEMPTNUMBER"]
          ? parseInt(process.env["RELEASE_ATTEMPTNUMBER"], 10)
          : parseInt(process.env["SYSTEM_JOBATTEMPT"] ?? "", 10),
        jobId: process.env["RELEASE_DEPLOYMENTID"]
          ? process.env["RELEASE_DEPLOYMENTID"]
          : process.env["SYSTEM_JOBID"] || null,
      };
    } else {
      // Handle unsupported CI provider
      return {
        provider: CI_PROVIDERS.DEFAULT,
        repo: process.env["REPO"] ?? "",
        branch: process.env["BRANCH"] ?? "",
        author: process.env["AUTHOR"] ?? "",
        commitId: process.env["COMMIT_ID"] ?? "",
        revisionUrl: process.env["REVISION_URL"] ?? "",
        runId: process.env["RUN_ID"] ?? "",
        runAttempt: process.env["RUN_ATTEMPT"] ? parseInt(process.env["RUN_ATTEMPT"], 10) : null,
        jobId: process.env["JOB_ID"] ?? "",
      };
    }
  }

  private static isAzureDevOps(): boolean {
    return (
      process.env["AZURE_HTTP_USER_AGENT"] !== undefined && process.env["TF_BUILD"] !== undefined
    );
  }

  private static getADORunId(): string {
    if (
      process.env["RELEASE_DEFINITIONID"] !== null &&
      process.env["RELEASE_DEPLOYMENTID"] !== null
    ) {
      return `${process.env["RELEASE_DEFINITIONID"]}-${process.env["RELEASE_DEPLOYMENTID"]}`;
    } else {
      return `${process.env["SYSTEM_DEFINITIONID"]}-${process.env["SYSTEM_JOBID"]}`;
    }
  }

  private static getGHBranchName(): string {
    if (
      process.env["GITHUB_EVENT_NAME"] === "pull_request" ||
      process.env["GITHUB_EVENT_NAME"] === "pull_request_target"
    ) {
      return process.env["GITHUB_HEAD_REF"]!;
    } else {
      return process.env["GITHUB_REF_NAME"]!;
    }
  }
}
