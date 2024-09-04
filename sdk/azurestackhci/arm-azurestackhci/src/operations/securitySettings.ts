/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { SecuritySettings } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { AzureStackHCIClient } from "../azureStackHCIClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  SecuritySetting,
  SecuritySettingsListByClustersNextOptionalParams,
  SecuritySettingsListByClustersOptionalParams,
  SecuritySettingsListByClustersResponse,
  SecuritySettingsGetOptionalParams,
  SecuritySettingsGetResponse,
  SecuritySettingsCreateOrUpdateOptionalParams,
  SecuritySettingsCreateOrUpdateResponse,
  SecuritySettingsDeleteOptionalParams,
  SecuritySettingsDeleteResponse,
  SecuritySettingsListByClustersNextResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing SecuritySettings operations. */
export class SecuritySettingsImpl implements SecuritySettings {
  private readonly client: AzureStackHCIClient;

  /**
   * Initialize a new instance of the class SecuritySettings class.
   * @param client Reference to the service client
   */
  constructor(client: AzureStackHCIClient) {
    this.client = client;
  }

  /**
   * List SecuritySetting resources by Clusters
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param options The options parameters.
   */
  public listByClusters(
    resourceGroupName: string,
    clusterName: string,
    options?: SecuritySettingsListByClustersOptionalParams,
  ): PagedAsyncIterableIterator<SecuritySetting> {
    const iter = this.listByClustersPagingAll(
      resourceGroupName,
      clusterName,
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
        return this.listByClustersPagingPage(
          resourceGroupName,
          clusterName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByClustersPagingPage(
    resourceGroupName: string,
    clusterName: string,
    options?: SecuritySettingsListByClustersOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<SecuritySetting[]> {
    let result: SecuritySettingsListByClustersResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByClusters(
        resourceGroupName,
        clusterName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByClustersNext(
        resourceGroupName,
        clusterName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByClustersPagingAll(
    resourceGroupName: string,
    clusterName: string,
    options?: SecuritySettingsListByClustersOptionalParams,
  ): AsyncIterableIterator<SecuritySetting> {
    for await (const page of this.listByClustersPagingPage(
      resourceGroupName,
      clusterName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List SecuritySetting resources by Clusters
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param options The options parameters.
   */
  private _listByClusters(
    resourceGroupName: string,
    clusterName: string,
    options?: SecuritySettingsListByClustersOptionalParams,
  ): Promise<SecuritySettingsListByClustersResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, options },
      listByClustersOperationSpec,
    );
  }

  /**
   * Get a SecuritySetting
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param securitySettingsName Name of security setting
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    clusterName: string,
    securitySettingsName: string,
    options?: SecuritySettingsGetOptionalParams,
  ): Promise<SecuritySettingsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, securitySettingsName, options },
      getOperationSpec,
    );
  }

  /**
   * Create a security setting
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param securitySettingsName Name of security setting
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    clusterName: string,
    securitySettingsName: string,
    resource: SecuritySetting,
    options?: SecuritySettingsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<SecuritySettingsCreateOrUpdateResponse>,
      SecuritySettingsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<SecuritySettingsCreateOrUpdateResponse> => {
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
        clusterName,
        securitySettingsName,
        resource,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      SecuritySettingsCreateOrUpdateResponse,
      OperationState<SecuritySettingsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create a security setting
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param securitySettingsName Name of security setting
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    clusterName: string,
    securitySettingsName: string,
    resource: SecuritySetting,
    options?: SecuritySettingsCreateOrUpdateOptionalParams,
  ): Promise<SecuritySettingsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      clusterName,
      securitySettingsName,
      resource,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete a SecuritySetting
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param securitySettingsName Name of security setting
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    clusterName: string,
    securitySettingsName: string,
    options?: SecuritySettingsDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<SecuritySettingsDeleteResponse>,
      SecuritySettingsDeleteResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<SecuritySettingsDeleteResponse> => {
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
      args: { resourceGroupName, clusterName, securitySettingsName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      SecuritySettingsDeleteResponse,
      OperationState<SecuritySettingsDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a SecuritySetting
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param securitySettingsName Name of security setting
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    clusterName: string,
    securitySettingsName: string,
    options?: SecuritySettingsDeleteOptionalParams,
  ): Promise<SecuritySettingsDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      clusterName,
      securitySettingsName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByClustersNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName The name of the cluster.
   * @param nextLink The nextLink from the previous successful call to the ListByClusters method.
   * @param options The options parameters.
   */
  private _listByClustersNext(
    resourceGroupName: string,
    clusterName: string,
    nextLink: string,
    options?: SecuritySettingsListByClustersNextOptionalParams,
  ): Promise<SecuritySettingsListByClustersNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, nextLink, options },
      listByClustersNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByClustersOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/securitySettings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SecuritySettingListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/securitySettings/{securitySettingsName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SecuritySetting,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.securitySettingsName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/securitySettings/{securitySettingsName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SecuritySetting,
    },
    201: {
      bodyMapper: Mappers.SecuritySetting,
    },
    202: {
      bodyMapper: Mappers.SecuritySetting,
    },
    204: {
      bodyMapper: Mappers.SecuritySetting,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.resource2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.securitySettingsName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/securitySettings/{securitySettingsName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.SecuritySettingsDeleteHeaders,
    },
    201: {
      headersMapper: Mappers.SecuritySettingsDeleteHeaders,
    },
    202: {
      headersMapper: Mappers.SecuritySettingsDeleteHeaders,
    },
    204: {
      headersMapper: Mappers.SecuritySettingsDeleteHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.securitySettingsName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByClustersNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SecuritySettingListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};