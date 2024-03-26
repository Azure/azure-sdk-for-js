// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Deployment, DeploymentListResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  AzureSphereContext as Client,
  DeploymentsCreateOrUpdate200Response,
  DeploymentsCreateOrUpdate201Response,
  DeploymentsCreateOrUpdateDefaultResponse,
  DeploymentsCreateOrUpdateLogicalResponse,
  DeploymentsDeleteLogicalResponse,
  DeploymentsDeleteOperation200Response,
  DeploymentsDeleteOperation202Response,
  DeploymentsDeleteOperation204Response,
  DeploymentsDeleteOperationDefaultResponse,
  DeploymentsGet200Response,
  DeploymentsGetDefaultResponse,
  DeploymentsListByDeviceGroup200Response,
  DeploymentsListByDeviceGroupDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  DeploymentsGetOptions,
  DeploymentsListByDeviceGroupOptions,
  DeploymentsCreateOrUpdateOptions,
  DeploymentsDeleteOperationOptions,
} from "../../models/options.js";

export function _deploymentsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  options: DeploymentsGetOptions = { requestOptions: {} },
): StreamableMethod<DeploymentsGet200Response | DeploymentsGetDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments/{deploymentName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
      deploymentName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _deploymentsGetDeserialize(
  result: DeploymentsGet200Response | DeploymentsGetDefaultResponse,
): Promise<Deployment> {
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
          deploymentId: result.body.properties?.["deploymentId"],
          deployedImages:
            result.body.properties?.["deployedImages"] === undefined
              ? result.body.properties?.["deployedImages"]
              : result.body.properties?.["deployedImages"].map((p) => ({
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
                        lastModifiedByType:
                          p.systemData?.["lastModifiedByType"],
                        lastModifiedAt:
                          p.systemData?.["lastModifiedAt"] !== undefined
                            ? new Date(p.systemData?.["lastModifiedAt"])
                            : undefined,
                      },
                  properties: !p.properties
                    ? undefined
                    : {
                        image: p.properties?.["image"],
                        imageId: p.properties?.["imageId"],
                        imageName: p.properties?.["imageName"],
                        regionalDataBoundary:
                          p.properties?.["regionalDataBoundary"],
                        uri: p.properties?.["uri"],
                        description: p.properties?.["description"],
                        componentId: p.properties?.["componentId"],
                        imageType: p.properties?.["imageType"],
                        provisioningState: p.properties?.["provisioningState"],
                      },
                })),
          deploymentDateUtc:
            result.body.properties?.["deploymentDateUtc"] !== undefined
              ? new Date(result.body.properties?.["deploymentDateUtc"])
              : undefined,
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export async function deploymentsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  options: DeploymentsGetOptions = { requestOptions: {} },
): Promise<Deployment> {
  const result = await _deploymentsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    productName,
    deviceGroupName,
    deploymentName,
    options,
  );
  return _deploymentsGetDeserialize(result);
}

export function _deploymentsListByDeviceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeploymentsListByDeviceGroupOptions = { requestOptions: {} },
): StreamableMethod<
  | DeploymentsListByDeviceGroup200Response
  | DeploymentsListByDeviceGroupDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        $filter: options?.filter,
        $top: options?.top,
        $skip: options?.skip,
        $maxpagesize: options?.maxpagesize,
      },
    });
}

