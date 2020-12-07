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

/**
 * Class representing a SparkBatch.
 */
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
  getSparkBatchJobs(
    options?: SparkBatchGetSparkBatchJobsOptionalParams
  ): Promise<SparkBatchGetSparkBatchJobsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getSparkBatchJobsOperationSpec
    ) as Promise<SparkBatchGetSparkBatchJobsResponse>;
  }

  /**
   * Create new spark batch job.
   * @param sparkBatchJobOptions Livy compatible batch job request payload.
   * @param options The options parameters.
   */
  createSparkBatchJob(
    sparkBatchJobOptions: SparkBatchJobOptions,
    options?: SparkBatchCreateSparkBatchJobOptionalParams
  ): Promise<SparkBatchCreateSparkBatchJobResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      sparkBatchJobOptions,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      createSparkBatchJobOperationSpec
    ) as Promise<SparkBatchCreateSparkBatchJobResponse>;
  }

  /**
   * Gets a single spark batch job.
   * @param batchId Identifier for the batch job.
   * @param options The options parameters.
   */
  getSparkBatchJob(
    batchId: number,
    options?: SparkBatchGetSparkBatchJobOptionalParams
  ): Promise<SparkBatchGetSparkBatchJobResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      batchId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getSparkBatchJobOperationSpec
    ) as Promise<SparkBatchGetSparkBatchJobResponse>;
  }

  /**
   * Cancels a running spark batch job.
   * @param batchId Identifier for the batch job.
   * @param options The options parameters.
   */
  cancelSparkBatchJob(
    batchId: number,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      batchId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      cancelSparkBatchJobOperationSpec
    ) as Promise<coreHttp.RestResponse>;
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
