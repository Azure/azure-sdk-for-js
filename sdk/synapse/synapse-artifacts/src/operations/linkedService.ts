// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  LinkedServiceResource,
  LinkedServiceGetLinkedServicesByWorkspaceResponse,
  LinkedServiceCreateOrUpdateLinkedServiceOptionalParams,
  LinkedServiceCreateOrUpdateLinkedServiceResponse,
  LinkedServiceGetLinkedServiceOptionalParams,
  LinkedServiceGetLinkedServiceResponse,
  ArtifactRenameRequest,
  LinkedServiceGetLinkedServicesByWorkspaceNextResponse
} from "../models";

/** Class representing a LinkedService. */
export class LinkedService {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class LinkedService class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Lists linked services.
   * @param options The options parameters.
   */
  public listLinkedServicesByWorkspace(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<LinkedServiceResource> {
    const iter = this.getLinkedServicesByWorkspacePagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getLinkedServicesByWorkspacePagingPage(options);
      }
    };
  }

  private async *getLinkedServicesByWorkspacePagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<LinkedServiceResource[]> {
    let result = await this._getLinkedServicesByWorkspace(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getLinkedServicesByWorkspaceNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getLinkedServicesByWorkspacePagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<LinkedServiceResource> {
    for await (const page of this.getLinkedServicesByWorkspacePagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists linked services.
   * @param options The options parameters.
   */
  private async _getLinkedServicesByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<LinkedServiceGetLinkedServicesByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getLinkedServicesByWorkspace",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getLinkedServicesByWorkspaceOperationSpec
      );
      return result as LinkedServiceGetLinkedServicesByWorkspaceResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
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
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-createOrUpdateLinkedService",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      linkedServiceName,
      linkedService,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as LinkedServiceCreateOrUpdateLinkedServiceResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateLinkedServiceOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
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
  async getLinkedService(
    linkedServiceName: string,
    options?: LinkedServiceGetLinkedServiceOptionalParams
  ): Promise<LinkedServiceGetLinkedServiceResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-getLinkedService",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      linkedServiceName,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getLinkedServiceOperationSpec
      );
      return result as LinkedServiceGetLinkedServiceResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
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
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-deleteLinkedService",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      linkedServiceName,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteLinkedServiceOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteLinkedServiceOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Renames a linked service.
   * @param linkedServiceName The linked service name.
   * @param request proposed new name.
   * @param options The options parameters.
   */
  async renameLinkedService(
    linkedServiceName: string,
    request: ArtifactRenameRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-renameLinkedService",
      this.getOperationOptions(options, "undefined")
    );
    const operationArguments: coreHttp.OperationArguments = {
      linkedServiceName,
      request,
      options: updatedOptions
    };
    const sendOperation = async (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as coreHttp.RestResponse;
      } catch (error) {
        span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      renameLinkedServiceOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: renameLinkedServiceOperationSpec,
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
  private async _getLinkedServicesByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<LinkedServiceGetLinkedServicesByWorkspaceNextResponse> {
    const { span, updatedOptions } = createSpan(
      "ArtifactsClient-_getLinkedServicesByWorkspaceNext",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getLinkedServicesByWorkspaceNextOperationSpec
      );
      return result as LinkedServiceGetLinkedServicesByWorkspaceNextResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
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
  headerParameters: [Parameters.accept, Parameters.contentType, Parameters.ifMatch],
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
const renameLinkedServiceOperationSpec: coreHttp.OperationSpec = {
  path: "/linkedservices/{linkedServiceName}/rename",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.request,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.linkedServiceName],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
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
