// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TextAnalyticsResult, TextAnalyticsSuccessResult } from "../../src/index";

export function isSuccess(res: TextAnalyticsResult): res is TextAnalyticsSuccessResult {
  return res.error === undefined;
}
