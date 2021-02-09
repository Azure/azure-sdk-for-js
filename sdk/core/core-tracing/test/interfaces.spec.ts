// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { SpanContext, TraceFlags, SpanOptions } from "../src";
import { SpanContext as OTSpanContext, SpanOptions as OTSpanOptions, Context as OTContext } from "@opentelemetry/api";
import { Context as CoreTracingContext } from "../src/interfaces";

describe("interface compatibility", () => {
  it("SpanContext is assignable", () => {
    const context: SpanContext = {
      spanId: "",
      traceId: "",
      traceFlags: TraceFlags.NONE
    };

    const OTContext: OTSpanContext = context;
    const context2: SpanContext = OTContext;

    assert.ok(context2);
  });

  it("SpanOptions can be passed to OT", () => {
    const spanOptions: SpanOptions = {
    };

    const oTSpanOptions: OTSpanOptions = spanOptions;
    assert.ok(oTSpanOptions);
  });

  it("Context can be passed to OT", () => {
    const ourContext: CoreTracingContext = {
      deleteValue: () => {
        return ourContext;
      },
      getValue: () => { },
      setValue: () => {
        return ourContext;
      }
    };

    const otContext: OTContext = ourContext;
    assert.ok(otContext);
  });
});
