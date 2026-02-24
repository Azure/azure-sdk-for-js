// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { ProtectionPolicyResource } from "../../models/models.js";
import {
  errorResponseDeserializer,
  protectionPolicyResourceSerializer,
  protectionPolicyResourceDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProtectionPoliciesDeleteOptionalParams,
  ProtectionPoliciesCreateOrUpdateOptionalParams,
  ProtectionPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  policyName: string,
  options: ProtectionPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupPolicies/{policyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

/**
 * Deletes specified backup policy from your Recovery Services Vault. This is an asynchronous operation. Status of the
 * operation can be fetched using GetProtectionPolicyOperationResult API.
 */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  policyName: string,
  options: ProtectionPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, vaultName, resourceGroupName, policyName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  policyName: string,
  parameters: ProtectionPolicyResource,
  options: ProtectionPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupPolicies/{policyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? { "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: protectionPolicyResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProtectionPolicyResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return protectionPolicyResourceDeserializer(result.body);
}

/**
 * Creates or modifies a backup policy. This is an asynchronous operation. Status of the operation can be fetched
 * using GetPolicyOperationResult API.
 */
export async function createOrUpdate(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  policyName: string,
  parameters: ProtectionPolicyResource,
  options: ProtectionPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ProtectionPolicyResource> {
  const result = await _createOrUpdateSend(
    context,
    vaultName,
    resourceGroupName,
    policyName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  policyName: string,
  options: ProtectionPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupPolicies/{policyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
): Promise<ProtectionPolicyResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return protectionPolicyResourceDeserializer(result.body);
}

/**
 * Provides the details of the backup policies associated to Recovery Services Vault. This is an asynchronous
 * operation. Status of the operation can be fetched using GetPolicyOperationResult API.
 */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  policyName: string,
  options: ProtectionPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ProtectionPolicyResource> {
  const result = await _getSend(context, vaultName, resourceGroupName, policyName, options);
  return _getDeserialize(result);
}
