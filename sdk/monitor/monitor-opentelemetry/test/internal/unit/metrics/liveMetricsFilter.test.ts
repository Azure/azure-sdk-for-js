// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DerivedMetricInfoOutput,
  FilterConjunctionGroupInfoOutput,
  FilterInfoOutput,
  RemoteDependency,
  /* eslint-disable-next-line @typescript-eslint/no-redeclare */
  Request,
  Exception,
  Trace,
  DocumentFilterConjunctionGroupInfoOutput,
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
import { assert, describe, it } from "vitest";

describe("Live Metrics filtering - Validator", () => {
  const validator: Validator = new Validator();
  it("The validator rejects the invalid telemetry types", () => {
    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id1",
      TelemetryType: "Event",
      FilterGroups: [{ Filters: [] }],
      Projection: "Message",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    assert.throws(
      () => validator.validateTelemetryType(DerivedMetricInfoOutput.TelemetryType),
      TelemetryTypeError,
    );
    DerivedMetricInfoOutput.TelemetryType = "\\Random\\Counter";
    assert.throws(
      () => validator.validateTelemetryType(DerivedMetricInfoOutput.TelemetryType),
      TelemetryTypeError,
    );
    DerivedMetricInfoOutput.TelemetryType = "Metric";
    assert.throws(
      () => validator.validateTelemetryType(DerivedMetricInfoOutput.TelemetryType),
      TelemetryTypeError,
    );
    DerivedMetricInfoOutput.TelemetryType = "does not exist";
    assert.throws(
      () => validator.validateTelemetryType(DerivedMetricInfoOutput.TelemetryType),
      TelemetryTypeError,
    );
  });

  it("The validator rejects CustomMetrics Projections and Filters (not supported in Otel)", () => {
    const invalid1: DerivedMetricInfoOutput = {
      Id: "random-id1",
      TelemetryType: "Request",
      FilterGroups: [],
      Projection: "CustomMetrics.property",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    const conjunctionGroup: FilterConjunctionGroupInfoOutput = {
      Filters: [
        {
          FieldName: "CustomMetrics.property",
          Predicate: "Equal",
          Comparand: "5",
        },
      ],
    };

    const invalid2: DerivedMetricInfoOutput = {
      Id: "random-id2",
      TelemetryType: "Request",
      FilterGroups: [conjunctionGroup],
      Projection: "Message",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    assert.throws(
      () => validator.checkCustomMetricProjection(invalid1),
      UnexpectedFilterCreateError,
    );
    validator.validateTelemetryType(invalid2.TelemetryType); // this shouldn't throw an error as the telemetry type is supported
    assert.throws(() => validator.validateMetricFilters(invalid2), UnexpectedFilterCreateError);

    const invalidDocFilterConjuctionInfo: DocumentFilterConjunctionGroupInfoOutput = {
      TelemetryType: "Request",
      Filters: conjunctionGroup,
    };
    validator.validateTelemetryType(invalidDocFilterConjuctionInfo.TelemetryType);
    assert.throws(
      () => validator.validateDocumentFilters(invalidDocFilterConjuctionInfo),
      UnexpectedFilterCreateError,
    );
  });

  it("The validator rejects invalid Filters", () => {
    const emptyFilterName: FilterInfoOutput = {
      FieldName: "",
      Predicate: "Equal",
      Comparand: "blah",
    };

    const emptyComparand: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "Equal",
      Comparand: "",
    };

    const invalidAnyFieldEqual: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "Equal",
      Comparand: "5",
    };

    const invalidAnyFieldNotEqual: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "NotEqual",
      Comparand: "5",
    };

    const invalidAnyFieldLessThan: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "LessThan",
      Comparand: "5",
    };

    const invalidAnyFieldLessThanOrEqual: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "LessThanOrEqual",
      Comparand: "5",
    };

    const invalidAnyFieldGreaterThan: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "GreaterThan",
      Comparand: "5",
    };

    const invalidAnyFieldGreaterThanOrEqual: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "GreaterThanOrEqual",
      Comparand: "5",
    };

    const invalidStringFieldPredicate: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "LessThan",
      Comparand: "hi",
    };

    const invalidStringFieldPredicate2: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "GreaterThan",
      Comparand: "hi",
    };

    const invalidStringFieldPredicate3: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "GreaterThanOrEqual",
      Comparand: "hi",
    };

    const invalidStringFieldPredicate4: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "LessThanOrEqual",
      Comparand: "hi",
    };

    const invalidCustomDimLess: FilterInfoOutput = {
      FieldName: "CustomDimensions.property",
      Predicate: "LessThan",
      Comparand: "hi",
    };

    const invalidCustomDimGreater: FilterInfoOutput = {
      FieldName: "CustomDimensions.property",
      Predicate: "GreaterThan",
      Comparand: "hi",
    };

    const invalidCustomDimGreaterThanOrEqual: FilterInfoOutput = {
      FieldName: "CustomDimensions.property",
      Predicate: "GreaterThanOrEqual",
      Comparand: "hi",
    };

    const invalidCustomDimLessThanOrEqual: FilterInfoOutput = {
      FieldName: "CustomDimensions.property",
      Predicate: "LessThanOrEqual",
      Comparand: "hi",
    };

    const invalidNumericFieldPredicate: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "Contains",
      Comparand: "5",
    };

    const invalidNumericFieldPredicate2: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "DoesNotContain",
      Comparand: "5",
    };

    const invalidNumericFieldComparand: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "Equal",
      Comparand: "hi",
    };

    const invalidDurationComparand: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Duration,
      Predicate: "NotEqual",
      Comparand: "invalid timestamp",
    };

    const unknownFieldName: FilterInfoOutput = {
      FieldName: "unknown field",
      Predicate: "Contains",
      Comparand: "hi",
    };

    const successLessThan: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Success,
      Predicate: "LessThan",
      Comparand: "true",
    };

    const successLessThanOrEqual: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Success,
      Predicate: "LessThanOrEqual",
      Comparand: "true",
    };

    const successFieldGreaterThan: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Success,
      Predicate: "GreaterThan",
      Comparand: "true",
    };

    const successGreaterThanOrEqual: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Success,
      Predicate: "GreaterThanOrEqual",
      Comparand: "true",
    };

    const successContains: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Success,
      Predicate: "Contains",
      Comparand: "true",
    };

    const successNotContain: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Success,
      Predicate: "DoesNotContain",
      Comparand: "true",
    };

    const invalidBool: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Success,
      Predicate: "Equal",
      Comparand: "hi",
    };

    const filterInfoList: FilterInfoOutput[] = [
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

    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id",
      TelemetryType: "Request",
      FilterGroups: [],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    const DocumentFilterConjunctionGroupInfoOutput: DocumentFilterConjunctionGroupInfoOutput = {
      TelemetryType: "Request",
      Filters: { Filters: [] },
    };

    filterInfoList.forEach((filter) => {
      const conjunctionGroup: FilterConjunctionGroupInfoOutput = {
        Filters: [filter],
      };

      DerivedMetricInfoOutput.FilterGroups = [conjunctionGroup];
      assert.throws(
        () => validator.validateMetricFilters(DerivedMetricInfoOutput),
        UnexpectedFilterCreateError || TelemetryTypeError,
      );

      DocumentFilterConjunctionGroupInfoOutput.Filters = conjunctionGroup;

      assert.throws(
        () => validator.validateDocumentFilters(DocumentFilterConjunctionGroupInfoOutput),
        UnexpectedFilterCreateError || TelemetryTypeError,
      );
    });

    DerivedMetricInfoOutput.FilterGroups = [{ Filters: [unknownFieldName] }];
    DocumentFilterConjunctionGroupInfoOutput.Filters = { Filters: [unknownFieldName] };
    const supportedTelemetryTypes: string[] = [
      "Request",
      "Dependency",
      "Exception",
      "Trace",
    ];

    supportedTelemetryTypes.forEach((TelemetryType) => {
      DerivedMetricInfoOutput.TelemetryType = TelemetryType;
      assert.throws(
        () => validator.validateMetricFilters(DerivedMetricInfoOutput),
        UnexpectedFilterCreateError,
      );
      DocumentFilterConjunctionGroupInfoOutput.TelemetryType = TelemetryType;
      assert.throws(
        () => validator.validateDocumentFilters(DocumentFilterConjunctionGroupInfoOutput),
        UnexpectedFilterCreateError,
      );
    });
  });

  it("The validator rejects a DerivedMetricInfoOutput/documentFilterConjuctionGroupInfo if the only FilterConjunctionGroupInfoOutput has an invalid filter inside it", () => {
    const invalidFilter: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Duration,
      Predicate: "NotEqual",
      Comparand: "invalid timestamp",
    };

    const validFilter: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "Equal",
      Comparand: "200",
    };

    const conjunctionGroup: FilterConjunctionGroupInfoOutput = {
      Filters: [validFilter, invalidFilter],
    };
    const DocumentFilterConjunctionGroupInfoOutput: DocumentFilterConjunctionGroupInfoOutput = {
      TelemetryType: "Request",
      Filters: conjunctionGroup,
    };

    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id",
      TelemetryType: "Request",
      FilterGroups: [conjunctionGroup],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    assert.throws(
      () => validator.validateMetricFilters(DerivedMetricInfoOutput),
      UnexpectedFilterCreateError,
    );
    assert.throws(
      () => validator.validateDocumentFilters(DocumentFilterConjunctionGroupInfoOutput),
      UnexpectedFilterCreateError,
    );
  });

  it("The validator accepts valid Filters", () => {
    const anyFieldContains: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "Contains",
      Comparand: "hi",
    };

    const anyFieldDoesNotContain: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "DoesNotContain",
      Comparand: "hi",
    };

    const stringNotEqual: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "NotEqual",
      Comparand: "hi",
    };

    const stringEquals: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "Equal",
      Comparand: "hi",
    };

    const stringContain: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "Contains",
      Comparand: "hi",
    };

    const stringNotContain: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "DoesNotContain",
      Comparand: "hi",
    };

    const customDimNotEqual: FilterInfoOutput = {
      FieldName: "CustomDimensions.property",
      Predicate: "NotEqual",
      Comparand: "hi",
    };

    const customDimEquals: FilterInfoOutput = {
      FieldName: "CustomDimensions.property",
      Predicate: "Equal",
      Comparand: "hi",
    };

    const customDimContain: FilterInfoOutput = {
      FieldName: "CustomDimensions.property",
      Predicate: "Contains",
      Comparand: "hi",
    };

    const customDimNotContain: FilterInfoOutput = {
      FieldName: "CustomDimensions.property",
      Predicate: "DoesNotContain",
      Comparand: "hi",
    };

    const numericEquals: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "Equal",
      Comparand: "5",
    };

    const numericNotEqual: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "NotEqual",
      Comparand: "5",
    };

    const numericLessThan: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "LessThan",
      Comparand: "5",
    };

    const numericGreaterThan: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "GreaterThan",
      Comparand: "5",
    };

    const numericLessThanOrEqual: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "LessThanOrEqual",
      Comparand: "5",
    };

    const numericGreaterThanOrEqual: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "GreaterThanOrEqual",
      Comparand: "5",
    };

    const durationEquals: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Duration,
      Predicate: "Equal",
      Comparand: "0.0:0:0.2", // 200 ms in iso 8601 format
    };

    const successEqual: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Success,
      Predicate: "Equal",
      Comparand: "true",
    };

    const successNotEqual: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Success,
      Predicate: "NotEqual",
      Comparand: "false",
    };

    const filterInfoList: FilterInfoOutput[] = [
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

    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id",
      TelemetryType: "Request",
      FilterGroups: [],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    filterInfoList.forEach((filter) => {
      const conjunctionGroup: FilterConjunctionGroupInfoOutput = {
        Filters: [filter],
      };

      DerivedMetricInfoOutput.FilterGroups = [conjunctionGroup];
      validator.validateMetricFilters(DerivedMetricInfoOutput);

      const DocumentFilterConjunctionGroupInfoOutput: DocumentFilterConjunctionGroupInfoOutput = {
        TelemetryType: "Request",
        Filters: conjunctionGroup,
      };
      validator.validateDocumentFilters(DocumentFilterConjunctionGroupInfoOutput);
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

describe("Live Metrics filtering - Applying valid Filters", () => {
  const filterClass: Filter = new Filter();
  it("Can handle AnyField filter", () => {
    const anyFieldContainsHi: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "Contains",
      Comparand: "hi",
    };

    const anyFieldNotContains: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "DoesNotContain",
      Comparand: "hi",
    };

    const anyFieldContainsCool: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "Contains",
      Comparand: "cool",
    };

    const anyFieldForNumeric: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "Contains",
      Comparand: "200",
    };

    const anyFieldForBoolean: FilterInfoOutput = {
      FieldName: "*",
      Predicate: "Contains",
      Comparand: "true",
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

    const conjunctionGroup: FilterConjunctionGroupInfoOutput = {
      Filters: [anyFieldContainsHi],
    };

    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id",
      TelemetryType: "Request",
      FilterGroups: [conjunctionGroup],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    // request contains "hi" in multiple fields & filter is contains hi
    // return true
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request1));
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request1));

    // request does not contain "hi" in any field & filter is contains hi
    // return false
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request2));
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request2));

    // request does not contain "hi" in any field & filter is does not contain hi
    // return true
    conjunctionGroup.Filters = [anyFieldNotContains];
    DerivedMetricInfoOutput.FilterGroups = [conjunctionGroup];
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request2));
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request2));

    // request contains "cool" in custom dimensions & filter is contains cool
    // return true
    conjunctionGroup.Filters = [anyFieldContainsCool];
    DerivedMetricInfoOutput.FilterGroups = [conjunctionGroup];
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request2));
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request2));

    // request contains 200 in duration & filter is contains "200".
    // fields are expected to be treated as string
    conjunctionGroup.Filters = [anyFieldForNumeric];
    DerivedMetricInfoOutput.FilterGroups = [conjunctionGroup];
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request1));
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request1));

    // request contains true in Success & filter is contains "true".
    // fields are expected to be treated as string
    conjunctionGroup.Filters = [anyFieldForBoolean];
    DerivedMetricInfoOutput.FilterGroups = [conjunctionGroup];
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request1));
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request1));
  });

  it("Can handle CustomDimension filter", () => {
    const customDimFilter: FilterInfoOutput = {
      FieldName: "CustomDimensions.hi",
      Predicate: "Equal",
      Comparand: "hi",
    };

    const conjunctionGroup: FilterConjunctionGroupInfoOutput = {
      Filters: [customDimFilter],
    };

    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id",
      TelemetryType: "Request",
      FilterGroups: [conjunctionGroup],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
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
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // the asked for field is in the custom dimensions but value does not match
    request.CustomDimensions.clear();
    request.CustomDimensions.set("hi", "bye");
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // the asked for field is in the custom dimensions and value matches
    request.CustomDimensions.set("hi", "hi");
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // testing not equal Predicate. The CustomDimensions.hi value != hi so return true.
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "NotEqual";
    request.CustomDimensions.set("hi", "bye");
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // testing does not contain Predicate. The CustomDimensions.hi value does not contain hi so return true.
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "DoesNotContain";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // testing contains Predicate. The CustomDimensions.hi value contains hi so return true.
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "Contains";
    request.CustomDimensions.set("hi", "hi there");
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));
  });

  it("Can handle filter on known boolean columns", () => {
    const filter: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Success,
      Predicate: "Equal",
      Comparand: "true",
    };

    const conjunctionGroup: FilterConjunctionGroupInfoOutput = {
      Filters: [filter],
    };

    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id",
      TelemetryType: "Request",
      FilterGroups: [conjunctionGroup],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
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
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request Success filter does not match
    request.Success = false;
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request Success filter matches for != Predicate
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "NotEqual";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Dependency Success filter matches
    DerivedMetricInfoOutput.TelemetryType = "Dependency";
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "Equal";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, dependency));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency Success filter does not match
    dependency.Success = false;
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, dependency));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency Success filter matches for != Predicate
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "NotEqual";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, dependency));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));
  });

  it("Can handle filter on known numeric columns", () => {
    const filter: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "Equal",
      Comparand: "200",
    };

    const conjunctionGroup: FilterConjunctionGroupInfoOutput = {
      Filters: [filter],
    };

    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id",
      TelemetryType: "Request",
      FilterGroups: [conjunctionGroup],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
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
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request ResponseCode filter does not match
    request.ResponseCode = 404;
    request.Success = false;
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Dependency ResultCode filter matches
    DerivedMetricInfoOutput.TelemetryType = "Dependency";
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].FieldName = KnownDependencyColumns.ResultCode;
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, dependency));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency ResultCode filter does not match
    dependency.ResultCode = 404;
    dependency.Success = false;
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, dependency));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency duration filter matches
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].FieldName = KnownDependencyColumns.Duration;
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Comparand = "14.6:56:7.89"; // 14 days, 6 hours, 56 minutes, 7.89 seconds (1234567890 ms)
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, dependency));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency duration filter does not match
    dependency.Duration = 400;
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, dependency));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Request duration filter matches
    DerivedMetricInfoOutput.TelemetryType = "Request";
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].FieldName = KnownRequestColumns.Duration;
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request duration filter does not match
    request.Duration = 400;
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // != Predicate
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "NotEqual";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // < Predicate
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "LessThan";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // <= Predicate
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "LessThanOrEqual";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // > Predicate
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "GreaterThan";
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // >= Predicate
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "GreaterThanOrEqual";
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));
  });

  it("Can handle filter on known string columns", () => {
    const filter: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "Contains",
      Comparand: "hi",
    };

    const conjunctionGroup: FilterConjunctionGroupInfoOutput = {
      Filters: [filter],
    };

    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id",
      TelemetryType: "Request",
      FilterGroups: [conjunctionGroup],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
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
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request Url filter does not match
    request.Url = "https://test.com/bye";
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Dependency Data filter matches
    DerivedMetricInfoOutput.TelemetryType = "Dependency";
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].FieldName = KnownDependencyColumns.Data;
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, dependency));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency Data filter does not match
    dependency.Data = "https://test.com/bye";
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, dependency));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Trace Message filter matches
    DerivedMetricInfoOutput.TelemetryType = "Trace";
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].FieldName = "Message";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, trace));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, trace));

    // Trace Message filter does not match
    trace.Message = "bye";
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, trace));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, trace));

    // Exception Message filter matches. Note that FieldName is still "Message" here and that's intended (we remove the Exception. prefix when validating config)
    DerivedMetricInfoOutput.TelemetryType = "Exception";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, exception));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // Exception Message filter does not match
    exception.Message = "Exception Message";
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, exception));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // != Predicate
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "NotEqual";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, exception));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // not contains
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "DoesNotContain";
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, exception));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // equal
    DerivedMetricInfoOutput.FilterGroups[0].Filters[0].Predicate = "Equal";
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, exception));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));
  });

  it("Empty filter conjunction group info - should match", () => {
    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id",
      TelemetryType: "Request",
      FilterGroups: [{ Filters: [] }],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    const DocumentFilterConjunctionGroupInfoOutput: DocumentFilterConjunctionGroupInfoOutput = {
      TelemetryType: "Request",
      Filters: { Filters: [] },
    };
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(
      filterClass.checkFilterConjunctionGroup(DocumentFilterConjunctionGroupInfoOutput.Filters, request),
    );
  });

  it("Can handle multiple Filters in a filter conjunction group", () => {
    const filter1: FilterInfoOutput = {
      FieldName: KnownRequestColumns.Url,
      Predicate: "Contains",
      Comparand: "hi",
    };

    const filter2: FilterInfoOutput = {
      FieldName: KnownRequestColumns.ResponseCode,
      Predicate: "Equal",
      Comparand: "200",
    };

    const conjunctionGroup: FilterConjunctionGroupInfoOutput = {
      Filters: [filter1, filter2],
    };

    const DerivedMetricInfoOutput: DerivedMetricInfoOutput = {
      Id: "random-id",
      TelemetryType: "Request",
      FilterGroups: [conjunctionGroup],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    const request: RequestData = {
      Url: "https://test.com/hiThere",
      Duration: 200,
      ResponseCode: 200,
      Success: true,
      Name: "GET /hiThere",
      CustomDimensions: new Map<string, string>(),
    };

    // matches both Filters
    assert.isTrue(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // only one filter matches, the entire conjunction group should return false
    request.Url = "https://test.com/bye";
    assert.isFalse(filterClass.checkMetricFilters(DerivedMetricInfoOutput, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));
  });
});

