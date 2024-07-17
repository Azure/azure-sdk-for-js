// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatEnvironmentConfig,
  StatsbeatFeature,
  StatsbeatInstrumentation,
  StatsbeatOptions,
} from "../types";
import { Logger as InternalLogger } from "../shared/logging";

let instance: StatsbeatConfiguration;

class StatsbeatConfiguration {
  // Initial Statsbeat options
  private initializedByShim = false;
  private currentStatsbeatOptions: StatsbeatOptions = {};

  constructor() {
    // Check for shim initialization upon construction
    try {
      if (
        JSON.parse(process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || "{}").feature &
        StatsbeatFeature.SHIM
      ) {
        this.initializedByShim = true;
      }
    } catch (error) {
      InternalLogger.getInstance().error(
        "Failed to parse statsbeat config environment variable.",
        error,
      );
    }
  }

  public setStatsbeatFeatures = (
    statsbeatOptions: StatsbeatOptions
  ) => {
    let statsbeatEnv: StatsbeatEnvironmentConfig;
    try {
      statsbeatEnv = JSON.parse(process.env[AZURE_MONITOR_STATSBEAT_FEATURES] || "{}");
    } catch (error) {
      InternalLogger.getInstance().error(
        "Failed to parse statsbeat config environment variable.",
        error,
      );
    }

    // Set the statsbeat options for community instrumentations based on the environment variable
    statsbeatOptions = {
      ...statsbeatOptions,
      /** OpenTelemetry Instrumentations */
      amqplib: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.AMQPLIB ? true : false,
      cucumber: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.CUCUMBER ? true : false,
      dataloader:
        statsbeatEnv!.instrumentation & StatsbeatInstrumentation.DATALOADER ? true : false,
      fs: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.FS ? true : false,
      lruMemoizer:
        statsbeatEnv!.instrumentation & StatsbeatInstrumentation.LRU_MEMOIZER ? true : false,
      mongoose: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.MONGOOSE ? true : false,
      runtimeNode:
        statsbeatEnv!.instrumentation & StatsbeatInstrumentation.RUNTIME_NODE ? true : false,
      socketIo: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.SOCKET_IO ? true : false,
      tedious: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.TEDIOUS ? true : false,
      undici: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.UNDICI ? true : false,
      cassandra: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.CASSANDRA ? true : false,
      connect: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.CONNECT ? true : false,
      dns: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.DNS ? true : false,
      express: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.EXPRESS ? true : false,
      fastify: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.FASTIFY ? true : false,
      genericPool:
        statsbeatEnv!.instrumentation & StatsbeatInstrumentation.GENERIC_POOL ? true : false,
      graphql: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.GRAPHQL ? true : false,
      hapi: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.HAPI ? true : false,
      ioredis: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.IOREDIS ? true : false,
      knex: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.KNEX ? true : false,
      koa: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.KOA ? true : false,
      memcached: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.MEMCACHED ? true : false,
      mysql2: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.MYSQL2 ? true : false,
      nestjsCore:
        statsbeatEnv!.instrumentation & StatsbeatInstrumentation.NESTJS_CORE ? true : false,
      net: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.NET ? true : false,
      pino: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.PINO ? true : false,
      restify: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.RESTIFY ? true : false,
      router: statsbeatEnv!.instrumentation & StatsbeatInstrumentation.ROUTER ? true : false,
    };

    let instrumentationBitMap = StatsbeatInstrumentation.NONE;

    // Create instrumentation bit map
    if (statsbeatOptions.azureSdk === true) {
      instrumentationBitMap |= StatsbeatInstrumentation.AZURE_CORE_TRACING;
    }
    if (statsbeatOptions.mongoDb === true) {
      instrumentationBitMap |= StatsbeatInstrumentation.MONGODB;
    }
    if (statsbeatOptions.mySql === true) {
      instrumentationBitMap |= StatsbeatInstrumentation.MYSQL;
    }
    if (statsbeatOptions.postgreSql === true) {
      instrumentationBitMap |= StatsbeatInstrumentation.POSTGRES;
    }
    if (statsbeatOptions.redis === true) {
      instrumentationBitMap |= StatsbeatInstrumentation.REDIS;
    }
    if (statsbeatOptions.bunyan === true) {
      instrumentationBitMap |= StatsbeatInstrumentation.BUNYAN;
    }
    if (statsbeatOptions.winston === true) {
      instrumentationBitMap |= StatsbeatInstrumentation.WINSTON;
    }
    if (statsbeatOptions.express === true) {
      instrumentationBitMap |= StatsbeatInstrumentation.EXPRESS;
    }

    // Create feature bit map
    let featureBitMap = StatsbeatFeature.NONE;
    featureBitMap |= StatsbeatFeature.DISTRO;

    if (statsbeatOptions.browserSdkLoader === true) {
      featureBitMap |= StatsbeatFeature.BROWSER_SDK_LOADER;
    }
    // Determines if the customer has activated the Live Metrics feature
    if (statsbeatOptions.liveMetrics === true) {
      featureBitMap |= StatsbeatFeature.LIVE_METRICS;
    }

    if (this.initializedByShim) {
      featureBitMap |= StatsbeatFeature.SHIM;
    }

    // Merge old statsbeat options with new statsbeat options overriding any common properties
    try {
      const currentFeaturesBitMap = Number(process.env[AZURE_MONITOR_STATSBEAT_FEATURES]);
      if (!isNaN(currentFeaturesBitMap)) {
        featureBitMap |= currentFeaturesBitMap;
      }
      process.env[AZURE_MONITOR_STATSBEAT_FEATURES] = JSON.stringify({
        instrumentation: instrumentationBitMap,
        feature: featureBitMap,
      });
    } catch (error) {
      InternalLogger.getInstance().error("Failed call to JSON.stringify.", error);
    }
  };
}

/**
 * Singleton Statsbeat instance.
 * @internal
 */
export function getInstance(): StatsbeatConfiguration {
  if (!instance) {
    instance = new StatsbeatConfiguration();
  }
  return instance;
}
