// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpMethods, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { ResponseBody } from "../../../src/next/http/models";

export interface RouteProcessor {
  method: string;
  path: string;
  process: Generator<(request: PipelineRequest) => PipelineResponse>;
}

export interface LroResponseSpec {
  method: HttpMethods;
  path?: string;
  status: number;
  body?: string;
  headers?: Record<string, string>;
}

export type ImplementationName = "createPollerSync";

export type Result = ResponseBody & { statusCode: number };
export type State = any;
