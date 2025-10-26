// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 */
export type JsonFeatureFlagValue = {
  conditions: {
    client_filters: { name: string; parameters?: Record<string, unknown> }[];
    requirement_type?: "All" | "Any";
  };
  description?: string;
  enabled: boolean;
  id: string;
  display_name?: string;
};

// keyvault secret reference

/**
 * @internal
 */
export interface JsonSecretReferenceValue {
  uri: string;
}

// snapshot reference

/**
 * @internal
 */
export interface JsonSnapshotReferenceValue {
  snapshot_name: string;
}
