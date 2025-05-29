"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recorder = void 0;
exports.calculatePaths = calculatePaths;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const utils_js_1 = require("./utils/utils.js");
const sessionFilePath_js_1 = require("./utils/sessionFilePath.js");
const paths_js_1 = require("./utils/paths.js");
const sanitizer_js_1 = require("./sanitizer.js");
const envSetupForPlayback_js_1 = require("./utils/envSetupForPlayback.js");
const matcher_js_1 = require("./matcher.js");
const transform_js_1 = require("./transform.js");
const createRecordingRequest_js_1 = require("./utils/createRecordingRequest.js");
const log_js_1 = require("./log.js");
const options_js_1 = require("./options.js");
const core_util_1 = require("@azure/core-util");
const encoding_js_1 = require("./utils/encoding.js");
const testInfo_js_1 = require("./testInfo.js");
const env_js_1 = require("./utils/env.js");
/**
 * Caculates session file path and JSON assets path from test context
 *
 * @internal
 */
function calculatePaths(testContext) {
    var _a;
    if ((0, testInfo_js_1.isVitestTestContext)(testContext)) {
        if (!testContext.task.name || !((_a = testContext.task.suite) === null || _a === void 0 ? void 0 : _a.name)) {
            throw new utils_js_1.RecorderError(`Unable to determine the recording file path. Unexpected empty Vitest context`);
        }
        const suites = [];
        let p = testContext.task.suite;
        while (p === null || p === void 0 ? void 0 : p.name) {
            suites.push(p.name);
            p = p.suite;
        }
        return {
            suiteTitle: suites.reverse().join("_"),
            testTitle: testContext.task.name,
        };
    }
    else {
        throw new utils_js_1.RecorderError(`Unrecognized test info: ${testContext}`);
    }
}
/**
 * This client manages the recorder life cycle and interacts with the proxy-tool to do the recording,
 * eventually save them in record mode and playing them back in playback mode.
 *
 * - Use the `configureClient` method to add recorder policy on your client.
 *
 * Other than configuring your clients, use `start`, `stop`, `addSanitizers` methods to use the recorder.
 */
