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
  Filter,
  KnownDependencyColumns,
  // Projection,
} from "../../../../src/metrics/quickpulse/filtering";
import {
  RequestData,
  DependencyData,
  /* ExceptionData,
   TraceData,*/
} from "../../../../src/metrics/quickpulse/types";

describe("Live Metrics filtering - Validator", () => {
  // "x-ms-qps-configuration-etag"

  it("The validator rejects the invalid telemetry types", () => {
    const invalid1: DerivedMetricInfo = {
      id: "random-id1",
      telemetryType: "Event",
      filterGroups: [],
      projection: "Message",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const invalid2: DerivedMetricInfo = {
      id: "random-id2",
      telemetryType: "PerformanceCounter",
      filterGroups: [],
      projection: "\\Random\\Counter",
      aggregation: "Avg",
      backEndAggregation: "Avg",
    };

    const invalid3: DerivedMetricInfo = {
      id: "random-id3",
      telemetryType: "Metric",
      filterGroups: [],
      projection: "otel.random.metric",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const invalid4: DerivedMetricInfo = {
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
    const invalid1: DerivedMetricInfo = {
      id: "random-id1",
      telemetryType: "Request",
      filterGroups: [],
      projection: "CustomMetrics.property",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [
        { fieldName: "CustomMetrics.property", predicate: KnownPredicateType.Equal, comparand: "5" },
      ]
    };

    const invalid2: DerivedMetricInfo = {
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
    const emptyFilterName: FilterInfo = {
      fieldName: "",
      predicate: KnownPredicateType.Equal,
      comparand: "blah"
    };

    const emptyComparand: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Equal,
      comparand: ""
    };

    const invalidAnyFieldEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Equal,
      comparand: "5"
    };

    const invalidAnyFieldNotEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.NotEqual,
      comparand: "5"
    };

    const invalidAnyFieldLessThan: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.LessThan,
      comparand: "5"
    };

    const invalidAnyFieldLessThanOrEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "5"
    };

    const invalidAnyFieldGreaterThan: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.GreaterThan,
      comparand: "5"
    };

    const invalidAnyFieldGreaterThanOrEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "5"
    };

    const invalidStringFieldPredicate: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.LessThan,
      comparand: "hi"
    }

    const invalidStringFieldPredicate2: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.GreaterThan,
      comparand: "hi"
    }

    const invalidStringFieldPredicate3: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "hi"
    }

    const invalidStringFieldPredicate4: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "hi"
    }

    const invalidCustomDimLess: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.LessThan,
      comparand: "hi"
    }

    const invalidCustomDimGreater: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.GreaterThan,
      comparand: "hi"
    }

    const invalidCustomDimGreaterThanOrEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "hi"
    }

    const invalidCustomDimLessThanOrEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "hi"
    }

    const invalidNumericFieldPredicate: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Contains,
      comparand: "5"
    }

    const invalidNumericFieldPredicate2: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "5"
    }

    const invalidNumericFieldComparand: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "hi"
    }

    const invalidDurationComparand: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: KnownPredicateType.NotEqual,
      comparand: "invalid timestamp"
    }

    const unknownFieldName: FilterInfo = {
      fieldName: "unknown field",
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    const successLessThan: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.LessThan,
      comparand: "true"
    };

    const successLessThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "true"
    };

    const successFieldGreaterThan: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.GreaterThan,
      comparand: "true"
    };

    const successGreaterThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "true"
    };

    const successContains: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Contains,
      comparand: "true"
    };

    const successNotContain: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "true"
    };

    const invalidBool: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Equal,
      comparand: "hi"
    };

    const filterInfoList: FilterInfo[] =
      [emptyFilterName, emptyComparand, invalidAnyFieldEqual, invalidAnyFieldNotEqual, invalidAnyFieldLessThan, invalidAnyFieldLessThanOrEqual,
        invalidAnyFieldGreaterThan, invalidAnyFieldGreaterThanOrEqual, invalidStringFieldPredicate, invalidStringFieldPredicate2,
        invalidStringFieldPredicate3, invalidStringFieldPredicate4, invalidCustomDimGreater, invalidCustomDimGreaterThanOrEqual,
        invalidCustomDimLess, invalidCustomDimLessThanOrEqual, invalidNumericFieldPredicate, invalidNumericFieldPredicate2,
        invalidNumericFieldComparand, invalidDurationComparand, successLessThan, successLessThanOrEqual, successFieldGreaterThan,
        successGreaterThanOrEqual, successContains, successNotContain, invalidBool];

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    }

    filterInfoList.forEach(filter => {
      const conjunctionGroup: FilterConjunctionGroupInfo = {
        filters: [filter]
      };

      derivedMetricInfo.filterGroups = [conjunctionGroup];
      assert.throws(() => Validator.validateFilters(derivedMetricInfo), UnexpectedFilterCreateError || TelemetryTypeError);
    });

    derivedMetricInfo.filterGroups = [{ filters: [unknownFieldName] }];
    const supportedTelemetryTypes: KnownTelemetryType[] =
      [KnownTelemetryType.Request, KnownTelemetryType.Dependency, KnownTelemetryType.Exception, KnownTelemetryType.Trace];

    supportedTelemetryTypes.forEach(telemetryType => {
      derivedMetricInfo.telemetryType = telemetryType;
      assert.throws(() => Validator.validateFilters(derivedMetricInfo), UnexpectedFilterCreateError);
    });


  });

  it("The validator rejects an entire derivedMetricInfo if one out of multiple filters is invalid", () => {

    const invalidFilter: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: KnownPredicateType.NotEqual,
      comparand: "invalid timestamp"
    }

    const validFilter: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "200"
    }

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [validFilter, invalidFilter]
    };

    const derivedMetricInfo: DerivedMetricInfo = {
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
    const anyFieldContains: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    const anyFieldDoesNotContain: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi"
    }

    const stringNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.NotEqual,
      comparand: "hi"
    }

    const stringEquals: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Equal,
      comparand: "hi"
    }

    const stringContain: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    const stringNotContain: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi"
    }

    const customDimNotEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.NotEqual,
      comparand: "hi"
    }

    const customDimEquals: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.Equal,
      comparand: "hi"
    }

    const customDimContain: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    const customDimNotContain: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi"
    }

    const numericEquals: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "5"
    }

    const numericNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.NotEqual,
      comparand: "5"
    }

    const numericLessThan: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.LessThan,
      comparand: "5"
    }

    const numericGreaterThan: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.GreaterThan,
      comparand: "5"
    }

    const numericLessThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "5"
    }

    const numericGreaterThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "5"
    }

    const durationEquals: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: KnownPredicateType.Equal,
      comparand: "0.0:0:0.2" // 200 ms in iso 8601 format
    }

    const successEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Equal,
      comparand: "true"
    };

    const successNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.NotEqual,
      comparand: "false"
    };

    const filterInfoList: FilterInfo[] = [anyFieldContains, anyFieldDoesNotContain, stringNotEqual, stringEquals,
      stringContain, stringNotContain, numericEquals, numericNotEqual, numericLessThan, numericLessThanOrEqual,
      numericGreaterThan, numericGreaterThanOrEqual, customDimContain, customDimNotContain, customDimEquals,
      customDimNotEqual, durationEquals, successEqual, successNotEqual];

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    }

    filterInfoList.forEach(filter => {
      const conjunctionGroup: FilterConjunctionGroupInfo = {
        filters: [filter]
      };

      derivedMetricInfo.filterGroups = [conjunctionGroup];
      Validator.validateFilters(derivedMetricInfo);
    });
  });
});

