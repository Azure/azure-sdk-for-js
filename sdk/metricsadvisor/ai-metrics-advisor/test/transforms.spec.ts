// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-use-before-define */
import { assert } from "chai";

import {
  AnomalyDetectionConfiguration as ServiceAnomalyDetectionConfiguration,
  AnomalyFeedback as ServiceAnomalyFeedback,
  ChangePointFeedback as ServiceChangePointFeedback,
  CommentFeedback as ServiceCommentFeedback,
  PeriodFeedback as ServicePeriodFeedback,
  WholeMetricConfiguration as ServiceWholeMetricConfiguration
} from "../src/generated/models";
import { MetricDetectionCondition } from "../src/models";
import {
  fromServiceAnomalyDetectionConfiguration,
  fromServiceMetricFeedbackUnion
} from "../src/transforms";

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
          minRatio: 10
        }
      },
      smartDetectionCondition: {
        sensitivity: 30,
        anomalyDetectorDirection: "Both",
        suppressCondition: {
          minNumber: 120,
          minRatio: 20
        }
      },
      changeThresholdCondition: {
        changePercentage: 400,
        shiftPoint: 4,
        withinRange: true,
        anomalyDetectorDirection: "Both",
        suppressCondition: {
          minNumber: 140,
          minRatio: 40
        }
      }
    };

    const original: ServiceAnomalyDetectionConfiguration = {
      anomalyDetectionConfigurationId: "detectionConfigId",
      name: "detection config",
      description: "detection config description",
      metricId: "detection config metric id",
      wholeMetricConfiguration: wholeConfig
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
    dimensionFilter: { city: "Redmond" }
  };

  it("fromServiceMetricFeedbackUnion() - AnomalyFeedback", () => {
    const anomalyFeedback: ServiceAnomalyFeedback = {
      ...feedbackCommon,
      feedbackType: "Anomaly",
      startTime: new Date("08/05/2020"),
      endTime: new Date("08/06/2020"),
      value: { anomalyValue: "NotAnomaly" }
    };

    const actual = fromServiceMetricFeedbackUnion(anomalyFeedback);

    assert.equal(actual.id, feedbackCommon.feedbackId);
    assert.equal(actual.createdTime, feedbackCommon.createdTime);
    assert.equal(actual.userPrincipal, feedbackCommon.userPrincipal);
    assert.equal(actual.dimensionFilter, feedbackCommon.dimensionFilter);
    assert.equal(actual.feedbackType, "Anomaly");
    if (actual.feedbackType === "Anomaly") {
      assert.equal(actual.startTime, anomalyFeedback.startTime);
      assert.equal(actual.endTime, anomalyFeedback.endTime);
      assert.equal(actual.value, anomalyFeedback.value.anomalyValue);
      assert.equal(actual.metricId, anomalyFeedback.metricId);
      assert.deepStrictEqual(actual.anomalyDetectionConfigurationSnapshot, undefined);
    }
  });

  it("fromServiceMetricFeedbackUnion() - AnomalyFeedback", () => {
    const feedback: ServiceAnomalyFeedback = {
      ...feedbackCommon,
      feedbackType: "Anomaly",
      startTime: new Date("08/05/2020"),
      endTime: new Date("08/06/2020"),
      value: { anomalyValue: "NotAnomaly" }
    };

    const actual = fromServiceMetricFeedbackUnion(feedback);

    assert.equal(actual.id, feedbackCommon.feedbackId);
    assert.equal(actual.feedbackType, "Anomaly");
    if (actual.feedbackType === "Anomaly") {
      assert.equal(actual.startTime, feedback.startTime);
      assert.equal(actual.endTime, feedback.endTime);
      assert.equal(actual.value, feedback.value.anomalyValue);
      assert.equal(actual.metricId, feedback.metricId);
      assert.deepStrictEqual(actual.anomalyDetectionConfigurationSnapshot, undefined);
    }
  });

  it("fromServiceMetricFeedbackUnion() - AnomalyFeedback", () => {
    const feedback: ServiceChangePointFeedback = {
      ...feedbackCommon,
      feedbackType: "ChangePoint",
      startTime: new Date("08/05/2020"),
      value: { anomalyValue: "NotAnomaly" }
    };

    const actual = fromServiceMetricFeedbackUnion(feedback);

    assert.equal(actual.id, feedbackCommon.feedbackId);
    assert.equal(actual.feedbackType, "ChangePoint");
    if (actual.feedbackType === "ChangePoint") {
      assert.equal(actual.startTime, feedback.startTime);
      assert.equal(actual.value, feedback.value.changePointValue);
      assert.equal(actual.metricId, feedback.metricId);
    }
  });

  it("fromServiceMetricFeedbackUnion() - CommentFeedback", () => {
    const feedback: ServiceCommentFeedback = {
      ...feedbackCommon,
      feedbackType: "Comment",
      startTime: new Date("08/05/2020"),
      endTime: new Date("08/06/2020"),
      value: { commentValue: "NotAnomaly" }
    };

    const actual = fromServiceMetricFeedbackUnion(feedback);

    assert.equal(actual.id, feedbackCommon.feedbackId);
    assert.equal(actual.feedbackType, "Comment");
    if (actual.feedbackType === "Comment") {
      assert.equal(actual.startTime, feedback.startTime);
      assert.equal(actual.endTime, feedback.endTime);
      assert.equal(actual.comment, feedback.value.commentValue);
      assert.equal(actual.metricId, feedback.metricId);
    }
  });

  it("fromServiceMetricFeedbackUnion() - PeriodFeedback", () => {
    const feedback: ServicePeriodFeedback = {
      ...feedbackCommon,
      feedbackType: "Period",
      startTime: new Date("08/05/2020"),
      endTime: new Date("08/06/2020"),
      value: { periodType: "AssignValue", periodValue: 3 }
    };

    const actual = fromServiceMetricFeedbackUnion(feedback);

    assert.equal(actual.id, feedbackCommon.feedbackId);
    assert.equal(actual.feedbackType, "Period");
    if (actual.feedbackType === "Period") {
      assert.equal(actual.periodType, feedback.value.periodType);
      assert.equal(actual.periodValue, feedback.value.periodValue);
      assert.equal(actual.metricId, feedback.metricId);
    }
  });
});
