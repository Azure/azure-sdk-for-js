// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createDefaultHttpClient,
  HttpClient,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import {
  ensureExistence,
  getTestMode,
  isLiveMode,
  isPlaybackMode,
  isRecordMode,
  once,
  RecorderError,
  RecorderStartOptions,
  RecordingStateManager,
} from "./utils/utils";
import { Test } from "mocha";
import { sessionFilePath } from "./utils/sessionFilePath";
import { SanitizerOptions } from "./utils/utils";
import { paths } from "./utils/paths";
import { addSanitizers, transformsInfo } from "./sanitizer";
import { handleEnvSetup } from "./utils/envSetupForPlayback";
import { CustomMatcherOptions, Matcher, setMatcher } from "./matcher";
import {
  DefaultHttpClient,
  HttpClient as HttpClientCoreV1,
  HttpOperationResponse,
  WebResource,
  WebResourceLike,
} from "@azure/core-http";
import { addTransform, Transform } from "./transform";
import { createRecordingRequest } from "./utils/createRecordingRequest";
import { AdditionalPolicyConfig } from "@azure/core-client";
import { logger } from "./log";
import { setRecordingOptions } from "./options";
import { isNode } from "@azure/core-util";
import { env } from "./utils/env";
import { decodeBase64 } from "./utils/encoding";

/**
 * This client manages the recorder life cycle and interacts with the proxy-tool to do the recording,
 * eventually save them in record mode and playing them back in playback mode.
 *
 * For Core V2 SDKs,
 * - Use the `configureClient` method to add recorder policy on your client.
 * For core-v1 SDKs,
 * - Use the `configureClientOptionsCoreV1` method to modify the httpClient on your client options
 *
 * Other than configuring your clients, use `start`, `stop`, `addSanitizers` methods to use the recorder.
 */
export class Recorder {
  private static url = `http://localhost:${env.TEST_PROXY_HTTP_PORT ?? 5000}`;
  public recordingId?: string;
  private stateManager = new RecordingStateManager();
  private httpClient?: HttpClient;
  private sessionFile?: string;
  private variables: Record<string, string>;

  constructor(private testContext?: Test | undefined) {
    logger.info(`[Recorder#constructor] Creating a recorder instance in ${getTestMode()} mode`);
    if (isRecordMode() || isPlaybackMode()) {
      if (this.testContext) {
        this.sessionFile = sessionFilePath(this.testContext);
        logger.info(`[Recorder#constructor] Using a session file located at ${this.sessionFile}`);
        this.httpClient = createDefaultHttpClient();
      } else {
        throw new Error(
          "Unable to determine the recording file path, testContext provided is not defined."
        );
      }
    }
    this.variables = {};
  }

