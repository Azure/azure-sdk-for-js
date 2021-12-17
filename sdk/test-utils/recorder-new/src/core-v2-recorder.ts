// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createDefaultHttpClient,
  createPipelineRequest,
  HttpClient,
  HttpMethods,
  Pipeline,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import { isLiveMode, isPlaybackMode, isRecordMode } from "@azure-tools/test-recorder";
import {
  ensureExistence,
  getTestMode,
  once,
  RecorderError,
  RecorderStartOptions,
  RecordingStateManager
} from "./utils/utils";
import { Test } from "mocha";
import { sessionFilePath } from "./utils/sessionFilePath";
import { SanitizerOptions } from "./utils/utils";
import { paths } from "./utils/paths";
import { Sanitizer } from "./sanitizer";
import { handleEnvSetup } from "./utils/envSetupForPlayback";
import { Matcher, setMatcher } from "./matcher";
import { RecorderRequestModifier } from "./recorderRequestModifier";
import {
  DefaultHttpClient,
  HttpClient as HttpClientCoreV1,
  HttpOperationResponse,
  WebResourceLike
} from "@azure/core-http";

/**
 * This client manages the recorder life cycle and interacts with the proxy-tool to do the recording,
 * eventually save them in record mode and playing them back in playback mode.
 *
 * This client is meant for the core-v2 SDKs(depending on core-rest-pipeline) and
 * is supposed to be passed as an argument to the recorderHttpPolicy.
 */
export class RecorderClient {
  private url = "http://localhost:5000";
  public recordingId?: string;
  public mode: string;
  private stateManager = new RecordingStateManager();
  private httpClient: HttpClient | undefined = undefined;
  private sessionFile: string | undefined = undefined;
  private sanitizer: Sanitizer | undefined;
  private variables: Record<string, string>;
  private requestModifier: RecorderRequestModifier | undefined;
  private _httpClientCoreV1: () => HttpClientCoreV1 = once(() => this.createHttpClientCoreV1());

  constructor(private testContext?: Test | undefined) {
    this.mode = getTestMode();
    if (isRecordMode() || isPlaybackMode()) {
      if (this.testContext) {
        this.sessionFile = sessionFilePath(this.testContext);
        this.httpClient = createDefaultHttpClient();
      } else {
        throw new Error(
          "Unable to determine the recording file path, testContext provided is not defined."
        );
      }
      this.sanitizer = new Sanitizer(this.mode, this.url, this.httpClient);
      this.requestModifier = new RecorderRequestModifier(this.mode, this.url);
    }
    this.variables = {};
  }

  createHttpClientCoreV1() {
    const client = new DefaultHttpClient();
    return {
      sendRequest: (request: WebResourceLike): Promise<HttpOperationResponse> => {
        // If check needed because we only modify requests in record/playback modes.
        if (!isLiveMode() && ensureExistence(this.requestModifier, "recorder.requestModifier")) {
          const recordingId = this.recordingId;
          if (!recordingId) {
            throw new RecorderError("Something went wrong - recordingId should have been defined");
          }
          this.requestModifier.redirectRequest(request, recordingId);
        }
        return client.sendRequest(request);
      }
    };
  }

  /**
   * This client modifies the sendRequest to redirect the requests to the proxy tool instead of directly going to the service.
   * This client is supposed to be passed as the httpClient for the SDKs based on core-http(Core V1).
   */
  get httpClientCoreV1(): HttpClientCoreV1 {
    return this._httpClientCoreV1();
  }

  /**
   * addSanitizers adds the sanitizers for the current recording which will be applied on it before being saved.
   *
   * Takes SanitizerOptions as the input, passes on to the proxy-tool.
   * @param {SanitizerOptions} options
   */
  async addSanitizers(options: SanitizerOptions): Promise<void> {
    // If check needed because we only sanitize when the recording is being generated, and we need a recording to apply the sanitizers on.
    if (isRecordMode() && ensureExistence(this.sanitizer, "this.sanitizer")) {
      return this.sanitizer.addSanitizers(options);
    }
  }

  /**
   * recorderHttpPolicy calls this method on the request to modify and hit the proxy-tool with appropriate headers.
   */
  async modifyRequest(request: PipelineRequest): Promise<PipelineRequest> {
    // If check needed because we only modify requests in record/playback modes.
    if (!isLiveMode() && ensureExistence(this.requestModifier, "this.requestModifier")) {
      if (!this.recordingId) {
        throw new RecorderError("Something went wrong - recordingId should have been defined");
      }
      return this.requestModifier.modifyRequest(request, this.recordingId);
    }
    return request;
  }

