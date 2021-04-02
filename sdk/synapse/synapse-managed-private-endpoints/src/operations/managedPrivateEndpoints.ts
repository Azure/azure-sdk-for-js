// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "../tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ManagedPrivateEndpointsClient } from "../managedPrivateEndpointsClient";
import {
  ManagedPrivateEndpoint,
  ManagedPrivateEndpointsGetResponse,
  ManagedPrivateEndpointsCreateResponse,
  ManagedPrivateEndpointsListResponse,
  ManagedPrivateEndpointsListNextResponse
} from "../models";

/** Class representing a ManagedPrivateEndpoints. */
export class ManagedPrivateEndpoints {
  private readonly client: ManagedPrivateEndpointsClient;

  /**
   * Initialize a new instance of the class ManagedPrivateEndpoints class.
   * @param client Reference to the service client
   */
  constructor(client: ManagedPrivateEndpointsClient) {
    this.client = client;
  }

  /**
   * List Managed Private Endpoints
   * @param managedVirtualNetworkName Managed virtual network name
   * @param options The options parameters.
   */
  public list(
    managedVirtualNetworkName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<ManagedPrivateEndpoint> {
    const iter = this.listPagingAll(managedVirtualNetworkName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(managedVirtualNetworkName, options);
      }
    };
  }

  private async *listPagingPage(
    managedVirtualNetworkName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<ManagedPrivateEndpoint[]> {
    let result = await this._list(managedVirtualNetworkName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(managedVirtualNetworkName, continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    managedVirtualNetworkName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<ManagedPrivateEndpoint> {
    for await (const page of this.listPagingPage(managedVirtualNetworkName, options)) {
      yield* page;
    }
  }

  /**
   * Get Managed Private Endpoints
   * @param managedVirtualNetworkName Managed virtual network name
   * @param managedPrivateEndpointName Managed private endpoint name
   * @param options The options parameters.
   */
  async get(
    managedVirtualNetworkName: string,
    managedPrivateEndpointName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagedPrivateEndpointsGetResponse> {
    const { span, updatedOptions } = createSpan("ManagedPrivateEndpointsClient-get", options);
    const operationArguments: coreHttp.OperationArguments = {
      managedVirtualNetworkName,
      managedPrivateEndpointName,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(operationArguments, getOperationSpec);
      return result as ManagedPrivateEndpointsGetResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Create Managed Private Endpoints
   * @param managedVirtualNetworkName Managed virtual network name
   * @param managedPrivateEndpointName Managed private endpoint name
   * @param managedPrivateEndpoint Managed private endpoint properties.
   * @param options The options parameters.
   */
  async create(
    managedVirtualNetworkName: string,
    managedPrivateEndpointName: string,
    managedPrivateEndpoint: ManagedPrivateEndpoint,
    options?: coreHttp.OperationOptions
  ): Promise<ManagedPrivateEndpointsCreateResponse> {
    const { span, updatedOptions } = createSpan("ManagedPrivateEndpointsClient-create", options);
    const operationArguments: coreHttp.OperationArguments = {
      managedVirtualNetworkName,
      managedPrivateEndpointName,
      managedPrivateEndpoint,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        createOperationSpec
      );
      return result as ManagedPrivateEndpointsCreateResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Delete Managed Private Endpoints
   * @param managedVirtualNetworkName Managed virtual network name
   * @param managedPrivateEndpointName Managed private endpoint name
   * @param options The options parameters.
   */
  async delete(
    managedVirtualNetworkName: string,
    managedPrivateEndpointName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("ManagedPrivateEndpointsClient-delete", options);
    const operationArguments: coreHttp.OperationArguments = {
      managedVirtualNetworkName,
      managedPrivateEndpointName,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        deleteOperationSpec
      );
      return result as coreHttp.RestResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * List Managed Private Endpoints
   * @param managedVirtualNetworkName Managed virtual network name
   * @param options The options parameters.
   */
  private async _list(
    managedVirtualNetworkName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagedPrivateEndpointsListResponse> {
    const { span, updatedOptions } = createSpan("ManagedPrivateEndpointsClient-_list", options);
    const operationArguments: coreHttp.OperationArguments = {
      managedVirtualNetworkName,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(operationArguments, listOperationSpec);
      return result as ManagedPrivateEndpointsListResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * ListNext
   * @param managedVirtualNetworkName Managed virtual network name
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private async _listNext(
    managedVirtualNetworkName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagedPrivateEndpointsListNextResponse> {
    const { span, updatedOptions } = createSpan("ManagedPrivateEndpointsClient-_listNext", options);
    const operationArguments: coreHttp.OperationArguments = {
      managedVirtualNetworkName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        listNextOperationSpec
      );
      return result as ManagedPrivateEndpointsListNextResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedPrivateEndpoint
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.managedVirtualNetworkName,
    Parameters.managedPrivateEndpointName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedPrivateEndpoint
    }
  },
  requestBody: Parameters.managedPrivateEndpoint,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.managedVirtualNetworkName,
    Parameters.managedPrivateEndpointName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
  httpMethod: "DELETE",
  responses: { 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.managedVirtualNetworkName,
    Parameters.managedPrivateEndpointName
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path: "/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedPrivateEndpointListResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.managedVirtualNetworkName],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedPrivateEndpointListResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.managedVirtualNetworkName, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
