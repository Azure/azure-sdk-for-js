/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { RecordSets } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { PrivateDnsManagementClient } from "../privateDnsManagementClient.js";
import {
  RecordSet,
  RecordType,
  RecordSetsListByTypeNextOptionalParams,
  RecordSetsListByTypeOptionalParams,
  RecordSetsListByTypeResponse,
  RecordSetsListNextOptionalParams,
  RecordSetsListOptionalParams,
  RecordSetsListResponse,
  RecordSetsCreateOrUpdateOptionalParams,
  RecordSetsCreateOrUpdateResponse,
  RecordSetsUpdateOptionalParams,
  RecordSetsUpdateResponse,
  RecordSetsDeleteOptionalParams,
  RecordSetsGetOptionalParams,
  RecordSetsGetResponse,
  RecordSetsListByTypeNextResponse,
  RecordSetsListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing RecordSets operations. */
export class RecordSetsImpl implements RecordSets {
  private readonly client: PrivateDnsManagementClient;

  /**
   * Initialize a new instance of the class RecordSets class.
   * @param client Reference to the service client
   */
  constructor(client: PrivateDnsManagementClient) {
    this.client = client;
  }

  /**
   * Lists the record sets of a specified type in a Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param recordType The type of record sets to enumerate.
   * @param options The options parameters.
   */
  public listByType(
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    options?: RecordSetsListByTypeOptionalParams,
  ): PagedAsyncIterableIterator<RecordSet> {
    const iter = this.listByTypePagingAll(
      resourceGroupName,
      privateZoneName,
      recordType,
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
        return this.listByTypePagingPage(
          resourceGroupName,
          privateZoneName,
          recordType,
          options,
          settings,
        );
      },
    };
  }

  private async *listByTypePagingPage(
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    options?: RecordSetsListByTypeOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<RecordSet[]> {
    let result: RecordSetsListByTypeResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByType(
        resourceGroupName,
        privateZoneName,
        recordType,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByTypeNext(
        resourceGroupName,
        privateZoneName,
        recordType,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByTypePagingAll(
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    options?: RecordSetsListByTypeOptionalParams,
  ): AsyncIterableIterator<RecordSet> {
    for await (const page of this.listByTypePagingPage(
      resourceGroupName,
      privateZoneName,
      recordType,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Lists all record sets in a Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    privateZoneName: string,
    options?: RecordSetsListOptionalParams,
  ): PagedAsyncIterableIterator<RecordSet> {
    const iter = this.listPagingAll(
      resourceGroupName,
      privateZoneName,
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
          privateZoneName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    privateZoneName: string,
    options?: RecordSetsListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<RecordSet[]> {
    let result: RecordSetsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, privateZoneName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        privateZoneName,
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
    privateZoneName: string,
    options?: RecordSetsListOptionalParams,
  ): AsyncIterableIterator<RecordSet> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      privateZoneName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Creates or updates a record set within a Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param recordType The type of DNS record in this record set. Record sets of type SOA can be updated
   *                   but not created (they are created when the Private DNS zone is created).
   * @param relativeRecordSetName The name of the record set, relative to the name of the zone.
   * @param parameters Parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    relativeRecordSetName: string,
    parameters: RecordSet,
    options?: RecordSetsCreateOrUpdateOptionalParams,
  ): Promise<RecordSetsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        privateZoneName,
        recordType,
        relativeRecordSetName,
        parameters,
        options,
      },
      createOrUpdateOperationSpec,
    );
  }

  /**
   * Updates a record set within a Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param recordType The type of DNS record in this record set.
   * @param relativeRecordSetName The name of the record set, relative to the name of the zone.
   * @param parameters Parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    relativeRecordSetName: string,
    parameters: RecordSet,
    options?: RecordSetsUpdateOptionalParams,
  ): Promise<RecordSetsUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        privateZoneName,
        recordType,
        relativeRecordSetName,
        parameters,
        options,
      },
      updateOperationSpec,
    );
  }

  /**
   * Deletes a record set from a Private DNS zone. This operation cannot be undone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param recordType The type of DNS record in this record set. Record sets of type SOA cannot be
   *                   deleted (they are deleted when the Private DNS zone is deleted).
   * @param relativeRecordSetName The name of the record set, relative to the name of the zone.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    relativeRecordSetName: string,
    options?: RecordSetsDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        privateZoneName,
        recordType,
        relativeRecordSetName,
        options,
      },
      deleteOperationSpec,
    );
  }

  /**
   * Gets a record set.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param recordType The type of DNS record in this record set.
   * @param relativeRecordSetName The name of the record set, relative to the name of the zone.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    relativeRecordSetName: string,
    options?: RecordSetsGetOptionalParams,
  ): Promise<RecordSetsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        privateZoneName,
        recordType,
        relativeRecordSetName,
        options,
      },
      getOperationSpec,
    );
  }

  /**
   * Lists the record sets of a specified type in a Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param recordType The type of record sets to enumerate.
   * @param options The options parameters.
   */
  private _listByType(
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    options?: RecordSetsListByTypeOptionalParams,
  ): Promise<RecordSetsListByTypeResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, privateZoneName, recordType, options },
      listByTypeOperationSpec,
    );
  }

  /**
   * Lists all record sets in a Private DNS zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    privateZoneName: string,
    options?: RecordSetsListOptionalParams,
  ): Promise<RecordSetsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, privateZoneName, options },
      listOperationSpec,
    );
  }

  /**
   * ListByTypeNext
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param recordType The type of record sets to enumerate.
   * @param nextLink The nextLink from the previous successful call to the ListByType method.
   * @param options The options parameters.
   */
  private _listByTypeNext(
    resourceGroupName: string,
    privateZoneName: string,
    recordType: RecordType,
    nextLink: string,
    options?: RecordSetsListByTypeNextOptionalParams,
  ): Promise<RecordSetsListByTypeNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, privateZoneName, recordType, nextLink, options },
      listByTypeNextOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    privateZoneName: string,
    nextLink: string,
    options?: RecordSetsListNextOptionalParams,
  ): Promise<RecordSetsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, privateZoneName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/{recordType}/{relativeRecordSetName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.RecordSet,
    },
    201: {
      bodyMapper: Mappers.RecordSet,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.privateZoneName,
    Parameters.subscriptionId,
    Parameters.recordType,
    Parameters.relativeRecordSetName,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
  ],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/{recordType}/{relativeRecordSetName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.RecordSet,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.privateZoneName,
    Parameters.subscriptionId,
    Parameters.recordType,
    Parameters.relativeRecordSetName,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch,
  ],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/{recordType}/{relativeRecordSetName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.privateZoneName,
    Parameters.subscriptionId,
    Parameters.recordType,
    Parameters.relativeRecordSetName,
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/{recordType}/{relativeRecordSetName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecordSet,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.privateZoneName,
    Parameters.subscriptionId,
    Parameters.recordType,
    Parameters.relativeRecordSetName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByTypeOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/{recordType}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecordSetListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.top,
    Parameters.recordsetnamesuffix,
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.privateZoneName,
    Parameters.subscriptionId,
    Parameters.recordType,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}/ALL",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecordSetListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.top,
    Parameters.recordsetnamesuffix,
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.privateZoneName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByTypeNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecordSetListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.privateZoneName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.recordType,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecordSetListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.privateZoneName,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
