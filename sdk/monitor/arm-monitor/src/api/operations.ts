// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "./index.js";
import { microsoftCommonErrorResponseDeserializer } from "../models/microsoft/common/models.js";
import { armErrorResponseDeserializer } from "../models/models.js";
import type {
  TenantActionGroupsTenantNotificationRequestBody,
  TenantActionGroupsTestNotificationDetailsResponse,
} from "../models/tenantActionGroups/models.js";
import {
  tenantActionGroupsTenantNotificationRequestBodySerializer,
  tenantActionGroupsTestNotificationDetailsResponseDeserializer,
} from "../models/tenantActionGroups/models.js";
import { getLongRunningPoller } from "../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  GetTestNotificationsAtTenantActionGroupResourceLevelOptionalParams,
  CreateNotificationsAtTenantActionGroupResourceLevelOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getTestNotificationsAtTenantActionGroupResourceLevelSend(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  notificationId: string,
  xMsClientTenantId: string,
  options: GetTestNotificationsAtTenantActionGroupResourceLevelOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/microsoft.Management/managementGroups/{managementGroupId}/providers/microsoft.Insights/tenantActionGroups/{tenantActionGroupName}/notificationStatus/{notificationId}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      tenantActionGroupName: tenantActionGroupName,
      notificationId: notificationId,
      "api%2Dversion": "2023-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "x-ms-client-tenant-id": xMsClientTenantId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTestNotificationsAtTenantActionGroupResourceLevelDeserialize(
  result: PathUncheckedResponse,
): Promise<TenantActionGroupsTestNotificationDetailsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = microsoftCommonErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return tenantActionGroupsTestNotificationDetailsResponseDeserializer(result.body);
}

/** Get the test notifications by the notification id */
export async function getTestNotificationsAtTenantActionGroupResourceLevel(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  notificationId: string,
  xMsClientTenantId: string,
  options: GetTestNotificationsAtTenantActionGroupResourceLevelOptionalParams = {
    requestOptions: {},
  },
): Promise<TenantActionGroupsTestNotificationDetailsResponse> {
  const result = await _getTestNotificationsAtTenantActionGroupResourceLevelSend(
    context,
    managementGroupId,
    tenantActionGroupName,
    notificationId,
    xMsClientTenantId,
    options,
  );
  return _getTestNotificationsAtTenantActionGroupResourceLevelDeserialize(result);
}

export function _createNotificationsAtTenantActionGroupResourceLevelSend(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  xMsClientTenantId: string,
  notificationRequest: TenantActionGroupsTenantNotificationRequestBody,
  options: CreateNotificationsAtTenantActionGroupResourceLevelOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Insights/tenantActionGroups/{tenantActionGroupName}/createNotifications{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      tenantActionGroupName: tenantActionGroupName,
      "api%2Dversion": "2023-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "x-ms-client-tenant-id": xMsClientTenantId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: tenantActionGroupsTenantNotificationRequestBodySerializer(notificationRequest),
  });
}

export async function _createNotificationsAtTenantActionGroupResourceLevelDeserialize(
  result: PathUncheckedResponse,
): Promise<TenantActionGroupsTestNotificationDetailsResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return tenantActionGroupsTestNotificationDetailsResponseDeserializer(result.body);
}

/** Send test notifications to a set of provided receivers */
export function createNotificationsAtTenantActionGroupResourceLevel(
  context: Client,
  managementGroupId: string,
  tenantActionGroupName: string,
  xMsClientTenantId: string,
  notificationRequest: TenantActionGroupsTenantNotificationRequestBody,
  options: CreateNotificationsAtTenantActionGroupResourceLevelOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<TenantActionGroupsTestNotificationDetailsResponse>,
  TenantActionGroupsTestNotificationDetailsResponse
> {
  return getLongRunningPoller(
    context,
    _createNotificationsAtTenantActionGroupResourceLevelDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createNotificationsAtTenantActionGroupResourceLevelSend(
          context,
          managementGroupId,
          tenantActionGroupName,
          xMsClientTenantId,
          notificationRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2023-05-01-preview",
    },
  ) as PollerLike<
    OperationState<TenantActionGroupsTestNotificationDetailsResponse>,
    TenantActionGroupsTestNotificationDetailsResponse
  >;
}
