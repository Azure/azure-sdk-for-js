// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { convertToBatchRequest } from "../../../src/logsClient";
import * as assert from "assert";
import {
  BatchRequest as GeneratedBatchRequest,
  LogQueryRequest
} from "../../../src/generated/logquery/src";
import { MetricsListOptionalParams as GeneratedMetricsListOptionalParams } from "../../../src/generated/metrics/src";
import { MetricDefinitionsListOptionalParams as GeneratedMetricDefinitionsListOptionalParams } from "../../../src/generated/metricsdefinitions/src";
import { CommonDurations } from "../../../src/models/constants";
import {
  convertToMetricsDefinitionsRequest,
  convertToMetricsRequest
} from "../../../src/metricsClient";
import { AbortSignalLike } from "@azure/core-http";
import { RequestOptions } from "https";
import { OperationTracingOptions } from "@azure/core-tracing";
import { GetMetricDefinitionsOptions, QueryMetricsOptions } from "../../../src";

describe("Model unit tests", () => {
  describe("LogsClient", () => {
    it("convertToBatchRequest (simple)", () => {
      const generatedRequest = convertToBatchRequest({
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
      const generatedRequest = convertToBatchRequest({
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
    it("convertToMetricsRequest (all fields)", () => {
      const abortSignal = {} as AbortSignalLike;
      const requestOptions = {} as RequestOptions;
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

      const actualMetricsRequest: GeneratedMetricsListOptionalParams = convertToMetricsRequest(
        track2Model
      );

      assert.deepEqual(actualMetricsRequest, {
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
        tracingOptions
      });
    });

    it("convertToMetricsRequest (only required fields)", () => {
      assert.deepEqual(convertToMetricsRequest({}), {
        metricnames: undefined,
        aggregation: undefined,
        metricnamespace: undefined,
        orderby: undefined
      });
      assert.deepEqual(convertToMetricsRequest(undefined), {
        metricnames: undefined,
        aggregation: undefined,
        metricnamespace: undefined,
        orderby: undefined
      });
    });

    it("convertToMetricsDefinitionsRequest (all fields)", () => {
      const abortSignal = {} as AbortSignalLike;
      const requestOptions = {} as RequestOptions;
      const tracingOptions = {} as OperationTracingOptions;

      const track2: Required<GetMetricDefinitionsOptions> = {
        abortSignal,
        requestOptions,
        tracingOptions,
        metricNamespace: "myMetricNamespace"
      };

      const actualOptions: GeneratedMetricDefinitionsListOptionalParams = convertToMetricsDefinitionsRequest(
        track2
      );

      assert.deepEqual(actualOptions, {
        abortSignal,
        requestOptions,
        tracingOptions,
        metricnamespace: "myMetricNamespace"
      });
    });

    it("convertToMetricsDefinitionsRequest (only required fields)", () => {
      assert.deepEqual(convertToMetricsDefinitionsRequest({}), {
        metricnamespace: undefined
      });
      assert.deepEqual(convertToMetricsDefinitionsRequest(undefined), {
        metricnamespace: undefined
      });
    });
  });
});
