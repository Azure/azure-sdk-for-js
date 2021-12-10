// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders
} from "@azure/core-rest-pipeline";

export function buildResponse(
  request: PipelineRequest,
  status: number,
  body?: string,
  headers?: HttpHeaders
): PipelineResponse {
  return {
    request: request,
    headers: headers ? headers : createHttpHeaders(),
    status: status,
    bodyAsText: body
  };
}

export function buildProcessMultipleRequests(
  processRequest: (request: PipelineRequest) => PipelineResponse,
  processLastRequest: (request: PipelineRequest) => PipelineResponse,
  count: number = 1
): (request: PipelineRequest) => PipelineResponse {
  let internalCounter = count;
  return (request: PipelineRequest) => {
    if (internalCounter === 0) {
      return processLastRequest(request);
    } else {
      --internalCounter;
      return processRequest(request);
    }
  };
}

export function applyScenarios(
  request: PipelineRequest,
  scenarios: ((request: PipelineRequest) => PipelineResponse | undefined)[]
): PipelineResponse | undefined {
  for (const scenario of scenarios) {
    const response = scenario(request);
    if (response) {
      return response;
    }
  }
  return undefined;
}

export function getPascalCase(inString: string): string {
  return "" + inString.substring(0, 1).toUpperCase() + inString.substring(1);
}

export function parseUri(path: string): string[] {
  return path.substr(1).split("/");
}
