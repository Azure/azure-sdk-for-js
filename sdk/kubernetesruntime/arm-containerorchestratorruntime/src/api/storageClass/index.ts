// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  storageClassPropertiesSerializer,
  storageClassPropertiesUpdateSerializer,
  StorageClassResource,
  StorageClassResourceUpdate,
  _StorageClassResourceListResult,
} from "../../models/models.js";
import { KubernetesRuntimeContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  StorageClassGetOptionalParams,
  StorageClassCreateOrUpdateOptionalParams,
  StorageClassUpdateOptionalParams,
  StorageClassDeleteOptionalParams,
  StorageClassListOptionalParams,
} from "../../models/options.js";

export function _storageClassGetSend(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  options: StorageClassGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}",
      resourceUri,
      storageClassName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _storageClassGetDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageClassResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
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
          allowVolumeExpansion: result.body.properties?.["allowVolumeExpansion"],
          mountOptions: result.body.properties?.["mountOptions"],
          provisioner: result.body.properties?.["provisioner"],
          volumeBindingMode: result.body.properties?.["volumeBindingMode"],
          accessModes: result.body.properties?.["accessModes"],
          dataResilience: result.body.properties?.["dataResilience"],
          failoverSpeed: result.body.properties?.["failoverSpeed"],
          limitations: result.body.properties?.["limitations"],
          performance: result.body.properties?.["performance"],
          priority: result.body.properties?.["priority"],
          typeProperties: {
            type: result.body.properties?.typeProperties["type"],
          },
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a StorageClassResource */
export async function storageClassGet(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  options: StorageClassGetOptionalParams = { requestOptions: {} },
): Promise<StorageClassResource> {
  const result = await _storageClassGetSend(context, resourceUri, storageClassName, options);
  return _storageClassGetDeserialize(result);
}

export function _storageClassCreateOrUpdateSend(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  resource: StorageClassResource,
  options: StorageClassCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}",
      resourceUri,
      storageClassName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? resource.properties
          : storageClassPropertiesSerializer(resource.properties),
      },
    });
}

export async function _storageClassCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageClassResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
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
          allowVolumeExpansion: result.body.properties?.["allowVolumeExpansion"],
          mountOptions: result.body.properties?.["mountOptions"],
          provisioner: result.body.properties?.["provisioner"],
          volumeBindingMode: result.body.properties?.["volumeBindingMode"],
          accessModes: result.body.properties?.["accessModes"],
          dataResilience: result.body.properties?.["dataResilience"],
          failoverSpeed: result.body.properties?.["failoverSpeed"],
          limitations: result.body.properties?.["limitations"],
          performance: result.body.properties?.["performance"],
          priority: result.body.properties?.["priority"],
          typeProperties: {
            type: result.body.properties?.typeProperties["type"],
          },
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a StorageClassResource */
export function storageClassCreateOrUpdate(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  resource: StorageClassResource,
  options: StorageClassCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageClassResource>, StorageClassResource> {
  return getLongRunningPoller(context, _storageClassCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _storageClassCreateOrUpdateSend(context, resourceUri, storageClassName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<StorageClassResource>, StorageClassResource>;
}

export function _storageClassUpdateSend(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  properties: StorageClassResourceUpdate,
  options: StorageClassUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}",
      resourceUri,
      storageClassName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !properties.properties
          ? properties.properties
          : storageClassPropertiesUpdateSerializer(properties.properties),
      },
    });
}

export async function _storageClassUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageClassResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
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
          allowVolumeExpansion: result.body.properties?.["allowVolumeExpansion"],
          mountOptions: result.body.properties?.["mountOptions"],
          provisioner: result.body.properties?.["provisioner"],
          volumeBindingMode: result.body.properties?.["volumeBindingMode"],
          accessModes: result.body.properties?.["accessModes"],
          dataResilience: result.body.properties?.["dataResilience"],
          failoverSpeed: result.body.properties?.["failoverSpeed"],
          limitations: result.body.properties?.["limitations"],
          performance: result.body.properties?.["performance"],
          priority: result.body.properties?.["priority"],
          typeProperties: {
            type: result.body.properties?.typeProperties["type"],
          },
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Update a StorageClassResource */
export function storageClassUpdate(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  properties: StorageClassResourceUpdate,
  options: StorageClassUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageClassResource>, StorageClassResource> {
  return getLongRunningPoller(context, _storageClassUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _storageClassUpdateSend(context, resourceUri, storageClassName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<StorageClassResource>, StorageClassResource>;
}

export function _storageClassDeleteSend(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  options: StorageClassDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}",
      resourceUri,
      storageClassName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _storageClassDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a StorageClassResource */
export function storageClassDelete(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  options: StorageClassDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _storageClassDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _storageClassDeleteSend(context, resourceUri, storageClassName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _storageClassListSend(
  context: Client,
  resourceUri: string,
  options: StorageClassListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses", resourceUri)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _storageClassListDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageClassResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        name: p["name"],
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
              allowVolumeExpansion: p.properties?.["allowVolumeExpansion"],
              mountOptions: p.properties?.["mountOptions"],
              provisioner: p.properties?.["provisioner"],
              volumeBindingMode: p.properties?.["volumeBindingMode"],
              accessModes: p.properties?.["accessModes"],
              dataResilience: p.properties?.["dataResilience"],
              failoverSpeed: p.properties?.["failoverSpeed"],
              limitations: p.properties?.["limitations"],
              performance: p.properties?.["performance"],
              priority: p.properties?.["priority"],
              typeProperties: { type: p.properties?.typeProperties["type"] },
              provisioningState: p.properties?.["provisioningState"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List StorageClassResource resources by parent */
export function storageClassList(
  context: Client,
  resourceUri: string,
  options: StorageClassListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageClassResource> {
  return buildPagedAsyncIterator(
    context,
    () => _storageClassListSend(context, resourceUri, options),
    _storageClassListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
