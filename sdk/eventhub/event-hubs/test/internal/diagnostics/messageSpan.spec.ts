// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { resetTracer, setTracer } from "@azure/test-utils";
import chai from "chai";
import { createMessageSpan } from "../../../src/diagnostics/tracing";
import { testWithServiceTypes } from "../../public/utils/testWithServiceTypes";

const should = chai.should();
const assert = chai.assert;

testWithServiceTypes(() => {
  describe("#createMessageSpan()", () => {
    before(() => {
      setTracer();
    });

    after(() => {
      resetTracer();
    });

    it("should create a span without a parent", () => {
      const { span } = createMessageSpan(
        {},
        {
          entityPath: "entity path",
          host: "host"
        }
      );

      should.exist(span);
      should.exist(span.spanContext().spanId);
      should.exist(span.spanContext().traceId);

      should.equal((span as any).name, "Azure.EventHubs.message");
      assert.deepStrictEqual((span as any).attributes, {
        "az.namespace": "Microsoft.EventHub",
        "message_bus.destination": "entity path",
        "peer.address": "host"
      });

      span.end();
    });
  });
});
