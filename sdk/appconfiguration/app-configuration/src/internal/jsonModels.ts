// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 */
export type JsonFeatureFlagValue = {
  conditions: {
    client_filters: Record<string, unknown>[];
  };
  description?: string;
  enabled: boolean;
  id: string;
};

// keyvault reference

/**
 * @internal
 */
export interface JsonKeyVaultReference {
  uri: string;
}
