// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationServiceManagementContext as Client } from "../index.js";
import type {
  DomainResource,
  UpdateDomainRequestParameters,
  _DomainResourceList,
  VerificationParameter,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  domainResourceSerializer,
  domainResourceDeserializer,
  updateDomainRequestParametersSerializer,
  _domainResourceListDeserializer,
  verificationParameterSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DomainsCancelVerificationOptionalParams,
  DomainsInitiateVerificationOptionalParams,
  DomainsListByEmailServiceResourceOptionalParams,
  DomainsDeleteOptionalParams,
  DomainsUpdateOptionalParams,
  DomainsCreateOrUpdateOptionalParams,
  DomainsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _cancelVerificationSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  parameters: VerificationParameter,
  options: DomainsCancelVerificationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/cancelVerification{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: verificationParameterSerializer(parameters),
  });
}

export async function _cancelVerificationDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Cancel verification of DNS record. */
export function cancelVerification(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  parameters: VerificationParameter,
  options: DomainsCancelVerificationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _cancelVerificationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cancelVerificationSend(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-18",
  }) as PollerLike<OperationState<void>, void>;
}

export function _initiateVerificationSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  parameters: VerificationParameter,
  options: DomainsInitiateVerificationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}/initiateVerification{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: verificationParameterSerializer(parameters),
  });
}

export async function _initiateVerificationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Initiate verification of DNS record. */
export function initiateVerification(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  parameters: VerificationParameter,
  options: DomainsInitiateVerificationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _initiateVerificationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _initiateVerificationSend(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-18",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByEmailServiceResourceSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  options: DomainsListByEmailServiceResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

export async function _listByEmailServiceResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_DomainResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _domainResourceListDeserializer(result.body);
}

/** Handles requests to list all Domains resources under the parent EmailServices resource. */
export function listByEmailServiceResource(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  options: DomainsListByEmailServiceResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DomainResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEmailServiceResourceSend(context, resourceGroupName, emailServiceName, options),
    _listByEmailServiceResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-18" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  options: DomainsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

/** Operation to delete a Domains resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  options: DomainsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, emailServiceName, domainName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-18",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  parameters: UpdateDomainRequestParameters,
  options: DomainsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateDomainRequestParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DomainResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return domainResourceDeserializer(result.body);
}

/** Operation to update an existing Domains resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  parameters: UpdateDomainRequestParameters,
  options: DomainsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DomainResource>, DomainResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, emailServiceName, domainName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-18",
  }) as PollerLike<OperationState<DomainResource>, DomainResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  parameters: DomainResource,
  options: DomainsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: domainResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DomainResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return domainResourceDeserializer(result.body);
}

/** Add a new Domains resource under the parent EmailService resource or update an existing Domains resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  parameters: DomainResource,
  options: DomainsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DomainResource>, DomainResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        emailServiceName,
        domainName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-18",
  }) as PollerLike<OperationState<DomainResource>, DomainResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  options: DomainsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Communication/emailServices/{emailServiceName}/domains/{domainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      emailServiceName: emailServiceName,
      domainName: domainName,
      "api%2Dversion": context.apiVersion ?? "2026-03-18",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DomainResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return domainResourceDeserializer(result.body);
}

/** Get the Domains resource and its properties. */
export async function get(
  context: Client,
  resourceGroupName: string,
  emailServiceName: string,
  domainName: string,
  options: DomainsGetOptionalParams = { requestOptions: {} },
): Promise<DomainResource> {
  const result = await _getSend(context, resourceGroupName, emailServiceName, domainName, options);
  return _getDeserialize(result);
}
