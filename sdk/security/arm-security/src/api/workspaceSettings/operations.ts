// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  LegacySettingsAPIWorkspaceSetting,
  _LegacySettingsAPIWorkspaceSettingList,
} from "../../models/legacySettingsAPI/models.js";
import {
  legacySettingsAPIWorkspaceSettingSerializer,
  legacySettingsAPIWorkspaceSettingDeserializer,
  _legacySettingsAPIWorkspaceSettingListDeserializer,
} from "../../models/legacySettingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspaceSettingsListOptionalParams,
  WorkspaceSettingsDeleteOptionalParams,
  WorkspaceSettingsUpdateOptionalParams,
  WorkspaceSettingsCreateOptionalParams,
  WorkspaceSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: WorkspaceSettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/workspaceSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2017-08-01-preview",
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
): Promise<_LegacySettingsAPIWorkspaceSettingList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _legacySettingsAPIWorkspaceSettingListDeserializer(result.body);
}

/** Settings about where we should store your security data and logs. If the result is empty, it means that no custom-workspace configuration was set */
export function list(
  context: Client,
  options: WorkspaceSettingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LegacySettingsAPIWorkspaceSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2017-08-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  workspaceSettingName: string,
  options: WorkspaceSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/workspaceSettings/{workspaceSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      workspaceSettingName: workspaceSettingName,
      "api%2Dversion": "2017-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the custom workspace settings for this subscription. new VMs will report to the default workspace */
export async function $delete(
  context: Client,
  workspaceSettingName: string,
  options: WorkspaceSettingsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, workspaceSettingName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  workspaceSettingName: string,
  workspaceSetting: LegacySettingsAPIWorkspaceSetting,
  options: WorkspaceSettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/workspaceSettings/{workspaceSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      workspaceSettingName: workspaceSettingName,
      "api%2Dversion": "2017-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: legacySettingsAPIWorkspaceSettingSerializer(workspaceSetting),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<LegacySettingsAPIWorkspaceSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return legacySettingsAPIWorkspaceSettingDeserializer(result.body);
}

/** Settings about where we should store your security data and logs */
export async function update(
  context: Client,
  workspaceSettingName: string,
  workspaceSetting: LegacySettingsAPIWorkspaceSetting,
  options: WorkspaceSettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<LegacySettingsAPIWorkspaceSetting> {
  const result = await _updateSend(context, workspaceSettingName, workspaceSetting, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  workspaceSettingName: string,
  workspaceSetting: LegacySettingsAPIWorkspaceSetting,
  options: WorkspaceSettingsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/workspaceSettings/{workspaceSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      workspaceSettingName: workspaceSettingName,
      "api%2Dversion": "2017-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: legacySettingsAPIWorkspaceSettingSerializer(workspaceSetting),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<LegacySettingsAPIWorkspaceSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return legacySettingsAPIWorkspaceSettingDeserializer(result.body);
}

/** creating settings about where we should store your security data and logs */
export async function create(
  context: Client,
  workspaceSettingName: string,
  workspaceSetting: LegacySettingsAPIWorkspaceSetting,
  options: WorkspaceSettingsCreateOptionalParams = { requestOptions: {} },
): Promise<LegacySettingsAPIWorkspaceSetting> {
  const result = await _createSend(context, workspaceSettingName, workspaceSetting, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  workspaceSettingName: string,
  options: WorkspaceSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/workspaceSettings/{workspaceSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      workspaceSettingName: workspaceSettingName,
      "api%2Dversion": "2017-08-01-preview",
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
): Promise<LegacySettingsAPIWorkspaceSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return legacySettingsAPIWorkspaceSettingDeserializer(result.body);
}

/** Settings about where we should store your security data and logs. If the result is empty, it means that no custom-workspace configuration was set */
export async function get(
  context: Client,
  workspaceSettingName: string,
  options: WorkspaceSettingsGetOptionalParams = { requestOptions: {} },
): Promise<LegacySettingsAPIWorkspaceSetting> {
  const result = await _getSend(context, workspaceSettingName, options);
  return _getDeserialize(result);
}
