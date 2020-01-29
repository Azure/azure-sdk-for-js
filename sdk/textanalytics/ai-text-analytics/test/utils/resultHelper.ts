// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TextAnalyticsResult } from "../../src/index";

export function isSuccess<T extends TextAnalyticsResult>(res: T): boolean {
  return (res as any).error === undefined;
}
