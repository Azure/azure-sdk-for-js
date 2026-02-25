// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { AzureMonitorExporterOptions } from "@azure/monitor-opentelemetry-exporter";
import type { InstrumentationConfig } from "@opentelemetry/instrumentation";
import type { Resource } from "@opentelemetry/resources";
import type { LogRecordProcessor } from "@opentelemetry/sdk-logs";
import type { MetricReader, ViewOptions } from "@opentelemetry/sdk-metrics";
import type { SpanProcessor } from "@opentelemetry/sdk-trace-base";

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
  /** The maximum number of traces to sample per second (Default 5). Set to 0 to use samplingRatio instead. */
  tracesPerSecond?: number;
  /** Enable Live Metrics feature (Default false)*/
  enableLiveMetrics?: boolean;
  /** Enable Standard Metrics feature (Default true)*/
  enableStandardMetrics?: boolean;
  /** Enable log sampling based on trace (Default true) */
  enableTraceBasedSamplingForLogs?: boolean;
  /** Enable Performance Counter feature */
  enablePerformanceCounters?: boolean;
  /** OpenTelemetry Instrumentations options included as part of Azure Monitor (azureSdk, http, mongoDb, mySql, postgreSql, redis, redis4) */
  instrumentationOptions?: InstrumentationOptions;
  /** Application Insights Web Instrumentation options (enabled, connectionString, src, config)*/
  browserSdkLoaderOptions?: BrowserSdkLoaderOptions;
  /** An array of log record processors to register to the logger provider.*/
  logRecordProcessors?: LogRecordProcessor[];
  /** An array of span processors to register to the tracer provider.*/
  spanProcessors?: SpanProcessor[];
  /** An array of metric readers to register to the meter provider.*/
  metricReaders?: MetricReader[];
  /** An array of metric views to register to the meter provider.*/
  views?: ViewOptions[];
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
 * Statsbeat Features Configuration interface
 * @internal
 */
export interface StatsbeatFeatures {
  diskRetry?: boolean;
  aadHandling?: boolean;
  browserSdkLoader?: boolean;
  distro?: boolean;
  liveMetrics?: boolean;
  shim?: boolean;
  customerSdkStats?: boolean;
  multiIkey?: boolean;
}

/**
 * Statsbeat Features Mapping
 * @internal
 */
export const StatsbeatFeaturesMap = new Map<string, number>([
  ["diskRetry", 1],
  ["aadHandling", 2],
  ["browserSdkLoader", 4],
  ["distro", 8],
  ["liveMetrics", 16],
  ["shim", 32],
  ["customerSdkStats", 64],
  ["multiIkey", 128],
]);

/**
 * Statsbeat Instrumentations Configuration interface
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
  /** OpenTelemetry Community Instrumentations */
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
  memcached?: boolean;
  mysql2?: boolean;
  nestjsCore?: boolean;
  net?: boolean;
  pino?: boolean;
  restify?: boolean;
  router?: boolean;
}

/**
 * Statsbeat Instrumentation and Feature Option interface
 * @internal
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

export const AZURE_MONITOR_OPENTELEMETRY_VERSION = "1.16.0";
export const AZURE_MONITOR_STATSBEAT_FEATURES = "AZURE_MONITOR_STATSBEAT_FEATURES";
export const AZURE_MONITOR_PREFIX = "AZURE_MONITOR_PREFIX";
export const AZURE_MONITOR_AUTO_ATTACH = "AZURE_MONITOR_AUTO_ATTACH";
export const APPLICATION_INSIGHTS_SHIM_VERSION = "APPLICATION_INSIGHTS_SHIM_VERSION";

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

/**
 * Internal attribute name for sample rate
 * @internal
 */
export const AzureMonitorSampleRate = "microsoft.sample_rate";

/**
 * Disables customer-facing SDK Stats.
 * @internal
 */
export const APPLICATIONINSIGHTS_SDKSTATS_DISABLED = "APPLICATIONINSIGHTS_SDKSTATS_DISABLED";

