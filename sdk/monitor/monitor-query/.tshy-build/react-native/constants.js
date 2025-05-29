// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @internal
 */
export const SDK_VERSION = "1.3.2";
/**
 * Known values for Monitor Audience
 *
 * **NOTE**: This is applicable only to `MetricsClient` in the `@azure/monitor-query` data plane package.
 * The name `KnownMonitorAudience` is added for backward compatibility.
 */
export var KnownMonitorAudience;
(function (KnownMonitorAudience) {
    /**
     * Audience for Azure China
     */
    KnownMonitorAudience["AzureChina"] = "https://metrics.monitor.azure.cn";
    /**
     * Audience for Azure Government
     */
    KnownMonitorAudience["AzureGovernment"] = "https://metrics.monitor.azure.us";
    /**
     * Audience for Azure Public
     */
    KnownMonitorAudience["AzurePublicCloud"] = "https://metrics.monitor.azure.com";
})(KnownMonitorAudience || (KnownMonitorAudience = {}));
/**
 * Known values for Monitor Audience
 */
export var KnownMonitorLogsQueryAudience;
(function (KnownMonitorLogsQueryAudience) {
    /**
     * Audience for Azure China
     */
    KnownMonitorLogsQueryAudience["AzureChina"] = "https://api.loganalytics.azure.cn";
    /**
     * Audience for Azure Government
     */
    KnownMonitorLogsQueryAudience["AzureGovernment"] = "https://api.loganalytics.us";
    /**
     * Audience for Azure Public
     */
    KnownMonitorLogsQueryAudience["AzurePublicCloud"] = "https://api.loganalytics.io";
})(KnownMonitorLogsQueryAudience || (KnownMonitorLogsQueryAudience = {}));
/**
 * Known values for Monitor Audience
 */
export var KnownMonitorMetricsQueryAudience;
(function (KnownMonitorMetricsQueryAudience) {
    /**
     * Audience for Azure China
     */
    KnownMonitorMetricsQueryAudience["AzureChina"] = "https://management.chinacloudapi.cn";
    /**
     * Audience for Azure Government
     */
    KnownMonitorMetricsQueryAudience["AzureGovernment"] = "https://management.usgovcloudapi.net";
    /**
     * Audience for Azure Public
     */
    KnownMonitorMetricsQueryAudience["AzurePublicCloud"] = "https://management.azure.com/";
})(KnownMonitorMetricsQueryAudience || (KnownMonitorMetricsQueryAudience = {}));
//# sourceMappingURL=constants.js.map