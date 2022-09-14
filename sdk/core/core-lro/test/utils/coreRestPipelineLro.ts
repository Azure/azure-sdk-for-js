// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LongRunningOperation, LroResponse } from "../../src";
import { AbortSignalLike } from "@azure/abort-controller";
import { PipelineRequest } from "@azure/core-rest-pipeline";

type SendOperationFn<T> = (request: PipelineRequest) => Promise<LroResponse<T>>;

export function createCoreRestPipelineLro<T>(inputs: {
  sendOperationFn: SendOperationFn<T>;
  request: PipelineRequest;
}): LongRunningOperation<T> {
  const { request, sendOperationFn } = inputs;
  return {
    requestMethod: request.method,
    requestPath: request.url,
    sendInitialRequest: () => sendOperationFn(request),
    sendPollRequest: (url: string, options?: { abortSignal?: AbortSignalLike }) =>
      sendOperationFn({
        ...request,
        method: "GET",
        url,
        abortSignal: options?.abortSignal,
      }),
  };
}
