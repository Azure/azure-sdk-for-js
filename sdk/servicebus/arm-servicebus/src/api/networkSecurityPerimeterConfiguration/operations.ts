// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext as Client } from "../index.js";
import type {
  NetworkSecurityPerimeterConfiguration,
  _NetworkSecurityPerimeterConfigurationList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _networkSecurityPerimeterConfigurationListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { NetworkSecurityPerimeterConfigurationListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NetworkSecurityPerimeterConfigurationListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkSecurityPerimeterConfigurationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _networkSecurityPerimeterConfigurationListDeserializer(result.body);
}

/** Gets list of current NetworkSecurityPerimeterConfiguration for Namespace */
export function list(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NetworkSecurityPerimeterConfigurationListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, namespaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
