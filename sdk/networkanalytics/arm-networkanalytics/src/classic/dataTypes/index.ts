// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NetworkAnalyticsContext } from "../../api/NetworkAnalyticsContext.js";
import {
  DataType,
  DataTypeUpdate,
  ContainerSaS,
  ContainerSasToken,
} from "../../models/models.js";
import {
  dataTypesCreate,
  dataTypesGet,
  dataTypesUpdate,
  dataTypesDeleteOperation,
  dataTypesDeleteData,
  dataTypesGenerateStorageContainerSasToken,
  dataTypesListByDataProduct,
} from "../../api/dataTypes/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DataTypesCreateOptions,
  DataTypesGetOptions,
  DataTypesUpdateOptions,
  DataTypesDeleteOperationOptions,
  DataTypesDeleteDataOptions,
  DataTypesGenerateStorageContainerSasTokenOptions,
  DataTypesListByDataProductOptions,
} from "../../models/options.js";

export interface DataTypesOperations {
  create: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    resource: DataType,
    options?: DataTypesCreateOptions,
  ) => PollerLike<OperationState<DataType>, DataType>;
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    options?: DataTypesGetOptions,
  ) => Promise<DataType>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    properties: DataTypeUpdate,
    options?: DataTypesUpdateOptions,
  ) => PollerLike<OperationState<DataType>, DataType>;
  deleteOperation: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    options?: DataTypesDeleteOperationOptions,
  ) => PollerLike<OperationState<void>, void>;
  deleteData: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    body: Record<string, any>,
    options?: DataTypesDeleteDataOptions,
  ) => PollerLike<OperationState<void>, void>;
  generateStorageContainerSasToken: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    body: ContainerSaS,
    options?: DataTypesGenerateStorageContainerSasTokenOptions,
  ) => Promise<ContainerSasToken>;
  listByDataProduct: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    options?: DataTypesListByDataProductOptions,
  ) => PagedAsyncIterableIterator<DataType>;
}

export function getDataTypes(context: NetworkAnalyticsContext) {
  return {
    create: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      dataTypeName: string,
      resource: DataType,
      options?: DataTypesCreateOptions,
    ) =>
      dataTypesCreate(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        resource,
        options,
      ),
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      dataTypeName: string,
      options?: DataTypesGetOptions,
    ) =>
      dataTypesGet(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        options,
      ),
    update: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      dataTypeName: string,
      properties: DataTypeUpdate,
      options?: DataTypesUpdateOptions,
    ) =>
      dataTypesUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        properties,
        options,
      ),
    deleteOperation: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      dataTypeName: string,
      options?: DataTypesDeleteOperationOptions,
    ) =>
      dataTypesDeleteOperation(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        options,
      ),
    deleteData: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      dataTypeName: string,
      body: Record<string, any>,
      options?: DataTypesDeleteDataOptions,
    ) =>
      dataTypesDeleteData(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        body,
        options,
      ),
    generateStorageContainerSasToken: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      dataTypeName: string,
      body: ContainerSaS,
      options?: DataTypesGenerateStorageContainerSasTokenOptions,
    ) =>
      dataTypesGenerateStorageContainerSasToken(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        body,
        options,
      ),
    listByDataProduct: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      options?: DataTypesListByDataProductOptions,
    ) =>
      dataTypesListByDataProduct(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        options,
      ),
  };
}

export function getDataTypesOperations(
  context: NetworkAnalyticsContext,
): DataTypesOperations {
  return {
    ...getDataTypes(context),
  };
}
