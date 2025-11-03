// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext as Client } from "../index.js";
import type { NetworkSecurityPerimeterConfiguration } from "../../models/models.js";
import {
  errorResponseDeserializer,
  networkSecurityPerimeterConfigurationDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _reconcileSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  resourceAssociationName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/networkSecurityPerimeterConfigurations/{resourceAssociationName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      resourceAssociationName: resourceAssociationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _reconcileDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Refreshes any information about the association. */
export async function reconcile(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  resourceAssociationName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _reconcileSend(
    context,
    resourceGroupName,
    namespaceName,
    resourceAssociationName,
    options,
  );
  return _reconcileDeserialize(result);
}

export function _getResourceAssociationNameSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  resourceAssociationName: string,
  options: NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/networkSecurityPerimeterConfigurations/{resourceAssociationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      resourceAssociationName: resourceAssociationName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getResourceAssociationNameDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Return a NetworkSecurityPerimeterConfigurations resourceAssociationName */
export async function getResourceAssociationName(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  resourceAssociationName: string,
  options: NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkSecurityPerimeterConfiguration> {
  const result = await _getResourceAssociationNameSend(
    context,
    resourceGroupName,
    namespaceName,
    resourceAssociationName,
    options,
  );
  return _getResourceAssociationNameDeserialize(result);
}
