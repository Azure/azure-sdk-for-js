// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type {
  FullResult,
  Location,
  TestCase,
  TestResult,
  TestStep,
  FullConfig,
  Suite,
  TestStatus,
} from "@playwright/test/reporter";
import { exec } from "child_process";
import Debug from "debug";
import { createHash, randomUUID } from "crypto";
import { IBackOffOptions } from "../common/types";
import fs from "fs";
import os from "os";
import path from "path";
import { Constants } from "../common/constants";
import { EnvironmentVariables } from "../common/environmentVariables";
import { DedupedStep, RawTestStep } from "../common/types";
import { TokenType } from "../model/mptTokenDetails";
import { Shard, TestResultStatus, TestRunStatus, UploadMetadata } from "../model/shard";
import { TestResult as MPTTestResult, RawTestResult } from "../model/testResult";
import { TestRun, TestRunConfig } from "../model/testRun";
import { CIInfo, CI_PROVIDERS } from "./cIInfoProvider";
import { CIInfoProvider } from "./cIInfoProvider";

const debug = Debug(Constants.DEBUG_NAMESPACE);

class ReporterUtils {
  private envVariables: EnvironmentVariables;

  private config: FullConfig;
  totalTests: number;
  failedTests: number;
  skippedTests: number;
  passedTests: number;
  flakyTests: number;
  startTime: number;

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(envVariables: EnvironmentVariables, config: FullConfig, _: Suite) {
    this.config = config;
    this.envVariables = envVariables;
    this.startTime = Date.now();

    this.totalTests = 0;
    this.failedTests = 0;
    this.skippedTests = 0;
    this.passedTests = 0;
    this.flakyTests = 0;
  }

  public async getTestRunObject(ciInfo: CIInfo): Promise<TestRun> {
    const testRun = new TestRun();
    const runName = await this.getRunName(ciInfo);
    if (ReporterUtils.isNullOrEmpty(this.envVariables.runId)) {
      if (!ReporterUtils.isNullOrEmpty(runName)) {
        this.envVariables.runId = runName;
      } else {
        this.envVariables.runId = randomUUID();
      }
    }
    testRun.displayName = ReporterUtils.isNullOrEmpty(runName) ? randomUUID() : runName;
    testRun.creatorName = this.envVariables.userName;
    testRun.creatorId = this.envVariables.userId;
    testRun.startTime = ReporterUtils.timestampToRFC3339(this.startTime);
    testRun.ciConfig = {
      ciProviderName: ciInfo?.provider,
      branch: ciInfo?.branch,
      author: ciInfo?.author,
      commitId: ciInfo?.commitId,
      revisionUrl: ciInfo?.revisionUrl,
    };
    testRun.testRunConfig = this.getTestRunConfig();
    testRun.cloudReportingEnabled = "true";
    return testRun;
  }

  public getTestRunShardStartObject(): Shard {
    const shard = new Shard();
    if (this.config.shard !== null && this.config.shard !== undefined) {
      this.envVariables.shardId = this.config.shard.current.toString();
    } else {
      this.envVariables.shardId = "1";
    }
    shard.summary = {
      status: TestRunStatus.RUNNING,
      startTime: ReporterUtils.timestampToRFC3339(this.startTime),
    };
    shard.testRunConfig = this.getTestRunConfig();
    shard.uploadCompleted = false;
    return shard;
  }

  public getTestRunShardEndObject(
    result: FullResult,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    shard: Shard,
    errorMessages: string[],
    attachmentMetadata: UploadMetadata,
  ): Shard {
    shard.resultsSummary = {
      numTotalTests: this.totalTests,
      numFailedTests: this.failedTests,
      numSkippedTests: this.skippedTests,
      numPassedTests: this.passedTests,
      numFlakyTests: this.flakyTests,
      status: result.status as TestResultStatus,
    };
    shard.summary.totalTime = result.duration;
    shard.summary.endTime = ReporterUtils.timestampToRFC3339(Date.now());
    shard.summary.status = TestRunStatus.CLIENT_COMPLETE;
    shard.summary.errorMessages = errorMessages;
    shard.summary.uploadMetadata = attachmentMetadata;
    shard.uploadCompleted = true;
    return shard;
  }

