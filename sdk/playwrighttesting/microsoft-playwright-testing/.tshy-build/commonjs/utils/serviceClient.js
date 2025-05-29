"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceClient = void 0;
const constants_js_1 = require("../common/constants.js");
const httpService_js_1 = require("../common/httpService.js");
const logger_js_1 = require("../common/logger.js");
class ServiceClient {
    constructor(
    /* eslint-disable @azure/azure-sdk/ts-use-interface-parameters */
    envVariables, reporterUtils, 
    /* eslint-enable @azure/azure-sdk/ts-use-interface-parameters */
    addErrorInformation, isInformationMessagePresent, addKeyToInformationMessage) {
        this.httpService = new httpService_js_1.HttpService();
        this.envVariables = envVariables;
        this.reporterUtils = reporterUtils;
        this.addInformationalMessage = addErrorInformation;
        this.isInformationMessagePresent = isInformationMessagePresent;
        this.addKeyToInformationMessage = addKeyToInformationMessage;
    }
    async patchTestRun(ciInfo) {
        const testRun = await this.reporterUtils.getTestRunObject(ciInfo);
        // Escape the runId to avoid issues with special characters
        const escapedRunId = encodeURIComponent(this.envVariables.runId);
        const response = await this.httpService.callAPI("PATCH", `${this.getServiceEndpoint()}/${constants_js_1.Constants.testRunsEndpoint.replace("{workspaceId}", this.envVariables.accountId)}/${escapedRunId}?api-version=${constants_js_1.Constants.API_VERSION}`, JSON.stringify(testRun), this.envVariables.accessToken, "application/merge-patch+json", this.envVariables.correlationId);
        if (response.status === 200) {
            return JSON.parse(response.bodyAsText);
        }
        else if (response.status === 409) {
            const errorMessage = constants_js_1.Constants.CONFLICT_409_ERROR_MESSAGE.replace("{runId}", this.envVariables.runId);
            this.addInformationalMessage(errorMessage);
            process.stdout.write(`\n${errorMessage}`);
        }
        else if (response.status === 403) {
            const errorMessage = constants_js_1.Constants.FORBIDDEN_403_ERROR_MESSAGE.replace(new RegExp("{workspaceId}", "g"), this.envVariables.accountId);
            this.addInformationalMessage(errorMessage);
            process.stdout.write(`\n${errorMessage}`);
        }
        else {
            this.handleErrorResponse(response, constants_js_1.Constants.patchTestRun);
        }
        throw new Error(`Received status ${response.status} from service from PATCH TestRun call.`);
    }
    async postTestRunShardStart() {
        const postTestRunShardObject = this.reporterUtils.getTestRunShardStartObject();
        const escapedRunId = encodeURIComponent(this.envVariables.runId);
        const response = await this.httpService.callAPI("POST", `${this.getServiceEndpoint()}/${constants_js_1.Constants.testRunsShardEndpoint.replace("{workspaceId}", this.envVariables.accountId).replace("{testRunId}", escapedRunId)}/?api-version=${constants_js_1.Constants.API_VERSION}`, JSON.stringify(postTestRunShardObject), this.envVariables.accessToken, "application/json", this.envVariables.correlationId);
        if (response.status === 200) {
            return JSON.parse(response.bodyAsText);
        }
        this.handleErrorResponse(response, constants_js_1.Constants.patchTestRunShardStart);
        throw new Error(`Received status ${response.status} from service from PATCH TestRun Shard Start call.`);
    }
    async postTestRunShardEnd(result, 
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    shard, errorMessages, attachmentMetadata, workers) {
        const postTestRunShardObject = this.reporterUtils.getTestRunShardEndObject(result, shard, errorMessages, attachmentMetadata, workers);
        const escapedRunId = encodeURIComponent(this.envVariables.runId);
        const response = await this.httpService.callAPI("POST", `${this.getServiceEndpoint()}/${constants_js_1.Constants.testRunsShardEndpoint.replace("{workspaceId}", this.envVariables.accountId).replace("{testRunId}", escapedRunId)}/?api-version=${constants_js_1.Constants.API_VERSION}`, JSON.stringify(postTestRunShardObject), this.envVariables.accessToken, "application/json", this.envVariables.correlationId);
        if (response.status === 200) {
            return JSON.parse(response.bodyAsText);
        }
        this.handleErrorResponse(response, constants_js_1.Constants.patchTestRunShardEnd);
        throw new Error(`Received status ${response.status} from service from PATCH TestRun Shard End call.`);
    }
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    async postTestResults(testResults) {
        try {
            const payload = {
                value: testResults,
            };
            const response = await this.httpService.callAPI("POST", `${this.getServiceEndpoint()}/${constants_js_1.Constants.testResultsEndpoint.replace("{workspaceId}", this.envVariables.accountId)}?api-version=${constants_js_1.Constants.API_VERSION}`, JSON.stringify(payload), this.envVariables.accessToken, "application/json", this.envVariables.correlationId);
            if (response.status === 200) {
                return;
            }
            this.handleErrorResponse(response, constants_js_1.Constants.postTestResults);
        }
        catch (error) {
            logger_js_1.reporterLogger.error(`Error occurred while posting test results: ${error}`);
        }
    }
    async createStorageUri() {
        const escapedRunId = encodeURIComponent(this.envVariables.runId);
        const response = await this.httpService.callAPI("POST", `${this.getServiceEndpoint()}/${constants_js_1.Constants.storageUriEndpoint.replace("{workspaceId}", this.envVariables.accountId).replace("{testRunId}", escapedRunId)}?api-version=${constants_js_1.Constants.API_VERSION}`, null, this.envVariables.accessToken, "application/json", this.envVariables.correlationId);
        if (response.status === 200) {
            return JSON.parse(response.bodyAsText);
        }
        this.handleErrorResponse(response, constants_js_1.Constants.getStorageUri);
        throw new Error(`Received status ${response.status} from service from GET StorageUri call.`);
    }
    getServiceEndpoint() {
        return process.env[constants_js_1.InternalEnvironmentVariables.MPT_SERVICE_REPORTING_URL];
    }
    handleErrorResponse(response, action) {
        var _a, _b;
        const statusCode = response.status;
        const errorMessage = (_b = (_a = constants_js_1.Constants.ERROR_MESSAGE[action]) === null || _a === void 0 ? void 0 : _a[statusCode]) !== null && _b !== void 0 ? _b : "Unknown error occured.";
        if (!this.isInformationMessagePresent(statusCode.toString())) {
            this.addKeyToInformationMessage(statusCode.toString());
            this.addInformationalMessage(errorMessage);
        }
        process.stdout.write(`${errorMessage}\n`);
    }
}
exports.ServiceClient = ServiceClient;
//# sourceMappingURL=serviceClient.js.map