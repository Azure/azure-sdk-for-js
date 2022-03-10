// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenTelemetryInstrumenter, isTracingDisabled } from "../../../src/instrumenter";

import { assert } from "chai";
import { inMemoryExporter } from "../util/setup";

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

      it("suppresses tracing for all spans", () => {
        const { span } = instrumenter.startSpan("test", {
          packageName,
        });
        assert.isFalse(span.isRecording());
      });
    });

    describe("when AZURE_HTTP_TRACING_DISABLED is set", () => {
      beforeEach(() => {
        process.env.AZURE_HTTP_TRACING_DISABLED = "1";
      });
      afterEach(() => {
        delete process.env.AZURE_HTTP_TRACING_DISABLED;
      });

      it("suppresses tracing for http spans", () => {
        const { span } = instrumenter.startSpan("HTTP POST", {
          packageName,
        });

        assert.isFalse(span.isRecording());
      });

      it("does not suppress internal spans", () => {
        const { span } = instrumenter.startSpan("foo", {
          packageName,
        });

        assert.isTrue(span.isRecording());
      });
    });
  });

  describe("#isTracingDisabled", () => {
    it("is false when env var is blank or missing", () => {
      process.env.AZURE_TRACING_DISABLED = "";
      assert.isFalse(isTracingDisabled());
      delete process.env.AZURE_TRACING_DISABLED;
      assert.isFalse(isTracingDisabled());
    });

    it("is false when env var is 'false'", () => {
      process.env.AZURE_TRACING_DISABLED = "false";
      assert.isFalse(isTracingDisabled());
      process.env.AZURE_TRACING_DISABLED = "False";
      assert.isFalse(isTracingDisabled());
      process.env.AZURE_TRACING_DISABLED = "FALSE";
      assert.isFalse(isTracingDisabled());
      delete process.env.AZURE_TRACING_DISABLED;
    });

    it("is false when env var is 0", () => {
      process.env.AZURE_TRACING_DISABLED = "0";
      assert.isFalse(isTracingDisabled());
      delete process.env.AZURE_TRACING_DISABLED;
    });

    it("is true otherwise", () => {
      process.env.AZURE_TRACING_DISABLED = "true";
      assert.isTrue(isTracingDisabled());
      process.env.AZURE_TRACING_DISABLED = "1";
      assert.isTrue(isTracingDisabled());
      delete process.env.AZURE_TRACING_DISABLED;
    });
  });
});
