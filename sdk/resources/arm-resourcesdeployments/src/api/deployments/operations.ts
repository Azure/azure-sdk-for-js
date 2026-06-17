// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentsContext as Client } from "../index.js";
import {
  DeploymentExtended,
  deploymentExtendedDeserializer,
  cloudErrorDeserializer,
  Deployment,
  deploymentSerializer,
  _DeploymentListResult,
  _deploymentListResultDeserializer,
  DeploymentValidateResult,
  deploymentValidateResultDeserializer,
  DeploymentExportResult,
  deploymentExportResultDeserializer,
  ScopedDeployment,
  scopedDeploymentSerializer,
  ScopedDeploymentWhatIf,
  scopedDeploymentWhatIfSerializer,
  WhatIfOperationResult,
  whatIfOperationResultDeserializer,
  DeploymentWhatIf,
  deploymentWhatIfSerializer,
  TemplateHashResult,
  templateHashResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DeploymentsCalculateTemplateHashOptionalParams,
  DeploymentsExportTemplateOptionalParams,
  DeploymentsWhatIfOptionalParams,
  DeploymentsValidateOptionalParams,
  DeploymentsCancelOptionalParams,
  DeploymentsListByResourceGroupOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsCheckExistenceOptionalParams,
  DeploymentsGetOptionalParams,
  DeploymentsExportTemplateAtSubscriptionScopeOptionalParams,
  DeploymentsWhatIfAtSubscriptionScopeOptionalParams,
  DeploymentsValidateAtSubscriptionScopeOptionalParams,
  DeploymentsCancelAtSubscriptionScopeOptionalParams,
  DeploymentsListAtSubscriptionScopeOptionalParams,
  DeploymentsDeleteAtSubscriptionScopeOptionalParams,
  DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams,
  DeploymentsCheckExistenceAtSubscriptionScopeOptionalParams,
  DeploymentsGetAtSubscriptionScopeOptionalParams,
  DeploymentsExportTemplateAtManagementGroupScopeOptionalParams,
  DeploymentsWhatIfAtManagementGroupScopeOptionalParams,
  DeploymentsValidateAtManagementGroupScopeOptionalParams,
  DeploymentsCancelAtManagementGroupScopeOptionalParams,
  DeploymentsListAtManagementGroupScopeOptionalParams,
  DeploymentsDeleteAtManagementGroupScopeOptionalParams,
  DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams,
  DeploymentsCheckExistenceAtManagementGroupScopeOptionalParams,
  DeploymentsGetAtManagementGroupScopeOptionalParams,
  DeploymentsListAtTenantScopeOptionalParams,
  DeploymentsExportTemplateAtTenantScopeOptionalParams,
  DeploymentsWhatIfAtTenantScopeOptionalParams,
  DeploymentsValidateAtTenantScopeOptionalParams,
  DeploymentsCancelAtTenantScopeOptionalParams,
  DeploymentsDeleteAtTenantScopeOptionalParams,
  DeploymentsCreateOrUpdateAtTenantScopeOptionalParams,
  DeploymentsCheckExistenceAtTenantScopeOptionalParams,
  DeploymentsGetAtTenantScopeOptionalParams,
  DeploymentsExportTemplateAtScopeOptionalParams,
  DeploymentsValidateAtScopeOptionalParams,
  DeploymentsCancelAtScopeOptionalParams,
  DeploymentsListAtScopeOptionalParams,
  DeploymentsDeleteAtScopeOptionalParams,
  DeploymentsCreateOrUpdateAtScopeOptionalParams,
  DeploymentsCheckExistenceAtScopeOptionalParams,
  DeploymentsGetAtScopeOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _calculateTemplateHashSend(
  context: Client,
  template: any,
  options: DeploymentsCalculateTemplateHashOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/calculateTemplateHash{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: template,
    });
}

export async function _calculateTemplateHashDeserialize(
  result: PathUncheckedResponse,
): Promise<TemplateHashResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return templateHashResultDeserializer(result.body);
}

/** Calculate the hash of the given template. */
export async function calculateTemplateHash(
  context: Client,
  template: any,
  options: DeploymentsCalculateTemplateHashOptionalParams = { requestOptions: {} },
): Promise<TemplateHashResult> {
  const result = await _calculateTemplateHashSend(context, template, options);
  return _calculateTemplateHashDeserialize(result);
}

