// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AZURE_MONITOR_STATSBEAT_FEATURES,
  StatsbeatFeature,
  StatsbeatFeatures,
  StatsbeatInstrumentation,
  StatsbeatInstrumentations,
  StatsbeatOption,
} from "../types";
import { Logger as InternalLogger } from "../shared/logging";

let instance: StatsbeatConfiguration;

class StatsbeatConfiguration {
  // Initial Statsbeat options
  private currentStatsbeatInstrumentations: StatsbeatInstrumentations = {};
  private currentStatsbeatFeatures: StatsbeatFeatures = {};

  public setStatsbeatFeatures = (statsbeatFeatures?: StatsbeatFeatures, statsbeatInstrumentations?: StatsbeatInstrumentations) => {
    // Merge old statsbeat options with new statsbeat options overriding any common properties
    this.currentStatsbeatInstrumentations = { ...this.currentStatsbeatInstrumentations, ...statsbeatInstrumentations };
    this.currentStatsbeatFeatures = { ...this.currentStatsbeatFeatures, ...statsbeatFeatures };
    let instrumentationBitMap = StatsbeatInstrumentation.NONE;
    let featureBitMap = StatsbeatFeature.NONE;
    
    const instrumentationArray: Array<StatsbeatOption> = Object.entries(this.currentStatsbeatInstrumentations).map(entry => {
      return { option: entry[0], value: entry[1] }
    });

    // Map the instrumentation options to a bit map
    for (let i = 0; i < instrumentationArray.length; i++) {
      if (instrumentationArray[i].value) {
        instrumentationBitMap |= 2 ** i;
      }
    }

    const featureArray: Array<StatsbeatOption> = Object.entries(this.currentStatsbeatFeatures).map(entry => {
      return { option: entry[0], value: entry[1] }
    });

    // Map the feature options to a bit map
    for (let i = 0; i < featureArray.length; i++) {
      if (featureArray[i].value) {
        featureBitMap |= 2 ** i;
      }
    }

    try {
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
