// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MaintenanceManagementContext as Client } from "../index.js";
import type { ConfigurationAssignment } from "../../models/models.js";
import {
  maintenanceErrorDeserializer,
  configurationAssignmentSerializer,
  configurationAssignmentDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams,
  ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams,
  ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams,
  ConfigurationAssignmentsForSubscriptionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  configurationAssignmentName: string,
  options: ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      configurationAssignmentName: configurationAssignmentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigurationAssignment> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = maintenanceErrorDeserializer(result.body);
    throw error;
  }

  return configurationAssignmentDeserializer(result.body);
}

/** Unregister configuration for resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  configurationAssignmentName: string,
  options: ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<ConfigurationAssignment | null> {
  const result = await _$deleteSend(context, configurationAssignmentName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  configurationAssignmentName: string,
  configurationAssignment: ConfigurationAssignment,
  options: ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      configurationAssignmentName: configurationAssignmentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: configurationAssignmentSerializer(configurationAssignment),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigurationAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = maintenanceErrorDeserializer(result.body);
    throw error;
  }

  return configurationAssignmentDeserializer(result.body);
}

/** Register configuration for resource. */
export async function update(
  context: Client,
  configurationAssignmentName: string,
  configurationAssignment: ConfigurationAssignment,
  options: ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ConfigurationAssignment> {
  const result = await _updateSend(
    context,
    configurationAssignmentName,
    configurationAssignment,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  configurationAssignmentName: string,
  configurationAssignment: ConfigurationAssignment,
  options: ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      configurationAssignmentName: configurationAssignmentName,
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
    body: configurationAssignmentSerializer(configurationAssignment),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigurationAssignment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = maintenanceErrorDeserializer(result.body);
    throw error;
  }

  return configurationAssignmentDeserializer(result.body);
}

/** Register configuration for resource. */
export async function createOrUpdate(
  context: Client,
  configurationAssignmentName: string,
  configurationAssignment: ConfigurationAssignment,
  options: ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ConfigurationAssignment> {
  const result = await _createOrUpdateSend(
    context,
    configurationAssignmentName,
    configurationAssignment,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  configurationAssignmentName: string,
  options: ConfigurationAssignmentsForSubscriptionsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Maintenance/configurationAssignments/{configurationAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      configurationAssignmentName: configurationAssignmentName,
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
): Promise<ConfigurationAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = maintenanceErrorDeserializer(result.body);
    throw error;
  }

  return configurationAssignmentDeserializer(result.body);
}

/** Get configuration assignment for resource. */
export async function get(
  context: Client,
  configurationAssignmentName: string,
  options: ConfigurationAssignmentsForSubscriptionsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<ConfigurationAssignment> {
  const result = await _getSend(context, configurationAssignmentName, options);
  return _getDeserialize(result);
}
