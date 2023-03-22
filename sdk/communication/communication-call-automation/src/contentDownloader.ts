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
import { AbortSignalLike } from "@azure/abort-controller";

/** Class containing ContentDownloading operations. */
export class ContentDownloaderImpl {
  private readonly client: CallAutomationApiClient;

  /**
   * Initialize a new instance of the class ContentDownloader class.
   * @param client Reference to the service client
   */
  constructor(client: CallAutomationApiClient) {
    this.client = client;
    this.addCustomSignUrlPolicy();
  }

  private addCustomSignUrlPolicy() {
    const signUrlPolicy = {
      name: "CustomSignUrlPolicy",
      async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
        request.url = `${request.headers.get("OriginalUrl")}`;
        var originalRequest = new URL(request.url);
        request.headers.set("Host", originalRequest.host);
        return next(request);
      },
    };

    var pipelineOptions: AddPipelineOptions = {};
    pipelineOptions.afterPhase = "Sign";
    this.client.pipeline.addPolicy(signUrlPolicy, pipelineOptions);
  }

  /**
   * Returns a stream with a call recording.
   * @param sourceLocation - The source location uri. Required.
   * @param offset - Offset byte. Not required.
   * @param length - how many bytes. Not required.
   */
  async download(
    sourceLocation: string,
    offset?: number,
    length?: number,
    abortSignal?: AbortSignalLike
  ): Promise<PipelineResponse> {
    var fileLocation = new URL(sourceLocation);
    var endpoint = new URL(this.client.endpoint);
    var modifiedUrlForSigning = endpoint.origin + fileLocation.pathname;

    const opt: PipelineRequestOptions = {
      url: modifiedUrlForSigning,
      method: "GET",
      headers: createHttpHeaders(),
      body: "",
      streamResponseStatusCodes: new Set([200, 206]),
      abortSignal: abortSignal,
    };

    if (length && !offset) {
      throw Error("Download offset value must not be empty if length is set.");
    } else if (length && offset) {
      length = offset + length - 1;
    }

    var rangeHeader = "bytes=" + offset;
    if (length) rangeHeader += "-" + length;

    opt.headers?.set("OriginalUrl", sourceLocation);
    opt.headers?.set("x-ms-host", endpoint.host);
    opt.headers?.set("accept", "application/json");
    opt.headers?.set("Range", rangeHeader);

    var req = createPipelineRequest(opt);

    var results = await this.client.sendRequest(req);

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
