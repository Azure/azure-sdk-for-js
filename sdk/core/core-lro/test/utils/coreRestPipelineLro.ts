// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest } from "@azure/core-rest-pipeline";
import { LongRunningOperation, LroResponse, RawResponse } from "../../src";

export type SendOperationFn<T> = (request: PipelineRequest) => Promise<LroResponse<T>>;

export class CoreRestPipelineLro<T> implements LongRunningOperation<T> {
  constructor(
    private sendOperationFn: SendOperationFn<T>,
    private req: PipelineRequest,
    public requestPath: string = req.url,
    public requestMethod: string = req.method
  ) {}
  public async sendInitialRequest(
    initializeState: (rawResponse: RawResponse, flatResponse: unknown) => boolean
  ): Promise<LroResponse<T>> {
    const response = await this.sendOperationFn(this.req);
    initializeState(response.rawResponse, response.flatResponse);
    return response;
  }

  public async sendPollRequest(url: string): Promise<LroResponse<T>> {
    return this.sendOperationFn({
      ...this.req,
      method: "GET",
      url
    });
  }
}
