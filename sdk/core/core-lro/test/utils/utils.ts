// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
  isRestError,
} from "@azure/core-rest-pipeline";
import { assert } from "@azure/test-utils";

export interface RouteProcessor {
  method: string;
  path: string;
  process: Generator<(request: PipelineRequest) => PipelineResponse>;
}

export interface LroResponseSpec {
  method: HttpMethods;
  path: string;
  status: number;
  body?: string;
  headers?: Record<string, string>;
}

export function createProcessor(settings: {
  status: number;
  body?: string;
  headers?: Record<string, string>;
}): (req: PipelineRequest) => PipelineResponse {
  const { status, body: bodyAsText, headers } = settings;
  return (request: PipelineRequest) => ({
    request,
    headers: createHttpHeaders(headers),
    status,
    bodyAsText,
  });
}

export function createDoubleHeaders(settings: {
  pollingPath: string;
  headers: Record<string, string>;
}): Record<string, string> {
  const { headers, pollingPath } = settings;
  return {
    "Azure-AsyncOperation": pollingPath,
    Location: pollingPath,
    ...headers,
  };
}

export function* generate<T>(...input: T[]): Generator<T> {
  for (const item of input) {
    yield item;
  }
}

export async function assertError(
  error: Promise<unknown>,
  options: {
    statusCode?: number;
    messagePattern?: RegExp;
  } = {}
): Promise<void> {
  const { statusCode, messagePattern } = options;
  try {
    await error;
    assert.fail(`Should have failed instead!`);
  } catch (e: unknown) {
    if (messagePattern) {
      if (e instanceof Error) {
        assert.match(e.message, messagePattern);
      } else {
        assert.fail(`Unexpected error: ${JSON.stringify(e)}`);
      }
    }
    if (statusCode) {
      if (isRestError(e)) {
        assert.equal(e.statusCode, statusCode);
      } else {
        assert.fail(`Unexpected error: ${JSON.stringify(e)}`);
      }
    }
  }
}
