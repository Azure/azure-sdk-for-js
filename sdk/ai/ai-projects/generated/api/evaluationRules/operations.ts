// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  EvaluationRule,
  evaluationRuleSerializer,
  evaluationRuleDeserializer,
  _PagedEvaluationRule,
  _pagedEvaluationRuleDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  EvaluationRulesListOptionalParams,
  EvaluationRulesCreateOrUpdateOptionalParams,
  EvaluationRulesDeleteOptionalParams,
  EvaluationRulesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: EvaluationRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationrules{?api%2Dversion,actionType,agentName,enabled}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
      actionType: options?.actionType,
      agentName: options?.agentName,
      enabled: options?.enabled,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEvaluationRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEvaluationRuleDeserializer(result.body);
}

/** Returns the evaluation rules configured for the project, optionally filtered by action type, agent name, or enabled state. */
export function list(
  context: Client,
  options: EvaluationRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EvaluationRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _createOrUpdateSend(
  context: Client,
  id: string,
  evaluationRule: EvaluationRule,
  options: EvaluationRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationrules/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: evaluationRuleSerializer(evaluationRule),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EvaluationRule> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationRuleDeserializer(result.body);
}

/** Creates a new evaluation rule, or replaces the existing rule when the identifier matches. */
export async function createOrUpdate(
  context: Client,
  id: string,
  evaluationRule: EvaluationRule,
  options: EvaluationRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<EvaluationRule> {
  const result = await _createOrUpdateSend(context, id, evaluationRule, options);
  return _createOrUpdateDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  id: string,
  options: EvaluationRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationrules/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Removes the specified evaluation rule from the project. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  id: string,
  options: EvaluationRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, id, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  id: string,
  options: EvaluationRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/evaluationrules/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EvaluationRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return evaluationRuleDeserializer(result.body);
}

/** Retrieves the specified evaluation rule and its configuration. */
export async function get(
  context: Client,
  id: string,
  options: EvaluationRulesGetOptionalParams = { requestOptions: {} },
): Promise<EvaluationRule> {
  const result = await _getSend(context, id, options);
  return _getDeserialize(result);
}
