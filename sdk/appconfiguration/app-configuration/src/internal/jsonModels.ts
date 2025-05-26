// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 */
export type JsonFeatureFlagValue = {
  conditions: {
    requirement_type?: "Any" | "All";
    client_filters: { name: string; parameters?: Record<string, unknown> }[];
  };
  description?: string;
  enabled: boolean;
  id?: string;
  display_name?: string;
  variants?: Record<string, unknown>;
  allocation?: {
    default?: string;
    user?: Array<{
      variant: string;
      users: string[];
    }>;
    group?: Array<{
      variant: string;
      groups: string[];
    }>;
    percentile?: Array<{
      variant: string;
      from: number;
      to: number;
    }>;
    seed?: string;
  };
  telemetry?: {
    enabled?: boolean;
    metadata?: Record<string, string>;
  };
};

// keyvault secret reference

/**
 * @internal
 */
export interface JsonSecretReferenceValue {
  uri: string;
}
