// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  TelemetryType,
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

  it("The validator rejects CustomMetrics Projections and Filters (not supported in Otel)", () => {
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
          predicate: "Equal",
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
      telemetryType: "Request",
      filters: conjunctionGroup,
    };
    validator.validateTelemetryType(invalidDocFilterConjuctionInfo.telemetryType);
    assert.throws(
      () => validator.validateDocumentFilters(invalidDocFilterConjuctionInfo),
      UnexpectedFilterCreateError,
    );
  });

  it("The validator rejects invalid Filters", () => {
    const emptyFilterName: FilterInfo = {
      fieldName: "",
      predicate: "Equal",
      comparand: "blah",
    };

    const emptyComparand: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "Equal",
      comparand: "",
    };

    const invalidAnyFieldEqual: FilterInfo = {
      fieldName: "*",
      predicate: "Equal",
      comparand: "5",
    };

    const invalidAnyFieldNotEqual: FilterInfo = {
      fieldName: "*",
      predicate: "NotEqual",
      comparand: "5",
    };

    const invalidAnyFieldLessThan: FilterInfo = {
      fieldName: "*",
      predicate: "LessThan",
      comparand: "5",
    };

    const invalidAnyFieldLessThanOrEqual: FilterInfo = {
      fieldName: "*",
      predicate: "LessThanOrEqual",
      comparand: "5",
    };

    const invalidAnyFieldGreaterThan: FilterInfo = {
      fieldName: "*",
      predicate: "GreaterThan",
      comparand: "5",
    };

    const invalidAnyFieldGreaterThanOrEqual: FilterInfo = {
      fieldName: "*",
      predicate: "GreaterThanOrEqual",
      comparand: "5",
    };

    const invalidStringFieldPredicate: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "LessThan",
      comparand: "hi",
    };

    const invalidStringFieldPredicate2: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "GreaterThan",
      comparand: "hi",
    };

    const invalidStringFieldPredicate3: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "GreaterThanOrEqual",
      comparand: "hi",
    };

    const invalidStringFieldPredicate4: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "LessThanOrEqual",
      comparand: "hi",
    };

    const invalidCustomDimLess: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: "LessThan",
      comparand: "hi",
    };

    const invalidCustomDimGreater: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: "GreaterThan",
      comparand: "hi",
    };

    const invalidCustomDimGreaterThanOrEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: "GreaterThanOrEqual",
      comparand: "hi",
    };

    const invalidCustomDimLessThanOrEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: "LessThanOrEqual",
      comparand: "hi",
    };

    const invalidNumericFieldPredicate: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "Contains",
      comparand: "5",
    };

    const invalidNumericFieldPredicate2: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "DoesNotContain",
      comparand: "5",
    };

    const invalidNumericFieldComparand: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "Equal",
      comparand: "hi",
    };

    const invalidDurationComparand: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: "NotEqual",
      comparand: "invalid timestamp",
    };

    const unknownFieldName: FilterInfo = {
      fieldName: "unknown field",
      predicate: "Contains",
      comparand: "hi",
    };

    const successLessThan: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: "LessThan",
      comparand: "true",
    };

    const successLessThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: "LessThanOrEqual",
      comparand: "true",
    };

    const successFieldGreaterThan: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: "GreaterThan",
      comparand: "true",
    };

    const successGreaterThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: "GreaterThanOrEqual",
      comparand: "true",
    };

    const successContains: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: "Contains",
      comparand: "true",
    };

    const successNotContain: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: "DoesNotContain",
      comparand: "true",
    };

    const invalidBool: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: "Equal",
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
      telemetryType: "Request",
      filterGroups: [],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const documentFilterConjunctionGroupInfo: DocumentFilterConjunctionGroupInfo = {
      telemetryType: "Request",
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
    const supportedTelemetryTypes: TelemetryType[] = [
      "Request",
      "Dependency",
      "Exception",
      "Trace",
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

  it("The validator rejects a DerivedMetricInfo/documentFilterConjuctionGroupInfo if the only FilterConjunctionGroupInfo has an invalid filter inside it", () => {
    const invalidFilter: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: "NotEqual",
      comparand: "invalid timestamp",
    };

    const validFilter: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "Equal",
      comparand: "200",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [validFilter, invalidFilter],
    };
    const documentFilterConjunctionGroupInfo: DocumentFilterConjunctionGroupInfo = {
      telemetryType: "Request",
      filters: conjunctionGroup,
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: "Request",
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

  it("The validator accepts valid Filters", () => {
    const anyFieldContains: FilterInfo = {
      fieldName: "*",
      predicate: "Contains",
      comparand: "hi",
    };

    const anyFieldDoesNotContain: FilterInfo = {
      fieldName: "*",
      predicate: "DoesNotContain",
      comparand: "hi",
    };

    const stringNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "NotEqual",
      comparand: "hi",
    };

    const stringEquals: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "Equal",
      comparand: "hi",
    };

    const stringContain: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "Contains",
      comparand: "hi",
    };

    const stringNotContain: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "DoesNotContain",
      comparand: "hi",
    };

    const customDimNotEqual: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: "NotEqual",
      comparand: "hi",
    };

    const customDimEquals: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: "Equal",
      comparand: "hi",
    };

    const customDimContain: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: "Contains",
      comparand: "hi",
    };

    const customDimNotContain: FilterInfo = {
      fieldName: "CustomDimensions.property",
      predicate: "DoesNotContain",
      comparand: "hi",
    };

    const numericEquals: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "Equal",
      comparand: "5",
    };

    const numericNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "NotEqual",
      comparand: "5",
    };

    const numericLessThan: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "LessThan",
      comparand: "5",
    };

    const numericGreaterThan: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "GreaterThan",
      comparand: "5",
    };

    const numericLessThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "LessThanOrEqual",
      comparand: "5",
    };

    const numericGreaterThanOrEqual: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "GreaterThanOrEqual",
      comparand: "5",
    };

    const durationEquals: FilterInfo = {
      fieldName: KnownRequestColumns.Duration,
      predicate: "Equal",
      comparand: "0.0:0:0.2", // 200 ms in iso 8601 format
    };

    const successEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: "Equal",
      comparand: "true",
    };

    const successNotEqual: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: "NotEqual",
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
      telemetryType: "Request",
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
        telemetryType: "Request",
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

