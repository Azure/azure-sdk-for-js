// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  PatchResourceTagsAndSku,
  CommitmentPlan,
  _CommitmentPlanListResult,
  CommitmentPlanAccountAssociation,
  _CommitmentPlanAccountAssociationListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  patchResourceTagsAndSkuSerializer,
  commitmentPlanSerializer,
  commitmentPlanDeserializer,
  _commitmentPlanListResultDeserializer,
  commitmentPlanAccountAssociationSerializer,
  commitmentPlanAccountAssociationDeserializer,
  _commitmentPlanAccountAssociationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CommitmentPlansListAssociationsOptionalParams,
  CommitmentPlansDeleteAssociationOptionalParams,
  CommitmentPlansCreateOrUpdateAssociationOptionalParams,
  CommitmentPlansGetAssociationOptionalParams,
  CommitmentPlansListPlansBySubscriptionOptionalParams,
  CommitmentPlansListPlansByResourceGroupOptionalParams,
  CommitmentPlansDeletePlanOptionalParams,
  CommitmentPlansUpdatePlanOptionalParams,
  CommitmentPlansCreateOrUpdatePlanOptionalParams,
  CommitmentPlansGetPlanOptionalParams,
  CommitmentPlansListOptionalParams,
  CommitmentPlansDeleteOptionalParams,
  CommitmentPlansCreateOrUpdateOptionalParams,
  CommitmentPlansGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAssociationsSend(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  options: CommitmentPlansListAssociationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}/accountAssociations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      commitmentPlanName: commitmentPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _listAssociationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_CommitmentPlanAccountAssociationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _commitmentPlanAccountAssociationListResultDeserializer(result.body);
}

