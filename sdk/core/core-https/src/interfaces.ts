// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Metadata about a request being made by the pipeline.
 * TODO: this interface isn't complete, it is just a placeholder.
 */
export interface PipelineRequest {
  /**
   * The URL to make the request to.
   */
  url: string;
}

/**
 * Metadata about a response received by the pipeline.
 * TODO: this interface isn't complete, it is just a placeholder.
 */
export interface PipelineResponse {
  /**
   * The request that generated this response.
   */
  request: PipelineRequest;
  /**
   * The HTTP status code of the response.
   */
  status: number;
}

/**
 * A simple interface for making a pipeline request and receiving a response.
 */
export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;

/**
 * The required interface for a client that makes HTTPS requests
 * on behalf of a pipeline.
 */
export interface HttpsClient {
  /**
   * The method that makes the request.
   */
  sendRequest: SendRequest;
}
