// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LogsQueryOptions } from "../models/publicLogsModels";

/**
 * @internal
 */
export function formatPreferHeader(
  args:
    | Pick<
        LogsQueryOptions,
        "serverTimeoutInSeconds" | "includeQueryStatistics" | "includeVisualization"
      >
    | undefined
): { Prefer: string } | undefined {
  if (!args) {
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

  if (args.includeVisualization) {
    pairs.push("include-render=true");
  }

  if (pairs.length > 0) {
    return {
      Prefer: pairs.join(",")
    };
  }

  return undefined;
}
