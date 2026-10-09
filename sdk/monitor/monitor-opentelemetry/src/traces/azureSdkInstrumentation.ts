// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Instrumenter, TracingSpan } from "@azure/core-tracing";
import type * as CoreTracing from "@azure/core-tracing";
import {
  AzureSdkInstrumentation as BaseAzureSdkInstrumentation,
  createOpenTelemetryInstrumenter,
} from "@azure/opentelemetry-instrumentation-azure-sdk";
import { context } from "@opentelemetry/api";
import type { InstrumentationModuleDefinition } from "@opentelemetry/instrumentation";

const nonRecordingSpan: TracingSpan = {
  end: () => {},
  isRecording: () => false,
  recordException: () => {},
  setAttribute: () => {},
  setStatus: () => {},
  addEvent: () => {},
};

function createLifecycleInstrumenter(isEnabled: () => boolean): Instrumenter {
  const instrumenter = createOpenTelemetryInstrumenter();
  return {
    startSpan(name, options) {
      if (!isEnabled()) {
        return {
          span: nonRecordingSpan,
          tracingContext: options.tracingContext ?? context.active(),
        };
      }
      return instrumenter.startSpan(name, options);
    },
    withContext(tracingContext, callback, ...args) {
      return instrumenter.withContext(tracingContext, callback, ...args);
    },
    parseTraceparentHeader(header) {
      return isEnabled() ? instrumenter.parseTraceparentHeader(header) : undefined;
    },
    createRequestHeaders(tracingContext) {
      return isEnabled() ? instrumenter.createRequestHeaders(tracingContext) : {};
    },
  };
}

/**
 * Keep both eager and module-hook bridges tied to the distro's instrumentation
 * lifecycle without changing the shared Azure SDK instrumentation package.
 * Context activation remains available when instrumentation is disabled.
 * @internal
 */
export class AzureSdkInstrumentation extends BaseAzureSdkInstrumentation {
  protected override init():
    InstrumentationModuleDefinition | InstrumentationModuleDefinition[] | void {
    const definitions = super.init();
    const modules = Array.isArray(definitions) ? definitions : definitions ? [definitions] : [];
    for (const module of modules) {
      if (module.name === "@azure/core-tracing") {
        module.patch = (moduleExports: typeof CoreTracing) => {
          if (typeof moduleExports.useInstrumenter === "function") {
            // Disable only this bridge; leave customer-installed instrumenters untouched.
            moduleExports.useInstrumenter(createLifecycleInstrumenter(() => this.isEnabled()));
          }
          return moduleExports;
        };
      }
    }
    return definitions;
  }
}
