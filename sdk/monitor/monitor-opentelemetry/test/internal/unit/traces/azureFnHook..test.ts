// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as sinon from "sinon";
import { AzureFunctionsHook } from "../../../../src/traces/azureFnHook";
import { TraceHandler } from "../../../../src/traces";
import { Logger } from "../../../../src/shared/logging";
import { AzureMonitorOpenTelemetryConfig } from "../../../../src/shared";
import { MetricHandler } from "../../../../src/metrics";

describe("Library/AzureFunctionsHook", () => {
  let sandbox: sinon.SinonSandbox;
  let traceHandler: TraceHandler;
  let metricHandler: MetricHandler;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    if (traceHandler) {
      traceHandler.shutdown();
    }
    if (metricHandler) {
      metricHandler.shutdown();
    }
  });

  it("Hook not added if not running in Azure Functions", () => {
    const spy = sandbox.spy(Logger.getInstance(), "debug");
    let hook = new AzureFunctionsHook();
    assert.equal(hook["_functionsCoreModule"], undefined);
    assert.ok(spy.called);
    assert.equal(
      spy.args[0][0],
      "@azure/functions-core failed to load, not running in Azure Functions"
    );
  });

  describe("AutoCollection/AzureFunctionsHook load fake Azure Functions Core", () => {
    let originalRequire: any;

    before(() => {
      var Module = require("module");
      originalRequire = Module.prototype.require;
    });

    afterEach(() => {
      var Module = require("module");
      Module.prototype.require = originalRequire;
    });

    it("Hook not added if using not supported programming model", () => {
      var Module = require("module");
      var preInvocationCalled = false;
      Module.prototype.require = function () {
        if (arguments[0] === "@azure/functions-core") {
          return {
            registerHook(name: string) {
              if (name === "preInvocation") {
                preInvocationCalled = true;
              }
            },
            getProgrammingModel() {
              return {
                name: "@azure/functions",
                version: "2.x",
              };
            },
          };
        }
        return originalRequire.apply(this, arguments);
      };
      let azureFnHook = new AzureFunctionsHook();
      assert.ok(azureFnHook, "azureFnHook");
      assert.ok(!preInvocationCalled, "preInvocationCalled");
    });

    it("Pre Invokation Hook added if running in Azure Functions and context is propagated", () => {
      let Module = require("module");
      let preInvocationCalled = false;
      let config = new AzureMonitorOpenTelemetryConfig({
        enableAutoCollectPerformance: false,
        enableAutoCollectStandardMetrics: false,
      });
      config.azureMonitorExporterConfig.connectionString =
        "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
      metricHandler = new MetricHandler(config);
      traceHandler = new TraceHandler(config, metricHandler);

      Module.prototype.require = function () {
        if (arguments[0] === "@azure/functions-core") {
          return {
            registerHook(name: string, callback: any) {
              if (name === "preInvocation") {
                preInvocationCalled = true;
                let ctx = {
                  res: { status: 400 },
                  invocationId: "testinvocationId",
                  traceContext: {
                    traceparent: "00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01",
                    tracestate: "",
                    attributes: {},
                  },
                };
                let preInvocationContext: any = {
                  inputs: [],
                  functionCallback: () => {
                    let span = traceHandler.getTracer().startSpan("test");
                    // Context should be propagated here
                    assert.equal(
                      (span as any)["_spanContext"]["traceId"],
                      "0af7651916cd43dd8448eb211c80319c"
                    );
                    assert.ok((span as any)["_spanContext"]["spanId"]);
                  },
                  hookData: {},
                  appHookData: {},
                  invocationContext: ctx,
                };
                // Azure Functions should call preinvocation callback
                callback(preInvocationContext);
                // Azure Functions should call customer function callback
                preInvocationContext.functionCallback(null, null);
              }
            },

            getProgrammingModel() {
              return {
                name: "@azure/functions",
                version: "3.x",
              };
            },
          };
        }
        return originalRequire.apply(this, arguments);
      };
      let azureFnHook = new AzureFunctionsHook();
      assert.ok(azureFnHook, "azureFnHook");
      assert.ok(preInvocationCalled, "preInvocationCalled");
    });
  });
});
