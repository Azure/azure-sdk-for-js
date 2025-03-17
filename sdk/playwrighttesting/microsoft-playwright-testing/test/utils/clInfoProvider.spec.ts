// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CIInfoProvider, CI_PROVIDERS } from "../../src/utils/cIInfoProvider.js";
import { describe, it, expect, afterEach, vi } from "vitest";

describe("CIInfoProvider", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should return GitHub CIInfo when  GitHub environment variables are set", () => {
    vi.stubEnv("GITHUB_ACTIONS", "true");
    vi.stubEnv("GITHUB_REPOSITORY_ID", "repoID");
    vi.stubEnv("GITHUB_REPOSITORY", "repo");
    vi.stubEnv("GITHUB_ACTOR", "testAuthor");
    vi.stubEnv("GITHUB_SHA", "sampleSha");
    vi.stubEnv("GITHUB_SERVER_URL", "https://github.com");
    vi.stubEnv("GITHUB_RUN_ID", "runId123");
    vi.stubEnv("GITHUB_RUN_ATTEMPT", "1");
    vi.stubEnv("GITHUB_JOB", "testJob");
    vi.stubEnv("GITHUB_REF_NAME", "main");

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.GITHUB);
    expect(ciInfo.repo).to.equal("repoID");
    expect(ciInfo.branch).to.equal("main");
    expect(ciInfo.author).to.equal("testAuthor");
    expect(ciInfo.commitId).to.equal("sampleSha");
    expect(ciInfo.revisionUrl).to.equal("https://github.com/repo/commit/sampleSha");
    expect(ciInfo.runId).to.equal("runId123");
    expect(ciInfo.runAttempt).to.equal(1);
    expect(ciInfo.jobName).to.equal("testJob");
  });

  it("should return GitHub CIInfo with null fields when Github environment variables are not set", () => {
    vi.stubEnv("GITHUB_ACTIONS", "true");

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.GITHUB);
    expect(ciInfo.repo).toBeNull();
    expect(ciInfo.branch).toBeNull();
    expect(ciInfo.author).toBeNull();
    expect(ciInfo.commitId).toBeNull();
    expect(ciInfo.revisionUrl).toBeNull();
    expect(ciInfo.runId).toBeNull();
    expect(ciInfo.runAttempt).toBeNull();
    expect(ciInfo.jobName).toBeNull();
  });

  it("should return Azure DevOps CIInfo when Azure DevOps environment variables are set", () => {
    vi.stubEnv("AZURE_HTTP_USER_AGENT", "someAgent");
    vi.stubEnv("TF_BUILD", "true");
    vi.stubEnv("BUILD_REPOSITORY_ID", "repo123");
    vi.stubEnv("BUILD_SOURCEBRANCH", "refs/head/main");
    vi.stubEnv("BUILD_SOURCEBRANCHNAME", "main");
    vi.stubEnv("BUILD_REQUESTEDFOR", "testAuthor");
    vi.stubEnv("BUILD_SOURCEVERSION", "commitSha123");
    vi.stubEnv("SYSTEM_TEAMFOUNDATIONCOLLECTIONURI", "https://dev.azure.com/");
    vi.stubEnv("SYSTEM_TEAMPROJECT", "project123");
    vi.stubEnv("BUILD_REPOSITORY_NAME", "repo123");
    vi.stubEnv("SYSTEM_JOBID", "job123");
    vi.stubEnv("SYSTEM_DEFINITIONID", "def123");
    vi.stubEnv("SYSTEM_JOBATTEMPT", "1");
    vi.stubEnv("RELEASE_DEFINITIONID", "Rdef123");
    vi.stubEnv("SYSTEM_JOBDISPLAYNAME", "jobName123");
    vi.stubEnv("RELEASE_DEPLOYMENTID", "Rdep123");

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.ADO);
    expect(ciInfo.repo).to.equal("repo123");
    expect(ciInfo.branch).to.equal("refs/head/main");
    expect(ciInfo.author).to.equal("testAuthor");
    expect(ciInfo.commitId).to.equal("commitSha123");
    expect(ciInfo.revisionUrl).to.equal(
      "https://dev.azure.com/project123/_git/repo123/commit/commitSha123",
    );
    expect(ciInfo.runId).to.equal("Rdef123-Rdep123");
    expect(ciInfo.jobName).to.equal("jobName123");
  });

  it("should return Azure DevOps CIInfo when Azure DevOps environment variables are set (SYSTEM_JOBDISPLAYNAME not set)", () => {
    vi.stubEnv("AZURE_HTTP_USER_AGENT", "someAgent");
    vi.stubEnv("TF_BUILD", "true");
    vi.stubEnv("BUILD_REPOSITORY_ID", "repo123");
    vi.stubEnv("BUILD_SOURCEBRANCH", "refs/head/main");
    vi.stubEnv("BUILD_SOURCEBRANCHNAME", "main");
    vi.stubEnv("BUILD_REQUESTEDFOR", "testAuthor");
    vi.stubEnv("BUILD_SOURCEVERSION", "commitSha123");
    vi.stubEnv("SYSTEM_TEAMFOUNDATIONCOLLECTIONURI", "https://dev.azure.com/");
    vi.stubEnv("SYSTEM_TEAMPROJECT", "project123");
    vi.stubEnv("BUILD_REPOSITORY_NAME", "repo123");
    vi.stubEnv("SYSTEM_JOBID", "job123");
    vi.stubEnv("SYSTEM_DEFINITIONID", "def123");
    vi.stubEnv("SYSTEM_JOBATTEMPT", "1");
    vi.stubEnv("RELEASE_DEFINITIONID", "Rdef123");
    vi.stubEnv("RELEASE_DEPLOYMENTID", "Rdep123");

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.ADO);
    expect(ciInfo.repo).to.equal("repo123");
    expect(ciInfo.branch).to.equal("refs/head/main");
    expect(ciInfo.author).to.equal("testAuthor");
    expect(ciInfo.commitId).to.equal("commitSha123");
    expect(ciInfo.revisionUrl).to.equal(
      "https://dev.azure.com/project123/_git/repo123/commit/commitSha123",
    );
    expect(ciInfo.runId).to.equal("Rdef123-Rdep123");
    expect(ciInfo.jobName).to.equal("Rdep123");
  });

  it("should return Azure DevOps CIInfo with null fields when Azure DevOps environment variables are not set", () => {
    vi.stubEnv("AZURE_HTTP_USER_AGENT", "someAgent");
    vi.stubEnv("TF_BUILD", "true");

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.ADO);
    expect(ciInfo.repo).toBeNull();
    expect(ciInfo.branch).toBeNull();
    expect(ciInfo.author).toBeNull();
    expect(ciInfo.commitId).toBeNull();
    expect(ciInfo.revisionUrl).toBeNull();
    expect(ciInfo.runId).toBeNull();
    expect(ciInfo.jobName).toBeNull();
  });

  it("should return default CIInfo when no supported CI environment is detected", () => {
    vi.stubEnv("REPO", "defaultRepo");
    vi.stubEnv("BRANCH", "defaultBranch");
    vi.stubEnv("AUTHOR", "defaultAuthor");
    vi.stubEnv("COMMIT_ID", "defaultCommit");
    vi.stubEnv("REVISION_URL", "https://default.com/repo/commit/defaultCommit");
    vi.stubEnv("RUN_ID", "defaultRunId");
    vi.stubEnv("RUN_ATTEMPT", "2");
    vi.stubEnv("JOB_ID", "defaultJobId");

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.DEFAULT);
    expect(ciInfo.repo).to.equal("defaultRepo");
    expect(ciInfo.branch).to.equal("defaultBranch");
    expect(ciInfo.author).to.equal("defaultAuthor");
    expect(ciInfo.commitId).to.equal("defaultCommit");
    expect(ciInfo.revisionUrl).to.equal("https://default.com/repo/commit/defaultCommit");
    expect(ciInfo.runId).to.equal("defaultRunId");
    expect(ciInfo.runAttempt).to.equal(2);
    expect(ciInfo.jobName).to.equal("defaultJobId");
  });

  it("should return default CIInfo with null fields when no supported CI environment is detected", () => {
    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.DEFAULT);
    expect(ciInfo.repo).toBeNull();
    expect(ciInfo.branch).toBeNull();
    expect(ciInfo.author).toBeNull();
    expect(ciInfo.commitId).toBeNull();
    expect(ciInfo.revisionUrl).toBeNull();
    expect(ciInfo.runId).toBeNull();
    expect(ciInfo.runAttempt).toBeNull();
    expect(ciInfo.jobName).toBeNull();
  });
});
