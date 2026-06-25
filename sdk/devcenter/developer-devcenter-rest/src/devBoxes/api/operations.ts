// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevBoxesContext as Client } from "./index.js";
import {
  _PagedPool,
  _pagedPoolDeserializer,
  Pool,
  poolDeserializer,
  _PagedSchedule,
  _pagedScheduleDeserializer,
  Schedule,
  scheduleDeserializer,
  _PagedDevBox,
  _pagedDevBoxDeserializer,
  DevBox,
  devBoxSerializer,
  devBoxDeserializer,
  RemoteConnection,
  remoteConnectionDeserializer,
  _PagedDevBoxAction,
  _pagedDevBoxActionDeserializer,
  DevBoxAction,
  devBoxActionDeserializer,
  _PagedDevBoxActionDelayResult,
  _pagedDevBoxActionDelayResultDeserializer,
  DevBoxActionDelayResult,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DelayAllActionsOptionalParams,
  DelayActionOptionalParams,
  SkipActionOptionalParams,
  GetDevBoxActionOptionalParams,
  ListDevBoxActionsOptionalParams,
  GetRemoteConnectionOptionalParams,
  RestartDevBoxOptionalParams,
  StopDevBoxOptionalParams,
  StartDevBoxOptionalParams,
  DeleteDevBoxOptionalParams,
  CreateDevBoxOptionalParams,
  GetDevBoxOptionalParams,
  ListDevBoxesOptionalParams,
  ListAllDevBoxesByUserOptionalParams,
  ListAllDevBoxesOptionalParams,
  GetScheduleOptionalParams,
  ListSchedulesOptionalParams,
  GetPoolOptionalParams,
  ListPoolsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _delayAllActionsSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  delayUntil: Date,
  options: DelayAllActionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions:delay{?api%2Dversion,until}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
      until: delayUntil.toISOString(),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _delayAllActionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDevBoxActionDelayResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDevBoxActionDelayResultDeserializer(result.body);
}

