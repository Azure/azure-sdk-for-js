// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { MonitoringDataPoint, PublishResponse } from "../../generated";
import type { DocumentIngress, CollectionConfigurationError } from "../../generated";
import {
  ATTR_CLIENT_ADDRESS,
  ATTR_CLIENT_PORT,
  ATTR_ERROR_TYPE,
  ATTR_HTTP_REQUEST_METHOD,
  ATTR_HTTP_RESPONSE_STATUS_CODE,
  ATTR_NETWORK_LOCAL_ADDRESS,
  ATTR_NETWORK_LOCAL_PORT,
  ATTR_NETWORK_PEER_ADDRESS,
  ATTR_NETWORK_PEER_PORT,
  ATTR_NETWORK_PROTOCOL_NAME,
  ATTR_NETWORK_PROTOCOL_VERSION,
  ATTR_NETWORK_TRANSPORT,
  ATTR_SERVER_ADDRESS,
  ATTR_SERVER_PORT,
  ATTR_URL_FULL,
  ATTR_URL_PATH,
  ATTR_URL_QUERY,
  ATTR_URL_SCHEME,
  ATTR_USER_AGENT_ORIGINAL,
  SEMATTRS_DB_NAME,
  SEMATTRS_DB_OPERATION,
  SEMATTRS_DB_STATEMENT,
  SEMATTRS_DB_SYSTEM,
  SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_STACKTRACE,
  SEMATTRS_EXCEPTION_TYPE,
  SEMATTRS_HTTP_HOST,
  SEMATTRS_HTTP_METHOD,
  SEMATTRS_HTTP_ROUTE,
  SEMATTRS_HTTP_STATUS_CODE,
  SEMATTRS_HTTP_URL,
  SEMATTRS_NET_PEER_IP,
  SEMATTRS_NET_PEER_NAME,
  SEMATTRS_PEER_SERVICE,
  SEMATTRS_RPC_GRPC_STATUS_CODE,
  SEMATTRS_RPC_SYSTEM,
} from "@opentelemetry/semantic-conventions";

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

  getErrorsFn: () => CollectionConfigurationError[];

  getDerivedMetricValuesFn: () => Map<string, number>;
}

export enum QuickPulseOpenTelemetryMetricNames {
  PHYSICAL_BYTES = "azureMonitor.physicalBytes",
  PROCESSOR_TIME_NORMALIZED = "azureMonitor.percentProcessorTimeNormalized",
  REQUEST_RATE = "azureMonitor.requestsSec",
  REQUEST_FAILURE_RATE = "azureMonitor.requestsFailedSec",
  REQUEST_DURATION = "azureMonitor.requestDuration",
  DEPENDENCY_RATE = "azureMonitor.dependencyCallsSec",
  DEPENDENCY_FAILURE_RATE = "azureMonitor.dependencyCallsFailedSec",
  DEPENDENCY_DURATION = "azureMonitor.dependencyCallDuration",
  EXCEPTION_RATE = "azureMonitor.exceptionsSec",
}

export enum QuickPulseMetricNames {
  // Memory (old)
  COMMITTED_BYTES = "\\Memory\\Committed Bytes",
  // Memory (new - current process)
  PHYSICAL_BYTES = "\\Process\\Physical Bytes",
  // CPU (old)
  PROCESSOR_TIME = "\\Processor(_Total)\\% Processor Time",
  // CPU (new - current process)
  PROCESSOR_TIME_NORMALIZED = "\\% Process\\Processor Time Normalized",
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
export interface TelemetryData {
  CustomDimensions: Map<string, string>;
}
export interface RequestData extends TelemetryData {
  Url: string;
  Duration: number;
  ResponseCode: number;
  Success: boolean;
  Name: string;
}

export interface DependencyData extends TelemetryData {
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
}

export interface ExceptionData extends TelemetryData {
  Message: string;
  StackTrace: string;
}

export interface TraceData extends TelemetryData {
  Message: string;
}

// copied from exporter constants & added a few more
export enum DependencyTypes {
  InProc = "InProc",
  QueueMessage = "Queue Message",
  Sql = "SQL",
  Http = "Http",
  Grpc = "GRPC",
  Wcf = "WCF Service",
  mysql = "mysql",
  postgresql = "postgresql",
  mongodb = "mongodb",
  redis = "redis",
}

export enum KnownRequestColumns {
  Url = "Url",
  Duration = "Duration",
  ResponseCode = "ResponseCode",
  Success = "Success",
  Name = "Name",
}

export enum KnownDependencyColumns {
  Target = "Target",
  Duration = "Duration",
  Success = "Success",
  Name = "Name",
  ResultCode = "ResultCode",
  Type = "Type",
  Data = "Data",
}

/**
 * Legacy HTTP semantic convention values
 * @internal
 */
export const legacySemanticValues = [
  SEMATTRS_NET_PEER_IP,
  SEMATTRS_NET_PEER_NAME,
  SEMATTRS_PEER_SERVICE,
  SEMATTRS_HTTP_METHOD,
  SEMATTRS_HTTP_URL,
  SEMATTRS_HTTP_STATUS_CODE,
  SEMATTRS_HTTP_ROUTE,
  SEMATTRS_HTTP_HOST,
  SEMATTRS_DB_SYSTEM,
  SEMATTRS_DB_STATEMENT,
  SEMATTRS_DB_OPERATION,
  SEMATTRS_DB_NAME,
  SEMATTRS_RPC_SYSTEM,
  SEMATTRS_RPC_GRPC_STATUS_CODE,
  SEMATTRS_EXCEPTION_TYPE,
  SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_STACKTRACE,
];

/**
 * HTTP semantic convention values
 * @internal
 */
export const httpSemanticValues = [
  ATTR_CLIENT_ADDRESS,
  ATTR_CLIENT_PORT,
  ATTR_SERVER_ADDRESS,
  ATTR_SERVER_PORT,
  ATTR_URL_FULL,
  ATTR_URL_PATH,
  ATTR_URL_QUERY,
  ATTR_URL_SCHEME,
  ATTR_URL_PATH,
  ATTR_ERROR_TYPE,
  ATTR_NETWORK_LOCAL_ADDRESS,
  ATTR_NETWORK_LOCAL_PORT,
  ATTR_NETWORK_PROTOCOL_NAME,
  ATTR_NETWORK_PEER_ADDRESS,
  ATTR_NETWORK_PEER_PORT,
  ATTR_NETWORK_PROTOCOL_VERSION,
  ATTR_NETWORK_TRANSPORT,
  ATTR_USER_AGENT_ORIGINAL,
  ATTR_HTTP_REQUEST_METHOD,
  ATTR_HTTP_RESPONSE_STATUS_CODE,
];
