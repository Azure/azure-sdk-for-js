// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ClusterQuotaConfigurationProperties,
  clusterQuotaConfigurationPropertiesSerializer,
  clusterQuotaConfigurationPropertiesDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ConfigurationGetOptionalParams, ConfigurationPatchOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ConfigurationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}/quotaConfiguration/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterQuotaConfigurationProperties> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterQuotaConfigurationPropertiesDeserializer(result.body);
}

/** Get all Event Hubs Cluster settings - a collection of key/value pairs which represent the quotas and settings imposed on the cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ConfigurationGetOptionalParams = { requestOptions: {} },
): Promise<ClusterQuotaConfigurationProperties> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: ClusterQuotaConfigurationProperties,
  options: ConfigurationPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}/quotaConfiguration/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: clusterQuotaConfigurationPropertiesSerializer(parameters),
    });
}

export async function _patchDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterQuotaConfigurationProperties | undefined> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? clusterQuotaConfigurationPropertiesDeserializer(result.body) : undefined;
}

/** Replace all specified Event Hubs Cluster settings with those contained in the request body. Leaves the settings not specified in the request body unmodified. */
export async function patch(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: ClusterQuotaConfigurationProperties,
  options: ConfigurationPatchOptionalParams = { requestOptions: {} },
): Promise<ClusterQuotaConfigurationProperties | undefined> {
  const result = await _patchSend(context, resourceGroupName, clusterName, parameters, options);
  return _patchDeserialize(result);
}
