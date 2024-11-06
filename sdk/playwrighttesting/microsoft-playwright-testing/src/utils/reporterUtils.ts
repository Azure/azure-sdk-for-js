// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FullResult,
  Location,
  TestCase,
  TestResult,
  TestStep,
  FullConfig,
  Suite,
} from "@playwright/test/reporter";
import { exec } from "child_process";
import { reporterLogger } from "../common/logger";
import { createHash, randomUUID } from "crypto";
import type { IBackOffOptions } from "../common/types";
import fs from "fs";
import os from "os";
import path from "path";
import { Constants } from "../common/constants";
import type { EnvironmentVariables } from "../common/environmentVariables";
import type { DedupedStep, RawTestStep } from "../common/types";
import { TokenType } from "../model/mptTokenDetails";
import type { UploadMetadata } from "../model/shard";
import { Shard, TestRunStatus } from "../model/shard";
import type { RawTestResult } from "../model/testResult";
import { TestResult as MPTTestResult } from "../model/testResult";
import type { TestRunConfig } from "../model/testRun";
import { TestRun } from "../model/testRun";
import type { CIInfo } from "./cIInfoProvider";
import { CI_PROVIDERS } from "./cIInfoProvider";
import { CIInfoProvider } from "./cIInfoProvider";
import type { StorageUri } from "../model/storageUri";

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
    const runName = this.envVariables.runName || (await this.getRunName(ciInfo));
    testRun.testRunId = this.envVariables.runId;
    testRun.displayName = ReporterUtils.isNullOrEmpty(runName) ? this.envVariables.runId : runName;
    testRun.creatorName = this.envVariables.userName;
    testRun.creatorId = this.envVariables.userId!;
    testRun.startTime = ReporterUtils.timestampToRFC3339(this.startTime);
    testRun.ciConfig = {
      ciProviderName: ciInfo.provider!,
      branch: ciInfo.branch!,
      author: ciInfo.author!,
      commitId: ciInfo.commitId!,
      revisionUrl: ciInfo.revisionUrl!,
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
    shard.shardId = this.envVariables.shardId;
    shard.summary = {
      startTime: ReporterUtils.timestampToRFC3339(this.startTime),
    };
    shard.uploadCompleted = false;
    return shard;
  }

  public getTestRunShardEndObject(
    result: FullResult,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    shard: Shard,
    errorMessages: string[],
    attachmentMetadata: UploadMetadata,
    workers: number,
  ): Shard {
    shard.shardId = this.envVariables.shardId ?? "1";
    shard.summary.totalTime = result.duration;
    shard.summary.endTime = ReporterUtils.timestampToRFC3339(Date.now());
    shard.summary.status = TestRunStatus.CLIENT_COMPLETE;
    shard.summary.errorMessages = errorMessages;
    shard.summary.uploadMetadata = attachmentMetadata;
    shard.uploadCompleted = true;
    shard.workers = workers;
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

    let browserName = test.parent.project()!.use.browserName?.toLowerCase();
    if (!browserName) {
      browserName = test.parent.project()!.use.defaultBrowserType?.toLowerCase();
    }
    const testResult = new MPTTestResult();
    testResult.runId = this.envVariables.runId;
    testResult.shardId = this.envVariables.runId + "_" + this.envVariables.shardId;
    testResult.accountId = this.envVariables.accountId!;
    testResult.suiteId = ReporterUtils.calculateSha1(`${test.parent.title}-${test.location.file}`);
    testResult.testId = testResult.suiteId.concat(`-${ReporterUtils.calculateSha1(test.title)}`);
    testResult.testCombinationId = test.id;
    testResult.testExecutionId = randomUUID();
    testResult.testTitle = test.title;
    testResult.suiteTitle = this.extractRootParentTitle(test.parent)!;
    testResult.fileName = test.location.file;
    testResult.status = this.getTestStatus(test, result);
    testResult.lineNumber = test.location.line;
    testResult.retry = result.retry ? result.retry : 0;
    testResult.webTestConfig = {
      jobName: jobName,
      projectName: test.parent.project()!.name,
      browserType: browserName ? browserName.toUpperCase() : "",
      os: this.getOsName(),
    };
    testResult.annotations = this.extractTestAnnotations(test.annotations);
    testResult.tags = this.extractTestTags(test);
    testResult.resultsSummary = {
      status: result.status.toUpperCase(),
      duration: result.duration,
      startTime: result.startTime.toISOString().replace(/\.\d+Z$/, "Z"),
      attachmentsMetadata: this.getAttachmentStatus(result),
    };
    testResult.artifactsPath = result.attachments
      .filter((attachment) => attachment?.path !== null && attachment?.path !== undefined) // Filter attachments with defined and non-null path property
      .map(
        (attachment) =>
          `${testResult.testExecutionId}/${ReporterUtils.getFileRelativePath(attachment.path!)}`,
      );
    return testResult;
  }

  public generateMarkdownSummary(testRunUrl: string): void {
    try {
      if (CIInfoProvider.getCIProvider() === CI_PROVIDERS.GITHUB) {
        const markdownContent = `
#### Microsoft Playwright Testing run summary

#### Results:
  
![pass](https://img.shields.io/badge/status-passed-brightgreen) **Passed:** ${this.passedTests}
  
![fail](https://img.shields.io/badge/status-failed-red) **Failed:** ${this.failedTests}
  
![flaky](https://img.shields.io/badge/status-flaky-yellow) **Flaky:** ${this.flakyTests}
  
![skipped](https://img.shields.io/badge/status-skipped-lightgrey) **Skipped:** ${this.skippedTests}
  
#### For more details, visit the [service dashboard](${testRunUrl}).
    `;
        fs.writeFileSync(process.env["GITHUB_STEP_SUMMARY"]!, markdownContent);
      }
    } catch (err) {
      reporterLogger.error(`\nCould not generate markdown summary - ${err}`);
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
    const token = accessToken.split(".")[1]!;
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
      const payload = parts[1]!;
      const decodedPayload = Buffer.from(payload, "base64");

      // Parse the decoded payload as JSON
      const payloadObject = JSON.parse(decodedPayload.toString());

      // Check if the payload has an 'aud' claim
      return "aud" in payloadObject;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        return parts[parts.length - 1]!;
      }

      parts = filePath.split("\\");

      if (parts.length > 1) {
        return parts[parts.length - 1]!;
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

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  public static isTimeGreaterThanCurrentPlus10Minutes(sasUri: StorageUri): boolean {
    try {
      const url = new URL(sasUri.uri);
      const params = new URLSearchParams(url.search);
      const expiryTime = params.get("se"); // 'se' is the query parameter for the expiry time
      if (expiryTime) {
        const timestampFromIsoString = new Date(expiryTime).getTime();
        const currentTimestampPlus10Minutes = Date.now() + 10 * 60 * 1000;
        const isSasValidityGreaterThanCurrentTimePlus10Minutes =
          timestampFromIsoString > currentTimestampPlus10Minutes;
        if (!isSasValidityGreaterThanCurrentTimePlus10Minutes) {
          reporterLogger.info(
            `Sas rotation required because close to expiry, SasUriValidTillTime: ${timestampFromIsoString}, CurrentTime: ${currentTimestampPlus10Minutes}`,
          );
        }
        return isSasValidityGreaterThanCurrentTimePlus10Minutes;
      }
      reporterLogger.error(`Sas rotation required because expiry param not found.`);
      return false;
    } catch (error) {
      reporterLogger.error(`Sas rotation required because of ${error}.`);
      return false;
    }
  }

  public static getFileSize(attachmentPath: string): number {
    try {
      const stats = fs.statSync(attachmentPath);
      return stats.size;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
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
  public static getRegionFromAccountID(accountId: string): string | undefined {
    if (accountId.includes("_")) {
      return accountId.split("_")[0]!;
    } else {
      return;
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
      repeatEach: this.config.projects[0].repeatEach,
      retries: this.config.projects[0].retries,
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  private getTestStatus(test: TestCase, result: TestResult): string {
    if (test.expectedStatus === result.status) {
      if (result.status === "skipped") {
        return "SKIPPED";
      } else {
        return "PASSED";
      }
    } else if (result.status === "interrupted") {
      return "SKIPPED";
    } else {
      return "FAILED";
    }
  }

  private extractRootParentTitle(suite: Suite): string | undefined {
    // Traverse through the parent properties until reaching the root parent
    let currentSuite: Suite | undefined = suite;
    let depthCount: number = 0;
    let suiteTitle: string = currentSuite.title;
    const projectName = currentSuite.project()!.name;
    while (currentSuite?.parent && !ReporterUtils.isNullOrEmpty(currentSuite.parent.title)) {
      if (depthCount > 10 || currentSuite.parent.title === projectName) {
        break;
      }
      suiteTitle = suiteTitle + " > " + currentSuite.parent.title;
      currentSuite = currentSuite.parent;
      depthCount++;
    }
    return suiteTitle;
  }

  private async getRunName(ciInfo: CIInfo): Promise<string> {
    if (
      ciInfo.provider === CI_PROVIDERS.GITHUB &&
      process.env["GITHUB_EVENT_NAME"] === "pull_request"
    ) {
      const prNumber: string = `${process.env["GITHUB_REF_NAME"]?.split("/")[0]}`;
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
      reporterLogger.error(`\nError in getting git commit message: ${err}.`);
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

  private getOsName(): string {
    const osType = os.type();
    switch (osType) {
      case "Darwin":
        return "MAC";
      case "Linux":
        return "LINUX";
      case "Windows_NT":
        return "WINDOWS";
      default:
        return "UNKNOWN";
    }
  }
}

export default ReporterUtils;