export function _exportTemplateSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentsExportTemplateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}/exportTemplate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _exportTemplateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExportResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExportResultDeserializer(result.body);
}

/** Exports the template used for specified deployment. */
export async function exportTemplate(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentsExportTemplateOptionalParams = { requestOptions: {} },
): Promise<DeploymentExportResult> {
  const result = await _exportTemplateSend(context, resourceGroupName, deploymentName, options);
  return _exportTemplateDeserialize(result);
}

export function _whatIfSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  parameters: DeploymentWhatIf,
  options: DeploymentsWhatIfOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}/whatIf{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deploymentWhatIfSerializer(parameters),
    });
}

export async function _whatIfDeserialize(
  result: PathUncheckedResponse,
): Promise<WhatIfOperationResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return whatIfOperationResultDeserializer(result.body);
}

/** Returns changes that will be made by the deployment if executed at the scope of the resource group. */
export function whatIf(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  parameters: DeploymentWhatIf,
  options: DeploymentsWhatIfOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult> {
  return getLongRunningPoller(context, _whatIfDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _whatIfSend(context, resourceGroupName, deploymentName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>;
}

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deploymentSerializer(parameters),
    });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentValidateResult> {
  const expectedStatuses = ["200", "202", "400", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentValidateResultDeserializer(result.body);
}

/** Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. */
export function validate(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsValidateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult> {
  return getLongRunningPoller(context, _validateDeserialize, ["200", "202", "400", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateSend(context, resourceGroupName, deploymentName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>;
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resource group partially deployed. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(context, resourceGroupName, deploymentName, options);
  return _cancelDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DeploymentsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentListResultDeserializer(result.body);
}

/** Get all the deployments for a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DeploymentsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentExtended> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. Deleting a template deployment does not affect the state of the resource group. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, deploymentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deploymentSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExtended> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExtendedDeserializer(result.body);
}

/** You can provide the template and parameters directly in the request or link to JSON files. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentExtended>, DeploymentExtended> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, deploymentName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<DeploymentExtended>, DeploymentExtended>;
}

export function _checkExistenceSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentsCheckExistenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Checks whether the deployment exists. */
export async function checkExistence(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentsCheckExistenceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceSend(context, resourceGroupName, deploymentName, options);
  return _checkExistenceDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DeploymentExtended> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExtendedDeserializer(result.body);
}

/** Gets a deployment. */
export async function get(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: DeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<DeploymentExtended> {
  const result = await _getSend(context, resourceGroupName, deploymentName, options);
  return _getDeserialize(result);
}

export function _exportTemplateAtSubscriptionScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentsExportTemplateAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/exportTemplate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _exportTemplateAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExportResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExportResultDeserializer(result.body);
}

/** Exports the template used for specified deployment. */
export async function exportTemplateAtSubscriptionScope(
  context: Client,
  deploymentName: string,
  options: DeploymentsExportTemplateAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentExportResult> {
  const result = await _exportTemplateAtSubscriptionScopeSend(context, deploymentName, options);
  return _exportTemplateAtSubscriptionScopeDeserialize(result);
}

export function _whatIfAtSubscriptionScopeSend(
  context: Client,
  deploymentName: string,
  parameters: DeploymentWhatIf,
  options: DeploymentsWhatIfAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/whatIf{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deploymentWhatIfSerializer(parameters),
    });
}

export async function _whatIfAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<WhatIfOperationResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return whatIfOperationResultDeserializer(result.body);
}

/** Returns changes that will be made by the deployment if executed at the scope of the subscription. */
export function whatIfAtSubscriptionScope(
  context: Client,
  deploymentName: string,
  parameters: DeploymentWhatIf,
  options: DeploymentsWhatIfAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult> {
  return getLongRunningPoller(
    context,
    _whatIfAtSubscriptionScopeDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _whatIfAtSubscriptionScopeSend(context, deploymentName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>;
}

export function _validateAtSubscriptionScopeSend(
  context: Client,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsValidateAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deploymentSerializer(parameters),
    });
}

export async function _validateAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentValidateResult> {
  const expectedStatuses = ["200", "202", "400", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentValidateResultDeserializer(result.body);
}

/** Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. */
export function validateAtSubscriptionScope(
  context: Client,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsValidateAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult> {
  return getLongRunningPoller(
    context,
    _validateAtSubscriptionScopeDeserialize,
    ["200", "202", "400", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateAtSubscriptionScopeSend(context, deploymentName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>;
}

export function _cancelAtSubscriptionScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentsCancelAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed. */
export async function cancelAtSubscriptionScope(
  context: Client,
  deploymentName: string,
  options: DeploymentsCancelAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelAtSubscriptionScopeSend(context, deploymentName, options);
  return _cancelAtSubscriptionScopeDeserialize(result);
}

export function _listAtSubscriptionScopeSend(
  context: Client,
  options: DeploymentsListAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentListResultDeserializer(result.body);
}

/** Get all the deployments for a subscription. */
export function listAtSubscriptionScope(
  context: Client,
  options: DeploymentsListAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentExtended> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtSubscriptionScopeSend(context, options),
    _listAtSubscriptionScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _deleteAtSubscriptionScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentsDeleteAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code. */
export function deleteAtSubscriptionScope(
  context: Client,
  deploymentName: string,
  options: DeploymentsDeleteAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteAtSubscriptionScopeDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () => _deleteAtSubscriptionScopeSend(context, deploymentName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateAtSubscriptionScopeSend(
  context: Client,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deploymentSerializer(parameters),
    });
}

export async function _createOrUpdateAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExtended> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExtendedDeserializer(result.body);
}

/** You can provide the template and parameters directly in the request or link to JSON files. */
export function createOrUpdateAtSubscriptionScope(
  context: Client,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsCreateOrUpdateAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentExtended>, DeploymentExtended> {
  return getLongRunningPoller(
    context,
    _createOrUpdateAtSubscriptionScopeDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateAtSubscriptionScopeSend(context, deploymentName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<DeploymentExtended>, DeploymentExtended>;
}

export function _checkExistenceAtSubscriptionScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentsCheckExistenceAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Checks whether the deployment exists. */
export async function checkExistenceAtSubscriptionScope(
  context: Client,
  deploymentName: string,
  options: DeploymentsCheckExistenceAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceAtSubscriptionScopeSend(context, deploymentName, options);
  return _checkExistenceAtSubscriptionScopeDeserialize(result);
}

export function _getAtSubscriptionScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentsGetAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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

export async function _getAtSubscriptionScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExtended> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExtendedDeserializer(result.body);
}

/** Gets a deployment. */
export async function getAtSubscriptionScope(
  context: Client,
  deploymentName: string,
  options: DeploymentsGetAtSubscriptionScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentExtended> {
  const result = await _getAtSubscriptionScopeSend(context, deploymentName, options);
  return _getAtSubscriptionScopeDeserialize(result);
}

export function _exportTemplateAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentsExportTemplateAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}/exportTemplate{?api%2Dversion}",
    {
      groupId: groupId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _exportTemplateAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExportResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExportResultDeserializer(result.body);
}

/** Exports the template used for specified deployment. */
export async function exportTemplateAtManagementGroupScope(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentsExportTemplateAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentExportResult> {
  const result = await _exportTemplateAtManagementGroupScopeSend(
    context,
    groupId,
    deploymentName,
    options,
  );
  return _exportTemplateAtManagementGroupScopeDeserialize(result);
}

export function _whatIfAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  deploymentName: string,
  parameters: ScopedDeploymentWhatIf,
  options: DeploymentsWhatIfAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}/whatIf{?api%2Dversion}",
    {
      groupId: groupId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: scopedDeploymentWhatIfSerializer(parameters),
    });
}

export async function _whatIfAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<WhatIfOperationResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return whatIfOperationResultDeserializer(result.body);
}

/** Returns changes that will be made by the deployment if executed at the scope of the management group. */
export function whatIfAtManagementGroupScope(
  context: Client,
  groupId: string,
  deploymentName: string,
  parameters: ScopedDeploymentWhatIf,
  options: DeploymentsWhatIfAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult> {
  return getLongRunningPoller(
    context,
    _whatIfAtManagementGroupScopeDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _whatIfAtManagementGroupScopeSend(context, groupId, deploymentName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>;
}

export function _validateAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  deploymentName: string,
  parameters: ScopedDeployment,
  options: DeploymentsValidateAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}/validate{?api%2Dversion}",
    {
      groupId: groupId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: scopedDeploymentSerializer(parameters),
    });
}

export async function _validateAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentValidateResult> {
  const expectedStatuses = ["200", "202", "400", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentValidateResultDeserializer(result.body);
}

/** Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. */
export function validateAtManagementGroupScope(
  context: Client,
  groupId: string,
  deploymentName: string,
  parameters: ScopedDeployment,
  options: DeploymentsValidateAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult> {
  return getLongRunningPoller(
    context,
    _validateAtManagementGroupScopeDeserialize,
    ["200", "202", "400", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateAtManagementGroupScopeSend(context, groupId, deploymentName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>;
}

export function _cancelAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentsCancelAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}/cancel{?api%2Dversion}",
    {
      groupId: groupId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed. */
export async function cancelAtManagementGroupScope(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentsCancelAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelAtManagementGroupScopeSend(context, groupId, deploymentName, options);
  return _cancelAtManagementGroupScopeDeserialize(result);
}

export function _listAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  options: DeploymentsListAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments{?api%2Dversion,%24filter,%24top}",
    {
      groupId: groupId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentListResultDeserializer(result.body);
}

/** Get all the deployments for a management group. */
export function listAtManagementGroupScope(
  context: Client,
  groupId: string,
  options: DeploymentsListAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentExtended> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtManagementGroupScopeSend(context, groupId, options),
    _listAtManagementGroupScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _deleteAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentsDeleteAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      groupId: groupId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code. */
export function deleteAtManagementGroupScope(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentsDeleteAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteAtManagementGroupScopeDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteAtManagementGroupScopeSend(context, groupId, deploymentName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  deploymentName: string,
  parameters: ScopedDeployment,
  options: DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      groupId: groupId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: scopedDeploymentSerializer(parameters),
    });
}

export async function _createOrUpdateAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExtended> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExtendedDeserializer(result.body);
}

/** You can provide the template and parameters directly in the request or link to JSON files. */
export function createOrUpdateAtManagementGroupScope(
  context: Client,
  groupId: string,
  deploymentName: string,
  parameters: ScopedDeployment,
  options: DeploymentsCreateOrUpdateAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentExtended>, DeploymentExtended> {
  return getLongRunningPoller(
    context,
    _createOrUpdateAtManagementGroupScopeDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateAtManagementGroupScopeSend(
          context,
          groupId,
          deploymentName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<DeploymentExtended>, DeploymentExtended>;
}

export function _checkExistenceAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentsCheckExistenceAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      groupId: groupId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Checks whether the deployment exists. */
export async function checkExistenceAtManagementGroupScope(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentsCheckExistenceAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceAtManagementGroupScopeSend(
    context,
    groupId,
    deploymentName,
    options,
  );
  return _checkExistenceAtManagementGroupScopeDeserialize(result);
}

export function _getAtManagementGroupScopeSend(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentsGetAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{groupId}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      groupId: groupId,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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

export async function _getAtManagementGroupScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExtended> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExtendedDeserializer(result.body);
}

/** Gets a deployment. */
export async function getAtManagementGroupScope(
  context: Client,
  groupId: string,
  deploymentName: string,
  options: DeploymentsGetAtManagementGroupScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentExtended> {
  const result = await _getAtManagementGroupScopeSend(context, groupId, deploymentName, options);
  return _getAtManagementGroupScopeDeserialize(result);
}

export function _listAtTenantScopeSend(
  context: Client,
  options: DeploymentsListAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments{?api%2Dversion,%24filter,%24top}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentListResultDeserializer(result.body);
}

/** Get all the deployments at the tenant scope. */
export function listAtTenantScope(
  context: Client,
  options: DeploymentsListAtTenantScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentExtended> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtTenantScopeSend(context, options),
    _listAtTenantScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _exportTemplateAtTenantScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentsExportTemplateAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments/{deploymentName}/exportTemplate{?api%2Dversion}",
    {
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _exportTemplateAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExportResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExportResultDeserializer(result.body);
}

/** Exports the template used for specified deployment. */
export async function exportTemplateAtTenantScope(
  context: Client,
  deploymentName: string,
  options: DeploymentsExportTemplateAtTenantScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentExportResult> {
  const result = await _exportTemplateAtTenantScopeSend(context, deploymentName, options);
  return _exportTemplateAtTenantScopeDeserialize(result);
}

export function _whatIfAtTenantScopeSend(
  context: Client,
  deploymentName: string,
  parameters: ScopedDeploymentWhatIf,
  options: DeploymentsWhatIfAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments/{deploymentName}/whatIf{?api%2Dversion}",
    {
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: scopedDeploymentWhatIfSerializer(parameters),
    });
}

export async function _whatIfAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<WhatIfOperationResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return whatIfOperationResultDeserializer(result.body);
}

/** Returns changes that will be made by the deployment if executed at the scope of the tenant group. */
export function whatIfAtTenantScope(
  context: Client,
  deploymentName: string,
  parameters: ScopedDeploymentWhatIf,
  options: DeploymentsWhatIfAtTenantScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult> {
  return getLongRunningPoller(context, _whatIfAtTenantScopeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _whatIfAtTenantScopeSend(context, deploymentName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<WhatIfOperationResult>, WhatIfOperationResult>;
}

export function _validateAtTenantScopeSend(
  context: Client,
  deploymentName: string,
  parameters: ScopedDeployment,
  options: DeploymentsValidateAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments/{deploymentName}/validate{?api%2Dversion}",
    {
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: scopedDeploymentSerializer(parameters),
    });
}

export async function _validateAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentValidateResult> {
  const expectedStatuses = ["200", "202", "400", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentValidateResultDeserializer(result.body);
}

/** Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. */
export function validateAtTenantScope(
  context: Client,
  deploymentName: string,
  parameters: ScopedDeployment,
  options: DeploymentsValidateAtTenantScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult> {
  return getLongRunningPoller(
    context,
    _validateAtTenantScopeDeserialize,
    ["200", "202", "400", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateAtTenantScopeSend(context, deploymentName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>;
}

export function _cancelAtTenantScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentsCancelAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments/{deploymentName}/cancel{?api%2Dversion}",
    {
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed. */
export async function cancelAtTenantScope(
  context: Client,
  deploymentName: string,
  options: DeploymentsCancelAtTenantScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelAtTenantScopeSend(context, deploymentName, options);
  return _cancelAtTenantScopeDeserialize(result);
}

export function _deleteAtTenantScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentsDeleteAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code. */
export function deleteAtTenantScope(
  context: Client,
  deploymentName: string,
  options: DeploymentsDeleteAtTenantScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteAtTenantScopeDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteAtTenantScopeSend(context, deploymentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateAtTenantScopeSend(
  context: Client,
  deploymentName: string,
  parameters: ScopedDeployment,
  options: DeploymentsCreateOrUpdateAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: scopedDeploymentSerializer(parameters),
    });
}

export async function _createOrUpdateAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExtended> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExtendedDeserializer(result.body);
}

/** You can provide the template and parameters directly in the request or link to JSON files. */
export function createOrUpdateAtTenantScope(
  context: Client,
  deploymentName: string,
  parameters: ScopedDeployment,
  options: DeploymentsCreateOrUpdateAtTenantScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentExtended>, DeploymentExtended> {
  return getLongRunningPoller(
    context,
    _createOrUpdateAtTenantScopeDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateAtTenantScopeSend(context, deploymentName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-04-01",
    },
  ) as PollerLike<OperationState<DeploymentExtended>, DeploymentExtended>;
}

export function _checkExistenceAtTenantScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentsCheckExistenceAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Checks whether the deployment exists. */
export async function checkExistenceAtTenantScope(
  context: Client,
  deploymentName: string,
  options: DeploymentsCheckExistenceAtTenantScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceAtTenantScopeSend(context, deploymentName, options);
  return _checkExistenceAtTenantScopeDeserialize(result);
}

export function _getAtTenantScopeSend(
  context: Client,
  deploymentName: string,
  options: DeploymentsGetAtTenantScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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

export async function _getAtTenantScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExtended> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExtendedDeserializer(result.body);
}

/** Gets a deployment. */
export async function getAtTenantScope(
  context: Client,
  deploymentName: string,
  options: DeploymentsGetAtTenantScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentExtended> {
  const result = await _getAtTenantScopeSend(context, deploymentName, options);
  return _getAtTenantScopeDeserialize(result);
}

export function _exportTemplateAtScopeSend(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentsExportTemplateAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/deployments/{deploymentName}/exportTemplate{?api%2Dversion}",
    {
      scope: scope,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _exportTemplateAtScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExportResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExportResultDeserializer(result.body);
}

/** Exports the template used for specified deployment. */
export async function exportTemplateAtScope(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentsExportTemplateAtScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentExportResult> {
  const result = await _exportTemplateAtScopeSend(context, scope, deploymentName, options);
  return _exportTemplateAtScopeDeserialize(result);
}

export function _validateAtScopeSend(
  context: Client,
  scope: string,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsValidateAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/deployments/{deploymentName}/validate{?api%2Dversion}",
    {
      scope: scope,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deploymentSerializer(parameters),
    });
}

export async function _validateAtScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentValidateResult> {
  const expectedStatuses = ["200", "202", "400", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentValidateResultDeserializer(result.body);
}

/** Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager.. */
export function validateAtScope(
  context: Client,
  scope: string,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsValidateAtScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult> {
  return getLongRunningPoller(context, _validateAtScopeDeserialize, ["200", "202", "400", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateAtScopeSend(context, scope, deploymentName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<DeploymentValidateResult>, DeploymentValidateResult>;
}

export function _cancelAtScopeSend(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentsCancelAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/deployments/{deploymentName}/cancel{?api%2Dversion}",
    {
      scope: scope,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelAtScopeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** You can cancel a deployment only if the provisioningState is Accepted or Running. After the deployment is canceled, the provisioningState is set to Canceled. Canceling a template deployment stops the currently running template deployment and leaves the resources partially deployed. */
export async function cancelAtScope(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentsCancelAtScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelAtScopeSend(context, scope, deploymentName, options);
  return _cancelAtScopeDeserialize(result);
}

export function _listAtScopeSend(
  context: Client,
  scope: string,
  options: DeploymentsListAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/deployments{?api%2Dversion,%24filter,%24top}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listAtScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deploymentListResultDeserializer(result.body);
}

/** Get all the deployments at the given scope. */
export function listAtScope(
  context: Client,
  scope: string,
  options: DeploymentsListAtScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentExtended> {
  return buildPagedAsyncIterator(
    context,
    () => _listAtScopeSend(context, scope, options),
    _listAtScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _deleteAtScopeSend(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentsDeleteAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      scope: scope,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtScopeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** A template deployment that is currently running cannot be deleted. Deleting a template deployment removes the associated deployment operations. This is an asynchronous operation that returns a status of 202 until the template deployment is successfully deleted. The Location response header contains the URI that is used to obtain the status of the process. While the process is running, a call to the URI in the Location header returns a status of 202. When the process finishes, the URI in the Location header returns a status of 204 on success. If the asynchronous request failed, the URI in the Location header returns an error-level status code. */
export function deleteAtScope(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentsDeleteAtScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteAtScopeDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteAtScopeSend(context, scope, deploymentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateAtScopeSend(
  context: Client,
  scope: string,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsCreateOrUpdateAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      scope: scope,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: deploymentSerializer(parameters),
    });
}

export async function _createOrUpdateAtScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExtended> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExtendedDeserializer(result.body);
}

/** You can provide the template and parameters directly in the request or link to JSON files. */
export function createOrUpdateAtScope(
  context: Client,
  scope: string,
  deploymentName: string,
  parameters: Deployment,
  options: DeploymentsCreateOrUpdateAtScopeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeploymentExtended>, DeploymentExtended> {
  return getLongRunningPoller(context, _createOrUpdateAtScopeDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateAtScopeSend(context, scope, deploymentName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<DeploymentExtended>, DeploymentExtended>;
}

export function _checkExistenceAtScopeSend(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentsCheckExistenceAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      scope: scope,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceAtScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Checks whether the deployment exists. */
export async function checkExistenceAtScope(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentsCheckExistenceAtScopeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceAtScopeSend(context, scope, deploymentName, options);
  return _checkExistenceAtScopeDeserialize(result);
}

export function _getAtScopeSend(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentsGetAtScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Resources/deployments/{deploymentName}{?api%2Dversion}",
    {
      scope: scope,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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

export async function _getAtScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentExtended> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return deploymentExtendedDeserializer(result.body);
}

/** Gets a deployment. */
export async function getAtScope(
  context: Client,
  scope: string,
  deploymentName: string,
  options: DeploymentsGetAtScopeOptionalParams = { requestOptions: {} },
): Promise<DeploymentExtended> {
  const result = await _getAtScopeSend(context, scope, deploymentName, options);
  return _getAtScopeDeserialize(result);
}
