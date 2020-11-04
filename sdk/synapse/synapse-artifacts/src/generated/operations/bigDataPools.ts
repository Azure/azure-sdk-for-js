import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import { BigDataPoolsListResponse, BigDataPoolsGetResponse } from "../models";

/**
 * Class representing a BigDataPools.
 */
export class BigDataPools {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class BigDataPools class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * List Big Data Pools
   * @param options The options parameters.
   */
  list(options?: coreHttp.OperationOptions): Promise<BigDataPoolsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
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
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { bigDataPoolName, options: operationOptions },
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
