// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistrySoftwareUpdateContext as Client } from "../index.js";
import {
  _DeviceClassesList,
  _deviceClassesListDeserializer,
  DeviceClass,
  deviceClassDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DeviceClassesDeleteOptionalParams,
  DeviceClassesGetDeviceClassOptionalParams,
  DeviceClassesListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteDeviceClassSend(
  context: Client,
  deviceClassId: string,
  options: DeviceClassesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/management/deviceClasses/{deviceClassId}{?api%2Dversion}",
    {
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteDeviceClassDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a device class. */
export async function deleteDeviceClass(
  context: Client,
  deviceClassId: string,
  options: DeviceClassesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteDeviceClassSend(context, deviceClassId, options);
  return _deleteDeviceClassDeserialize(result);
}

export function _getDeviceClassSend(
  context: Client,
  deviceClassId: string,
  options: DeviceClassesGetDeviceClassOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/management/deviceClasses/{deviceClassId}{?api%2Dversion}",
    {
      deviceClassId: deviceClassId,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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

export async function _getDeviceClassDeserialize(
  result: PathUncheckedResponse,
): Promise<DeviceClass> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deviceClassDeserializer(result.body);
}

/** Gets the properties of a device class. */
export async function getDeviceClass(
  context: Client,
  deviceClassId: string,
  options: DeviceClassesGetDeviceClassOptionalParams = { requestOptions: {} },
): Promise<DeviceClass> {
  const result = await _getDeviceClassSend(context, deviceClassId, options);
  return _getDeviceClassDeserialize(result);
}

export function _listSend(
  context: Client,
  options: DeviceClassesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/management/deviceClasses{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_DeviceClassesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _deviceClassesListDeserializer(result.body);
}

/** Gets a list of device classes. */
export function list(
  context: Client,
  options: DeviceClassesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeviceClass> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-02-preview",
    },
  );
}