export async function _deploymentsListByDeviceGroupDeserialize(
  result:
    | DeploymentsListByDeviceGroup200Response
    | DeploymentsListByDeviceGroupDefaultResponse,
): Promise<DeploymentListResult> {
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
            deploymentId: p.properties?.["deploymentId"],
            deployedImages:
              p.properties?.["deployedImages"] === undefined
                ? p.properties?.["deployedImages"]
                : p.properties?.["deployedImages"].map((p) => ({
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
                          lastModifiedByType:
                            p.systemData?.["lastModifiedByType"],
                          lastModifiedAt:
                            p.systemData?.["lastModifiedAt"] !== undefined
                              ? new Date(p.systemData?.["lastModifiedAt"])
                              : undefined,
                        },
                    properties: !p.properties
                      ? undefined
                      : {
                          image: p.properties?.["image"],
                          imageId: p.properties?.["imageId"],
                          imageName: p.properties?.["imageName"],
                          regionalDataBoundary:
                            p.properties?.["regionalDataBoundary"],
                          uri: p.properties?.["uri"],
                          description: p.properties?.["description"],
                          componentId: p.properties?.["componentId"],
                          imageType: p.properties?.["imageType"],
                          provisioningState:
                            p.properties?.["provisioningState"],
                        },
                  })),
            deploymentDateUtc:
              p.properties?.["deploymentDateUtc"] !== undefined
                ? new Date(p.properties?.["deploymentDateUtc"])
                : undefined,
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Deployment resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function deploymentsListByDeviceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  options: DeploymentsListByDeviceGroupOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<Deployment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _deploymentsListByDeviceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        options,
      ),
    _deploymentsListByDeviceGroupDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deploymentsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  resource: Deployment,
  options: DeploymentsCreateOrUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | DeploymentsCreateOrUpdate200Response
  | DeploymentsCreateOrUpdate201Response
  | DeploymentsCreateOrUpdateDefaultResponse
  | DeploymentsCreateOrUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments/{deploymentName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
      deploymentName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? undefined
          : {
              deploymentId: resource.properties?.["deploymentId"],
              deployedImages:
                resource.properties?.["deployedImages"] === undefined
                  ? resource.properties?.["deployedImages"]
                  : resource.properties?.["deployedImages"].map((p) => ({
                      properties: !p.properties
                        ? undefined
                        : {
                            image: p.properties?.["image"],
                            imageId: p.properties?.["imageId"],
                            regionalDataBoundary:
                              p.properties?.["regionalDataBoundary"],
                          },
                    })),
            },
      },
    });
}

export async function _deploymentsCreateOrUpdateDeserialize(
  result:
    | DeploymentsCreateOrUpdate200Response
    | DeploymentsCreateOrUpdate201Response
    | DeploymentsCreateOrUpdateDefaultResponse
    | DeploymentsCreateOrUpdateLogicalResponse,
): Promise<Deployment> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DeploymentsCreateOrUpdateLogicalResponse;
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
          deploymentId: result.body.properties?.["deploymentId"],
          deployedImages:
            result.body.properties?.["deployedImages"] === undefined
              ? result.body.properties?.["deployedImages"]
              : result.body.properties?.["deployedImages"].map((p) => ({
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
                        lastModifiedByType:
                          p.systemData?.["lastModifiedByType"],
                        lastModifiedAt:
                          p.systemData?.["lastModifiedAt"] !== undefined
                            ? new Date(p.systemData?.["lastModifiedAt"])
                            : undefined,
                      },
                  properties: !p.properties
                    ? undefined
                    : {
                        image: p.properties?.["image"],
                        imageId: p.properties?.["imageId"],
                        imageName: p.properties?.["imageName"],
                        regionalDataBoundary:
                          p.properties?.["regionalDataBoundary"],
                        uri: p.properties?.["uri"],
                        description: p.properties?.["description"],
                        componentId: p.properties?.["componentId"],
                        imageType: p.properties?.["imageType"],
                        provisioningState: p.properties?.["provisioningState"],
                      },
                })),
          deploymentDateUtc:
            result.body.properties?.["deploymentDateUtc"] !== undefined
              ? new Date(result.body.properties?.["deploymentDateUtc"])
              : undefined,
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function deploymentsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  resource: Deployment,
  options: DeploymentsCreateOrUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<Deployment>, Deployment> {
  return getLongRunningPoller(context, _deploymentsCreateOrUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deploymentsCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deploymentName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<Deployment>, Deployment>;
}

export function _deploymentsDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  options: DeploymentsDeleteOperationOptions = { requestOptions: {} },
): StreamableMethod<
  | DeploymentsDeleteOperation200Response
  | DeploymentsDeleteOperation202Response
  | DeploymentsDeleteOperation204Response
  | DeploymentsDeleteOperationDefaultResponse
  | DeploymentsDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/products/{productName}/deviceGroups/{deviceGroupName}/deployments/{deploymentName}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      productName,
      deviceGroupName,
      deploymentName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deploymentsDeleteOperationDeserialize(
  result:
    | DeploymentsDeleteOperation200Response
    | DeploymentsDeleteOperation202Response
    | DeploymentsDeleteOperation204Response
    | DeploymentsDeleteOperationDefaultResponse
    | DeploymentsDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DeploymentsDeleteLogicalResponse;
  return;
}

/** Delete a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. */
export function deploymentsDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  productName: string,
  deviceGroupName: string,
  deploymentName: string,
  options: DeploymentsDeleteOperationOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deploymentsDeleteOperationDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deploymentsDeleteOperationSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        productName,
        deviceGroupName,
        deploymentName,
        options,
      ),
  }) as PollerLike<OperationState<void>, void>;
}
