// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FullResult,
  TestCase,
  TestResult,
  FullConfig,
  Reporter,
  Suite,
} from "@playwright/test/reporter";
import { reporterLogger } from "../common/logger";
import {
  Constants,
  InternalServiceEnvironmentVariable,
  TestResultErrorConstants,
} from "../common/constants";
import { EnvironmentVariables } from "../common/environmentVariables";
import { MultiMap } from "../common/multimap";
import { EntraTokenDetails } from "../model/entraTokenDetails";
import { MPTTokenDetails, TokenType } from "../model/mptTokenDetails";
import { Shard, UploadMetadata } from "../model/shard";
import { StorageUri } from "../model/storageUri";
import { TestResult as MPTTestResult, RawTestResult } from "../model/testResult";
import { TestRun } from "../model/testRun";
import { CIInfo, CIInfoProvider } from "../utils/cIInfoProvider";
import ReporterUtils from "../utils/reporterUtils";
import { ServiceClient } from "../utils/serviceClient";
import { StorageClient } from "../utils/storageClient";
import { MPTReporterConfig } from "../common/types";
import { ServiceErrorMessageConstants } from "../common/messages";

/**
 * @public
 *
 * Extends Playwright's Reporter class to enable Microsoft Playwright Testing's Reporting
 * feature to publish test results and related artifacts and
 * view them in the service portal for faster and easier troubleshooting.
 *
 * @example
 *
 * ```
 * import { defineConfig } from "@playwright/test";
 *
 * export default defineConfig({
 *  reporter: [["@azure/microsoft-playwright-testing"]]
 * });
 * ```
 */
class MPTReporter implements Reporter {
  private isTokenValid: boolean = true;
  private enableGitHubSummary = true;
  private isRegionValid: boolean = true;
  private shard!: Shard;
  private isTestRunStartSuccess: boolean = false;
  private ciInfo: CIInfo = CIInfoProvider.getCIInfo();
  private serviceClient!: ServiceClient;
  private storageClient!: StorageClient;
  private reporterUtils!: ReporterUtils;
  private envVariables!: EnvironmentVariables;
  private testRawResults = new MultiMap<string, string>();
  private promiseOnBegin!: Promise<boolean>;
  private _testEndPromises: Promise<void>[] = [];
  private testResultBatch: Set<MPTTestResult> = new Set<MPTTestResult>();
  private errorMessages: string[] = [];
  private informationalMessages: string[] = [];
  private processedErrorMessageKeys: string[] = [];
  private sasUri!: StorageUri;
  private uploadMetadata: UploadMetadata = {
    numTestResults: 0,
    numTotalAttachments: 0,
    sizeTotalAttachments: 0,
  };
  private numWorkers: number = -1;
  private testRunUrl: string = "";
  private enableResultPublish: boolean = true;

  constructor(config: Partial<MPTReporterConfig>) {
    if (config?.enableGitHubSummary !== undefined) {
      this.enableGitHubSummary = config.enableGitHubSummary;
    }
    if (config?.enableResultPublish !== undefined) {
      this.enableResultPublish = config.enableResultPublish;
    }
  }
  private _addError(errorMessage: string): void {
    if (this.errorMessages.length < Constants.ERROR_MESSAGES_MAX_LENGTH) {
      this.errorMessages.push(this.reporterUtils.redactAccessToken(errorMessage));
    }
  }

  private _addInformationalMessage(message: string): void {
    this.informationalMessages.push(message);
  }

  /**
   * @public
   *
   * Called once before running tests.
   *
   * @param config - Resolved configuration.
   * @param suite - The root suite that contains all projects, files and test cases.
   */
  onBegin(config: FullConfig, suite: Suite): void {
    if (!this.enableResultPublish) return;
    this.initializeMPTReporter();
    this.reporterUtils = new ReporterUtils(this.envVariables, config, suite);
    if (this.isTokenValid && this.isRegionValid) {
      this.serviceClient = new ServiceClient(this.envVariables, this.reporterUtils);
      this.promiseOnBegin = this._onBegin();
    }
  }

