// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * AI MS Links.
 * @internal
 */
export const MS_LINKS = "_MS.links";
/**
 * AI enqueued time attribute.
 * @internal
 */
export const ENQUEUED_TIME = "enqueuedTime";
/**
 * AI time since enqueued attribute.
 * @internal
 */
export const TIME_SINCE_ENQUEUED = "timeSinceEnqueued";
/**
 * AzureMonitorTraceExporter version.
 * @internal
 */
export const packageVersion = "1.0.0-beta.12";

export enum DependencyTypes {
  InProc = "InProc",
  QueueMessage = "Queue Message",
  Sql = "SQL",
  Http = "Http",
  Grpc = "GRPC",
}

export const AzureMonitorSampleRate = "_MS.sampleRate";
export const ApplicationInsightsBaseType = "_MS.baseType";

export const ApplicationInsightsMessageName = "Microsoft.ApplicationInsights.Message";
export const ApplicationInsightsExceptionName = "Microsoft.ApplicationInsights.Exception";
export const ApplicationInsightsPageViewName = "Microsoft.ApplicationInsights.PageView";
export const ApplicationInsightsAvailabilityName = "Microsoft.ApplicationInsights.Availability";
export const ApplicationInsightsEventName = "Microsoft.ApplicationInsights.Event";

export const ApplicationInsightsMessageBaseType = "MessageData";
export const ApplicationInsightsExceptionBaseType = "TelemetryExceptionData";
export const ApplicationInsightsPageViewBaseType = "PageViewData";
export const ApplicationInsightsAvailabilityBaseType = "AvailabilityData";
export const ApplicationInsightsEventBaseType = "TelemetryEventData";
