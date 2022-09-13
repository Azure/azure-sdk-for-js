// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeBatchResult,
  KnownTextAnalysisErrorCode,
  PagedAnalyzeBatchResult,
  TextAnalysisErrorResult,
  TextAnalysisSuccessResult,
} from "../../../src/";
import { assert } from "@azure/test-utils";
import { isRestError } from "@azure/core-rest-pipeline";

export function assertAllSuccess<TSuccess extends TextAnalysisSuccessResult>(
  results: (TextAnalysisErrorResult | TSuccess)[]
): void {
  for (const result of results) {
    assert.ok(isSuccess(result));
  }
}

export function isSuccess<TSuccess extends TextAnalysisSuccessResult>(
  res: TextAnalysisErrorResult | TSuccess
): res is TSuccess {
  return res.error === undefined;
}

export function getSuccRes<TSuccess extends TextAnalysisSuccessResult>(
  res: TextAnalysisErrorResult | TSuccess
): TSuccess {
  if (!res.error) {
    return res;
  } else {
    throw new Error(`Unexpected error: ${JSON.stringify(res.error)}`);
  }
}

export async function assertActionResults(
  actions: PagedAnalyzeBatchResult,
  expectations: AnalyzeBatchResult[],
  options: {
    maxPageSize?: number;
    excludedAdditionalProps?: string[];
  } = {}
): Promise<void> {
  const { maxPageSize, excludedAdditionalProps = [] } = options;
  let actionIndex = 0;
  for await (const page of actions.byPage(maxPageSize !== undefined ? { maxPageSize } : {})) {
    for (const action of page) {
      assert.deepEqualExcludingEvery(action, expectations[actionIndex++], [
        "completedOn",
        "modelVersion",
        "deploymentName",
        "projectName",
        ...excludedAdditionalProps,
      ] as any);
    }
  }
}

export async function assertRestError(
  error: Promise<unknown>,
  options: {
    statusCode?: number;
    code?: keyof typeof KnownTextAnalysisErrorCode;
    messagePattern?: RegExp;
  } = {}
): Promise<void> {
  const { code, statusCode, messagePattern } = options;
  try {
    await error;
    assert.fail(`Should have failed instead!`);
  } catch (e: unknown) {
    if (isRestError(e)) {
      if (code) {
        assert.equal(e.code, code);
      }
      if (statusCode) {
        assert.equal(e.statusCode, statusCode);
      }
      if (messagePattern) {
        assert.match(e.message, messagePattern);
      }
    } else {
      assert.fail(`Unexpected error: ${JSON.stringify(e)}`);
    }
  }
}
