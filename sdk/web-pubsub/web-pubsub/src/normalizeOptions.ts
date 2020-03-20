// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// normalizes excludedConnections -> excluded
export default function normalizeBroadcastOptions<T extends { excludedConnections?: string[] }>(
  options: T
) {
  const { excludedConnections, ...otherOptions } = options;
  return {
    ...otherOptions,
    excluded: excludedConnections
  };
}
