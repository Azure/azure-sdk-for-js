// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import {
  BatchRequest as GeneratedBatchRequest,
  LogQueryRequest
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
import { AbortSignalLike, OperationRequestOptions } from "@azure/core-http";
import { OperationTracingOptions } from "@azure/core-tracing";
import {
  CommonDurations,
  GetMetricDefinitionsResponse,
  GetMetricNamespacesResponse,
  GetMetricDefinitionsOptions,
  QueryMetricsOptions,
  QueryMetricsResponse
} from "../../../src";

describe("Model unit tests", () => {
  describe("LogsClient", () => {
    it("convertToBatchRequest (simple)", () => {
      const generatedRequest = convertRequestForQueryBatch({
        queries: [
          {
            query: "the kusto query",
            workspace: "the primary workspace id"
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
              query: "the kusto query"
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
            workspace: "<placeholder>"
          },
          {
            azureResourceIds: ["resourceId1"],
            includeQueryStatistics: true,
            qualifiedNames: ["qualifiedName"],
            query: "the kusto query",
            serverTimeoutInSeconds: 100,
            timespan: CommonDurations.last5Minutes,
            workspace: "the primary workspace id",
            workspaceIds: ["additionalWorkspaceId"],
            workspaces: ["additionalWorkspace"]
          }
        ]
      });

      assert.deepEqual(generatedRequest.requests?.[1], <LogQueryRequest>{
        id: "1", // auto-generated (increments by 1 for each query in the batch)
        workspace: "the primary workspace id",
        headers: {
          Prefer: "wait=100,include-statistics=true"
        },
        body: {
          azureResourceIds: ["resourceId1"],
          qualifiedNames: ["qualifiedName"],
          query: "the kusto query",
          timespan: CommonDurations.last5Minutes,
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
        timespan: "arbitraryTimespan",
        top: 10,
        tracingOptions
      };

      const actualMetricsRequest: GeneratedMetricsListOptionalParams = convertRequestForMetrics(
        track2Model
      );

      assert.deepEqual(actualMetricsRequest, {
        abortSignal,
        aggregation: "agg1,agg2",
        filter: "arbitraryFilter",
        interval: "arbitraryInterval",
        metric: "name1,name2",
        metricnamespace: "myMetricNamespace",
        orderby: "orderByClause",
        requestOptions,
        resultType: "Data",
        timespan: "arbitraryTimespan",
        top: 10,
        tracingOptions
      });
    });

    it("convertRequestForMetrics (only required fields)", () => {
      const defaultValue: GeneratedMetricsListOptionalParams = {
        aggregation: undefined,
        metric: undefined,
        metricnamespace: undefined,
        orderby: undefined
      };

      assert.deepEqual(convertRequestForMetrics({}), defaultValue);
      assert.deepEqual(convertRequestForMetrics(undefined), defaultValue);
    });

    it("convertResponseForMetrics (all fields)", () => {
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
                data: [],
                // this value is renamed in track 2
                metadatavalues: [
                  {
                    name: {
                      value: "metadataName"
                    }
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
        resourceregion: "aResourceRegion",
        _response: {} as any
      };

      const actualConvertedResponse = convertResponseForMetrics(generatedResponse);

      assert.deepEqual(actualConvertedResponse, <QueryMetricsResponse>{
        timespan: "aTimespan",
        metrics: [
          {
            id: "fakeMetric",
            displayDescription: "displayDescription",
            errorCode: "anErrorCode",
            name: {
              value: "fakeValue"
            },
            timeseries: [
              {
                data: [],
                // this value is renamed in track 2
                metadataValues: [
                  {
                    name: {
                      value: "metadataName"
                    }
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
      });
    });

    it("convertRequestOptionsForMetricsDefinitions (all fields)", () => {
      const abortSignal = {} as AbortSignalLike;
      const requestOptions = {} as OperationRequestOptions;
      const tracingOptions = {} as OperationTracingOptions;

      const track2: Required<GetMetricDefinitionsOptions> = {
        abortSignal,
        requestOptions,
        tracingOptions,
        metricNamespace: "myMetricNamespace"
      };

      const actualOptions: GeneratedMetricDefinitionsListOptionalParams = convertRequestOptionsForMetricsDefinitions(
        track2
      );

      assert.deepEqual(actualOptions, {
        abortSignal,
        requestOptions,
        tracingOptions,
        metricnamespace: "myMetricNamespace"
      });
    });

    it("convertRequestOptionsForMetricsDefinitions (only required fields)", () => {
      assert.deepEqual(convertRequestOptionsForMetricsDefinitions({}), {
        metricnamespace: undefined
      });
      assert.deepEqual(convertRequestOptionsForMetricsDefinitions(undefined), {
        metricnamespace: undefined
      });
    });

    it("convertResponseForMetricsDefinitions", () => {
      const actualResponse = convertResponseForMetricsDefinitions({
        _response: {} as any,
        value: [{ id: "anything" } as any]
      });

      assert.deepEqual(
        <GetMetricDefinitionsResponse>{
          definitions: [{ id: "anything" } as any]
        },
        actualResponse
      );
    });

    it("convertResponseForMetricNamespaces", () => {
      const actualResponse = convertResponseForMetricNamespaces({
        _response: {} as any,
        value: [{ id: "anything" } as any]
      });

      assert.deepEqual(actualResponse, <GetMetricNamespacesResponse>{
        namespaces: [{ id: "anything" } as any]
      });
    });
  });
});
