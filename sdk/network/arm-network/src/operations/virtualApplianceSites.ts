/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { VirtualApplianceSites } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { NetworkManagementClient } from "../networkManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  VirtualApplianceSite,
  VirtualApplianceSitesListNextOptionalParams,
  VirtualApplianceSitesListOptionalParams,
  VirtualApplianceSitesListResponse,
  VirtualApplianceSitesDeleteOptionalParams,
  VirtualApplianceSitesGetOptionalParams,
  VirtualApplianceSitesGetResponse,
  VirtualApplianceSitesCreateOrUpdateOptionalParams,
  VirtualApplianceSitesCreateOrUpdateResponse,
  VirtualApplianceSitesListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing VirtualApplianceSites operations. */
export class VirtualApplianceSitesImpl implements VirtualApplianceSites {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class VirtualApplianceSites class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource.
   * @param resourceGroupName The name of the resource group.
   * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: VirtualApplianceSitesListOptionalParams,
  ): PagedAsyncIterableIterator<VirtualApplianceSite> {
    const iter = this.listPagingAll(
      resourceGroupName,
      networkVirtualApplianceName,
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
        return this.listPagingPage(
          resourceGroupName,
          networkVirtualApplianceName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: VirtualApplianceSitesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<VirtualApplianceSite[]> {
    let result: VirtualApplianceSitesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(
        resourceGroupName,
        networkVirtualApplianceName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        networkVirtualApplianceName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: VirtualApplianceSitesListOptionalParams,
  ): AsyncIterableIterator<VirtualApplianceSite> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      networkVirtualApplianceName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Deletes the specified site from a Virtual Appliance.
   * @param resourceGroupName The name of the resource group.
   * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
   * @param siteName The name of the site.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    options?: VirtualApplianceSitesDeleteOptionalParams,
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
      args: {
        resourceGroupName,
        networkVirtualApplianceName,
        siteName,
        options,
      },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified site from a Virtual Appliance.
   * @param resourceGroupName The name of the resource group.
   * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
   * @param siteName The name of the site.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    options?: VirtualApplianceSitesDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      networkVirtualApplianceName,
      siteName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets the specified Virtual Appliance Site.
   * @param resourceGroupName The name of the resource group.
   * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
   * @param siteName The name of the site.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    options?: VirtualApplianceSitesGetOptionalParams,
  ): Promise<VirtualApplianceSitesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, networkVirtualApplianceName, siteName, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates the specified Network Virtual Appliance Site.
   * @param resourceGroupName The name of the resource group.
   * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
   * @param siteName The name of the site.
   * @param parameters Parameters supplied to the create or update Network Virtual Appliance Site
   *                   operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    parameters: VirtualApplianceSite,
    options?: VirtualApplianceSitesCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualApplianceSitesCreateOrUpdateResponse>,
      VirtualApplianceSitesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<VirtualApplianceSitesCreateOrUpdateResponse> => {
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
      args: {
        resourceGroupName,
        networkVirtualApplianceName,
        siteName,
        parameters,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      VirtualApplianceSitesCreateOrUpdateResponse,
      OperationState<VirtualApplianceSitesCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates the specified Network Virtual Appliance Site.
   * @param resourceGroupName The name of the resource group.
   * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
   * @param siteName The name of the site.
   * @param parameters Parameters supplied to the create or update Network Virtual Appliance Site
   *                   operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    siteName: string,
    parameters: VirtualApplianceSite,
    options?: VirtualApplianceSitesCreateOrUpdateOptionalParams,
  ): Promise<VirtualApplianceSitesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      networkVirtualApplianceName,
      siteName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource.
   * @param resourceGroupName The name of the resource group.
   * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    options?: VirtualApplianceSitesListOptionalParams,
  ): Promise<VirtualApplianceSitesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, networkVirtualApplianceName, options },
      listOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param networkVirtualApplianceName The name of the Network Virtual Appliance.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    networkVirtualApplianceName: string,
    nextLink: string,
    options?: VirtualApplianceSitesListNextOptionalParams,
  ): Promise<VirtualApplianceSitesListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, networkVirtualApplianceName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/virtualApplianceSites/{siteName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.networkVirtualApplianceName,
    Parameters.siteName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/virtualApplianceSites/{siteName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualApplianceSite,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.networkVirtualApplianceName,
    Parameters.siteName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/virtualApplianceSites/{siteName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualApplianceSite,
    },
    201: {
      bodyMapper: Mappers.VirtualApplianceSite,
    },
    202: {
      bodyMapper: Mappers.VirtualApplianceSite,
    },
    204: {
      bodyMapper: Mappers.VirtualApplianceSite,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters53,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.networkVirtualApplianceName,
    Parameters.siteName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/virtualApplianceSites",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkVirtualApplianceSiteListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.networkVirtualApplianceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkVirtualApplianceSiteListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.networkVirtualApplianceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
