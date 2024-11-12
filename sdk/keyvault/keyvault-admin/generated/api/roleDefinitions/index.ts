// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  roleDefinitionPropertiesSerializer,
  RoleDefinition,
  RoleDefinitionCreateParameters,
  _RoleDefinitionListResult,
} from "../../models/models.js";
import { KeyVaultContext as Client } from "../index.js";
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
  RoleDefinitionsDeleteOptionalParams,
  RoleDefinitionsCreateOrUpdateOptionalParams,
  RoleDefinitionsGetOptionalParams,
  RoleDefinitionsListOptionalParams,
} from "../../models/options.js";

export function _$deleteSend(
  context: Client,
  scope: string,
  roleDefinitionName: string,
  options: RoleDefinitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionName}",
      scope,
      roleDefinitionName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    properties: !result.body.properties
      ? undefined
      : {
          roleName: result.body.properties?.["roleName"],
          description: result.body.properties?.["description"],
          roleType: result.body.properties?.["type"],
          permissions:
            result.body.properties?.["permissions"] === undefined
              ? result.body.properties?.["permissions"]
              : result.body.properties?.["permissions"].map((p: any) => {
                  return {
                    actions: p["actions"],
                    notActions: p["notActions"],
                    dataActions: p["dataActions"],
                    notDataActions: p["notDataActions"],
                  };
                }),
          assignableScopes: result.body.properties?.["assignableScopes"],
        },
  };
}

/** Deletes a custom role definition. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  scope: string,
  roleDefinitionName: string,
  options: RoleDefinitionsDeleteOptionalParams = { requestOptions: {} },
): Promise<RoleDefinition> {
  const result = await _$deleteSend(
    context,
    scope,
    roleDefinitionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  roleDefinitionName: string,
  parameters: RoleDefinitionCreateParameters,
  options: RoleDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionName}",
      scope,
      roleDefinitionName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: roleDefinitionPropertiesSerializer(parameters.properties),
      },
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleDefinition> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    properties: !result.body.properties
      ? undefined
      : {
          roleName: result.body.properties?.["roleName"],
          description: result.body.properties?.["description"],
          roleType: result.body.properties?.["type"],
          permissions:
            result.body.properties?.["permissions"] === undefined
              ? result.body.properties?.["permissions"]
              : result.body.properties?.["permissions"].map((p: any) => {
                  return {
                    actions: p["actions"],
                    notActions: p["notActions"],
                    dataActions: p["dataActions"],
                    notDataActions: p["notDataActions"],
                  };
                }),
          assignableScopes: result.body.properties?.["assignableScopes"],
        },
  };
}

/** Creates or updates a custom role definition. */
export async function createOrUpdate(
  context: Client,
  scope: string,
  roleDefinitionName: string,
  parameters: RoleDefinitionCreateParameters,
  options: RoleDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<RoleDefinition> {
  const result = await _createOrUpdateSend(
    context,
    scope,
    roleDefinitionName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  roleDefinitionName: string,
  options: RoleDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{scope}/providers/Microsoft.Authorization/roleDefinitions/{roleDefinitionName}",
      scope,
      roleDefinitionName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    properties: !result.body.properties
      ? undefined
      : {
          roleName: result.body.properties?.["roleName"],
          description: result.body.properties?.["description"],
          roleType: result.body.properties?.["type"],
          permissions:
            result.body.properties?.["permissions"] === undefined
              ? result.body.properties?.["permissions"]
              : result.body.properties?.["permissions"].map((p: any) => {
                  return {
                    actions: p["actions"],
                    notActions: p["notActions"],
                    dataActions: p["dataActions"],
                    notDataActions: p["notDataActions"],
                  };
                }),
          assignableScopes: result.body.properties?.["assignableScopes"],
        },
  };
}

/** Get the specified role definition. */
export async function get(
  context: Client,
  scope: string,
  roleDefinitionName: string,
  options: RoleDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<RoleDefinition> {
  const result = await _getSend(context, scope, roleDefinitionName, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  scope: string,
  options: RoleDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{scope}/providers/Microsoft.Authorization/roleDefinitions", scope)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { $filter: options?.$filter },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RoleDefinitionListResult> {
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
        properties: !p.properties
          ? undefined
          : {
              roleName: p.properties?.["roleName"],
              description: p.properties?.["description"],
              roleType: p.properties?.["type"],
              permissions:
                p.properties?.["permissions"] === undefined
                  ? p.properties?.["permissions"]
                  : p.properties?.["permissions"].map((p: any) => {
                      return {
                        actions: p["actions"],
                        notActions: p["notActions"],
                        dataActions: p["dataActions"],
                        notDataActions: p["notDataActions"],
                      };
                    }),
              assignableScopes: p.properties?.["assignableScopes"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
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
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
