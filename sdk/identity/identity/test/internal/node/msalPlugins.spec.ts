// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ICachePlugin, INativeBrokerPlugin } from "@azure/msal-node";
import {
  PluginConfiguration,
  msalNodeFlowCacheControl,
  msalNodeFlowNativeBrokerControl,
  msalPlugins,
} from "../../../src/msal/nodeFlows/msalPlugins";

import { MsalClientOptions } from "../../../src/msal/nodeFlows/msalClient";
import Sinon from "sinon";
import { assert } from "@azure-tools/test-utils";

describe("#generatePluginConfiguration", function () {
  let options: MsalClientOptions;

  beforeEach(() => {
    options = {};
  });

  it("returns a PluginConfiguration with default values", function () {
    const result = msalPlugins.generatePluginConfiguration(options);
    const expected: PluginConfiguration = {
      cache: {},
      broker: {
        isEnabled: false,
        enableMsaPassthrough: false,
        parentWindowHandle: undefined,
      },
    };
    assert.deepEqual(result, expected);
  });

  describe("with token cache persistence enabled", function () {
    afterEach(() => {
      msalNodeFlowCacheControl.setPersistence(undefined as any);
    });

    it("should throw an error if persistence provider is not configured", () => {
      options.tokenCachePersistenceOptions = { enabled: true };
      assert.throws(
        () => msalPlugins.generatePluginConfiguration(options),
        /Persistent token caching was requested/,
      );
    });

    it("configures the cache plugin correctly", async function () {
      options.tokenCachePersistenceOptions = { enabled: true };

      const cachePlugin = {
        afterCacheAccess: Sinon.stub(),
        beforeCacheAccess: Sinon.stub(),
      };
      const pluginProvider: () => Promise<ICachePlugin> = () => Promise.resolve(cachePlugin);
      msalNodeFlowCacheControl.setPersistence(pluginProvider);
      const result = msalPlugins.generatePluginConfiguration(options);
      assert.exists(result.cache.cachePlugin);
      const plugin = await result.cache.cachePlugin;
      assert.strictEqual(plugin, cachePlugin);
    });

    it("configures the CAE cache plugin correctly", async function () {
      options.tokenCachePersistenceOptions = { enabled: true };

      const cachePluginCae = {
        afterCacheAccess: Sinon.stub(),
        beforeCacheAccess: Sinon.stub(),
      };
      const pluginProvider: () => Promise<ICachePlugin> = () => Promise.resolve(cachePluginCae);
      msalNodeFlowCacheControl.setPersistence(pluginProvider);
      const result = msalPlugins.generatePluginConfiguration(options);
      assert.exists(result.cache.cachePluginCae);
      const plugin = await result.cache.cachePluginCae;
      assert.strictEqual(plugin, cachePluginCae);
    });
  });

  describe("with native broker enabled", function () {
    const parentWindowHandle: Uint8Array = new TextEncoder().encode("handle");

    afterEach(() => {
      msalNodeFlowNativeBrokerControl.setNativeBroker(undefined as any);
    });

    it("throws an error if native broker is not configured", () => {
      options.brokerOptions = { enabled: true, parentWindowHandle };
      assert.throws(
        () => msalPlugins.generatePluginConfiguration(options),
        /Broker for WAM was requested to be enabled/,
      );
    });

    it("configures the native broker plugin correctly", function () {
      options.brokerOptions = {
        enabled: true,
        parentWindowHandle,
        legacyEnableMsaPassthrough: true,
      };
      const nativeBrokerPlugin: INativeBrokerPlugin = {} as INativeBrokerPlugin;
      msalNodeFlowNativeBrokerControl.setNativeBroker(nativeBrokerPlugin);

      const result = msalPlugins.generatePluginConfiguration(options);
      assert.strictEqual(result.broker.nativeBrokerPlugin, nativeBrokerPlugin);
      assert.strictEqual(result.broker.enableMsaPassthrough, true);
      assert.strictEqual(result.broker.parentWindowHandle, parentWindowHandle);
      assert.strictEqual(result.broker.isEnabled, true);
    });
  });
});