describe("Live Metrics filtering - Applying valid Filters", () => {
  const filterClass: Filter = new Filter();
  it("Can handle AnyField filter", () => {
    const anyFieldContainsHi: FilterInfo = {
      fieldName: "*",
      predicate: "Contains",
      comparand: "hi",
    };

    const anyFieldNotContains: FilterInfo = {
      fieldName: "*",
      predicate: "DoesNotContain",
      comparand: "hi",
    };

    const anyFieldContainsCool: FilterInfo = {
      fieldName: "*",
      predicate: "Contains",
      comparand: "cool",
    };

    const anyFieldForNumeric: FilterInfo = {
      fieldName: "*",
      predicate: "Contains",
      comparand: "200",
    };

    const anyFieldForBoolean: FilterInfo = {
      fieldName: "*",
      predicate: "Contains",
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
      telemetryType: "Request",
      filterGroups: [conjunctionGroup],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    // request contains "hi" in multiple fields & filter is contains hi
    // return true
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request1));
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request1));

    // request does not contain "hi" in any field & filter is contains hi
    // return false
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request2));
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, request2));

    // request does not contain "hi" in any field & filter is does not contain hi
    // return true
    conjunctionGroup.filters = [anyFieldNotContains];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request2));
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request2));

    // request contains "cool" in custom dimensions & filter is contains cool
    // return true
    conjunctionGroup.filters = [anyFieldContainsCool];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request2));
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request2));

    // request contains 200 in duration & filter is contains "200".
    // fields are expected to be treated as string
    conjunctionGroup.filters = [anyFieldForNumeric];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request1));
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request1));

    // request contains true in Success & filter is contains "true".
    // fields are expected to be treated as string
    conjunctionGroup.filters = [anyFieldForBoolean];
    derivedMetricInfo.filterGroups = [conjunctionGroup];
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request1));
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request1));
  });

  it("Can handle CustomDimension filter", () => {
    const customDimFilter: FilterInfo = {
      fieldName: "CustomDimensions.hi",
      predicate: "Equal",
      comparand: "hi",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [customDimFilter],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: "Request",
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
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // the asked for field is in the custom dimensions but value does not match
    request.CustomDimensions.clear();
    request.CustomDimensions.set("hi", "bye");
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // the asked for field is in the custom dimensions and value matches
    request.CustomDimensions.set("hi", "hi");
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // testing not equal Predicate. The CustomDimensions.hi value != hi so return true.
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "NotEqual";
    request.CustomDimensions.set("hi", "bye");
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // testing does not contain Predicate. The CustomDimensions.hi value does not contain hi so return true.
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "DoesNotContain";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // testing contains Predicate. The CustomDimensions.hi value contains hi so return true.
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "Contains";
    request.CustomDimensions.set("hi", "hi there");
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));
  });

  it("Can handle filter on known boolean columns", () => {
    const filter: FilterInfo = {
      fieldName: KnownRequestColumns.Success,
      predicate: "Equal",
      comparand: "true",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: "Request",
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
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request Success filter does not match
    request.Success = false;
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request Success filter matches for != Predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "NotEqual";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Dependency Success filter matches
    derivedMetricInfo.telemetryType = "Dependency";
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "Equal";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency Success filter does not match
    dependency.Success = false;
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency Success filter matches for != Predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "NotEqual";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));
  });

  it("Can handle filter on known numeric columns", () => {
    const filter: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "Equal",
      comparand: "200",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: "Request",
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
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request ResponseCode filter does not match
    request.ResponseCode = 404;
    request.Success = false;
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Dependency ResultCode filter matches
    derivedMetricInfo.telemetryType = "Dependency";
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.ResultCode;
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency ResultCode filter does not match
    dependency.ResultCode = 404;
    dependency.Success = false;
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency duration filter matches
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.Duration;
    derivedMetricInfo.filterGroups[0].filters[0].comparand = "14.6:56:7.89"; // 14 days, 6 hours, 56 minutes, 7.89 seconds (1234567890 ms)
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency duration filter does not match
    dependency.Duration = 400;
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Request duration filter matches
    derivedMetricInfo.telemetryType = "Request";
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownRequestColumns.Duration;
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request duration filter does not match
    request.Duration = 400;
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // != Predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "NotEqual";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // < Predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "LessThan";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // <= Predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "LessThanOrEqual";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // > Predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "GreaterThan";
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // >= Predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "GreaterThanOrEqual";
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));
  });

  it("Can handle filter on known string columns", () => {
    const filter: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "Contains",
      comparand: "hi",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: "Request",
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
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Request Url filter does not match
    request.Url = "https://test.com/bye";
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // Dependency Data filter matches
    derivedMetricInfo.telemetryType = "Dependency";
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = KnownDependencyColumns.Data;
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Dependency Data filter does not match
    dependency.Data = "https://test.com/bye";
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, dependency));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, dependency));

    // Trace Message filter matches
    derivedMetricInfo.telemetryType = "Trace";
    derivedMetricInfo.filterGroups[0].filters[0].fieldName = "Message";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, trace));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, trace));

    // Trace Message filter does not match
    trace.Message = "bye";
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, trace));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, trace));

    // Exception Message filter matches. Note that FieldName is still "Message" here and that's intended (we remove the Exception. prefix when validating config)
    derivedMetricInfo.telemetryType = "Exception";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, exception));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // Exception Message filter does not match
    exception.Message = "Exception Message";
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, exception));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // != Predicate
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "NotEqual";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, exception));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // not contains
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "DoesNotContain";
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, exception));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));

    // equal
    derivedMetricInfo.filterGroups[0].filters[0].predicate = "Equal";
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, exception));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, exception));
  });

  it("Empty filter conjunction group info - should match", () => {
    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: "Request",
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
      telemetryType: "Request",
      filters: { filters: [] },
    };
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(
      filterClass.checkFilterConjunctionGroup(documentFilterConjunctionGroupInfo.filters, request),
    );
  });

  it("Can handle multiple Filters in a filter conjunction group", () => {
    const filter1: FilterInfo = {
      fieldName: KnownRequestColumns.Url,
      predicate: "Contains",
      comparand: "hi",
    };

    const filter2: FilterInfo = {
      fieldName: KnownRequestColumns.ResponseCode,
      predicate: "Equal",
      comparand: "200",
    };

    const conjunctionGroup: FilterConjunctionGroupInfo = {
      filters: [filter1, filter2],
    };

    const derivedMetricInfo: DerivedMetricInfo = {
      id: "random-id",
      telemetryType: "Request",
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

    // matches both Filters
    assert.isTrue(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isTrue(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));

    // only one filter matches, the entire conjunction group should return false
    request.Url = "https://test.com/bye";
    assert.isFalse(filterClass.checkMetricFilters(derivedMetricInfo, request));
    assert.isFalse(filterClass.checkFilterConjunctionGroup(conjunctionGroup, request));
  });
});

