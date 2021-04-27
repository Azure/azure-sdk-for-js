// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { QueryLogsOptions } from "../models/logsModels";

/**
 * @internal
 */
export function formatPreferHeader(
  args: Pick<QueryLogsOptions, "serverTimeoutInSeconds" | "includeQueryStatistics"> | undefined
): { Prefer: string } | undefined {
  if (args == null) {
    return undefined;
  }

  // https://datatracker.ietf.org/doc/html/rfc7240

  const pairs = [];

  if (args.serverTimeoutInSeconds != null) {
    pairs.push(`wait=${args.serverTimeoutInSeconds}`);
  }

  if (args.includeQueryStatistics) {
    pairs.push("include-statistics=true");
  }

  if (pairs.length > 0) {
    return {
      Prefer: pairs.join(",")
    };
  }

  return undefined;
}
