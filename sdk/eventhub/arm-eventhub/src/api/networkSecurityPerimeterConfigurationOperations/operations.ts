// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubManagementContext as Client } from "../index.js";
import type { NetworkSecurityPerimeterConfigurationList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  networkSecurityPerimeterConfigurationListDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { NetworkSecurityPerimeterConfigurationOperationsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NetworkSecurityPerimeterConfigurationOperationsListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterConfigurationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return networkSecurityPerimeterConfigurationListDeserializer(result.body);
}

/** Gets list of current NetworkSecurityPerimeterConfiguration for Namespace */
export async function list(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: NetworkSecurityPerimeterConfigurationOperationsListOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkSecurityPerimeterConfigurationList> {
  const result = await _listSend(context, resourceGroupName, namespaceName, options);
  return _listDeserialize(result);
}
