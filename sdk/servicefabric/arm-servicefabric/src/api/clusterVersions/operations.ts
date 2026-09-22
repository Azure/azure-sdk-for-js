// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagementContext as Client } from "../index.js";
import type {
  ClusterCodeVersionsListResult,
  ClusterVersionsEnvironment,
} from "../../models/models.js";
import {
  errorModelDeserializer,
  clusterCodeVersionsListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ClusterVersionsListByEnvironmentOptionalParams,
  ClusterVersionsListOptionalParams,
  ClusterVersionsGetByEnvironmentOptionalParams,
  ClusterVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByEnvironmentSend(
  context: Client,
  location: string,
  environment: ClusterVersionsEnvironment,
  options: ClusterVersionsListByEnvironmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/clusterVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      environment: environment,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listByEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterCodeVersionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorModelDeserializer(result.body);

    throw error;
  }

  return clusterCodeVersionsListResultDeserializer(result.body);
}

/** Gets all available code versions for Service Fabric cluster resources by environment. */
export async function listByEnvironment(
  context: Client,
  location: string,
  environment: ClusterVersionsEnvironment,
  options: ClusterVersionsListByEnvironmentOptionalParams = { requestOptions: {} },
): Promise<ClusterCodeVersionsListResult> {
  const result = await _listByEnvironmentSend(context, location, environment, options);
  return _listByEnvironmentDeserialize(result);
}

export function _listSend(
  context: Client,
  location: string,
  options: ClusterVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/clusterVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<ClusterCodeVersionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorModelDeserializer(result.body);

    throw error;
  }

  return clusterCodeVersionsListResultDeserializer(result.body);
}

/** Gets all available code versions for Service Fabric cluster resources by location. */
export async function list(
  context: Client,
  location: string,
  options: ClusterVersionsListOptionalParams = { requestOptions: {} },
): Promise<ClusterCodeVersionsListResult> {
  const result = await _listSend(context, location, options);
  return _listDeserialize(result);
}

export function _getByEnvironmentSend(
  context: Client,
  location: string,
  environment: ClusterVersionsEnvironment,
  clusterVersion: string,
  options: ClusterVersionsGetByEnvironmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/clusterVersions/{clusterVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      environment: environment,
      clusterVersion: clusterVersion,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getByEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterCodeVersionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorModelDeserializer(result.body);

    throw error;
  }

  return clusterCodeVersionsListResultDeserializer(result.body);
}

/** Gets information about an available Service Fabric cluster code version by environment. */
export async function getByEnvironment(
  context: Client,
  location: string,
  environment: ClusterVersionsEnvironment,
  clusterVersion: string,
  options: ClusterVersionsGetByEnvironmentOptionalParams = { requestOptions: {} },
): Promise<ClusterCodeVersionsListResult> {
  const result = await _getByEnvironmentSend(
    context,
    location,
    environment,
    clusterVersion,
    options,
  );
  return _getByEnvironmentDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  clusterVersion: string,
  options: ClusterVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/clusterVersions/{clusterVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      clusterVersion: clusterVersion,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<ClusterCodeVersionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorModelDeserializer(result.body);

    throw error;
  }

  return clusterCodeVersionsListResultDeserializer(result.body);
}

/** Gets information about an available Service Fabric cluster code version. */
export async function get(
  context: Client,
  location: string,
  clusterVersion: string,
  options: ClusterVersionsGetOptionalParams = { requestOptions: {} },
): Promise<ClusterCodeVersionsListResult> {
  const result = await _getSend(context, location, clusterVersion, options);
  return _getDeserialize(result);
}
