// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  Package,
  PackageCreateOrUpdateParameters,
  PackageUpdateParameters,
  _PackageListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  packageDeserializer,
  packageCreateOrUpdateParametersSerializer,
  packageUpdateParametersSerializer,
  _packageListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PackageListByRuntimeEnvironmentOptionalParams,
  PackageDeleteOptionalParams,
  PackageUpdateOptionalParams,
  PackageCreateOrUpdateOptionalParams,
  PackageGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByRuntimeEnvironmentSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runtimeEnvironmentName: string,
  options: PackageListByRuntimeEnvironmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}/packages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runtimeEnvironmentName: runtimeEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

export async function _listByRuntimeEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<_PackageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _packageListResultDeserializer(result.body);
}

/** Retrieve the a list of Packages */
export function listByRuntimeEnvironment(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runtimeEnvironmentName: string,
  options: PackageListByRuntimeEnvironmentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Package> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByRuntimeEnvironmentSend(
        context,
        resourceGroupName,
        automationAccountName,
        runtimeEnvironmentName,
        options,
      ),
    _listByRuntimeEnvironmentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runtimeEnvironmentName: string,
  packageName: string,
  options: PackageDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}/packages/{packageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runtimeEnvironmentName: runtimeEnvironmentName,
      packageName: packageName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete the package by name. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runtimeEnvironmentName: string,
  packageName: string,
  options: PackageDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    automationAccountName,
    runtimeEnvironmentName,
    packageName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runtimeEnvironmentName: string,
  packageName: string,
  parameters: PackageUpdateParameters,
  options: PackageUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}/packages/{packageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runtimeEnvironmentName: runtimeEnvironmentName,
      packageName: packageName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: packageUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Package> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return packageDeserializer(result.body);
}

/** Update the Package identified by Package name. */
export async function update(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runtimeEnvironmentName: string,
  packageName: string,
  parameters: PackageUpdateParameters,
  options: PackageUpdateOptionalParams = { requestOptions: {} },
): Promise<Package> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    automationAccountName,
    runtimeEnvironmentName,
    packageName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runtimeEnvironmentName: string,
  packageName: string,
  parameters: PackageCreateOrUpdateParameters,
  options: PackageCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}/packages/{packageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runtimeEnvironmentName: runtimeEnvironmentName,
      packageName: packageName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: packageCreateOrUpdateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Package> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return packageDeserializer(result.body);
}

/** Create or update the package identified by package name. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runtimeEnvironmentName: string,
  packageName: string,
  parameters: PackageCreateOrUpdateParameters,
  options: PackageCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Package> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    automationAccountName,
    runtimeEnvironmentName,
    packageName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runtimeEnvironmentName: string,
  packageName: string,
  options: PackageGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runtimeEnvironments/{runtimeEnvironmentName}/packages/{packageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runtimeEnvironmentName: runtimeEnvironmentName,
      packageName: packageName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Package> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return packageDeserializer(result.body);
}

/** Retrieve the Package identified by Package name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runtimeEnvironmentName: string,
  packageName: string,
  options: PackageGetOptionalParams = { requestOptions: {} },
): Promise<Package> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    runtimeEnvironmentName,
    packageName,
    options,
  );
  return _getDeserialize(result);
}
