// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AnalyzeSentimentResult, AnalyzeSentimentSuccessResult } from "../../src/index";

export function isAnalyzeSentimentSuccess(
  res: AnalyzeSentimentResult
): res is AnalyzeSentimentSuccessResult {
  return (res as any).error === undefined;
}
