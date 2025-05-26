// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ManagedClusterCodeVersionResult,
  managedClusterCodeVersionResultDeserializer,
  ManagedClusterVersionEnvironment,
  managedClusterCodeVersionResultArrayDeserializer,
} from "../../models/models.js";
import {
  ManagedClusterVersionListByEnvironmentOptionalParams,
  ManagedClusterVersionGetByEnvironmentOptionalParams,
  ManagedClusterVersionListOptionalParams,
  ManagedClusterVersionGetOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByEnvironmentSend(
  context: Client,
  location: string,
  environment: ManagedClusterVersionEnvironment,
  options: ManagedClusterVersionListByEnvironmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/managedClusterVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      environment: environment,
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

export async function _listByEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedClusterCodeVersionResult[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterCodeVersionResultArrayDeserializer(result.body);
}

/** Gets all available code versions for Service Fabric cluster resources by environment. */
export async function listByEnvironment(
  context: Client,
  location: string,
  environment: ManagedClusterVersionEnvironment,
  options: ManagedClusterVersionListByEnvironmentOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedClusterCodeVersionResult[]> {
  const result = await _listByEnvironmentSend(context, location, environment, options);
  return _listByEnvironmentDeserialize(result);
}

export function _getByEnvironmentSend(
  context: Client,
  location: string,
  environment: ManagedClusterVersionEnvironment,
  clusterVersion: string,
  options: ManagedClusterVersionGetByEnvironmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/managedClusterVersions/{clusterVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      environment: environment,
      clusterVersion: clusterVersion,
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

export async function _getByEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedClusterCodeVersionResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterCodeVersionResultDeserializer(result.body);
}

/** Gets information about an available Service Fabric cluster code version by environment. */
export async function getByEnvironment(
  context: Client,
  location: string,
  environment: ManagedClusterVersionEnvironment,
  clusterVersion: string,
  options: ManagedClusterVersionGetByEnvironmentOptionalParams = {
    requestOptions: {},
  },
): Promise<ManagedClusterCodeVersionResult> {
  const result = await _getByEnvironmentSend(
    context,
    location,
    environment,
    clusterVersion,
    options,
  );
  return _getByEnvironmentDeserialize(result);
}

export function _listSend(
  context: Client,
  location: string,
  options: ManagedClusterVersionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedClusterVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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
): Promise<ManagedClusterCodeVersionResult[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterCodeVersionResultArrayDeserializer(result.body);
}

/** Gets all available code versions for Service Fabric cluster resources by location. */
export async function list(
  context: Client,
  location: string,
  options: ManagedClusterVersionListOptionalParams = { requestOptions: {} },
): Promise<ManagedClusterCodeVersionResult[]> {
  const result = await _listSend(context, location, options);
  return _listDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  clusterVersion: string,
  options: ManagedClusterVersionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedClusterVersions/{clusterVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      clusterVersion: clusterVersion,
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
): Promise<ManagedClusterCodeVersionResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedClusterCodeVersionResultDeserializer(result.body);
}

/** Gets information about an available Service Fabric managed cluster code version. */
export async function get(
  context: Client,
  location: string,
  clusterVersion: string,
  options: ManagedClusterVersionGetOptionalParams = { requestOptions: {} },
): Promise<ManagedClusterCodeVersionResult> {
  const result = await _getSend(context, location, clusterVersion, options);
  return _getDeserialize(result);
}
