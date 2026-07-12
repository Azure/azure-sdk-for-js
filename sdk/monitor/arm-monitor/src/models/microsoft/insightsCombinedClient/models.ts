// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RetentionPolicy } from "../common/models.js";
import { retentionPolicySerializer, retentionPolicyDeserializer } from "../common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function metricSettingsArraySerializer(result: Array<MetricSettings>): any[] {
  return result.map((item) => {
    return metricSettingsSerializer(item);
  });
}

export function metricSettingsArrayDeserializer(result: Array<MetricSettings>): any[] {
  return result.map((item) => {
    return metricSettingsDeserializer(item);
  });
}

/** Part of MultiTenantDiagnosticSettings. Specifies the settings for a particular metric. */
export interface MetricSettings {
  /** the timegrain of the metric in ISO8601 format. */
  timeGrain?: string;
  /** Name of a Diagnostic Metric category for a resource type this setting is applied to. To obtain the list of Diagnostic metric categories for a resource, first perform a GET diagnostic settings operation. */
  category?: string;
  /** a value indicating whether this category is enabled. */
  enabled: boolean;
  /** the retention policy for this category. */
  retentionPolicy?: RetentionPolicy;
}

export function metricSettingsSerializer(item: MetricSettings): any {
  return {
    timeGrain: item["timeGrain"],
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function metricSettingsDeserializer(item: any): MetricSettings {
  return {
    timeGrain: item["timeGrain"],
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}
