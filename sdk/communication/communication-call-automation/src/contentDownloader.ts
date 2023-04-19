// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CallAutomationApiClient } from "./generated/src/callAutomationApiClient";
import {
  AddPipelineOptions,
  createHttpHeaders,
  createPipelineRequest,
  PipelineRequest,
  PipelineRequestOptions,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { DeleteRecordingOptions, DownloadRecordingOptions } from "./models/options";

/** Class containing ContentDownloading operations. */
export class ContentDownloaderImpl {
  private readonly client: CallAutomationApiClient;

  /**
   * Initialize a new instance of the class ContentDownloader class.
   * @param client - Reference to the service client
   */
  constructor(client: CallAutomationApiClient) {
    this.client = client;
    this.addCustomSignUrlPolicy();
  }

  private addCustomSignUrlPolicy() {
    const signUrlPolicy = {
      name: "CustomSignUrlPolicy",
      async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
        if (request.headers.has("OriginalUrl")) {
          request.url = `${request.headers.get("OriginalUrl")}`;
          const originalRequest = new URL(request.url);
          request.headers.set("Host", originalRequest.host);
        }
        return next(request);
      },
    };

    const pipelineOptions: AddPipelineOptions = {};
    pipelineOptions.afterPhase = "Sign";
    this.client.pipeline.addPolicy(signUrlPolicy, pipelineOptions);
  }

  /**
   * Deletes a recording.
   * @param recordingLocation - The recording location uri. Required.
   */
  async deleteRecording(recordingLocation: string, options: DeleteRecordingOptions): Promise<void> {
    const fileLocation = new URL(recordingLocation);
    const endpoint = new URL(this.client.endpoint);
    const modifiedUrlForSigning = endpoint.origin + fileLocation.pathname;

    const opt: PipelineRequestOptions = {
      url: modifiedUrlForSigning,
      method: "DELETE",
      headers: createHttpHeaders(),
      body: "",
      abortSignal: options?.abortSignal,
      tracingOptions: options?.tracingOptions,
    };

    opt.headers?.set("OriginalUrl", recordingLocation);
    opt.headers?.set("x-ms-host", endpoint.host);
    opt.headers?.set("accept", "application/json");

    const req = createPipelineRequest(opt);

    const results = await this.client.sendRequest(req);

    if (results.status !== 200) {
      if (results.bodyAsText) {
        const jsonBody = JSON.parse(results.bodyAsText);
        throw { status: jsonBody.status, message: jsonBody.message };
      }
      throw { status: results.status };
    }
  }

  /**
   * Returns a stream with a call recording.
   * @param sourceLocation - The source location uri. Required.
   * @param options - Additional request options contains downloadRecording options.
   */
  async download(
    sourceLocation: string,
    options: DownloadRecordingOptions
  ): Promise<PipelineResponse> {
    const fileLocation = new URL(sourceLocation);
    const endpoint = new URL(this.client.endpoint);
    const modifiedUrlForSigning = endpoint.origin + fileLocation.pathname;

    const opt: PipelineRequestOptions = {
      url: modifiedUrlForSigning,
      method: "GET",
      headers: createHttpHeaders(),
      body: "",
      streamResponseStatusCodes: new Set([200, 206]),
      abortSignal: options.abortSignal,
      tracingOptions: options?.tracingOptions,
    };

    if (options.length && !options.offset) {
      throw Error("Download offset value must not be empty if length is set.");
    } else if (options.length && options.offset) {
      options.length = options.offset + options.length - 1;
    }

    let rangeHeader = "bytes=" + options.offset;
    if (options.length) rangeHeader += "-" + options.length;

    opt.headers?.set("OriginalUrl", sourceLocation);
    opt.headers?.set("x-ms-host", endpoint.host);
    opt.headers?.set("accept", "application/json");
    opt.headers?.set("Range", rangeHeader);

    const req = createPipelineRequest(opt);

    const results = await this.client.sendRequest(req);

    if (results.status !== 200 && results.status !== 206) {
      if (results.bodyAsText) {
        const jsonBody = JSON.parse(results.bodyAsText);
        throw { status: jsonBody.status, message: jsonBody.message };
      }
      throw { status: results.status };
    }
    return results;
  }
}
