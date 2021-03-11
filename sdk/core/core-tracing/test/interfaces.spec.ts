// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as openTelemetry from "@opentelemetry/api";
import * as coreAuth from "@azure/core-auth";
import * as coreTracing from "../src/interfaces";
import assert from "assert";

type coreAuthTracingOptions = Required<coreAuth.GetTokenOptions>["tracingOptions"];

describe("interface compatibility", () => {
  it("SpanContext is assignable", () => {
    const context: coreTracing.SpanContext = {
      spanId: "",
      traceId: "",
      traceFlags: coreTracing.TraceFlags.NONE
    };

    const OTContext: openTelemetry.SpanContext = context;
    const context2:  coreTracing.SpanContext = OTContext;

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
      spanOptions: {
        attributes: {
          hello: "world"
        },
        kind: coreTracing.SpanKind.PRODUCER,
        links: [
          {
            context: {
              spanId: "spanId",
              traceId: "traceId"
            },
            attributes: {
              hello2: "world2"
            }
          }
        ]
      },
      tracingContext: coreTracing.context.active()
    };

    const t: Required<Omit<
      coreAuthTracingOptions,
      keyof Required<coreTracing.OperationTracingOptions>
    >> = {};
    assert.ok(t, "core-tracing and core-auth should have the same properties");

    const t2: Required<Omit<
      coreTracing.OperationTracingOptions,
      keyof Required<coreAuthTracingOptions>
    >> = {};
    assert.ok(t2, "core-tracing and core-auth should have the same properties");

    const authTracingOptions: coreAuth.GetTokenOptions["tracingOptions"] = coreTracingOptions;
    assert.ok(authTracingOptions);
  });
});