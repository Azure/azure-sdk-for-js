
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QueryResourcesOptionalParams } from "./api/options.js";
import type { MetricsClientOptionalParams } from "./metricsClient.js";
import type { Metric } from "./models/models.js";

/**
 * Known values for Monitor Audience
 */
export enum KnownMonitorMetricsQueryAudience {
    /**
     * Audience for Azure China
     */
    AzureChina = "https://management.chinacloudapi.cn",
    /**
     * Audience for Azure Government
     */
    AzureGovernment = "https://management.usgovcloudapi.net",
    /**
     * Audience for Azure Public
     */
    AzurePublicCloud = "https://management.azure.com",
}

/**
 * Options for configuring the MetricsClient.
 */
export interface MetricsClientOptions extends MetricsClientOptionalParams {
    /**
     * The Audience to use for authentication with Microsoft Entra ID. The
     * audience is not considered when using a shared key.
     * {@link KnownMonitorMetricsQueryAudience} can be used interchangeably with audience
     */
    audience?: string;
    /**
     * The endpoint to use when communicating with the service.
     */
    endpoint?: string;
}

/**
 * Options for querying metrics for multiple resources.
 */
export interface MetricsQueryResourcesOptions extends Omit<QueryResourcesOptionalParams, "startTime" | "endTime"> {
    endTime?: Date;
    startTime?: Date;
}

/**
 * Query time interval type that supports multiple formats.
 */
export type QueryTimeInterval =
    | { startTime: Date; endTime: Date }
    | { startTime: Date; duration: string }
    | { duration: string; endTime: Date }
    | { duration: string };

/**
 * Result of a metrics query for a single resource.
 */
export interface MetricsQueryResult {
    /**
     * The cost associated with the query.
     */
    cost?: number;
    /**
     * The interval (window size) for which the metric data was returned.
     */
    granularity?: string;
    /**
     * The metrics data.
     */
    metrics: Metric[];
    /**
     * The namespace of the metrics been queried.
     */
    namespace?: string;
    /**
     * The resource that has been queried for metrics.
     */
    resourceId?: string;
    /**
     * The region of the resource been queried for metrics.
     */
    resourceRegion?: string;
    /**
     * The timespan for the query.
     */
    timespan: QueryTimeInterval;
    /**
     * Helper method to get a metric by name.
     * @param metricName - The name of the metric to retrieve.
     * @returns The metric if found, undefined otherwise.
     */
    getMetricByName(metricName: string): Metric | undefined;
}
