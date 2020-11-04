import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import {
  IntegrationRuntimesListResponse,
  IntegrationRuntimesGetResponse
} from "../models";

/**
 * Class representing a IntegrationRuntimes.
 */
export class IntegrationRuntimes {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class IntegrationRuntimes class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * List Integration Runtimes
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationRuntimesListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<IntegrationRuntimesListResponse>;
  }

  /**
   * Get Integration Runtime
   * @param integrationRuntimeName The Integration Runtime name
   * @param options The options parameters.
   */
  get(
    integrationRuntimeName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationRuntimesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { integrationRuntimeName, options: operationOptions },
      getOperationSpec
    ) as Promise<IntegrationRuntimesGetResponse>;
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
