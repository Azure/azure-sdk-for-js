import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import {
  DataFlowResource,
  DataFlowCreateOrUpdateDataFlowOptionalParams,
  DataFlowCreateOrUpdateDataFlowResponse,
  DataFlowGetDataFlowOptionalParams,
  DataFlowGetDataFlowResponse,
  DataFlowGetDataFlowsByWorkspaceResponse,
  DataFlowGetDataFlowsByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a DataFlow.
 */
export class DataFlow {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class DataFlow class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Creates or updates a data flow.
   * @param dataFlowName The data flow name.
   * @param dataFlow Data flow resource definition.
   * @param options The options parameters.
   */
  createOrUpdateDataFlow(
    dataFlowName: string,
    dataFlow: DataFlowResource,
    options?: DataFlowCreateOrUpdateDataFlowOptionalParams
  ): Promise<DataFlowCreateOrUpdateDataFlowResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { dataFlowName, dataFlow, options: operationOptions },
      createOrUpdateDataFlowOperationSpec
    ) as Promise<DataFlowCreateOrUpdateDataFlowResponse>;
  }

  /**
   * Gets a data flow.
   * @param dataFlowName The data flow name.
   * @param options The options parameters.
   */
  getDataFlow(
    dataFlowName: string,
    options?: DataFlowGetDataFlowOptionalParams
  ): Promise<DataFlowGetDataFlowResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { dataFlowName, options: operationOptions },
      getDataFlowOperationSpec
    ) as Promise<DataFlowGetDataFlowResponse>;
  }

  /**
   * Deletes a data flow.
   * @param dataFlowName The data flow name.
   * @param options The options parameters.
   */
  deleteDataFlow(
    dataFlowName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { dataFlowName, options: operationOptions },
      deleteDataFlowOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Lists data flows.
   * @param options The options parameters.
   */
  getDataFlowsByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<DataFlowGetDataFlowsByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getDataFlowsByWorkspaceOperationSpec
    ) as Promise<DataFlowGetDataFlowsByWorkspaceResponse>;
  }

  /**
   * GetDataFlowsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetDataFlowsByWorkspace
   *                 method.
   * @param options The options parameters.
   */
  getDataFlowsByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DataFlowGetDataFlowsByWorkspaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      getDataFlowsByWorkspaceNextOperationSpec
    ) as Promise<DataFlowGetDataFlowsByWorkspaceNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const createOrUpdateDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows/{dataFlowName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowResource
    },
    202: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.dataFlow,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.dataFlowName],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept1,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows/{dataFlowName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.dataFlowName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows/{dataFlowName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.dataFlowName],
  headerParameters: [Parameters.accept],
  serializer
};
const getDataFlowsByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const getDataFlowsByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
