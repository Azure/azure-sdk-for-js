// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import { ExportResultCode, type ExportResult } from "@opentelemetry/core";
import { DropCode, RetryCode } from "../export/statsbeat/types.js";

const reasons = {
  INVALID_INSTRUMENTATION_KEY:
    "Set microsoft.instrumentation_key to a nonblank string of at most 200 characters.",
  INVALID_INGESTION_ENDPOINT:
    "Set microsoft.ingestion_endpoint to an absolute HTTPS URL of at most 2048 characters without credentials, query, or fragment.",
  MISSING_CREDENTIAL: "An AAD route requires an exporter credential.",
  ROUTE_CACHE_LIMIT:
    "The 64-route cache is full. Using a temporary sender without offline storage. Reduce the number of destinations.",
  EXPORT_FAILED: "Routed export failed. Check destination configuration and authentication.",
  EXPORT_RETRY: "Retryable ingestion failure. Check throttling and service availability.",
  INGESTION_SAMPLED: "Ingestion sampled out the item. Check destination sampling settings.",
  REDIRECT_REFUSED: "Check the configured HTTPS ingestion endpoint and its redirects.",
  SENDER_SHUTDOWN: "Cannot send routed telemetry after shutdown.",
  [RetryCode.CLIENT_TIMEOUT]: "The routed request timed out or was cancelled.",
  [RetryCode.CLIENT_EXCEPTION]: "The transport failed. Check destination connectivity.",
  [DropCode.CLIENT_STORAGE_DISABLED]:
    "Cannot persist routed telemetry because offline storage is unavailable.",
  [DropCode.CLIENT_PERSISTENCE_CAPACITY]:
    "Retry storage is full. Check ingestion availability and storage usage.",
  [DropCode.CLIENT_READONLY]:
    "Cannot protect retry storage. Check directory ownership and permissions.",
  STORAGE_WRITE_FAILED: "Cannot store telemetry for retry. Check disk space and write access.",
  STORAGE_READ_FAILED: "Cannot read retry storage. Check storage permissions and file integrity.",
  STORAGE_EXPIRED: "One retry file expired before delivery. Check destination availability.",
} as const;

/** Format only bounded diagnostic fields, never exception text, paths or route attributes. */
export function routingDiagnostic(
  reason: keyof typeof reasons,
  itemCount?: number,
  httpStatus?: number,
): string {
  const status =
    httpStatus !== undefined &&
    Number.isInteger(httpStatus) &&
    httpStatus >= 100 &&
    httpStatus <= 599
      ? ` httpStatus=${httpStatus}`
      : "";
  return `Multi-endpoint routing: reason=${reason} itemCount=${itemCount ?? "unknown"}${status}. ${reasons[reason]}`;
}

/** Keep raw transport and storage errors out of export callbacks as well as logs. */
export function failedRoutedExport(
  reason: keyof typeof reasons,
  itemCount: number,
  httpStatus?: number,
): ExportResult {
  const message = routingDiagnostic(reason, itemCount, httpStatus);
  diag.error(message);
  return { code: ExportResultCode.FAILED, error: new Error(message) };
}
