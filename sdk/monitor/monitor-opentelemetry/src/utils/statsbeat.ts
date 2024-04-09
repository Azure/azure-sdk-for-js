// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalConfig } from "../shared";
import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatFeature,
  StatsbeatInstrumentation,
} from "../types";
import { Logger as InternalLogger } from "../shared/logging";

/**
 * Record Statsbeat Features and Instrumentations
 */
export const setStatsbeatFeatures = (config: InternalConfig, liveMetricsActivated?: boolean) => {
  let instrumentationBitMap = StatsbeatInstrumentation.NONE;
  if (config.instrumentationOptions?.azureSdk?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.AZURE_CORE_TRACING;
  }
  if (config.instrumentationOptions?.mongoDb?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.MONGODB;
  }
  if (config.instrumentationOptions?.mySql?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.MYSQL;
  }
  if (config.instrumentationOptions?.postgreSql?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.POSTGRES;
  }
  if (config.instrumentationOptions?.redis?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.REDIS;
  }
  if (config.instrumentationOptions?.bunyan?.enabled) {
    instrumentationBitMap |= StatsbeatInstrumentation.BUNYAN;
  }

  let featureBitMap = StatsbeatFeature.NONE;
  featureBitMap |= StatsbeatFeature.DISTRO;

  if (config.browserSdkLoaderOptions.enabled === true) {
    featureBitMap |= StatsbeatFeature.BROWSER_SDK_LOADER;
  }
  // Determines if the customer has activated the Live Metrics feature
  if (liveMetricsActivated === true) {
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
