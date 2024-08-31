// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as assert from "assert";
import {
  DerivedMetricInfo,
  FilterConjunctionGroupInfo,
  FilterInfo,
  KnownPredicateType,
  KnownTelemetryType,
  RemoteDependency,
  Request,
  Exception,
  Trace,
  KnownDocumentType,
  KnownAggregationType,
} from "../../../../src/generated";
import {
  Validator,
  TelemetryTypeError,
  UnexpectedFilterCreateError,
  KnownRequestColumns,
  Filter,
  KnownDependencyColumns,
  Projection,
  MetricFailureToCreateError,
} from "../../../../src/metrics/quickpulse/filtering";
import {
  RequestData,
  DependencyData,
  ExceptionData,
  TraceData,
} from "../../../../src/metrics/quickpulse/types";
import {
  SpanKind,
  SpanStatusCode,
} from "@opentelemetry/api";
import { millisToHrTime } from "@opentelemetry/core";
import {
  LogRecord,
  LoggerProvider,
} from "@opentelemetry/sdk-logs";
import {
  getLogColumns,
  getSpanColumns,
  getSpanExceptionColumns,
  getSpanDocument,
  getLogDocument,
  getMsFromFilterTimestampString,
} from "../../../../src/metrics/quickpulse/utils";

describe("Live Metrics filtering - Validator", () => {

  it("The validator rejects the invalid telemetry types", () => {
    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id1",
      telemetryType: "Event",
      filterGroups: [{ filters: [] }],
      projection: "Message",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    assert.throws(() => Validator.validateTelemetryType(derivedMetricInfo), TelemetryTypeError);
    derivedMetricInfo.telemetryType = "\\Random\\Counter";
    assert.throws(() => Validator.validateTelemetryType(derivedMetricInfo), TelemetryTypeError);
    derivedMetricInfo.telemetryType = "Metric";
    assert.throws(() => Validator.validateTelemetryType(derivedMetricInfo), TelemetryTypeError);
    derivedMetricInfo.telemetryType = "does not exist";
    assert.throws(() => Validator.validateTelemetryType(derivedMetricInfo), TelemetryTypeError);

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

  it("The validator rejects a derivedMetricInfo if the only filterConjunctionGroupInfo has an invalid filter inside it", () => {
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
    const serverSpan: any = {
      kind: SpanKind.SERVER,
      duration: millisToHrTime(98765432),
      attributes: {
        "http.status_code": 200,
        "http.method": "GET",
        "http.url": "http://test.com/",
        customAttribute: "test",
      },
      status: {
        code: SpanStatusCode.OK,
      },

    };

    const request: RequestData = getSpanColumns(serverSpan) as RequestData;
    assert.equal(request.Url, "http://test.com/");
    assert.equal(request.Duration, 98765432);
    assert.equal(request.ResponseCode, 200);
    assert.equal(request.Success, true);
    assert.equal(request.Name, "GET /");
    assert.equal(request.CustomDimensions.get("customAttribute"), "test");

  });

  it("Can parse a Span into a DepedencyData", () => {
    const clientSpan: any = {
      kind: SpanKind.CLIENT,
      duration: millisToHrTime(12345678),
      attributes: {
        "http.status_code": 200,
        "http.method": "GET",
        "http.url": "http://test.com/",
        "net.peer.name": "test.com",
        customAttribute: "test",
      },
      status: {
        code: SpanStatusCode.OK,
      },
    };

    const dependency: DependencyData = getSpanColumns(clientSpan) as DependencyData;
    assert.equal(dependency.Target, "test.com");
    assert.equal(dependency.Duration, 12345678);
    assert.equal(dependency.Success, true);
    assert.equal(dependency.Name, "GET /");
    assert.equal(dependency.ResultCode, 200);
    assert.equal(dependency.Type, "Http");
    assert.equal(dependency.Data, "http://test.com/");
    assert.equal(dependency.CustomDimensions.get("customAttribute"), "test");

  });

  it("Can parse a Span into an ExceptionData", () => {
    const exceptionEvent: any = {
      time: millisToHrTime(12345678),
      name: "exception",
      attributes: {
        "exception.stacktrace": "testStackTrace",
        "exception.message": "testExceptionMessage",
        "exception.type": "Error",
      }
    };

    const clientSpan: any = {
      kind: SpanKind.CLIENT,
      duration: millisToHrTime(12345678),
      attributes: {
        "http.status_code": 0,
        "http.method": "GET",
        "http.url": "http://test.com/",
        customAttribute: "test",
      },
      status: {
        code: SpanStatusCode.ERROR,
      },
      events: [exceptionEvent]
    };

    const exception: ExceptionData = getSpanExceptionColumns(exceptionEvent.attributes, clientSpan.attributes);
    assert.equal(exception.Message, "testExceptionMessage");
    assert.equal(exception.StackTrace, "testStackTrace");
    assert.equal(exception.CustomDimensions.get("customAttribute"), "test");

  });

  it("Can parse a Log into an ExceptionData", () => {
    const loggerProvider = new LoggerProvider();
    const logger = loggerProvider.getLogger("testLogger") as any;
    const traceLog = new LogRecord(
      logger["_sharedState"],
      { name: "test" },
      {
        body: "testMessage",
        timestamp: 1234567890,
      },
    );
    traceLog.attributes["exception.stacktrace"] = "testStackTrace";
    traceLog.attributes["exception.message"] = "testExceptionMessage";
    traceLog.attributes["customAttribute"] = "test";
    traceLog.attributes["exception.type"] = "Error";

    const exception: ExceptionData = getLogColumns(traceLog) as ExceptionData;
    assert.equal(exception.Message, "testExceptionMessage");
    assert.equal(exception.StackTrace, "testStackTrace");
    assert.equal(exception.CustomDimensions.get("customAttribute"), "test");

  });

  it("Can parse a Log into a TraceData", () => {
    const loggerProvider = new LoggerProvider();
    const logger = loggerProvider.getLogger("testLogger") as any;
    const traceLog = new LogRecord(
      logger["_sharedState"],
      { name: "test" },
      {
        body: "testMessage",
        timestamp: 1234567890,
      },
    );
    traceLog.attributes["customAttribute"] = "test";

    const trace: TraceData = getLogColumns(traceLog) as TraceData;
    assert.equal(trace.Message, "testMessage");
    assert.equal(trace.CustomDimensions.get("customAttribute"), "test");
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
      Duration: 1234567890,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    const dependency: DependencyData = {
      Target: "test.com",
      Data: "https://test.com/hiThere?x=y",
      Duration: 1234567890,
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
    request.Success = false;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);

    // Dependency ResultCode filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Dependency;
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.ResultCode;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency));

    // Dependency ResultCode filter does not match
    dependency.ResultCode = 404;
    dependency.Success = false;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency) === false);

    // Dependency duration filter matches
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.Duration;
    derivedMetricInfo.filterGroups[0].filters[0].comparand = "14.6:56:7.89"; // 14 days, 6 hours, 56 minutes, 7.89 seconds (1234567890 ms)
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency));

    // Dependency duration filter does not match
    dependency.Duration = 400;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency) === false);

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

    // < predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.LessThan;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // <= predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.LessThanOrEqual;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // > predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.GreaterThan;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);

    // >= predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.GreaterThanOrEqual;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);
  });

  it("Can handle filter on known string columns", () => {
    const filter: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
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

    const trace: TraceData = {
      Message: "hi there",
      CustomDimensions: new Map<string, string>(),
    };

    const exception: ExceptionData = {
      Message: "Exception Message hi",
      StackTrace: "Stack Trace",
      CustomDimensions: new Map<string, string>(),
    };

    // Request Url filter matches
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // Request Url filter does not match
    request.Url = "https://test.com/bye";
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);

    // Dependency Data filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Dependency;
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.Data;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency));

    // Dependency Data filter does not match
    dependency.Data = "https://test.com/bye";
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, dependency) === false);

    // Trace Message filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Trace;
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = "Message";
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, trace));

    // Trace Message filter does not match
    trace.Message = "bye";
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, trace) === false);

    // Exception Message filter matches. Note that fieldName is still "Message" here and that's intended (we remove the Exception. prefix when validating config)
    derivedMetricInfo.telemetryType = KnownTelemetryType.Exception;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, exception));

    // Exception Message filter does not match
    exception.Message = "Exception Message";
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, exception) === false);

    // != predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.NotEqual;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, exception));

    // not contains
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.DoesNotContain;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, exception));

    // equal
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.Equal;
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, exception) === false);
  });

  it("Empty filter conjunction group info - should match", () => {
    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
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

    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));
  });

  it("Can handle multiple filters in a filter conjunction group", () => {
    const filter1: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Contains,
      comparand: "hi"
    }

    const filter2: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "200"
    }

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter1, filter2]
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

    // matches both filters
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request));

    // only one filter matches, the entire conjunction group should return false
    request.Url = "https://test.com/bye";
    assert.ok(Filter.checkMetricFilters(derivedMetricInfo, request) === false);
  });
});

