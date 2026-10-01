// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingTrustContext as Client } from "../index.js";
import type { Rule, _RuleListResult, RulePatchPropertiesUnion } from "../../models/models.js";
import {
  errorResponseDeserializer,
  ruleSerializer,
  ruleDeserializer,
  _ruleListResultDeserializer,
  rulePatchPropertiesUnionSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RulesUpdateOptionalParams,
  RulesCreateOrUpdateOptionalParams,
  RulesListOptionalParams,
  RulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  resourceUri: string,
  ruleName: string,
  properties: RulePatchPropertiesUnion,
  options: RulesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.BillingTrust/assessments/default/rules/{ruleName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2026-03-17-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: rulePatchPropertiesUnionSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Rule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return ruleDeserializer(result.body);
}

/** Update a Rule. The PATCH body is discriminated by `kind` and must match the existing rule's kind. For `eduQualification` rules, only `supplementalDocuments` is patchable, and only when `evaluationState == actionRequired`. For `businessVerification` rules, the patchable fields are `supplementalDocuments` and `externalId`, and only when `evaluationState` is `pending` or `actionRequired`. All other field/state combinations are rejected with 400 InvalidParameterValue or 409 RuleNotActionable. */
export async function update(
  context: Client,
  resourceUri: string,
  ruleName: string,
  properties: RulePatchPropertiesUnion,
  options: RulesUpdateOptionalParams = { requestOptions: {} },
): Promise<Rule> {
  const result = await _updateSend(context, resourceUri, ruleName, properties, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  ruleName: string,
  resource: Rule,
  options: RulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.BillingTrust/assessments/default/rules/{ruleName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2026-03-17-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: ruleSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Rule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return ruleDeserializer(result.body);
}

/**
 * Create or update a Rule. **This operation is required for RPaaS tracked-resource
 * cache population and MUST remain in the public spec.** Rules are created by the
 * service when the parent assessment is created; they are not directly creatable
 * by end users. All customer PUT calls are rejected at runtime with
 * `OperationNotAllowed` via the RPaaS ResourceCreationValidate extension.
 * Use PATCH to modify rule fields that the customer is authorized to change.
 * Peer RPs with the same topology (extension singleton parent + proxy child)
 * declare an identical public PUT for the same RPaaS cache-population reason:
 * Microsoft.ScVmm/virtualMachineInstances/guestAgents,
 * Microsoft.ConnectedVMwarevSphere/virtualMachineInstances/guestAgents.
 */
export async function createOrUpdate(
  context: Client,
  resourceUri: string,
  ruleName: string,
  resource: Rule,
  options: RulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Rule> {
  const result = await _createOrUpdateSend(context, resourceUri, ruleName, resource, options);
  return _createOrUpdateDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceUri: string,
  options: RulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.BillingTrust/assessments/default/rules{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2026-03-17-preview",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_RuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _ruleListResultDeserializer(result.body);
}

/** List Rule resources by Assessment */
export function list(
  context: Client,
  resourceUri: string,
  options: RulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Rule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-17-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceUri: string,
  ruleName: string,
  options: RulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.BillingTrust/assessments/default/rules/{ruleName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      ruleName: ruleName,
      "api%2Dversion": context.apiVersion ?? "2026-03-17-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Rule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return ruleDeserializer(result.body);
}

/** Get a Rule */
export async function get(
  context: Client,
  resourceUri: string,
  ruleName: string,
  options: RulesGetOptionalParams = { requestOptions: {} },
): Promise<Rule> {
  const result = await _getSend(context, resourceUri, ruleName, options);
  return _getDeserialize(result);
}
