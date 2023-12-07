// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { MonitoringDataPoint, PostResponse } from "../../generated";
import { DocumentIngress } from "../../generated";

/**
 * Quickpulse Exporter Options
 */
export interface QuickpulseExporterOptions {
  endpointUrl: string;

  instrumentationKey: string;

  aadAudience?: string;
  /**
   * Token Credential
   */
  credential?: TokenCredential;

  baseMonitoringDataPoint: MonitoringDataPoint;

  postCallback: (response: PostResponse | undefined) => void;

  getDocumentsFn: () => DocumentIngress[];
}

export enum QuickPulseMetricNames {
  // Memory
  COMMITTED_BYTES = "\\Memory\\Committed_Bytes",
  // CPU
  PROCESSOR_TIME = "\\Processor(_Total)\\%_Processor_Time",
  // Request
  REQUEST_RATE = "\\ApplicationInsights\\Requests/Sec",
  REQUEST_FAILURE_RATE = "\\ApplicationInsights\\Requests_Failed/Sec",
  REQUEST_DURATION = "\\ApplicationInsights\\Request_Duration",
  // Dependency
  DEPENDENCY_RATE = "\\ApplicationInsights\\Dependency_Calls/Sec",
  DEPENDENCY_FAILURE_RATE = "\\ApplicationInsights\\Dependency_Calls_Failed/Sec",
  DEPENDENCY_DURATION = "\\ApplicationInsights\\Dependency_Call_Duration",
  // Exception
  EXCEPTION_RATE = "\\ApplicationInsights\\Exceptions/Sec",
}
