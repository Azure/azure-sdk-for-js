// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export default function normalizeSendToAllOptions<T extends { excludedConnections?: string[] }>(
  options: T
) {
  const { excludedConnections, ...otherOptions } = options;
  return {
    ...otherOptions,
    excluded: excludedConnections
  };
}
