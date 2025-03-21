/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { PrivateLinkScopedResources } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { MonitorClient } from "../monitorClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  ScopedResource,
  PrivateLinkScopedResourcesListByPrivateLinkScopeNextOptionalParams,
  PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams,
  PrivateLinkScopedResourcesListByPrivateLinkScopeResponse,
  PrivateLinkScopedResourcesGetOptionalParams,
  PrivateLinkScopedResourcesGetResponse,
  PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
  PrivateLinkScopedResourcesCreateOrUpdateResponse,
  PrivateLinkScopedResourcesDeleteOptionalParams,
  PrivateLinkScopedResourcesListByPrivateLinkScopeNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing PrivateLinkScopedResources operations. */
export class PrivateLinkScopedResourcesImpl
  implements PrivateLinkScopedResources
{
  private readonly client: MonitorClient;

  /**
   * Initialize a new instance of the class PrivateLinkScopedResources class.
   * @param client Reference to the service client
   */
  constructor(client: MonitorClient) {
    this.client = client;
  }

  /**
   * Gets all private endpoint connections on a private link scope.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param scopeName The name of the Azure Monitor PrivateLinkScope resource.
   * @param options The options parameters.
   */
  public listByPrivateLinkScope(
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams,
  ): PagedAsyncIterableIterator<ScopedResource> {
    const iter = this.listByPrivateLinkScopePagingAll(
      resourceGroupName,
      scopeName,
      options,
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByPrivateLinkScopePagingPage(
          resourceGroupName,
          scopeName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByPrivateLinkScopePagingPage(
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<ScopedResource[]> {
    let result: PrivateLinkScopedResourcesListByPrivateLinkScopeResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByPrivateLinkScope(
        resourceGroupName,
        scopeName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByPrivateLinkScopeNext(
        resourceGroupName,
        scopeName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByPrivateLinkScopePagingAll(
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams,
  ): AsyncIterableIterator<ScopedResource> {
    for await (const page of this.listByPrivateLinkScopePagingPage(
      resourceGroupName,
      scopeName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Gets a scoped resource in a private link scope.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param scopeName The name of the Azure Monitor PrivateLinkScope resource.
   * @param name The name of the scoped resource object.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    scopeName: string,
    name: string,
    options?: PrivateLinkScopedResourcesGetOptionalParams,
  ): Promise<PrivateLinkScopedResourcesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, scopeName, name, options },
      getOperationSpec,
    );
  }

  /**
   * Approve or reject a private endpoint connection with a given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param scopeName The name of the Azure Monitor PrivateLinkScope resource.
   * @param name The name of the scoped resource object.
   * @param parameters A private link scoped resource
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    scopeName: string,
    name: string,
    parameters: ScopedResource,
    options?: PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<PrivateLinkScopedResourcesCreateOrUpdateResponse>,
      PrivateLinkScopedResourcesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<PrivateLinkScopedResourcesCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, scopeName, name, parameters, options },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      PrivateLinkScopedResourcesCreateOrUpdateResponse,
      OperationState<PrivateLinkScopedResourcesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Approve or reject a private endpoint connection with a given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param scopeName The name of the Azure Monitor PrivateLinkScope resource.
   * @param name The name of the scoped resource object.
   * @param parameters A private link scoped resource
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    scopeName: string,
    name: string,
    parameters: ScopedResource,
    options?: PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
  ): Promise<PrivateLinkScopedResourcesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      scopeName,
      name,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes a private endpoint connection with a given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param scopeName The name of the Azure Monitor PrivateLinkScope resource.
   * @param name The name of the scoped resource object.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    scopeName: string,
    name: string,
    options?: PrivateLinkScopedResourcesDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, scopeName, name, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes a private endpoint connection with a given name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param scopeName The name of the Azure Monitor PrivateLinkScope resource.
   * @param name The name of the scoped resource object.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    scopeName: string,
    name: string,
    options?: PrivateLinkScopedResourcesDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      scopeName,
      name,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets all private endpoint connections on a private link scope.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param scopeName The name of the Azure Monitor PrivateLinkScope resource.
   * @param options The options parameters.
   */
  private _listByPrivateLinkScope(
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams,
  ): Promise<PrivateLinkScopedResourcesListByPrivateLinkScopeResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, scopeName, options },
      listByPrivateLinkScopeOperationSpec,
    );
  }

  /**
   * ListByPrivateLinkScopeNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param scopeName The name of the Azure Monitor PrivateLinkScope resource.
   * @param nextLink The nextLink from the previous successful call to the ListByPrivateLinkScope method.
   * @param options The options parameters.
   */
  private _listByPrivateLinkScopeNext(
    resourceGroupName: string,
    scopeName: string,
    nextLink: string,
    options?: PrivateLinkScopedResourcesListByPrivateLinkScopeNextOptionalParams,
  ): Promise<PrivateLinkScopedResourcesListByPrivateLinkScopeNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, scopeName, nextLink, options },
      listByPrivateLinkScopeNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources/{name}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ScopedResource,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion12],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.name,
    Parameters.scopeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources/{name}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ScopedResource,
    },
    201: {
      bodyMapper: Mappers.ScopedResource,
    },
    202: {
      bodyMapper: Mappers.ScopedResource,
    },
    204: {
      bodyMapper: Mappers.ScopedResource,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  requestBody: Parameters.parameters9,
  queryParameters: [Parameters.apiVersion12],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.name,
    Parameters.scopeName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources/{name}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion12],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.name,
    Parameters.scopeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByPrivateLinkScopeOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ScopedResourceListResult,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion12],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.scopeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByPrivateLinkScopeNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ScopedResourceListResult,
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.scopeName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
