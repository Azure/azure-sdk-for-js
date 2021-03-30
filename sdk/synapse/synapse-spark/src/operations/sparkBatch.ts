// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "../tracing";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SparkClient } from "../sparkClient";
import {
  SparkBatchGetSparkBatchJobsOptionalParams,
  SparkBatchGetSparkBatchJobsResponse,
  SparkBatchJobOptions,
  SparkBatchCreateSparkBatchJobOptionalParams,
  SparkBatchCreateSparkBatchJobResponse,
  SparkBatchGetSparkBatchJobOptionalParams,
  SparkBatchGetSparkBatchJobResponse
} from "../models";

/** Class representing a SparkBatch. */
export class SparkBatch {
  private readonly client: SparkClient;

  /**
   * Initialize a new instance of the class SparkBatch class.
   * @param client Reference to the service client
   */
  constructor(client: SparkClient) {
    this.client = client;
  }

  /**
   * List all spark batch jobs which are running under a particular spark pool.
   * @param options The options parameters.
   */
  async getSparkBatchJobs(
    options?: SparkBatchGetSparkBatchJobsOptionalParams
  ): Promise<SparkBatchGetSparkBatchJobsResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-getSparkBatchJobs", options);
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getSparkBatchJobsOperationSpec
      );
      return result as SparkBatchGetSparkBatchJobsResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Create new spark batch job.
   * @param sparkBatchJobOptions Livy compatible batch job request payload.
   * @param options The options parameters.
   */
  async createSparkBatchJob(
    sparkBatchJobOptions: SparkBatchJobOptions,
    options?: SparkBatchCreateSparkBatchJobOptionalParams
  ): Promise<SparkBatchCreateSparkBatchJobResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-createSparkBatchJob", options);
    const operationArguments: coreHttp.OperationArguments = {
      sparkBatchJobOptions,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        createSparkBatchJobOperationSpec
      );
      return result as SparkBatchCreateSparkBatchJobResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Gets a single spark batch job.
   * @param batchId Identifier for the batch job.
   * @param options The options parameters.
   */
  async getSparkBatchJob(
    batchId: number,
    options?: SparkBatchGetSparkBatchJobOptionalParams
  ): Promise<SparkBatchGetSparkBatchJobResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-getSparkBatchJob", options);
    const operationArguments: coreHttp.OperationArguments = {
      batchId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getSparkBatchJobOperationSpec
      );
      return result as SparkBatchGetSparkBatchJobResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Cancels a running spark batch job.
   * @param batchId Identifier for the batch job.
   * @param options The options parameters.
   */
  async cancelSparkBatchJob(
    batchId: number,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("SparkClient-cancelSparkBatchJob", options);
    const operationArguments: coreHttp.OperationArguments = {
      batchId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        cancelSparkBatchJobOperationSpec
      );
      return result as coreHttp.RestResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
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

const getSparkBatchJobsOperationSpec: coreHttp.OperationSpec = {
  path: "/batches",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkBatchJobCollection
    }
  },
  queryParameters: [Parameters.fromParam, Parameters.size, Parameters.detailed],
  urlParameters: [Parameters.endpoint, Parameters.livyApiVersion, Parameters.sparkPoolName],
  headerParameters: [Parameters.accept],
  serializer
};
const createSparkBatchJobOperationSpec: coreHttp.OperationSpec = {
  path: "/batches",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkBatchJob
    }
  },
  requestBody: Parameters.sparkBatchJobOptions,
  queryParameters: [Parameters.detailed],
  urlParameters: [Parameters.endpoint, Parameters.livyApiVersion, Parameters.sparkPoolName],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getSparkBatchJobOperationSpec: coreHttp.OperationSpec = {
  path: "/batches/{batchId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkBatchJob
    }
  },
  queryParameters: [Parameters.detailed],
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName,
    Parameters.batchId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const cancelSparkBatchJobOperationSpec: coreHttp.OperationSpec = {
  path: "/batches/{batchId}",
  httpMethod: "DELETE",
  responses: { 200: {} },
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName,
    Parameters.batchId
  ],
  serializer
};
