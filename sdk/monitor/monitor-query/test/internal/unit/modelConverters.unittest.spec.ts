// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  BatchQueryRequest,
  BatchRequest as GeneratedBatchRequest,
} from "../../../src/generated/logquery/src";
import {
  MetricsListOptionalParams as GeneratedMetricsListOptionalParams,
  MetricsListResponse as GeneratedMetricsListResponse,
} from "../../../src/generated/metrics/src";
import { MetricDefinitionsListOptionalParams as GeneratedMetricDefinitionsListOptionalParams } from "../../../src/generated/metricsdefinitions/src";
import {
  convertRequestForMetrics,
  convertRequestForQueryBatch,
  convertRequestOptionsForMetricsDefinitions,
  convertResponseForMetrics,
  convertResponseForMetricsDefinitions,
} from "../../../src/internal/modelConverters";
import {
  OperationRequestOptions,
  RawResponseCallback,
  SerializerOptions,
} from "@azure/core-client";
import { OperationTracingOptions } from "@azure/core-tracing";
import {
  Durations,
  ListMetricDefinitionsOptions,
  MetricsQueryOptions,
  MetricsQueryResult,
} from "../../../src";
import { AbortSignalLike } from "@azure/abort-controller";
import {
  convertIntervalToTimeIntervalObject,
  convertTimespanToInterval,
} from "../../../src/timespanConversion";