  /**
   * @public
   *
   * Called after a test has been finished in the worker process.
   *
   * @param test - Test that has been finished.
   * @param result - Result of the test run.
   */
  onTestEnd(test: TestCase, result: TestResult): void {
    this.numWorkers = Math.max(this.numWorkers, result.parallelIndex + 1);
    this.processTestResult(result);
    if (!this.enableResultPublish) return;
    // Process test result
    this._onTestEnd(test, result);
    // Upload the test results batch
    try {
      if (this.testResultBatch.size >= Constants.TEST_BATCH_SIZE) {
        const currResultBatch: MPTTestResult[] = [...this.testResultBatch];
        if (this.isTestRunStartSuccess) {
          this._testEndPromises.push(this.serviceClient.postTestResults(currResultBatch));
          reporterLogger.info(`\nAdded test results batch for upload.`);
          this.testResultBatch.clear();
        }
      }
    } catch (err: any) {
      this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
      reporterLogger.error(`\nError in uploading test results: ${err.message}.`);
    }
  }

  /**
   * @public
   *
   * Called after all tests have been run, or testing has been interrupted. Note that this method may return a [Promise]
   * and Playwright Test will await it. Reporter is allowed to override the status and hence affect the exit code of the
   * test runner.
   *
   * @param result - Result of the full test run, `status` can be one of:
   * - `'passed'` - Everything went as expected.
   * - `'failed'` - Any test has failed.
   * - `'timedout'` - The
   * {@link https://playwright.dev/docs/api/class-testconfig#test-config-global-timeout | testConfig.globalTimeout} has
   * been reached.
   * - `'interrupted'` - Interrupted by the user.
   */
  async onEnd(result: FullResult): Promise<void> {
    if (this.enableResultPublish) {
      await this._onEnd(result);
      if (!this.isTestRunStartSuccess) {
        this._addError(`\nUnable to initialize test run report.`);
      } else {
        let count: number = 0;
        process.stdout.write("\nUploading test results.");
        await Promise.allSettled(this._testEndPromises).then((values) => {
          values.forEach((value) => {
            if (value.status === "fulfilled") {
              count++;
              this.reporterUtils.progressBar(count, this._testEndPromises.length);
            }
            return value.status;
          });
          reporterLogger.info(`\nTest result processing completed.`);
          return values;
        });
        try {
          await this.serviceClient.patchTestRunShardEnd(
            result,
            this.shard,
            this.errorMessages,
            this.uploadMetadata,
          );
          reporterLogger.info(`\nTest run successfully uploaded.`);

          if (this.enableGitHubSummary) {
            this.reporterUtils.generateMarkdownSummary(this.testRunUrl);
          }

          process.stdout.write(`\nTest report: ${this.testRunUrl}\n`);
        } catch (err: any) {
          this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
          reporterLogger.error(`\nError in completing test run: ${err.message}`);
          process.stdout.write(`\nUnable to complete test results upload.`);
        }
      }
    }
    this.displayAdditionalInformation();
  }

  private async _onBegin(): Promise<boolean> {
    try {
      const testRunResponse: TestRun | undefined = await this.serviceClient.patchTestRun(
        this.ciInfo,
      );
      reporterLogger.info(
        `\nTest run report successfully initialized: ${testRunResponse?.displayName}.`,
      );
      process.stdout.write(
        `\nInitializing reporting for this test run. You can view the results at: https://playwright.microsoft.com/workspaces/${this.envVariables.accountId}/runs/${this.envVariables.runId}\n`,
      );
      const shardResponse = await this.serviceClient.patchTestRunShardStart();
      this.shard = shardResponse;
      // Set test report link as environment variable. If/else to check if environment variable defined or not.
      if (
        Constants.DEFAULT_SERVICE_ENDPOINT &&
        this.envVariables.accountId &&
        this.envVariables.runId
      ) {
        this.testRunUrl = `${Constants.DEFAULT_DASHBOARD_ENDPOINT}/workspaces/${encodeURI(
          this.envVariables.accountId,
        )}/runs/${encodeURI(this.envVariables.runId)}`;
      }
      return true;
    } catch (err: any) {
      this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
      reporterLogger.error(`\nError in initializing test run report: ${err.message}.`);
      return false;
    }
  }