describe("Live Metrics filtering - Conversion of Span/Log to TelemetryData", () => {
  it("Can parse a Span into a RequestData", () => {

  });

  it("Can parse a Span into a DepedencyData", () => {

  });

  it("Can parse a Span into an ExceptionData", () => {

  });

  it("Can parse a Log into an ExceptionData", () => {

  });

  it("Can parse a Log into a TraceData", () => {

  });
});

describe("Live Metrics filtering - Applying valid filters", () => {
  it("Can handle AnyField filter", () => {
    const anyFieldContainsHi: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    const anyFieldNotContains: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi"
    }

    const anyFieldContainsCool: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "cool"
    }

    const anyFieldForNumeric: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "200"
    }

    const anyFieldForBoolean: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "true"
    }

    const request1: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    const request2: RequestData = {
      Url: "https://test.com/bye",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /bye",
      CustomDimensions: new Map<string, string>([["property", "cool"]]),
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [anyFieldContainsHi]
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    }

    // request contains "hi" in multiple fields & filter is contains hi
    // return true
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request1));

    // request does not contain "hi" in any field & filter is contains hi
    // return false
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request2) === false);

    // request does not contain "hi" in any field & filter is does not contain hi
    // return true
    conjunctionGroup.filters = [anyFieldNotContains];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request2));

    // request contains "cool" in custom dimensions & filter is contains cool
    // return true
    conjunctionGroup.filters = [anyFieldContainsCool];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request2));

    // request contains 200 in duration & filter is contains "200".
    // fields are expected to be treated as string
    conjunctionGroup.filters = [anyFieldForNumeric];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request1));

    // request contains true in Success & filter is contains "true".
    // fields are expected to be treated as string
    conjunctionGroup.filters = [anyFieldForBoolean];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request1));

  });

  it("Can handle CustomDimension filter", () => {
    const customDimFilter: FilterInfo = {
      fieldName: "CustomDimensions.hi",
      predicate: KnownPredicateType.Equal,
      comparand: "hi"
    }

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [customDimFilter]
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    }

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>([["bye", "hi"]]),
    };

    // the asked for field is not in the custom dimensions so return false
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);

    // the asked for field is in the custom dimensions but value does not match
    request.CustomDimensions.clear();
    request.CustomDimensions.set("hi", "bye");
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);

    // the asked for field is in the custom dimensions and value matches
    request.CustomDimensions.set("hi", "hi");
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // testing not equal predicate. The CustomDimensions.hi value != hi so return true.
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.NotEqual;
    request.CustomDimensions.set("hi", "bye");
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // testing does not contain predicate. The CustomDimensions.hi value does not contain hi so return true.
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.DoesNotContain;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // testing contains predicate. The CustomDimensions.hi value contains hi so return true.
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.Contains;
    request.CustomDimensions.set("hi", "hi there");
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));
  });

  it("Can handle filter on known boolean columns", () => {
    const filter: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Equal,
      comparand: "true"
    }

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter]
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    }

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    const dependency: DependencyData = {
      Target: "test.com",
      Data: "https://test.com/hiThere?x=y",
      Duration: 200,
      ResultCode: 200,
      Type: "HTTP",
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    // Request Success filter matches
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // Request Success filter does not match
    request.Success = false;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);

    // Request Success filter matches for != predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.NotEqual;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // Dependency Success filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Dependency;
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.Equal;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency));

    // Dependency Success filter does not match
    dependency.Success = false;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency) === false);

    // Dependency Success filter matches for != predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.NotEqual;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency));

  });

  it("Can handle filter on known numeric columns", () => {

    const filter: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "200"
    }

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter]
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    }

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    const dependency: DependencyData = {
      Target: "test.com",
      Data: "https://test.com/hiThere?x=y",
      Duration: 200,
      ResultCode: 200,
      Type: "HTTP",
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    // Request ResponseCode filter matches
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // Request ResponseCode filter does not match
    request.ResponseCode = 404;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);

    // Dependency ResultCode filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Dependency;
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.ResultCode;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency));

    // Dependency ResultCode filter does not match
    dependency.ResultCode = 404;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency) === false);

    // Dependency duration filter matches
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.Duration;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency));

    // Dependency duration filter does not match
    dependency.Duration = 400;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);

    // Request duration filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Request;
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownRequestColumns.Duration;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // Request duration filter does not match
    request.Duration = 400;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);

    // != predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.NotEqual;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // 


    // Request ResponseCode
    // Dependency ResultCode
    // Request Duration
    // Dependency Duration
    // ==, !=, <, >, <=, >=
    // match and not match
  });

  it("Can handle filter on known string columns", () => {
    // Request Url
    // Dependency Target
    // Trace Message
    // Exception Message
    // ==, !=, contains, not contains
    // match and not match
  });

  it("Empty filter conjunction group - should match", () => {

  });

  it("Can handle multiple filters in a filter conjunction group", () => {
    // matches neither filter
    // matches one filter
  });

  it("Can handle multiple filter conjunction groups", () => {
    // matches neither group
    // matches one group
  });
});

describe("Live Metrics filtering - Metric Projection", () => {
  it("Count()", () => {
    // create a derived metric info for each telemetry type, with count() projection
    // call the projection function with the corresponding telemetry data for each telemetry type
    // get the projection map at the end and check if the count is correct
  });

  it("Duration", () => {
    // create derived metric infos for request & dependency, with duration projection
    // also try for each aggregation: Avg, Min, Max
    // call the projection function with the corresponding telemetry data for request/dependency
    // get the projection map at the end and check if the values are correct.
  });

  it("CustomDimension", () => {
    // create derived metric info for a custom dim that doesn't exist
    // create derived metric info for a custom dim that exists, but with a value that doesn't convert to a number
    // create derived metric infos for a custom dim that exists, with all the aggregations
    // call the projection function with the corresponding telemetry data for each case
    // get the projection map at the end and check if the values are correct.
  });
});

describe("Live Metrics filtering - Documents", () => {
  it("Can create document for an exception that comes from a span", () => {

  });

  it("Can create docuemnt for an exception that comes from a log", () => {

  });
});
