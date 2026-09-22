// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedServiceIdentityContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  SystemAssignedIdentity,
  systemAssignedIdentityDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { SystemAssignedIdentitiesGetByScopeOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getByScopeSend(
  context: Client,
  scope: string,
  options: SystemAssignedIdentitiesGetByScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.ManagedIdentity/identities/default{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
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

export async function _getByScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<SystemAssignedIdentity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return systemAssignedIdentityDeserializer(result.body);
}

/** Gets the systemAssignedIdentity available under the specified RP scope. */
export async function getByScope(
  context: Client,
  scope: string,
  options: SystemAssignedIdentitiesGetByScopeOptionalParams = { requestOptions: {} },
): Promise<SystemAssignedIdentity> {
  const result = await _getByScopeSend(context, scope, options);
  return _getByScopeDeserialize(result);
}
