// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftCommonRetentionPolicy } from "../common/models.js";
import {
  microsoftCommonRetentionPolicySerializer,
  microsoftCommonRetentionPolicyDeserializer,
} from "../common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function microsoftInsightsCombinedClientMetricSettingsArraySerializer(
  result: Array<MicrosoftInsightsCombinedClientMetricSettings>,
): any[] {
  return result.map((item) => {
    return microsoftInsightsCombinedClientMetricSettingsSerializer(item);
  });
}

export function microsoftInsightsCombinedClientMetricSettingsArrayDeserializer(
  result: Array<MicrosoftInsightsCombinedClientMetricSettings>,
): any[] {
  return result.map((item) => {
    return microsoftInsightsCombinedClientMetricSettingsDeserializer(item);
  });
}

/** Part of MultiTenantDiagnosticSettings. Specifies the settings for a particular metric. */
export interface MicrosoftInsightsCombinedClientMetricSettings {
  /** the timegrain of the metric in ISO8601 format. */
  timeGrain?: string;
  /** Name of a Diagnostic Metric category for a resource type this setting is applied to. To obtain the list of Diagnostic metric categories for a resource, first perform a GET diagnostic settings operation. */
  category?: string;
  /** a value indicating whether this category is enabled. */
  enabled: boolean;
  /** the retention policy for this category. */
  retentionPolicy?: MicrosoftCommonRetentionPolicy;
}

export function microsoftInsightsCombinedClientMetricSettingsSerializer(
  item: MicrosoftInsightsCombinedClientMetricSettings,
): any {
  return {
    timeGrain: item["timeGrain"],
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftCommonRetentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function microsoftInsightsCombinedClientMetricSettingsDeserializer(
  item: any,
): MicrosoftInsightsCombinedClientMetricSettings {
  return {
    timeGrain: item["timeGrain"],
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftCommonRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}
