// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebResourceLike } from "@azure/core-http";
import {
  createDefaultHttpClient,
  createPipelineRequest,
  HttpClient,
  HttpMethods,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import { isPlaybackMode, isRecordMode } from "@azure-tools/test-recorder";
import {
  ensureExistence,
  getTestMode,
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

/**
 * This client manages the recorder life cycle and interacts with the proxy-tool to do the recording,
 * eventually save them in record mode and playing them back in playback mode.
 *
 * This client is meant for the core-v2 SDKs(depending on core-rest-pipeline) and
 * is supposed to be passed as an argument to the recorderHttpPolicy.
 */
export class TestProxyHttpClient {
  private url = "http://localhost:5000";
  public recordingId?: string;
  public mode: string;
  private stateManager = new RecordingStateManager();
  public httpClient: HttpClient | undefined = undefined;
  private sessionFile: string | undefined = undefined;
  private sanitizer: Sanitizer | undefined;

  /**
   * Add the dynamically created variables here in the record mode, so that the recorder registers them as part of the recording.
   * Using this "variables" in playback mode would give the key-value pairs that are stored in record mode.
   *
   * Example:
   *  ```ts
   *       if (!isPlaybackMode()) {
   *           recorder.variables["random-1"] = `random-${Math.ceil(Math.random() * 1000 + 1000)}`;
   *       }
   *  ```
   * Use this `recorder.variables["random-1"]` whereever you'd like to use in your test.
   *      (This would work in all three modes - record/playback/live just by adding the if-block above)
   *
   * Internals(How does it work?):
   *  - recorder.stop() call sends the variables to the proxy-tool (in record mode)
   *  - recorder.start() call loads those variables given by the proxy tool (in playback mode)
   */
  public variables: Record<string, string>;

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
    }
    this.variables = {};
  }

  /**
   * For core-v1 (core-http)
   */
  redirectRequest(request: WebResourceLike): WebResourceLike;

  /**
   * For core-v2 (core-rest-pipeline)
   */
  redirectRequest(request: PipelineRequest): PipelineRequest;

  /**
   * redirectRequest updates the request in record and playback modes to hit the proxy-tool with appropriate headers.
   * Works for both core-v1 and core-v2
   */
  redirectRequest(request: WebResourceLike | PipelineRequest) {
    if (isPlaybackMode() || isRecordMode()) {
      if (!request.headers.get("x-recording-id")) {
        request.headers.set("x-recording-id", this.recordingId!);
        request.headers.set("x-recording-mode", this.mode);

        const upstreamUrl = new URL(request.url);
        const redirectedUrl = new URL(request.url);
        const providedUrl = new URL(this.url);

        redirectedUrl.host = providedUrl.host;
        redirectedUrl.port = providedUrl.port;
        redirectedUrl.protocol = providedUrl.protocol;
        request.headers.set("x-recording-upstream-base-uri", upstreamUrl.toString());
        request.url = redirectedUrl.toString();
      }
    }
    return request;
  }

  /**
   * addSanitizers adds the sanitizers for the current recording which will be applied on it before being saved.
   *
   * Takes SanitizerOptions as the input, passes on to the proxy-tool.
   * @param {SanitizerOptions} options
   */
  async addSanitizers(options: SanitizerOptions): Promise<void> {
    // If check needed because we only sanitize when the recording is being generated, and we need a recording to apply the sanitizers on.
    if (isRecordMode() && ensureExistence(this.sanitizer, "this.sanitizer", this.mode)) {
      return this.sanitizer.addSanitizers(options);
    }
  }

  /**
   * recorderHttpPolicy calls this method on the request to modify and hit the proxy-tool with appropriate headers.
   */
  async modifyRequest(request: PipelineRequest): Promise<PipelineRequest> {
    if (isPlaybackMode() || isRecordMode()) {
      if (this.recordingId) {
        request = this.redirectRequest(request);
        request.allowInsecureConnection = true;
      }
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

        if (ensureExistence(this.httpClient, "TestProxyHttpClient.httpClient", this.mode)) {
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
          if (ensureExistence(this.sanitizer, "TestProxyHttpClient.sanitizer", this.mode)) {
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
        if (ensureExistence(this.httpClient, "TestProxyHttpClient.httpClient", this.mode)) {
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
   * Adds the recording file and the recording id headers to the requests that are sent to the proxy tool.
   * These are required to appropriately save the recordings in the record mode and picking them up in playback.
   *
   * @private
   * @param {string} url
   */
  private _createRecordingRequest(url: string, method: HttpMethods = "POST") {
    const req = createPipelineRequest({ url, method });
    if (ensureExistence(this.sessionFile, "sessionFile", this.mode)) {
      req.headers.set("x-recording-file", this.sessionFile);
    }
    if (this.recordingId !== undefined) {
      req.headers.set("x-recording-id", this.recordingId);
    }
    return req;
  }
}

/**
 * recorderHttpPolicy that can be added as a pipeline policy for any of the core-v2 SDKs(SDKs depending on core-rest-pipeline)
 *
 * @export
 * @param {TestProxyHttpClient} testProxyHttpClient
 */
export function recorderHttpPolicy(testProxyHttpClient: TestProxyHttpClient): PipelinePolicy {
  return {
    name: "recording policy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      await testProxyHttpClient.modifyRequest(request);
      return next(request);
    }
  };
}