describe("Live Metrics filtering - Metric Projection", () => {
  const proj: Projection = new Projection();
  it("Count()", () => {
    const derivedMetricInfoRequest: DerivedMetricInfo = {
      id: "id-for-request",
      telemetryType: "Request",
      filterGroups: [{ filters: [] }],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const derivedMetricInfoDependency: DerivedMetricInfo = {
      id: "id-for-dependency",
      telemetryType: "Dependency",
      filterGroups: [{ filters: [] }],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const derivedMetricInfoTrace: DerivedMetricInfo = {
      id: "id-for-trace",
      telemetryType: "Trace",
      filterGroups: [{ filters: [] }],
      projection: "Count()",
      aggregation: "Sum",
      backEndAggregation: "Sum",
    };

    const derivedMetricInfoException: DerivedMetricInfo = {
      id: "id-for-exception",
      telemetryType: "Exception",
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
      telemetryType: "Request",
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: "Avg",
      backEndAggregation: "Avg",
    };

    const requestMin: DerivedMetricInfo = {
      id: "id-for-request-min",
      telemetryType: "Request",
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: "Min",
      backEndAggregation: "Min",
    };

    const requestMax: DerivedMetricInfo = {
      id: "id-for-request-max",
      telemetryType: "Request",
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: "Max",
      backEndAggregation: "Max",
    };

    const dependencyAvg: DerivedMetricInfo = {
      id: "id-for-dependency-avg",
      telemetryType: "Dependency",
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: "Avg",
      backEndAggregation: "Avg",
    };

    const dependencyMin: DerivedMetricInfo = {
      id: "id-for-dependency-min",
      telemetryType: "Dependency",
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: "Min",
      backEndAggregation: "Min",
    };

    const dependencyMax: DerivedMetricInfo = {
      id: "id-for-dependency-max",
      telemetryType: "Dependency",
      filterGroups: [{ filters: [] }],
      projection: "Duration",
      aggregation: "Max",
      backEndAggregation: "Max",
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
    const avg: DerivedMetricInfo = {
      id: "id-avg",
      telemetryType: "Request",
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
      aggregation: "Avg",
      backEndAggregation: "Avg",
    };

    const min: DerivedMetricInfo = {
      id: "id-min",
      telemetryType: "Request",
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
      aggregation: "Min",
      backEndAggregation: "Min",
    };

    const max: DerivedMetricInfo = {
      id: "id-max",
      telemetryType: "Request",
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
      aggregation: "Max",
      backEndAggregation: "Max",
    };

    const sum: DerivedMetricInfo = {
      id: "id-sum",
      telemetryType: "Request",
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
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
    const avg: DerivedMetricInfo = {
      id: "id-avg",
      telemetryType: "Request",
      filterGroups: [{ filters: [] }],
      projection: "CustomDimensions.property",
      aggregation: "Avg",
      backEndAggregation: "Avg",
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
    assert.equal(requestDoc.documentType, "Request");
    assert.equal(requestDoc.duration, "PT0.2S");
    assert.equal(requestDoc.responseCode, "200");
    assert.equal(requestDoc.name, "GET /hiThere");

    assert.equal(dependencyDoc.commandName, "https://test.com/hiThere?x=y");
    assert.equal(dependencyDoc.documentType, "RemoteDependency");
    assert.equal(dependencyDoc.duration, "PT0.2S");
    assert.equal(dependencyDoc.resultCode, "200");
    assert.equal(dependencyDoc.name, "GET /hiThere");

    assert.equal(traceDoc.message, "hi there");
    assert.equal(traceDoc.documentType, "Trace");

    assert.equal(exceptionDoc.exceptionMessage, "Exception Message hi");
    assert.equal(exceptionDoc.exceptionType, "Error");
    assert.equal(exceptionDoc.documentType, "Exception");
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
