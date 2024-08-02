// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { KeyValuePairString, MonitoringDataPoint, PublishResponse } from "../../generated";
import {
  DocumentIngress,
  CollectionConfigurationError
} from "../../generated";

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

  postCallback: (response: PublishResponse | undefined) => void;

  getDocumentsFn: () => DocumentIngress[];

  getErrorsFn: () => CollectionConfigurationError[];
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

export interface RequestData {
  Url: string;
  Duration: number;
  ResponseCode: number;
  Success: boolean;
  Name: string;
  CustomDimensions: KeyValuePairString[];

}

export interface DependencyData {
  //  Target site of a dependency call. Examples are server name, host address.
  Target: string;
  Duration: number;
  Success: boolean;
  Name: string;
  ResultCode: number;
  // Dependency type name. Very low cardinality value for logical grouping of dependencies and interpretation of other fields like commandName and resultCode.Examples are SQL, Azure table, and HTTP. 
  Type: string;
  // Command initiated by this dependency call. Examples are SQL statement and HTTP URL with all query parameters.
  Data: string;
  CustomDimensions: KeyValuePairString[];
}

export interface ExceptionData {
  Message: string;
  StackTrace: string;
  CustomDimensions: KeyValuePairString[];
}

export interface TraceData {
  Message: string;
  CustomDimensions: KeyValuePairString[];
}
