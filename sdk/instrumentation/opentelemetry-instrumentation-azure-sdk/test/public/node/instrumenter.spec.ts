// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenTelemetryInstrumenter } from "../../../src/instrumenter";
import { assert } from "chai";
import { inMemoryExporter } from "../util/setup";
import { isTracingSuppressed } from "@opentelemetry/core";

describe("OpenTelemetryInstrumenter (node)", () => {
  const packageName = "test-package";

  beforeEach(() => {
    inMemoryExporter.reset();
  });

  const instrumenter = new OpenTelemetryInstrumenter();

  describe("startSpan", () => {
    describe("when AZURE_TRACING_DISABLED is set", () => {
      beforeEach(() => {
        process.env.AZURE_TRACING_DISABLED = "1";
      });

      afterEach(() => {
        delete process.env.AZURE_TRACING_DISABLED;
      });

      it("suppresses tracing for our spans", () => {
        const { tracingContext, span } = instrumenter.startSpan("test", {
          packageName,
        });
        assert.isFalse(span.isRecording());
        assert.isFalse(isTracingSuppressed(tracingContext));
      });
    });

    describe("when AZURE_HTTP_TRACING_DISABLED is set", () => {
      beforeEach(() => {
        process.env.AZURE_HTTP_TRACING_DISABLED = "1";
      });

      afterEach(() => {
        delete process.env.AZURE_HTTP_TRACING_DISABLED;
      });

      it("suppresses tracing for downstream spans", () => {
        const { span, tracingContext } = instrumenter.startSpan("HTTP POST", {
          packageName,
        });

        assert.isTrue(span.isRecording());
        assert.isTrue(isTracingSuppressed(tracingContext));
      });

      it("does not suppress internal spans", () => {
        const { span, tracingContext } = instrumenter.startSpan("foo", {
          packageName,
        });

        assert.isTrue(span.isRecording());
        assert.isFalse(isTracingSuppressed(tracingContext));
      });
    });
  });
});
