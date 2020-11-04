import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import { SqlPoolsListResponse, SqlPoolsGetResponse } from "../models";

/**
 * Class representing a SqlPools.
 */
export class SqlPools {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class SqlPools class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * List Sql Pools
   * @param options The options parameters.
   */
  list(options?: coreHttp.OperationOptions): Promise<SqlPoolsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<SqlPoolsListResponse>;
  }

  /**
   * Get Sql Pool
   * @param sqlPoolName The Sql Pool name
   * @param options The options parameters.
   */
  get(
    sqlPoolName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SqlPoolsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sqlPoolName, options: operationOptions },
      getOperationSpec
    ) as Promise<SqlPoolsGetResponse>;
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
