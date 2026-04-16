// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig, mergeConfig } from "vitest/config";
import type { Plugin } from "vite";
import base from "../../vitest.browser.base.config.ts";

// The "react-native" condition causes Vite to resolve #platform/* subpath imports
// to their RN variants. The RN userAgentPlatform imports { Platform } from "react-native",
// but the actual react-native package uses Flow syntax that Vite/esbuild cannot parse.
// This plugin stubs the "react-native" import with a minimal shim.
function stubReactNative(): Plugin {
  return {
    name: "stub-react-native",
    enforce: "pre",
    resolveId(id) {
      if (id === "react-native") {
        return "\0react-native-stub";
      }
    },
    load(id) {
      if (id === "\0react-native-stub") {
        return `export const Platform = { OS: "test", Version: "0.0.0", constants: { reactNativeVersion: { major: 0, minor: 0, patch: 0 } } };`;
      }
    },
  };
}

export default mergeConfig(
  base,
  defineConfig({
    plugins: [stubReactNative()],
    optimizeDeps: {
      exclude: ["react-native"],
    },
    resolve: {
      conditions: ["react-native"],
    },
    test: {
      include: ["test/**/*.spec.ts"],
      exclude: ["test/**/node/**", "test/**/browser/**", "test/snippets.spec.ts"],
    },
  }),
);
