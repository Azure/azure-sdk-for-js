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
  Projection,
} from "../../../../src/metrics/quickpulse/filtering";
import {
  RequestData,
  DependencyData,
  ExceptionData,
  TraceData,
} from "../../../../src/metrics/quickpulse/types";

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
    let anyFieldContainsHi: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    let anyFieldNotContains: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi"
    }

    let anyFieldContainsCool: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "cool"
    }

    let anyFieldForNumeric: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "200"
    }

    let anyFieldForBoolean: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "true"
    }

    let request1: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    let request2: RequestData = {
      Url: "https://test.com/bye",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /bye",
      CustomDimensions: new Map<string, string>([["property", "cool"]]),
    };

    let conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [anyFieldContainsHi]
    };

    let derivedMetricInfo: DerivedMetricInfo = {
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
    let predicateList = [KnownPredicateType.Equal, KnownPredicateType.NotEqual, KnownPredicateType.Contains, KnownPredicateType.DoesNotContain];
    let customDimFilter: FilterInfo = {
      fieldName: "CustomDimensions.hi",
      predicate: KnownPredicateType.Equal,
      comparand: "hi"
    }

    let conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [customDimFilter]
    };

    let derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    }

    let request: RequestData = {
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
    // Request Success
    // Dependency Success
    // == and !=
    // match and not match
  });

  it("Can handle filter on known numeric columns", () => {
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
