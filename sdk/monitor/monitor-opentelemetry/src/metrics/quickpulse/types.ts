// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { MonitoringDataPoint, PublishResponse } from "../../generated";
import { DocumentIngress } from "../../generated";

/**
 * Quickpulse Exporter Options
 */
export interface QuickpulseExporterOptions {
  endpointUrl: string;

  instrumentationKey: string;

  credentialScopes?: string | string[];
  /**
   * Token Credential
   */
  credential?: TokenCredential;

  baseMonitoringDataPoint: MonitoringDataPoint;

  postCallback: (response: PublishResponse | undefined) => void;

  getDocumentsFn: () => DocumentIngress[];
}

export enum QuickPulseOpenTelemetryMetricNames {
  COMMITTED_BYTES = "azureMonitor.memoryCommittedBytes",
  PROCESSOR_TIME = "azureMonitor.processorTotalProcessorTime",
  REQUEST_RATE = "azureMonitor.requestsSec",
  REQUEST_FAILURE_RATE = "azureMonitor.requestsFailedSec",
  REQUEST_DURATION = "azureMonitor.requestDuration",
  DEPENDENCY_RATE = "azureMonitor.dependencyCallsSec",
  DEPENDENCY_FAILURE_RATE = "azureMonitor.dependencyCallsFailedSec",
  DEPENDENCY_DURATION = "azureMonitor.dependencyCallDuration",
  EXCEPTION_RATE = "azureMonitor.exceptionsSec",
}

export enum QuickPulseMetricNames {
  // Memory
  COMMITTED_BYTES = "\\Memory\\Committed Bytes",
  // CPU
  PROCESSOR_TIME = "\\Processor(_Total)\\% Processor Time",
  // Request
  REQUEST_RATE = "\\ApplicationInsights\\Requests/Sec",
  REQUEST_FAILURE_RATE = "\\ApplicationInsights\\Requests Failed/Sec",
  REQUEST_DURATION = "\\ApplicationInsights\\Request Duration",
  // Dependency
  DEPENDENCY_RATE = "\\ApplicationInsights\\Dependency Calls/Sec",
  DEPENDENCY_FAILURE_RATE = "\\ApplicationInsights\\Dependency Calls Failed/Sec",
  DEPENDENCY_DURATION = "\\ApplicationInsights\\Dependency Call Duration",
  // Exception
  EXCEPTION_RATE = "\\ApplicationInsights\\Exceptions/Sec",
}
