import { expect } from "@azure-tools/test-utils";
import { CIInfoProvider, CI_PROVIDERS } from "../../src/utils/cIInfoProvider";
import sinon from "sinon";

describe("CIInfoProvider", () => {
  let sandbox: sinon.SinonSandbox;
  let environmentVariables: NodeJS.ProcessEnv;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    process.env = { ...environmentVariables };
  });

  it("should return GitHub CIInfo when  GitHub environment variables are set", () => {
    process.env["GITHUB_ACTIONS"] = "true";
    process.env["GITHUB_REPOSITORY_ID"] = "repoID";
    process.env["GITHUB_REPOSITORY"] = "repo";
    process.env["GITHUB_ACTOR"] = "testAuthor";
    process.env["GITHUB_SHA"] = "sampleSha";
    process.env["GITHUB_SERVER_URL"] = "https://github.com";
    process.env["GITHUB_RUN_ID"] = "runId123";
    process.env["GITHUB_RUN_ATTEMPT"] = "1";
    process.env["GITHUB_JOB"] = "testJob";
    process.env["GITHUB_REF_NAME"] = "main";

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.GITHUB);
    expect(ciInfo.repo).to.equal("repoID");
    expect(ciInfo.branch).to.equal("main");
    expect(ciInfo.author).to.equal("testAuthor");
    expect(ciInfo.commitId).to.equal("sampleSha");
    expect(ciInfo.revisionUrl).to.equal("https://github.com/repo/commit/sampleSha");
    expect(ciInfo.runId).to.equal("runId123");
    expect(ciInfo.runAttempt).to.equal(1);
    expect(ciInfo.jobId).to.equal("testJob");
  });

  it("should return GitHub CIInfo with null fields when Github environment variables are not set", () => {
    process.env["GITHUB_ACTIONS"] = "true";

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.GITHUB);
    expect(ciInfo.repo).to.be.null;
    expect(ciInfo.branch).to.be.null;
    expect(ciInfo.author).to.be.null;
    expect(ciInfo.commitId).to.be.null;
    expect(ciInfo.revisionUrl).to.be.null;
    expect(ciInfo.runId).to.be.null;
    expect(ciInfo.runAttempt).to.be.null;
    expect(ciInfo.jobId).to.be.null;
  });

  it("should return Azure DevOps CIInfo when Azure DevOps environment variables are set", () => {
    process.env["AZURE_HTTP_USER_AGENT"] = "someAgent";
    process.env["TF_BUILD"] = "true";
    process.env["BUILD_REPOSITORY_ID"] = "repo123";
    process.env["BUILD_SOURCEBRANCH"] = "main";
    process.env["BUILD_REQUESTEDFOR"] = "testAuthor";
    process.env["BUILD_SOURCEVERSION"] = "commitSha123";
    process.env["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"] = "https://dev.azure.com/";
    process.env["SYSTEM_TEAMPROJECT"] = "project123";
    process.env["BUILD_REPOSITORY_NAME"] = "repo123";
    process.env["SYSTEM_JOBID"] = "job123";
    process.env["SYSTEM_DEFINITIONID"] = "def123";
    process.env["SYSTEM_JOBATTEMPT"] = "1";
    process.env["RELEASE_DEFINITIONID"] = "Rdef123";
    process.env["RELEASE_DEPLOYMENTID"] = "Rdep123";

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.ADO);
    expect(ciInfo.repo).to.equal("repo123");
    expect(ciInfo.branch).to.equal("main");
    expect(ciInfo.author).to.equal("testAuthor");
    expect(ciInfo.commitId).to.equal("commitSha123");
    expect(ciInfo.revisionUrl).to.equal(
      "https://dev.azure.com/project123/_git/repo123/commit/commitSha123",
    );
    expect(ciInfo.runId).to.equal("Rdef123-Rdep123");
    expect(ciInfo.jobId).to.equal("Rdep123");
  });

  it("should return Azure DevOps CIInfo with null fields when Azure DevOps environment variables are not set", () => {
    process.env["AZURE_HTTP_USER_AGENT"] = "someAgent";
    process.env["TF_BUILD"] = "true";

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.ADO);
    expect(ciInfo.repo).to.be.null;
    expect(ciInfo.branch).to.be.null;
    expect(ciInfo.author).to.be.null;
    expect(ciInfo.commitId).to.be.null;
    expect(ciInfo.revisionUrl).to.be.null;
    expect(ciInfo.runId).to.be.null;
    expect(ciInfo.jobId).to.be.null;
  });

  it("should return default CIInfo when no supported CI environment is detected", () => {
    process.env["REPO"] = "defaultRepo";
    process.env["BRANCH"] = "defaultBranch";
    process.env["AUTHOR"] = "defaultAuthor";
    process.env["COMMIT_ID"] = "defaultCommit";
    process.env["REVISION_URL"] = "https://default.com/repo/commit/defaultCommit";
    process.env["RUN_ID"] = "defaultRunId";
    process.env["RUN_ATTEMPT"] = "2";
    process.env["JOB_ID"] = "defaultJobId";

    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.DEFAULT);
    expect(ciInfo.repo).to.equal("defaultRepo");
    expect(ciInfo.branch).to.equal("defaultBranch");
    expect(ciInfo.author).to.equal("defaultAuthor");
    expect(ciInfo.commitId).to.equal("defaultCommit");
    expect(ciInfo.revisionUrl).to.equal("https://default.com/repo/commit/defaultCommit");
    expect(ciInfo.runId).to.equal("defaultRunId");
    expect(ciInfo.runAttempt).to.equal(2);
    expect(ciInfo.jobId).to.equal("defaultJobId");
  });

  it("should return default CIInfo with null fields when no supported CI environment is detected", () => {
    const ciInfo = CIInfoProvider.getCIInfo();

    expect(ciInfo.provider).to.equal(CI_PROVIDERS.DEFAULT);
    expect(ciInfo.repo).to.be.null;
    expect(ciInfo.branch).to.be.null;
    expect(ciInfo.author).to.be.null;
    expect(ciInfo.commitId).to.be.null;
    expect(ciInfo.revisionUrl).to.be.null;
    expect(ciInfo.runId).to.be.null;
    expect(ciInfo.runAttempt).to.be.null;
    expect(ciInfo.jobId).to.be.null;
  });
});