  public getTestResultObject(test: TestCase, result: TestResult, jobName: string): MPTTestResult {
    switch (test.outcome()) {
      case "skipped":
        this.skippedTests++;
        this.totalTests++;
        break;
      case "expected":
        this.passedTests++;
        this.totalTests++;
        break;
      case "unexpected":
        if (result.retry === test.retries) {
          this.failedTests++;
          this.totalTests++;
        }
        break;
      case "flaky":
        this.totalTests++;
        this.flakyTests++;
        break;
      default:
        break;
    }

    let browserName = test.parent.project().use.browserName?.toLowerCase();
    if (!browserName) {
      browserName = test.parent.project().use.defaultBrowserType?.toLowerCase();
    }
    const testResult = new MPTTestResult();
    testResult.runId = this.envVariables.runId;
    testResult.shardId = this.envVariables.runId + "_" + this.envVariables.shardId;
    testResult.accountId = this.envVariables.accountId;
    testResult.suiteId = ReporterUtils.calculateSha1(`${test.parent.title}-${test.location.file}`);
    testResult.testId = testResult.suiteId.concat(`-${ReporterUtils.calculateSha1(test.title)}`);
    testResult.testCombinationId = test.id;
    testResult.testExecutionId = randomUUID();
    testResult.testTitle = test.title;
    testResult.suiteTitle = this.extractRootParentTitle(test.parent);
    testResult.fileName = test.location.file;
    testResult.status = this.getTestStatus(test, result);
    testResult.lineNumber = test.location.line;
    testResult.retry = result.retry ? result.retry : 0;
    testResult.webTestConfig = {
      jobName: jobName,
      projectName: test.parent.project().name,
      browserName: browserName,
      os: os.type(),
    };
    testResult.annotations = this.extractTestAnnotations(test.annotations);
    testResult.tags = this.extractTestTags(test);
    testResult.resultsSummary = {
      status: result.status,
      duration: result.duration,
      startTime: result.startTime.toISOString(),
      attachmentsMetadata: this.getAttachmentStatus(result),
    };
    testResult.artifactsPath = result.attachments
      .filter((attachment) => attachment?.path !== null && attachment?.path !== undefined) // Filter attachments with defined and non-null path property
      .map(
        (attachment) =>
          `${testResult.testExecutionId}/${ReporterUtils.getFileRelativePath(attachment.path)}`,
      );
    return testResult;
  }

  public generateMarkdownSummary(testRunUrl: string): void {
    try {
      if (CIInfoProvider.getCIProvider() === CI_PROVIDERS.GITHUB_ACTIONS) {
        const markdownContent = `
#### Microsoft Playwright Testing run summary

#### Results:
  
![pass](https://img.shields.io/badge/status-passed-brightgreen) **Passed:** ${this.passedTests}
  
![fail](https://img.shields.io/badge/status-failed-red) **Failed:** ${this.failedTests}
  
![flaky](https://img.shields.io/badge/status-flaky-yellow) **Flaky:** ${this.flakyTests}
  
![skipped](https://img.shields.io/badge/status-skipped-lightgrey) **Skipped:** ${this.skippedTests}
  
#### For more details, visit the [service dashboard](${testRunUrl}).
    `;
        fs.writeFileSync(process.env["GITHUB_STEP_SUMMARY"], markdownContent);
      }
    } catch (err) {
      debug(`\nCould not generate markdown summary - ${err}`);
    }
  }

  public getRawTestResultObject(result: TestResult): RawTestResult {
    const rawTestResult: RawTestResult = {
      steps: this.dedupeSteps(result.steps).map((step) => this.serializeTestStep(step)),
      errors: result.errors ? JSON.stringify(result.errors, null, 2) : "",
      stdErr: result.stderr ? JSON.stringify(result.stderr, null, 2) : "",
      stdOut: result.stdout ? JSON.stringify(result.stdout, null, 2) : "",
    };
    return rawTestResult;
  }

