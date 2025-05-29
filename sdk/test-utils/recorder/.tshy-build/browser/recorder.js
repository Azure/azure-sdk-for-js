// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var _a;
import { createDefaultHttpClient, isRestError, } from "@azure/core-rest-pipeline";
import { ensureExistence, getTestMode, isLiveMode, isPlaybackMode, isRecordMode, RecorderError, RecordingStateManager, } from "./utils/utils.js";
import { assetsJsonPath, sessionFilePath } from "./utils/sessionFilePath.js";
import { paths } from "./utils/paths.js";
import { addSanitizers, removeCentralSanitizers, transformsInfo } from "./sanitizer.js";
import { handleEnvSetup } from "./utils/envSetupForPlayback.js";
import { setMatcher } from "./matcher.js";
import { addTransform } from "./transform.js";
import { createRecordingRequest } from "./utils/createRecordingRequest.js";
import { logger } from "./log.js";
import { setRecordingOptions } from "./options.js";
import { isBrowser, isNode } from "@azure/core-util";
import { decodeBase64 } from "./utils/encoding.js";
import { isVitestTestContext } from "./testInfo.js";
import { env } from "./utils/env.js";
/**
 * Caculates session file path and JSON assets path from test context
 *
 * @internal
 */
export function calculatePaths(testContext) {
    var _a;
    if (isVitestTestContext(testContext)) {
        if (!testContext.task.name || !((_a = testContext.task.suite) === null || _a === void 0 ? void 0 : _a.name)) {
            throw new RecorderError(`Unable to determine the recording file path. Unexpected empty Vitest context`);
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
        throw new RecorderError(`Unrecognized test info: ${testContext}`);
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
export class Recorder {
    constructor(testContext) {
        this.testContext = testContext;
        this.stateManager = new RecordingStateManager();
        this.matcherSet = false;
        if (!this.testContext) {
            throw new Error("Unable to determine the recording file path, testContext provided is not defined.");
        }
        logger.info(`[Recorder#constructor] Creating a recorder instance in ${getTestMode()} mode`);
        if (isRecordMode() || isPlaybackMode()) {
            const context = calculatePaths(this.testContext);
            this.sessionFile = sessionFilePath(context);
            this.assetsJson = assetsJsonPath();
            if (this.testContext) {
                logger.info(`[Recorder#constructor] Using a session file located at ${this.sessionFile}`);
                this.httpClient = createDefaultHttpClient();
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
            logger.verbose(`[Recorder#redirectRequest] Determined that the request to ${request.url} has already been redirected, not attempting to redirect again.`, request);
        }
        else {
            if (this.recordingId === undefined) {
                logger.error("[Recorder#redirectRequest] Could not redirect request since the recorder was not started", request);
                throw new RecorderError("Attempted to redirect a request, but the recorder was not started. Make sure to call Recorder#start before making any requests.");
            }
            logger.info(`[Recorder#redirectRequest] Redirecting request to ${request.url} through the test proxy`, request);
            request.headers.set("x-recording-id", this.recordingId);
            request.headers.set("x-recording-mode", getTestMode());
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
        logger.info(`[Recorder#revertRequestChanges] "undo"s the URL changes made by the recorder to hit the test proxy after the response is received,`, request);
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
        if (isLiveMode())
            return;
        const actualTestMode = getTestMode();
        if (mode.includes(actualTestMode) &&
            ensureExistence(this.httpClient, "this.httpClient") &&
            ensureExistence(this.recordingId, "this.recordingId")) {
            return addSanitizers(this.httpClient, Recorder.url, this.recordingId, options);
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
        if (isLiveMode()) {
            return;
        }
        const actualTestMode = getTestMode();
        if (mode.includes(actualTestMode)) {
            const httpClient = createDefaultHttpClient();
            return addSanitizers(httpClient, Recorder.url, undefined, options);
        }
    }
    async addTransform(transform) {
        if (isPlaybackMode() &&
            ensureExistence(this.httpClient, "this.httpClient") &&
            ensureExistence(this.recordingId, "this.recordingId")) {
            await addTransform(Recorder.url, this.httpClient, transform, this.recordingId);
        }
    }
    async preStart() {
        if (isBrowser && isPlaybackMode()) {
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
        if (isLiveMode())
            return;
        logger.info(`[Recorder#start] Starting the recorder in ${getTestMode()} mode`);
        this.stateManager.state = "started";
        if (this.recordingId === undefined) {
            const startUri = `${Recorder.url}${isPlaybackMode() ? paths.playback : paths.record}${paths.start}`;
            const req = createRecordingRequest(startUri, this.sessionFile, this.recordingId, "POST", this.assetsJson);
            if (ensureExistence(this.httpClient, "TestProxyHttpClient.httpClient")) {
                logger.verbose("[Recorder#start] Setting redirect mode");
                try {
                    await setRecordingOptions(Recorder.url, this.httpClient, {
                        handleRedirects: !isNode,
                        tlsValidationCert: options.tlsValidationCert,
                    });
                }
                catch (e) {
                    if (isRestError(e) && e.message.includes("ECONNREFUSED")) {
                        throw new RecorderError(`Test proxy appears to not be running at ${Recorder.url}. Make sure that you are running your tests using the dev-tool scripts.`);
                    }
                    else {
                        throw e;
                    }
                }
                logger.verbose("[Recorder#start] Sending the start request to the test proxy");
                let rsp = await this.httpClient.sendRequest(Object.assign(Object.assign({}, req), { allowInsecureConnection: true }));
                // If the error is due to the assets.json not existing, try again without specifying an assets.json. This will
                // occur with SDKs that have not migrated to asset sync yet.
                // TODO: remove once everyone has migrated to asset sync
                if (rsp.status === 400 && rsp.headers.get("x-request-known-exception") === "true") {
                    const errorMessage = decodeBase64(rsp.headers.get("x-request-known-exception-error"));
                    if (errorMessage.includes("The provided assets") &&
                        errorMessage.includes("does not exist")) {
                        logger.info("[Recorder#start] start request failed, trying again without assets.json specified");
                        const retryRequest = createRecordingRequest(startUri, this.sessionFile, this.recordingId, "POST", undefined);
                        rsp = await this.httpClient.sendRequest(Object.assign(Object.assign({}, retryRequest), { allowInsecureConnection: true }));
                    }
                }
                if (rsp.status !== 200) {
                    logger.error("[Recorder#start] Could not start the recorder", rsp);
                    const mismatchHeader = rsp.headers.get("x-request-mismatch-error");
                    if (mismatchHeader) {
                        throw new RecorderError(decodeBase64(mismatchHeader));
                    }
                    else {
                        throw new RecorderError("Start request failed.");
                    }
                }
                const id = rsp.headers.get("x-recording-id");
                if (!id) {
                    logger.error("[Recorder#start] Test proxy did not provide a recording ID when starting the recorder");
                    throw new RecorderError("No recording ID returned for a successful start request.");
                }
                this.recordingId = id;
                if (isPlaybackMode()) {
                    this.variables = rsp.bodyAsText ? JSON.parse(rsp.bodyAsText) : {};
                }
                await handleEnvSetup(this.httpClient, Recorder.url, this.recordingId, options.envSetupForPlayback);
                //  https://github.com/Azure/azure-sdk-tools/pull/8142/
                //  https://github.com/Azure/azure-sdk-tools/blob/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy/Common/SanitizerDictionary.cs
                const removalList = [
                    "AZSDK2003", // Location header in the response is not a secret, and is also sanitized by other URI sanitizers
                ];
                // Central test proxy Sanitizers to be removed
                await removeCentralSanitizers(this.httpClient, Recorder.url, this.recordingId, removalList.concat((_a = options.removeCentralSanitizers) !== null && _a !== void 0 ? _a : []));
                // Sanitizers to be added only in record mode
                if (isRecordMode() && options.sanitizerOptions) {
                    // Makes a call to the proxy-tool to add the sanitizers for the current recording id
                    // Recordings of the current test will be influenced by the sanitizers that are being added here
                    logger.verbose("[Recorder#start] Adding sanitizers specified in the start options");
                    await this.addSanitizers(options.sanitizerOptions);
                }
                logger.info("[Recorder#start] Recorder started successfully");
            }
        }
    }
    /**
     * Call this method to ping the proxy-tool with a stop request, this helps saving the recording in record mode.
     */
    async stop() {
        if (isLiveMode())
            return;
        this.stateManager.state = "stopped";
        if (this.recordingId !== undefined) {
            logger.info("[Recorder#stop] Stopping recording", this.recordingId);
            const stopUri = `${Recorder.url}${isPlaybackMode() ? paths.playback : paths.record}${paths.stop}`;
            const req = createRecordingRequest(stopUri, undefined, this.recordingId);
            req.headers.set("x-recording-save", "true");
            if (isRecordMode()) {
                logger.verbose("[Recorder#stop] Adding recorder variables to the request body:", this.variables);
                req.headers.set("Content-Type", "application/json");
                req.body = JSON.stringify(this.variables);
            }
            if (ensureExistence(this.httpClient, "TestProxyHttpClient.httpClient")) {
                const rsp = await this.httpClient.sendRequest(Object.assign(Object.assign({}, req), { allowInsecureConnection: true }));
                if (rsp.status !== 200) {
                    logger.error("[Recorder#stop] Stop request failed", rsp);
                    throw new RecorderError("Stop request failed.");
                }
                logger.verbose("[Recorder#stop] Recorder stop request successful");
            }
        }
        else {
            logger.error("[Recorder#stop] Encountered invalid state: recordingId should have been defined when calling stop");
            throw new RecorderError("Bad state, recordingId is not defined when called stop.");
        }
    }
    /**
     * Sets the matcher for the current recording to the matcher specified.
     */
    async setMatcher(matcher, options = {}) {
        var _a;
        if (isPlaybackMode()) {
            if (!this.httpClient) {
                throw new RecorderError("httpClient should be defined in playback mode");
            }
            // See discussion in https://github.com/Azure/azure-sdk-tools/pull/6152
            // Ideally this should be handled by the test-proxy.  However, it was suggested that
            // there may be scenarios where it is desired to include these headers.
            // Thus we are ignoring Accept-Language and Accept-Encoding headers in recorder for browser.
            // Origin header - https://github.com/Azure/azure-sdk-for-js/issues/32851
            const excludedHeaders = isBrowser
                ? ((_a = options.excludedHeaders) !== null && _a !== void 0 ? _a : []).concat("Accept-Language", "Accept-Encoding", "Origin")
                : options.excludedHeaders;
            const updatedOptions = Object.assign(Object.assign({}, options), { excludedHeaders });
            if (matcher === "BodilessMatcher") {
                updatedOptions.compareBodies = false;
                await setMatcher(Recorder.url, this.httpClient, "CustomDefaultMatcher", this.recordingId, updatedOptions);
            }
            else {
                await setMatcher(Recorder.url, this.httpClient, matcher, this.recordingId, updatedOptions);
            }
            this.matcherSet = true;
        }
    }
    async transformsInfo() {
        if (isLiveMode()) {
            throw new RecorderError("Cannot call transformsInfo in live mode");
        }
        if (ensureExistence(this.httpClient, "this.httpClient")) {
            return transformsInfo(this.httpClient, Recorder.url, this.recordingId);
        }
        throw new RecorderError("Expected httpClient to be defined");
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
        if (isLiveMode())
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
            const errorMessage = decodeBase64((_a = response.headers.get("x-request-mismatch-error")) !== null && _a !== void 0 ? _a : "");
            logger.error("[Recorder#handleTestProxyErrors] Could not match request to recording", errorMessage);
            throw new RecorderError(errorMessage);
        }
        if (response.headers.get("x-request-known-exception") === "true") {
            const errorMessage = decodeBase64((_b = response.headers.get("x-request-known-exception-error")) !== null && _b !== void 0 ? _b : "");
            logger.error("[Recorder#handleTestProxyErrors] Test proxy error encountered", errorMessage);
            throw new RecorderError(errorMessage);
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
        if (isPlaybackMode()) {
            const recordedValue = this.variables[name];
            if (recordedValue === undefined) {
                logger.error(`[Recorder#variable] Test tried to access a variable in playback that was not set in the recording: ${name}`);
                throw new RecorderError(`Tried to access a variable in playback that was not set in recording: ${name}`);
            }
            return recordedValue;
        }
        if (!this.variables[name]) {
            if (value === undefined) {
                logger.error(`[Recorder#variable] Test tried to access an unitialized variable: ${name}`);
                throw new RecorderError(`Tried to access uninitialized variable: ${name}. You must initialize it with a value before using it.`);
            }
            this.variables[name] = value;
        }
        return this.variables[name];
    }
}
Recorder.url = `http://localhost:${(_a = env.TEST_PROXY_HTTP_PORT) !== null && _a !== void 0 ? _a : 5000}`;
//# sourceMappingURL=recorder.js.map