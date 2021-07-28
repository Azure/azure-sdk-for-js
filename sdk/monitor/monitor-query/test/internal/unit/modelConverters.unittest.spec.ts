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
  convertResponseForMetricsDefinitions,
  convertResponseForMetricNamespaces
} from "../../../src/internal/modelConverters";
import {
  OperationRequestOptions,
  RawResponseCallback,
  SerializerOptions
} from "@azure/core-client";
import { OperationTracingOptions } from "@azure/core-tracing";
import {
  Durations,
  GetMetricDefinitionsResult,
  GetMetricNamespacesResult,
  GetMetricDefinitionsOptions,
  QueryMetricsOptions,
  QueryMetricsResult
} from "../../../src";
import { AbortSignalLike } from "@azure/abort-controller";

describe("Model unit tests", () => {
  describe("LogsClient", () => {
    it("convertToBatchRequest (simple)", () => {
      const generatedRequest = convertRequestForQueryBatch({
        queries: [
          {
            query: "the kusto query",
            workspace: "the primary workspace id",
            timespan: Durations.last24Hours
          }
        ]
      });

      assert.deepEqual(generatedRequest, <GeneratedBatchRequest>{
        requests: [
          {
            id: "0", // auto-generated,
            workspace: "the primary workspace id",
            headers: undefined,
            body: {
              query: "the kusto query",
              timespan: Durations.last24Hours
            }
          }
        ]
      });
    });

    it("convertToBatchRequest (complex)", () => {
      const generatedRequest = convertRequestForQueryBatch({
        queries: [
          {
            query: "<placeholder>",
            workspace: "<placeholder>",
            timespan: Durations.last24Hours
          },
          {
            azureResourceIds: ["resourceId1"],
            includeQueryStatistics: true,
            qualifiedNames: ["qualifiedName"],
            query: "the kusto query",
            serverTimeoutInSeconds: 100,
            timespan: Durations.last5Minutes,
            workspace: "the primary workspace id",
            workspaceIds: ["additionalWorkspaceId"],
            workspaces: ["additionalWorkspace"]
          }
        ]
      });

      assert.deepEqual(generatedRequest.requests?.[1], <BatchQueryRequest>{
        id: "1", // auto-generated (increments by 1 for each query in the batch)
        workspace: "the primary workspace id",
        headers: {
          Prefer: "wait=100,include-statistics=true"
        },
        body: {
          azureResourceIds: ["resourceId1"],
          qualifiedNames: ["qualifiedName"],
          query: "the kusto query",
          timespan: Durations.last5Minutes,
          workspaceIds: ["additionalWorkspaceId"],
          workspaces: ["additionalWorkspace"]
        }
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
      const track2Model: Required<QueryMetricsOptions> = {
        abortSignal,
        aggregations: ["agg1", "agg2"],
        filter: "arbitraryFilter",
        interval: "arbitraryInterval",
        metricNames: ["name1", "name2"],
        metricNamespace: "myMetricNamespace",
        orderBy: "orderByClause",
        requestOptions,
        resultType: "Data",
        top: 10,
        tracingOptions,
        serializerOptions,
        onResponse
      };

      const actualMetricsRequest: GeneratedMetricsListOptionalParams = convertRequestForMetrics(
        "arbitraryTimespan",
        track2Model
      );

      const expectedMetricsRequest: GeneratedMetricsListOptionalParams = {
        abortSignal,
        aggregation: "agg1,agg2",
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
      assert.deepEqual(convertRequestForMetrics(Durations.lastDay, undefined), {
        timespan: Durations.lastDay
      });
      assert.deepEqual(convertRequestForMetrics(Durations.last2Days, {}), {
        timespan: Durations.last2Days
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
      const expectedResponse: QueryMetricsResult = {
        timespan: "aTimespan",
        metrics: [
          {
            id: "fakeMetric",
            displayDescription: "displayDescription",
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
        interval: "anInterval",
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

      const track2: Required<GetMetricDefinitionsOptions> = {
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
      const actualResponse = convertResponseForMetricsDefinitions({
        value: [
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
        ]
      });

      assert.deepEqual(
        <GetMetricDefinitionsResult>{
          definitions: [
            {
              id: "anything",
              name: "the name",
              dimensions: ["the value"]
            }
          ]
        },
        actualResponse
      );
    });

    it("convertResponseForMetricsDefinitions (optional fields removed)", () => {
      const actualResponse = convertResponseForMetricsDefinitions({
        value: [
          {
            id: "anything"
          }
        ]
      });

      assert.deepEqual(
        <GetMetricDefinitionsResult>{
          definitions: [
            // we don't add fields if they weren't in the original response (for instance, we don't add in an
            // undefined 'name', or 'dimensions')
            {
              id: "anything"
            }
          ]
        },
        actualResponse
      );
    });

    it("convertResponseForMetricNamespaces", () => {
      const actualResponse = convertResponseForMetricNamespaces({
        value: [{ id: "anything" } as any]
      });

      assert.deepEqual(actualResponse, <GetMetricNamespacesResult>{
        namespaces: [{ id: "anything" } as any]
      });
    });
  });
});
