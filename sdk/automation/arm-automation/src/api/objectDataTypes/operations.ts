// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type { _TypeFieldListResult, TypeField } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _typeFieldListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ObjectDataTypesListFieldsByModuleAndTypeOptionalParams,
  ObjectDataTypesListFieldsByTypeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listFieldsByModuleAndTypeSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  moduleName: string,
  typeName: string,
  options: ObjectDataTypesListFieldsByModuleAndTypeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}/objectDataTypes/{typeName}/fields{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      moduleName: moduleName,
      typeName: typeName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

export async function _listFieldsByModuleAndTypeDeserialize(
  result: PathUncheckedResponse,
): Promise<_TypeFieldListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _typeFieldListResultDeserializer(result.body);
}

/** Retrieve a list of fields of a given type identified by module name. */
export function listFieldsByModuleAndType(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  moduleName: string,
  typeName: string,
  options: ObjectDataTypesListFieldsByModuleAndTypeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TypeField> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listFieldsByModuleAndTypeSend(
        context,
        resourceGroupName,
        automationAccountName,
        moduleName,
        typeName,
        options,
      ),
    _listFieldsByModuleAndTypeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _listFieldsByTypeSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  typeName: string,
  options: ObjectDataTypesListFieldsByTypeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/objectDataTypes/{typeName}/fields{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      typeName: typeName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

export async function _listFieldsByTypeDeserialize(
  result: PathUncheckedResponse,
): Promise<_TypeFieldListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _typeFieldListResultDeserializer(result.body);
}

/** Retrieve a list of fields of a given type across all accessible modules. */
export function listFieldsByType(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  typeName: string,
  options: ObjectDataTypesListFieldsByTypeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TypeField> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listFieldsByTypeSend(context, resourceGroupName, automationAccountName, typeName, options),
    _listFieldsByTypeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}
