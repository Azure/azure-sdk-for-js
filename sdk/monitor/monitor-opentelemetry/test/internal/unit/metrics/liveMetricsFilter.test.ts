// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as assert from "assert";
import {
  DerivedMetricInfo,
  FilterConjunctionGroupInfo,
  FilterInfo,
  KnownPredicateType,
  KnownTelemetryType,
} from "../../../../src/generated";
import {
  Validator,
  TelemetryTypeError,
  UnexpectedFilterCreateError,
  KnownRequestColumns,
} from "../../../../src/metrics/quickpulse/filtering";

describe("Live Metrics filtering - Validator", () => {
  // "x-ms-qps-configuration-etag"

  it("The validator rejects the invalid telemetry types", () => {
    let invalid1: DerivedMetricInfo = {
      id: "random-id1",
      telemetryType: "Event",
      filterGroups: [],
      projection: "Message",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    let invalid2: DerivedMetricInfo = {
      id: "random-id2",
      telemetryType: "PerformanceCounter",
      filterGroups: [],
      projection: "\\Random\\Counter",
      aggregation: "Avg",
      backEndAggregation: "Avg",
    };

    let invalid3: DerivedMetricInfo = {
      id: "random-id3",
      telemetryType: "Metric",
      filterGroups: [],
      projection: "otel.random.metric",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    let invalid4: DerivedMetricInfo = {
      id: "random-id4",
      telemetryType: "does not exist",
      filterGroups: [],
      projection: "Message",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    assert.throws(() => Validator.validateTelemetryType(invalid1), TelemetryTypeError);
    assert.throws(() => Validator.validateTelemetryType(invalid2), TelemetryTypeError);
    assert.throws(() => Validator.validateTelemetryType(invalid3), TelemetryTypeError);
    assert.throws(() => Validator.validateTelemetryType(invalid4), TelemetryTypeError);

  });

  it("The validator rejects CustomMetrics projections and filters (not supported in Otel)", () => {
    let invalid1: DerivedMetricInfo = {
      id: "random-id1",
      telemetryType: "Request",
      filterGroups: [],
      projection: "CustomMetrics.property",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    let conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [
        { fieldName: "CustomMetrics.property", predicate: KnownPredicateType.Equal, comparand: "5" },
      ]
    };

    let invalid2: DerivedMetricInfo = {
      id: "random-id2",
      telemetryType: "Request",
      filterGroups: [conjunctionGroup],
      projection: "Message",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    assert.throws(() => Validator.checkCustomMetricProjection(invalid1), UnexpectedFilterCreateError);
    Validator.validateTelemetryType(invalid2); // this shouldn't throw an error as the telemetry type is supported
    assert.throws(() => Validator.validateFilters(invalid2), UnexpectedFilterCreateError);
  });

  it("The validator rejects invalid filters", () => {
    let emptyFilterName: FilterInfo = {
      fieldName: "",
      predicate: KnownPredicateType.Equal,
      comparand: "blah"
    };

    let emptyComparand: FilterInfo = {
      fieldName: "InvalidFieldName",
      predicate: KnownPredicateType.Equal,
      comparand: ""
    };

    let invalidAnyFieldPredicate: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Equal,
      comparand: "5"
    };

    let invalidStringFieldPredicate: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.LessThan,
      comparand: "hi"
    }

    let invalidStringFieldPredicate2: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.GreaterThan,
      comparand: "hi"
    }

    let invalidStringFieldPredicate3: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "hi"
    }

    let invalidStringFieldPredicate4: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "hi"
    }

    let invalidNumericFieldPredicate: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Contains,
      comparand: "5"
    }

    let invalidNumericFieldPredicate2: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "5"
    }

    let invalidNumericFieldComparand: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "hi"
    }

    let invalidDurationComparand: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: KnownPredicateType.NotEqual,
      comparand: "invalid timestamp"
    }

    let unknownFieldName: FilterInfo = {
      fieldName: "unknown field",
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    let filterInfoList: FilterInfo[] =
      [emptyFilterName, emptyComparand, invalidAnyFieldPredicate, invalidStringFieldPredicate, invalidStringFieldPredicate2,
        invalidStringFieldPredicate3, invalidStringFieldPredicate4, invalidNumericFieldPredicate, invalidNumericFieldPredicate2,
        invalidNumericFieldComparand, invalidDurationComparand];

    let derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    }

    filterInfoList.forEach(filter => {
      let conjunctionGroup: FilterConjunctionGroupInfo = {
        filters: [filter]
      };

      derivedMetricInfo.filterGroups = [conjunctionGroup];
      assert.throws(() => Validator.validateFilters(derivedMetricInfo), UnexpectedFilterCreateError || TelemetryTypeError);
    });

    derivedMetricInfo.filterGroups = [{ filters: [unknownFieldName] }];
    let supportedTelemetryTypes: KnownTelemetryType[] =
      [KnownTelemetryType.Request, KnownTelemetryType.Dependency, KnownTelemetryType.Exception, KnownTelemetryType.Trace];

    supportedTelemetryTypes.forEach(telemetryType => {
      derivedMetricInfo.telemetryType = telemetryType;
      assert.throws(() => Validator.validateFilters(derivedMetricInfo), UnexpectedFilterCreateError);
    });


  });

  it("The validator rejects an entire derivedMetricInfo if one out of multiple filters is invalid", () => {

  });

  // multiple filterconjuncitongroups?
  // custom dimensions





});
