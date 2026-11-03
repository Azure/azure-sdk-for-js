// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfigurationManager } from "./configurationManager.js";
import { evaluateFeature } from "./featureEvaluation.js";

/**
 * Subscribe to a boolean feature using the exporter's existing OneSettings worker.
 * Cached settings are replayed immediately. Missing, invalid, and non-boolean values
 * do not notify the subscriber, preserving its current state.
 * @param featureKey - OneSettings feature key.
 * @param callback - Callback receiving the evaluated feature state.
 * @returns A function that unregisters the subscription.
 * @internal
 */
export function _registerFeatureCallback(
  featureKey: string,
  callback: (enabled: boolean) => void | Promise<void>,
): () => void {
  let active = true;
  const unregister = ConfigurationManager.getInstance().registerCallback((settings) => {
    if (!active) {
      return;
    }
    const enabled = evaluateFeature(featureKey, settings);
    if (typeof enabled === "boolean") {
      return callback(enabled);
    }
    return;
  });
  return () => {
    active = false;
    unregister();
  };
}
