/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { CatalogDevBoxDefinitions } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { DevCenterClient } from "../devCenterClient";
import {
  DevBoxDefinition,
  CatalogDevBoxDefinitionsListByCatalogNextOptionalParams,
  CatalogDevBoxDefinitionsListByCatalogOptionalParams,
  CatalogDevBoxDefinitionsListByCatalogResponse,
  CatalogDevBoxDefinitionsGetOptionalParams,
  CatalogDevBoxDefinitionsGetResponse,
  CatalogDevBoxDefinitionsGetErrorDetailsOptionalParams,
  CatalogDevBoxDefinitionsGetErrorDetailsResponse,
  CatalogDevBoxDefinitionsListByCatalogNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing CatalogDevBoxDefinitions operations. */
export class CatalogDevBoxDefinitionsImpl implements CatalogDevBoxDefinitions {
  private readonly client: DevCenterClient;

  /**
   * Initialize a new instance of the class CatalogDevBoxDefinitions class.
   * @param client Reference to the service client
   */
  constructor(client: DevCenterClient) {
    this.client = client;
  }

  /**
   * List Dev Box definitions in the catalog.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param devCenterName The name of the devcenter.
   * @param catalogName The name of the Catalog.
   * @param options The options parameters.
   */
  public listByCatalog(
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogDevBoxDefinitionsListByCatalogOptionalParams
  ): PagedAsyncIterableIterator<DevBoxDefinition> {
    const iter = this.listByCatalogPagingAll(
      resourceGroupName,
      devCenterName,
      catalogName,
      options
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
        return this.listByCatalogPagingPage(
          resourceGroupName,
          devCenterName,
          catalogName,
          options,
          settings
        );
      }
    };
  }

  private async *listByCatalogPagingPage(
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogDevBoxDefinitionsListByCatalogOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<DevBoxDefinition[]> {
    let result: CatalogDevBoxDefinitionsListByCatalogResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByCatalog(
        resourceGroupName,
        devCenterName,
        catalogName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByCatalogNext(
        resourceGroupName,
        devCenterName,
        catalogName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByCatalogPagingAll(
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogDevBoxDefinitionsListByCatalogOptionalParams
  ): AsyncIterableIterator<DevBoxDefinition> {
    for await (const page of this.listByCatalogPagingPage(
      resourceGroupName,
      devCenterName,
      catalogName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List Dev Box definitions in the catalog.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param devCenterName The name of the devcenter.
   * @param catalogName The name of the Catalog.
   * @param options The options parameters.
   */
  private _listByCatalog(
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    options?: CatalogDevBoxDefinitionsListByCatalogOptionalParams
  ): Promise<CatalogDevBoxDefinitionsListByCatalogResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, devCenterName, catalogName, options },
      listByCatalogOperationSpec
    );
  }

  /**
   * Gets a Dev Box definition from the catalog
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param devCenterName The name of the devcenter.
   * @param catalogName The name of the Catalog.
   * @param devBoxDefinitionName The name of the Dev Box definition.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    devBoxDefinitionName: string,
    options?: CatalogDevBoxDefinitionsGetOptionalParams
  ): Promise<CatalogDevBoxDefinitionsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        devCenterName,
        catalogName,
        devBoxDefinitionName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * Gets Catalog Devbox Definition error details
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param devCenterName The name of the devcenter.
   * @param catalogName The name of the Catalog.
   * @param devBoxDefinitionName The name of the Dev Box definition.
   * @param options The options parameters.
   */
  getErrorDetails(
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    devBoxDefinitionName: string,
    options?: CatalogDevBoxDefinitionsGetErrorDetailsOptionalParams
  ): Promise<CatalogDevBoxDefinitionsGetErrorDetailsResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        devCenterName,
        catalogName,
        devBoxDefinitionName,
        options
      },
      getErrorDetailsOperationSpec
    );
  }

  /**
   * ListByCatalogNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param devCenterName The name of the devcenter.
   * @param catalogName The name of the Catalog.
   * @param nextLink The nextLink from the previous successful call to the ListByCatalog method.
   * @param options The options parameters.
   */
  private _listByCatalogNext(
    resourceGroupName: string,
    devCenterName: string,
    catalogName: string,
    nextLink: string,
    options?: CatalogDevBoxDefinitionsListByCatalogNextOptionalParams
  ): Promise<CatalogDevBoxDefinitionsListByCatalogNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, devCenterName, catalogName, nextLink, options },
      listByCatalogNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByCatalogOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/devboxdefinitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DevBoxDefinitionListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.devCenterName,
    Parameters.catalogName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/devboxdefinitions/{devBoxDefinitionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DevBoxDefinition
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.devCenterName,
    Parameters.catalogName,
    Parameters.devBoxDefinitionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getErrorDetailsOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/devboxdefinitions/{devBoxDefinitionName}/getErrorDetails",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CatalogResourceValidationErrorDetails
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.devCenterName,
    Parameters.catalogName,
    Parameters.devBoxDefinitionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByCatalogNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DevBoxDefinitionListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.devCenterName,
    Parameters.nextLink,
    Parameters.catalogName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