describe("Live Metrics filtering - Metric Projection", () => {
  const proj: Projection = new Projection();
  it("Count()", () => {
    const derivedMetricInfoRequest: DerivedMetricInfoOutput = {
      Id: "id-for-request",
      TelemetryType: "Request",
      FilterGroups: [{ Filters: [] }],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    const derivedMetricInfoDependency: DerivedMetricInfoOutput = {
      Id: "id-for-dependency",
      TelemetryType: "Dependency",
      FilterGroups: [{ Filters: [] }],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    const derivedMetricInfoTrace: DerivedMetricInfoOutput = {
      Id: "id-for-trace",
      TelemetryType: "Trace",
      FilterGroups: [{ Filters: [] }],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
    };

    const derivedMetricInfoException: DerivedMetricInfoOutput = {
      Id: "id-for-exception",
      TelemetryType: "Exception",
      FilterGroups: [{ Filters: [] }],
      Projection: "Count()",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
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

    // call the Projection function with the corresponding telemetry data for each telemetry type
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

    // get the Projection map at the end and check if the count is correct
    const ProjectionMap: Map<string, number> = proj.getMetricValues();
    assert.equal(ProjectionMap.get("id-for-request"), 2);
    assert.equal(ProjectionMap.get("id-for-dependency"), 3);
    assert.equal(ProjectionMap.get("id-for-trace"), 4);
    assert.equal(ProjectionMap.get("id-for-exception"), 1);

    proj.clearProjectionMaps();
  });

  it("Duration", () => {
    const requestAvg: DerivedMetricInfoOutput = {
      Id: "id-for-request-avg",
      TelemetryType: "Request",
      FilterGroups: [{ Filters: [] }],
      Projection: "Duration",
      Aggregation: "Avg",
      BackEndAggregation: "Avg",
    };

    const requestMin: DerivedMetricInfoOutput = {
      Id: "id-for-request-min",
      TelemetryType: "Request",
      FilterGroups: [{ Filters: [] }],
      Projection: "Duration",
      Aggregation: "Min",
      BackEndAggregation: "Min",
    };

    const requestMax: DerivedMetricInfoOutput = {
      Id: "id-for-request-max",
      TelemetryType: "Request",
      FilterGroups: [{ Filters: [] }],
      Projection: "Duration",
      Aggregation: "Max",
      BackEndAggregation: "Max",
    };

    const dependencyAvg: DerivedMetricInfoOutput = {
      Id: "id-for-dependency-avg",
      TelemetryType: "Dependency",
      FilterGroups: [{ Filters: [] }],
      Projection: "Duration",
      Aggregation: "Avg",
      BackEndAggregation: "Avg",
    };

    const dependencyMin: DerivedMetricInfoOutput = {
      Id: "id-for-dependency-min",
      TelemetryType: "Dependency",
      FilterGroups: [{ Filters: [] }],
      Projection: "Duration",
      Aggregation: "Min",
      BackEndAggregation: "Min",
    };

    const dependencyMax: DerivedMetricInfoOutput = {
      Id: "id-for-dependency-max",
      TelemetryType: "Dependency",
      FilterGroups: [{ Filters: [] }],
      Projection: "Duration",
      Aggregation: "Max",
      BackEndAggregation: "Max",
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

    // Projection for request duration - avg
    proj.calculateProjection(requestAvg, request);
    request.Duration = 400;
    proj.calculateProjection(requestAvg, request);
    request.Duration = 600;
    proj.calculateProjection(requestAvg, request);

    // Projection for request duration - min
    proj.calculateProjection(requestMin, request);
    request.Duration = 100;
    proj.calculateProjection(requestMin, request);
    request.Duration = 500;
    proj.calculateProjection(requestMin, request);

    // Projection for request duration - max
    proj.calculateProjection(requestMax, request);
    request.Duration = 100;
    proj.calculateProjection(requestMax, request);
    request.Duration = 600;
    proj.calculateProjection(requestMax, request);

    // Projection for dependency duration - avg
    proj.calculateProjection(dependencyAvg, dependency);
    dependency.Duration = 400;
    proj.calculateProjection(dependencyAvg, dependency);
    dependency.Duration = 600;
    proj.calculateProjection(dependencyAvg, dependency);

    // Projection for request duration - min
    proj.calculateProjection(dependencyMin, dependency);
    dependency.Duration = 100;
    proj.calculateProjection(dependencyMin, dependency);
    dependency.Duration = 500;
    proj.calculateProjection(dependencyMin, dependency);

    // Projection for request duration - max
    proj.calculateProjection(dependencyMax, dependency);
    dependency.Duration = 100;
    proj.calculateProjection(dependencyMax, dependency);
    dependency.Duration = 600;
    proj.calculateProjection(dependencyMax, dependency);

    // get the Projection map at the end and check if the Projections are correct
    const ProjectionMap: Map<string, number> = proj.getMetricValues();
    assert.equal(ProjectionMap.get("id-for-request-avg"), 400);
    assert.equal(ProjectionMap.get("id-for-request-min"), 100);
    assert.equal(ProjectionMap.get("id-for-request-max"), 600);
    assert.equal(ProjectionMap.get("id-for-dependency-avg"), 400);
    assert.equal(ProjectionMap.get("id-for-dependency-min"), 100);
    assert.equal(ProjectionMap.get("id-for-dependency-max"), 600);

    proj.clearProjectionMaps();
  });

  it("CustomDimension", () => {
    const avg: DerivedMetricInfoOutput = {
      Id: "id-avg",
      TelemetryType: "Request",
      FilterGroups: [{ Filters: [] }],
      Projection: "CustomDimensions.property",
      Aggregation: "Avg",
      BackEndAggregation: "Avg",
    };

    const min: DerivedMetricInfoOutput = {
      Id: "id-min",
      TelemetryType: "Request",
      FilterGroups: [{ Filters: [] }],
      Projection: "CustomDimensions.property",
      Aggregation: "Min",
      BackEndAggregation: "Min",
    };

    const max: DerivedMetricInfoOutput = {
      Id: "id-max",
      TelemetryType: "Request",
      FilterGroups: [{ Filters: [] }],
      Projection: "CustomDimensions.property",
      Aggregation: "Max",
      BackEndAggregation: "Max",
    };

    const sum: DerivedMetricInfoOutput = {
      Id: "id-sum",
      TelemetryType: "Request",
      FilterGroups: [{ Filters: [] }],
      Projection: "CustomDimensions.property",
      Aggregation: "Sum",
      BackEndAggregation: "Sum",
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

    // get the Projection map at the end and check if the values are correct.
    const ProjectionMap: Map<string, number> = proj.getMetricValues();
    assert.equal(ProjectionMap.get("id-avg"), 10);
    assert.equal(ProjectionMap.get("id-min"), 1);
    assert.equal(ProjectionMap.get("id-max"), 20);
    assert.equal(ProjectionMap.get("id-sum"), 31);

    proj.clearProjectionMaps();
  });

  it("Projection across multiple seconds & Projection after config change to no derived metrics", () => {
    const avg: DerivedMetricInfoOutput = {
      Id: "id-avg",
      TelemetryType: "Request",
      FilterGroups: [{ Filters: [] }],
      Projection: "CustomDimensions.property",
      Aggregation: "Avg",
      BackEndAggregation: "Avg",
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

    assert.equal(requestDoc.Url, "https://test.com/hiThere");
    assert.equal(requestDoc.DocumentType, "Request");
    assert.equal(requestDoc.Duration, "PT0.2S");
    assert.equal(requestDoc.ResponseCode, "200");
    assert.equal(requestDoc.Name, "GET /hiThere");

    assert.equal(dependencyDoc.CommandName, "https://test.com/hiThere?x=y");
    assert.equal(dependencyDoc.DocumentType, "RemoteDependency");
    assert.equal(dependencyDoc.Duration, "PT0.2S");
    assert.equal(dependencyDoc.ResultCode, "200");
    assert.equal(dependencyDoc.Name, "GET /hiThere");

    assert.equal(traceDoc.Message, "hi there");
    assert.equal(traceDoc.DocumentType, "Trace");

    assert.equal(exceptionDoc.ExceptionMessage, "Exception Message hi");
    assert.equal(exceptionDoc.ExceptionType, "Error");
    assert.equal(exceptionDoc.DocumentType, "Exception");
  });
});

describe("Live Metrics filtering - timestamp conversion", () => {
  it("Can convert timestamp from filter.Comparand to ms", () => {
    assert.equal(getMsFromFilterTimestampString("14.6:56:7.89"), 1234567890);
    assert.equal(getMsFromFilterTimestampString("0.0:0:0.2"), 200);
    assert.equal(getMsFromFilterTimestampString("0.0:0:0.0"), 0);
    assert.equal(getMsFromFilterTimestampString("0.0:1:1.0"), 61000);
  });
});