  /**
   * redirectRequest updates the request in record and playback modes to hit the proxy-tool with appropriate headers.
   * Works for both core-v1 and core-v2
   *
   * - WebResource -> core-v1
   * - PipelineRequest -> core-v2 (recorderHttpPolicy calls this method on the request to modify and hit the proxy-tool with appropriate headers.)
   */
  private redirectRequest(request: WebResource | PipelineRequest): void {
    const upstreamUrl = new URL(request.url);
    const redirectedUrl = new URL(request.url);
    const testProxyUrl = new URL(Recorder.url);

    // Sometimes, due to the service returning a redirect or due to the retry policy, redirectRequest
    // may be called multiple times. We only want to update the request the second time if the request's
    // URL has been changed between calls (this may happen in the case of a redirect, but generally
    // not in the case of a retry). Otherwise, we might accidentally update the X-Recording-Upstream-Base-Uri
    // header to point to the test proxy instead of the true upstream.
    const requestAlreadyRedirected =
      upstreamUrl.host === testProxyUrl.host &&
      upstreamUrl.port === testProxyUrl.port &&
      upstreamUrl.protocol === testProxyUrl.protocol;

    if (requestAlreadyRedirected) {
      logger.verbose(
        `[Recorder#redirectRequest] Determined that the request to ${request.url} has already been redirected, not attempting to redirect again.`,
        request
      );
    } else {
      if (this.recordingId === undefined) {
        logger.error(
          "[Recorder#redirectRequest] Could not redirect request (recording ID not set)",
          request
        );
        throw new RecorderError("Recording ID must be defined to redirect a request");
      }

      logger.info(
        `[Recorder#redirectRequest] Redirecting request to ${request.url} through the test proxy`,
        request
      );

      request.headers.set("x-recording-id", this.recordingId);
      request.headers.set("x-recording-mode", getTestMode());

      redirectedUrl.host = testProxyUrl.host;
      redirectedUrl.port = testProxyUrl.port;
      redirectedUrl.protocol = testProxyUrl.protocol;

      request.headers.set("x-recording-upstream-base-uri", upstreamUrl.toString());
      request.url = redirectedUrl.toString();

      if (!(request instanceof WebResource)) {
        // for core-v2
        request.allowInsecureConnection = true;
      }
    }
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
  async addSanitizers(
    options: SanitizerOptions,
    mode: ("record" | "playback")[] = ["record"]
  ): Promise<void> {
    if (isLiveMode()) return;
    const actualTestMode = getTestMode() as "record" | "playback";
    if (
      mode.includes(actualTestMode) &&
      ensureExistence(this.httpClient, "this.httpClient") &&
      ensureExistence(this.recordingId, "this.recordingId")
    ) {
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
  static async addSessionSanitizers(
    options: SanitizerOptions,
    mode: ("record" | "playback")[] = ["record"]
  ): Promise<void> {
    if (isLiveMode()) {
      return;
    }

    const actualTestMode = getTestMode() as "record" | "playback";
    if (mode.includes(actualTestMode)) {
      const httpClient = createDefaultHttpClient();
      return addSanitizers(httpClient, Recorder.url, undefined, options);
    }
  }

  async addTransform(transform: Transform): Promise<void> {
    if (
      isPlaybackMode() &&
      ensureExistence(this.httpClient, "this.httpClient") &&
      ensureExistence(this.recordingId, "this.recordingId")
    ) {
      await addTransform(Recorder.url, this.httpClient, transform, this.recordingId);
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
  async start(options: RecorderStartOptions): Promise<void> {
    if (isLiveMode()) return;
    logger.info(`[Recorder#start] Starting the recorder in ${getTestMode()} mode`);
    this.stateManager.state = "started";
    if (this.recordingId === undefined) {
      const startUri = `${Recorder.url}${isPlaybackMode() ? paths.playback : paths.record}${
        paths.start
      }`;
      const req = createRecordingRequest(startUri, this.sessionFile, this.recordingId);

      if (ensureExistence(this.httpClient, "TestProxyHttpClient.httpClient")) {
        logger.verbose("[Recorder#start] Setting redirect mode");
        await setRecordingOptions(Recorder.url, this.httpClient, { handleRedirects: isNode });
        logger.verbose("[Recorder#start] Sending the start request to the test proxy");
        const rsp = await this.httpClient.sendRequest({
          ...req,
          allowInsecureConnection: true,
        });
        if (rsp.status !== 200) {
          logger.error("[Recorder#start] Could not start the recorder", rsp);
          throw new RecorderError("Start request failed.");
        }
        const id = rsp.headers.get("x-recording-id");
        if (!id) {
          logger.error(
            "[Recorder#start] Test proxy did not provide a recording ID when starting the recorder"
          );
          throw new RecorderError("No recording ID returned for a successful start request.");
        }
        this.recordingId = id;
        if (isPlaybackMode()) {
          this.variables = rsp.bodyAsText ? JSON.parse(rsp.bodyAsText) : {};
        }

        await handleEnvSetup(
          this.httpClient,
          Recorder.url,
          this.recordingId,
          options.envSetupForPlayback
        );

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
  async stop(): Promise<void> {
    if (isLiveMode()) return;
    this.stateManager.state = "stopped";
    if (this.recordingId !== undefined) {
      logger.info("[Recorder#stop] Stopping recording", this.recordingId);
      const stopUri = `${Recorder.url}${isPlaybackMode() ? paths.playback : paths.record}${
        paths.stop
      }`;
      const req = createRecordingRequest(stopUri, undefined, this.recordingId);
      req.headers.set("x-recording-save", "true");

      if (isRecordMode()) {
        logger.verbose(
          "[Recorder#stop] Adding recorder variables to the request body:",
          this.variables
        );
        req.headers.set("Content-Type", "application/json");
        req.body = JSON.stringify(this.variables);
      }

      if (ensureExistence(this.httpClient, "TestProxyHttpClient.httpClient")) {
        const rsp = await this.httpClient.sendRequest({
          ...req,
          allowInsecureConnection: true,
        });
        if (rsp.status !== 200) {
          logger.error("[Recorder#stop] Stop request failed", rsp);
          throw new RecorderError("Stop request failed.");
        }

        logger.verbose("[Recorder#stop] Recorder stop request successful");
      }
    } else {
      logger.error(
        "[Recorder#stop] Encountered invalid state: recordingId should have been defined when calling stop"
      );
      throw new RecorderError("Bad state, recordingId is not defined when called stop.");
    }
  }

  /**
   * Sets the matcher for the current recording to the matcher specified.
   */
  async setMatcher(matcher: "HeaderlessMatcher" | "BodilessMatcher"): Promise<void>;
  /**
   * Sets the matcher for the current recording to the matcher specified.
   */
  async setMatcher(matcher: "CustomDefaultMatcher", options?: CustomMatcherOptions): Promise<void>;
  /**
   * Sets the matcher for the current recording to the matcher specified.
   */
  async setMatcher(matcher: Matcher, options?: CustomMatcherOptions): Promise<void> {
    if (isPlaybackMode()) {
      if (!this.httpClient) {
        throw new RecorderError("httpClient should be defined in playback mode");
      }

      await setMatcher(Recorder.url, this.httpClient, matcher, this.recordingId, options);
    }
  }

  async transformsInfo(): Promise<string | null | undefined> {
    if (isLiveMode()) {
      throw new RecorderError("Cannot call transformsInfo in live mode");
    }

    if (ensureExistence(this.httpClient, "this.httpClient")) {
      return await transformsInfo(this.httpClient, Recorder.url, this.recordingId!);
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
  public configureClientOptions<T>(
    options: T & { additionalPolicies?: AdditionalPolicyConfig[] }
  ): T & { additionalPolicies?: AdditionalPolicyConfig[] } {
    if (isLiveMode()) return options;
    if (!options.additionalPolicies) options.additionalPolicies = [];
    options.additionalPolicies.push({
      policy: this.recorderHttpPolicy(),
      position: "perRetry",
    });
    return options;
  }

  /**
   * For core-v1 - libraries depending on core-http.
   * This method adds the custom httpClient to the client options.
   *
   * Helps in redirecting the requests to the proxy tool instead of directly going to the service.
   */
  public configureClientOptionsCoreV1<T>(
    options: T & {
      httpClient?: HttpClientCoreV1;
    }
  ): T & {
    httpClient?: HttpClientCoreV1;
  } {
    if (isLiveMode()) return options;
    return { ...options, httpClient: once(() => this.createHttpClientCoreV1())() };
  }

  private handleTestProxyErrors(response: HttpOperationResponse | PipelineResponse) {
    if (response.headers.get("x-request-mismatch") === "true") {
      const errorMessage = decodeBase64(response.headers.get("x-request-mismatch-error") ?? "");
      logger.error(
        "[Recorder#handleTestProxyErrors] Could not match request to recording",
        errorMessage
      );
      throw new RecorderError(errorMessage);
    }

    if (response.headers.get("x-request-known-exception") === "true") {
      const errorMessage = decodeBase64(
        response.headers.get("x-request-known-exception-error") ?? ""
      );
      logger.error("[Recorder#handleTestProxyErrors] Test proxy error encountered", errorMessage);
      throw new RecorderError(errorMessage);
    }
  }

  /**
   * recorderHttpPolicy that can be added as a pipeline policy for any of the core-v2 SDKs(SDKs depending on core-rest-pipeline)
   */
  private recorderHttpPolicy(): PipelinePolicy {
    return {
      name: "recording policy",
      sendRequest: async (
        request: PipelineRequest,
        next: SendRequest
      ): Promise<PipelineResponse> => {
        this.redirectRequest(request);
        const response = await next(request);
        this.handleTestProxyErrors(response);

        return response;
      },
    };
  }

  /**
   * Creates a client that supports redirecting the requests to the proxy-tool.
   * Needed for the core-v1 SDKs(SDKs depending on core-http)
   */
  private createHttpClientCoreV1(): HttpClientCoreV1 {
    const client = new DefaultHttpClient();
    return {
      sendRequest: async (request: WebResourceLike): Promise<HttpOperationResponse> => {
        this.redirectRequest(request);
        const response = await client.sendRequest(request);
        this.handleTestProxyErrors(response);

        return response;
      },
    };
  }

  /**
   * Register a variable to be stored with the recording. The behavior of this function
   * depends on whether the recorder is in record/live mode or in playback mode.
   *
   * In record or live mode, the function will store the value provided with the recording
   * as a variable and return that value.
   *
   * In playback mode, the function will fetch the value from the variables stored as part of the recording
   * and return the retrieved variable, throwing an error if it is not found.
   *
   * @param name - the name of the variable to be stored in the recording
   * @param value - the value of the variable. In record mode, this value will be stored
   *                with the recording; in playback mode, this parameter is ignored.
   * @returns in record and live mode, `value` without modification.
   *          In playback mode, the variable's value from the recording.
   */
  variable(name: string, value: string): string;

  /**
   * Convenience overload in case you want to reference the same variable multiple times in a test without
   * declaring a variable of your own, or if you know you're in playback mode and don't want to specify an
   * initial value. Throws an error in record and live mode if a call to variable(name, value) has not been
   * made previously.
   *
   * @param name - the name of the variable stored in the recording
   * @returns the value of the variable -- in record and live mode, the value set
   *          in a previous call to variable(name, value). In playback mode, the variable's
   *          value from the recording.
   */
  variable(name: string): string;

  variable(name: string, value: string | undefined = undefined): string {
    if (isPlaybackMode()) {
      const recordedValue = this.variables[name];

      if (recordedValue === undefined) {
        logger.error(
          `[Recorder#variable] Test tried to access a variable in playback that was not set in the recording: ${name}`
        );
        throw new RecorderError(
          `Tried to access a variable in playback that was not set in recording: ${name}`
        );
      }

      return recordedValue;
    }

    if (!this.variables[name]) {
      if (value === undefined) {
        logger.error(`[Recorder#variable] Test tried to access an unitialized variable: ${name}`);
        throw new RecorderError(
          `Tried to access uninitialized variable: ${name}. You must initialize it with a value before using it.`
        );
      }

      this.variables[name] = value;
    }

    return this.variables[name];
  }
}
