import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import { LROPoller, shouldDeserializeLRO } from "../lro";
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
  async createOrUpdateLinkedService(
    linkedServiceName: string,
    linkedService: LinkedServiceResource,
    options?: LinkedServiceCreateOrUpdateLinkedServiceOptionalParams
  ): Promise<LROPoller<LinkedServiceCreateOrUpdateLinkedServiceResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      linkedServiceName,
      linkedService,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        LinkedServiceCreateOrUpdateLinkedServiceResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOrUpdateLinkedServiceOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOrUpdateLinkedServiceOperationSpec,
      initialOperationResult,
      sendOperation
    });
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
  async deleteLinkedService(
    linkedServiceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      linkedServiceName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      deleteLinkedServiceOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteLinkedServiceOperationSpec,
      initialOperationResult,
      sendOperation
    });
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

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
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
    201: {
      bodyMapper: Mappers.LinkedServiceResource
    },
    202: {
      bodyMapper: Mappers.LinkedServiceResource
    },
    204: {
      bodyMapper: Mappers.LinkedServiceResource
    },
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
    201: {},
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
