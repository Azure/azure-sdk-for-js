// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  GovernanceAPIGovernanceRule,
  _GovernanceAPIGovernanceRuleList,
  GovernanceAPIOperationResult,
} from "../../models/governanceAPI/models.js";
import {
  governanceAPIGovernanceRuleSerializer,
  governanceAPIGovernanceRuleDeserializer,
  _governanceAPIGovernanceRuleListDeserializer,
  governanceAPIExecuteGovernanceRuleParamsSerializer,
  governanceAPIOperationResultDeserializer,
} from "../../models/governanceAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GovernanceRulesOperationResultsOptionalParams,
  GovernanceRulesExecuteOptionalParams,
  GovernanceRulesListOptionalParams,
  GovernanceRulesDeleteOptionalParams,
  GovernanceRulesCreateOrUpdateOptionalParams,
  GovernanceRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _operationResultsSend(
  context: Client,
  scope: string,
  ruleId: string,
  operationId: string,
  options: GovernanceRulesOperationResultsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/governanceRules/{ruleId}/operationResults/{operationId}{?api%2Dversion}",
    {
      scope: scope,
      ruleId: ruleId,
      operationId: operationId,
      "api%2Dversion": "2022-01-01-preview",
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

export async function _operationResultsDeserialize(
  result: PathUncheckedResponse,
): Promise<GovernanceAPIOperationResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return governanceAPIOperationResultDeserializer(result.body);
}

/** Get governance rules long run operation result for the requested scope by ruleId and operationId */
export async function operationResults(
  context: Client,
  scope: string,
  ruleId: string,
  operationId: string,
  options: GovernanceRulesOperationResultsOptionalParams = { requestOptions: {} },
): Promise<GovernanceAPIOperationResult> {
  const result = await _operationResultsSend(context, scope, ruleId, operationId, options);
  return _operationResultsDeserialize(result);
}

export function _executeSend(
  context: Client,
  scope: string,
  ruleId: string,
  options: GovernanceRulesExecuteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/governanceRules/{ruleId}/execute{?api%2Dversion}",
    {
      scope: scope,
      ruleId: ruleId,
      "api%2Dversion": "2022-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["executeGovernanceRuleParams"]
      ? options["executeGovernanceRuleParams"]
      : governanceAPIExecuteGovernanceRuleParamsSerializer(options["executeGovernanceRuleParams"]),
  });
}

export async function _executeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Execute a governance rule */
export function execute(
  context: Client,
  scope: string,
  ruleId: string,
  options: GovernanceRulesExecuteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _executeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _executeSend(context, scope, ruleId, options),
    resourceLocationConfig: "location",
    apiVersion: "2022-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  scope: string,
  options: GovernanceRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/governanceRules{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2022-01-01-preview",
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
): Promise<_GovernanceAPIGovernanceRuleList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _governanceAPIGovernanceRuleListDeserializer(result.body);
}

/** Get a list of all relevant governance rules over a scope */
export function list(
  context: Client,
  scope: string,
  options: GovernanceRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GovernanceAPIGovernanceRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-01-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  scope: string,
  ruleId: string,
  options: GovernanceRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/governanceRules/{ruleId}{?api%2Dversion}",
    {
      scope: scope,
      ruleId: ruleId,
      "api%2Dversion": "2022-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a Governance rule over a given scope */
export function $delete(
  context: Client,
  scope: string,
  ruleId: string,
  options: GovernanceRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, scope, ruleId, options),
    resourceLocationConfig: "location",
    apiVersion: "2022-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  ruleId: string,
  governanceRule: GovernanceAPIGovernanceRule,
  options: GovernanceRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/governanceRules/{ruleId}{?api%2Dversion}",
    {
      scope: scope,
      ruleId: ruleId,
      "api%2Dversion": "2022-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: governanceAPIGovernanceRuleSerializer(governanceRule),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GovernanceAPIGovernanceRule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return governanceAPIGovernanceRuleDeserializer(result.body);
}

/** Creates or updates a governance rule over a given scope */
export async function createOrUpdate(
  context: Client,
  scope: string,
  ruleId: string,
  governanceRule: GovernanceAPIGovernanceRule,
  options: GovernanceRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GovernanceAPIGovernanceRule> {
  const result = await _createOrUpdateSend(context, scope, ruleId, governanceRule, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  ruleId: string,
  options: GovernanceRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/governanceRules/{ruleId}{?api%2Dversion}",
    {
      scope: scope,
      ruleId: ruleId,
      "api%2Dversion": "2022-01-01-preview",
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
): Promise<GovernanceAPIGovernanceRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return governanceAPIGovernanceRuleDeserializer(result.body);
}

/** Get a specific governance rule for the requested scope by ruleId */
export async function get(
  context: Client,
  scope: string,
  ruleId: string,
  options: GovernanceRulesGetOptionalParams = { requestOptions: {} },
): Promise<GovernanceAPIGovernanceRule> {
  const result = await _getSend(context, scope, ruleId, options);
  return _getDeserialize(result);
}
