// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NetworkAnalyticsContext } from "../../api/networkAnalyticsContext.js";
import {
  DataType,
  DataTypeUpdate,
  ContainerSaS,
  ContainerSasToken,
} from "../../models/models.js";
import {
  create,
  get,
  update,
  $delete,
  deleteData,
  generateStorageContainerSasToken,
  listByDataProduct,
} from "../../api/dataTypes/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DataTypesCreateOptionalParams,
  DataTypesGetOptionalParams,
  DataTypesUpdateOptionalParams,
  DataTypesDeleteOptionalParams,
  DataTypesDeleteDataOptionalParams,
  DataTypesGenerateStorageContainerSasTokenOptionalParams,
  DataTypesListByDataProductOptionalParams,
} from "../../models/options.js";

export interface DataTypesOperations {
  create: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    resource: DataType,
    options?: DataTypesCreateOptionalParams,
  ) => PollerLike<OperationState<DataType>, DataType>;
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    options?: DataTypesGetOptionalParams,
  ) => Promise<DataType>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    properties: DataTypeUpdate,
    options?: DataTypesUpdateOptionalParams,
  ) => PollerLike<OperationState<DataType>, DataType>;
  delete: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    options?: DataTypesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  deleteData: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    body: Record<string, any>,
    options?: DataTypesDeleteDataOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  generateStorageContainerSasToken: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    dataTypeName: string,
    body: ContainerSaS,
    options?: DataTypesGenerateStorageContainerSasTokenOptionalParams,
  ) => Promise<ContainerSasToken>;
  listByDataProduct: (
    subscriptionId: string,
    resourceGroupName: string,
    dataProductName: string,
    options?: DataTypesListByDataProductOptionalParams,
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
      options?: DataTypesCreateOptionalParams,
    ) =>
      create(
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
      options?: DataTypesGetOptionalParams,
    ) =>
      get(
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
      options?: DataTypesUpdateOptionalParams,
    ) =>
      update(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        properties,
        options,
      ),
    delete: (
      subscriptionId: string,
      resourceGroupName: string,
      dataProductName: string,
      dataTypeName: string,
      options?: DataTypesDeleteOptionalParams,
    ) =>
      $delete(
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
      options?: DataTypesDeleteDataOptionalParams,
    ) =>
      deleteData(
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
      options?: DataTypesGenerateStorageContainerSasTokenOptionalParams,
    ) =>
      generateStorageContainerSasToken(
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
      options?: DataTypesListByDataProductOptionalParams,
    ) =>
      listByDataProduct(
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
