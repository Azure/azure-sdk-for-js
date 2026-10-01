// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import { createRequire } from "node:module";
import * as coreTracing from "@azure/core-tracing";
import type {
  Instrumentation,
  InstrumentationModuleDefinition,
} from "@opentelemetry/instrumentation";

/**
 * Eagerly installs the OpenTelemetry bridge for \@azure/core-tracing.
 *
 * The \@azure/opentelemetry-instrumentation-azure-sdk package normally installs
 * the bridge via a require-in-the-middle (RITM) hook that intercepts future
 * `require("@azure/core-tracing")` calls. However, if \@azure/core-tracing is
 * already loaded before useAzureMonitor() is called (e.g. because the customer
 * imported \@azure/ai-projects or any other Azure SDK package first), the hook
 * never fires, and Azure SDK spans are silently dropped.
 *
 * Apply the registered instrumentation's patch to both module systems so the
 * eager bridge follows the same enable/disable lifecycle as the module hooks.
 *
 * @internal
 */
export function ensureAzureSdkTracingBridge(instrumentation: Instrumentation): void {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ESM only output
    const esmRequire = createRequire(import.meta.url);
    const moduleDefinitions =
      (
        instrumentation as Instrumentation & {
          getModuleDefinitions?: () => InstrumentationModuleDefinition[];
        }
      ).getModuleDefinitions?.() ?? [];
    for (const moduleDefinition of moduleDefinitions) {
      if (moduleDefinition.name === "@azure/core-tracing" && moduleDefinition.patch) {
        moduleDefinition.patch(coreTracing);
        moduleDefinition.patch(esmRequire("@azure/core-tracing"));
      }
    }
  } catch (e) {
    diag.warn("Failed to install Azure SDK tracing bridge", e);
  }
}
