// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CallAutomationApiClient } from "./generated/src/callAutomationApiClient.js";
import type {
  AddPipelineOptions,
  PipelineRequest,
  PipelineRequestOptions,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import type { DeleteRecordingOptions, DownloadRecordingOptions } from "./models/options.js";

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

  private addCustomSignUrlPolicy(): void {
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
   * @param deleteLocationUrl - The recording location url. Required.
   */
  async deleteRecording(deleteLocationUrl: string, options: DeleteRecordingOptions): Promise<void> {
    const fileLocation = new URL(deleteLocationUrl);
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

    opt.headers?.set("OriginalUrl", deleteLocationUrl);
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
   * @param sourceLocationUrl - The source location url. Required.
   * @param options - Additional request options contains downloadRecording options.
   */
  async download(
    sourceLocationUrl: string,
    options: DownloadRecordingOptions,
  ): Promise<PipelineResponse> {
    const fileLocation = new URL(sourceLocationUrl);
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

    // Validate range parameters
    if (options.length && !options.offset) {
      throw new Error("Download offset value must not be empty if length is set.");
    }

    // Set standard headers
    opt.headers?.set("OriginalUrl", sourceLocationUrl);
    opt.headers?.set("x-ms-host", endpoint.host);
    opt.headers?.set("accept", "application/json");

    // Add Range header if partial download is requested
    if (options.offset !== undefined) {
      const rangeHeader = this.buildRangeHeader(options.offset, options.length);
      opt.headers?.set("Range", rangeHeader);
    }

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

  /**
   * Builds HTTP Range header for partial content requests.
   * @param offset - Starting byte position (0-based)
   * @param length - Number of bytes to download (optional)
   * @returns Formatted Range header value
   *
   * @example
   * buildRangeHeader(1, 100)     // "bytes=1-100" (first 100 bytes)
   * buildRangeHeader(100, 50)    // "bytes=100-149" (50 bytes starting at 100)
   * buildRangeHeader(100)        // "bytes=100-" (from byte 100 to end)
   */
  private buildRangeHeader(offset: number, length?: number): string {
    // HTTP Range header uses inclusive end position
    // Format: "bytes=start-end" where both start and end are inclusive

    if (length !== undefined && length > 0) {
      // Calculate inclusive end position from offset and length
      const endPosition = offset + length - 1;
      return `bytes=${offset}-${endPosition}`;
    } else {
      // Open-ended range: from offset to end of file
      return `bytes=${offset}-`;
    }
  }
}