  private async _onTestEnd(test: TestCase, result: TestResult): Promise<undefined> {
    try {
      this.isTestRunStartSuccess = await this.promiseOnBegin;
      if (!this.isTestRunStartSuccess) {
        this._addError(`\nUnable to initialize test run report.`);
        return;
      }
      this.uploadMetadata.numTestResults++;
      const testResultObject: MPTTestResult = this.reporterUtils.getTestResultObject(
        test,
        result,
        this.ciInfo.jobId!,
      );
      this.testResultBatch.add(testResultObject);
      // Store test attachments in array
      const testAttachments: string[] = [];
      for (const attachment of result.attachments) {
        if (attachment.path !== undefined && attachment.path !== "") {
          testAttachments.push(attachment.path);
          this.uploadMetadata.numTotalAttachments++;
          this.uploadMetadata.sizeTotalAttachments += ReporterUtils.getFileSize(attachment.path);
        }
      }

      // Get raw result object and store it in map
      const rawTestResult: RawTestResult = this.reporterUtils.getRawTestResultObject(result);
      this.testRawResults.set(testResultObject.testExecutionId, JSON.stringify(rawTestResult));
      this._testEndPromises.push(
        this._uploadTestResultAttachments(testResultObject.testExecutionId, testAttachments),
      );
    } catch (err: any) {
      this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
      reporterLogger.error(`\nError in processing test result: ${err.message}.`);
    }
  }

  private async _onEnd(_: FullResult): Promise<void> {
    this.isTestRunStartSuccess = await this.promiseOnBegin;
    if (!this.isTestRunStartSuccess) {
      this._addError(`\nUnable to initialize test run report.`);
      return;
    }
    try {
      // Upload the remaining test results
      if (this.testResultBatch.size > 0) {
        await this.serviceClient.postTestResults([...this.testResultBatch]);
        reporterLogger.info(`\nUploaded test results batch successfully.`);
        this.testResultBatch.clear();
      }
    } catch (err: any) {
      this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
      reporterLogger.error(`\nError in uploading test run information: ${err.message}`);
    }
  }

  private async _uploadTestResultAttachments(
    testExecutionId: string,
    testAttachments: string[],
  ): Promise<void> {
    try {
      this.isTestRunStartSuccess = await this.promiseOnBegin;
      if (!this.isTestRunStartSuccess) {
        this._addError(`\nUnable to initialize test run report.`);
        return;
      }
      for (const attachmentPath of testAttachments) {
        const fileRelativePath = `${testExecutionId}/${ReporterUtils.getFileRelativePath(
          attachmentPath,
        )}`;
        if (
          this.sasUri === undefined ||
          !ReporterUtils.isTimeGreaterThanCurrentPlus10Minutes(this.sasUri.expiresAt)
        ) {
          // Renew the sas uri
          this.sasUri = await this.serviceClient.getStorageUri();
          reporterLogger.info(
            `\nFetched SAS URI with validity: ${this.sasUri.expiresAt} and access: ${this.sasUri.accessLevel}.`,
          );
        }
        this.storageClient.uploadFile(this.sasUri.uri, attachmentPath, fileRelativePath);
      }
      const rawTestResult = this.testRawResults.get(testExecutionId);
      if (
        this.sasUri === undefined ||
        !ReporterUtils.isTimeGreaterThanCurrentPlus10Minutes(this.sasUri.expiresAt)
      ) {
        // Renew the sas uri
        this.sasUri = await this.serviceClient.getStorageUri();
      }
      this.storageClient.uploadBuffer(
        this.sasUri.uri,
        rawTestResult[0]!,
        `${testExecutionId}/rawTestResult.json`,
      );
    } catch (err: any) {
      this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
      reporterLogger.error(`\nError in uploading test result attachments: ${err.message}`);
    }
  }

