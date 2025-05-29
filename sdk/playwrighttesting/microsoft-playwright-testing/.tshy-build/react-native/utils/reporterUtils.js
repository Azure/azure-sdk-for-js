// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { exec } from "node:child_process";
import { reporterLogger } from "../common/logger.js";
import { createHash, randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { Constants } from "../common/constants.js";
import { TokenType } from "../model/mptTokenDetails.js";
import { Shard, TestRunStatus } from "../model/shard.js";
import { TestResult as MPTTestResult } from "../model/testResult.js";
import { TestRun } from "../model/testRun.js";
import { CI_PROVIDERS } from "./cIInfoProvider.js";
import { CIInfoProvider } from "./cIInfoProvider.js";
import { getPackageVersion } from "./utils.js";
class ReporterUtils {
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    constructor(envVariables, config, _) {
        this.config = config;
        this.envVariables = envVariables;
        this.startTime = Date.now();
        this.totalTests = 0;
        this.failedTests = 0;
        this.skippedTests = 0;
        this.passedTests = 0;
        this.flakyTests = 0;
    }
    async getTestRunObject(ciInfo) {
        const testRun = new TestRun();
        const runName = this.envVariables.runName || (await this.getRunName(ciInfo));
        testRun.testRunId = this.envVariables.runId;
        testRun.displayName = ReporterUtils.isNullOrEmpty(runName) ? this.envVariables.runId : runName;
        testRun.creatorName = this.envVariables.userName;
        testRun.creatorId = this.envVariables.userId;
        testRun.startTime = ReporterUtils.timestampToRFC3339(this.startTime);
        testRun.ciConfig = {
            ciProviderName: ciInfo.provider,
            branch: ciInfo.branch,
            author: ciInfo.author,
            commitId: ciInfo.commitId,
            revisionUrl: ciInfo.revisionUrl,
        };
        testRun.testRunConfig = this.getTestRunConfig();
        testRun.cloudReportingEnabled = "true";
        return testRun;
    }
    getTestRunShardStartObject() {
        const shard = new Shard();
        if (this.config.shard !== null && this.config.shard !== undefined) {
            this.envVariables.shardId = this.config.shard.current.toString();
        }
        else {
            this.envVariables.shardId = "1";
        }
        shard.shardId = this.envVariables.shardId;
        shard.summary = {
            startTime: ReporterUtils.timestampToRFC3339(this.startTime),
        };
        shard.uploadCompleted = false;
        return shard;
    }
    getTestRunShardEndObject(result, 
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    shard, errorMessages, attachmentMetadata, workers) {
        var _a;
        shard.shardId = (_a = this.envVariables.shardId) !== null && _a !== void 0 ? _a : "1";
        shard.summary.totalTime = result.duration;
        shard.summary.endTime = ReporterUtils.timestampToRFC3339(Date.now());
        shard.summary.status = TestRunStatus.CLIENT_COMPLETE;
        shard.summary.errorMessages = errorMessages;
        shard.summary.uploadMetadata = attachmentMetadata;
        shard.uploadCompleted = true;
        shard.workers = workers;
        return shard;
    }
    getOSName(result, data) {
        var _a, _b;
        try {
            for (const attachment of result.attachments) {
                if (attachment.name === data) {
                    const match = (_a = attachment === null || attachment === void 0 ? void 0 : attachment.contentType) === null || _a === void 0 ? void 0 : _a.match(/charset=(.*)/);
                    const charset = match && match.length > 1 ? match[1] : "utf-8";
                    return ((_b = attachment.body) === null || _b === void 0 ? void 0 : _b.toString(charset || "utf-8").toUpperCase()) || "";
                }
            }
        }
        catch (error) {
            reporterLogger.error(`Error in fetching OS -  ${error}`);
        }
        return "";
    }
    getTestResultObject(test, result, jobName) {
        var _a, _b, _c, _d;
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
        let browserName = (_b = (_a = test.parent.project()) === null || _a === void 0 ? void 0 : _a.use.browserName) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        if (!browserName) {
            browserName = (_d = (_c = test.parent.project()) === null || _c === void 0 ? void 0 : _c.use.defaultBrowserType) === null || _d === void 0 ? void 0 : _d.toLowerCase();
        }
        testResult.webTestConfig = {
            jobName: jobName,
            projectName: test.parent.project().name,
            browserType: browserName ? browserName.toUpperCase() : "",
            os: this.getOSName(result, Constants.OS),
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
            .filter((attachment) => (attachment === null || attachment === void 0 ? void 0 : attachment.path) !== null && (attachment === null || attachment === void 0 ? void 0 : attachment.path) !== undefined) // Filter attachments with defined and non-null path property
            .map((attachment) => `${testResult.testExecutionId}/${ReporterUtils.getFileRelativePath(attachment.path)}`);
        return testResult;
    }
    generateMarkdownSummary(testRunUrl) {
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
                fs.writeFileSync(process.env["GITHUB_STEP_SUMMARY"], markdownContent);
            }
        }
        catch (err) {
            reporterLogger.error(`\nCould not generate markdown summary - ${err}`);
        }
    }
    getRawTestResultObject(result) {
        const rawTestResult = {
            steps: this.dedupeSteps(result.steps).map((step) => this.serializeTestStep(step)),
            errors: this.getTestError(result),
            stdErr: result.stderr ? JSON.stringify(result.stderr, null, 2) : "",
            stdOut: result.stdout ? JSON.stringify(result.stdout, null, 2) : "",
        };
        return rawTestResult;
    }
    static getRunId(cIInfo) {
        if (cIInfo === null || cIInfo.provider === CI_PROVIDERS.DEFAULT) {
            return randomUUID();
        }
        const concatString = `${cIInfo.provider}-${cIInfo.repo}-${cIInfo.runId}-${cIInfo.runAttempt}`;
        const runId = ReporterUtils.calculateSha1(concatString);
        return runId;
    }
    static calculateSha1(buffer) {
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
    static getTokenDetails(accessToken, tokenType) {
        const token = accessToken.split(".")[1];
        const _token = Buffer.from(token, "base64");
        const tokenDetails = JSON.parse(_token.toString());
        switch (tokenType) {
            case TokenType.MPT:
                return tokenDetails;
            case TokenType.ENTRA:
                return tokenDetails;
            default:
                throw new Error("Unsupported token type");
        }
    }
    static hasAudienceClaim(token) {
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
        }
        catch (error) {
            return false;
        }
    }
    static timestampToRFC3339(timestamp) {
        const date = new Date(timestamp);
        const dateString = date.toISOString().replace(/\.\d+Z$/, "Z");
        return dateString;
    }
    static getFileRelativePath(filePath) {
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
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    static isTimeGreaterThanCurrentPlus10Minutes(sasUri) {
        try {
            const url = new URL(sasUri.uri);
            const params = new URLSearchParams(url.search);
            const expiryTime = params.get("se"); // 'se' is the query parameter for the expiry time
            if (expiryTime) {
                const timestampFromIsoString = new Date(expiryTime).getTime();
                const currentTimestampPlus10Minutes = Date.now() + 10 * 60 * 1000;
                const isSasValidityGreaterThanCurrentTimePlus10Minutes = timestampFromIsoString > currentTimestampPlus10Minutes;
                if (!isSasValidityGreaterThanCurrentTimePlus10Minutes) {
                    reporterLogger.info(`Sas rotation required because close to expiry, SasUriValidTillTime: ${timestampFromIsoString}, CurrentTime: ${currentTimestampPlus10Minutes}`);
                }
                return isSasValidityGreaterThanCurrentTimePlus10Minutes;
            }
            reporterLogger.error(`Sas rotation required because expiry param not found.`);
            return false;
        }
        catch (error) {
            reporterLogger.error(`Sas rotation required because of ${error}.`);
            return false;
        }
    }
    static getFileSize(attachmentPath) {
        try {
            const stats = fs.statSync(attachmentPath);
            return stats.size;
        }
        catch (error) {
            return 0;
        }
    }
    static getBufferSize(attachmentBody) {
        try {
            const fileSizeInBytes = attachmentBody.length;
            return fileSizeInBytes;
        }
        catch (error) {
            return 0;
        }
    }
    redactAccessToken(info) {
        if (!info || ReporterUtils.isNullOrEmpty(this.envVariables.accessToken)) {
            return "";
        }
        const accessTokenRegex = new RegExp(this.envVariables.accessToken, "g");
        return info.replace(accessTokenRegex, Constants.DEFAULT_REDACTED_MESSAGE);
    }
    static getRegionFromAccountID(accountId) {
        if (accountId.includes("_")) {
            return accountId.split("_")[0];
        }
        else {
            return;
        } // Handling for older workspaces without region in id
    }
    progressBar(current, total) {
        const width = 40;
        const percent = current / total;
        const completed = Math.round(width * percent);
        const remaining = width - completed;
        if (current % Math.round(total / 5) === 0 || current === total) {
            process.stdout.write("\r");
            process.stdout.write(`[${"=".repeat(completed)}${" ".repeat(remaining)}] ${Math.round(percent * 100)}%`);
        }
    }
    getTestRunConfig() {
        const testRunConfig = {
            workers: this.getWorkers(),
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
            reporterPackageVersion: getPackageVersion(),
        };
        return testRunConfig;
    }
    relativeLocation(location) {
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
    extractTestTags(input) {
        let tags = [];
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
        }
        catch (error) {
            // Ignore parsing errors
        }
        return tags;
    }
    extractTestAnnotations(annotations) {
        const result = annotations.map((annotation) => {
            if (annotation.type && annotation.description) {
                return `${annotation.type}: ${annotation.description}`;
            }
            return annotation.type;
        });
        return result;
    }
    toPosixPath(aPath) {
        return aPath.split(path.sep).join(path.posix.sep);
    }
    getAttachmentStatus(testResult) {
        let attachmentStatus = "";
        for (const attachment of testResult.attachments) {
            if (attachment.contentType.includes("image")) {
                if (attachmentStatus !== "") {
                    attachmentStatus += ",";
                }
                attachmentStatus += "image";
            }
            else if (attachment.contentType.includes("video")) {
                if (attachmentStatus !== "") {
                    attachmentStatus += ",";
                }
                attachmentStatus += "video";
            }
            else if (attachment.contentType === "application/zip") {
                if (attachmentStatus !== "") {
                    attachmentStatus += ",";
                }
                attachmentStatus += "trace";
            }
            else if (attachment.contentType === "text/plain") {
                if (attachmentStatus !== "") {
                    attachmentStatus += ",";
                }
                attachmentStatus += "txt";
            }
        }
        return attachmentStatus;
    }
    dedupeSteps(steps) {
        var _a, _b, _c, _d, _e, _f, _g;
        const result = [];
        let lastResult = undefined;
        for (const step of steps) {
            const canDedupe = !step.error && step.duration >= 0 && ((_a = step.location) === null || _a === void 0 ? void 0 : _a.file) && !step.steps.length;
            const lastStep = lastResult === null || lastResult === void 0 ? void 0 : lastResult.step;
            if (canDedupe &&
                lastResult &&
                lastStep &&
                step.category === lastStep.category &&
                step.title === lastStep.title &&
                ((_b = step.location) === null || _b === void 0 ? void 0 : _b.file) === ((_c = lastStep.location) === null || _c === void 0 ? void 0 : _c.file) &&
                ((_d = step.location) === null || _d === void 0 ? void 0 : _d.line) === ((_e = lastStep.location) === null || _e === void 0 ? void 0 : _e.line) &&
                ((_f = step.location) === null || _f === void 0 ? void 0 : _f.column) === ((_g = lastStep.location) === null || _g === void 0 ? void 0 : _g.column)) {
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
    serializeTestStep(dedupedStep) {
        const { step, duration, count } = dedupedStep;
        const result = {
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
    getTestStatus(test, result) {
        if (test.expectedStatus === result.status) {
            if (result.status === "skipped") {
                return "SKIPPED";
            }
            else {
                return "PASSED";
            }
        }
        else if (result.status === "interrupted") {
            return "SKIPPED";
        }
        else {
            return "FAILED";
        }
    }
    extractRootParentTitle(suite) {
        // Traverse through the parent properties until reaching the root parent
        let currentSuite = suite;
        let depthCount = 0;
        let suiteTitle = currentSuite.title;
        const projectName = currentSuite.project().name;
        while ((currentSuite === null || currentSuite === void 0 ? void 0 : currentSuite.parent) && !ReporterUtils.isNullOrEmpty(currentSuite.parent.title)) {
            if (depthCount > 10 || currentSuite.parent.title === projectName) {
                break;
            }
            suiteTitle = suiteTitle + " > " + currentSuite.parent.title;
            currentSuite = currentSuite.parent;
            depthCount++;
        }
        return suiteTitle;
    }
    async getRunName(ciInfo) {
        var _a;
        if (ciInfo.provider === CI_PROVIDERS.GITHUB &&
            process.env["GITHUB_EVENT_NAME"] === "pull_request") {
            const prNumber = `${(_a = process.env["GITHUB_REF_NAME"]) === null || _a === void 0 ? void 0 : _a.split("/")[0]}`;
            const prLink = `${process.env["GITHUB_REPOSITORY"]}/pull/${prNumber}`;
            return `PR# ${prNumber} on Repo: ${process.env["GITHUB_REPOSITORY"]} (${prLink})`;
        }
        let gitCommitMessage = null;
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
        }
        catch (err) {
            reporterLogger.error(`\nError in getting git commit message: ${err}.`);
            return "";
        }
    }
    async runCommand(command) {
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
    static isNullOrEmpty(str) {
        return !str || str.trim() === "";
    }
    getTestError(result) {
        if (!result.errors || result.errors.length === 0)
            return "";
        const errorMessages = [];
        result.errors.forEach((error) => {
            if (error.message)
                errorMessages.push({ message: error.message });
            if (error.snippet && error.location) {
                errorMessages.push({
                    message: error.snippet + "\n\n" + this.getReadableLineLocation(error.location),
                });
            }
            else if (error.snippet)
                errorMessages.push({ message: error.snippet });
        });
        return JSON.stringify(errorMessages, null, 2);
    }
    getReadableLineLocation(location) {
        return `at ${location.file}:${location.line}:${location.column}`;
    }
    getWorkers() {
        if (this.config.metadata &&
            "actualWorkers" in this.config.metadata &&
            typeof this.config.metadata.actualWorkers === "number") {
            return this.config.metadata.actualWorkers;
        }
        return this.config.workers;
    }
}
ReporterUtils.getReporterBackOffOptions = {
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
export default ReporterUtils;
//# sourceMappingURL=reporterUtils.js.map