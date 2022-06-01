// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import {
  AnomalyDetectionConfiguration as ServiceAnomalyDetectionConfiguration,
  AnomalyFeedback as ServiceAnomalyFeedback,
  DataFeedDetailUnion as ServiceDataFeedDetailUnion,
  Granularity as ServiceGranularity,
  ChangePointFeedback as ServiceChangePointFeedback,
  CommentFeedback as ServiceCommentFeedback,
  PeriodFeedback as ServicePeriodFeedback,
  WholeMetricConfiguration as ServiceWholeMetricConfiguration,
} from "../../src/generated/models";
import {
  AzureBlobDataFeedSource,
  DataFeedGranularity,
  MetricDetectionCondition,
} from "../../src/models";
import {
  fromServiceAnomalyDetectionConfiguration,
  fromServiceDataFeedDetailUnion,
  fromServiceMetricFeedbackUnion,
  toServiceGranularity,
} from "../../src/transforms";

describe("Transforms", () => {
  it("fromServiceWholeMetricConfiguration()", () => {
    const wholeConfig: ServiceWholeMetricConfiguration = {
      conditionOperator: "AND",
      hardThresholdCondition: {
        anomalyDetectorDirection: "Up",
        lowerBound: 100,
        upperBound: 200,
        suppressCondition: {
          minNumber: 110,
          minRatio: 10,
        },
      },
      smartDetectionCondition: {
        sensitivity: 30,
        anomalyDetectorDirection: "Both",
        suppressCondition: {
          minNumber: 120,
          minRatio: 20,
        },
      },
      changeThresholdCondition: {
        changePercentage: 400,
        shiftPoint: 4,
        withinRange: true,
        anomalyDetectorDirection: "Both",
        suppressCondition: {
          minNumber: 140,
          minRatio: 40,
        },
      },
    };

    const original: ServiceAnomalyDetectionConfiguration = {
      anomalyDetectionConfigurationId: "detectionConfigId",
      name: "detection config",
      description: "detection config description",
      metricId: "detection config metric id",
      wholeMetricConfiguration: wholeConfig,
    };

    const actual = fromServiceAnomalyDetectionConfiguration(original);

    assert.equal(actual.id, original.anomalyDetectionConfigurationId);
    assert.deepStrictEqual(
      actual.wholeSeriesDetectionCondition,
      original.wholeMetricConfiguration as MetricDetectionCondition
    );
  });

  const feedbackCommon: any = {
    feedbackId: "feedbackId",
    createdTime: new Date("08/04/2020"),
    userPrincipal: "user1@example.com",
    metricId: "metricId",
    dimensionFilter: { dimension: { city: "Redmond" } },
  };

  it("fromServiceMetricFeedbackUnion() - AnomalyFeedback", () => {
    const anomalyFeedback: ServiceAnomalyFeedback = {
      ...feedbackCommon,
      feedbackType: "Anomaly",
      startTime: new Date("08/05/2020"),
      endTime: new Date("08/06/2020"),
      value: { anomalyValue: "NotAnomaly" },
    };

    const actual = fromServiceMetricFeedbackUnion(anomalyFeedback);

    assert.equal(actual.id, feedbackCommon.feedbackId);
    assert.equal(actual.createdOn, feedbackCommon.createdTime);
    assert.equal(actual.userPrincipal, feedbackCommon.userPrincipal);
    assert.equal(actual.dimensionKey, feedbackCommon.dimensionFilter.dimension);
    assert.equal(actual.feedbackType, "Anomaly");
    if (actual.feedbackType === "Anomaly") {
      assert.equal(actual.startTime, anomalyFeedback.startTime);
      assert.equal(actual.endTime, anomalyFeedback.endTime);
      assert.equal(actual.value, anomalyFeedback.value?.anomalyValue);
      assert.equal(actual.metricId, anomalyFeedback.metricId);
      assert.deepStrictEqual(actual.anomalyDetectionConfigurationSnapshot, undefined);
    }
  });

  it("fromServiceMetricFeedbackUnion() - ChangePointFeedback", () => {
    const feedback: ServiceChangePointFeedback = {
      ...feedbackCommon,
      feedbackType: "ChangePoint",
      startTime: new Date("08/05/2020"),
      value: { changePointValue: "NotChangePoint" },
    };

    const actual = fromServiceMetricFeedbackUnion(feedback);

    assert.equal(actual.id, feedbackCommon.feedbackId);
    assert.equal(actual.feedbackType, "ChangePoint");
    if (actual.feedbackType === "ChangePoint") {
      assert.equal(actual.startTime, feedback.startTime);
      assert.equal(actual.value, feedback.value?.changePointValue);
      assert.equal(actual.metricId, feedback.metricId);
    }
  });

  it("fromServiceMetricFeedbackUnion() - CommentFeedback", () => {
    const feedback: ServiceCommentFeedback = {
      ...feedbackCommon,
      feedbackType: "Comment",
      startTime: new Date("08/05/2020"),
      endTime: new Date("08/06/2020"),
      value: { commentValue: "NotAnomaly" },
    };

    const actual = fromServiceMetricFeedbackUnion(feedback);

    assert.equal(actual.id, feedbackCommon.feedbackId);
    assert.equal(actual.feedbackType, "Comment");
    if (actual.feedbackType === "Comment") {
      assert.equal(actual.startTime, feedback.startTime);
      assert.equal(actual.endTime, feedback.endTime);
      assert.equal(actual.comment, feedback.value?.commentValue);
      assert.equal(actual.metricId, feedback.metricId);
    }
  });

  it("fromServiceMetricFeedbackUnion() - PeriodFeedback", () => {
    const feedback: ServicePeriodFeedback = {
      ...feedbackCommon,
      feedbackType: "Period",
      startTime: new Date("08/05/2020"),
      endTime: new Date("08/06/2020"),
      value: { periodType: "AssignValue", periodValue: 3 },
    };

    const actual = fromServiceMetricFeedbackUnion(feedback);

    assert.equal(actual.id, feedbackCommon.feedbackId);
    assert.equal(actual.feedbackType, "Period");
    if (actual.feedbackType === "Period") {
      assert.equal(actual.periodType, feedback.value?.periodType);
      assert.equal(actual.periodValue, feedback.value?.periodValue);
      assert.equal(actual.metricId, feedback.metricId);
    }
  });

  it("fromServiceDataFeedDetailUnion()", () => {
    const serviceDataFeed: ServiceDataFeedDetailUnion = {
      dataSourceType: "AzureBlob",
      dataSourceParameter: {
        connectionString: "https://connectionString",
        blobTemplate: "%Y/%m/%d/%h/JsonFormatV2.json",
        container: "thisContainer",
      },
      authenticationType: "ManagedIdentity",
      dataFeedName: "name",
      metrics: [{ name: "m1", id: "m-id1", displayName: "m1 display" }],
      dimension: [{ name: "d1", displayName: "d1 display" }],
      granularityName: "Daily",
      dataStartFrom: new Date(Date.UTC(2020, 9, 1)),
    };

    const actual = fromServiceDataFeedDetailUnion(serviceDataFeed);
    const actualSource = actual.source as AzureBlobDataFeedSource;
    assert.strictEqual(actualSource.authenticationType, serviceDataFeed.authenticationType);
    assert.strictEqual(actualSource.blobTemplate, serviceDataFeed.dataSourceParameter.blobTemplate);
    assert.strictEqual(
      actualSource.connectionString,
      serviceDataFeed.dataSourceParameter.connectionString
    );
    assert.strictEqual(actualSource.container, serviceDataFeed.dataSourceParameter.container);
    assert.strictEqual(actual.name, serviceDataFeed.dataFeedName);
    assert.deepStrictEqual(actual.schema.dimensions, serviceDataFeed.dimension);
    assert.deepStrictEqual(actual.schema.metrics, serviceDataFeed.metrics);
    assert.strictEqual(actual.source.dataSourceType, serviceDataFeed.dataSourceType);
  });

  it("fromServiceDataFeedDetailUnion() for future data source types", () => {
    const serviceDataFeed: ServiceDataFeedDetailUnion = {
      dataSourceType: "Future Source" as any,
      dataSourceParameter: { futureConnectionString: "xyz", futureQuery: "someQuery" } as any,
      dataFeedName: "name",
      metrics: [{ name: "m1", id: "m-id1", displayName: "m1 display" }],
      dimension: [{ name: "d1", displayName: "d1 display" }],
      granularityName: "Daily",
      dataStartFrom: new Date(Date.UTC(2020, 9, 1)),
    };

    const actual = fromServiceDataFeedDetailUnion(serviceDataFeed);
    assert.strictEqual(actual.source.dataSourceType, "Unknown");
  });

  [
    { original: "Yearly", expected: "Yearly" },
    { original: "Daily", expected: "Daily" },
    { original: "Minutely", expected: "PerMinute" },
  ].forEach((granularity) => {
    it(`fromServiceDataFeedDetailUnion() on granularity ${granularity.original}`, () => {
      const serviceDataFeed: ServiceDataFeedDetailUnion = {
        dataSourceType: "AzureBlob",
        dataFeedName: "name",
        metrics: [{ name: "m1", id: "m-id1", displayName: "m1 display" }],
        dimension: [{ name: "d1", displayName: "d1 display" }],
        granularityName: granularity.original as ServiceGranularity,
        dataStartFrom: new Date(Date.UTC(2020, 9, 1)),
        dataSourceParameter: {
          connectionString: "https://connectionString",
          blobTemplate: "%Y/%m/%d/%h/JsonFormatV2.json",
          container: "thisContainer",
        },
        authenticationType: "ManagedIdentity",
      };

      const actual = fromServiceDataFeedDetailUnion(serviceDataFeed);
      assert.deepStrictEqual(actual.granularity, {
        granularityType: granularity.expected,
      } as DataFeedGranularity);
    });
  });

  [
    { original: "Yearly", expected: "Yearly" },
    { original: "Daily", expected: "Daily" },
    { original: "PerMinute", expected: "Minutely" },
  ].forEach((granularity) => {
    it(`toServiceGranularity() on granularity ${granularity.original}`, () => {
      const from = {
        granularityType: granularity.original,
      } as DataFeedGranularity;

      const actual = toServiceGranularity(from);

      assert.strictEqual(actual.granularityName, granularity.expected);
    });
  });
});
