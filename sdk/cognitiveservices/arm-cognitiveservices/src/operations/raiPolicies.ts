/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { RaiPolicies } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import { SimplePollerLike, OperationState, createHttpPoller } from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  RaiPolicy,
  RaiPoliciesListNextOptionalParams,
  RaiPoliciesListOptionalParams,
  RaiPoliciesListResponse,
  RaiPoliciesGetOptionalParams,
  RaiPoliciesGetResponse,
  RaiPoliciesCreateOrUpdateOptionalParams,
  RaiPoliciesCreateOrUpdateResponse,
  RaiPoliciesDeleteOptionalParams,
  RaiPoliciesDeleteResponse,
  RaiPoliciesListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing RaiPolicies operations. */
export class RaiPoliciesImpl implements RaiPolicies {
  private readonly client: CognitiveServicesManagementClient;

  /**
   * Initialize a new instance of the class RaiPolicies class.
   * @param client Reference to the service client
   */
  constructor(client: CognitiveServicesManagementClient) {
    this.client = client;
  }

  /**
   * Gets the content filters associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    accountName: string,
    options?: RaiPoliciesListOptionalParams,
  ): PagedAsyncIterableIterator<RaiPolicy> {
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
    options?: RaiPoliciesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<RaiPolicy[]> {
    let result: RaiPoliciesListResponse;
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
    options?: RaiPoliciesListOptionalParams,
  ): AsyncIterableIterator<RaiPolicy> {
    for await (const page of this.listPagingPage(resourceGroupName, accountName, options)) {
      yield* page;
    }
  }

  /**
   * Gets the content filters associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    accountName: string,
    options?: RaiPoliciesListOptionalParams,
  ): Promise<RaiPoliciesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      listOperationSpec,
    );
  }

  /**
   * Gets the specified Content Filters associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param raiPolicyName The name of the RaiPolicy associated with the Cognitive Services Account
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    raiPolicyName: string,
    options?: RaiPoliciesGetOptionalParams,
  ): Promise<RaiPoliciesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, raiPolicyName, options },
      getOperationSpec,
    );
  }

  /**
   * Update the state of specified Content Filters associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param raiPolicyName The name of the RaiPolicy associated with the Cognitive Services Account
   * @param raiPolicy Properties describing the Content Filters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    accountName: string,
    raiPolicyName: string,
    raiPolicy: RaiPolicy,
    options?: RaiPoliciesCreateOrUpdateOptionalParams,
  ): Promise<RaiPoliciesCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, raiPolicyName, raiPolicy, options },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Deletes the specified Content Filters associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param raiPolicyName The name of the RaiPolicy associated with the Cognitive Services Account
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    accountName: string,
    raiPolicyName: string,
    options?: RaiPoliciesDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<OperationState<RaiPoliciesDeleteResponse>, RaiPoliciesDeleteResponse>
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<RaiPoliciesDeleteResponse> => {
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
      args: { resourceGroupName, accountName, raiPolicyName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<
      RaiPoliciesDeleteResponse,
      OperationState<RaiPoliciesDeleteResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the specified Content Filters associated with the Azure OpenAI account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of Cognitive Services account.
   * @param raiPolicyName The name of the RaiPolicy associated with the Cognitive Services Account
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    accountName: string,
    raiPolicyName: string,
    options?: RaiPoliciesDeleteOptionalParams,
  ): Promise<RaiPoliciesDeleteResponse> {
    const poller = await this.beginDelete(resourceGroupName, accountName, raiPolicyName, options);
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
    options?: RaiPoliciesListNextOptionalParams,
  ): Promise<RaiPoliciesListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiPolicies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RaiPolicyListResult,
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
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiPolicies/{raiPolicyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RaiPolicy,
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
    Parameters.raiPolicyName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiPolicies/{raiPolicyName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.RaiPolicy,
    },
    201: {
      bodyMapper: Mappers.RaiPolicy,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.raiPolicy,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId,
    Parameters.raiPolicyName,
  ],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiPolicies/{raiPolicyName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.RaiPoliciesDeleteHeaders,
    },
    201: {
      headersMapper: Mappers.RaiPoliciesDeleteHeaders,
    },
    202: {
      headersMapper: Mappers.RaiPoliciesDeleteHeaders,
    },
    204: {
      headersMapper: Mappers.RaiPoliciesDeleteHeaders,
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
    Parameters.raiPolicyName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RaiPolicyListResult,
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
