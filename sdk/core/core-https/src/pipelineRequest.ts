// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest } from "./interfaces";
import { createHttpHeaders } from "./httpHeaders";

export interface PipelineRequestOptions {
  url: string;
}

export function createPipelineRequest(options: PipelineRequestOptions): PipelineRequest {
  return {
    url: options.url,
    headers: createHttpHeaders(),
    method: "GET",
    timeout: 0,
    withCredentials: false
  };
}
