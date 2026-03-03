// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext as Client } from "../index.js";
import type {
  ApplicationPackage,
  _ListApplicationPackagesResult,
  ActivateApplicationPackageParameters,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  applicationPackageSerializer,
  applicationPackageDeserializer,
  _listApplicationPackagesResultDeserializer,
  activateApplicationPackageParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApplicationPackageActivateOptionalParams,
  ApplicationPackageListOptionalParams,
  ApplicationPackageDeleteOptionalParams,
  ApplicationPackageCreateOptionalParams,
  ApplicationPackageGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _activateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  applicationName: string,
  versionName: string,
  parameters: ActivateApplicationPackageParameters,
  options: ApplicationPackageActivateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Batch/batchAccounts/{accountName}/applications/{applicationName}/versions/{versionName}/activate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      applicationName: applicationName,
      versionName: versionName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: activateApplicationPackageParametersSerializer(parameters),
  });
}

export async function _activateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationPackage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return applicationPackageDeserializer(result.body);
}

/** Activates the specified application package. This should be done after the `ApplicationPackage` was created and uploaded. This needs to be done before an `ApplicationPackage` can be used on Pools or Tasks. */
export async function activate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  applicationName: string,
  versionName: string,
  parameters: ActivateApplicationPackageParameters,
  options: ApplicationPackageActivateOptionalParams = { requestOptions: {} },
): Promise<ApplicationPackage> {
  const result = await _activateSend(
    context,
    resourceGroupName,
    accountName,
    applicationName,
    versionName,
    parameters,
    options,
  );
  return _activateDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  applicationName: string,
  options: ApplicationPackageListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Batch/batchAccounts/{accountName}/applications/{applicationName}/versions{?api%2Dversion,maxresults}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      applicationName: applicationName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      maxresults: options?.maxresults,
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
): Promise<_ListApplicationPackagesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _listApplicationPackagesResultDeserializer(result.body);
}

/** Lists all of the application packages in the specified application. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  applicationName: string,
  options: ApplicationPackageListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationPackage> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, applicationName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  applicationName: string,
  versionName: string,
  options: ApplicationPackageDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Batch/batchAccounts/{accountName}/applications/{applicationName}/versions/{versionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      applicationName: applicationName,
      versionName: versionName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an application package record and its associated binary file. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  applicationName: string,
  versionName: string,
  options: ApplicationPackageDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    accountName,
    applicationName,
    versionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  applicationName: string,
  versionName: string,
  options: ApplicationPackageCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Batch/batchAccounts/{accountName}/applications/{applicationName}/versions/{versionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      applicationName: applicationName,
      versionName: versionName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["parameters"]
      ? options["parameters"]
      : applicationPackageSerializer(options["parameters"]),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationPackage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return applicationPackageDeserializer(result.body);
}

/** Creates an application package record. The record contains a storageUrl where the package should be uploaded to.  Once it is uploaded the `ApplicationPackage` needs to be activated using `ApplicationPackageActive` before it can be used. If the auto storage account was configured to use storage keys, the URL returned will contain a SAS. */
export async function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  applicationName: string,
  versionName: string,
  options: ApplicationPackageCreateOptionalParams = { requestOptions: {} },
): Promise<ApplicationPackage> {
  const result = await _createSend(
    context,
    resourceGroupName,
    accountName,
    applicationName,
    versionName,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  applicationName: string,
  versionName: string,
  options: ApplicationPackageGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Batch/batchAccounts/{accountName}/applications/{applicationName}/versions/{versionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      applicationName: applicationName,
      versionName: versionName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ApplicationPackage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return applicationPackageDeserializer(result.body);
}

/** Gets information about the specified application package. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  applicationName: string,
  versionName: string,
  options: ApplicationPackageGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationPackage> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    applicationName,
    versionName,
    options,
  );
  return _getDeserialize(result);
}
