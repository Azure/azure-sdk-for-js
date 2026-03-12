// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext as Client } from "../index.js";
import type { KafkaConfiguration, _KafkaConfigurationList } from "../../models/models.js";
import {
  errorResponseModelDeserializer,
  kafkaConfigurationSerializer,
  kafkaConfigurationDeserializer,
  _kafkaConfigurationListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  KafkaConfigurationsListByAccountOptionalParams,
  KafkaConfigurationsDeleteOptionalParams,
  KafkaConfigurationsCreateOrUpdateOptionalParams,
  KafkaConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: KafkaConfigurationsListByAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/kafkaConfigurations{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
      "%24skipToken": options?.skipToken,
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

export async function _listByAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_KafkaConfigurationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return _kafkaConfigurationListDeserializer(result.body);
}

/** Lists the Kafka configurations in the Account */
export function listByAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: KafkaConfigurationsListByAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KafkaConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAccountSend(context, resourceGroupName, accountName, options),
    _listByAccountDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  kafkaConfigurationName: string,
  options: KafkaConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/kafkaConfigurations/{kafkaConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      kafkaConfigurationName: kafkaConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a KafkaConfiguration resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  kafkaConfigurationName: string,
  options: KafkaConfigurationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    accountName,
    kafkaConfigurationName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  kafkaConfigurationName: string,
  kafkaConfiguration: KafkaConfiguration,
  options: KafkaConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/kafkaConfigurations/{kafkaConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      kafkaConfigurationName: kafkaConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: kafkaConfigurationSerializer(kafkaConfiguration),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<KafkaConfiguration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return kafkaConfigurationDeserializer(result.body);
}

/** Create or update Kafka Configuration */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  kafkaConfigurationName: string,
  kafkaConfiguration: KafkaConfiguration,
  options: KafkaConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<KafkaConfiguration> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    kafkaConfigurationName,
    kafkaConfiguration,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  kafkaConfigurationName: string,
  options: KafkaConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/kafkaConfigurations/{kafkaConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      kafkaConfigurationName: kafkaConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<KafkaConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseModelDeserializer(result.body);

    throw error;
  }

  return kafkaConfigurationDeserializer(result.body);
}

/** Gets the kafka configuration for the account */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  kafkaConfigurationName: string,
  options: KafkaConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<KafkaConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    kafkaConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
