// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest } from "@azure/core-rest-pipeline";
import {
  LroResourceLocationConfig,
  LongRunningOperation,
  LroConfig,
  LroResponse,
  LroStatus,
  createGetLroStatusFromResponse,
  RawResponse
} from "../../src";

export type SendOperationFn<T> = (request: PipelineRequest) => Promise<LroResponse<T>>;

export class CoreRestPipelineLro<T> implements LongRunningOperation<T> {
  constructor(
    private sendOperationFn: SendOperationFn<T>,
    private req: PipelineRequest,
    private lroResourceLocationConfig?: LroResourceLocationConfig,
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

  public async sendPollRequest(config: LroConfig, url: string): Promise<LroStatus<T>> {
    const getLroStatusFromResponse = createGetLroStatusFromResponse(
      this,
      config,
      this.lroResourceLocationConfig
    );
    const response = await this.sendOperationFn({
      ...this.req,
      method: "GET",
      url
    });
    return getLroStatusFromResponse(response.rawResponse, response.flatResponse);
  }

  public async retrieveAzureAsyncResource(url?: string): Promise<LroResponse<T>> {
    return this.sendOperationFn({
      ...this.req,
      method: "GET",
      ...(url && { url })
    });
  }
}
