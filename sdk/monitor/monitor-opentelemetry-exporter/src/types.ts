// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ATTR_CLIENT_ADDRESS,
  ATTR_CLIENT_PORT,
  ATTR_ERROR_TYPE,
  ATTR_EXCEPTION_MESSAGE,
  ATTR_EXCEPTION_STACKTRACE,
  ATTR_EXCEPTION_TYPE,
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
  SEMATTRS_ENDUSER_ID,
  SEMATTRS_EXCEPTION_MESSAGE,
  SEMATTRS_EXCEPTION_STACKTRACE,
  SEMATTRS_EXCEPTION_TYPE,
  SEMATTRS_HTTP_CLIENT_IP,
  SEMATTRS_HTTP_FLAVOR,
  SEMATTRS_HTTP_HOST,
  SEMATTRS_HTTP_METHOD,
  SEMATTRS_HTTP_ROUTE,
  SEMATTRS_HTTP_SCHEME,
  SEMATTRS_HTTP_STATUS_CODE,
  SEMATTRS_HTTP_TARGET,
  SEMATTRS_HTTP_URL,
  SEMATTRS_HTTP_USER_AGENT,
  SEMATTRS_NET_HOST_IP,
  SEMATTRS_NET_HOST_NAME,
  SEMATTRS_NET_HOST_PORT,
  SEMATTRS_NET_PEER_IP,
  SEMATTRS_NET_PEER_NAME,
  SEMATTRS_NET_PEER_PORT,
  SEMATTRS_NET_TRANSPORT,
  SEMATTRS_PEER_SERVICE,
  SEMATTRS_RPC_GRPC_STATUS_CODE,
  SEMATTRS_RPC_SYSTEM,
} from "@opentelemetry/semantic-conventions";
import type { ContextTagKeys } from "./generated/index.js";

/**
 * Azure Monitor envelope tags.
 * @internal
 */
export type Tags = { [key in ContextTagKeys]: string };
/**
 * Azure Monitor envelope property type.
 * @internal
 */
export type PropertyType = string | number | boolean | object | Array<PropertyType>;
/**
 * Azure Monitor envelope properties.
 * @internal
 */
export type Properties = { [key: string]: Properties | PropertyType };
/**
 * Azure Monitor envelope links.
 * @internal
 */
export interface MSLink {
  operation_Id: string;
  id: string;
}
/**
 * Azure Monitor envelope measurements.
 * @internal
 */
export type Measurements = { [key: string]: number };
/**
 * Exporter sender result.
 * @internal
 */
export type SenderResult = { statusCode: number | undefined; result: string };

/**
 * Exporter persistent storage.
 * @internal
 */
export interface PersistentStorage {
  shift(): Promise<unknown>;
  push(value: unknown[]): Promise<boolean>;
}

/**
 * Performance Counter OpenTelemetry compliant names.
 * @internal
 */
export enum OTelPerformanceCounterNames {
  PRIVATE_BYTES = "Private_Bytes",
  AVAILABLE_BYTES = "Available_Bytes",
  PROCESSOR_TIME = "Processor_Time",
  PROCESS_TIME_STANDARD = "Process_Time_Standard",
  REQUEST_RATE = "Request_Rate",
  REQUEST_DURATION = "Request_Execution_Time",
  PROCESS_TIME_NORMALIZED = "Process_Time_Normalized",
  EXCEPTION_RATE = "Exception_Rate",
}

/**
 * Breeze Performance Counter names.
 * @internal
 */
export enum BreezePerformanceCounterNames {
  PRIVATE_BYTES = "\\Process(??APP_WIN32_PROC??)\\Private Bytes",
  AVAILABLE_BYTES = "\\Memory\\Available Bytes",
  PROCESSOR_TIME = "\\Processor(_Total)\\% Processor Time",
  PROCESS_TIME_STANDARD = "\\Process(??APP_WIN32_PROC??)\\% Processor Time",
  REQUEST_RATE = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Requests/Sec",
  REQUEST_DURATION = "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Request Execution Time",
  PROCESS_TIME_NORMALIZED = "\\Process(??APP_WIN32_PROC??)\\% Processor Time Normalized",
  EXCEPTION_RATE = "\\.NET CLR Exceptions(??APP_CLR_PROC??)\\# of Exceps Thrown / sec",
}

/**
 * Property Max Lengths
 * @internal
 */
export enum MaxPropertyLengths {
  NINE_BIT = 512,
  TEN_BIT = 1024,
  THIRTEEN_BIT = 8192,
  FIFTEEN_BIT = 32768,
}

/**
 * Legacy HTTP semantic convention values
 * @internal
 */
export const legacySemanticValues = [
  SEMATTRS_NET_PEER_IP,
  SEMATTRS_NET_PEER_NAME,
  SEMATTRS_NET_HOST_IP,
  SEMATTRS_PEER_SERVICE,
  SEMATTRS_HTTP_USER_AGENT,
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
  SEMATTRS_HTTP_SCHEME,
  SEMATTRS_HTTP_TARGET,
  SEMATTRS_HTTP_FLAVOR,
  SEMATTRS_NET_TRANSPORT,
  SEMATTRS_NET_HOST_NAME,
  SEMATTRS_NET_HOST_PORT,
  SEMATTRS_NET_PEER_PORT,
  SEMATTRS_HTTP_CLIENT_IP,
  SEMATTRS_ENDUSER_ID,
  "http.status_text",
];

/**
 * Experimental OpenTelemetry semantic convention values
 * @internal
 */
export enum experimentalOpenTelemetryValues {
  SYNTHETIC_TYPE = "user_agent.synthetic.type",
  ATTR_ENDUSER_PSEUDO_ID = "enduser.pseudo.id",
  ATTR_ENDUSER_ID = "enduser.id",
}

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
  ATTR_EXCEPTION_TYPE,
  ATTR_EXCEPTION_MESSAGE,
  ATTR_EXCEPTION_STACKTRACE,
  experimentalOpenTelemetryValues.ATTR_ENDUSER_ID,
  experimentalOpenTelemetryValues.ATTR_ENDUSER_PSEUDO_ID,
  experimentalOpenTelemetryValues.SYNTHETIC_TYPE,
];

/**
 * Internal Microsoft attributes
 * @internal
 */
export const internalMicrosoftAttributes = ["_MS.ProcessedByMetricExtractors"];
