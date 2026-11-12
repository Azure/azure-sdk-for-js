// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  StatsbeatEnvironmentConfig,
  StatsbeatFeatures,
  StatsbeatInstrumentations,
  StatsbeatOption,
} from "../types.js";
import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatFeature,
  StatsbeatFeaturesMap,
  StatsbeatInstrumentation,
  StatsbeatInstrumentationsMap,
} from "../types.js";
import { Logger as InternalLogger } from "../shared/logging/index.js";
import { addNumberFlag, hasNumberFlag, removeNumberFlag } from "./common.js";

let instance: StatsbeatConfiguration;

class StatsbeatConfiguration {
  // Initial Statsbeat options
  private initializedByShim = false;
  private currentStatsbeatInstrumentations: StatsbeatInstrumentations = {};
  private currentStatsbeatFeatures: StatsbeatFeatures = {};

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
    statsbeatInstrumentations: StatsbeatInstrumentations,
    statsbeatFeatures: StatsbeatFeatures,
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
    this.currentStatsbeatInstrumentations = {
      ...this.currentStatsbeatInstrumentations,
      ...statsbeatInstrumentations,
    };
    this.currentStatsbeatFeatures = { ...this.currentStatsbeatFeatures, ...statsbeatFeatures };

    // Set the statsbeat options for community instrumentations based on the environment variable
    const envInstrumentation = statsbeatEnv!.instrumentation;
    statsbeatInstrumentations = {
      ...this.currentStatsbeatInstrumentations,
      amqplib: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.AMQPLIB),
      cucumber: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.CUCUMBER),
      dataloader: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.DATALOADER),
      fs: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.FS),
      lruMemoizer: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.LRU_MEMOIZER),
      mongoose: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.MONGOOSE),
      runtimeNode: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.RUNTIME_NODE),
      socketIo: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.SOCKET_IO),
      tedious: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.TEDIOUS),
      undici: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.UNDICI),
      cassandra: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.CASSANDRA),
      connect: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.CONNECT),
      dns: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.DNS),
      express: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.EXPRESS),
      fastify: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.FASTIFY),
      genericPool: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.GENERIC_POOL),
      graphql: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.GRAPHQL),
      hapi: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.HAPI),
      ioredis: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.IOREDIS),
      knex: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.KNEX),
      koa: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.KOA),
      memcached: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.MEMCACHED),
      mysql2: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.MYSQL2),
      nestjsCore: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.NESTJS_CORE),
      net: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.NET),
      pino: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.PINO),
      restify: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.RESTIFY),
      router: hasNumberFlag(envInstrumentation, StatsbeatInstrumentation.ROUTER),
    };

    let instrumentationBitMap = StatsbeatInstrumentation.NONE;

    const instrumentationArray: Array<StatsbeatOption> = Object.entries(
      statsbeatInstrumentations,
    ).map((entry) => {
      return { option: entry[0], value: entry[1] };
    });

    // Map enabled option names to their assigned bits.
    for (let i = 0; i < instrumentationArray.length; i++) {
      if (instrumentationArray[i].value) {
        const instrumentationBit = StatsbeatInstrumentationsMap.get(instrumentationArray[i].option);
        if (instrumentationBit !== undefined) {
          instrumentationBitMap = addNumberFlag(instrumentationBitMap, instrumentationBit);
        }
      }
    }

    // Create feature bit map
    let featureBitMap = StatsbeatFeature.NONE;

    if (this.initializedByShim) {
      this.currentStatsbeatFeatures.shim = true;
    } else {
      this.currentStatsbeatFeatures.distro = true;
    }

    if (statsbeatFeatures.liveMetrics) {
      this.currentStatsbeatFeatures.liveMetrics = true;
    }

    const featureArray: Array<StatsbeatOption> = Object.entries(this.currentStatsbeatFeatures).map(
      (entry) => {
        return { option: entry[0], value: entry[1] };
      },
    );

    // Map the feature options to a bit map
    for (let i = 0; i < featureArray.length; i++) {
      if (featureArray[i].value) {
        featureBitMap |= StatsbeatFeaturesMap.get(featureArray[i].option)!;
      }
    }

    // Merge old statsbeat options with new statsbeat options overriding any common properties
    try {
      const currentFeaturesBitMap = Number(process.env[AZURE_MONITOR_STATSBEAT_FEATURES]);
      if (!isNaN(currentFeaturesBitMap)) {
        // The AKS resource detector feature always reflects whether *this* process was able to
        // read the AKS cluster metadata, so it is never inherited from a seeded bit map.
        featureBitMap |= removeNumberFlag(
          currentFeaturesBitMap,
          StatsbeatFeature.AKS_RESOURCE_DETECTOR_POPULATION,
        );
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