/** Gets the associations of the Cognitive Services commitment plan. */
export function listAssociations(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  options: CommitmentPlansListAssociationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommitmentPlanAccountAssociation> {
  return buildPagedAsyncIterator(
    context,
    () => _listAssociationsSend(context, resourceGroupName, commitmentPlanName, options),
    _listAssociationsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _deleteAssociationSend(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  commitmentPlanAssociationName: string,
  options: CommitmentPlansDeleteAssociationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}/accountAssociations/{commitmentPlanAssociationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      commitmentPlanName: commitmentPlanName,
      commitmentPlanAssociationName: commitmentPlanAssociationName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAssociationDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the association of the Cognitive Services commitment plan. */
export function deleteAssociation(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  commitmentPlanAssociationName: string,
  options: CommitmentPlansDeleteAssociationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteAssociationDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteAssociationSend(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlanAssociationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateAssociationSend(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  commitmentPlanAssociationName: string,
  association: CommitmentPlanAccountAssociation,
  options: CommitmentPlansCreateOrUpdateAssociationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}/accountAssociations/{commitmentPlanAssociationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      commitmentPlanName: commitmentPlanName,
      commitmentPlanAssociationName: commitmentPlanAssociationName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: commitmentPlanAccountAssociationSerializer(association),
  });
}

export async function _createOrUpdateAssociationDeserialize(
  result: PathUncheckedResponse,
): Promise<CommitmentPlanAccountAssociation> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commitmentPlanAccountAssociationDeserializer(result.body);
}

/** Create or update the association of the Cognitive Services commitment plan. */
export function createOrUpdateAssociation(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  commitmentPlanAssociationName: string,
  association: CommitmentPlanAccountAssociation,
  options: CommitmentPlansCreateOrUpdateAssociationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommitmentPlanAccountAssociation>, CommitmentPlanAccountAssociation> {
  return getLongRunningPoller(
    context,
    _createOrUpdateAssociationDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateAssociationSend(
          context,
          resourceGroupName,
          commitmentPlanName,
          commitmentPlanAssociationName,
          association,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  ) as PollerLike<
    OperationState<CommitmentPlanAccountAssociation>,
    CommitmentPlanAccountAssociation
  >;
}

export function _getAssociationSend(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  commitmentPlanAssociationName: string,
  options: CommitmentPlansGetAssociationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}/accountAssociations/{commitmentPlanAssociationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      commitmentPlanName: commitmentPlanName,
      commitmentPlanAssociationName: commitmentPlanAssociationName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _getAssociationDeserialize(
  result: PathUncheckedResponse,
): Promise<CommitmentPlanAccountAssociation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commitmentPlanAccountAssociationDeserializer(result.body);
}

/** Gets the association of the Cognitive Services commitment plan. */
export async function getAssociation(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  commitmentPlanAssociationName: string,
  options: CommitmentPlansGetAssociationOptionalParams = { requestOptions: {} },
): Promise<CommitmentPlanAccountAssociation> {
  const result = await _getAssociationSend(
    context,
    resourceGroupName,
    commitmentPlanName,
    commitmentPlanAssociationName,
    options,
  );
  return _getAssociationDeserialize(result);
}

export function _listPlansBySubscriptionSend(
  context: Client,
  options: CommitmentPlansListPlansBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/commitmentPlans{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _listPlansBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_CommitmentPlanListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _commitmentPlanListResultDeserializer(result.body);
}

/** Returns all the resources of a particular type belonging to a subscription. */
export function listPlansBySubscription(
  context: Client,
  options: CommitmentPlansListPlansBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommitmentPlan> {
  return buildPagedAsyncIterator(
    context,
    () => _listPlansBySubscriptionSend(context, options),
    _listPlansBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _listPlansByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: CommitmentPlansListPlansByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _listPlansByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_CommitmentPlanListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _commitmentPlanListResultDeserializer(result.body);
}

/** Returns all the resources of a particular type belonging to a resource group */
export function listPlansByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: CommitmentPlansListPlansByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommitmentPlan> {
  return buildPagedAsyncIterator(
    context,
    () => _listPlansByResourceGroupSend(context, resourceGroupName, options),
    _listPlansByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _deletePlanSend(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  options: CommitmentPlansDeletePlanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      commitmentPlanName: commitmentPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deletePlanDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a Cognitive Services commitment plan from the resource group. */
export function deletePlan(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  options: CommitmentPlansDeletePlanOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deletePlanDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deletePlanSend(context, resourceGroupName, commitmentPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updatePlanSend(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  commitmentPlan: PatchResourceTagsAndSku,
  options: CommitmentPlansUpdatePlanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      commitmentPlanName: commitmentPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: patchResourceTagsAndSkuSerializer(commitmentPlan),
  });
}

export async function _updatePlanDeserialize(
  result: PathUncheckedResponse,
): Promise<CommitmentPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commitmentPlanDeserializer(result.body);
}

/** Create Cognitive Services commitment plan. */
export function updatePlan(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  commitmentPlan: PatchResourceTagsAndSku,
  options: CommitmentPlansUpdatePlanOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommitmentPlan>, CommitmentPlan> {
  return getLongRunningPoller(context, _updatePlanDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updatePlanSend(context, resourceGroupName, commitmentPlanName, commitmentPlan, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<CommitmentPlan>, CommitmentPlan>;
}

export function _createOrUpdatePlanSend(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  commitmentPlan: CommitmentPlan,
  options: CommitmentPlansCreateOrUpdatePlanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      commitmentPlanName: commitmentPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: commitmentPlanSerializer(commitmentPlan),
  });
}

export async function _createOrUpdatePlanDeserialize(
  result: PathUncheckedResponse,
): Promise<CommitmentPlan> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commitmentPlanDeserializer(result.body);
}

/** Create Cognitive Services commitment plan. */
export function createOrUpdatePlan(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  commitmentPlan: CommitmentPlan,
  options: CommitmentPlansCreateOrUpdatePlanOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommitmentPlan>, CommitmentPlan> {
  return getLongRunningPoller(context, _createOrUpdatePlanDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdatePlanSend(
        context,
        resourceGroupName,
        commitmentPlanName,
        commitmentPlan,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<CommitmentPlan>, CommitmentPlan>;
}

export function _getPlanSend(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  options: CommitmentPlansGetPlanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      commitmentPlanName: commitmentPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _getPlanDeserialize(result: PathUncheckedResponse): Promise<CommitmentPlan> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commitmentPlanDeserializer(result.body);
}

/** Returns a Cognitive Services commitment plan specified by the parameters. */
export async function getPlan(
  context: Client,
  resourceGroupName: string,
  commitmentPlanName: string,
  options: CommitmentPlansGetPlanOptionalParams = { requestOptions: {} },
): Promise<CommitmentPlan> {
  const result = await _getPlanSend(context, resourceGroupName, commitmentPlanName, options);
  return _getPlanDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CommitmentPlansListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/commitmentPlans{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
): Promise<_CommitmentPlanListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _commitmentPlanListResultDeserializer(result.body);
}

/** Gets the commitmentPlans associated with the Cognitive Services account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CommitmentPlansListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommitmentPlan> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  commitmentPlanName: string,
  options: CommitmentPlansDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/commitmentPlans/{commitmentPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      commitmentPlanName: commitmentPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified commitmentPlan associated with the Cognitive Services account. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  commitmentPlanName: string,
  options: CommitmentPlansDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, commitmentPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  commitmentPlanName: string,
  commitmentPlan: CommitmentPlan,
  options: CommitmentPlansCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/commitmentPlans/{commitmentPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      commitmentPlanName: commitmentPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: commitmentPlanSerializer(commitmentPlan),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommitmentPlan> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commitmentPlanDeserializer(result.body);
}

/** Update the state of specified commitmentPlans associated with the Cognitive Services account. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  commitmentPlanName: string,
  commitmentPlan: CommitmentPlan,
  options: CommitmentPlansCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<CommitmentPlan> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    commitmentPlanName,
    commitmentPlan,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  commitmentPlanName: string,
  options: CommitmentPlansGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/commitmentPlans/{commitmentPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      commitmentPlanName: commitmentPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CommitmentPlan> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commitmentPlanDeserializer(result.body);
}

/** Gets the specified commitmentPlans associated with the Cognitive Services account. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  commitmentPlanName: string,
  options: CommitmentPlansGetOptionalParams = { requestOptions: {} },
): Promise<CommitmentPlan> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    commitmentPlanName,
    options,
  );
  return _getDeserialize(result);
}
