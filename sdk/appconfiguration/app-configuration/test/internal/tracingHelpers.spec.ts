// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpan, trace } from "../../src/internal/tracingHelpers";
import { Span, Status, CanonicalCode } from "@opentelemetry/api";

import * as assert from "assert";
import sinon from "sinon";
import { AppConfigurationClient } from "../../src/appConfigurationClient";
import { AbortSignalLike, OperationOptions } from "@azure/core-http";
import { OperationTracingOptions } from "@azure/core-tracing";

describe("tracingHelpers", () => {
  it("trace OK", async () => {
    let setStatusStub: sinon.SinonStub<[Status], Span> | undefined;
    let endStub: sinon.SinonStub | undefined;

    const fakeCreateSpan = <
      T extends {
        tracingOptions?: OperationTracingOptions | undefined;
      }
    >(
      operationName: string,
      operationOptions: T | undefined
    ): {
      span: Span;
      updatedOptions: T;
    } => {
      assert.deepEqual(operationName, "addConfigurationSetting");

      const createdSpan = createSpan(operationName, operationOptions);

      setStatusStub = sinon.stub(createdSpan.span, "setStatus");
      endStub = sinon.stub(createdSpan.span, "end");

      return createdSpan;
    };

    await trace(
      "addConfigurationSetting",
      {
        tracingOptions: {}
      },
      async (_newOptions, _span) => {},
      fakeCreateSpan
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

    try {
      await trace(
        "addConfigurationSetting",
        {
          tracingOptions: {}
        },
        async (_options: any, _span: Span) => {
          throw new Error("Purposefully thrown error");
        },
        <
          T extends {
            tracingOptions?: OperationTracingOptions | undefined;
          }
        >(
          operationName: string,
          operationOptions: T | undefined
        ): {
          span: Span;
          updatedOptions: T;
        } => {
          assert.deepEqual(operationName, "addConfigurationSetting");

          const createdSpan = createSpan(operationName, operationOptions);

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
      CanonicalCode.INTERNAL,
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
        hello: "world"
      } as OperationTracingOptions
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