export enum StatsbeatFeature {
  NONE = 0,
  DISK_RETRY = 1,
  AAD_HANDLING = 2,
  BROWSER_SDK_LOADER = 4,
  DISTRO = 8,
  LIVE_METRICS = 16,
  SHIM = 32,
  CUSTOMER_SDKSTATS = 64,
  MULTI_IKEY = 128,
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
  // Console instrumentation is not supported here - occupies 128
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
  MEMCACHED = 268435456,
  MYSQL2 = 536870912,
  NESTJS_CORE = 1073741824,
  NET = 2147483648,
  PINO = 4294967296,
  RESTIFY = 8589934592,
  ROUTER = 17179869184,
  AMQPLIB = 34359738368,
}

/**
 * Statsbeat Instrumentation Mapping
 * @internal
 */
export const StatsbeatInstrumentationMap = new Map<string, number>([
  ["@opentelemetry/instrumentation-amqplib", StatsbeatInstrumentation.AMQPLIB],
  ["@opentelemetry/instrumentation-cucumber", StatsbeatInstrumentation.CUCUMBER],
  ["@opentelemetry/instrumentation-dataloader", StatsbeatInstrumentation.DATALOADER],
  ["@opentelemetry/instrumentation-fs", StatsbeatInstrumentation.FS],
  ["@opentelemetry/instrumentation-lru-memoizer", StatsbeatInstrumentation.LRU_MEMOIZER],
  ["@opentelemetry/instrumentation-mongoose", StatsbeatInstrumentation.MONGOOSE],
  ["@opentelemetry/instrumentation-runtime-node", StatsbeatInstrumentation.RUNTIME_NODE],
  ["@opentelemetry/instrumentation-socket.io", StatsbeatInstrumentation.SOCKET_IO],
  ["@opentelemetry/instrumentation-tedious", StatsbeatInstrumentation.TEDIOUS],
  ["@opentelemetry/instrumentation-undici", StatsbeatInstrumentation.UNDICI],
  ["@opentelemetry/instrumentation-cassandra-driver", StatsbeatInstrumentation.CASSANDRA],
  ["@opentelemetry/instrumentation-connect", StatsbeatInstrumentation.CONNECT],
  ["@opentelemetry/instrumentation-dns", StatsbeatInstrumentation.DNS],
  ["@opentelemetry/instrumentation-express", StatsbeatInstrumentation.EXPRESS],
  ["@opentelemetry/instrumentation-fastify", StatsbeatInstrumentation.FASTIFY],
  ["@opentelemetry/instrumentation-generic-pool", StatsbeatInstrumentation.GENERIC_POOL],
  ["@opentelemetry/instrumentation-graphql", StatsbeatInstrumentation.GRAPHQL],
  ["@opentelemetry/instrumentation-hapi", StatsbeatInstrumentation.HAPI],
  ["@opentelemetry/instrumentation-ioredis", StatsbeatInstrumentation.IOREDIS],
  ["@opentelemetry/instrumentation-knex", StatsbeatInstrumentation.KNEX],
  ["@opentelemetry/instrumentation-koa", StatsbeatInstrumentation.KOA],
  ["@opentelemetry/instrumentation-memcached", StatsbeatInstrumentation.MEMCACHED],
  ["@opentelemetry/instrumentation-mysql2", StatsbeatInstrumentation.MYSQL2],
  ["@opentelemetry/instrumentation-nestjs-core", StatsbeatInstrumentation.NESTJS_CORE],
  ["@opentelemetry/instrumentation-net", StatsbeatInstrumentation.NET],
  ["@opentelemetry/instrumentation-pino", StatsbeatInstrumentation.PINO],
  ["@opentelemetry/instrumentation-restify", StatsbeatInstrumentation.RESTIFY],
  ["@opentelemetry/instrumentation-router", StatsbeatInstrumentation.ROUTER],
]);

export interface StatsbeatEnvironmentConfig {
  instrumentation: StatsbeatInstrumentation;
  feature: StatsbeatFeature;
}
