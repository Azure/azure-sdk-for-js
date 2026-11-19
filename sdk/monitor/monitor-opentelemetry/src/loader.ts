// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * ESM Loader entry point for Azure Monitor OpenTelemetry.
 *
 * For ESM applications, this loader MUST be used with the --import flag to ensure
 * instrumentation hooks are registered before any application modules are loaded.
 * This is required because ESM modules cannot be instrumented after they are loaded.
 *
 * Usage: node --import \@azure/monitor-opentelemetry/loader \<your-app-entry-point\>
 */

import * as nodeModule from "node:module";
import * as workerThreads from "node:worker_threads";
import { Logger } from "./shared/logging/index.js";
import { resolveLoaderURL } from "./shared/module.js";

const OTEL_LOADER_SPECIFIER = "@opentelemetry/instrumentation/hook.mjs";

interface SyncHooks {
  supportsSyncHooks(): boolean;
  register(): void;
}

function tryRegisterSyncHooks(otelLoaderURL: string): boolean {
  if (typeof nodeModule.registerHooks !== "function" || !process.features.require_module) {
    return false;
  }

  // A separately installed copy would not see OpenTelemetry's hook subscriptions.
  // eslint-disable-next-line no-restricted-syntax -- Resolve the optional hook from OpenTelemetry's own dependency tree.
  const otelRequire = nodeModule.createRequire(otelLoaderURL);
  let hooks: SyncHooks;
  try {
    hooks = otelRequire("import-in-the-middle/register-hooks.mjs") as SyncHooks;
  } catch (error) {
    // Older versions in OpenTelemetry's dependency range lack a synchronously loadable entry point.
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "MODULE_NOT_FOUND" || code === "ERR_REQUIRE_ASYNC_MODULE") {
      return false;
    }
    throw error;
  }

  // Some Node releases expose registerHooks but cannot handle the loader's CommonJS sources.
  if (!hooks.supportsSyncHooks()) {
    return false;
  }
  hooks.register();
  return true;
}

// The legacy loader thread inherits --require. It must not register the hooks again.
if (!workerThreads.isInternalThread) {
  try {
    const otelLoaderURL = resolveLoaderURL(OTEL_LOADER_SPECIFIER);
    if (!tryRegisterSyncHooks(otelLoaderURL)) {
      nodeModule.register(otelLoaderURL);
    }
  } catch (error) {
    Logger.getInstance().warn("Failed to register OpenTelemetry instrumentation loader", error);
  }
}
