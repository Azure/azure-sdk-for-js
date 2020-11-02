import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseSpark } from "../synapseSpark";
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
  private readonly client: SynapseSpark;

  /**
   * Initialize a new instance of the class SparkBatch class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseSpark) {
    this.client = client;
  }

  /**
   * List all spark batch jobs which are running under a particular spark pool.
   * @param options The options parameters.
   */
  getSparkBatchJobs(
    options?: SparkBatchGetSparkBatchJobsOptionalParams
  ): Promise<SparkBatchGetSparkBatchJobsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
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
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sparkBatchJobOptions, options: operationOptions },
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
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { batchId, options: operationOptions },
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
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { batchId, options: operationOptions },
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
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName
  ],
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
  urlParameters: [
    Parameters.endpoint,
    Parameters.livyApiVersion,
    Parameters.sparkPoolName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
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
