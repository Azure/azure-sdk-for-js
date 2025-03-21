/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { DbNodes } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { OracleDatabaseManagementClient } from "../oracleDatabaseManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  DbNode,
  DbNodesListByCloudVmClusterNextOptionalParams,
  DbNodesListByCloudVmClusterOptionalParams,
  DbNodesListByCloudVmClusterResponse,
  DbNodesGetOptionalParams,
  DbNodesGetResponse,
  DbNodeAction,
  DbNodesActionOptionalParams,
  DbNodesActionResponse,
  DbNodesListByCloudVmClusterNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing DbNodes operations. */
export class DbNodesImpl implements DbNodes {
  private readonly client: OracleDatabaseManagementClient;

  /**
   * Initialize a new instance of the class DbNodes class.
   * @param client Reference to the service client
   */
  constructor(client: OracleDatabaseManagementClient) {
    this.client = client;
  }

  /**
   * List DbNode resources by CloudVmCluster
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudvmclustername CloudVmCluster name
   * @param options The options parameters.
   */
  public listByCloudVmCluster(
    resourceGroupName: string,
    cloudvmclustername: string,
    options?: DbNodesListByCloudVmClusterOptionalParams,
  ): PagedAsyncIterableIterator<DbNode> {
    const iter = this.listByCloudVmClusterPagingAll(
      resourceGroupName,
      cloudvmclustername,
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
        return this.listByCloudVmClusterPagingPage(
          resourceGroupName,
          cloudvmclustername,
          options,
          settings,
        );
      },
    };
  }

  private async *listByCloudVmClusterPagingPage(
    resourceGroupName: string,
    cloudvmclustername: string,
    options?: DbNodesListByCloudVmClusterOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<DbNode[]> {
    let result: DbNodesListByCloudVmClusterResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByCloudVmCluster(
        resourceGroupName,
        cloudvmclustername,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByCloudVmClusterNext(
        resourceGroupName,
        cloudvmclustername,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByCloudVmClusterPagingAll(
    resourceGroupName: string,
    cloudvmclustername: string,
    options?: DbNodesListByCloudVmClusterOptionalParams,
  ): AsyncIterableIterator<DbNode> {
    for await (const page of this.listByCloudVmClusterPagingPage(
      resourceGroupName,
      cloudvmclustername,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List DbNode resources by CloudVmCluster
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudvmclustername CloudVmCluster name
   * @param options The options parameters.
   */
  private _listByCloudVmCluster(
    resourceGroupName: string,
    cloudvmclustername: string,
    options?: DbNodesListByCloudVmClusterOptionalParams,
  ): Promise<DbNodesListByCloudVmClusterResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cloudvmclustername, options },
      listByCloudVmClusterOperationSpec,
    );
  }

  /**
   * Get a DbNode
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudvmclustername CloudVmCluster name
   * @param dbnodeocid DbNode OCID.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    cloudvmclustername: string,
    dbnodeocid: string,
    options?: DbNodesGetOptionalParams,
  ): Promise<DbNodesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cloudvmclustername, dbnodeocid, options },
      getOperationSpec,
    );
  }

  /**
   * VM actions on DbNode of VM Cluster by the provided filter
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudvmclustername CloudVmCluster name
   * @param dbnodeocid DbNode OCID.
   * @param body The content of the action request
   * @param options The options parameters.
   */
  async beginAction(
    resourceGroupName: string,
    cloudvmclustername: string,
    dbnodeocid: string,
    body: DbNodeAction,
    options?: DbNodesActionOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DbNodesActionResponse>,
      DbNodesActionResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<DbNodesActionResponse> => {
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
        cloudvmclustername,
        dbnodeocid,
        body,
        options,
      },
      spec: actionOperationSpec,
    });
    const poller = await createHttpPoller<
      DbNodesActionResponse,
      OperationState<DbNodesActionResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * VM actions on DbNode of VM Cluster by the provided filter
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudvmclustername CloudVmCluster name
   * @param dbnodeocid DbNode OCID.
   * @param body The content of the action request
   * @param options The options parameters.
   */
  async beginActionAndWait(
    resourceGroupName: string,
    cloudvmclustername: string,
    dbnodeocid: string,
    body: DbNodeAction,
    options?: DbNodesActionOptionalParams,
  ): Promise<DbNodesActionResponse> {
    const poller = await this.beginAction(
      resourceGroupName,
      cloudvmclustername,
      dbnodeocid,
      body,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByCloudVmClusterNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudvmclustername CloudVmCluster name
   * @param nextLink The nextLink from the previous successful call to the ListByCloudVmCluster method.
   * @param options The options parameters.
   */
  private _listByCloudVmClusterNext(
    resourceGroupName: string,
    cloudvmclustername: string,
    nextLink: string,
    options?: DbNodesListByCloudVmClusterNextOptionalParams,
  ): Promise<DbNodesListByCloudVmClusterNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, cloudvmclustername, nextLink, options },
      listByCloudVmClusterNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByCloudVmClusterOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/dbNodes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DbNodeListResult,
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
    Parameters.cloudvmclustername,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/dbNodes/{dbnodeocid}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DbNode,
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
    Parameters.cloudvmclustername,
    Parameters.dbnodeocid,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const actionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/dbNodes/{dbnodeocid}/action",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.DbNode,
    },
    201: {
      bodyMapper: Mappers.DbNode,
    },
    202: {
      bodyMapper: Mappers.DbNode,
    },
    204: {
      bodyMapper: Mappers.DbNode,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.body5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cloudvmclustername,
    Parameters.dbnodeocid,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listByCloudVmClusterNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DbNodeListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.cloudvmclustername,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
