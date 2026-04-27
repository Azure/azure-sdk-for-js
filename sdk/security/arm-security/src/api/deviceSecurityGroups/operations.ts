// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  DeviceSecurityGroup,
  _DeviceSecurityGroupList,
} from "../../models/ioTSecurityAPI/models.js";
import {
  deviceSecurityGroupSerializer,
  deviceSecurityGroupDeserializer,
  _deviceSecurityGroupListDeserializer,
} from "../../models/ioTSecurityAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeviceSecurityGroupsListOptionalParams,
  DeviceSecurityGroupsDeleteOptionalParams,
  DeviceSecurityGroupsCreateOrUpdateOptionalParams,
  DeviceSecurityGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceId: string,
  options: DeviceSecurityGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/deviceSecurityGroups{?api%2Dversion}",
    {
      resourceId: resourceId,
      "api%2Dversion": "2019-08-01",
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
): Promise<_DeviceSecurityGroupList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _deviceSecurityGroupListDeserializer(result.body);
}

/** Use this method get the list of device security groups for the specified IoT Hub resource. */
export function list(
  context: Client,
  resourceId: string,
  options: DeviceSecurityGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceSecurityGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceId: string,
  deviceSecurityGroupName: string,
  options: DeviceSecurityGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/deviceSecurityGroups/{deviceSecurityGroupName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      deviceSecurityGroupName: deviceSecurityGroupName,
      "api%2Dversion": "2019-08-01",
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

/** User this method to deletes the device security group. */
export async function $delete(
  context: Client,
  resourceId: string,
  deviceSecurityGroupName: string,
  options: DeviceSecurityGroupsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceId, deviceSecurityGroupName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceId: string,
  deviceSecurityGroupName: string,
  deviceSecurityGroup: DeviceSecurityGroup,
  options: DeviceSecurityGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/deviceSecurityGroups/{deviceSecurityGroupName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      deviceSecurityGroupName: deviceSecurityGroupName,
      "api%2Dversion": "2019-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deviceSecurityGroupSerializer(deviceSecurityGroup),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeviceSecurityGroup> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return deviceSecurityGroupDeserializer(result.body);
}

/** Use this method to creates or updates the device security group on a specified IoT Hub resource. */
export async function createOrUpdate(
  context: Client,
  resourceId: string,
  deviceSecurityGroupName: string,
  deviceSecurityGroup: DeviceSecurityGroup,
  options: DeviceSecurityGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DeviceSecurityGroup> {
  const result = await _createOrUpdateSend(
    context,
    resourceId,
    deviceSecurityGroupName,
    deviceSecurityGroup,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceId: string,
  deviceSecurityGroupName: string,
  options: DeviceSecurityGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/deviceSecurityGroups/{deviceSecurityGroupName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      deviceSecurityGroupName: deviceSecurityGroupName,
      "api%2Dversion": "2019-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DeviceSecurityGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return deviceSecurityGroupDeserializer(result.body);
}

/** Use this method to get the device security group for the specified IoT Hub resource. */
export async function get(
  context: Client,
  resourceId: string,
  deviceSecurityGroupName: string,
  options: DeviceSecurityGroupsGetOptionalParams = { requestOptions: {} },
): Promise<DeviceSecurityGroup> {
  const result = await _getSend(context, resourceId, deviceSecurityGroupName, options);
  return _getDeserialize(result);
}
