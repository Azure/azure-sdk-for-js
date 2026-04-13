// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { RoleDefinition } from "../../models/microsoft/roleDefinitions/models.js";
import {
  roleDefinitionSerializer,
  roleDefinitionDeserializer,
} from "../../models/microsoft/roleDefinitions/models.js";
import type { _RoleDefinitionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _roleDefinitionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoleDefinitionsGetByIdOptionalParams,
  RoleDefinitionsListOptionalParams,
  RoleDefinitionsDeleteOptionalParams,
  RoleDefinitionsCreateOrUpdateOptionalParams,
  RoleDefinitionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getByIdSend(
  context: Client,
  roleId: string,
  options: RoleDefinitionsGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+roleId}?disambiguation_dummy{?api%2Dversion}",
    {
      roleId: roleId,
      "api%2Dversion": "2022-05-01-preview",
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

export async function _getByIdDeserialize(result: PathUncheckedResponse): Promise<RoleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return roleDefinitionDeserializer(result.body);
}

/** Gets a role definition by ID. */
export async function getById(
  context: Client,
  roleId: string,
  options: RoleDefinitionsGetByIdOptionalParams = { requestOptions: {} },
): Promise<RoleDefinition> {
  const result = await _getByIdSend(context, roleId, options);
  return _getByIdDeserialize(result);
}

export function _listSend(
  context: Client,
  scope: string,
  options: RoleDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleDefinitions{?api%2Dversion,%24filter}",
    {
      scope: scope,
      "api%2Dversion": "2022-05-01-preview",
      "%24filter": options?.filter,
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
): Promise<_RoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _roleDefinitionListResultDeserializer(result.body);
}

/** Get all role definitions that are applicable at scope and above. */
export function list(
  context: Client,
  scope: string,
  options: RoleDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-05-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  scope: string,
  roleDefinitionId: string,
  options: RoleDefinitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionId}{?api%2Dversion}",
    {
      scope: scope,
      roleDefinitionId: roleDefinitionId,
      "api%2Dversion": "2022-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<RoleDefinition> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return roleDefinitionDeserializer(result.body);
}

/** Deletes a role definition. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  scope: string,
  roleDefinitionId: string,
  options: RoleDefinitionsDeleteOptionalParams = { requestOptions: {} },
): Promise<RoleDefinition> {
  const result = await _$deleteSend(context, scope, roleDefinitionId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  roleDefinitionId: string,
  roleDefinition: RoleDefinition,
  options: RoleDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionId}{?api%2Dversion}",
    {
      scope: scope,
      roleDefinitionId: roleDefinitionId,
      "api%2Dversion": "2022-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: roleDefinitionSerializer(roleDefinition),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleDefinition> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return roleDefinitionDeserializer(result.body);
}

/** Creates or updates a role definition. */
export async function createOrUpdate(
  context: Client,
  scope: string,
  roleDefinitionId: string,
  roleDefinition: RoleDefinition,
  options: RoleDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<RoleDefinition> {
  const result = await _createOrUpdateSend(
    context,
    scope,
    roleDefinitionId,
    roleDefinition,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  roleDefinitionId: string,
  options: RoleDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionId}{?api%2Dversion}",
    {
      scope: scope,
      roleDefinitionId: roleDefinitionId,
      "api%2Dversion": "2022-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RoleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return roleDefinitionDeserializer(result.body);
}

/** Get role definition by ID (GUID). */
export async function get(
  context: Client,
  scope: string,
  roleDefinitionId: string,
  options: RoleDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<RoleDefinition> {
  const result = await _getSend(context, scope, roleDefinitionId, options);
  return _getDeserialize(result);
}
