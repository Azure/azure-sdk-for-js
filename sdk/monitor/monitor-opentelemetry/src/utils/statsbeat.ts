// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatFeature,
  StatsbeatInstrumentation,
  StatsbeatOptions,
} from "../types";
import { Logger as InternalLogger } from "../shared/logging";

let instance: StatsbeatConfiguration;

class StatsbeatConfiguration {
  // Initial Statsbeat options
  private currentStatsbeatOptions: StatsbeatOptions = {};

  public setStatsbeatFeatures = (statsbeatOptions: StatsbeatOptions) => {
    // Merge old statsbeat options with new statsbeat options overriding any common properties
    this.currentStatsbeatOptions = { ...this.currentStatsbeatOptions, ...statsbeatOptions };

    let instrumentationBitMap = StatsbeatInstrumentation.NONE;
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

    let featureBitMap = StatsbeatFeature.NONE;
    featureBitMap |= StatsbeatFeature.DISTRO;

    if (statsbeatOptions.browserSdkLoader === true) {
      featureBitMap |= StatsbeatFeature.BROWSER_SDK_LOADER;
    }
    // Determines if the customer has activated the Live Metrics feature
    if (statsbeatOptions.liveMetrics === true) {
      featureBitMap |= StatsbeatFeature.LIVE_METRICS;
    }

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
