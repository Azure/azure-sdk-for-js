// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { reporterLogger } from "../common/logger.js";
import { Constants, InternalEnvironmentVariables, TestResultErrorConstants, } from "../common/constants.js";
import { EnvironmentVariables } from "../common/environmentVariables.js";
import { MultiMap } from "../common/multimap.js";
import { TokenType } from "../model/mptTokenDetails.js";
import { CIInfoProvider } from "../utils/cIInfoProvider.js";
import ReporterUtils from "../utils/reporterUtils.js";
import { ServiceClient } from "../utils/serviceClient.js";
import { StorageClient } from "../utils/storageClient.js";
import { ServiceErrorMessageConstants } from "../common/messages.js";
import { validateMptPAT, populateValuesFromServiceUrl } from "../utils/utils.js";
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
 *  reporter: [["@azure/microsoft-playwright-testing/reporter"]]
 * });
 * ```
 */
class MPTReporter {
    constructor(config) {
        this.isTokenValid = true;
        this.enableGitHubSummary = true;
        this.isRegionValid = true;
        this.isTestRunStartSuccess = false;
        this.ciInfo = CIInfoProvider.getCIInfo();
        this.testRawResults = new MultiMap();
        this._testEndPromises = [];
        this.testResultBatch = new Set();
        this.errorMessages = [];
        this.informationalMessages = [];
        this.processedErrorMessageKeys = [];
        this.uploadMetadata = {
            numTestResults: 0,
            numTotalAttachments: 0,
            sizeTotalAttachments: 0,
        };
        this.numWorkers = -1;
        this.testRunUrl = "";
        this.enableResultPublish = true;
        this._addInformationalMessage = (message) => {
            this.informationalMessages.push(message);
        };
        this._addKeyToInformationMessage = (key) => {
            this.processedErrorMessageKeys.push(key);
        };
        this._isInformationMessagePresent = (key) => {
            return this.processedErrorMessageKeys.includes(key);
        };
        this._reporterFailureHandler = (error) => {
            if (!this._isInformationMessagePresent(error.key)) {
                this._addKeyToInformationMessage(error.key);
                this._addInformationalMessage(error.message);
            }
            this.isTokenValid = false;
        };
        this.renewSasUriIfNeeded = async () => {
            if (this.sasUri === undefined ||
                !ReporterUtils.isTimeGreaterThanCurrentPlus10Minutes(this.sasUri)) {
                this.sasUri = await this.serviceClient.createStorageUri();
                reporterLogger.info(`\nFetched SAS URI with validity: ${this.sasUri.expiresAt} and access: ${this.sasUri.accessLevel}.`);
            }
        };
        if ((config === null || config === void 0 ? void 0 : config.enableGitHubSummary) !== undefined) {
            this.enableGitHubSummary = config.enableGitHubSummary;
        }
        if ((config === null || config === void 0 ? void 0 : config.enableResultPublish) !== undefined) {
            this.enableResultPublish = config.enableResultPublish;
        }
    }
    _addError(errorMessage) {
        if (this.errorMessages.length < Constants.ERROR_MESSAGES_MAX_LENGTH) {
            this.errorMessages.push(this.reporterUtils.redactAccessToken(errorMessage));
        }
    }
    /**
     * @public
     *
     * Called once before running tests.
     *
     * @param config - Resolved configuration.
     * @param suite - The root suite that contains all projects, files and test cases.
     */
    onBegin(config, suite) {
        if (!this.enableResultPublish)
            return;
        this.initializeMPTReporter();
        this.reporterUtils = new ReporterUtils(this.envVariables, config, suite);
        if (this.isTokenValid && this.isRegionValid) {
            this.serviceClient = new ServiceClient(this.envVariables, this.reporterUtils, this._addInformationalMessage, this._isInformationMessagePresent, this._addKeyToInformationMessage);
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
    onTestEnd(test, result) {
        this.numWorkers = Math.max(this.numWorkers, result.parallelIndex + 1);
        this.processTestResult(result);
        if (!this.enableResultPublish)
            return;
        // Process test result
        this._onTestEnd(test, result);
        // Upload the test results batch
        try {
            if (this.testResultBatch.size >= Constants.TEST_BATCH_SIZE) {
                const currResultBatch = [...this.testResultBatch];
                if (this.isTestRunStartSuccess) {
                    this._testEndPromises.push(this.serviceClient.postTestResults(currResultBatch));
                    reporterLogger.info(`\nAdded test results batch for upload.`);
                    this.testResultBatch.clear();
                }
            }
        }
        catch (err) {
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
    async onEnd(result) {
        if (this.enableResultPublish) {
            await this._onEnd(result);
            if (!this.isTestRunStartSuccess) {
                this._addError(`\nUnable to initialize test run report.`);
            }
            else {
                let count = 0;
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
                    await this.serviceClient.postTestRunShardEnd(result, this.shard, this.errorMessages, this.uploadMetadata, this.numWorkers);
                    reporterLogger.info(`\nTest run successfully uploaded.`);
                    if (this.enableGitHubSummary) {
                        this.reporterUtils.generateMarkdownSummary(this.testRunUrl);
                    }
                    process.stdout.write(`\nTest report: ${this.testRunUrl}\n`);
                }
                catch (err) {
                    this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
                    reporterLogger.error(`\nError in completing test run: ${err.message}`);
                    process.stdout.write(`\nUnable to complete test results upload.`);
                }
            }
        }
        this.displayAdditionalInformation();
    }
    async _onBegin() {
        process.stdout.write(`\n`);
        try {
            const testRunResponse = await this.serviceClient.patchTestRun(this.ciInfo);
            reporterLogger.info(`\nTest run report successfully initialized: ${testRunResponse === null || testRunResponse === void 0 ? void 0 : testRunResponse.displayName}.`);
            process.stdout.write(`Initializing reporting for this test run. You can view the results at: https://playwright.microsoft.com/workspaces/${encodeURIComponent(this.envVariables.accountId)}/runs/${encodeURIComponent(this.envVariables.runId)}\n`);
            const shardResponse = await this.serviceClient.postTestRunShardStart();
            this.shard = shardResponse;
            // Set test report link as environment variable. If/else to check if environment variable defined or not.
            if (Constants.DEFAULT_SERVICE_ENDPOINT &&
                this.envVariables.accountId &&
                this.envVariables.runId) {
                this.testRunUrl = `${Constants.DEFAULT_DASHBOARD_ENDPOINT}/workspaces/${encodeURIComponent(this.envVariables.accountId)}/runs/${encodeURIComponent(this.envVariables.runId)}`;
            }
            return true;
        }
        catch (err) {
            this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
            reporterLogger.error(`\nError in initializing test run report: ${err.message}.`);
            return false;
        }
    }
    async _onTestEnd(test, result) {
        try {
            this.isTestRunStartSuccess = await this.promiseOnBegin;
            if (!this.isTestRunStartSuccess) {
                this._addError(`\nUnable to initialize test run report.`);
                return;
            }
            this.uploadMetadata.numTestResults++;
            const testResultObject = this.reporterUtils.getTestResultObject(test, result, this.ciInfo.jobName);
            this.testResultBatch.add(testResultObject);
            // Store test attachments in array
            const testAttachments = [];
            const otherAttachments = [];
            for (const attachment of result.attachments) {
                if (attachment.path !== undefined && attachment.path !== "") {
                    testAttachments.push(attachment.path);
                    this.uploadMetadata.numTotalAttachments++;
                    this.uploadMetadata.sizeTotalAttachments += ReporterUtils.getFileSize(attachment.path);
                }
                else if (attachment.body instanceof Buffer) {
                    otherAttachments.push(attachment);
                    this.uploadMetadata.numTotalAttachments++;
                    this.uploadMetadata.sizeTotalAttachments += ReporterUtils.getBufferSize(attachment.body);
                }
            }
            // Get raw result object and store it in map
            const rawTestResult = this.reporterUtils.getRawTestResultObject(result);
            this.testRawResults.set(testResultObject.testExecutionId, JSON.stringify(rawTestResult));
            this._testEndPromises.push(this._uploadTestResultAttachments(testResultObject.testExecutionId, testAttachments, otherAttachments));
        }
        catch (err) {
            this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
            reporterLogger.error(`\nError in processing test result: ${err.message}.`);
        }
    }
    async _onEnd(_) {
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
        }
        catch (err) {
            this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
            reporterLogger.error(`\nError in uploading test run information: ${err.message}`);
        }
    }
    async _uploadTestResultAttachments(testExecutionId, testAttachments, otherAttachments) {
        var _a;
        try {
            this.isTestRunStartSuccess = await this.promiseOnBegin;
            if (!this.isTestRunStartSuccess) {
                this._addError(`\nUnable to initialize test run report.`);
                return;
            }
            for (const attachmentPath of testAttachments) {
                const fileRelativePath = `${testExecutionId}/${ReporterUtils.getFileRelativePath(attachmentPath)}`;
                await this.renewSasUriIfNeeded();
                await this.storageClient.uploadFile(this.sasUri.uri, attachmentPath, fileRelativePath);
            }
            for (const otherAttachment of otherAttachments) {
                await this.renewSasUriIfNeeded();
                const match = (_a = otherAttachment === null || otherAttachment === void 0 ? void 0 : otherAttachment.contentType) === null || _a === void 0 ? void 0 : _a.match(/charset=(.*)/);
                const charset = match && match.length > 1 ? match[1] : "utf-8";
                await this.storageClient.uploadBuffer(this.sasUri.uri, otherAttachment.body.toString(charset || "utf-8"), `${testExecutionId}/${otherAttachment.name}`);
            }
            const rawTestResult = this.testRawResults.get(testExecutionId);
            await this.renewSasUriIfNeeded();
            await this.storageClient.uploadBuffer(this.sasUri.uri, rawTestResult[0], `${testExecutionId}/rawTestResult.json`);
        }
        catch (err) {
            this._addError(`Name: ${err.name}, Message: ${err.message}, Stack: ${err.stack}`);
            reporterLogger.error(`\nError in uploading test result attachments: ${err.message}`);
        }
    }
    initializeMPTReporter() {
        this.envVariables = new EnvironmentVariables();
        if (process.env[InternalEnvironmentVariables.MPT_SETUP_FATAL_ERROR] === "true") {
            this.isTokenValid = false;
            return;
        }
        if (!process.env[InternalEnvironmentVariables.MPT_SERVICE_REPORTING_URL]) {
            process.stdout.write("\nReporting service url not found.");
            this.isTokenValid = false;
            return;
        }
        reporterLogger.info(`Reporting url - ${process.env[InternalEnvironmentVariables.MPT_SERVICE_REPORTING_URL]}`);
        if (this.envVariables.accessToken === undefined || this.envVariables.accessToken === "") {
            process.stdout.write(`\n${ServiceErrorMessageConstants.NO_AUTH_ERROR.message}`);
            this.isTokenValid = false;
        }
        else if (ReporterUtils.hasAudienceClaim(this.envVariables.accessToken)) {
            const result = populateValuesFromServiceUrl();
            this.envVariables.region = result.region;
            this.envVariables.accountId = result.accountId;
            const entraTokenDetails = ReporterUtils.getTokenDetails(this.envVariables.accessToken, TokenType.ENTRA);
            this.envVariables.userId = entraTokenDetails.oid;
            this.envVariables.userName = entraTokenDetails.name;
        }
        else {
            const mptTokenDetails = ReporterUtils.getTokenDetails(this.envVariables.accessToken, TokenType.MPT);
            validateMptPAT(this._reporterFailureHandler);
            this.envVariables.accountId = mptTokenDetails.aid;
            this.envVariables.userId = mptTokenDetails.oid;
            this.envVariables.userName = mptTokenDetails.userName;
            this.envVariables.region = ReporterUtils.getRegionFromAccountID(this.envVariables.accountId);
        }
        this.storageClient = new StorageClient();
        if (this.envVariables.region &&
            !Constants.SupportedRegions.includes(this.envVariables.region) &&
            this.isTokenValid) {
            process.stdout.write(`\nUnsupported region's workspace used to generate the input Access Token; the supported regions are ${Constants.SupportedRegions.join(", ")}`);
            this.isRegionValid = false;
        }
        if (this.envVariables.runId === undefined || this.envVariables.runId === "") {
            this.envVariables.runId = ReporterUtils.getRunId(this.ciInfo);
        }
    }
    displayAdditionalInformation() {
        if (this.informationalMessages.length > 0)
            console.info(); // Add a new line before displaying the messages
        this.informationalMessages.forEach((message, index) => {
            console.info(`${index + 1}. ${message}`);
        });
    }
    processTestResult(result) {
        if (process.env[InternalEnvironmentVariables.MPT_CLOUD_HOSTED_BROWSER_USED] &&
            result.status !== "passed") {
            result.errors.forEach((error) => {
                TestResultErrorConstants.forEach((testResultErrorParseObj) => {
                    if (this.processedErrorMessageKeys.includes(testResultErrorParseObj.key)) {
                        return;
                    }
                    const errorMessage = error.message;
                    if (!errorMessage)
                        return;
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
    printsToStdio() {
        return true;
    }
}
export default MPTReporter;
//# sourceMappingURL=mptReporter.js.map