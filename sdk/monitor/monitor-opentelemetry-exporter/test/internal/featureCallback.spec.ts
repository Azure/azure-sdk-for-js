// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { _registerFeatureCallback } from "../../src/_configuration/index.js";
import { ConfigurationManager } from "../../src/_configuration/configurationManager.js";
import { ConfigurationProfile } from "../../src/_configuration/configurationProfile.js";

describe("OneSettings feature subscriptions", () => {
  const manager = ConfigurationManager.getInstance();
  const featureKey = "FEATURE_LIVE_METRICS";
  const enabled = { [featureKey]: { default: "enabled" } };
  const disabled = { [featureKey]: { default: "disabled" } };

  beforeEach(() => {
    manager.reset();
    ConfigurationProfile.getInstance().reset();
  });

  afterEach(() => {
    manager.reset();
    ConfigurationProfile.getInstance().reset();
    vi.restoreAllMocks();
  });

  it("delivers boolean changes without starting another polling worker", () => {
    const callback = vi.fn();
    _registerFeatureCallback(featureKey, callback);
    manager["notifyCallbacks"](enabled);
    manager["notifyCallbacks"](disabled);
    expect(callback.mock.calls).toEqual([[true], [false]]);
    expect(manager["worker"]).toBeUndefined();
  });

  it("replays cached settings immediately", () => {
    manager["state"].settings = disabled;
    const callback = vi.fn();
    _registerFeatureCallback(featureKey, callback);
    expect(callback).toHaveBeenCalledExactlyOnceWith(false);
  });

  it.each([
    {},
    { FEATURE_SDK_STATS: { default: "disabled" } },
    { [featureKey]: "invalid-json" },
    { [featureKey]: { default: true } },
    { [featureKey]: { default: "unexpected" } },
  ])("does not change the subscriber's state for missing or invalid settings: %j", (settings) => {
    const callback = vi.fn();
    _registerFeatureCallback(featureKey, callback);
    manager["notifyCallbacks"](disabled);
    manager["notifyCallbacks"](settings);
    expect(callback).toHaveBeenCalledExactlyOnceWith(false);
  });

  it("evaluates JSON settings and distro-targeted overrides", () => {
    ConfigurationProfile.getInstance().fill({ component: "dst", version: "1.21.0" });
    const callback = vi.fn();
    _registerFeatureCallback(featureKey, callback);
    manager["notifyCallbacks"]({
      [featureKey]: JSON.stringify({
        default: "enabled",
        override: [{ component: "dst", ver: "1.21.0", value: "disabled" }],
      }),
    });
    expect(callback).toHaveBeenCalledExactlyOnceWith(false);
  });

  it("unregisters subscriptions independently and idempotently", () => {
    const callback = vi.fn();
    const unregister = _registerFeatureCallback(featureKey, callback);
    _registerFeatureCallback(featureKey, callback);
    unregister();
    unregister();
    manager["notifyCallbacks"](enabled);
    expect(callback).toHaveBeenCalledExactlyOnceWith(true);
  });

  it("does not invoke a subscription removed during notification", () => {
    const callback = vi.fn();
    const subscription: { unregister?: () => void } = {};
    _registerFeatureCallback(featureKey, () => subscription.unregister?.());
    subscription.unregister = _registerFeatureCallback(featureKey, callback);
    manager["notifyCallbacks"](enabled);
    expect(callback).not.toHaveBeenCalled();
  });

  it("logs rejected callbacks without blocking other subscribers", async () => {
    const failure = new Error("Feature transition failed");
    const debug = vi.spyOn(diag, "debug").mockImplementation(() => {});
    _registerFeatureCallback(featureKey, () => Promise.reject(failure));
    const callback = vi.fn();
    _registerFeatureCallback(featureKey, callback);
    manager["notifyCallbacks"](enabled);
    await Promise.resolve();
    expect(debug).toHaveBeenCalledWith("OneSettings configuration callback failed:", failure);
    expect(callback).toHaveBeenCalledExactlyOnceWith(true);
  });
});