  /**
   * Call this method to ping the proxy-tool with a start request
   * signalling to start recording in the record mode
   * or to start playing back in the playback mode.
   *
   * Takes RecorderStartOptions as the input, which will get used in record and playback modes.
   * Includes
   * - envSetupForPlayback - The key-value pairs will be used as the environment variables in playback mode. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values.
   * - sanitizerOptions - Generated recordings are updated by the "proxy-tool" based on the sanitizer options provided.
   *
   * @param {RecorderStartOptions} options
   */
  async start(options: RecorderStartOptions): Promise<void> {
    if (isPlaybackMode() || isRecordMode()) {
      this.stateManager.state = "started";
      if (this.recordingId === undefined) {
        const startUri = `${this.url}${isPlaybackMode() ? paths.playback : paths.record}${
          paths.start
        }`;
        const req = this._createRecordingRequest(startUri);

        if (ensureExistence(this.httpClient, "TestProxyHttpClient.httpClient")) {
          const rsp = await this.httpClient.sendRequest({
            ...req,
            allowInsecureConnection: true
          });
          if (rsp.status !== 200) {
            throw new RecorderError("Start request failed.");
          }
          const id = rsp.headers.get("x-recording-id");
          if (!id) {
            throw new RecorderError("No recording ID returned for a successful start request.");
          }
          this.recordingId = id;
          if (isPlaybackMode()) {
            this.variables = rsp.bodyAsText ? JSON.parse(rsp.bodyAsText) : {};
          }
          if (ensureExistence(this.sanitizer, "TestProxyHttpClient.sanitizer")) {
            // Setting the recordingId in the sanitizer,
            // the sanitizers added will take the recording id and only be part of the current test
            this.sanitizer.setRecordingId(this.recordingId);
            await handleEnvSetup(options.envSetupForPlayback, this.sanitizer);
          }
          // Sanitizers to be added only in record mode
          if (isRecordMode() && options.sanitizerOptions) {
            // Makes a call to the proxy-tool to add the sanitizers for the current recording id
            // Recordings of the current test will be influenced by the sanitizers that are being added here
            await this.addSanitizers(options.sanitizerOptions);
          }
        }
      }
    }
  }

  /**
   * Call this method to ping the proxy-tool with a stop request, this helps saving the recording in record mode.
   */
  async stop(): Promise<void> {
    if (isPlaybackMode() || isRecordMode()) {
      this.stateManager.state = "stopped";
      if (this.recordingId !== undefined) {
        const stopUri = `${this.url}${isPlaybackMode() ? paths.playback : paths.record}${
          paths.stop
        }`;
        const req = this._createRecordingRequest(stopUri);
        req.headers.set("x-recording-save", "true");

        if (isRecordMode()) {
          req.headers.set("Content-Type", "application/json");
          req.body = JSON.stringify(this.variables);
        }
        if (ensureExistence(this.httpClient, "TestProxyHttpClient.httpClient")) {
          const rsp = await this.httpClient.sendRequest({
            ...req,
            allowInsecureConnection: true
          });
          if (rsp.status !== 200) {
            throw new RecorderError("Stop request failed.");
          }
        }
      } else {
        throw new RecorderError("Bad state, recordingId is not defined when called stop.");
      }
    }
  }

  /**
   * Sets the matcher for the current recording to the matcher specified.
   */
  async setMatcher(matcher: Matcher): Promise<void> {
    if (this.mode === "playback") {
      if (!this.httpClient) {
        throw new RecorderError("httpClient should be defined in playback mode");
      }

      await setMatcher(this.url, this.httpClient, matcher, this.recordingId);
    }
  }

  /**
   * Adds the recording file and the recording id headers to the requests that are sent to the proxy tool.
   * These are required to appropriately save the recordings in the record mode and picking them up in playback.
   *
   * @private
   * @param {string} url
   */
  private _createRecordingRequest(url: string, method: HttpMethods = "POST") {
    const req = createPipelineRequest({ url, method });
    if (ensureExistence(this.sessionFile, "sessionFile")) {
      req.headers.set("x-recording-file", this.sessionFile);
    }
    if (this.recordingId !== undefined) {
      req.headers.set("x-recording-id", this.recordingId);
    }
    return req;
  }

  /**
   * For core-v2 - libraries depending on core-rest-pipeline.
   * This method adds the recording policy to the input client's pipeline.
   */
  public configureClient(client: { pipeline: Pipeline }): void {
    if (!isLiveMode()) {
      client.pipeline.addPolicy(recorderHttpPolicy(this));
    }
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
        throw new RecorderError(
          `Tried to access a variable in playback that was not set in recording: ${name}`
        );
      }

      return recordedValue;
    }

    if (!this.variables[name]) {
      if (value === undefined) {
        throw new RecorderError(
          `Tried to access uninitialized variable: ${name}. You must initialize it with a value before using it.`
        );
      }

      this.variables[name] = value;
    }

    return this.variables[name];
  }
}

/**
 * recorderHttpPolicy that can be added as a pipeline policy for any of the core-v2 SDKs(SDKs depending on core-rest-pipeline)
 *
 * @export
 * @param {TestProxyHttpClient} testProxyHttpClient
 */
export function recorderHttpPolicy(testProxyHttpClient: RecorderClient): PipelinePolicy {
  return {
    name: "recording policy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      await testProxyHttpClient.modifyRequest(request);
      return next(request);
    }
  };
}
