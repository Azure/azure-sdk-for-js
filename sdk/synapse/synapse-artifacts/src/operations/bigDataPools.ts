// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { BigDataPoolsListResponse, BigDataPoolsGetResponse } from "../models";

/** Class representing a BigDataPools. */
export class BigDataPools {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class BigDataPools class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * List Big Data Pools
   * @param options The options parameters.
   */
  async list(options?: coreHttp.OperationOptions): Promise<BigDataPoolsListResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-list",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(operationArguments, listOperationSpec);
      return result as BigDataPoolsListResponse;
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
   * Get Big Data Pool
   * @param bigDataPoolName The Big Data Pool name
   * @param options The options parameters.
   */
  async get(
    bigDataPoolName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BigDataPoolsGetResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-get",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      bigDataPoolName,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(operationArguments, getOperationSpec);
      return result as BigDataPoolsGetResponse;
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
  path: "/bigDataPools",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BigDataPoolResourceInfoListResult
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
  path: "/bigDataPools/{bigDataPoolName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BigDataPoolResourceInfo
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.bigDataPoolName],
  headerParameters: [Parameters.accept],
  serializer
};
