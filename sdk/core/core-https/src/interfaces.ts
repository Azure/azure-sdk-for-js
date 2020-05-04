// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface PipelineRequest {
  url: string;
}

export interface PipelineResponse {
  request: PipelineRequest;
  status: number;
}

export type SendRequest = (request: PipelineRequest) => Promise<PipelineResponse>;

export interface HttpsClient {
  sendRequest: SendRequest;
}
