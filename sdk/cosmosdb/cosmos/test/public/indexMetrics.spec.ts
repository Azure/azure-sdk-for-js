// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { Suite } from "mocha";
import { IndexMetricWriter, IndexUtilizationInfo } from "../../src/indexMetrics";
describe("Test Index Metrics Writer", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);

  it("test writeIndexMetrics", async function () {
    const result: { result: IndexUtilizationInfo } = { result: IndexUtilizationInfo.Empty };
    IndexUtilizationInfo.tryCreateFromDelimitedBase64String(
      "eyJVdGlsaXplZFNpbmdsZUluZGV4ZXMiOlt7IkZpbHRlckV4cHJlc3Npb24iOiIiLCJJbmRleFNwZWMiOiJcL25hbWVcLz8iLCJGaWx0ZXJQcmVjaXNlU2V0Ijp0cnVlLCJJbmRleFByZWNpc2VTZXQiOnRydWUsIkluZGV4SW1wYWN0U2NvcmUiOiJIaWdoIn1dLCJQb3RlbnRpYWxTaW5nbGVJbmRleGVzIjpbXSwiVXRpbGl6ZWRDb21wb3NpdGVJbmRleGVzIjpbXSwiUG90ZW50aWFsQ29tcG9zaXRlSW5kZXhlcyI6W119",
      result,
    );
    const indexMetricWriter = new IndexMetricWriter();
    const output =
      "\n" +
      "Index Utilization Information\n" +
      "  Utilized Single Indexes\n" +
      "    Index Spec: /name/?\n" +
      "    Index Impact Score: High\n" +
      "    ---\n" +
      "  Potential Single Indexes\n" +
      "  Utilized Composite Indexes\n" +
      "  Potential Composite Indexes\n";

    const indexMetric = indexMetricWriter.writeIndexMetrics(result.result);
    assert.equal(indexMetric, output);
  });
});

describe("Test Index Utilization Info", function (this: Suite) {
  it("test tryCreateFromDelimitedBase64String", async function () {
    const delimitedString =
      "eyJVdGlsaXplZFNpbmdsZUluZGV4ZXMiOlt7IkZpbHRlckV4cHJlc3Npb24iOiIiLCJJbmRleFNwZWMiOiJcL25hbWVcLz8iLCJGaWx0ZXJQcmVjaXNlU2V0Ijp0cnVlLCJJbmRleFByZWNpc2VTZXQiOnRydWUsIkluZGV4SW1wYWN0U2NvcmUiOiJIaWdoIn1dLCJQb3RlbnRpYWxTaW5nbGVJbmRleGVzIjpbXSwiVXRpbGl6ZWRDb21wb3NpdGVJbmRleGVzIjpbXSwiUG90ZW50aWFsQ29tcG9zaXRlSW5kZXhlcyI6W119";
    const result: { result: IndexUtilizationInfo } = { result: IndexUtilizationInfo.Empty };

    const isParsed = IndexUtilizationInfo.tryCreateFromDelimitedBase64String(
      delimitedString,
      result,
    );

    assert.equal(isParsed, true);
    assert.equal(result.result?.UtilizedSingleIndexes.length, 1);
    assert.equal(result.result?.UtilizedSingleIndexes[0].IndexSpec, "/name/?");
    assert.equal(result.result?.UtilizedSingleIndexes[0].IndexImpactScore, "High");
  });

  it("test tryCreateFromDelimitedBase64String with invalid string", async function () {
    const delimitedString = "invalid";
    const result: { result: IndexUtilizationInfo } = { result: IndexUtilizationInfo.Empty };

    const isParsed = IndexUtilizationInfo.tryCreateFromDelimitedBase64String(
      delimitedString,
      result,
    );

    assert.equal(isParsed, false);
    assert.equal(result.result, IndexUtilizationInfo.Empty);
  });

  it("test tryCreateFromDelimitedBase64String with empty string", async function () {
    const delimitedString = "";
    const result: { result: IndexUtilizationInfo } = { result: IndexUtilizationInfo.Empty };

    const isParsed = IndexUtilizationInfo.tryCreateFromDelimitedBase64String(
      delimitedString,
      result,
    );

    assert.equal(isParsed, false);
    assert.equal(result.result, IndexUtilizationInfo.Empty);
  });

  it("test createFromString with empty string", async function () {
    const delimitedString = "";
    const result = IndexUtilizationInfo.createFromString(delimitedString, true);

    assert.equal(result, IndexUtilizationInfo.Empty);
  });

  it("test createFromString with invalid string", async function () {
    const delimitedString = "invalid";

    const result = IndexUtilizationInfo.createFromString(delimitedString, true);

    assert.equal(result, IndexUtilizationInfo.Empty);
  });

  it("test createFromString with valid string", async function () {
    const delimitedString =
      "eyJVdGlsaXplZFNpbmdsZUluZGV4ZXMiOlt7IkZpbHRlckV4cHJlc3Npb24iOiIiLCJJbmRleFNwZWMiOiJcL25hbWVcLz8iLCJGaWx0ZXJQcmVjaXNlU2V0Ijp0cnVlLCJJbmRleFByZWNpc2VTZXQiOnRydWUsIkluZGV4SW1wYWN0U2NvcmUiOiJIaWdoIn1dLCJQb3RlbnRpYWxTaW5nbGVJbmRleGVzIjpbXSwiVXRpbGl6ZWRDb21wb3NpdGVJbmRleGVzIjpbXSwiUG90ZW50aWFsQ29tcG9zaXRlSW5kZXhlcyI6W119";

    const result = IndexUtilizationInfo.createFromString(delimitedString, true);

    assert.equal(result.UtilizedSingleIndexes.length, 1);
    assert.equal(result.UtilizedSingleIndexes[0].IndexSpec, "/name/?");
    assert.equal(result.UtilizedSingleIndexes[0].IndexImpactScore, "High");
  });
});
