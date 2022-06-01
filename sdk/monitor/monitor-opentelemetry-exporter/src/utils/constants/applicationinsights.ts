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
export const packageVersion = "1.0.0-beta.8";

export enum DependencyTypes {
  InProc = "InProc",
  QueueMessage = "Queue Message",
  Sql = "SQL",
  Http = "Http",
  Grpc = "GRPC",
}
