// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DataType,
  DataTypeUpdate,
  ContainerSaS,
  ContainerSasToken,
  DataTypeListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  DataTypesCreate200Response,
  DataTypesCreate201Response,
  DataTypesCreateDefaultResponse,
  DataTypesCreateLogicalResponse,
  DataTypesDeleteData202Response,
  DataTypesDeleteData204Response,
  DataTypesDeleteDataDefaultResponse,
  DataTypesDeleteDataLogicalResponse,
  DataTypesDeleteLogicalResponse,
  DataTypesDeleteOperation202Response,
  DataTypesDeleteOperation204Response,
  DataTypesDeleteOperationDefaultResponse,
  DataTypesGenerateStorageContainerSasToken200Response,
  DataTypesGenerateStorageContainerSasTokenDefaultResponse,
  DataTypesGet200Response,
  DataTypesGetDefaultResponse,
  DataTypesListByDataProduct200Response,
  DataTypesListByDataProductDefaultResponse,
  DataTypesUpdate200Response,
  DataTypesUpdate202Response,
  DataTypesUpdateDefaultResponse,
  DataTypesUpdateLogicalResponse,
  isUnexpected,
  NetworkAnalyticsContext as Client,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  DataTypesCreateOptions,
  DataTypesGetOptions,
  DataTypesUpdateOptions,
  DataTypesDeleteOperationOptions,
  DataTypesDeleteDataOptions,
  DataTypesGenerateStorageContainerSasTokenOptions,
  DataTypesListByDataProductOptions,
} from "../../models/options.js";

export function _dataTypesCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  resource: DataType,
  options: DataTypesCreateOptions = { requestOptions: {} },
): StreamableMethod<
  | DataTypesCreate200Response
  | DataTypesCreate201Response
  | DataTypesCreateDefaultResponse
  | DataTypesCreateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}",
      subscriptionId,
      resourceGroupName,
      dataProductName,
      dataTypeName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? undefined
          : {
              state: resource.properties?.["state"],
              storageOutputRetention:
                resource.properties?.["storageOutputRetention"],
              databaseCacheRetention:
                resource.properties?.["databaseCacheRetention"],
              databaseRetention: resource.properties?.["databaseRetention"],
            },
      },
    });
}

export async function _dataTypesCreateDeserialize(
  result:
    | DataTypesCreate200Response
    | DataTypesCreate201Response
    | DataTypesCreateDefaultResponse
    | DataTypesCreateLogicalResponse,
): Promise<DataType> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DataTypesCreateLogicalResponse;
  return {
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          provisioningState: result.body.properties?.["provisioningState"],
          state: result.body.properties?.["state"],
          stateReason: result.body.properties?.["stateReason"],
          storageOutputRetention:
            result.body.properties?.["storageOutputRetention"],
          databaseCacheRetention:
            result.body.properties?.["databaseCacheRetention"],
          databaseRetention: result.body.properties?.["databaseRetention"],
          visualizationUrl: result.body.properties?.["visualizationUrl"],
        },
  };
}

/** Create data type resource. */
export function dataTypesCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  resource: DataType,
  options: DataTypesCreateOptions = { requestOptions: {} },
): PollerLike<OperationState<DataType>, DataType> {
  return getLongRunningPoller(context, _dataTypesCreateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _dataTypesCreateSend(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<DataType>, DataType>;
}

export function _dataTypesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  options: DataTypesGetOptions = { requestOptions: {} },
): StreamableMethod<DataTypesGet200Response | DataTypesGetDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}",
      subscriptionId,
      resourceGroupName,
      dataProductName,
      dataTypeName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataTypesGetDeserialize(
  result: DataTypesGet200Response | DataTypesGetDefaultResponse,
): Promise<DataType> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          provisioningState: result.body.properties?.["provisioningState"],
          state: result.body.properties?.["state"],
          stateReason: result.body.properties?.["stateReason"],
          storageOutputRetention:
            result.body.properties?.["storageOutputRetention"],
          databaseCacheRetention:
            result.body.properties?.["databaseCacheRetention"],
          databaseRetention: result.body.properties?.["databaseRetention"],
          visualizationUrl: result.body.properties?.["visualizationUrl"],
        },
  };
}

/** Retrieve data type resource. */
export async function dataTypesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  options: DataTypesGetOptions = { requestOptions: {} },
): Promise<DataType> {
  const result = await _dataTypesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    dataProductName,
    dataTypeName,
    options,
  );
  return _dataTypesGetDeserialize(result);
}

export function _dataTypesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  properties: DataTypeUpdate,
  options: DataTypesUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | DataTypesUpdate200Response
  | DataTypesUpdate202Response
  | DataTypesUpdateDefaultResponse
  | DataTypesUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}",
      subscriptionId,
      resourceGroupName,
      dataProductName,
      dataTypeName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !properties.properties
          ? undefined
          : {
              state: properties.properties?.["state"],
              storageOutputRetention:
                properties.properties?.["storageOutputRetention"],
              databaseCacheRetention:
                properties.properties?.["databaseCacheRetention"],
              databaseRetention: properties.properties?.["databaseRetention"],
            },
      },
    });
}

export async function _dataTypesUpdateDeserialize(
  result:
    | DataTypesUpdate200Response
    | DataTypesUpdate202Response
    | DataTypesUpdateDefaultResponse
    | DataTypesUpdateLogicalResponse,
): Promise<DataType> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return result.body as any;
}

