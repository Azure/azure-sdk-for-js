// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { trace } from "../../src/internal/tracingHelpers";
import { context as otContext, Span, Status, StatusCode } from "@opentelemetry/api";

import * as assert from "assert";
import sinon from "sinon";

describe("tracingHelpers", () => {
  it("trace OK", async () => {
    let setStatusStub: (sinon.SinonStub<[status: Status], Span>) | undefined;

    await trace("addConfigurationSetting", {
      tracingOptions: {
        context: otContext.active()
      }
    }, async (_newOptions, span) => {
      setStatusStub = sinon.stub(span, 'setStatus');
    });

    assert.equal(setStatusStub?.called, false, "if nothing fails we don't explicitly set the status (uses the default status)");
  });

  it("trace ERROR", async () => {
    let setStatusStub: (sinon.SinonStub<[status: Status], Span>) | undefined;

    try {
      await trace("addConfigurationSetting", {
        tracingOptions: {
          context: otContext.active()
        }
      }, async (_options: any, span: Span) => {
        setStatusStub = sinon.stub(span, 'setStatus');
        throw new Error("Purposefully thrown error")
      });

      assert.fail("Exception should have been thrown from `trace` since the inner action threw");
    } catch (err) {
      assert.equal(err.message, "Purposefully thrown error");
    }

    assert.ok(setStatusStub, "setStatus should have been called");
    assert.equal(setStatusStub?.args[0][0].code, StatusCode.ERROR, "Any thrown exception causes the span to be set to StatusCode.ERROR");
  });
});
