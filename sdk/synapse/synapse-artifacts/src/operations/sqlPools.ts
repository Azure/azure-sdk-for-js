// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { SqlPoolsListResponse, SqlPoolsGetResponse } from "../models";

/** Class representing a SqlPools. */
export class SqlPools {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class SqlPools class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * List Sql Pools
   * @param options The options parameters.
   */
  async list(options?: coreHttp.OperationOptions): Promise<SqlPoolsListResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-list",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(operationArguments, listOperationSpec);
      return result as SqlPoolsListResponse;
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
   * Get Sql Pool
   * @param sqlPoolName The Sql Pool name
   * @param options The options parameters.
   */
  async get(
    sqlPoolName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SqlPoolsGetResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-get",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      sqlPoolName,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(operationArguments, getOperationSpec);
      return result as SqlPoolsGetResponse;
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
  path: "/sqlPools",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SqlPoolInfoListResult
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
  path: "/sqlPools/{sqlPoolName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SqlPool
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.sqlPoolName],
  headerParameters: [Parameters.accept],
  serializer
};
