import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import {
  LinkedServiceGetLinkedServicesByWorkspaceResponse,
  LinkedServiceResource,
  LinkedServiceCreateOrUpdateLinkedServiceOptionalParams,
  LinkedServiceCreateOrUpdateLinkedServiceResponse,
  LinkedServiceGetLinkedServiceOptionalParams,
  LinkedServiceGetLinkedServiceResponse,
  LinkedServiceGetLinkedServicesByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a LinkedService.
 */
export class LinkedService {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class LinkedService class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Lists linked services.
   * @param options The options parameters.
   */
  getLinkedServicesByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<LinkedServiceGetLinkedServicesByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getLinkedServicesByWorkspaceOperationSpec
    ) as Promise<LinkedServiceGetLinkedServicesByWorkspaceResponse>;
  }

  /**
   * Creates or updates a linked service.
   * @param linkedServiceName The linked service name.
   * @param linkedService Linked service resource definition.
   * @param options The options parameters.
   */
  createOrUpdateLinkedService(
    linkedServiceName: string,
    linkedService: LinkedServiceResource,
    options?: LinkedServiceCreateOrUpdateLinkedServiceOptionalParams
  ): Promise<LinkedServiceCreateOrUpdateLinkedServiceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { linkedServiceName, linkedService, options: operationOptions },
      createOrUpdateLinkedServiceOperationSpec
    ) as Promise<LinkedServiceCreateOrUpdateLinkedServiceResponse>;
  }

  /**
   * Gets a linked service.
   * @param linkedServiceName The linked service name.
   * @param options The options parameters.
   */
  getLinkedService(
    linkedServiceName: string,
    options?: LinkedServiceGetLinkedServiceOptionalParams
  ): Promise<LinkedServiceGetLinkedServiceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { linkedServiceName, options: operationOptions },
      getLinkedServiceOperationSpec
    ) as Promise<LinkedServiceGetLinkedServiceResponse>;
  }

  /**
   * Deletes a linked service.
   * @param linkedServiceName The linked service name.
   * @param options The options parameters.
   */
  deleteLinkedService(
    linkedServiceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { linkedServiceName, options: operationOptions },
      deleteLinkedServiceOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * GetLinkedServicesByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetLinkedServicesByWorkspace
   *                 method.
   * @param options The options parameters.
   */
  getLinkedServicesByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<LinkedServiceGetLinkedServicesByWorkspaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      getLinkedServicesByWorkspaceNextOperationSpec
    ) as Promise<LinkedServiceGetLinkedServicesByWorkspaceNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getLinkedServicesByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/linkedservices",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LinkedServiceListResponse
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
const createOrUpdateLinkedServiceOperationSpec: coreHttp.OperationSpec = {
  path: "/linkedservices/{linkedServiceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.LinkedServiceResource
    },
    202: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.linkedService,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.linkedServiceName],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept1,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getLinkedServiceOperationSpec: coreHttp.OperationSpec = {
  path: "/linkedservices/{linkedServiceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LinkedServiceResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.linkedServiceName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteLinkedServiceOperationSpec: coreHttp.OperationSpec = {
  path: "/linkedservices/{linkedServiceName}",
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
  urlParameters: [Parameters.endpoint, Parameters.linkedServiceName],
  headerParameters: [Parameters.accept],
  serializer
};
const getLinkedServicesByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LinkedServiceListResponse
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
