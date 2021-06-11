// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 */
export type JsonFeatureFlagValue = {
  conditions: {
    client_filters: { name: string; parameters?: Record<string, unknown> }[];
  };
  description?: string;
  enabled: boolean;
  id?: string;
};

// keyvault secret reference

/**
 * @internal
 */
export interface JsonSecretReferenceValue {
  uri: string;
}
