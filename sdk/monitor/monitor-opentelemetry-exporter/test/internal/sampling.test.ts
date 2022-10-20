// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { RandomIdGenerator, SamplingDecision } from "@opentelemetry/sdk-trace-base";
import { ApplicationInsightsSampler } from "../../src/sampling";
import { context, SpanKind } from "@opentelemetry/api";

describe("Library/ApplicationInsightsSampler", () => {
  let idGenerator = new RandomIdGenerator();

  describe("#shouldSample()", () => {
    it("will not send data on 0% sampling", () => {
      let sampler = new ApplicationInsightsSampler(0);
      let result = sampler.shouldSample(context.active(), "", "", SpanKind.INTERNAL, {}, []);
      assert.equal(result.decision, SamplingDecision.NOT_RECORD, "data should not pass");
    });

    it("will send data roughly 1/3 of the time on 33% sampling", () => {
      var iterations = 1000;
      var accepted = 0;
      let sampler = new ApplicationInsightsSampler(0.33);

      for (var i = 0; i < iterations; i++) {
        let result = sampler.shouldSample(
          context.active(),
          idGenerator.generateTraceId(),
          "",
          SpanKind.INTERNAL,
          {},
          []
        );
        if (result.decision === SamplingDecision.RECORD_AND_SAMPLED) accepted++;
      }

      assert.ok(accepted > iterations * 0.25, "data should pass more than 25% of the time");
      assert.ok(accepted < iterations * 0.45, "data should pass less than 45% the time");
    });

    it("will send data roughly 1/2 of the time on 50% sampling", () => {
      var iterations = 1000;
      var accepted = 0;
      let sampler = new ApplicationInsightsSampler(0.5);

      for (var i = 0; i < iterations; i++) {
        let result = sampler.shouldSample(
          context.active(),
          idGenerator.generateTraceId(),
          "",
          SpanKind.INTERNAL,
          {},
          []
        );
        if (result.decision === SamplingDecision.RECORD_AND_SAMPLED) accepted++;
      }

      assert.ok(accepted > iterations * 0.4, "data should pass more than 40% of the time");
      assert.ok(accepted < iterations * 0.6, "data should pass less than 60% the time");
    });

    it("will send data all of the time on 100% sampling", () => {
      var iterations = 1000;
      var accepted = 0;
      let sampler = new ApplicationInsightsSampler(1);

      for (var i = 0; i < iterations; i++) {
        let result = sampler.shouldSample(
          context.active(),
          idGenerator.generateTraceId(),
          "",
          SpanKind.INTERNAL,
          {},
          []
        );
        if (result.decision === SamplingDecision.RECORD_AND_SAMPLED) accepted++;
      }

      assert.equal(accepted, iterations, "data should pass 100% of the time");
    });

    it("will keep all telemetry from an operation together if correlation tracking is enabled", () => {
      var iterations = 1000;
      var accepted = 0;
      let sampler = new ApplicationInsightsSampler(0.33);

      for (var i = 0; i < iterations; i++) {
        let result = sampler.shouldSample(context.active(), "a", "", SpanKind.INTERNAL, {}, []);
        if (result.decision === SamplingDecision.RECORD_AND_SAMPLED) accepted++;
      }

      assert.equal(accepted, iterations, "data should pass 100% of the time");
    });

    it("will keep all telemetry from an operation together if correlation tracking is enabled #2", () => {
      var iterations = 1000;
      var accepted = 0;
      let sampler = new ApplicationInsightsSampler(0.33);

      for (var i = 0; i < iterations; i++) {
        let result = sampler.shouldSample(context.active(), "abc", "", SpanKind.INTERNAL, {}, []);
        if (result.decision === SamplingDecision.RECORD_AND_SAMPLED) accepted++;
      }

      assert.equal(accepted, 0, "data should pass 0% of the time");
    });
  });
  describe("#getSamplingHashCode()", () => {
    it("has results consistent with .net", () => {
      // test array is produced by .net sdk test
      var testArray = [
        ["ss", 1179811869],
        ["kxi", 34202699],
        ["wr", 1281077591],
        ["ynehgfhyuiltaiqovbpyhpm", 2139623659],
        ["iaxxtklcw", 1941943012],
        ["hjwvqjiiwhoxrtsjma", 1824011880],
        ["rpiauyg", 251412007],
        ["jekvjvh", 9189387],
        ["hq", 1807146729],
        ["kgqxrftjhefkwlufcxibwjcy", 270215819],
        ["lkfc", 1228617029],
        ["skrnpybqqu", 223230949],
        ["px", 70671963],
        ["dtn", 904623389],
        ["nqfcxobaequ", 397313566],
        ["togxlt", 948170633],
        ["jvvdkhnahkaujxarkd", 1486894898],
        ["mcloukvkamiaqja", 56804453],
        ["ornuu", 1588005865],
        ["otodvlhtvu", 1544494884],
        ["uhpwhasnvmnykjkitla", 981289895],
        ["itbnryqnjcgpmgivlghqtg", 1923061690],
        ["wauetkdnivwlafbfhiedsfx", 2114415420],
        ["fniwmeidbvd", 508699380],
        ["vuwdgoxspstvj", 1821547235],
        ["y", 1406544563],
        ["pceqcixfb", 1282453766],
        ["aentke", 255756533],
        ["ni", 1696510239],
        ["lbwehevltlnl", 1466602040],
        ["ymxql", 1974582171],
        ["mvqbaosfuip", 1560556398],
        ["urmwofajwmmlornynglm", 701710403],
        ["buptyvonyacerrt", 1315240646],
        ["cxsqcnyieliatqnwc", 76148095],
        ["svvco", 1849105799],
        ["luwmjhwyt", 553630912],
        ["lisvmmug", 822987687],
        ["mmntilfbmxwuyij", 882214597],
        ["hqmyv", 1510970959],
      ];

      var csharpMax = 2147483647;
      let sampler = new ApplicationInsightsSampler();
      for (var i = 0; i < testArray.length; ++i) {
        var res = sampler["_getSamplingHashCode"](<string>testArray[i][0]);
        assert.equal(res, (<number>testArray[i][1] / csharpMax) * 100);
      }
    });
  });
});
