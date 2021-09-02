// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import {
  BatchRequest as GeneratedBatchRequest,
  BatchQueryRequest
} from "../../../src/generated/logquery/src";
import {
  MetricsListOptionalParams as GeneratedMetricsListOptionalParams,
  MetricsListResponse as GeneratedMetricsListResponse
} from "../../../src/generated/metrics/src";
import { MetricDefinitionsListOptionalParams as GeneratedMetricDefinitionsListOptionalParams } from "../../../src/generated/metricsdefinitions/src";
import {
  convertRequestForQueryBatch,
  convertRequestOptionsForMetricsDefinitions,
  convertRequestForMetrics,
  convertResponseForMetrics,
  convertResponseForMetricsDefinitions
} from "../../../src/internal/modelConverters";
import {
  OperationRequestOptions,
  RawResponseCallback,
  SerializerOptions
} from "@azure/core-client";
import { OperationTracingOptions } from "@azure/core-tracing";
import {
  Durations,
  ListMetricDefinitionsOptions,
  MetricsQueryOptions,
  MetricsQueryResult
} from "../../../src";
import { AbortSignalLike } from "@azure/abort-controller";

describe("Model unit tests", () => {
  describe("LogsClient", () => {
    it("convertToBatchRequest (simple)", () => {
      const generatedRequest = convertRequestForQueryBatch([
        {
          query: "the kusto query",
          workspaceId: "the primary workspace id",
          timespan: { duration: Durations.TwentyFourHours }
        }
      ]);

      assert.deepEqual(generatedRequest, <GeneratedBatchRequest>{
        requests: [
          {
            id: "0",
            workspace: "the primary workspace id",
            headers: undefined,
            body: {
              query: "the kusto query",
              timespan: Durations.TwentyFourHours
            }
          }
        ]
      });
    });

    it("convertToBatchRequest (complex)", () => {
      const generatedRequest = convertRequestForQueryBatch([
        {
          query: "<placeholder>",
          workspaceId: "<placeholder>",
          timespan: { duration: Durations.TwentyFourHours }
        },
        {
          query: "the kusto query",
          timespan: { duration: Durations.FiveMinutes },
          workspaceId: "the primary workspace id",
          includeQueryStatistics: true,
          serverTimeoutInSeconds: 100,
          additionalWorkspaces: ["additionalWorkspace", "resourceId1"]
        }
      ]);
      console.log(JSON.stringify(generatedRequest.requests?.[1]));
      assert.deepEqual(generatedRequest.requests?.[1], <BatchQueryRequest>{
        body: {
          workspaces: ["additionalWorkspace", "resourceId1"],
          query: "the kusto query",
          timespan: "PT5M"
        },
        headers: {
          Prefer: "wait=100,include-statistics=true"
        },
        workspace: "the primary workspace id",
        id: "1" // auto-generated (increments by 1 for each query in the batch)
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
        timespan: { duration: "arbitraryTimespan" },
        tracingOptions,
        serializerOptions,
        onResponse
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
        timespan: "arbitraryTimespan",
        top: 10,
        tracingOptions,
        serializerOptions,
        onResponse
      };

      assert.deepEqual(actualMetricsRequest, expectedMetricsRequest);
    });

    it("convertRequestForMetrics (only required fields)", () => {
      assert.deepEqual(convertRequestForMetrics(["SuccessfulCalls", "TotalCalls"], {}), {
        metricnames: "SuccessfulCalls,TotalCalls"
      });
    });

    it("convertResponseForMetrics (all fields)", () => {
      const now = new Date();

      const generatedResponse: Required<GeneratedMetricsListResponse> = {
        // all of these fields are just copied over verbatim...
        timespan: "aTimespan",
        value: [
          {
            id: "fakeMetric",
            displayDescription: "displayDescription",
            errorCode: "anErrorCode",
            name: {
              value: "fakeValue"
            },
            timeseries: [
              {
                data: [
                  {
                    timeStamp: now,
                    count: 100
                  }
                ],
                // this value is renamed in track 2
                metadatavalues: [
                  {
                    name: {
                      value: "metadataName"
                    }
                  },
                  {
                    name: {
                      value: "metadataName2"
                    },
                    value: "value2"
                  }
                ]
              }
            ],
            type: "metricType",
            unit: "BitsPerSecond"
          }
        ],
        cost: 100,
        interval: "anInterval",
        namespace: "aNamespace",
        // ...except this one which gets a slight rename.
        resourceregion: "aResourceRegion"
      };

      const actualConvertedResponse = convertResponseForMetrics(generatedResponse);
      const expectedResponse: MetricsQueryResult = {
        timespan: "aTimespan",
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
                    count: 100
                  }
                ],
                // this value is renamed in track 2
                metadataValues: [
                  {
                    name: "metadataName"
                    // note we don't unnecesssarily add properties that weren't in the input
                  },
                  {
                    name: "metadataName2",
                    value: "value2"
                  }
                ]
              }
            ],
            type: "metricType",
            unit: "BitsPerSecond"
          }
        ],
        cost: 100,
        granularity: "anInterval",
        namespace: "aNamespace",
        resourceRegion: "aResourceRegion"
        // NOTE: _response is not returned as part of our track 2 response.
      };

      assert.deepEqual(actualConvertedResponse, expectedResponse);
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
        onResponse
      };

      const actualOptions: GeneratedMetricDefinitionsListOptionalParams = convertRequestOptionsForMetricsDefinitions(
        track2
      );

      assert.deepEqual(actualOptions, {
        abortSignal,
        requestOptions,
        tracingOptions,
        metricnamespace: "myMetricNamespace",
        serializerOptions,
        onResponse
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
              localizedValue: "optional localized value but it's ignored"
            }
          ],
          name: {
            value: "the name"
          },
          id: "anything"
        }
      ]);

      assert.deepEqual(
        [
          {
            id: "anything",
            name: "the name",
            dimensions: ["the value"]
          }
        ],
        actualResponse
      );
    });

    it("convertResponseForMetricsDefinitions (optional fields removed)", () => {
      const actualResponse = convertResponseForMetricsDefinitions([
        {
          id: "anything"
        }
      ]);

      assert.deepEqual(
        [
          // we don't add fields if they weren't in the original response (for instance, we don't add in an
          // undefined 'name', or 'dimensions')
          {
            id: "anything"
          }
        ],
        actualResponse
      );
    });

    // it("convertResponseForMetricNamespaces", () => {
    //   const actualResponse = convertResponseForMetricNamespaces({
    //     value: [{ id: "anything" } as any]
    //   });

    //   assert.deepEqual(actualResponse, <GetMetricNamespacesResult>{
    //     namespaces: [{ id: "anything" } as any]
    //   });
    // });
  });
});
