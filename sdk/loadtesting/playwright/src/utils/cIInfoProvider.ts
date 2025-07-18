// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export enum CI_PROVIDERS {
  GITHUB = "GITHUB",
  ADO = "ADO",
  DEFAULT = "DEFAULT",
  // Add more CI providers as needed
}

export type CIInfo = {
  providerName?: CI_PROVIDERS | null;
  branch?: string | null;
  author?: string | null;
  commitId?: string | null;
  revisionUrl?: string | null;
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
        providerName: CI_PROVIDERS.GITHUB,
        branch: this.getGHBranchName() || null,
        author: process.env["GITHUB_ACTOR"] || null,
        commitId: process.env["GITHUB_SHA"] || null,
        revisionUrl: process.env["GITHUB_SERVER_URL"]
          ? `${process.env["GITHUB_SERVER_URL"]}/${process.env["GITHUB_REPOSITORY"]}/commit/${process.env["GITHUB_SHA"]}`
          : null,
      };
    } else if (ciProvider === CI_PROVIDERS.ADO) {
      // Logic to get Azure DevOps CIInfo
      return {
        providerName: CI_PROVIDERS.ADO,
        branch: process.env["BUILD_SOURCEBRANCH"] || null,
        author: process.env["BUILD_REQUESTEDFOR"] || null,
        commitId: process.env["BUILD_SOURCEVERSION"] || null,
        revisionUrl: process.env["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"]
          ? `${process.env["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"]}${process.env["SYSTEM_TEAMPROJECT"]}/_git/${process.env["BUILD_REPOSITORY_NAME"]}/commit/${process.env["BUILD_SOURCEVERSION"]}`
          : null,
      };
    } else {
      // Handle unsupported CI provider
      return {
        providerName: CI_PROVIDERS.DEFAULT,
        branch: process.env["BRANCH"] ?? null,
        author: process.env["AUTHOR"] ?? null,
        commitId: process.env["COMMIT_ID"] ?? null,
        revisionUrl: process.env["REVISION_URL"] ?? null,
      };
    }
  }

  private static isAzureDevOps(): boolean {
    return (
      process.env["AZURE_HTTP_USER_AGENT"] !== undefined && process.env["TF_BUILD"] !== undefined
    );
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