/** Update data type resource. */
export function dataTypesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  properties: DataTypeUpdate,
  options: DataTypesUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<DataType>, DataType> {
  return getLongRunningPoller(context, _dataTypesUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _dataTypesUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        properties,
        options,
      ),
  }) as PollerLike<OperationState<DataType>, DataType>;
}

export function _dataTypesDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  options: DataTypesDeleteOperationOptions = { requestOptions: {} },
): StreamableMethod<
  | DataTypesDeleteOperation202Response
  | DataTypesDeleteOperation204Response
  | DataTypesDeleteOperationDefaultResponse
  | DataTypesDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}",
      subscriptionId,
      resourceGroupName,
      dataProductName,
      dataTypeName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataTypesDeleteOperationDeserialize(
  result:
    | DataTypesDeleteOperation202Response
    | DataTypesDeleteOperation204Response
    | DataTypesDeleteOperationDefaultResponse
    | DataTypesDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DataTypesDeleteLogicalResponse;
  return;
}

/** Delete data type resource. */
export function dataTypesDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  options: DataTypesDeleteOperationOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _dataTypesDeleteOperationDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _dataTypesDeleteOperationSend(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}

export function _dataTypesDeleteDataSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  body: Record<string, any>,
  options: DataTypesDeleteDataOptions = { requestOptions: {} },
): StreamableMethod<
  | DataTypesDeleteData202Response
  | DataTypesDeleteData204Response
  | DataTypesDeleteDataDefaultResponse
  | DataTypesDeleteDataLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}/deleteData",
      subscriptionId,
      resourceGroupName,
      dataProductName,
      dataTypeName,
    )
    .post({ ...operationOptionsToRequestParameters(options), body: body });
}

export async function _dataTypesDeleteDataDeserialize(
  result:
    | DataTypesDeleteData202Response
    | DataTypesDeleteData204Response
    | DataTypesDeleteDataDefaultResponse
    | DataTypesDeleteDataLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DataTypesDeleteDataLogicalResponse;
  return;
}

/** Delete data for data type. */
export function dataTypesDeleteData(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  body: Record<string, any>,
  options: DataTypesDeleteDataOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _dataTypesDeleteDataDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _dataTypesDeleteDataSend(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        dataTypeName,
        body,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}

export function _dataTypesGenerateStorageContainerSasTokenSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  body: ContainerSaS,
  options: DataTypesGenerateStorageContainerSasTokenOptions = {
    requestOptions: {},
  },
): StreamableMethod<
  | DataTypesGenerateStorageContainerSasToken200Response
  | DataTypesGenerateStorageContainerSasTokenDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}/generateStorageContainerSasToken",
      subscriptionId,
      resourceGroupName,
      dataProductName,
      dataTypeName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        startTimeStamp: body["startTimeStamp"].toISOString(),
        expiryTimeStamp: body["expiryTimeStamp"].toISOString(),
        ipAddress: body["ipAddress"],
      },
    });
}

export async function _dataTypesGenerateStorageContainerSasTokenDeserialize(
  result:
    | DataTypesGenerateStorageContainerSasToken200Response
    | DataTypesGenerateStorageContainerSasTokenDefaultResponse,
): Promise<ContainerSasToken> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    storageContainerSasToken: result.body["storageContainerSasToken"],
  };
}

/** Generate sas token for storage container. */
export async function dataTypesGenerateStorageContainerSasToken(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  dataTypeName: string,
  body: ContainerSaS,
  options: DataTypesGenerateStorageContainerSasTokenOptions = {
    requestOptions: {},
  },
): Promise<ContainerSasToken> {
  const result = await _dataTypesGenerateStorageContainerSasTokenSend(
    context,
    subscriptionId,
    resourceGroupName,
    dataProductName,
    dataTypeName,
    body,
    options,
  );
  return _dataTypesGenerateStorageContainerSasTokenDeserialize(result);
}

export function _dataTypesListByDataProductSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  options: DataTypesListByDataProductOptions = { requestOptions: {} },
): StreamableMethod<
  | DataTypesListByDataProduct200Response
  | DataTypesListByDataProductDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes",
      subscriptionId,
      resourceGroupName,
      dataProductName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataTypesListByDataProductDeserialize(
  result:
    | DataTypesListByDataProduct200Response
    | DataTypesListByDataProductDefaultResponse,
): Promise<DataTypeListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      type: p["type"],
      systemData: !p.systemData
        ? undefined
        : {
            createdBy: p.systemData?.["createdBy"],
            createdByType: p.systemData?.["createdByType"],
            createdAt:
              p.systemData?.["createdAt"] !== undefined
                ? new Date(p.systemData?.["createdAt"])
                : undefined,
            lastModifiedBy: p.systemData?.["lastModifiedBy"],
            lastModifiedByType: p.systemData?.["lastModifiedByType"],
            lastModifiedAt:
              p.systemData?.["lastModifiedAt"] !== undefined
                ? new Date(p.systemData?.["lastModifiedAt"])
                : undefined,
          },
      properties: !p.properties
        ? undefined
        : {
            provisioningState: p.properties?.["provisioningState"],
            state: p.properties?.["state"],
            stateReason: p.properties?.["stateReason"],
            storageOutputRetention: p.properties?.["storageOutputRetention"],
            databaseCacheRetention: p.properties?.["databaseCacheRetention"],
            databaseRetention: p.properties?.["databaseRetention"],
            visualizationUrl: p.properties?.["visualizationUrl"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List data type by parent resource. */
export function dataTypesListByDataProduct(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  options: DataTypesListByDataProductOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<DataType> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _dataTypesListByDataProductSend(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        options,
      ),
    _dataTypesListByDataProductDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
