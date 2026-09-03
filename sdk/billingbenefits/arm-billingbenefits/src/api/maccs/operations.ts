// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Macc,
  maccSerializer,
  maccDeserializer,
  MaccPatchRequest,
  maccPatchRequestSerializer,
  _MaccList,
  _maccListDeserializer,
  ChargeShortfallRequest,
  chargeShortfallRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MaccsChargeShortfallOptionalParams,
  MaccsWriteOffOptionalParams,
  MaccsCancelOptionalParams,
  MaccsListBySubscriptionOptionalParams,
  MaccsListByResourceGroupOptionalParams,
  MaccsDeleteOptionalParams,
  MaccsUpdateOptionalParams,
  MaccsCreateOptionalParams,
  MaccsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _chargeShortfallSend(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  body: ChargeShortfallRequest,
  options: MaccsChargeShortfallOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}/chargeShortfall{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maccName: maccName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: chargeShortfallRequestSerializer(body),
  });
}

export async function _chargeShortfallDeserialize(result: PathUncheckedResponse): Promise<Macc> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return maccDeserializer(result.body);
}

/** Operation to charge shortfall to a customer's account, ensuring they are charged for the outstanding amount of MACC credit. */
export function chargeShortfall(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  body: ChargeShortfallRequest,
  options: MaccsChargeShortfallOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Macc>, Macc> {
  return getLongRunningPoller(context, _chargeShortfallDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _chargeShortfallSend(context, resourceGroupName, maccName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<Macc>, Macc>;
}

export function _writeOffSend(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  options: MaccsWriteOffOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}/writeOff{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maccName: maccName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _writeOffDeserialize(result: PathUncheckedResponse): Promise<Macc> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return maccDeserializer(result.body);
}

/** Operation to waive a customer's pending MACC balance (Shortfall) from their account, ensuring they are not charged for the outstanding amount. */
export function writeOff(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  options: MaccsWriteOffOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Macc>, Macc> {
  return getLongRunningPoller(context, _writeOffDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _writeOffSend(context, resourceGroupName, maccName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<Macc>, Macc>;
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  options: MaccsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maccName: maccName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<Macc> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return maccDeserializer(result.body);
}

/** Represents an operation to cancel MACC contract. This operation does not indicate deletion of the MACC, but rather stops applying the benefit to the account. */
export function cancel(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  options: MaccsCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Macc>, Macc> {
  return getLongRunningPoller(context, _cancelDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _cancelSend(context, resourceGroupName, maccName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<Macc>, Macc>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: MaccsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.BillingBenefits/maccs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_MaccList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _maccListDeserializer(result.body);
}

/** List MACCs under a subscription from primary service tenant. */
export function listBySubscription(
  context: Client,
  options: MaccsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Macc> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: MaccsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_MaccList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _maccListDeserializer(result.body);
}

/** List MACCs under a resource group for primary service admin. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: MaccsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Macc> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  options: MaccsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maccName: maccName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete MACC. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  options: MaccsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, maccName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  body: MaccPatchRequest,
  options: MaccsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maccName: maccName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: maccPatchRequestSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Macc> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return maccDeserializer(result.body);
}

/** Update MACC. */
export function update(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  body: MaccPatchRequest,
  options: MaccsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Macc>, Macc> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, maccName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<Macc>, Macc>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  body: Macc,
  options: MaccsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maccName: maccName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: maccSerializer(body),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Macc> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return maccDeserializer(result.body);
}

/** Create MACC. */
export function create(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  body: Macc,
  options: MaccsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Macc>, Macc> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, resourceGroupName, maccName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<Macc>, Macc>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  options: MaccsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      maccName: maccName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Macc> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return maccDeserializer(result.body);
}

/** Get a MACC. */
export async function get(
  context: Client,
  resourceGroupName: string,
  maccName: string,
  options: MaccsGetOptionalParams = { requestOptions: {} },
): Promise<Macc> {
  const result = await _getSend(context, resourceGroupName, maccName, options);
  return _getDeserialize(result);
}
