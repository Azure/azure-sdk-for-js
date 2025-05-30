/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { RaiBlocklists } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState, createHttpPoller } from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  RaiBlocklist,
  RaiBlocklistsListNextOptionalParams,
  RaiBlocklistsListOptionalParams,
  RaiBlocklistsListResponse,
  RaiBlocklistsGetOptionalParams,
  RaiBlocklistsGetResponse,
  RaiBlocklistsCreateOrUpdateOptionalParams,
  RaiBlocklistsCreateOrUpdateResponse,
  RaiBlocklistsDeleteOptionalParams,
  RaiBlocklistsDeleteResponse,
  RaiBlocklistsListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing RaiBlocklists operations. */
export class RaiBlocklistsImpl implements RaiBlocklists {
  private readonly client: CognitiveServicesManagementClient;

  /**
   * Initialize a new instance of the class RaiBlocklists class.
   * @param client Reference to the service client
   */
  constructor(client: CognitiveServicesManagementClient) {
    this.client = client;
  }

  /**
   * Gets the custom blocklists associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    accountName: string,
    options?: RaiBlocklistsListOptionalParams,
  ): PagedAsyncIterableIterator<RaiBlocklist> {
    const iter = this.listPagingAll(resourceGroupName, accountName, options);
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
        return this.listPagingPage(resourceGroupName, accountName, options, settings);
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    accountName: string,
    options?: RaiBlocklistsListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<RaiBlocklist[]> {
    let result: RaiBlocklistsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, accountName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(resourceGroupName, accountName, continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    accountName: string,
    options?: RaiBlocklistsListOptionalParams,
  ): AsyncIterableIterator<RaiBlocklist> {
    for await (const page of this.listPagingPage(resourceGroupName, accountName, options)) {
      yield* page;
    }
  }

  /**
   * Gets the custom blocklists associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    accountName: string,
    options?: RaiBlocklistsListOptionalParams,
  ): Promise<RaiBlocklistsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      listOperationSpec,
    );
  }

  /**
   * Gets the specified custom blocklist associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    options?: RaiBlocklistsGetOptionalParams,
  ): Promise<RaiBlocklistsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, raiBlocklistName, options },
      getOperationSpec,
    );
  }

  /**
   * Update the state of specified blocklist associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
   * @param raiBlocklist Properties describing the custom blocklist.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    raiBlocklist: RaiBlocklist,
    options?: RaiBlocklistsCreateOrUpdateOptionalParams,
  ): Promise<RaiBlocklistsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        raiBlocklistName,
        raiBlocklist,
        options,
      },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Deletes the specified custom blocklist associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    options?: RaiBlocklistsDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<OperationState<RaiBlocklistsDeleteResponse>, RaiBlocklistsDeleteResponse>
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<RaiBlocklistsDeleteResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined = undefined;
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
      args: { resourceGroupName, accountName, raiBlocklistName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      RaiBlocklistsDeleteResponse,
      OperationState<RaiBlocklistsDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified custom blocklist associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param raiBlocklistName The name of the RaiBlocklist associated with the Cognitive Services Account
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    options?: RaiBlocklistsDeleteOptionalParams,
  ): Promise<RaiBlocklistsDeleteResponse> {
    const poller = await this.beginDelete(
      resourceGroupName,
      accountName,
      raiBlocklistName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    accountName: string,
    nextLink: string,
    options?: RaiBlocklistsListNextOptionalParams,
  ): Promise<RaiBlocklistsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RaiBlockListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RaiBlocklist,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
    Parameters.raiBlocklistName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.RaiBlocklist,
    },
    201: {
      bodyMapper: Mappers.RaiBlocklist,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.raiBlocklist,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
    Parameters.raiBlocklistName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.RaiBlocklistsDeleteHeaders,
    },
    201: {
      headersMapper: Mappers.RaiBlocklistsDeleteHeaders,
    },
    202: {
      headersMapper: Mappers.RaiBlocklistsDeleteHeaders,
    },
    204: {
      headersMapper: Mappers.RaiBlocklistsDeleteHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
    Parameters.raiBlocklistName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RaiBlockListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