  public static getRunId(cIInfo: CIInfo): string {
    if (cIInfo === null || cIInfo.provider === CI_PROVIDERS.DEFAULT) {
      return randomUUID();
    }

    const concatString = `${cIInfo.provider}-${cIInfo.repo}-${cIInfo.runId}-${cIInfo.runAttempt}`;
    const runId = ReporterUtils.calculateSha1(concatString);
    return runId;
  }

  public static calculateSha1(buffer: Buffer | string): string {
    const hash = createHash("sha1");
    hash.update(buffer);
    return hash.digest("hex");
  }

  /*
  public static getTokenDetails(accessToken: string) {
    let tokenDetails = new MPTTokenDetails();
    try {
      const token = accessToken.split('.')[1];
      const _token = Buffer.from(token, 'base64');
      tokenDetails = JSON.parse(_token.toString());
    } catch (err) {
      throw err;
    }
    return tokenDetails;
  }
  */

  public static getTokenDetails<T>(accessToken: string, tokenType: TokenType): T {
    const token = accessToken.split(".")[1];
    const _token = Buffer.from(token, "base64");
    const tokenDetails = JSON.parse(_token.toString());

    switch (tokenType) {
      case TokenType.MPT:
        return tokenDetails as T;
      case TokenType.ENTRA:
        return tokenDetails as T;
      default:
        throw new Error("Unsupported token type");
    }
  }

