// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ENV_DISABLE_SDKSTATS,
  LEGACY_ENV_DISABLE_STATSBEAT,
  ONE_SETTINGS_FEATURE_CUSTOMER_SDK_STATS,
} from "../../Declarations/Constants.js";
import { ConfigurationManager } from "../../_configuration/configurationManager.js";
import type { ConfigurationChangeCallback } from "../../_configuration/configurationManager.js";
import { evaluateFeature } from "../../_configuration/featureEvaluation.js";
import { CustomerSDKStatsMetrics } from "./customerSDKStats.js";
import type { StatsbeatOptions } from "./types.js";

/**
 * Coordinates process-wide customer SDK Stats independently of internal Statsbeat.
 * Missing or invalid remote settings preserve the last state, which defaults to enabled.
 * @internal
 */
export class CustomerSDKStatsManager {
  private static instance: CustomerSDKStatsManager | undefined;
  private options: StatsbeatOptions | undefined;
  private metrics: CustomerSDKStatsMetrics | undefined;
  private transition: Promise<void> = Promise.resolve();
  private stopping = false;
  private shouldBeRunning = false;
  private oneSettingsEnabled = true;
  private configurationCallbackRegistered = false;
  private readonly configurationCallback: ConfigurationChangeCallback = (settings) => {
    if (!Object.hasOwn(settings, ONE_SETTINGS_FEATURE_CUSTOMER_SDK_STATS)) {
      return;
    }
    const enabled = evaluateFeature(ONE_SETTINGS_FEATURE_CUSTOMER_SDK_STATS, settings);
    if (typeof enabled !== "boolean") {
      return;
    }
    this.oneSettingsEnabled = enabled;
    this.shouldBeRunning = this.canStart();
    return this.update();
  };

  private constructor() {}

  public static getInstance(): CustomerSDKStatsManager {
    if (!CustomerSDKStatsManager.instance) {
      CustomerSDKStatsManager.instance = new CustomerSDKStatsManager();
    }
    return CustomerSDKStatsManager.instance;
  }

  public initialize(options: StatsbeatOptions): Promise<void> {
    this.options ??= { ...options };
    if (!this.configurationCallbackRegistered) {
      this.configurationCallbackRegistered = true;
      ConfigurationManager.getInstance().registerCallback(this.configurationCallback);
    }
    this.shouldBeRunning = this.canStart();
    return this.update();
  }

  public shutdown(): Promise<void> {
    this.shouldBeRunning = false;
    return this.update();
  }

  public get customerSDKStatsMetrics(): CustomerSDKStatsMetrics | undefined {
    return this.shouldBeRunning && !this.stopping ? this.metrics : undefined;
  }

  private canStart(): boolean {
    return (
      !!this.options &&
      this.oneSettingsEnabled &&
      !process.env[ENV_DISABLE_SDKSTATS] &&
      !process.env[LEGACY_ENV_DISABLE_STATSBEAT]
    );
  }

  private update(): Promise<void> {
    // Serialize async creation and shutdown. A later request may retry a failed transition.
    this.transition = this.transition.then(
      () => this.applyState(),
      () => this.applyState(),
    );
    return this.transition;
  }

  private async applyState(): Promise<void> {
    if (!this.shouldBeRunning || this.stopping) {
      await this.stop();
    }
    if (this.shouldBeRunning && !this.metrics && this.options) {
      this.metrics = await CustomerSDKStatsMetrics.getInstance(this.options);
      if (!this.shouldBeRunning) {
        await this.stop();
      }
    }
  }

  private async stop(): Promise<void> {
    if (!this.metrics) {
      return;
    }
    this.stopping = true;
    await this.metrics.shutdown();
    this.metrics = undefined;
    this.stopping = false;
  }
}
