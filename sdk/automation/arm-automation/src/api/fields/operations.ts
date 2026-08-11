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
import type { FieldsListByTypeOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByTypeSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  moduleName: string,
  typeName: string,
  options: FieldsListByTypeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}/types/{typeName}/fields{?api%2Dversion}",
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

export async function _listByTypeDeserialize(
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
export function listByType(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  moduleName: string,
  typeName: string,
  options: FieldsListByTypeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TypeField> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByTypeSend(
        context,
        resourceGroupName,
        automationAccountName,
        moduleName,
        typeName,
        options,
      ),
    _listByTypeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}
