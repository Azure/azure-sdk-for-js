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
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Equal,
      comparand: ""
    };

    let invalidAnyFieldEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Equal,
      comparand: "5"
    };

    let invalidAnyFieldNotEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.NotEqual,
      comparand: "5"
    };

    let invalidAnyFieldLessThan: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.LessThan,
      comparand: "5"
    };

    let invalidAnyFieldLessThanOrEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "5"
    };

    let invalidAnyFieldGreaterThan: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.GreaterThan,
      comparand: "5"
    };

    let invalidAnyFieldGreaterThanOrEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.GreaterThanOrEqual,
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

    let invalidCustomDimLess: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.LessThan,
      comparand: "hi"
    }

    let invalidCustomDimGreater: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.GreaterThan,
      comparand: "hi"
    }

    let invalidCustomDimGreaterThanOrEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "hi"
    }

    let invalidCustomDimLessThanOrEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
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

    let successLessThan: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.LessThan,
      comparand: "true"
    };

    let successLessThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "true"
    };

    let successFieldGreaterThan: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.GreaterThan,
      comparand: "true"
    };

    let successGreaterThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "true"
    };

    let successContains: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Contains,
      comparand: "true"
    };

    let successNotContain: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "true"
    };

    let invalidBool: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Equal,
      comparand: "hi"
    };

    let filterInfoList: FilterInfo[] =
      [emptyFilterName, emptyComparand, invalidAnyFieldEqual, invalidAnyFieldNotEqual, invalidAnyFieldLessThan, invalidAnyFieldLessThanOrEqual,
        invalidAnyFieldGreaterThan, invalidAnyFieldGreaterThanOrEqual, invalidStringFieldPredicate, invalidStringFieldPredicate2,
        invalidStringFieldPredicate3, invalidStringFieldPredicate4, invalidCustomDimGreater, invalidCustomDimGreaterThanOrEqual,
        invalidCustomDimLess, invalidCustomDimLessThanOrEqual, invalidNumericFieldPredicate, invalidNumericFieldPredicate2,
        invalidNumericFieldComparand, invalidDurationComparand, successLessThan, successLessThanOrEqual, successFieldGreaterThan,
        successGreaterThanOrEqual, successContains, successNotContain, invalidBool];

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

    let invalidFilter: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: KnownPredicateType.NotEqual,
      comparand: "invalid timestamp"
    }

    let validFilter: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "200"
    }

    let conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [validFilter, invalidFilter]
    };

    let derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    }

    assert.throws(() => Validator.validateFilters(derivedMetricInfo), UnexpectedFilterCreateError);
  });

  it("The validator accepts valid filters", () => {
    let anyFieldContains: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    let anyFieldDoesNotContain: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi"
    }

    let stringNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.NotEqual,
      comparand: "hi"
    }

    let stringEquals: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Equal,
      comparand: "hi"
    }

    let stringContain: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    let stringNotContain: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi"
    }

    let customDimNotEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.NotEqual,
      comparand: "hi"
    }

    let customDimEquals: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.Equal,
      comparand: "hi"
    }

    let customDimContain: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    let customDimNotContain: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi"
    }

    let numericEquals: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "5"
    }

    let numericNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.NotEqual,
      comparand: "5"
    }

    let numericLessThan: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.LessThan,
      comparand: "5"
    }

    let numericGreaterThan: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.GreaterThan,
      comparand: "5"
    }

    let numericLessThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "5"
    }

    let numericGreaterThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "5"
    }

    let durationEquals: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: KnownPredicateType.Equal,
      comparand: "0.0:0:0.2" // 200 ms in iso 8601 format
    }

    let successEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Equal,
      comparand: "true"
    };

    let successNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.NotEqual,
      comparand: "false"
    };

    let filterInfoList: FilterInfo[] = [anyFieldContains, anyFieldDoesNotContain, stringNotEqual, stringEquals,
      stringContain, stringNotContain, numericEquals, numericNotEqual, numericLessThan, numericLessThanOrEqual,
      numericGreaterThan, numericGreaterThanOrEqual, customDimContain, customDimNotContain, customDimEquals,
      customDimNotEqual, durationEquals, successEqual, successNotEqual];

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
      Validator.validateFilters(derivedMetricInfo);
    });
  });

  // multiple filterconjuncitongroups?
  // custom dimensions span/log parsing
  // any field span/log parsing





});
