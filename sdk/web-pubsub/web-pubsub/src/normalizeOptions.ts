// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function normalizeSendToAllOptions<T extends { excludedConnections?: string[] }>(
  options: T
) {
  const { excludedConnections, ...otherOptions } = options;
  return {
    ...otherOptions,
    excluded: excludedConnections
  };
}

export function normalizeGenerateClientTokenOptions<T extends { roles?: string[] }>(options: T) {
  const { roles, ...otherOptions } = options;
  return {
    ...otherOptions,
    role: roles
  };
}
