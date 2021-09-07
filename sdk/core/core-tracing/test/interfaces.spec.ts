// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as openTelemetry from "@opentelemetry/api";
import * as coreAuth from "@azure/core-auth";
import * as coreTracing from "../src/interfaces";
import { assert } from "chai";
import { getTracer } from "../src/interfaces";
import { TestTracer } from "./util/testTracer";

type coreAuthTracingOptions = Required<coreAuth.GetTokenOptions>["tracingOptions"];

describe("interface compatibility", () => {
  it("SpanContext is assignable", () => {
    const context: coreTracing.SpanContext = {
      spanId: "",
      traceId: "",
      traceFlags: coreTracing.TraceFlags.NONE
    };

    const OTContext: openTelemetry.SpanContext = context;
    const context2: coreTracing.SpanContext = OTContext;

    assert.ok(context2);
  });

  it("SpanOptions can be passed to OT", () => {
    const spanOptions: coreTracing.SpanOptions = {
      attributes: {
        hello: "world"
      },
      kind: coreTracing.SpanKind.INTERNAL,
      links: [
        {
          context: {
            traceFlags: coreTracing.TraceFlags.NONE,
            spanId: "",
            traceId: ""
          }
        }
      ]
    };

    const oTSpanOptions: openTelemetry.SpanOptions = spanOptions;
    assert.ok(oTSpanOptions);
  });

  it("core-auth", () => {
    const coreTracingOptions: Required<coreTracing.OperationTracingOptions> = {
      tracingContext: coreTracing.context.active()
    };

    const t: Required<Omit<
      coreAuthTracingOptions,
      keyof Required<coreTracing.OperationTracingOptions> | "spanOptions"
    >> = {};
    assert.ok(t, "core-tracing and core-auth should have the same properties");

    const t2: Required<Omit<
      coreTracing.OperationTracingOptions,
      keyof Required<coreAuthTracingOptions> | "spanOptions"
    >> = {};
    assert.ok(t2, "core-tracing and core-auth should have the same properties");

    const authTracingOptions: coreAuth.GetTokenOptions["tracingOptions"] = coreTracingOptions;
    assert.ok(authTracingOptions);
  });

  describe("getTracer", () => {
    it("returns a tracer with a given name and version", () => {
      const tracer = getTracer("test", "1.0.0") as TestTracer;
      assert.equal(tracer.name, "test");
      assert.equal(tracer.version, "1.0.0");
    });

    it("returns a tracer with a default name no version if not provided", () => {
      const tracer = getTracer() as TestTracer;
      assert.isNotEmpty(tracer.name);
      assert.isUndefined(tracer.version);
    });
  });
});
