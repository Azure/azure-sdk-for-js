// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusManagementContext as Client } from "../index.js";
import type {
  MigrationConfigProperties,
  MigrationConfigurationName,
  _MigrationConfigListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  migrationConfigPropertiesSerializer,
  migrationConfigPropertiesDeserializer,
  _migrationConfigListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MigrationConfigsRevertOptionalParams,
  MigrationConfigsCompleteMigrationOptionalParams,
  MigrationConfigsListOptionalParams,
  MigrationConfigsDeleteOptionalParams,
  MigrationConfigsCreateAndStartMigrationOptionalParams,
  MigrationConfigsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _revertSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  configName: MigrationConfigurationName,
  options: MigrationConfigsRevertOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations/{configName}/revert{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      configName: configName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revertDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** This operation reverts Migration */
export async function revert(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  configName: MigrationConfigurationName,
  options: MigrationConfigsRevertOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _revertSend(context, resourceGroupName, namespaceName, configName, options);
  return _revertDeserialize(result);
}

export function _completeMigrationSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  configName: MigrationConfigurationName,
  options: MigrationConfigsCompleteMigrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations/{configName}/upgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      configName: configName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _completeMigrationDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** This operation Completes Migration of entities by pointing the connection strings to Premium namespace and any entities created after the operation will be under Premium Namespace. CompleteMigration operation will fail when entity migration is in-progress. */
export async function completeMigration(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  configName: MigrationConfigurationName,
  options: MigrationConfigsCompleteMigrationOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _completeMigrationSend(
    context,
    resourceGroupName,
    namespaceName,
    configName,
    options,
  );
  return _completeMigrationDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: MigrationConfigsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MigrationConfigListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _migrationConfigListResultDeserializer(result.body);
}

/** Gets all migrationConfigurations */
export function list(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  options: MigrationConfigsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MigrationConfigProperties> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, namespaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  configName: MigrationConfigurationName,
  options: MigrationConfigsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations/{configName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      configName: configName,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a MigrationConfiguration */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  configName: MigrationConfigurationName,
  options: MigrationConfigsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, namespaceName, configName, options);
  return _$deleteDeserialize(result);
}

export function _createAndStartMigrationSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  configName: MigrationConfigurationName,
  parameters: MigrationConfigProperties,
  options: MigrationConfigsCreateAndStartMigrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations/{configName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      configName: configName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: migrationConfigPropertiesSerializer(parameters),
  });
}

export async function _createAndStartMigrationDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrationConfigProperties> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return migrationConfigPropertiesDeserializer(result.body);
}

/** Creates Migration configuration and starts migration of entities from Standard to Premium namespace */
export function createAndStartMigration(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  configName: MigrationConfigurationName,
  parameters: MigrationConfigProperties,
  options: MigrationConfigsCreateAndStartMigrationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<MigrationConfigProperties>, MigrationConfigProperties> {
  return getLongRunningPoller(context, _createAndStartMigrationDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createAndStartMigrationSend(
        context,
        resourceGroupName,
        namespaceName,
        configName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<MigrationConfigProperties>, MigrationConfigProperties>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  configName: MigrationConfigurationName,
  options: MigrationConfigsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations/{configName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      namespaceName: namespaceName,
      configName: configName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrationConfigProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return migrationConfigPropertiesDeserializer(result.body);
}

/** Retrieves Migration Config */
export async function get(
  context: Client,
  resourceGroupName: string,
  namespaceName: string,
  configName: MigrationConfigurationName,
  options: MigrationConfigsGetOptionalParams = { requestOptions: {} },
): Promise<MigrationConfigProperties> {
  const result = await _getSend(context, resourceGroupName, namespaceName, configName, options);
  return _getDeserialize(result);
}
