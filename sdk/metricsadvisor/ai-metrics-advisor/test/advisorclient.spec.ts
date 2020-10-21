// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import * as dotenv from "dotenv";
dotenv.config();

import {
  MetricAnomalyFeedback,
  MetricChangePointFeedback,
  MetricCommentFeedback,
  MetricPeriodFeedback,
  MetricsAdvisorClient,
  MetricsAdvisorKeyCredential
} from "../src";
import { createRecordedAdvisorClient, testEnv } from "./util/recordedClients";
import { Recorder } from "@azure/test-utils-recorder";

describe("MetricsAdvisorClient", () => {
  let client: MetricsAdvisorClient;
  let recorder: Recorder;
  const apiKey = new MetricsAdvisorKeyCredential(
    testEnv.METRICS_ADVISOR_SUBSCRIPTION_KEY,
    testEnv.METRICS_ADVISOR_API_KEY
  );

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ recorder, client } = createRecordedAdvisorClient(this, apiKey));
  });

  afterEach(async function() {
    if (recorder) {
      recorder.stop();
    }
  });

  it("listAnomaliesForDetectionConfiguration()", async function() {
    const iterator = client.listAnomaliesForDetectionConfiguration(
      testEnv.METRICS_ADVISOR_AZURE_BLOB_DETECTION_CONFIG_ID,
      new Date(Date.UTC(2020, 7, 5)),
      new Date(Date.UTC(2020, 8, 5))
    );
    let result = await iterator.next();
    assert.ok(result.value.seriesKey, "Expecting first anomaly");
    result = await iterator.next();
    assert.ok(result.value.seriesKey, "Expecting second anomaly");
  });

  it("listAnomaliesForDetectionConfiguration() by page", async function() {
    const iterator = client
      .listAnomaliesForDetectionConfiguration(
        testEnv.METRICS_ADVISOR_AZURE_BLOB_DETECTION_CONFIG_ID,
        new Date(Date.UTC(2020, 7, 5)),
        new Date(Date.UTC(2020, 8, 5))
      )
      .byPage({ maxPageSize: 2 });
    let result = await iterator.next();
    assert.equal(result.value.anomalies.length, 2, "Expecting two anomalies in first page");
    result = await iterator.next();
    assert.equal(result.value.anomalies.length, 2, "Expecting two anomalies in second page");
  });

  it("listIncidentsForDetectionConfiguration()", async function() {
    const iterator = client.listIncidentsForDetectionConfiguration(
      testEnv.METRICS_ADVISOR_AZURE_BLOB_DETECTION_CONFIG_ID,
      new Date(Date.UTC(2020, 7, 5)),
      new Date(Date.UTC(2020, 8, 5))
    );
    let result = await iterator.next();
    assert.ok(result.value.rootDimensionKey, "Expecting first incident");
    result = await iterator.next();
    assert.ok(result.value.rootDimensionKey, "Expecting second incident");
  });

  it("listIncidentsForDetectionConfiguration() by page", async function() {
    const iterator = client
      .listIncidentsForDetectionConfiguration(
        testEnv.METRICS_ADVISOR_AZURE_BLOB_DETECTION_CONFIG_ID,
        new Date(Date.UTC(2020, 7, 5)),
        new Date(Date.UTC(2020, 8, 5))
      )
      .byPage({ maxPageSize: 2 });
    let result = await iterator.next();
    assert.equal(result.value.incidents.length, 2, "Expecting two incidents in first page");
    result = await iterator.next();
    assert.equal(result.value.incidents.length, 2, "Expecting two incidents in second page");
  });

  it("listDimensionValuesForDetectionConfiguration()", async function() {
    const iterator = client.listDimensionValuesForDetectionConfiguration(
      testEnv.METRICS_ADVISOR_AZURE_BLOB_DETECTION_CONFIG_ID,
      new Date(Date.UTC(2020, 7, 5)),
      new Date(Date.UTC(2020, 8, 5)),
      "Dim1"
    );
    let result = await iterator.next();
    assert.ok(result.value, "Expecting first dimension value");
    result = await iterator.next();
    assert.ok(result.value, "Expecting second dimension value");
  });

  it("listDimensionValuesForDetectionConfiguration() by page", async function() {
    const iterator = client
      .listDimensionValuesForDetectionConfiguration(
        testEnv.METRICS_ADVISOR_AZURE_BLOB_DETECTION_CONFIG_ID,
        new Date(Date.UTC(2020, 7, 5)),
        new Date(Date.UTC(2020, 8, 5)),
        "Dim1"
      )
      .byPage({ maxPageSize: 2 });
    let result = await iterator.next();
    assert.equal(
      result.value.dimensionValues.length,
      2,
      "Expecting two dimension values in first page"
    );
    result = await iterator.next();
    assert.equal(
      result.value.dimensionValues.length,
      2,
      "Expecting two dimension values in second page"
    );
  });

  it("lists alerts for alert configuration", async function() {
    const iterator = client.listAlertsForAlertConfiguration(
      testEnv.METRICS_ADVISOR_ALERT_CONFIG_ID,
      new Date(Date.UTC(2020, 0, 1)),
      new Date(Date.UTC(2020, 8, 12)),
      "AnomalyTime"
    );
    let result = await iterator.next();
    assert.ok(result.value.id, "Expecting first alert");
    result = await iterator.next();
    assert.ok(result.value.id, "Expecting second alert");
  });

  it("lists alerts for alert configuration by page", async function() {
    const iterator = client
      .listAlertsForAlertConfiguration(
        testEnv.METRICS_ADVISOR_ALERT_CONFIG_ID,
        new Date(Date.UTC(2020, 0, 1)),
        new Date(Date.UTC(2020, 8, 12)),
        "AnomalyTime"
      )
      .byPage({ maxPageSize: 2 });
    let result = await iterator.next();
    assert.equal(result.value.alerts.length, 2, "Expecting two alerts in first page");
    result = await iterator.next();
    assert.equal(result.value.alerts.length, 2, "Expecting two alerts in second page");
  });

  it("lists anomalies for alert", async function() {
    const iterator = client.listAnomaliesForAlert(
      testEnv.METRICS_ADVISOR_ALERT_CONFIG_ID,
      testEnv.METRICS_ADVISOR_ALERT_ID
    );
    let result = await iterator.next();
    assert.ok(result.value.seriesKey, "Expecting first anomaly");
    result = await iterator.next();
    assert.ok(result.value.seriesKey, "Expecting second anomaly");
  });

  it("lists anomalies for alert by page", async function() {
    const iterator = client
      .listAnomaliesForAlert(
        testEnv.METRICS_ADVISOR_ALERT_CONFIG_ID,
        testEnv.METRICS_ADVISOR_ALERT_ID
      )
      .byPage({ maxPageSize: 2 });
    let result = await iterator.next();
    assert.equal(result.value.anomalies.length, 2, "Expecting two anomalies in first page");
    result = await iterator.next();
    assert.equal(result.value.anomalies.length, 2, "Expecting two anomalies in second page");
  });

  it("lists incidents for alert", async function() {
    const iterator = client.listIncidentsForAlert(
      testEnv.METRICS_ADVISOR_ALERT_CONFIG_ID,
      testEnv.METRICS_ADVISOR_ALERT_ID
    );
    let result = await iterator.next();
    assert.ok(result.value.id, "Expecting first incident");
    result = await iterator.next();
    assert.ok(result.value.id, "Expecting second incident");
  });

  it("lists incidents for alert by page", async function() {
    const iterator = client
      .listIncidentsForAlert(
        testEnv.METRICS_ADVISOR_ALERT_CONFIG_ID,
        testEnv.METRICS_ADVISOR_ALERT_ID
      )
      .byPage({ maxPageSize: 2 });
    let result = await iterator.next();
    assert.equal(result.value.incidents.length, 2, "Expecting two incidents in first page");
    result = await iterator.next();
    assert.equal(result.value.incidents.length, 2, "Expecting two incidents in second page");
  });

  it("listMetricSeriesDefinitions()", async function() {
    const iterator = client.listMetricSeriesDefinitions(
      testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
      new Date(Date.UTC(2020, 7, 5))
    );
    let result = await iterator.next();
    assert.ok(result.value.dimension, "Expecting first definition");
    result = await iterator.next();
    assert.ok(result.value.dimension, "Expecting second definition");
  });

  it("listMetricSeriesDefinitions() by page", async function() {
    const iterator = client
      .listMetricSeriesDefinitions(
        testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
        new Date(Date.UTC(2020, 7, 5))
      )
      .byPage({ maxPageSize: 2 });
    let result = await iterator.next();
    assert.equal(result.value.definitions.length, 2, "Expecting two definitions in first page");
    result = await iterator.next();
    assert.equal(result.value.definitions.length, 2, "Expecting two definitions in second page");
  });

  it("listMetricDimensionValues()", async function() {
    const iterator = client.listMetricDimensionValues(
      testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
      "Dim1"
    );
    let result = await iterator.next();
    assert.ok(result.value, "Expecting first dimension value");
    result = await iterator.next();
    assert.ok(result.value, "Expecting second dimension value");
  });

  it("listMetricDimensionValues() by page", async function() {
    const iterator = client
      .listMetricDimensionValues(testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1, "Dim1")
      .byPage({ maxPageSize: 2 });
    let result = await iterator.next();
    assert.equal(
      result.value.dimensionValues.length,
      2,
      "Expecting two dimension values in first page"
    );
    result = await iterator.next();
    assert.equal(
      result.value.dimensionValues.length,
      2,
      "Expecting two dimension values in second page"
    );
  });

  it("lists series data for a metric", async function() {
    const data = await client.getMetricSeriesData(
      testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
      new Date(Date.UTC(2020, 7, 5)),
      new Date(Date.UTC(2020, 8, 5)),
      [
        { dimension: { Dim1: "Common Lime", Dim2: "Amphibian" } },
        { dimension: { Dim1: "Common Beech", Dim2: "Ant" } }
      ]
    );
    assert.ok(
      data.metricSeriesDataList && data.metricSeriesDataList!.length === 2,
      "Expecting data for two time series"
    );
    assert.equal(
      data.metricSeriesDataList![0].definition.metricId,
      testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1
    );
    assert.deepStrictEqual(data.metricSeriesDataList![0].definition.dimension, {
      Dim1: "Common Lime",
      Dim2: "Amphibian"
    });

    assert.ok(
      data.metricSeriesDataList![0].timestamps &&
        data.metricSeriesDataList![0].timestamps.length > 0 &&
        data.metricSeriesDataList![0].values &&
        data.metricSeriesDataList![0].values.length > 0,
      "Expecting data for the first time series"
    );

    assert.equal(
      data.metricSeriesDataList![1].definition.metricId,
      testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1
    );
    assert.deepStrictEqual(data.metricSeriesDataList![1].definition.dimension, {
      Dim1: "Common Beech",
      Dim2: "Ant"
    });

    assert.ok(
      data.metricSeriesDataList![1].timestamps &&
        data.metricSeriesDataList![1].timestamps.length > 0 &&
        data.metricSeriesDataList![1].values &&
        data.metricSeriesDataList![1].values.length > 0,
      "Expecting data for the second time series"
    );
  });

  it("list enriched data for a detection configuration", async function() {
    const data = await client.getMetricEnrichedSeriesData(
      testEnv.METRICS_ADVISOR_AZURE_BLOB_DETECTION_CONFIG_ID,
      new Date(Date.UTC(2020, 7, 1)),
      new Date(Date.UTC(2020, 7, 27)),
      [
        { dimension: { Dim1: "Common Lime", Dim2: "Amphibian" } },
        { dimension: { Dim1: "Common Beech", Dim2: "Ant" } }
      ]
    );
    assert.ok(data.results && data.results!.length === 2, "Expecting data for two time series");

    assert.deepStrictEqual(data.results![0].series.dimension, {
      Dim1: "Common Lime",
      Dim2: "Amphibian"
    });

    assert.ok(
      data.results![0].timestamps &&
        data.results![0].timestamps.length > 0 &&
        data.results![0].values &&
        data.results![0].values.length > 0 &&
        data.results![0].isAnomaly &&
        data.results![0].isAnomaly.length > 0,
      "Expecting enriched data for the first time series"
    );

    assert.deepStrictEqual(data.results![1].series.dimension, {
      Dim1: "Common Beech",
      Dim2: "Ant"
    });

    assert.ok(
      data.results![1].timestamps &&
        data.results![1].timestamps.length > 0 &&
        data.results![1].values &&
        data.results![1].values.length > 0 &&
        data.results![0].isAnomaly &&
        data.results![0].isAnomaly.length > 0,
      "Expecting enriched data for the second time series"
    );
  });

  it("list metric enrichment status", async function() {
    const iterator = client.listMetricEnrichmentStatus(
      testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
      new Date(Date.UTC(2020, 0, 1)),
      new Date(Date.UTC(2020, 8, 18))
    );
    let result = await iterator.next();
    assert.ok(result.value.status, "Expecting first status");
    result = await iterator.next();
    assert.ok(result.value.status, "Expecting second status");
  });

  it("list metric enrichment status by page", async function() {
    const iterator = client
      .listMetricEnrichmentStatus(
        testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
        new Date(Date.UTC(2020, 0, 1)),
        new Date(Date.UTC(2020, 8, 18))
      )
      .byPage({ maxPageSize: 2 });
    let result = await iterator.next();
    assert.equal(result.value.statusList.length, 2, "Expecting two results in first page");
    result = await iterator.next();
    assert.equal(result.value.statusList.length, 2, "Expecting two results in second page");
  });

  it("gets root causes of an incident", async function() {
    const result = await client.getIncidentRootCauses(
      testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_CONFIG_ID,
      testEnv.METRICS_ADVISOR_AZURE_SQLSERVER_DETECTION_INCIDENT_ID
    );

    assert.ok(
      result.rootCauses && result.rootCauses.length > 0,
      "Expecting non empty root cause list"
    );
    const first = result.rootCauses[0];
    assert.deepStrictEqual(first.path, ["city"]);
    assert.ok(first.score, "Expecting score");
    assert.equal(
      first.description,
      "Decrease on category = Home & Garden | city = Karachi contributes the most to current incident."
    );
  });

  describe("Feedback", async function() {
    let createdFeedbackId: string;
    it("creates Anomaly feedback", async function() {
      const anomalyFeedback: MetricAnomalyFeedback = {
        metricId: testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
        feedbackType: "Anomaly",
        startTime: new Date(Date.UTC(2020, 7, 5)),
        endTime: new Date(Date.UTC(2020, 7, 7)),
        value: "NotAnomaly",
        dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Ant" } }
      };
      const actual = await client.createMetricFeedback(anomalyFeedback);

      assert.ok(actual.id, "Expecting valid feedback");
      createdFeedbackId = actual.id!;
      assert.equal(actual.feedbackType, "Anomaly");
      if (actual.feedbackType === "Anomaly") {
        assert.equal(actual.value, anomalyFeedback.value);
      }
    });

    it("creates ChangePoint feedback", async function() {
      const changePointFeedback: MetricChangePointFeedback = {
        metricId: testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
        feedbackType: "ChangePoint",
        startTime: new Date(Date.UTC(2020, 7, 5)),
        value: "ChangePoint",
        dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Ant" } }
      };
      const actual = await client.createMetricFeedback(changePointFeedback);

      assert.ok(actual.id, "Expecting valid feedback");
      createdFeedbackId = actual.id!;
      assert.equal(actual.feedbackType, "ChangePoint");
      if (actual.feedbackType === "ChangePoint") {
        assert.equal(actual.value, changePointFeedback.value);
      }
    });

    it("creates Period feedback", async function() {
      const periodFeedback: MetricPeriodFeedback = {
        metricId: testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
        feedbackType: "Period",
        periodType: "AutoDetect",
        periodValue: 4,
        dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Ant" } }
      };
      const actual = await client.createMetricFeedback(periodFeedback);

      assert.ok(actual.id, "Expecting valid feedback");
      createdFeedbackId = actual.id!;
      assert.equal(actual.feedbackType, "Period");
      if (actual.feedbackType === "Period") {
        assert.equal(actual.periodType, periodFeedback.periodType);
        assert.equal(actual.periodValue, periodFeedback.periodValue);
      }
    });

    it("creates Comment feedback", async function() {
      const expectedCommentFeedback: MetricCommentFeedback = {
        metricId: testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1,
        feedbackType: "Comment",
        dimensionFilter: { dimension: { Dim1: "Common Lime", Dim2: "Amphibian" } },
        comment: "This is a comment"
      };

      const actual = await client.createMetricFeedback(expectedCommentFeedback);

      assert.ok(actual.id, "Expecting valid feedback");
      createdFeedbackId = actual.id!;
      assert.equal(actual.feedbackType, "Comment");
      if (actual.feedbackType === "Comment") {
        assert.equal(actual.comment, expectedCommentFeedback.comment);
      }
    });

    it("retrieves Anomaly feedback", async function() {
      const actual = await client.getMetricFeedback(createdFeedbackId);

      assert.ok(actual.id, "Expecting valid feedback");
      createdFeedbackId = actual.id!;
      assert.equal(actual.feedbackType, "Comment");
      if (actual.feedbackType === "Comment") {
        assert.equal(actual.comment, "This is a comment");
      }
    });

    // service issue, skipping for now
    it.skip("lists Anomaly feedbacks", async function() {
      const iterator = client.listMetricFeedbacks(testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1, {
        filter: {
          timeMode: "FeedbackCreatedTime"
        }
      });
      let result = await iterator.next();
      assert.ok(result.value.id, "Expecting first status");
      result = await iterator.next();
      assert.ok(result.value.id, "Expecting second status");
    });

    it("lists Anomaly feedbacks by page", async function() {
      const iterator = client
        .listMetricFeedbacks(testEnv.METRICS_ADVISOR_AZURE_BLOB_METRIC_ID_1)
        .byPage({ maxPageSize: 2 });
      let result = await iterator.next();
      assert.equal(result.value.feedbacks.length, 2, "Expecting two entries in first page");
      result = await iterator.next();
      assert.equal(result.value.feedbacks.length, 2, "Expecting two entries in second page");
    });
  });
}).timeout(60000);
