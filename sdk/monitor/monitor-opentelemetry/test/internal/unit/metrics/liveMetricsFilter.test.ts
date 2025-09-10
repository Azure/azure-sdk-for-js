// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert";
import type {
  DerivedMetricInfo,
  FilterConjunctionGroupInfo,
  FilterInfo,
  RemoteDependency,
  /* eslint-disable-next-line @typescript-eslint/no-redeclare */
  Request,
  Exception,
  Trace,
  DocumentFilterConjunctionGroupInfo,
} from "../../../../src/generated/index.js";
import {
  KnownPredicateType,
  KnownTelemetryType,
  KnownDocumentType,
  KnownAggregationType,
} from "../../../../src/generated/index.js";
import { Validator } from "../../../../src/metrics/quickpulse/filtering/validator.js";
import { Filter } from "../../../../src/metrics/quickpulse/filtering/filter.js";
import { Projection } from "../../../../src/metrics/quickpulse/filtering/projection.js";
import {
  TelemetryTypeError,
  UnexpectedFilterCreateError,
  MetricFailureToCreateError,
} from "../../../../src/metrics/quickpulse/filtering/quickpulseErrors.js";
import type {
  RequestData,
  DependencyData,
  ExceptionData,
  TraceData,
} from "../../../../src/metrics/quickpulse/types.js";
import {
  KnownRequestColumns,
  KnownDependencyColumns,
} from "../../../../src/metrics/quickpulse/types.js";
import { SpanKind, SpanStatusCode } from "@opentelemetry/api";
import { millisToHrTime } from "@opentelemetry/core";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { createMockSdkLogRecord } from "../../../utils/breezeTestUtils.js";
import {
  getLogData,
  getSpanData,
  getSpanExceptionColumns,
  getSpanDocument,
  getLogDocument,
  getMsFromFilterTimestampString,
} from "../../../../src/metrics/quickpulse/utils.js";
import { describe, it } from "vitest";