  private initializeMPTReporter(): void {
    this.envVariables = new EnvironmentVariables();
    if (!process.env["PLAYWRIGHT_SERVICE_REPORTING_URL"]) {
      process.stdout.write("\nReporting service url not found.");
      this.isTokenValid = false;
      return;
    }
    reporterLogger.info(`Reporting url - ${process.env["PLAYWRIGHT_SERVICE_REPORTING_URL"]}`);
    if (this.envVariables.accessToken === undefined || this.envVariables.accessToken === "") {
      process.stdout.write(`\n${ServiceErrorMessageConstants.NO_AUTH_ERROR}`);
      this.isTokenValid = false;
    } else if (ReporterUtils.hasAudienceClaim(this.envVariables.accessToken)) {
      const result = ReporterUtils.populateValuesFromServiceUrl();
      this.envVariables.region = result!.region;
      this.envVariables.accountId = result!.accountId;
      const entraTokenDetails: EntraTokenDetails = ReporterUtils.getTokenDetails<EntraTokenDetails>(
        this.envVariables.accessToken,
        TokenType.ENTRA,
      );
      this.envVariables.userId = entraTokenDetails.oid;
      this.envVariables.userName = entraTokenDetails.name;
    } else {
      const mptTokenDetails: MPTTokenDetails = ReporterUtils.getTokenDetails<MPTTokenDetails>(
        this.envVariables.accessToken,
        TokenType.MPT,
      );
      this.envVariables.accountId = mptTokenDetails.aid;
      this.envVariables.userId = mptTokenDetails.oid;
      this.envVariables.userName = mptTokenDetails.userName;
      this.envVariables.region = ReporterUtils.getRegionFromAccountID(this.envVariables.accountId!);
    }
    this.storageClient = new StorageClient();
    if (
      this.envVariables.region !== null &&
      !Constants.SupportedRegions.includes(this.envVariables.region!) &&
      this.isTokenValid
    ) {
      process.stdout.write(
        `\nUnsupported region's workspace used to generate the input Access Token; the supported regions are ${Constants.SupportedRegions.join(
          ", ",
        )}`,
      );
      this.isRegionValid = false;
    }
    if (this.envVariables.runId === undefined || this.envVariables.runId === "") {
      this.envVariables.runId = ReporterUtils.getRunId(this.ciInfo);
    }
  }

  private displayAdditionalInformation(): void {
    if (this.informationalMessages.length > 0) console.info(); // Add a new line before displaying the messages
    this.informationalMessages.forEach((message, index) => {
      console.info(`${index + 1}. ${message}`);
    });
  }

  private processTestResult(result: TestResult): void {
    if (
      process.env[
        InternalServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_CLOUD_HOSTED_BROWSER_USED
      ] &&
      result.status !== "passed"
    ) {
      result.errors.forEach((error) => {
        TestResultErrorConstants.forEach((testResultErrorParseObj) => {
          if (this.processedErrorMessageKeys.includes(testResultErrorParseObj.key)) {
            return;
          }
          const errorMessage = error.message;
          if (!errorMessage) return;
          const match = errorMessage.match(testResultErrorParseObj.pattern);
          if (match) {
            this.processedErrorMessageKeys.push(testResultErrorParseObj.key);
            this._addInformationalMessage(testResultErrorParseObj.message);
          }
        });
      });
    }
  }

  /**
   * @public
   *
   * Whether this reporter uses stdio for reporting. When it does not, Playwright Test could add some output to enhance
   * user experience. If your reporter does not print to the terminal, it is strongly recommended to return `false`.
   */
  printsToStdio(): boolean {
    return true;
  }
}
export default MPTReporter;