describe("Live Metrics filtering - Metric Projection", () => {
  const proj: Projection = new Projection();
  it("Count()", () => {
    const derivedMetricInfo: DerivedMetricInfo = {
      id: "id-for-request",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
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

    const trace: TraceData = {
      Message: "hi there",
      CustomDimensions: new Map<string, string>(),
    };

    const exception: ExceptionData = {
      Message: "Exception Message hi",
      StackTrace: "Stack Trace",
      CustomDimensions: new Map<string, string>(),
    };

    // call the projection function with the corresponding telemetry data for each telemetry type
    proj.calculateProjection(derivedMetricInfo, request);
    proj.calculateProjection(derivedMetricInfo, request);

    derivedMetricInfo.telemetryType = KnownTelemetryType.Dependency;
    derivedMetricInfo.id = "id-for-dependency";
    proj.calculateProjection(derivedMetricInfo, dependency);
    proj.calculateProjection(derivedMetricInfo, dependency);
    proj.calculateProjection(derivedMetricInfo, dependency);

    derivedMetricInfo.telemetryType = KnownTelemetryType.Trace;
    derivedMetricInfo.id = "id-for-trace";
    proj.calculateProjection(derivedMetricInfo, trace);
    proj.calculateProjection(derivedMetricInfo, trace);
    proj.calculateProjection(derivedMetricInfo, trace);
    proj.calculateProjection(derivedMetricInfo, trace);

    derivedMetricInfo.telemetryType = KnownTelemetryType.Exception;
    derivedMetricInfo.id = "id-for-exception";
    proj.calculateProjection(derivedMetricInfo, exception);

    // get the projection map at the end and check if the count is correct
    const projectionMap: Map<string, number> = proj.getMetricValues();
    assert.equal(projectionMap.get("id-for-request"), 2);
    assert.equal(projectionMap.get("id-for-dependency"), 3);
    assert.equal(projectionMap.get("id-for-trace"), 4);
    assert.equal(projectionMap.get("id-for-exception"), 1);

    proj.clearProjectionMaps();
  });

  it("Duration", () => {
    const derivedMetricInfo: DerivedMetricInfo = {
      id: "id-for-request-avg",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: KnownAggregationType.Avg,
      backEndAggregation: KnownAggregationType.Avg,
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

    // projection for request duration - avg
    proj.calculateProjection(derivedMetricInfo, request);
    request.Duration = 400;
    proj.calculateProjection(derivedMetricInfo, request);
    request.Duration = 600;
    proj.calculateProjection(derivedMetricInfo, request);

    // projection for request duration - min
    derivedMetricInfo.id = "id-for-request-min";
    derivedMetricInfo.aggregation = KnownAggregationType.Min;
    proj.calculateProjection(derivedMetricInfo, request);
    request.Duration = 100;
    proj.calculateProjection(derivedMetricInfo, request);
    request.Duration = 500;
    proj.calculateProjection(derivedMetricInfo, request);

    // projection for request duration - max
    derivedMetricInfo.id = "id-for-request-max";
    derivedMetricInfo.aggregation = KnownAggregationType.Max;
    proj.calculateProjection(derivedMetricInfo, request);
    request.Duration = 100;
    proj.calculateProjection(derivedMetricInfo, request);
    request.Duration = 600;
    proj.calculateProjection(derivedMetricInfo, request);

    // projection for dependency duration - avg
    derivedMetricInfo.id = "id-for-dependency-avg";
    derivedMetricInfo.telemetryType = KnownTelemetryType.Dependency;
    derivedMetricInfo.aggregation = KnownAggregationType.Avg;
    proj.calculateProjection(derivedMetricInfo, dependency);
    dependency.Duration = 400;
    proj.calculateProjection(derivedMetricInfo, dependency);
    dependency.Duration = 600;
    proj.calculateProjection(derivedMetricInfo, dependency);

    // projection for request duration - min
    derivedMetricInfo.id = "id-for-dependency-min";
    derivedMetricInfo.aggregation = KnownAggregationType.Min;
    proj.calculateProjection(derivedMetricInfo, dependency);
    dependency.Duration = 100;
    proj.calculateProjection(derivedMetricInfo, dependency);
    dependency.Duration = 500;
    proj.calculateProjection(derivedMetricInfo, dependency);

    // projection for request duration - max
    derivedMetricInfo.id = "id-for-dependency-max";
    derivedMetricInfo.aggregation = KnownAggregationType.Max;
    proj.calculateProjection(derivedMetricInfo, dependency);
    dependency.Duration = 100;
    proj.calculateProjection(derivedMetricInfo, dependency);
    dependency.Duration = 600;
    proj.calculateProjection(derivedMetricInfo, dependency);

    // get the projection map at the end and check if the projections are correct
    const projectionMap: Map<string, number> = proj.getMetricValues();
    assert.equal(projectionMap.get("id-for-request-avg"), 400);
    assert.equal(projectionMap.get("id-for-request-min"), 100);
    assert.equal(projectionMap.get("id-for-request-max"), 600);
    assert.equal(projectionMap.get("id-for-dependency-avg"), 400);
    assert.equal(projectionMap.get("id-for-dependency-min"), 100);
    assert.equal(projectionMap.get("id-for-dependency-max"), 600);

    proj.clearProjectionMaps();
  });

  it("CustomDimension", () => {

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "id-avg",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
      aggregation: KnownAggregationType.Avg,
      backEndAggregation: KnownAggregationType.Avg,
    }

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    // custom dim doesn't exist in current request - should throw exception
    assert.throws(() => proj.calculateProjection(derivedMetricInfo, request), MetricFailureToCreateError);

    // custom dim exists in current request but value does not convert to a number - should throw exception
    request.CustomDimensions.set("property", "hi");
    assert.throws(() => proj.calculateProjection(derivedMetricInfo, request), MetricFailureToCreateError);

    // custom dim - avg
    request.CustomDimensions.set("property", "5");
    proj.calculateProjection(derivedMetricInfo, request);
    request.CustomDimensions.set("property", "10");
    proj.calculateProjection(derivedMetricInfo, request);
    request.CustomDimensions.set("property", "15");
    proj.calculateProjection(derivedMetricInfo, request);

    // custom dim - min
    derivedMetricInfo.id = "id-min";
    derivedMetricInfo.aggregation = KnownAggregationType.Min;
    proj.calculateProjection(derivedMetricInfo, request);
    request.CustomDimensions.set("property", "1");
    proj.calculateProjection(derivedMetricInfo, request);
    request.CustomDimensions.set("property", "20");
    proj.calculateProjection(derivedMetricInfo, request);

    // custom dim - max
    derivedMetricInfo.id = "id-max";
    derivedMetricInfo.aggregation = KnownAggregationType.Max;
    proj.calculateProjection(derivedMetricInfo, request);
    request.CustomDimensions.set("property", "1");
    proj.calculateProjection(derivedMetricInfo, request);
    request.CustomDimensions.set("property", "15");
    proj.calculateProjection(derivedMetricInfo, request);

    // custom dim - sum
    derivedMetricInfo.id = "id-sum";
    derivedMetricInfo.aggregation = KnownAggregationType.Sum;
    proj.calculateProjection(derivedMetricInfo, request);
    request.CustomDimensions.set("property", "1");
    proj.calculateProjection(derivedMetricInfo, request);
    request.CustomDimensions.set("property", "15");
    proj.calculateProjection(derivedMetricInfo, request);

    // get the projection map at the end and check if the values are correct.
    const projectionMap: Map<string, number> = proj.getMetricValues();
    assert.equal(projectionMap.get("id-avg"), 10);
    assert.equal(projectionMap.get("id-min"), 1);
    assert.equal(projectionMap.get("id-max"), 20);
    assert.equal(projectionMap.get("id-sum"), 31);

    proj.clearProjectionMaps();

  });
});

describe("Live Metrics filtering - documents", () => {
  it("Can create documents", () => {
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

    const trace: TraceData = {
      Message: "hi there",
      CustomDimensions: new Map<string, string>(),
    };

    const exception: ExceptionData = {
      Message: "Exception Message hi",
      StackTrace: "Stack Trace",
      CustomDimensions: new Map<string, string>(),
    };

    const requestDoc: Request = getSpanDocument(request) as Request;
    const dependencyDoc: RemoteDependency = getSpanDocument(dependency) as RemoteDependency;
    const traceDoc: Trace = getLogDocument(trace, "") as Trace;
    const exceptionDoc: Exception = getLogDocument(exception, "Error") as Exception;

    assert.equal(requestDoc.url, "https://test.com/hiThere");
    assert.equal(requestDoc.documentType, KnownDocumentType.Request);
    assert.equal(requestDoc.duration, "PT0.2S");
    assert.equal(requestDoc.responseCode, "200");
    assert.equal(requestDoc.name, "GET /hiThere");

    assert.equal(dependencyDoc.commandName, "https://test.com/hiThere?x=y");
    assert.equal(dependencyDoc.documentType, KnownDocumentType.RemoteDependency);
    assert.equal(dependencyDoc.duration, "PT0.2S");
    assert.equal(dependencyDoc.resultCode, "200");
    assert.equal(dependencyDoc.name, "GET /hiThere");

    assert.equal(traceDoc.message, "hi there");
    assert.equal(traceDoc.documentType, KnownDocumentType.Trace);

    assert.equal(exceptionDoc.exceptionMessage, "Exception Message hi");
    assert.equal(exceptionDoc.exceptionType, "Error");
    assert.equal(exceptionDoc.documentType, KnownDocumentType.Exception);

  });

});

describe("Live Metrics filtering - timestamp conversion", () => {
  it("Can convert timestamp from filter.comparand to ms", () => {
    assert.equal(getMsFromFilterTimestampString("14.6:56:7.89"), 1234567890);
    assert.equal(getMsFromFilterTimestampString("0.0:0:0.2"), 200);
    assert.equal(getMsFromFilterTimestampString("0.0:0:0.0"), 0);
    assert.equal(getMsFromFilterTimestampString("0.0:1:1.0"), 61000);
  });
});
