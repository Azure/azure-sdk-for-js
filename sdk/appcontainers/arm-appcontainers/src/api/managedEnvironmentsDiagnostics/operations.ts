// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  ManagedEnvironment,
  managedEnvironmentDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ManagedEnvironmentsDiagnosticsGetRootOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getRootSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsDiagnosticsGetRootOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/detectorProperties/rootApi/{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getRootDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedEnvironment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return managedEnvironmentDeserializer(result.body);
}

/** Get the properties of a Managed Environment used to host container apps. */
export async function getRoot(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsDiagnosticsGetRootOptionalParams = { requestOptions: {} },
): Promise<ManagedEnvironment> {
  const result = await _getRootSend(context, resourceGroupName, environmentName, options);
  return _getRootDeserialize(result);
}
