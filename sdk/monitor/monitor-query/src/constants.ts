// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 */
export const SDK_VERSION: string = "1.3.1";

/**
 * Known values for Monitor Audience
 */
export enum KnownMonitorAudience {
  /**
   * Audience for Azure China
   */
  AzureChina = "https://metrics.monitor.azure.cn",
  /**
   * Audience for Azure Government
   */
  AzureGovernment = "https://metrics.monitor.azure.us",
  /**
   * Audience for Azure Public
   */
  AzurePublicCloud = "https://metrics.monitor.azure.com",
}

/**
 * Known values for Monitor Audience
 */
export enum KnownMonitorLogAudience {
  /**
   * Audience for Azure China
   */
  AzureChina = "https://api.loganalytics.cn",
  /**
   * Audience for Azure Government
   */
  AzureGovernment = "https://api.loganalytics.us",
  /**
   * Audience for Azure Public
   */
  AzurePublicCloud = "https://api.loganalytics.io",
}

/**
 * Known values for Monitor Audience
 */
export enum KnownMonitorMetricsQueryAudience {
  /**
   * Audience for Azure China
   */
  AzureChina = "https://management.azure.cn/",
  /**
   * Audience for Azure Government
   */
  AzureGovernment = "https://management.azure.us/",
  /**
   * Audience for Azure Public
   */
  AzurePublicCloud = "https://management.azure.com/",
}