class Recorder {
    constructor(testContext) {
        this.testContext = testContext;
        this.stateManager = new utils_js_1.RecordingStateManager();
        this.matcherSet = false;
        if (!this.testContext) {
            throw new Error("Unable to determine the recording file path, testContext provided is not defined.");
        }
        log_js_1.logger.info(`[Recorder#constructor] Creating a recorder instance in ${(0, utils_js_1.getTestMode)()} mode`);
        if ((0, utils_js_1.isRecordMode)() || (0, utils_js_1.isPlaybackMode)()) {
            const context = calculatePaths(this.testContext);
            this.sessionFile = (0, sessionFilePath_js_1.sessionFilePath)(context);
            this.assetsJson = (0, sessionFilePath_js_1.assetsJsonPath)();
            if (this.testContext) {
                log_js_1.logger.info(`[Recorder#constructor] Using a session file located at ${this.sessionFile}`);
                this.httpClient = (0, core_rest_pipeline_1.createDefaultHttpClient)();
            }
        }
        this.variables = {};
    }
    /**
     * redirectRequest updates the request in record and playback modes to hit the proxy-tool with appropriate headers.
     * recorderHttpPolicy calls this method on the request.
     */
    redirectRequest(request) {
        const upstreamUrl = new URL(request.url);
        const redirectedUrl = new URL(request.url);
        const testProxyUrl = new URL(Recorder.url);
        // Sometimes, due to the service returning a redirect or due to the retry policy, redirectRequest
        // may be called multiple times. We only want to update the request the second time if the request's
        // URL has been changed between calls (this may happen in the case of a redirect, but generally
        // not in the case of a retry). Otherwise, we might accidentally update the X-Recording-Upstream-Base-Uri
        // header to point to the test proxy instead of the true upstream.
        const requestAlreadyRedirected = upstreamUrl.host === testProxyUrl.host &&
            upstreamUrl.port === testProxyUrl.port &&
            upstreamUrl.protocol === testProxyUrl.protocol;
        if (requestAlreadyRedirected) {
            log_js_1.logger.verbose(`[Recorder#redirectRequest] Determined that the request to ${request.url} has already been redirected, not attempting to redirect again.`, request);
        }
        else {
            if (this.recordingId === undefined) {
                log_js_1.logger.error("[Recorder#redirectRequest] Could not redirect request since the recorder was not started", request);
                throw new utils_js_1.RecorderError("Attempted to redirect a request, but the recorder was not started. Make sure to call Recorder#start before making any requests.");
            }
            log_js_1.logger.info(`[Recorder#redirectRequest] Redirecting request to ${request.url} through the test proxy`, request);
            request.headers.set("x-recording-id", this.recordingId);
            request.headers.set("x-recording-mode", (0, utils_js_1.getTestMode)());
            redirectedUrl.host = testProxyUrl.host;
            redirectedUrl.port = testProxyUrl.port;
            redirectedUrl.protocol = testProxyUrl.protocol;
            request.headers.set("x-recording-upstream-base-uri", upstreamUrl.origin);
            request.url = redirectedUrl.toString();
            request.allowInsecureConnection = true;
        }
    }
    /**
     * revertRequestChanges reverts the request in record and playback modes back to the existing url.
     *
     * Workflow:
     *   - recorderHttpPolicy calls this method after the request is made
     *   1. "redirectRequest" method is called to update the request with the proxy-tool url
     *   2. Request hits the proxy tool, proxy-tool hits the service and returns the response
     *   3. Using `revertRequestChanges`, we revert the request back to the original url
     */
    revertRequestChanges(request, originalUrl) {
        log_js_1.logger.info(`[Recorder#revertRequestChanges] "undo"s the URL changes made by the recorder to hit the test proxy after the response is received,`, request);
        const proxyHeaders = ["x-recording-id", "x-recording-mode"];
        for (const headerName of proxyHeaders) {
            request.headers.delete(headerName);
        }
        request.url = originalUrl;
    }
    /**
     * addSanitizers adds the sanitizers for the current recording which will be applied on it before being saved.
     *
     * Takes SanitizerOptions as the input, passes on to the proxy-tool.
     *
     * By default, it applies only to record mode.
     *
     * If you want this to be applied in a specific mode or in a combination of modes, use the "mode" argument.
     */
    async addSanitizers(options, mode = ["record"]) {
        if ((0, utils_js_1.isLiveMode)())
            return;
        const actualTestMode = (0, utils_js_1.getTestMode)();
        if (mode.includes(actualTestMode) &&
            (0, utils_js_1.ensureExistence)(this.httpClient, "this.httpClient") &&
            (0, utils_js_1.ensureExistence)(this.recordingId, "this.recordingId")) {
            return (0, sanitizer_js_1.addSanitizers)(this.httpClient, Recorder.url, this.recordingId, options);
        }
    }
    /**
     * addSessionSanitizers adds the sanitizers for all the following recordings which will be applied on it before being saved.
     * This lets you call addSessionSanitizers once (e.g. in a global before() in your tests). The sanitizers will be applied
     * to every subsequent test.
     *
     * Takes SanitizerOptions as the input, passes on to the proxy-tool.
     *
     * By default, it applies only to record mode.
     *
     * If you want this to be applied in a specific mode or in a combination of modes, use the "mode" argument.
     */
    static async addSessionSanitizers(options, mode = ["record"]) {
        if ((0, utils_js_1.isLiveMode)()) {
            return;
        }
        const actualTestMode = (0, utils_js_1.getTestMode)();
        if (mode.includes(actualTestMode)) {
            const httpClient = (0, core_rest_pipeline_1.createDefaultHttpClient)();
            return (0, sanitizer_js_1.addSanitizers)(httpClient, Recorder.url, undefined, options);
        }
    }
    async addTransform(transform) {
        if ((0, utils_js_1.isPlaybackMode)() &&
            (0, utils_js_1.ensureExistence)(this.httpClient, "this.httpClient") &&
            (0, utils_js_1.ensureExistence)(this.recordingId, "this.recordingId")) {
            await (0, transform_js_1.addTransform)(Recorder.url, this.httpClient, transform, this.recordingId);
        }
    }
    async preStart() {
        if (core_util_1.isBrowser && (0, utils_js_1.isPlaybackMode)()) {
            if (!this.matcherSet) {
                await this.setMatcher("CustomDefaultMatcher");
                this.matcherSet = true;
            }
        }
    }
    /**
     * Call this method to ping the proxy-tool with a start request
     * signalling to start recording in the record mode
     * or to start playing back in the playback mode.
     *
     * Takes RecorderStartOptions as the input, which will get used in record and playback modes.
     * Includes
     * - envSetupForPlayback - The key-value pairs will be used as the environment variables in playback mode. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values.
     * - sanitizerOptions - Generated recordings are updated by the "proxy-tool" based on the sanitizer options provided, these santizers are applied only in "record" mode.
     */
    async start(options) {
        var _a;
        await this.preStart();
        if ((0, utils_js_1.isLiveMode)())
            return;
        log_js_1.logger.info(`[Recorder#start] Starting the recorder in ${(0, utils_js_1.getTestMode)()} mode`);
        this.stateManager.state = "started";
        if (this.recordingId === undefined) {
            const startUri = `${Recorder.url}${(0, utils_js_1.isPlaybackMode)() ? paths_js_1.paths.playback : paths_js_1.paths.record}${paths_js_1.paths.start}`;
            const req = (0, createRecordingRequest_js_1.createRecordingRequest)(startUri, this.sessionFile, this.recordingId, "POST", this.assetsJson);
            if ((0, utils_js_1.ensureExistence)(this.httpClient, "TestProxyHttpClient.httpClient")) {
                log_js_1.logger.verbose("[Recorder#start] Setting redirect mode");
                try {
                    await (0, options_js_1.setRecordingOptions)(Recorder.url, this.httpClient, {
                        handleRedirects: !core_util_1.isNode,
                        tlsValidationCert: options.tlsValidationCert,
                    });
                }
                catch (e) {
                    if ((0, core_rest_pipeline_1.isRestError)(e) && e.message.includes("ECONNREFUSED")) {
                        throw new utils_js_1.RecorderError(`Test proxy appears to not be running at ${Recorder.url}. Make sure that you are running your tests using the dev-tool scripts.`);
                    }
                    else {
                        throw e;
                    }
                }
                log_js_1.logger.verbose("[Recorder#start] Sending the start request to the test proxy");
                let rsp = await this.httpClient.sendRequest(Object.assign(Object.assign({}, req), { allowInsecureConnection: true }));
                // If the error is due to the assets.json not existing, try again without specifying an assets.json. This will
                // occur with SDKs that have not migrated to asset sync yet.
                // TODO: remove once everyone has migrated to asset sync
                if (rsp.status === 400 && rsp.headers.get("x-request-known-exception") === "true") {
                    const errorMessage = (0, encoding_js_1.decodeBase64)(rsp.headers.get("x-request-known-exception-error"));
                    if (errorMessage.includes("The provided assets") &&
                        errorMessage.includes("does not exist")) {
                        log_js_1.logger.info("[Recorder#start] start request failed, trying again without assets.json specified");
                        const retryRequest = (0, createRecordingRequest_js_1.createRecordingRequest)(startUri, this.sessionFile, this.recordingId, "POST", undefined);
                        rsp = await this.httpClient.sendRequest(Object.assign(Object.assign({}, retryRequest), { allowInsecureConnection: true }));
                    }
                }
                if (rsp.status !== 200) {
                    log_js_1.logger.error("[Recorder#start] Could not start the recorder", rsp);
                    const mismatchHeader = rsp.headers.get("x-request-mismatch-error");
                    if (mismatchHeader) {
                        throw new utils_js_1.RecorderError((0, encoding_js_1.decodeBase64)(mismatchHeader));
                    }
                    else {
                        throw new utils_js_1.RecorderError("Start request failed.");
                    }
                }
                const id = rsp.headers.get("x-recording-id");
                if (!id) {
                    log_js_1.logger.error("[Recorder#start] Test proxy did not provide a recording ID when starting the recorder");
                    throw new utils_js_1.RecorderError("No recording ID returned for a successful start request.");
                }
                this.recordingId = id;
                if ((0, utils_js_1.isPlaybackMode)()) {
                    this.variables = rsp.bodyAsText ? JSON.parse(rsp.bodyAsText) : {};
                }
                await (0, envSetupForPlayback_js_1.handleEnvSetup)(this.httpClient, Recorder.url, this.recordingId, options.envSetupForPlayback);
                //  https://github.com/Azure/azure-sdk-tools/pull/8142/
                //  https://github.com/Azure/azure-sdk-tools/blob/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy/Common/SanitizerDictionary.cs
                const removalList = [
                    "AZSDK2003", // Location header in the response is not a secret, and is also sanitized by other URI sanitizers
                ];
                // Central test proxy Sanitizers to be removed
                await (0, sanitizer_js_1.removeCentralSanitizers)(this.httpClient, Recorder.url, this.recordingId, removalList.concat((_a = options.removeCentralSanitizers) !== null && _a !== void 0 ? _a : []));
                // Sanitizers to be added only in record mode
                if ((0, utils_js_1.isRecordMode)() && options.sanitizerOptions) {
                    // Makes a call to the proxy-tool to add the sanitizers for the current recording id
                    // Recordings of the current test will be influenced by the sanitizers that are being added here
                    log_js_1.logger.verbose("[Recorder#start] Adding sanitizers specified in the start options");
                    await this.addSanitizers(options.sanitizerOptions);
                }
                log_js_1.logger.info("[Recorder#start] Recorder started successfully");
            }
        }
    }
    /**
     * Call this method to ping the proxy-tool with a stop request, this helps saving the recording in record mode.
     */
    async stop() {
        if ((0, utils_js_1.isLiveMode)())
            return;
        this.stateManager.state = "stopped";
        if (this.recordingId !== undefined) {
            log_js_1.logger.info("[Recorder#stop] Stopping recording", this.recordingId);
            const stopUri = `${Recorder.url}${(0, utils_js_1.isPlaybackMode)() ? paths_js_1.paths.playback : paths_js_1.paths.record}${paths_js_1.paths.stop}`;
            const req = (0, createRecordingRequest_js_1.createRecordingRequest)(stopUri, undefined, this.recordingId);
            req.headers.set("x-recording-save", "true");
            if ((0, utils_js_1.isRecordMode)()) {
                log_js_1.logger.verbose("[Recorder#stop] Adding recorder variables to the request body:", this.variables);
                req.headers.set("Content-Type", "application/json");
                req.body = JSON.stringify(this.variables);
            }
            if ((0, utils_js_1.ensureExistence)(this.httpClient, "TestProxyHttpClient.httpClient")) {
                const rsp = await this.httpClient.sendRequest(Object.assign(Object.assign({}, req), { allowInsecureConnection: true }));
                if (rsp.status !== 200) {
                    log_js_1.logger.error("[Recorder#stop] Stop request failed", rsp);
                    throw new utils_js_1.RecorderError("Stop request failed.");
                }
                log_js_1.logger.verbose("[Recorder#stop] Recorder stop request successful");
            }
        }
        else {
            log_js_1.logger.error("[Recorder#stop] Encountered invalid state: recordingId should have been defined when calling stop");
            throw new utils_js_1.RecorderError("Bad state, recordingId is not defined when called stop.");
        }
    }
    /**
     * Sets the matcher for the current recording to the matcher specified.
     */
    async setMatcher(matcher, options = {}) {
        var _a;
        if ((0, utils_js_1.isPlaybackMode)()) {
            if (!this.httpClient) {
                throw new utils_js_1.RecorderError("httpClient should be defined in playback mode");
            }
            // See discussion in https://github.com/Azure/azure-sdk-tools/pull/6152
            // Ideally this should be handled by the test-proxy.  However, it was suggested that
            // there may be scenarios where it is desired to include these headers.
            // Thus we are ignoring Accept-Language and Accept-Encoding headers in recorder for browser.
            // Origin header - https://github.com/Azure/azure-sdk-for-js/issues/32851
            const excludedHeaders = core_util_1.isBrowser
                ? ((_a = options.excludedHeaders) !== null && _a !== void 0 ? _a : []).concat("Accept-Language", "Accept-Encoding", "Origin")
                : options.excludedHeaders;
            const updatedOptions = Object.assign(Object.assign({}, options), { excludedHeaders });
            if (matcher === "BodilessMatcher") {
                updatedOptions.compareBodies = false;
                await (0, matcher_js_1.setMatcher)(Recorder.url, this.httpClient, "CustomDefaultMatcher", this.recordingId, updatedOptions);
            }
            else {
                await (0, matcher_js_1.setMatcher)(Recorder.url, this.httpClient, matcher, this.recordingId, updatedOptions);
            }
            this.matcherSet = true;
        }
    }
    async transformsInfo() {
        if ((0, utils_js_1.isLiveMode)()) {
            throw new utils_js_1.RecorderError("Cannot call transformsInfo in live mode");
        }
        if ((0, utils_js_1.ensureExistence)(this.httpClient, "this.httpClient")) {
            return (0, sanitizer_js_1.transformsInfo)(this.httpClient, Recorder.url, this.recordingId);
        }
        throw new utils_js_1.RecorderError("Expected httpClient to be defined");
    }
    /**
     * For core-v2 - libraries depending on core-rest-pipeline.
     * This method adds the recording policy to the additionalPolicies in the client options.
     *
     * Helps in redirecting the requests to the proxy tool instead of directly going to the service.
     *
     * Note: Client Options must have "additionalPolicies" as part of the options.
     */
    configureClientOptions(options) {
        if ((0, utils_js_1.isLiveMode)())
            return options;
        if (!options.additionalPolicies)
            options.additionalPolicies = [];
        options.additionalPolicies.push({
            policy: this.fixedMultipartBoundaryPolicy(),
            position: "perCall",
        });
        options.additionalPolicies.push({
            policy: this.recorderHttpPolicy(),
            position: "perRetry",
        });
        return options;
    }
    handleTestProxyErrors(response) {
        var _a, _b;
        if (response.headers.get("x-request-mismatch") === "true") {
            const errorMessage = (0, encoding_js_1.decodeBase64)((_a = response.headers.get("x-request-mismatch-error")) !== null && _a !== void 0 ? _a : "");
            log_js_1.logger.error("[Recorder#handleTestProxyErrors] Could not match request to recording", errorMessage);
            throw new utils_js_1.RecorderError(errorMessage);
        }
        if (response.headers.get("x-request-known-exception") === "true") {
            const errorMessage = (0, encoding_js_1.decodeBase64)((_b = response.headers.get("x-request-known-exception-error")) !== null && _b !== void 0 ? _b : "");
            log_js_1.logger.error("[Recorder#handleTestProxyErrors] Test proxy error encountered", errorMessage);
            throw new utils_js_1.RecorderError(errorMessage);
        }
    }
    /**
     * recorderHttpPolicy that can be added as a pipeline policy for any of the core-v2 SDKs(SDKs depending on core-rest-pipeline)
     */
    recorderHttpPolicy() {
        return {
            name: "recording policy",
            sendRequest: async (request, next) => {
                const originalUrl = request.url;
                this.redirectRequest(request);
                const response = await next(request);
                this.handleTestProxyErrors(response);
                this.revertRequestChanges(request, originalUrl);
                return response;
            },
        };
    }
    fixedMultipartBoundaryPolicy() {
        return {
            name: "fixedMultipartBoundaryPolicy",
            sendRequest: (request, next) => {
                if (request.multipartBody) {
                    request.multipartBody.boundary = "--RecordedTestMultipartBoundary";
                    const contentType = request.headers.get("Content-Type");
                    if (contentType) {
                        const contentTypeWithoutBoundary = contentType.split(";")[0];
                        request.headers.set("Content-Type", contentTypeWithoutBoundary);
                    }
                }
                return next(request);
            },
        };
    }
    variable(name, value = undefined) {
        if ((0, utils_js_1.isPlaybackMode)()) {
            const recordedValue = this.variables[name];
            if (recordedValue === undefined) {
                log_js_1.logger.error(`[Recorder#variable] Test tried to access a variable in playback that was not set in the recording: ${name}`);
                throw new utils_js_1.RecorderError(`Tried to access a variable in playback that was not set in recording: ${name}`);
            }
            return recordedValue;
        }
        if (!this.variables[name]) {
            if (value === undefined) {
                log_js_1.logger.error(`[Recorder#variable] Test tried to access an unitialized variable: ${name}`);
                throw new utils_js_1.RecorderError(`Tried to access uninitialized variable: ${name}. You must initialize it with a value before using it.`);
            }
            this.variables[name] = value;
        }
        return this.variables[name];
    }
}
exports.Recorder = Recorder;
Recorder.url = `http://localhost:${(_a = env_js_1.env.TEST_PROXY_HTTP_PORT) !== null && _a !== void 0 ? _a : 5000}`;
//# sourceMappingURL=recorder.js.map