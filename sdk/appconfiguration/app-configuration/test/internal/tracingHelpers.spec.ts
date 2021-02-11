// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpan, trace } from "../../src/internal/tracingHelpers";
import {
  Context,
  context as otContext,
  Span,
  SpanOptions,
  Status,
  StatusCode
} from "@opentelemetry/api";

import * as assert from "assert";
import sinon from "sinon";
import { AppConfigurationClient } from "../../src/appConfigurationClient";
import { AbortSignalLike, OperationOptions } from "@azure/core-http";

describe("tracingHelpers", () => {
  it("trace OK", async () => {
    let setStatusStub: sinon.SinonStub<[Status], Span> | undefined;
    let endStub: sinon.SinonStub | undefined;

    const parentContext = otContext.active();

    await trace(
      "addConfigurationSetting",
      {
        tracingOptions: {
          context: parentContext
        }
      },
      async (_newOptions, _span) => {},
      (operationName, operationOptions, context) => {
        assert.deepEqual(
          context,
          parentContext,
          "Parent context should be propagated to createSpan call"
        );
        assert.deepEqual(operationName, "addConfigurationSetting");

        const createdSpan = createSpan(operationName, operationOptions, context);

        setStatusStub = sinon.stub(createdSpan.span, "setStatus");
        endStub = sinon.stub(createdSpan.span, "end");

        return createdSpan;
      }
    );

    assert.equal(
      setStatusStub?.called,
      false,
      "if nothing fails we don't explicitly set the status (uses the default status)"
    );

    assert.equal(endStub?.called, true);
  });

  it("trace ERROR", async () => {
    let setStatusStub: sinon.SinonStub<[Status], Span> | undefined;
    let endStub: sinon.SinonStub | undefined;
    const parentContext = otContext.active();

    try {
      await trace(
        "addConfigurationSetting",
        {
          tracingOptions: {
            context: parentContext
          }
        },
        async (_options: any, _span: Span) => {
          throw new Error("Purposefully thrown error");
        },
        (operationName, operationOptions, context) => {
          assert.deepEqual(
            context,
            parentContext,
            "Parent context should be propagated to createSpan call"
          );
          assert.deepEqual(operationName, "addConfigurationSetting");

          const createdSpan = createSpan(operationName, operationOptions, context);

          setStatusStub = sinon.stub(createdSpan.span, "setStatus");
          endStub = sinon.stub(createdSpan.span, "end");

          return createdSpan;
        }
      );

      assert.fail("Exception should have been thrown from `trace` since the inner action threw");
    } catch (err) {
      assert.equal(err.message, "Purposefully thrown error");
    }

    assert.ok(setStatusStub, "setStatus should have been called");
    assert.equal(
      setStatusStub?.args[0][0].code,
      StatusCode.ERROR,
      "Any thrown exception causes the span to be set to StatusCode.ERROR"
    );

    assert.equal(endStub?.called, true);
  });

  it("tracing is set up for all methods", async () => {
    const appConfigurationClient = new AppConfigurationClient(
      "Endpoint=endpoint;Id=id;Secret=secret"
    );

    let traceData = {
      operationName: "",
      options: undefined as OperationOptions | undefined
    };

    appConfigurationClient["_trace"] = async (operationName, options, _fn) => {
      traceData.operationName = operationName;
      traceData.options = options;
      return {} as any;
    };

    const operationOptions: OperationOptions = {
      abortSignal: ({} as any) as AbortSignalLike,
      tracingOptions: {
        spanOptions: ({} as any) as SpanOptions,
        context: ({} as any) as Context
      }
    };

    await appConfigurationClient.addConfigurationSetting(
      { key: "ignored", value: "ignored" },
      operationOptions
    );
    assert.deepEqual(traceData, {
      operationName: "addConfigurationSetting",
      options: operationOptions
    });

    await appConfigurationClient.setConfigurationSetting(
      { key: "ignored", value: "ignored" },
      operationOptions
    );
    assert.deepEqual(traceData, {
      operationName: "setConfigurationSetting",
      options: operationOptions
    });

    await appConfigurationClient.getConfigurationSetting({ key: "ignored" }, operationOptions);
    assert.deepEqual(traceData, {
      operationName: "getConfigurationSetting",
      options: operationOptions
    });

    await appConfigurationClient.setReadOnly({ key: "ignored" }, true, operationOptions);
    assert.deepEqual(traceData, {
      operationName: "setReadOnly",
      options: operationOptions
    });

    await appConfigurationClient.deleteConfigurationSetting({ key: "ignored" }, operationOptions);
    assert.deepEqual(traceData, {
      operationName: "deleteConfigurationSetting",
      options: operationOptions
    });

    const it = appConfigurationClient.listConfigurationSettings({
      keyFilter: "ignored",
      ...operationOptions
    });
    await it.next();

    assert.deepEqual(traceData, {
      operationName: "listConfigurationSettings",
      options: { ...operationOptions, keyFilter: "ignored" }
    });

    const it2 = appConfigurationClient.listRevisions({ keyFilter: "ignored", ...operationOptions });
    await it2.next();

    assert.deepEqual(traceData, {
      operationName: "listRevisions",
      options: { ...operationOptions, keyFilter: "ignored" }
    });
  });
});