describe("Live Metrics filtering - Validator", () => {
  const validator: Validator = new Validator();
  it("The validator rejects the invalid telemetry types", () => {
    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id1",
      telemetryType: "Event",
      filterGroups: [{ filters: [] }],
      projection: "Message",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    assert.throws(
      () => validator.validateTelemetryType(derivedMetricInfo.telemetryType),
      TelemetryTypeError,
    );
    derivedMetricInfo.telemetryType = "\\Random\\Counter";
    assert.throws(
      () => validator.validateTelemetryType(derivedMetricInfo.telemetryType),
      TelemetryTypeError,
    );
    derivedMetricInfo.telemetryType = "Metric";
    assert.throws(
      () => validator.validateTelemetryType(derivedMetricInfo.telemetryType),
      TelemetryTypeError,
    );
    derivedMetricInfo.telemetryType = "does not exist";
    assert.throws(
      () => validator.validateTelemetryType(derivedMetricInfo.telemetryType),
      TelemetryTypeError,
    );
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
        {
          fieldName: "CustomMetrics.property",
          predicate: KnownPredicateType.Equal,
          comparand: "5",
        },
      ],
    };

    const invalid2: DerivedMetricInfo = {
      id: "random-id2",
      telemetryType: "Request",
      filterGroups: [conjunctionGroup],
      projection: "Message",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    assert.throws(
      () => validator.checkCustomMetricProjection(invalid1),
      UnexpectedFilterCreateError,
    );
    validator.validateTelemetryType(invalid2.telemetryType); // this shouldn't throw an error as the telemetry type is supported
    assert.throws(() => validator.validateMetricFilters(invalid2), UnexpectedFilterCreateError);

    const invalidDocFilterConjuctionInfo: DocumentFilterConjunctionGroupInfo = {
      telemetryType: KnownTelemetryType.Request,
      filters: conjunctionGroup,
    };
    validator.validateTelemetryType(invalidDocFilterConjuctionInfo.telemetryType);
    assert.throws(
      () => validator.validateDocumentFilters(invalidDocFilterConjuctionInfo),
      UnexpectedFilterCreateError,
    );
  });

  it("The validator rejects invalid filters", () => {
    const emptyFilterName: FilterInfo = {
      fieldName: "",
      predicate: KnownPredicateType.Equal,
      comparand: "blah",
    };

    const emptyComparand: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Equal,
      comparand: "",
    };

    const invalidAnyFieldEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Equal,
      comparand: "5",
    };

    const invalidAnyFieldNotEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.NotEqual,
      comparand: "5",
    };

    const invalidAnyFieldLessThan: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.LessThan,
      comparand: "5",
    };

    const invalidAnyFieldLessThanOrEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "5",
    };

    const invalidAnyFieldGreaterThan: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.GreaterThan,
      comparand: "5",
    };

    const invalidAnyFieldGreaterThanOrEqual: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "5",
    };

    const invalidStringFieldPredicate: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.LessThan,
      comparand: "hi",
    };

    const invalidStringFieldPredicate2: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.GreaterThan,
      comparand: "hi",
    };

    const invalidStringFieldPredicate3: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "hi",
    };

    const invalidStringFieldPredicate4: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "hi",
    };

    const invalidCustomDimLess: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.LessThan,
      comparand: "hi",
    };

    const invalidCustomDimGreater: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.GreaterThan,
      comparand: "hi",
    };

    const invalidCustomDimGreaterThanOrEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "hi",
    };

    const invalidCustomDimLessThanOrEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "hi",
    };

    const invalidNumericFieldPredicate: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Contains,
      comparand: "5",
    };

    const invalidNumericFieldPredicate2: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "5",
    };

    const invalidNumericFieldComparand: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "hi",
    };

    const invalidDurationComparand: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: KnownPredicateType.NotEqual,
      comparand: "invalid timestamp",
    };

    const unknownFieldName: FilterInfo = {
      fieldName: "unknown field",
      predicate: KnownPredicateType.Contains,
      comparand: "hi",
    };

    const successLessThan: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.LessThan,
      comparand: "true",
    };

    const successLessThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "true",
    };

    const successFieldGreaterThan: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.GreaterThan,
      comparand: "true",
    };

    const successGreaterThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "true",
    };

    const successContains: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Contains,
      comparand: "true",
    };

    const successNotContain: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "true",
    };

    const invalidBool: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Equal,
      comparand: "hi",
    };

    const filterInfoList: FilterInfo[] = [
      emptyFilterName,
      emptyComparand,
      invalidAnyFieldEqual,
      invalidAnyFieldNotEqual,
      invalidAnyFieldLessThan,
      invalidAnyFieldLessThanOrEqual,
      invalidAnyFieldGreaterThan,
      invalidAnyFieldGreaterThanOrEqual,
      invalidStringFieldPredicate,
      invalidStringFieldPredicate2,
      invalidStringFieldPredicate3,
      invalidStringFieldPredicate4,
      invalidCustomDimGreater,
      invalidCustomDimGreaterThanOrEqual,
      invalidCustomDimLess,
      invalidCustomDimLessThanOrEqual,
      invalidNumericFieldPredicate,
      invalidNumericFieldPredicate2,
      invalidNumericFieldComparand,
      invalidDurationComparand,
      successLessThan,
      successLessThanOrEqual,
      successFieldGreaterThan,
      successGreaterThanOrEqual,
      successContains,
      successNotContain,
      invalidBool,
    ];

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const documentFilterConjunctionGroupInfo: DocumentFilterConjunctionGroupInfo = {
      telemetryType: KnownTelemetryType.Request,
      filters: { filters: [] },
    };

    filterInfoList.forEach((filter) => {
      const conjunctionGroup: FilterConjunctionGroupInfo = {
        filters: [filter],
      };

      derivedMetricInfo.filterGroups = [conjunctionGroup];
      assert.throws(
        () => validator.validateMetricFilters(derivedMetricInfo),
        UnexpectedFilterCreateError || TelemetryTypeError,
      );

      documentFilterConjunctionGroupInfo.filters = conjunctionGroup;

      assert.throws(
        () => validator.validateDocumentFilters(documentFilterConjunctionGroupInfo),
        UnexpectedFilterCreateError || TelemetryTypeError,
      );
    });

    derivedMetricInfo.filterGroups = [{ filters: [unknownFieldName] }];
    documentFilterConjunctionGroupInfo.filters = { filters: [unknownFieldName] };
    const supportedTelemetryTypes: KnownTelemetryType[] = [
      KnownTelemetryType.Request,
      KnownTelemetryType.Dependency,
      KnownTelemetryType.Exception,
      KnownTelemetryType.Trace,
    ];

    supportedTelemetryTypes.forEach((telemetryType) => {
      derivedMetricInfo.telemetryType = telemetryType;
      assert.throws(
        () => validator.validateMetricFilters(derivedMetricInfo),
        UnexpectedFilterCreateError,
      );
      documentFilterConjunctionGroupInfo.telemetryType = telemetryType;
      assert.throws(
        () => validator.validateDocumentFilters(documentFilterConjunctionGroupInfo),
        UnexpectedFilterCreateError,
      );
    });
  });

  it("The validator rejects a derivedMetricInfo/documentFilterConjuctionGroupInfo if the only filterConjunctionGroupInfo has an invalid filter inside it", () => {
    const invalidFilter: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: KnownPredicateType.NotEqual,
      comparand: "invalid timestamp",
    };

    const validFilter: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "200",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [validFilter, invalidFilter],
    };
    const documentFilterConjunctionGroupInfo: DocumentFilterConjunctionGroupInfo = {
      telemetryType: KnownTelemetryType.Request,
      filters: conjunctionGroup,
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    assert.throws(
      () => validator.validateMetricFilters(derivedMetricInfo),
      UnexpectedFilterCreateError,
    );
    assert.throws(
      () => validator.validateDocumentFilters(documentFilterConjunctionGroupInfo),
      UnexpectedFilterCreateError,
    );
  });

  it("The validator accepts valid filters", () => {
    const anyFieldContains: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "hi",
    };

    const anyFieldDoesNotContain: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi",
    };

    const stringNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.NotEqual,
      comparand: "hi",
    };

    const stringEquals: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Equal,
      comparand: "hi",
    };

    const stringContain: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Contains,
      comparand: "hi",
    };

    const stringNotContain: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi",
    };

    const customDimNotEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.NotEqual,
      comparand: "hi",
    };

    const customDimEquals: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.Equal,
      comparand: "hi",
    };

    const customDimContain: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.Contains,
      comparand: "hi",
    };

    const customDimNotContain: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi",
    };

    const numericEquals: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "5",
    };

    const numericNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.NotEqual,
      comparand: "5",
    };

    const numericLessThan: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.LessThan,
      comparand: "5",
    };

    const numericGreaterThan: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.GreaterThan,
      comparand: "5",
    };

    const numericLessThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.LessThanOrEqual,
      comparand: "5",
    };

    const numericGreaterThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.GreaterThanOrEqual,
      comparand: "5",
    };

    const durationEquals: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: KnownPredicateType.Equal,
      comparand: "0.0:0:0.2", // 200 ms in iso 8601 format
    };

    const successEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Equal,
      comparand: "true",
    };

    const successNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.NotEqual,
      comparand: "false",
    };

    const filterInfoList: FilterInfo[] = [
      anyFieldContains,
      anyFieldDoesNotContain,
      stringNotEqual,
      stringEquals,
      stringContain,
      stringNotContain,
      numericEquals,
      numericNotEqual,
      numericLessThan,
      numericLessThanOrEqual,
      numericGreaterThan,
      numericGreaterThanOrEqual,
      customDimContain,
      customDimNotContain,
      customDimEquals,
      customDimNotEqual,
      durationEquals,
      successEqual,
      successNotEqual,
    ];

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    filterInfoList.forEach((filter) => {
      const conjunctionGroup: FilterConjunctionGroupInfo = {
        filters: [filter],
      };

      derivedMetricInfo.filterGroups = [conjunctionGroup];
      validator.validateMetricFilters(derivedMetricInfo);

      const documentFilterConjunctionGroupInfo: DocumentFilterConjunctionGroupInfo = {
        telemetryType: KnownTelemetryType.Request,
        filters: conjunctionGroup,
      };
      validator.validateDocumentFilters(documentFilterConjunctionGroupInfo);
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

    const request: RequestData = getSpanData(serverSpan) as RequestData;
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

    const dependency: DependencyData = getSpanData(clientSpan) as DependencyData;
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
      },
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
      events: [exceptionEvent],
    };

    const exception: ExceptionData = getSpanExceptionColumns(
      exceptionEvent.attributes,
      clientSpan.attributes,
    );
    assert.equal(exception.Message, "testExceptionMessage");
    assert.equal(exception.StackTrace, "testStackTrace");
    assert.equal(exception.CustomDimensions.get("customAttribute"), "test");
  });

  it("Can parse a Log into an ExceptionData", () => {
    const resource = resourceFromAttributes({});
    const traceLog = createMockSdkLogRecord(
      resource,
      { name: "test" },
      {
        body: "testMessage",
      },
    );
    traceLog.attributes["exception.stacktrace"] = "testStackTrace";
    traceLog.attributes["exception.message"] = "testExceptionMessage";
    traceLog.attributes["customAttribute"] = "test";
    traceLog.attributes["exception.type"] = "Error";

    const exception: ExceptionData = getLogData(traceLog) as ExceptionData;
    assert.equal(exception.Message, "testExceptionMessage");
    assert.equal(exception.StackTrace, "testStackTrace");
    assert.equal(exception.CustomDimensions.get("customAttribute"), "test");
  });

  it("Can parse a Log into a TraceData", () => {
    const resource = resourceFromAttributes({});
    const traceLog = createMockSdkLogRecord(
      resource,
      { name: "test" },
      {
        body: "testMessage",
      },
    );
    traceLog.attributes["customAttribute"] = "test";

    const trace: TraceData = getLogData(traceLog) as TraceData;
    assert.equal(trace.Message, "testMessage");
    assert.equal(trace.CustomDimensions.get("customAttribute"), "test");
  });
});

