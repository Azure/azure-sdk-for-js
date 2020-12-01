import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { BigDataPoolsListResponse, BigDataPoolsGetResponse } from "../models";

/**
 * Class representing a BigDataPools.
 */
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
  list(options?: coreHttp.OperationOptions): Promise<BigDataPoolsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<BigDataPoolsListResponse>;
  }

  /**
   * Get Big Data Pool
   * @param bigDataPoolName The Big Data Pool name
   * @param options The options parameters.
   */
  get(
    bigDataPoolName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BigDataPoolsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      bigDataPoolName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<BigDataPoolsGetResponse>;
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
