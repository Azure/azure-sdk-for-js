// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpMethods,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
  isRestError,
} from "@azure/core-rest-pipeline";
import { ResponseBody } from "../../src/http/models.js";
import { assert } from "vitest";

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

export type ImplementationName = "createPoller";

export type Result = ResponseBody & { statusCode: number };
export type State = any;

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
    name?: string;
  } = {},
): Promise<void> {
  const { statusCode, messagePattern, name } = options;
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
    if (name) {
      if (e instanceof Error) {
        assert.equal(e.name, name);
      } else {
        assert.fail(`Unexpected error: ${JSON.stringify(e)}`);
      }
    }
  }
}

export async function assertDivergentBehavior(inputs: {
  op: Promise<Result>;
  throwOnNon2xxResponse: boolean;
  throwing: {
    statusCode?: number;
    messagePattern?: RegExp;
  };
  notThrowing: {
    result?: any;
    partResult?: any;
    statusCode?: number;
    messagePattern?: RegExp;
  };
}): Promise<void> {
  const {
    op,
    throwOnNon2xxResponse,
    throwing: { messagePattern, statusCode },
    notThrowing: {
      messagePattern: notThrowingMessagePattern,
      statusCode: notThrowingStatusCode,
      result,
      partResult,
    },
  } = inputs;
  if (throwOnNon2xxResponse) {
    await assertError(op, {
      statusCode,
      messagePattern,
    });
  } else {
    if (notThrowingStatusCode !== undefined || notThrowingMessagePattern !== undefined) {
      await assertError(op, {
        statusCode: notThrowingStatusCode,
        messagePattern: notThrowingMessagePattern,
      });
    } else if (partResult !== undefined) {
      assert.deepInclude(await op, partResult);
    } else {
      assert.deepEqual(await op, result);
    }
  }
}
