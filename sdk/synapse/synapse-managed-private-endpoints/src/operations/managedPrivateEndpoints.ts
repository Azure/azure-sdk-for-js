/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { tracingClient } from "../tracing.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { ManagedPrivateEndpoints } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import type { ManagedPrivateEndpointsClient } from "../managedPrivateEndpointsClient.js";
import type {
  ManagedPrivateEndpoint,
  ManagedPrivateEndpointsListNextOptionalParams,
  ManagedPrivateEndpointsListOptionalParams,
  ManagedPrivateEndpointsGetOptionalParams,
  ManagedPrivateEndpointsGetResponse,
  ManagedPrivateEndpointsCreateOptionalParams,
  ManagedPrivateEndpointsCreateResponse,
  ManagedPrivateEndpointsDeleteOptionalParams,
  ManagedPrivateEndpointsListResponse,
  ManagedPrivateEndpointsListNextResponse,
} from "../models/index.js";

// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedPrivateEndpoint,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.managedVirtualNetworkName,
    Parameters.managedPrivateEndpointName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOperationSpec: coreClient.OperationSpec = {
  path: "/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedPrivateEndpoint,
    },
  },
  requestBody: Parameters.managedPrivateEndpoint,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.managedVirtualNetworkName,
    Parameters.managedPrivateEndpointName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
  httpMethod: "DELETE",
  responses: { 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.managedVirtualNetworkName,
    Parameters.managedPrivateEndpointName,
  ],
  serializer,
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedPrivateEndpointListResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.managedVirtualNetworkName],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedPrivateEndpointListResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.managedVirtualNetworkName, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer,
};

/** Class containing ManagedPrivateEndpoints operations. */
export class ManagedPrivateEndpointsImpl implements ManagedPrivateEndpoints {
  private readonly client: ManagedPrivateEndpointsClient;

  /**
   * Initialize a new instance of the class ManagedPrivateEndpoints class.
   * @param client - Reference to the service client
   */
  constructor(client: ManagedPrivateEndpointsClient) {
    this.client = client;
  }

  /**
   * List Managed Private Endpoints
   * @param managedVirtualNetworkName - Managed virtual network name
   * @param options - The options parameters.
   */
  public list(
    managedVirtualNetworkName: string,
    options?: ManagedPrivateEndpointsListOptionalParams,
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
      },
    };
  }

  private async *listPagingPage(
    managedVirtualNetworkName: string,
    options?: ManagedPrivateEndpointsListOptionalParams,
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
    options?: ManagedPrivateEndpointsListOptionalParams,
  ): AsyncIterableIterator<ManagedPrivateEndpoint> {
    for await (const page of this.listPagingPage(managedVirtualNetworkName, options)) {
      yield* page;
    }
  }

  /**
   * Get Managed Private Endpoints
   * @param managedVirtualNetworkName - Managed virtual network name
   * @param managedPrivateEndpointName - Managed private endpoint name
   * @param options - The options parameters.
   */
  async get(
    managedVirtualNetworkName: string,
    managedPrivateEndpointName: string,
    options?: ManagedPrivateEndpointsGetOptionalParams,
  ): Promise<ManagedPrivateEndpointsGetResponse> {
    return tracingClient.withSpan(
      "ManagedPrivateEndpointsClient.get",
      options ?? {},
      async (updatedOptions) => {
        return this.client.sendOperationRequest(
          { managedVirtualNetworkName, managedPrivateEndpointName, updatedOptions },
          getOperationSpec,
        ) as Promise<ManagedPrivateEndpointsGetResponse>;
      },
    );
  }

  /**
   * Create Managed Private Endpoints
   * @param managedVirtualNetworkName - Managed virtual network name
   * @param managedPrivateEndpointName - Managed private endpoint name
   * @param managedPrivateEndpoint - Managed private endpoint properties.
   * @param options - The options parameters.
   */
  async create(
    managedVirtualNetworkName: string,
    managedPrivateEndpointName: string,
    managedPrivateEndpoint: ManagedPrivateEndpoint,
    options?: ManagedPrivateEndpointsCreateOptionalParams,
  ): Promise<ManagedPrivateEndpointsCreateResponse> {
    return tracingClient.withSpan(
      "ManagedPrivateEndpointsClient.create",
      options ?? {},
      async (updatedOptions) => {
        return this.client.sendOperationRequest(
          {
            managedVirtualNetworkName,
            managedPrivateEndpointName,
            managedPrivateEndpoint,
            updatedOptions,
          },
          createOperationSpec,
        ) as Promise<ManagedPrivateEndpointsCreateResponse>;
      },
    );
  }

  /**
   * Delete Managed Private Endpoints
   * @param managedVirtualNetworkName - Managed virtual network name
   * @param managedPrivateEndpointName - Managed private endpoint name
   * @param options - The options parameters.
   */
  async delete(
    managedVirtualNetworkName: string,
    managedPrivateEndpointName: string,
    options?: ManagedPrivateEndpointsDeleteOptionalParams,
  ): Promise<void> {
    return tracingClient.withSpan(
      "ManagedPrivateEndpointsClient.delete",
      options ?? {},
      async (updatedOptions) => {
        return this.client.sendOperationRequest(
          { managedVirtualNetworkName, managedPrivateEndpointName, updatedOptions },
          deleteOperationSpec,
        ) as Promise<void>;
      },
    );
  }

  /**
   * List Managed Private Endpoints
   * @param managedVirtualNetworkName - Managed virtual network name
   * @param options - The options parameters.
   */
  private async _list(
    managedVirtualNetworkName: string,
    options?: ManagedPrivateEndpointsListOptionalParams,
  ): Promise<ManagedPrivateEndpointsListResponse> {
    return tracingClient.withSpan(
      "ManagedPrivateEndpointsClient._list",
      options ?? {},
      async (updatedOptions) => {
        return this.client.sendOperationRequest(
          { managedVirtualNetworkName, updatedOptions },
          listOperationSpec,
        ) as Promise<ManagedPrivateEndpointsListResponse>;
      },
    );
  }

  /**
   * ListNext
   * @param managedVirtualNetworkName - Managed virtual network name
   * @param nextLink - The nextLink from the previous successful call to the List method.
   * @param options - The options parameters.
   */
  private async _listNext(
    managedVirtualNetworkName: string,
    nextLink: string,
    options?: ManagedPrivateEndpointsListNextOptionalParams,
  ): Promise<ManagedPrivateEndpointsListNextResponse> {
    return tracingClient.withSpan(
      "ManagedPrivateEndpointsClient._listNext",
      options ?? {},
      async (updatedOptions) => {
        return this.client.sendOperationRequest(
          { managedVirtualNetworkName, nextLink, updatedOptions },
          listNextOperationSpec,
        ) as Promise<ManagedPrivateEndpointsListNextResponse>;
      },
    );
  }
}
