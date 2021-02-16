// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { RunFilterParameters, TriggerRunQueryTriggerRunsByWorkspaceResponse } from "../models";

/** Class representing a TriggerRun. */
export class TriggerRun {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class TriggerRun class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Rerun single trigger instance by runId.
   * @param triggerName The trigger name.
   * @param runId The pipeline run identifier.
   * @param options The options parameters.
   */
  async rerunTriggerInstance(
    triggerName: string,
    runId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-rerunTriggerInstance",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      triggerName,
      runId,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        rerunTriggerInstanceOperationSpec
      );
      return result as coreHttp.RestResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Cancel single trigger instance by runId.
   * @param triggerName The trigger name.
   * @param runId The pipeline run identifier.
   * @param options The options parameters.
   */
  async cancelTriggerInstance(
    triggerName: string,
    runId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-cancelTriggerInstance",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      triggerName,
      runId,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        cancelTriggerInstanceOperationSpec
      );
      return result as coreHttp.RestResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Query trigger runs.
   * @param filterParameters Parameters to filter the pipeline run.
   * @param options The options parameters.
   */
  async queryTriggerRunsByWorkspace(
    filterParameters: RunFilterParameters,
    options?: coreHttp.OperationOptions
  ): Promise<TriggerRunQueryTriggerRunsByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-queryTriggerRunsByWorkspace",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      filterParameters,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        queryTriggerRunsByWorkspaceOperationSpec
      );
      return result as TriggerRunQueryTriggerRunsByWorkspaceResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const rerunTriggerInstanceOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/triggerRuns/{runId}/rerun",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.runId, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const cancelTriggerInstanceOperationSpec: coreHttp.OperationSpec = {
  path: "/triggers/{triggerName}/triggerRuns/{runId}/cancel",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.runId, Parameters.triggerName],
  headerParameters: [Parameters.accept],
  serializer
};
const queryTriggerRunsByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/queryTriggerRuns",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TriggerRunsQueryResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.filterParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