describe("Live Metrics filtering - Applying valid filters", () => {
  const filterClass: Filter = new Filter();
  it("Can handle AnyField filter", () => {
    const anyFieldContainsHi: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "hi",
    };

    const anyFieldNotContains: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.DoesNotContain,
      comparand: "hi",
    };

    const anyFieldContainsCool: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "cool",
    };

    const anyFieldForNumeric: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "200",
    };

    const anyFieldForBoolean: FilterInfo = {
      fieldName: "*",
      predicate: KnownPredicateType.Contains,
      comparand: "true",
    };

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
      filters: [anyFieldContainsHi],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    // request contains "hi" in multiple fields & filter is contains hi
    // return true
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request1));
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request1));

    // request does not contain "hi" in any field & filter is contains hi
    // return false
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request2) === false);
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request2) === false);

    // request does not contain "hi" in any field & filter is does not contain hi
    // return true
    conjunctionGroup.filters = [anyFieldNotContains];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request2));
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request2));

    // request contains "cool" in custom dimensions & filter is contains cool
    // return true
    conjunctionGroup.filters = [anyFieldContainsCool];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request2));
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request2));

    // request contains 200 in duration & filter is contains "200".
    // fields are expected to be treated as string
    conjunctionGroup.filters = [anyFieldForNumeric];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request1));
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request1));

    // request contains true in Success & filter is contains "true".
    // fields are expected to be treated as string
    conjunctionGroup.filters = [anyFieldForBoolean];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request1));
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request1));
  });

  it("Can handle CustomDimension filter", () => {
    const customDimFilter: FilterInfo = {
      fieldName: "CustomDimensions.hi",
      predicate: KnownPredicateType.Equal,
      comparand: "hi",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [customDimFilter],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>([["bye", "hi"]]),
    };

    // the asked for field is not in the custom dimensions so return false
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request) === false);

    // the asked for field is in the custom dimensions but value does not match
    request.CustomDimensions.clear();
    request.CustomDimensions.set("hi", "bye");
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request) === false);

    // the asked for field is in the custom dimensions and value matches
    request.CustomDimensions.set("hi", "hi");
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // testing not equal predicate. The CustomDimensions.hi value != hi so return true.
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.NotEqual;
    request.CustomDimensions.set("hi", "bye");
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // testing does not contain predicate. The CustomDimensions.hi value does not contain hi so return true.
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.DoesNotContain;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // testing contains predicate. The CustomDimensions.hi value contains hi so return true.
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.Contains;
    request.CustomDimensions.set("hi", "hi there");
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));
  });

  it("Can handle filter on known boolean columns", () => {
    const filter: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: KnownPredicateType.Equal,
      comparand: "true",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

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
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request Success filter does not match
    request.Success = false;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request) === false);

    // Request Success filter matches for != predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.NotEqual;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Dependency Success filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Dependency;
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.Equal;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency Success filter does not match
    dependency.Success = false;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, dependency) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency) === false);

    // Dependency Success filter matches for != predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.NotEqual;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));
  });

  it("Can handle filter on known numeric columns", () => {
    const filter: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "200",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

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
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request ResponseCode filter does not match
    request.ResponseCode = 404;
    request.Success = false;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request) === false);

    // Dependency ResultCode filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Dependency;
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.ResultCode;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency ResultCode filter does not match
    dependency.ResultCode = 404;
    dependency.Success = false;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, dependency) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency) === false);

    // Dependency duration filter matches
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.Duration;
    derivedMetricInfo.filterGroups[0].filters[0].comparand = "14.6:56:7.89"; // 14 days, 6 hours, 56 minutes, 7.89 seconds (1234567890 ms)
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency duration filter does not match
    dependency.Duration = 400;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, dependency) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency) === false);

    // Request duration filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Request;
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownRequestColumns.Duration;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request duration filter does not match
    request.Duration = 400;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request) === false);

    // != predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.NotEqual;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // < predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.LessThan;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // <= predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.LessThanOrEqual;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // > predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.GreaterThan;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request) === false);

    // >= predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.GreaterThanOrEqual;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request) === false);
  });

  it("Can handle filter on known string columns", () => {
    const filter: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Contains,
      comparand: "hi",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

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
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request Url filter does not match
    request.Url = "https://test.com/bye";
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request) === false);

    // Dependency Data filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Dependency;
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.Data;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency Data filter does not match
    dependency.Data = "https://test.com/bye";
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, dependency) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency) === false);

    // Trace Message filter matches
    derivedMetricInfo.telemetryType = KnownTelemetryType.Trace;
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = "Message";
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, trace));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, trace));

    // Trace Message filter does not match
    trace.Message = "bye";
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, trace) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, trace) === false);

    // Exception Message filter matches. Note that fieldName is still "Message" here and that's intended (we remove the Exception. prefix when validating config)
    derivedMetricInfo.telemetryType = KnownTelemetryType.Exception;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, exception));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // Exception Message filter does not match
    exception.Message = "Exception Message";
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, exception) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception) === false);

    // != predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.NotEqual;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, exception));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // not contains
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.DoesNotContain;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, exception));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // equal
    derivedMetricInfo.filterGroups[0].filters[0].predicate = KnownPredicateType.Equal;
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, exception) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception) === false);
  });

  it("Empty filter conjunction group info - should match", () => {
    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    const documentFilterConjunctionGroupInfo: DocumentFilterConjunctionGroupInfo = {
      telemetryType: KnownTelemetryType.Request,
      filters: { filters: [] },
    };
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(
      filterClass.checkFilterConjunctionGroup(documentFilterConjunctionGroupInfo.filters, request),
    );
  });

  it("Can handle multiple filters in a filter conjunction group", () => {
    const filter1: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: KnownPredicateType.Contains,
      comparand: "hi",
    };

    const filter2: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: KnownPredicateType.Equal,
      comparand: "200",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter1, filter2],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    // matches both filters
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // only one filter matches, the entire conjunction group should return false
    request.Url = "https://test.com/bye";
    assert.ok(filterClass.checkMetricFilters(derivedMetricInfo, request) === false);
    assert.ok(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request) === false);
  });
});