describe("Model unit tests", () => {
  describe("LogsClient", () => {
    it("convertToBatchRequest (simple)", () => {
      const generatedRequest = convertRequestForQueryBatch([
        {
          query: "the kusto query",
          workspaceId: "the primary workspace id",
          timespan: { duration: Durations.twentyFourHours },
        },
      ]);

      assert.deepEqual(generatedRequest, <GeneratedBatchRequest>{
        requests: [
          {
            id: "0",
            workspace: "the primary workspace id",
            headers: undefined,
            body: {
              query: "the kusto query",
              timespan: Durations.twentyFourHours,
            },
          },
        ],
      });
    });

    it("convertToBatchRequest (complex)", () => {
      const generatedRequest = convertRequestForQueryBatch([
        {
          query: "<placeholder>",
          workspaceId: "<placeholder>",
          timespan: { duration: Durations.twentyFourHours },
        },
        {
          query: "the kusto query",
          timespan: { duration: Durations.fiveMinutes },
          workspaceId: "the primary workspace id",
          includeQueryStatistics: true,
          serverTimeoutInSeconds: 100,
          additionalWorkspaces: ["additionalWorkspace", "resourceId1"],
        },
      ]);
      assert.deepEqual(generatedRequest.requests?.[1], <BatchQueryRequest>{
        body: {
          workspaces: ["additionalWorkspace", "resourceId1"],
          query: "the kusto query",
          timespan: "PT5M",
        },
        headers: {
          Prefer: "wait=100,include-statistics=true",
        },
        workspace: "the primary workspace id",
        id: "1", // auto-generated (increments by 1 for each query in the batch)
      });

      assert.equal(generatedRequest?.requests?.length, 2);
    });
  });

  describe("MetricsClient", () => {
    it("convertRequestForMetrics (all fields)", () => {
      const abortSignal = {} as AbortSignalLike;
      const requestOptions = {} as OperationRequestOptions;
      const tracingOptions = {} as OperationTracingOptions;
      const serializerOptions = {} as SerializerOptions;
      const onResponse = {} as RawResponseCallback;

      // (Required<T> just to make sure I don't forget a field)
      const track2Model: Required<MetricsQueryOptions> = {
        abortSignal,
        aggregations: ["Average", "Maximum"],
        filter: "arbitraryFilter",
        granularity: "arbitraryInterval",
        metricNamespace: "myMetricNamespace",
        orderBy: "orderByClause",
        requestOptions,
        resultType: "Data",
        top: 10,
        timespan: { duration: "P20H" },
        tracingOptions,
        serializerOptions,
        onResponse,
      };

      const actualMetricsRequest: GeneratedMetricsListOptionalParams = convertRequestForMetrics(
        ["name1", "name2"],
        track2Model
      );

      const expectedMetricsRequest: GeneratedMetricsListOptionalParams = {
        abortSignal,
        aggregation: "Average,Maximum",
        filter: "arbitraryFilter",
        interval: "arbitraryInterval",
        metricnames: "name1,name2",
        metricnamespace: "myMetricNamespace",
        orderby: "orderByClause",
        requestOptions,
        resultType: "Data",
        timespan: "P20H",
        top: 10,
        tracingOptions,
        serializerOptions,
        onResponse,
      };

      assert.deepEqual(actualMetricsRequest, expectedMetricsRequest);
    });

    it("convertRequestForMetrics (only required fields)", () => {
      assert.deepEqual(convertRequestForMetrics(["SuccessfulCalls", "TotalCalls"], {}), {
        metricnames: "SuccessfulCalls,TotalCalls",
      });
    });

    it("convertResponseForMetrics (all fields)", () => {
      const now = new Date();

      const generatedResponse: Required<GeneratedMetricsListResponse> = {
        // all of these fields are just copied over verbatim...
        timespan: "P10H",
        value: [
          {
            id: "fakeMetric",
            displayDescription: "displayDescription",
            errorCode: "anErrorCode",
            name: {
              value: "fakeValue",
            },
            timeseries: [
              {
                data: [
                  {
                    timeStamp: now,
                    count: 100,
                  },
                ],
                // this value is renamed in track 2
                metadatavalues: [
                  {
                    name: {
                      value: "metadataName",
                    },
                  },
                  {
                    name: {
                      value: "metadataName2",
                    },
                    value: "value2",
                  },
                ],
              },
            ],
            type: "metricType",
            unit: "BitsPerSecond",
          },
        ],
        cost: 100,
        interval: "anInterval",
        namespace: "aNamespace",
        // ...except this one which gets a slight rename.
        resourceregion: "aResourceRegion",
      };

      const actualConvertedResponse = convertResponseForMetrics(generatedResponse);
      const expectedResponse = {
        timespan: { duration: "P10H" },
        metrics: [
          {
            id: "fakeMetric",
            description: "displayDescription",
            errorCode: "anErrorCode",
            name: "fakeValue",
            timeseries: [
              {
                data: [
                  {
                    timeStamp: now,
                    count: 100,
                  },
                ],
                // this value is renamed in track 2
                metadataValues: [
                  {
                    name: "metadataName",
                    // note we don't unnecesssarily add properties that weren't in the input
                  },
                  {
                    name: "metadataName2",
                    value: "value2",
                  },
                ],
              },
            ],
            type: "metricType",
            unit: "BitsPerSecond",
          },
        ],
        cost: 100,
        granularity: "anInterval",
        namespace: "aNamespace",
        resourceRegion: "aResourceRegion",
        // NOTE: _response is not returned as part of our track 2 response.
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { getMetricByName, ...rest } = actualConvertedResponse;
      assert.deepEqual(
        { ...rest } as Omit<MetricsQueryResult, "getMetricByName">,
        expectedResponse
      );
    });

    it("convertRequestOptionsForMetricsDefinitions (all fields)", () => {
      const abortSignal = {} as AbortSignalLike;
      const requestOptions = {} as OperationRequestOptions;
      const tracingOptions = {} as OperationTracingOptions;
      const serializerOptions = {} as SerializerOptions;
      const onResponse = {} as RawResponseCallback;

      const track2: Required<ListMetricDefinitionsOptions> = {
        abortSignal,
        requestOptions,
        tracingOptions,
        metricNamespace: "myMetricNamespace",
        serializerOptions,
        onResponse,
      };

      const actualOptions: GeneratedMetricDefinitionsListOptionalParams =
        convertRequestOptionsForMetricsDefinitions(track2);

      assert.deepEqual(actualOptions, {
        abortSignal,
        requestOptions,
        tracingOptions,
        metricnamespace: "myMetricNamespace",
        serializerOptions,
        onResponse,
      });
    });

    it("convertRequestOptionsForMetricsDefinitions (only required fields)", () => {
      assert.deepEqual(convertRequestOptionsForMetricsDefinitions({}), {});
      assert.deepEqual(convertRequestOptionsForMetricsDefinitions(undefined), {});
    });

    it("convertResponseForMetricsDefinitions", () => {
      const actualResponse = convertResponseForMetricsDefinitions([
        {
          dimensions: [
            {
              value: "the value",
              localizedValue: "optional localized value but it's ignored",
            },
          ],
          name: {
            value: "the name",
          },
          id: "anything",
        },
      ]);

      assert.deepEqual(
        [
          {
            id: "anything",
            name: "the name",
            dimensions: ["the value"],
          },
        ],
        actualResponse
      );
    });

    it("convertResponseForMetricsDefinitions (optional fields removed)", () => {
      const actualResponse = convertResponseForMetricsDefinitions([
        {
          id: "anything",
        },
      ]);

      assert.deepEqual(
        [
          // we don't add fields if they weren't in the original response (for instance, we don't add in an
          // undefined 'name', or 'dimensions')
          {
            id: "anything",
          },
        ],
        actualResponse
      );
    });

    it("convertIntervalToTimeIntervalObject", () => {
      const res1 = convertIntervalToTimeIntervalObject("2007-11-13T00:00/2007-11-16T00:00");
      assert.deepEqual(res1, {
        startTime: new Date("2007-11-13T00:00"),
        endTime: new Date("2007-11-16T00:00"),
      });
      const res2 = convertIntervalToTimeIntervalObject("2007-03-01T13:00:00Z/P1Y2M10DT2H30M");
      assert.deepEqual(res2, {
        startTime: new Date("2007-03-01T13:00:00Z"),
        duration: "P1Y2M10DT2H30M",
      });
      const res3 = convertIntervalToTimeIntervalObject("P1Y2M10DT2H30M/2008-05-11T15:30:00Z");
      assert.deepEqual(res3, {
        duration: "P1Y2M10DT2H30M",
        endTime: new Date("2008-05-11T15:30:00Z"),
      });
      const res4 = convertIntervalToTimeIntervalObject("P1Y2M10DT2H30M");
      assert.deepEqual(res4, {
        duration: "P1Y2M10DT2H30M",
      });
    });

    it("convertTimespanToInterval", () => {
      const res1 = convertTimespanToInterval({
        startTime: new Date("2007-11-13T08:00:00Z"),
        endTime: new Date("2007-11-16T08:00:00Z"),
      });
      assert.equal(res1, "2007-11-13T08:00:00.000Z/2007-11-16T08:00:00.000Z");

      const res2 = convertTimespanToInterval({
        startTime: new Date("2007-03-01T13:00:00Z"),
        duration: "P1Y2M10DT2H30M",
      });
      assert.deepEqual(res2, "2007-03-01T13:00:00.000Z/P1Y2M10DT2H30M");

      const res3 = convertTimespanToInterval({
        duration: "P1Y2M10DT2H30M",
        endTime: new Date("2008-05-11T15:30:00Z"),
      });
      assert.deepEqual(res3, "P1Y2M10DT2H30M/2008-05-11T15:30:00.000Z");

      const res4 = convertTimespanToInterval({
        duration: "P1Y2M10DT2H30M",
      });
      assert.deepEqual(res4, "P1Y2M10DT2H30M");
    });
  });
});
