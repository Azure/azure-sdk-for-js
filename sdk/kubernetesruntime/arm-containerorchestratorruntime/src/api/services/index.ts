// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  servicePropertiesSerializer,
  ServiceResource,
  _ServiceResourceListResult,
} from "../../models/models.js";
import { KubernetesRuntimeContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  ServicesGetOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesListOptionalParams,
} from "../../models/options.js";

export function _servicesGetSend(
  context: Client,
  resourceUri: string,
  serviceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/services/{serviceName}",
      resourceUri,
      serviceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _servicesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceResource> {
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
          rpObjectId: result.body.properties?.["rpObjectId"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a ServiceResource */
export async function servicesGet(
  context: Client,
  resourceUri: string,
  serviceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): Promise<ServiceResource> {
  const result = await _servicesGetSend(context, resourceUri, serviceName, options);
  return _servicesGetDeserialize(result);
}

export function _servicesCreateOrUpdateSend(
  context: Client,
  resourceUri: string,
  serviceName: string,
  resource: ServiceResource,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/services/{serviceName}",
      resourceUri,
      serviceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: !resource.properties
          ? resource.properties
          : servicePropertiesSerializer(resource.properties),
      },
    });
}

export async function _servicesCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceResource> {
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
          rpObjectId: result.body.properties?.["rpObjectId"],
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Create a ServiceResource */
export async function servicesCreateOrUpdate(
  context: Client,
  resourceUri: string,
  serviceName: string,
  resource: ServiceResource,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ServiceResource> {
  const result = await _servicesCreateOrUpdateSend(
    context,
    resourceUri,
    serviceName,
    resource,
    options,
  );
  return _servicesCreateOrUpdateDeserialize(result);
}

export function _servicesDeleteSend(
  context: Client,
  resourceUri: string,
  serviceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.KubernetesRuntime/services/{serviceName}",
      resourceUri,
      serviceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _servicesDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a ServiceResource */
export async function servicesDelete(
  context: Client,
  resourceUri: string,
  serviceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _servicesDeleteSend(context, resourceUri, serviceName, options);
  return _servicesDeleteDeserialize(result);
}

export function _servicesListSend(
  context: Client,
  resourceUri: string,
  options: ServicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{resourceUri}/providers/Microsoft.KubernetesRuntime/services", resourceUri)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _servicesListDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServiceResourceListResult> {
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
              rpObjectId: p.properties?.["rpObjectId"],
              provisioningState: p.properties?.["provisioningState"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List ServiceResource resources by parent */
export function servicesList(
  context: Client,
  resourceUri: string,
  options: ServicesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _servicesListSend(context, resourceUri, options),
    _servicesListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
