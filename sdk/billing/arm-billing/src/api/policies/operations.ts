// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  CustomerPolicy,
  ServiceDefinedResourceName,
  BillingProfilePolicy,
  BillingAccountPolicy,
  SubscriptionPolicy,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  customerPolicySerializer,
  customerPolicyDeserializer,
  billingProfilePolicySerializer,
  billingProfilePolicyDeserializer,
  billingAccountPolicySerializer,
  billingAccountPolicyDeserializer,
  subscriptionPolicyDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PoliciesGetBySubscriptionOptionalParams,
  PoliciesCreateOrUpdateByBillingAccountOptionalParams,
  PoliciesGetByBillingAccountOptionalParams,
  PoliciesCreateOrUpdateByBillingProfileOptionalParams,
  PoliciesGetByBillingProfileOptionalParams,
  PoliciesGetByCustomerOptionalParams,
  PoliciesCreateOrUpdateByCustomerOptionalParams,
  PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams,
  PoliciesGetByCustomerAtBillingAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getBySubscriptionSend(
  context: Client,
  options: PoliciesGetBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Billing/policies/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionPolicyDeserializer(result.body);
}

/** Lists the policies that are managed by the Billing Admin for the defined subscriptions. This is supported for Microsoft Online Services Program, Microsoft Customer Agreement and Microsoft Partner Agreement. */
export async function getBySubscription(
  context: Client,
  options: PoliciesGetBySubscriptionOptionalParams = { requestOptions: {} },
): Promise<SubscriptionPolicy> {
  const result = await _getBySubscriptionSend(context, options);
  return _getBySubscriptionDeserialize(result);
}

export function _createOrUpdateByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  parameters: BillingAccountPolicy,
  options: PoliciesCreateOrUpdateByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/policies/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: billingAccountPolicySerializer(parameters),
  });
}

export async function _createOrUpdateByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingAccountPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingAccountPolicyDeserializer(result.body);
}

/** Update the policies for a billing account of Enterprise Agreement type. */
export function createOrUpdateByBillingAccount(
  context: Client,
  billingAccountName: string,
  parameters: BillingAccountPolicy,
  options: PoliciesCreateOrUpdateByBillingAccountOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingAccountPolicy>, BillingAccountPolicy> {
  return getLongRunningPoller(
    context,
    _createOrUpdateByBillingAccountDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateByBillingAccountSend(context, billingAccountName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<BillingAccountPolicy>, BillingAccountPolicy>;
}

export function _getByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: PoliciesGetByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/policies/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingAccountPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingAccountPolicyDeserializer(result.body);
}

/** Get the policies for a billing account of Enterprise Agreement type. */
export async function getByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: PoliciesGetByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<BillingAccountPolicy> {
  const result = await _getByBillingAccountSend(context, billingAccountName, options);
  return _getByBillingAccountDeserialize(result);
}

export function _createOrUpdateByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  parameters: BillingProfilePolicy,
  options: PoliciesCreateOrUpdateByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/policies/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: billingProfilePolicySerializer(parameters),
  });
}

export async function _createOrUpdateByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingProfilePolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingProfilePolicyDeserializer(result.body);
}

/** Updates the policies for a billing profile. This operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export function createOrUpdateByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  parameters: BillingProfilePolicy,
  options: PoliciesCreateOrUpdateByBillingProfileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingProfilePolicy>, BillingProfilePolicy> {
  return getLongRunningPoller(
    context,
    _createOrUpdateByBillingProfileDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateByBillingProfileSend(
          context,
          billingAccountName,
          billingProfileName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<BillingProfilePolicy>, BillingProfilePolicy>;
}

export function _getByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: PoliciesGetByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/policies/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingProfilePolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingProfilePolicyDeserializer(result.body);
}

/** Lists the policies for a billing profile. This operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export async function getByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: PoliciesGetByBillingProfileOptionalParams = { requestOptions: {} },
): Promise<BillingProfilePolicy> {
  const result = await _getByBillingProfileSend(
    context,
    billingAccountName,
    billingProfileName,
    options,
  );
  return _getByBillingProfileDeserialize(result);
}

export function _getByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  policyName: ServiceDefinedResourceName,
  options: PoliciesGetByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/policies/{policyName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getByCustomerDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomerPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customerPolicyDeserializer(result.body);
}

/** Lists the policies for a customer. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export async function getByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  policyName: ServiceDefinedResourceName,
  options: PoliciesGetByCustomerOptionalParams = { requestOptions: {} },
): Promise<CustomerPolicy> {
  const result = await _getByCustomerSend(
    context,
    billingAccountName,
    billingProfileName,
    customerName,
    policyName,
    options,
  );
  return _getByCustomerDeserialize(result);
}

export function _createOrUpdateByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  parameters: CustomerPolicy,
  options: PoliciesCreateOrUpdateByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/policies/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: customerPolicySerializer(parameters),
  });
}

export async function _createOrUpdateByCustomerDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomerPolicy> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customerPolicyDeserializer(result.body);
}

/** Updates the policies for a customer. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export function createOrUpdateByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  parameters: CustomerPolicy,
  options: PoliciesCreateOrUpdateByCustomerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CustomerPolicy>, CustomerPolicy> {
  return getLongRunningPoller(
    context,
    _createOrUpdateByCustomerDeserialize,
    ["201", "200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateByCustomerSend(
          context,
          billingAccountName,
          billingProfileName,
          customerName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<CustomerPolicy>, CustomerPolicy>;
}

export function _createOrUpdateByCustomerAtBillingAccountSend(
  context: Client,
  billingAccountName: string,
  customerName: string,
  parameters: CustomerPolicy,
  options: PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/customers/{customerName}/policies/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      customerName: customerName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: customerPolicySerializer(parameters),
  });
}

export async function _createOrUpdateByCustomerAtBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomerPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customerPolicyDeserializer(result.body);
}

/** Updates the policies for a customer at billing account scope. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export function createOrUpdateByCustomerAtBillingAccount(
  context: Client,
  billingAccountName: string,
  customerName: string,
  parameters: CustomerPolicy,
  options: PoliciesCreateOrUpdateByCustomerAtBillingAccountOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CustomerPolicy>, CustomerPolicy> {
  return getLongRunningPoller(
    context,
    _createOrUpdateByCustomerAtBillingAccountDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateByCustomerAtBillingAccountSend(
          context,
          billingAccountName,
          customerName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<CustomerPolicy>, CustomerPolicy>;
}

export function _getByCustomerAtBillingAccountSend(
  context: Client,
  billingAccountName: string,
  customerName: string,
  options: PoliciesGetByCustomerAtBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/customers/{customerName}/policies/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      customerName: customerName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getByCustomerAtBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomerPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return customerPolicyDeserializer(result.body);
}

/** Lists the policies for a customer at billing account scope. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export async function getByCustomerAtBillingAccount(
  context: Client,
  billingAccountName: string,
  customerName: string,
  options: PoliciesGetByCustomerAtBillingAccountOptionalParams = { requestOptions: {} },
): Promise<CustomerPolicy> {
  const result = await _getByCustomerAtBillingAccountSend(
    context,
    billingAccountName,
    customerName,
    options,
  );
  return _getByCustomerAtBillingAccountDeserialize(result);
}
