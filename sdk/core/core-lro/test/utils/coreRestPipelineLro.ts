// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LongRunningOperation, LroResponse } from "../../src";
import { PipelineRequest } from "@azure/core-rest-pipeline";

export type SendOperationFn<T> = (request: PipelineRequest) => Promise<LroResponse<T>>;

export class CoreRestPipelineLro<T> implements LongRunningOperation<T> {
  constructor(
    private sendOperationFn: SendOperationFn<T>,
    private req: PipelineRequest,
    public requestPath: string = req.url,
    public requestMethod: string = req.method
  ) {}
  public async sendInitialRequest(): Promise<LroResponse<T>> {
    return this.sendOperationFn(this.req);
  }

  public async sendPollRequest(url: string): Promise<LroResponse<T>> {
    return this.sendOperationFn({
      ...this.req,
      method: "GET",
      url,
    });
  }
}