  public static hasAudienceClaim(token: string): boolean {
    try {
      // Split the token into its three parts
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }

      // Base64 decode the payload
      const payload = parts[1];
      const decodedPayload = Buffer.from(payload, "base64");

      // Parse the decoded payload as JSON
      const payloadObject = JSON.parse(decodedPayload.toString());

      // Check if the payload has an 'aud' claim
      return "aud" in payloadObject;
    } catch (error) {
      return false;
    }
  }

  public static timestampToRFC3339(timestamp: number): string {
    const date = new Date(timestamp);
    const dateString = date.toISOString().replace(/\.\d+Z$/, "Z");
    return dateString;
  }

  public static getFileRelativePath(filePath: string): string {
    if (filePath) {
      let parts = filePath.split("/");

      if (parts.length > 1) {
        return parts[parts.length - 1];
      }

      parts = filePath.split("\\");

      if (parts.length > 1) {
        return parts[parts.length - 1];
      }
    }

    return filePath;
  }

  public static getReporterBackOffOptions: Partial<IBackOffOptions> = {
    numOfAttempts: 3,
    jitter: "full",
    retry: (error) => {
      if (error.response) {
        const status = error.response.status;
        if (Constants.NON_RETRYABLE_STATUS_CODES.includes(status)) {
          return false;
        }
      }
      return true;
    },
  };

  public static isTimeGreaterThanCurrentPlus10Minutes(isoString: string): boolean {
    // Parse ISO 8601 string into a timestamp
    const timestampFromIsoString: number = Date.parse(isoString);
    // Calculate the current timestamp plus 10 minutes
    const currentTimestampPlus10Minutes: number = Date.now() + 10 * 60 * 1000;
    // Compare the timestamps
    return timestampFromIsoString > currentTimestampPlus10Minutes;
  }

  public static getFileSize(attachmentPath: string): number {
    try {
      const stats = fs.statSync(attachmentPath);
      return stats.size;
    } catch (err) {
      return 0;
    }
  }

  public redactAccessToken(info: string | undefined): string {
    if (!info || ReporterUtils.isNullOrEmpty(this.envVariables.accessToken)) {
      return "";
    }
    const accessTokenRegex = new RegExp(this.envVariables.accessToken, "g");
    return info.replace(accessTokenRegex, Constants.DEFAULT_REDACTED_MESSAGE);
  }

  public static populateValuesFromServiceUrl(): {
    region: string;
    accountId: string;
  } | null {
    // Service URL format: wss://<region>.api.playwright.microsoft.com/accounts/<workspace-id>/browsers
    const url = process.env["PLAYWRIGHT_SERVICE_URL"];
    if (!ReporterUtils.isNullOrEmpty(url)) {
      const parts = url.split("/");

      if (parts.length > 2) {
        const subdomainParts = parts[2].split(".");
        const region = subdomainParts.length > 0 ? subdomainParts[0] : null;
        const accountId = parts[4];

        return { region, accountId };
      }
    }
    return null;
  }

  public static getRegionFromAccountID(accountId: string): string {
    if (accountId.includes("_")) {
      return accountId.split("_")[0];
    } else {
      return null;
    } // Handling for older workspaces without region in id
  }

  public progressBar(current: number, total: number): void {
    const width = 40;
    const percent = current / total;
    const completed = Math.round(width * percent);
    const remaining = width - completed;

    process.stdout.write("\r");
    process.stdout.write(
      `[${"=".repeat(completed)}${" ".repeat(remaining)}] ${Math.round(percent * 100)}%`,
    );
  }

  private getTestRunConfig(): TestRunConfig {
    const testRunConfig: TestRunConfig = {
      workers: this.config.workers,
      pwVersion: this.config.version,
      timeout: this.config.globalTimeout,
      shards: this.config.shard ? this.config.shard : { total: 1 },
      testFramework: {
        name: Constants.TEST_FRAMEWORK_NAME,
        version: this.config.version,
        runnerName: Constants.TEST_FRAMEWORK_RUNNERNAME,
      },
      testType: Constants.TEST_TYPE,
      testSdkLanguage: Constants.TEST_SDK_LANGUAGE,
      reporterPackageVersion: Constants.REPORTER_PACKAGE_VERSION,
    };
    return testRunConfig;
  }

  private relativeLocation(location: Location | undefined): Location | undefined {
    if (!location) {
      return undefined;
    }
    const file = this.toPosixPath(path.relative(this.config.rootDir, location.file));
    return {
      file,
      line: location.line,
      column: location.column,
    };
  }

  private extractTestTags(input: TestCase): string[] {
    let tags: string[] = [];
    if ("tags" in input && Array.isArray(input.tags) && input.tags.length > 0) {
      tags = input.tags.map((tag) => tag.slice(1));
      return tags;
    }

    // Check if the input string contains tags directly
    const regex = /@(\w+)/g;
    const matches = input.title.match(regex);
    if (matches) {
      tags = tags.concat(matches.map((match) => match.slice(1)));
    }

    // Try parsing the input string as a JavaScript object
    try {
      const obj = JSON.parse(`{${input}}`);
      if (obj.tag && Array.isArray(obj.tag)) {
        tags = tags.concat(obj.tag);
      }
    } catch (error) {
      // Ignore parsing errors
    }
    return tags;
  }

  private extractTestAnnotations(annotations: TestCase["annotations"]): string[] {
    const result = annotations.map((annotation) => {
      if (annotation.type && annotation.description) {
        return `${annotation.type}: ${annotation.description}`;
      }
      return annotation.type;
    });
    return result;
  }

  private toPosixPath(aPath: string): string {
    return aPath.split(path.sep).join(path.posix.sep);
  }

  private getAttachmentStatus(testResult: TestResult): string {
    let attachmentStatus: string = "";
    for (const attachment of testResult.attachments) {
      if (attachment.contentType.includes("image")) {
        if (attachmentStatus !== "") {
          attachmentStatus += ",";
        }
        attachmentStatus += "image";
      } else if (attachment.contentType.includes("video")) {
        if (attachmentStatus !== "") {
          attachmentStatus += ",";
        }
        attachmentStatus += "video";
      } else if (attachment.contentType === "application/zip") {
        if (attachmentStatus !== "") {
          attachmentStatus += ",";
        }
        attachmentStatus += "trace";
      }
    }
    return attachmentStatus;
  }

  private dedupeSteps(steps: TestStep[]): DedupedStep[] {
    const result: DedupedStep[] = [];
    let lastResult = undefined;
    for (const step of steps) {
      const canDedupe =
        !step.error && step.duration >= 0 && step.location?.file && !step.steps.length;
      const lastStep = lastResult?.step;
      if (
        canDedupe &&
        lastResult &&
        lastStep &&
        step.category === lastStep.category &&
        step.title === lastStep.title &&
        step.location?.file === lastStep.location?.file &&
        step.location?.line === lastStep.location?.line &&
        step.location?.column === lastStep.location?.column
      ) {
        ++lastResult.count;
        lastResult.duration += step.duration;
        continue;
      }
      lastResult = { step, count: 1, duration: step.duration };
      result.push(lastResult);
      if (!canDedupe) {
        lastResult = undefined;
      }
    }
    return result;
  }

  private serializeTestStep(dedupedStep: DedupedStep): RawTestStep {
    const { step, duration, count } = dedupedStep;
    const result: RawTestStep = {
      title: step.title,
      category: step.category,
      startTime: step.startTime.toISOString(),
      duration,
      error: step.error ? step.error.message : undefined,
      location: this.relativeLocation(step.location),
      steps: this.dedupeSteps(step.steps).map((subStep) => this.serializeTestStep(subStep)),
      count: count,
    };
    return result;
  }

  private getTestStatus(test: TestCase, result: TestResult): TestStatus {
    if (test.expectedStatus === result.status) {
      if (result.status === "skipped") {
        return "skipped";
      } else {
        return "passed";
      }
    } else {
      return "failed";
    }
  }

  private extractRootParentTitle(suite: Suite): string | undefined {
    // Traverse through the parent properties until reaching the root parent
    let currentSuite: Suite | undefined = suite;
    let depthCount: number = 0;
    let suiteTitle: string = currentSuite.title;
    const projectName = currentSuite.project().name;
    while (currentSuite?.parent && !ReporterUtils.isNullOrEmpty(currentSuite.parent.title)) {
      if (depthCount > 10 || currentSuite.parent.title === projectName) {
        break;
      }
      suiteTitle = suiteTitle + ">" + currentSuite.parent.title;
      currentSuite = currentSuite.parent;
      depthCount++;
    }
    return suiteTitle;
  }

  private async getRunName(ciInfo: CIInfo): Promise<string> {
    if (
      ciInfo.provider === CI_PROVIDERS.GITHUB_ACTIONS &&
      process.env["GITHUB_EVENT_NAME"] === "pull_request"
    ) {
      const prNumber: string = `${process.env["GITHUB_REF_NAME"].split("/")[0]}`;
      const prLink: string = `${process.env["GITHUB_REPOSITORY"]}/pull/${prNumber}`;
      return `PR# ${prNumber} on Repo: ${process.env["GITHUB_REPOSITORY"]} (${prLink})`;
    }

    let gitCommitMessage: string | null = null;
    try {
      const gitVersion = await this.runCommand(Constants.GIT_VERSION_COMMAND);
      if (ReporterUtils.isNullOrEmpty(gitVersion)) {
        throw new Error("Git is not installed on the machine");
      }
      const isInsideWorkTree = await this.runCommand(Constants.GIT_REV_PARSE);
      if (isInsideWorkTree !== "true") {
        throw new Error("Not inside a git repository");
      }
      gitCommitMessage = await this.runCommand(Constants.GIT_COMMIT_MESSAGE_COMMAND);
      return gitCommitMessage;
    } catch (err) {
      debug(`\nError in getting git commit message: ${err}.`);
      return "";
    }
  }

  private async runCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        if (stderr) {
          reject(new Error(stderr));
          return;
        }
        resolve(stdout.trim());
      });
    });
  }

  public static isNullOrEmpty(str: string | null | undefined): boolean {
    return !str || str.trim() === "";
  }
}

export default ReporterUtils;