/** Delays all actions. */
export function delayAllActions(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  delayUntil: Date,
  options: DelayAllActionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DevBoxActionDelayResult> {
  return buildPagedAsyncIterator(
    context,
    () => _delayAllActionsSend(context, projectName, userId, devBoxName, delayUntil, options),
    _delayAllActionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _delayActionSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  actionName: string,
  delayUntil: Date,
  options: DelayActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:delay{?api%2Dversion,until}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      actionName: actionName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
      until: delayUntil.toISOString(),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _delayActionDeserialize(
  result: PathUncheckedResponse,
): Promise<DevBoxAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return devBoxActionDeserializer(result.body);
}

/** Delays the occurrence of an action. */
export async function delayAction(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  actionName: string,
  delayUntil: Date,
  options: DelayActionOptionalParams = { requestOptions: {} },
): Promise<DevBoxAction> {
  const result = await _delayActionSend(
    context,
    projectName,
    userId,
    devBoxName,
    actionName,
    delayUntil,
    options,
  );
  return _delayActionDeserialize(result);
}

export function _skipActionSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  actionName: string,
  options: SkipActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}:skip{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      actionName: actionName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _skipActionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Skips an occurrence of an action. */
export async function skipAction(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  actionName: string,
  options: SkipActionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _skipActionSend(
    context,
    projectName,
    userId,
    devBoxName,
    actionName,
    options,
  );
  return _skipActionDeserialize(result);
}

export function _getDevBoxActionSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  actionName: string,
  options: GetDevBoxActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions/{actionName}{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      actionName: actionName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _getDevBoxActionDeserialize(
  result: PathUncheckedResponse,
): Promise<DevBoxAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return devBoxActionDeserializer(result.body);
}

/** Gets an action. */
export async function getDevBoxAction(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  actionName: string,
  options: GetDevBoxActionOptionalParams = { requestOptions: {} },
): Promise<DevBoxAction> {
  const result = await _getDevBoxActionSend(
    context,
    projectName,
    userId,
    devBoxName,
    actionName,
    options,
  );
  return _getDevBoxActionDeserialize(result);
}

export function _listDevBoxActionsSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: ListDevBoxActionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/actions{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listDevBoxActionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDevBoxAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDevBoxActionDeserializer(result.body);
}

/** Lists actions on a Dev Box. */
export function listDevBoxActions(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: ListDevBoxActionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DevBoxAction> {
  return buildPagedAsyncIterator(
    context,
    () => _listDevBoxActionsSend(context, projectName, userId, devBoxName, options),
    _listDevBoxActionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _getRemoteConnectionSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: GetRemoteConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}/remoteConnection{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _getRemoteConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<RemoteConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return remoteConnectionDeserializer(result.body);
}

/** Gets RDP Connection info. */
export async function getRemoteConnection(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: GetRemoteConnectionOptionalParams = { requestOptions: {} },
): Promise<RemoteConnection> {
  const result = await _getRemoteConnectionSend(context, projectName, userId, devBoxName, options);
  return _getRemoteConnectionDeserialize(result);
}

export function _restartDevBoxSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: RestartDevBoxOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:restart{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _restartDevBoxDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Restarts a Dev Box. */
export function restartDevBox(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: RestartDevBoxOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _restartDevBoxDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _restartDevBoxSend(context, projectName, userId, devBoxName, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2023-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopDevBoxSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: StopDevBoxOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:stop{?api%2Dversion,hibernate}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
      hibernate: options?.hibernate,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _stopDevBoxDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Stops a Dev Box. */
export function stopDevBox(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: StopDevBoxOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDevBoxDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _stopDevBoxSend(context, projectName, userId, devBoxName, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2023-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startDevBoxSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: StartDevBoxOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}:start{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _startDevBoxDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Starts a Dev Box. */
export function startDevBox(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: StartDevBoxOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDevBoxDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startDevBoxSend(context, projectName, userId, devBoxName, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2023-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _deleteDevBoxSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: DeleteDevBoxOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _deleteDevBoxDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a Dev Box. */
export function deleteDevBox(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: DeleteDevBoxOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteDevBoxDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteDevBoxSend(context, projectName, userId, devBoxName, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2023-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createDevBoxSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  body: DevBox,
  options: CreateDevBoxOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: devBoxSerializer(body),
    });
}

export async function _createDevBoxDeserialize(result: PathUncheckedResponse): Promise<DevBox> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return devBoxDeserializer(result.body);
}

/** Creates or replaces a Dev Box. */
export function createDevBox(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  body: DevBox,
  options: CreateDevBoxOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DevBox>, DevBox> {
  return getLongRunningPoller(context, _createDevBoxDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createDevBoxSend(context, projectName, userId, devBoxName, body, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2023-04-01",
  }) as PollerLike<OperationState<DevBox>, DevBox>;
}

export function _getDevBoxSend(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: GetDevBoxOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes/{devBoxName}{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      devBoxName: devBoxName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _getDevBoxDeserialize(result: PathUncheckedResponse): Promise<DevBox> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return devBoxDeserializer(result.body);
}

/** Gets a Dev Box. */
export async function getDevBox(
  context: Client,
  projectName: string,
  userId: string,
  devBoxName: string,
  options: GetDevBoxOptionalParams = { requestOptions: {} },
): Promise<DevBox> {
  const result = await _getDevBoxSend(context, projectName, userId, devBoxName, options);
  return _getDevBoxDeserialize(result);
}

export function _listDevBoxesSend(
  context: Client,
  projectName: string,
  userId: string,
  options: ListDevBoxesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/devboxes{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listDevBoxesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDevBox> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDevBoxDeserializer(result.body);
}

/** Lists Dev Boxes in the project for a particular user. */
export function listDevBoxes(
  context: Client,
  projectName: string,
  userId: string,
  options: ListDevBoxesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DevBox> {
  return buildPagedAsyncIterator(
    context,
    () => _listDevBoxesSend(context, projectName, userId, options),
    _listDevBoxesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _listAllDevBoxesByUserSend(
  context: Client,
  userId: string,
  options: ListAllDevBoxesByUserOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/users/{userId}/devboxes{?api%2Dversion}",
    {
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listAllDevBoxesByUserDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDevBox> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDevBoxDeserializer(result.body);
}

/** Lists Dev Boxes in the Dev Center for a particular user. */
export function listAllDevBoxesByUser(
  context: Client,
  userId: string,
  options: ListAllDevBoxesByUserOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DevBox> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllDevBoxesByUserSend(context, userId, options),
    _listAllDevBoxesByUserDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _listAllDevBoxesSend(
  context: Client,
  options: ListAllDevBoxesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/devboxes{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listAllDevBoxesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDevBox> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDevBoxDeserializer(result.body);
}

/** Lists Dev Boxes that the caller has access to in the DevCenter. */
export function listAllDevBoxes(
  context: Client,
  options: ListAllDevBoxesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DevBox> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllDevBoxesSend(context, options),
    _listAllDevBoxesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _getScheduleSend(
  context: Client,
  projectName: string,
  poolName: string,
  scheduleName: string,
  options: GetScheduleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/pools/{poolName}/schedules/{scheduleName}{?api%2Dversion}",
    {
      projectName: projectName,
      poolName: poolName,
      scheduleName: scheduleName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _getScheduleDeserialize(result: PathUncheckedResponse): Promise<Schedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return scheduleDeserializer(result.body);
}

/** Gets a schedule. */
export async function getSchedule(
  context: Client,
  projectName: string,
  poolName: string,
  scheduleName: string,
  options: GetScheduleOptionalParams = { requestOptions: {} },
): Promise<Schedule> {
  const result = await _getScheduleSend(context, projectName, poolName, scheduleName, options);
  return _getScheduleDeserialize(result);
}

export function _listSchedulesSend(
  context: Client,
  projectName: string,
  poolName: string,
  options: ListSchedulesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/pools/{poolName}/schedules{?api%2Dversion}",
    {
      projectName: projectName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listSchedulesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedSchedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedScheduleDeserializer(result.body);
}

/** Lists all schedules within a pool that are configured by your project administrator. */
export function listSchedules(
  context: Client,
  projectName: string,
  poolName: string,
  options: ListSchedulesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Schedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSchedulesSend(context, projectName, poolName, options),
    _listSchedulesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _getPoolSend(
  context: Client,
  projectName: string,
  poolName: string,
  options: GetPoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/pools/{poolName}{?api%2Dversion}",
    {
      projectName: projectName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _getPoolDeserialize(result: PathUncheckedResponse): Promise<Pool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return poolDeserializer(result.body);
}

/** Gets a pool. */
export async function getPool(
  context: Client,
  projectName: string,
  poolName: string,
  options: GetPoolOptionalParams = { requestOptions: {} },
): Promise<Pool> {
  const result = await _getPoolSend(context, projectName, poolName, options);
  return _getPoolDeserialize(result);
}

export function _listPoolsSend(
  context: Client,
  projectName: string,
  options: ListPoolsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/pools{?api%2Dversion}",
    {
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listPoolsDeserialize(result: PathUncheckedResponse): Promise<_PagedPool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedPoolDeserializer(result.body);
}

/** Lists available pools. */
export function listPools(
  context: Client,
  projectName: string,
  options: ListPoolsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Pool> {
  return buildPagedAsyncIterator(
    context,
    () => _listPoolsSend(context, projectName, options),
    _listPoolsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}
