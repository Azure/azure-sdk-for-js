// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import { InstrumentationConfig } from "@opentelemetry/instrumentation";
import { Resource } from "@opentelemetry/resources";
import { LogRecordProcessor } from "@opentelemetry/sdk-logs";
import { SpanProcessor } from "@opentelemetry/sdk-trace-base";

/**
 * Azure Monitor OpenTelemetry Options
 */
export interface AzureMonitorOpenTelemetryOptions {
  /** Azure Monitor Exporter Configuration */
  azureMonitorExporterOptions?: AzureMonitorExporterOptions;
  /** OpenTelemetry Resource */
  resource?: Resource;
  /** The rate of telemetry items tracked that should be transmitted (Default 1.0) */
  samplingRatio?: number;
  /** Enable Live Metrics feature (Default false)*/
  enableLiveMetrics?: boolean;
  /** Enable Standard Metrics feature (Default true)*/
  enableStandardMetrics?: boolean;
  /** Enable log sampling based on trace (Default true) */
  enableTraceBasedSamplingForLogs?: boolean;
  /** OpenTelemetry Instrumentations options included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4) */
  instrumentationOptions?: InstrumentationOptions;
  /** Application Insights Web Instrumentation options (enabled, connectionString, src, config)*/
  browserSdkLoaderOptions?: BrowserSdkLoaderOptions;
  /** An array of log record processors to register to the logger provider.*/
  logRecordProcessors?: LogRecordProcessor[];
  /** An array of span processors to register to the tracer provider.*/
  spanProcessors?: SpanProcessor[];
}

/**
 * OpenTelemetry Instrumentations Configuration interface
 */
export interface InstrumentationOptions {
  /** Azure SDK Instrumentation Config */
  azureSdk?: InstrumentationConfig;
  /** HTTP Instrumentation Config */
  http?: InstrumentationConfig;
  /** MongoDB Instrumentation Config */
  mongoDb?: InstrumentationConfig;
  /** MySQL Instrumentation Config */
  mySql?: InstrumentationConfig;
  /** PostgreSql Instrumentation Config */
  postgreSql?: InstrumentationConfig;
  /** Redis Instrumentation Config */
  redis?: InstrumentationConfig;
  /** Redis4 Instrumentation Config */
  redis4?: InstrumentationConfig;
  /** Bunyan Instrumentation Config */
  bunyan?: InstrumentationConfig;
  /** Winston Instrumentation Config */
  winston?: InstrumentationConfig;
}

/**
 * Statsbeat Instrumentation Options interface.
 * Order of the options is important as it is used to calculate the bit map.
 * @internal
 */
export interface StatsbeatInstrumentations {
  /** Azure Monitor Supported Instrumentations */
  azureSdk?: boolean;
  mongoDb?: boolean;
  mySql?: boolean;
  postgreSql?: boolean;
  redis?: boolean;
  bunyan?: boolean;
  winston?: boolean;
  /** OpenTelemetry Instrumenatations */
  amqplib?: boolean;
  cucumber?: boolean;
  dataloader?: boolean;
  fs?: boolean;
  lruMemoizer?: boolean;
  mongoose?: boolean;
  runtimeNode?: boolean;
  socketIo?: boolean;
  tedious?: boolean;
  undici?: boolean;
  cassandra?: boolean;
  connect?: boolean;
  dns?: boolean;
  express?: boolean;
  fastify?: boolean;
  genericPool?: boolean;
  graphql?: boolean;
  hapi?: boolean;
  ioredis?: boolean;
  knex?: boolean;
  koa?: boolean;
  memcahed?: boolean;
  mysql2?: boolean;
  nestjsCore?: boolean;
  net?: boolean;
  pino?: boolean;
  restify?: boolean;
  router?: boolean;
}

/**
 * Statsbeat Feature Options interface.
 * Order of the options is important as it is used to calculate the bit map.
 * @internal
 */
export interface StatsbeatFeatures {
  diskRetry?: boolean;
  aadHandling?: boolean;
  browserSdkLoader?: boolean;
  distro?: boolean;
  liveMetrics?: boolean;
}

/**
 * Statsbeat Instrumentation and Feature Option interface
 */
export interface StatsbeatOption {
  option: string;
  value: boolean;
}

/**
 * Application Insights Web Instrumentation Configuration interface
 */
export interface BrowserSdkLoaderOptions {
  /** Browser SDK Loader Enable */
  enabled?: boolean;
  /** Browser SDK Loader Connection String */
  connectionString?: string;
}

export const AZURE_MONITOR_OPENTELEMETRY_VERSION = "1.4.0";
export const AZURE_MONITOR_STATSBEAT_FEATURES = "AZURE_MONITOR_STATSBEAT_FEATURES";
export const AZURE_MONITOR_PREFIX = "AZURE_MONITOR_PREFIX";
export const AZURE_MONITOR_AUTO_ATTACH = "AZURE_MONITOR_AUTO_ATTACH";

export enum AttachTypePrefix {
  INTEGRATED_AUTO = "i",
  MANUAL = "m",
}

/**
 * Default Browser SDK Loader Source
 * @internal
 */
export const BROWSER_SDK_LOADER_DEFAULT_SOURCE = "https://js.monitor.azure.com/scripts/b/ai";

/**
 * Default Breeze endpoint.
 * @internal
 */
export const DEFAULT_BREEZE_ENDPOINT = "https://dc.services.visualstudio.com";
/**
 * Default Live Metrics endpoint.
 * @internal
 */
export const DEFAULT_LIVEMETRICS_ENDPOINT = "https://global.livediagnostics.monitor.azure.com";

export enum StatsbeatFeature {
  NONE = 0,
  DISK_RETRY = 1,
  AAD_HANDLING = 2,
  BROWSER_SDK_LOADER = 4,
  DISTRO = 8,
  LIVE_METRICS = 16,
}

export enum StatsbeatInstrumentation {
  /** Azure Monitor Supported Instrumentations */
  NONE = 0,
  AZURE_CORE_TRACING = 1,
  MONGODB = 2,
  MYSQL = 4,
  REDIS = 8,
  POSTGRES = 16,
  BUNYAN = 32,
  WINSTON = 64,
  /** OpenTelemetry Supported Instrumentations */
  AMQPLIB = 128,
  CUCUMBER = 256,
  DATALOADER = 512,
  FS = 1024,
  LRU_MEMOIZER = 2048,
  MONGOOSE = 4096,
  RUNTIME_NODE = 8192,
  SOCKET_IO = 16384,
  TEDIOUS = 32768,
  UNDICI = 65536,
  CASSANDRA = 131072,
  CONNECT = 262144,
  DNS = 524288,
  EXPRESS = 1048576,
  FASTIFY = 2097152,
  GENERIC_POOL = 4194304,
  GRAPHQL = 8388608,
  HAPI = 16777216,
  IOREDIS = 33554432,
  KNEX = 67108864,
  KOA = 134217728,
  MEMCAHED = 268435456,
  MYSQL2 = 536870912,
  NESTJS_CORE = 1073741824,
  NET = 2147483648,
  PINO = 4294967296,
  RESTIFY = 8589934592,
  ROUTER = 17179869184,
}