describe("Live Metrics filtering - Metric Projection", () => {
  const proj: Projection = new Projection();
  it("Count()", () => {
    const derivedMetricInfoRequest: DerivedMetricInfo = {
      id: "id-for-request",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const derivedMetricInfoDependency: DerivedMetricInfo = {
      id: "id-for-dependency",
      telemetryType: KnownTelemetryType.Dependency,
      filterGroups: [{ filters: [] }],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const derivedMetricInfoTrace: DerivedMetricInfo = {
      id: "id-for-trace",
      telemetryType: KnownTelemetryType.Trace,
      filterGroups: [{ filters: [] }],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const derivedMetricInfoException: DerivedMetricInfo = {
      id: "id-for-exception",
      telemetryType: KnownTelemetryType.Exception,
      filterGroups: [{ filters: [] }],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

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

    proj.initDerivedMetricProjection(derivedMetricInfoRequest);
    proj.initDerivedMetricProjection(derivedMetricInfoDependency);
    proj.initDerivedMetricProjection(derivedMetricInfoTrace);
    proj.initDerivedMetricProjection(derivedMetricInfoException);

    // call the projection function with the corresponding telemetry data for each telemetry type
    proj.calculateProjection(derivedMetricInfoRequest, request);
    proj.calculateProjection(derivedMetricInfoRequest, request);

    proj.calculateProjection(derivedMetricInfoDependency, dependency);
    proj.calculateProjection(derivedMetricInfoDependency, dependency);
    proj.calculateProjection(derivedMetricInfoDependency, dependency);

    proj.calculateProjection(derivedMetricInfoTrace, trace);
    proj.calculateProjection(derivedMetricInfoTrace, trace);
    proj.calculateProjection(derivedMetricInfoTrace, trace);
    proj.calculateProjection(derivedMetricInfoTrace, trace);

    proj.calculateProjection(derivedMetricInfoException, exception);

    // get the projection map at the end and check if the count is correct
    const projectionMap: Map<string, number> = proj.getMetricValues();
    assert.equal(projectionMap.get("id-for-request"), 2);
    assert.equal(projectionMap.get("id-for-dependency"), 3);
    assert.equal(projectionMap.get("id-for-trace"), 4);
    assert.equal(projectionMap.get("id-for-exception"), 1);

    proj.clearProjectionMaps();
  });

  it("Duration", () => {
    const requestAvg: DerivedMetricInfo = {
      id: "id-for-request-avg",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: KnownAggregationType.Avg,
      backEndAggregation: KnownAggregationType.Avg,
    };

    const requestMin: DerivedMetricInfo = {
      id: "id-for-request-min",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: KnownAggregationType.Min,
      backEndAggregation: KnownAggregationType.Min,
    };

    const requestMax: DerivedMetricInfo = {
      id: "id-for-request-max",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: KnownAggregationType.Max,
      backEndAggregation: KnownAggregationType.Max,
    };

    const dependencyAvg: DerivedMetricInfo = {
      id: "id-for-dependency-avg",
      telemetryType: KnownTelemetryType.Dependency,
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: KnownAggregationType.Avg,
      backEndAggregation: KnownAggregationType.Avg,
    };

    const dependencyMin: DerivedMetricInfo = {
      id: "id-for-dependency-min",
      telemetryType: KnownTelemetryType.Dependency,
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: KnownAggregationType.Min,
      backEndAggregation: KnownAggregationType.Min,
    };

    const dependencyMax: DerivedMetricInfo = {
      id: "id-for-dependency-max",
      telemetryType: KnownTelemetryType.Dependency,
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: KnownAggregationType.Max,
      backEndAggregation: KnownAggregationType.Max,
    };

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

    proj.initDerivedMetricProjection(requestAvg);
    proj.initDerivedMetricProjection(requestMin);
    proj.initDerivedMetricProjection(requestMax);
    proj.initDerivedMetricProjection(dependencyAvg);
    proj.initDerivedMetricProjection(dependencyMin);
    proj.initDerivedMetricProjection(dependencyMax);

    // projection for request duration - avg
    proj.calculateProjection(requestAvg, request);
    request.Duration = 400;
    proj.calculateProjection(requestAvg, request);
    request.Duration = 600;
    proj.calculateProjection(requestAvg, request);

    // projection for request duration - min
    proj.calculateProjection(requestMin, request);
    request.Duration = 100;
    proj.calculateProjection(requestMin, request);
    request.Duration = 500;
    proj.calculateProjection(requestMin, request);

    // projection for request duration - max
    proj.calculateProjection(requestMax, request);
    request.Duration = 100;
    proj.calculateProjection(requestMax, request);
    request.Duration = 600;
    proj.calculateProjection(requestMax, request);

    // projection for dependency duration - avg
    proj.calculateProjection(dependencyAvg, dependency);
    dependency.Duration = 400;
    proj.calculateProjection(dependencyAvg, dependency);
    dependency.Duration = 600;
    proj.calculateProjection(dependencyAvg, dependency);

    // projection for request duration - min
    proj.calculateProjection(dependencyMin, dependency);
    dependency.Duration = 100;
    proj.calculateProjection(dependencyMin, dependency);
    dependency.Duration = 500;
    proj.calculateProjection(dependencyMin, dependency);

    // projection for request duration - max
    proj.calculateProjection(dependencyMax, dependency);
    dependency.Duration = 100;
    proj.calculateProjection(dependencyMax, dependency);
    dependency.Duration = 600;
    proj.calculateProjection(dependencyMax, dependency);

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
    const avg: DerivedMetricInfo = {
      id: "id-avg",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
      aggregation: KnownAggregationType.Avg,
      backEndAggregation: KnownAggregationType.Avg,
    };

    const min: DerivedMetricInfo = {
      id: "id-min",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
      aggregation: KnownAggregationType.Min,
      backEndAggregation: KnownAggregationType.Min,
    };

    const max: DerivedMetricInfo = {
      id: "id-max",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
      aggregation: KnownAggregationType.Max,
      backEndAggregation: KnownAggregationType.Max,
    };

    const sum: DerivedMetricInfo = {
      id: "id-sum",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
      aggregation: KnownAggregationType.Sum,
      backEndAggregation: KnownAggregationType.Sum,
    };

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    proj.initDerivedMetricProjection(avg);
    proj.initDerivedMetricProjection(min);
    proj.initDerivedMetricProjection(max);
    proj.initDerivedMetricProjection(sum);

    // custom dim doesn't exist in current request - should throw exception
    assert.throws(() => proj.calculateProjection(avg, request), MetricFailureToCreateError);

    // custom dim exists in current request but value does not convert to a number - should throw exception
    request.CustomDimensions.set("property", "hi");
    assert.throws(() => proj.calculateProjection(avg, request), MetricFailureToCreateError);

    // custom dim - avg
    request.CustomDimensions.set("property", "5");
    proj.calculateProjection(avg, request);
    request.CustomDimensions.set("property", "10");
    proj.calculateProjection(avg, request);
    request.CustomDimensions.set("property", "15");
    proj.calculateProjection(avg, request);

    // custom dim - min
    proj.calculateProjection(min, request);
    request.CustomDimensions.set("property", "1");
    proj.calculateProjection(min, request);
    request.CustomDimensions.set("property", "20");
    proj.calculateProjection(min, request);

    // custom dim - max
    proj.calculateProjection(max, request);
    request.CustomDimensions.set("property", "1");
    proj.calculateProjection(max, request);
    request.CustomDimensions.set("property", "15");
    proj.calculateProjection(max, request);

    // custom dim - sum
    proj.calculateProjection(sum, request);
    request.CustomDimensions.set("property", "1");
    proj.calculateProjection(sum, request);
    request.CustomDimensions.set("property", "15");
    proj.calculateProjection(sum, request);

    // get the projection map at the end and check if the values are correct.
    const projectionMap: Map<string, number> = proj.getMetricValues();
    assert.equal(projectionMap.get("id-avg"), 10);
    assert.equal(projectionMap.get("id-min"), 1);
    assert.equal(projectionMap.get("id-max"), 20);
    assert.equal(projectionMap.get("id-sum"), 31);

    proj.clearProjectionMaps();
  });

  it("Projection across multiple seconds & projection after config change to no derived metrics", () => {
    const avg: DerivedMetricInfo = {
      id: "id-avg",
      telemetryType: KnownTelemetryType.Request,
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
      aggregation: KnownAggregationType.Avg,
      backEndAggregation: KnownAggregationType.Avg,
    };

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>([["property", "5"]]),
    };

    proj.initDerivedMetricProjection(avg);
    proj.calculateProjection(avg, request);
    assert.equal(proj.getMetricValues().get("id-avg"), 5);

    assert.equal(proj.getMetricValues().get("id-avg"), 0);

    request.CustomDimensions.set("property", "10");
    proj.calculateProjection(avg, request);
    request.CustomDimensions.set("property", "6");
    proj.calculateProjection(avg, request);
    assert.equal(proj.getMetricValues().get("id-avg"), 8);

    proj.clearProjectionMaps();
    assert.equal(proj.getMetricValues().size, 0);
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
    const traceDoc: Trace = getLogDocument(trace) as Trace;
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
