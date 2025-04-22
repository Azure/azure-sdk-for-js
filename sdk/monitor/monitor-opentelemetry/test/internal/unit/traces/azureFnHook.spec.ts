// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-require-imports */

import type { Context as AzureFnV3Context } from "@azure/functions-old";
import type { InvocationContext as AzureFnV4Context } from "@azure/functions";
import type { PreInvocationContext } from "../../../../src/traces/azureFnHook.js";
import { AzureFunctionsHook } from "../../../../src/traces/azureFnHook.js";
import { TraceHandler } from "../../../../src/traces/index.js";
import { Logger } from "../../../../src/shared/logging/index.js";
import { InternalConfig } from "../../../../src/shared/index.js";
import { MetricHandler } from "../../../../src/metrics/index.js";
import { metrics, trace } from "@opentelemetry/api";
import { vi, describe, it, beforeEach, afterEach, expect, assert, beforeAll } from "vitest";
import { shutdownAzureMonitor, useAzureMonitor } from "../../../../src/index.js";

describe("Library/AzureFunctionsHook", () => {
  let metricHandler: MetricHandler;
  let handler: TraceHandler;

  afterEach(async () => {
    if (metricHandler) {
      metricHandler.shutdown();
    }
    if (handler) {
      handler.shutdown();
    }
    metrics.disable();
    trace.disable();
    vi.restoreAllMocks();
    await shutdownAzureMonitor();
  });

  beforeEach(() => {
    useAzureMonitor({
      azureMonitorExporterOptions: {
        connectionString: "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;",
      },
    });
  });

  it("Hook not added if not running in Azure Functions", () => {
    const spy = vi.spyOn(Logger.getInstance(), "debug");
    const hook = new AzureFunctionsHook();
    assert.equal(hook["_functionsCoreModule"], undefined);
    expect(spy).toHaveBeenCalledTimes(1);
    assert.equal(
      spy.mock.calls[0][0],
      "@azure/functions-core failed to load, not running in Azure Functions",
    );
  });

  describe("AutoCollection/AzureFunctionsHook load fake Azure Functions Core", () => {
    let originalRequire: any;

    const v3Context: Partial<AzureFnV3Context> = {
      invocationId: "testinvocationId",
      traceContext: {
        traceparent: "00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01",
        tracestate: "",
        attributes: {},
      },
    };

    const v4Context: Partial<AzureFnV4Context> = {
      invocationId: "testinvocationId",
      traceContext: {
        traceParent: "00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01",
        traceState: "",
        attributes: {},
      },
    };

    beforeAll(() => {
      const Module = require("module");
      originalRequire = Module.prototype.require;
    });

    afterEach(() => {
      const Module = require("module");
      Module.prototype.require = originalRequire;
    });

    type PreInvocationCallback = (context: PreInvocationContext) => void | Promise<void>;

    for (const [testModelVersion, testInvocationContext] of [
      ["3.x", v3Context],
      ["4.x", v4Context],
    ]) {
      it(// eslint-disable-next-line @typescript-eslint/no-base-to-string
      `[${testModelVersion}] Pre Invokation Hook added if running in Azure Functions and context is propagated`, async () => {
        let preInvocationCallback: any;
        let preInvocationCalled = false;

        const Module = require("module");
        Module.prototype.require = function () {
          // eslint-disable-next-line prefer-rest-params
          if (arguments[0] === "@azure/functions-core") {
            return {
              registerHook(name: string, callback: PreInvocationCallback) {
                if (name === "preInvocation") {
                  preInvocationCalled = true;
                  preInvocationCallback = callback;
                }
              },
            };
          }
          // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-unsafe-return
          return originalRequire.apply(this, arguments);
        };

        const config = new InternalConfig({});
        config.azureMonitorExporterOptions.connectionString =
          "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
        metricHandler = new MetricHandler(config);
        handler = new TraceHandler(config, metricHandler);
        const azureFnHook = new AzureFunctionsHook();
        assert.ok(preInvocationCalled, "preInvocationCalled");
        assert.ok(azureFnHook, "azureFnHook");

        // Azure Functions should call preinvocation callback
        const preInvocationContext: PreInvocationContext = {
          inputs: [],
          functionCallback: () => {
            const span = trace.getTracer("testTracer").startSpan("test");
            // Context should be propagated here
            assert.equal(
              (span as any)["_spanContext"]["traceId"],
              "0af7651916cd43dd8448eb211c80319c",
            );
            assert.ok((span as any)["_spanContext"]["spanId"]);
          },
          invocationContext: testInvocationContext,
        };

        await preInvocationCallback(preInvocationContext);
        preInvocationContext.functionCallback(testInvocationContext);
      });
    }
  });
});
