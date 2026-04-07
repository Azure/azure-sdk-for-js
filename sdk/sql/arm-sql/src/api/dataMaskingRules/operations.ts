// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  DataMaskingPolicyName,
  _DataMaskingRuleListResult,
  DataMaskingRule,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _dataMaskingRuleListResultDeserializer,
  dataMaskingRuleSerializer,
  dataMaskingRuleDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataMaskingRulesCreateOrUpdateOptionalParams,
  DataMaskingRulesListByDatabaseOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  dataMaskingPolicyName: DataMaskingPolicyName,
  dataMaskingRuleName: string,
  parameters: DataMaskingRule,
  options: DataMaskingRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.Sql/servers/{serverName}/databases/{databaseName}/dataMaskingPolicies/{dataMaskingPolicyName}/rules/{dataMaskingRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      dataMaskingPolicyName: dataMaskingPolicyName,
      dataMaskingRuleName: dataMaskingRuleName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dataMaskingRuleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DataMaskingRule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return dataMaskingRuleDeserializer(result.body);
}

/** Creates or updates a database data masking rule. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  dataMaskingPolicyName: DataMaskingPolicyName,
  dataMaskingRuleName: string,
  parameters: DataMaskingRule,
  options: DataMaskingRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DataMaskingRule> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    dataMaskingPolicyName,
    dataMaskingRuleName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  dataMaskingPolicyName: DataMaskingPolicyName,
  options: DataMaskingRulesListByDatabaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/dataMaskingPolicies/{dataMaskingPolicyName}/rules{?api%2Dversion,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      dataMaskingPolicyName: dataMaskingPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24skip": options?.skip,
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataMaskingRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _dataMaskingRuleListResultDeserializer(result.body);
}

/** Gets a list of database data masking rules. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  dataMaskingPolicyName: DataMaskingPolicyName,
  options: DataMaskingRulesListByDatabaseOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataMaskingRule> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDatabaseSend(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        dataMaskingPolicyName,
        options,
      ),
    _listByDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}
