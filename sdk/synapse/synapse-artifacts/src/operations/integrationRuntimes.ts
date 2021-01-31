// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import {
  IntegrationRuntimesListResponse,
  IntegrationRuntimesGetResponse
} from "../models";

/** Class representing a IntegrationRuntimes. */
export class IntegrationRuntimes {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class IntegrationRuntimes class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * List Integration Runtimes
   * @param options The options parameters.
   */
  async list(
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationRuntimesListResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-list",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        listOperationSpec
      );
      return result as IntegrationRuntimesListResponse;
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
   * Get Integration Runtime
   * @param integrationRuntimeName The Integration Runtime name
   * @param options The options parameters.
   */
  async get(
    integrationRuntimeName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationRuntimesGetResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-get",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      integrationRuntimeName,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getOperationSpec
      );
      return result as IntegrationRuntimesGetResponse;
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

const listOperationSpec: coreHttp.OperationSpec = {
  path: "/integrationRuntimes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeListResponse
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path: "/integrationRuntimes/{integrationRuntimeName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationRuntimeResource
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.integrationRuntimeName],
  headerParameters: [Parameters.accept],
  serializer
};
