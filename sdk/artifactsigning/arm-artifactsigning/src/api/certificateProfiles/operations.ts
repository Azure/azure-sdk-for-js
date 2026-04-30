// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CodeSigningContext as Client } from "../index.js";
import type {
  CertificateProfile,
  _CertificateProfileListResult,
  RevokeCertificate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  certificateProfileSerializer,
  certificateProfileDeserializer,
  _certificateProfileListResultDeserializer,
  revokeCertificateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CertificateProfilesRevokeCertificateOptionalParams,
  CertificateProfilesListByCodeSigningAccountOptionalParams,
  CertificateProfilesDeleteOptionalParams,
  CertificateProfilesCreateOptionalParams,
  CertificateProfilesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _revokeCertificateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  profileName: string,
  body: RevokeCertificate,
  options: CertificateProfilesRevokeCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}/revokeCertificate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-10-13",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: revokeCertificateSerializer(body),
  });
}

export async function _revokeCertificateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Revoke a certificate under a certificate profile. */
export async function revokeCertificate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  profileName: string,
  body: RevokeCertificate,
  options: CertificateProfilesRevokeCertificateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _revokeCertificateSend(
    context,
    resourceGroupName,
    accountName,
    profileName,
    body,
    options,
  );
  return _revokeCertificateDeserialize(result);
}

export function _listByCodeSigningAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CertificateProfilesListByCodeSigningAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-10-13",
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

export async function _listByCodeSigningAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_CertificateProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _certificateProfileListResultDeserializer(result.body);
}

/** List certificate profiles under an artifact signing account. */
export function listByCodeSigningAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CertificateProfilesListByCodeSigningAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CertificateProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCodeSigningAccountSend(context, resourceGroupName, accountName, options),
    _listByCodeSigningAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-13" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  profileName: string,
  options: CertificateProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-10-13",
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

/** Delete a certificate profile. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  profileName: string,
  options: CertificateProfilesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, profileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-13",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  profileName: string,
  resource: CertificateProfile,
  options: CertificateProfilesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-10-13",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: certificateProfileSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateProfile> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return certificateProfileDeserializer(result.body);
}

/** Create a certificate profile. */
export function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  profileName: string,
  resource: CertificateProfile,
  options: CertificateProfilesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CertificateProfile>, CertificateProfile> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, accountName, profileName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-13",
  }) as PollerLike<OperationState<CertificateProfile>, CertificateProfile>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  profileName: string,
  options: CertificateProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-10-13",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CertificateProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return certificateProfileDeserializer(result.body);
}

/** Get details of a certificate profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  profileName: string,
  options: CertificateProfilesGetOptionalParams = { requestOptions: {} },
): Promise<CertificateProfile> {
  const result = await _getSend(context, resourceGroupName, accountName, profileName, options);
  return _getDeserialize(result);
}
