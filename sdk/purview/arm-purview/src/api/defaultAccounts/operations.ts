// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext as Client } from "../index.js";
import type { DefaultAccountPayload, ScopeType } from "../../models/models.js";
import {
  errorResponseModelDeserializer,
  defaultAccountPayloadSerializer,
  defaultAccountPayloadDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DefaultAccountsSetOptionalParams,
  DefaultAccountsRemoveOptionalParams,
  DefaultAccountsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _setSend(
  context: Client,
  defaultAccountPayload: DefaultAccountPayload,
  options: DefaultAccountsSetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Purview/setDefaultAccount{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: defaultAccountPayloadSerializer(defaultAccountPayload),
  });
}

export async function _setDeserialize(
  result: PathUncheckedResponse,
): Promise<DefaultAccountPayload> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return defaultAccountPayloadDeserializer(result.body);
}

/** Sets the default account for the scope. */
export async function set(
  context: Client,
  defaultAccountPayload: DefaultAccountPayload,
  options: DefaultAccountsSetOptionalParams = { requestOptions: {} },
): Promise<DefaultAccountPayload> {
  const result = await _setSend(context, defaultAccountPayload, options);
  return _setDeserialize(result);
}

export function _removeSend(
  context: Client,
  scopeTenantId: string,
  scopeType: ScopeType,
  options: DefaultAccountsRemoveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Purview/removeDefaultAccount{?api%2Dversion,scopeTenantId,scopeType,scope}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
      scopeTenantId: scopeTenantId,
      scopeType: scopeType,
      scope: options?.scope,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _removeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return;
}

/** Removes the default account from the scope. */
export async function remove(
  context: Client,
  scopeTenantId: string,
  scopeType: ScopeType,
  options: DefaultAccountsRemoveOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _removeSend(context, scopeTenantId, scopeType, options);
  return _removeDeserialize(result);
}

export function _getSend(
  context: Client,
  scopeTenantId: string,
  scopeType: ScopeType,
  options: DefaultAccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Purview/getDefaultAccount{?api%2Dversion,scopeTenantId,scopeType,scope}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
      scopeTenantId: scopeTenantId,
      scopeType: scopeType,
      scope: options?.scope,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DefaultAccountPayload> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return defaultAccountPayloadDeserializer(result.body);
}

/** Get the default account for the scope. */
export async function get(
  context: Client,
  scopeTenantId: string,
  scopeType: ScopeType,
  options: DefaultAccountsGetOptionalParams = { requestOptions: {} },
): Promise<DefaultAccountPayload> {
  const result = await _getSend(context, scopeTenantId, scopeType, options);
  return _getDeserialize(result);
}
