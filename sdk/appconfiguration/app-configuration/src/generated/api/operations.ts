// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureAppConfigurationContext as Client } from "./index.js";
import {
  _KeyListResult,
  _keyListResultDeserializer,
  Key,
  errorDeserializer,
  _KeyValueListResult,
  _keyValueListResultDeserializer,
  KeyValue,
  keyValueSerializer,
  keyValueDeserializer,
  _SnapshotListResult,
  _snapshotListResultDeserializer,
  Snapshot,
  snapshotSerializer,
  snapshotDeserializer,
  OperationDetails,
  operationDetailsDeserializer,
  SnapshotUpdateParameters,
  snapshotUpdateParametersSerializer,
  _LabelListResult,
  _labelListResultDeserializer,
  Label,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  CheckRevisionsOptionalParams,
  GetRevisionsOptionalParams,
  DeleteLockOptionalParams,
  PutLockOptionalParams,
  CheckLabelsOptionalParams,
  GetLabelsOptionalParams,
  CheckSnapshotOptionalParams,
  UpdateSnapshotOptionalParams,
  CreateSnapshotOptionalParams,
  GetOperationDetailsOptionalParams,
  GetSnapshotOptionalParams,
  CheckSnapshotsOptionalParams,
  GetSnapshotsOptionalParams,
  CheckKeyValueOptionalParams,
  DeleteKeyValueOptionalParams,
  PutKeyValueOptionalParams,
  GetKeyValueOptionalParams,
  CheckKeyValuesOptionalParams,
  GetKeyValuesOptionalParams,
  CheckKeysOptionalParams,
  GetKeysOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _checkRevisionsSend(
  context: Client,
  options: CheckRevisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/revisions{?api%2Dversion,key,label,After,%24Select,tags*}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      key: options?.key,
      label: options?.label,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _checkRevisionsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Requests the headers and status of the given resource. */
export async function checkRevisions(
  context: Client,
  options: CheckRevisionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkRevisionsSend(context, options);
  return _checkRevisionsDeserialize(result);
}

export function _getRevisionsSend(
  context: Client,
  options: GetRevisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/revisions{?api%2Dversion,key,label,After,%24Select,tags*}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      key: options?.key,
      label: options?.label,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getRevisionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_KeyValueListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _keyValueListResultDeserializer(result.body);
}

/** Gets a list of key-value revisions. */
export function getRevisions(
  context: Client,
  options: GetRevisionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KeyValue> {
  return buildPagedAsyncIterator(
    context,
    () => _getRevisionsSend(context, options),
    _getRevisionsDeserialize,
    ["200"],
    {
      itemName: "items",
      nextLinkName: "@nextLink",
      apiVersion: context.apiVersion ?? "2024-09-01",
    },
  );
}

export function _deleteLockSend(
  context: Client,
  key: string,
  options: DeleteLockOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/locks/{key}{?api%2Dversion,label}",
    {
      key: key,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      label: options?.label,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteLockDeserialize(result: PathUncheckedResponse): Promise<KeyValue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return keyValueDeserializer(result.body);
}

/** Unlocks a key-value. */
export async function deleteLock(
  context: Client,
  key: string,
  options: DeleteLockOptionalParams = { requestOptions: {} },
): Promise<KeyValue> {
  const result = await _deleteLockSend(context, key, options);
  return _deleteLockDeserialize(result);
}

export function _putLockSend(
  context: Client,
  key: string,
  options: PutLockOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/locks/{key}{?api%2Dversion,label}",
    {
      key: key,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      label: options?.label,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _putLockDeserialize(result: PathUncheckedResponse): Promise<KeyValue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return keyValueDeserializer(result.body);
}

/** Locks a key-value. */
export async function putLock(
  context: Client,
  key: string,
  options: PutLockOptionalParams = { requestOptions: {} },
): Promise<KeyValue> {
  const result = await _putLockSend(context, key, options);
  return _putLockDeserialize(result);
}

export function _checkLabelsSend(
  context: Client,
  options: CheckLabelsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/labels{?api%2Dversion,name,After,%24Select}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      name: options?.name,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _checkLabelsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Requests the headers and status of the given resource. */
export async function checkLabels(
  context: Client,
  options: CheckLabelsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkLabelsSend(context, options);
  return _checkLabelsDeserialize(result);
}

export function _getLabelsSend(
  context: Client,
  options: GetLabelsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/labels{?api%2Dversion,name,After,%24Select}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      name: options?.name,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getLabelsDeserialize(
  result: PathUncheckedResponse,
): Promise<_LabelListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _labelListResultDeserializer(result.body);
}

/** Gets a list of labels. */
export function getLabels(
  context: Client,
  options: GetLabelsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Label> {
  return buildPagedAsyncIterator(
    context,
    () => _getLabelsSend(context, options),
    _getLabelsDeserialize,
    ["200"],
    {
      itemName: "items",
      nextLinkName: "@nextLink",
      apiVersion: context.apiVersion ?? "2024-09-01",
    },
  );
}

export function _checkSnapshotSend(
  context: Client,
  name: string,
  options: CheckSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/snapshots/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _checkSnapshotDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Requests the headers and status of the given resource. */
export async function checkSnapshot(
  context: Client,
  name: string,
  options: CheckSnapshotOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkSnapshotSend(context, name, options);
  return _checkSnapshotDeserialize(result);
}

export function _updateSnapshotSend(
  context: Client,
  contentType: "application/merge-patch+json" | "application/json",
  name: string,
  entity: SnapshotUpdateParameters,
  options: UpdateSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/snapshots/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: contentType,
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: snapshotUpdateParametersSerializer(entity),
    });
}

export async function _updateSnapshotDeserialize(result: PathUncheckedResponse): Promise<Snapshot> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return snapshotDeserializer(result.body);
}

/** Updates the state of a key-value snapshot. */
export async function updateSnapshot(
  context: Client,
  contentType: "application/merge-patch+json" | "application/json",
  name: string,
  entity: SnapshotUpdateParameters,
  options: UpdateSnapshotOptionalParams = { requestOptions: {} },
): Promise<Snapshot> {
  const result = await _updateSnapshotSend(context, contentType, name, entity, options);
  return _updateSnapshotDeserialize(result);
}

export function _createSnapshotSend(
  context: Client,
  contentType: "application/vnd.microsoft.appconfig.snapshot+json" | "application/json",
  name: string,
  entity: Snapshot,
  options: CreateSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/snapshots/{name}{?api%2Dversion}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: contentType,
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...options.requestOptions?.headers,
      },
      body: snapshotSerializer(entity),
    });
}

export async function _createSnapshotDeserialize(result: PathUncheckedResponse): Promise<Snapshot> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return snapshotDeserializer(result.body);
}

/** Creates a key-value snapshot. */
export function createSnapshot(
  context: Client,
  contentType: "application/vnd.microsoft.appconfig.snapshot+json" | "application/json",
  name: string,
  entity: Snapshot,
  options: CreateSnapshotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Snapshot>, Snapshot> {
  return getLongRunningPoller(context, _createSnapshotDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSnapshotSend(context, contentType, name, entity, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2024-09-01",
  }) as PollerLike<OperationState<Snapshot>, Snapshot>;
}

export function _getOperationDetailsSend(
  context: Client,
  snapshot: string,
  options: GetOperationDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/operations{?api%2Dversion,snapshot}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      snapshot: snapshot,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getOperationDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return operationDetailsDeserializer(result.body);
}

/** Gets the state of a long running operation. */
export async function getOperationDetails(
  context: Client,
  snapshot: string,
  options: GetOperationDetailsOptionalParams = { requestOptions: {} },
): Promise<OperationDetails> {
  const result = await _getOperationDetailsSend(context, snapshot, options);
  return _getOperationDetailsDeserialize(result);
}

export function _getSnapshotSend(
  context: Client,
  name: string,
  options: GetSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/snapshots/{name}{?api%2Dversion,%24Select}",
    {
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getSnapshotDeserialize(result: PathUncheckedResponse): Promise<Snapshot> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return snapshotDeserializer(result.body);
}

/** Gets a single key-value snapshot. */
export async function getSnapshot(
  context: Client,
  name: string,
  options: GetSnapshotOptionalParams = { requestOptions: {} },
): Promise<Snapshot> {
  const result = await _getSnapshotSend(context, name, options);
  return _getSnapshotDeserialize(result);
}

export function _checkSnapshotsSend(
  context: Client,
  options: CheckSnapshotsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/snapshots{?api%2Dversion,After}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      After: options?.after,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _checkSnapshotsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Requests the headers and status of the given resource. */
export async function checkSnapshots(
  context: Client,
  options: CheckSnapshotsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkSnapshotsSend(context, options);
  return _checkSnapshotsDeserialize(result);
}

export function _getSnapshotsSend(
  context: Client,
  options: GetSnapshotsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/snapshots{?api%2Dversion,name,After,%24Select,status}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      name: options?.name,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      status: !options?.status
        ? options?.status
        : options?.status.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getSnapshotsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SnapshotListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _snapshotListResultDeserializer(result.body);
}

/** Gets a list of key-value snapshots. */
export function getSnapshots(
  context: Client,
  options: GetSnapshotsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Snapshot> {
  return buildPagedAsyncIterator(
    context,
    () => _getSnapshotsSend(context, options),
    _getSnapshotsDeserialize,
    ["200"],
    {
      itemName: "items",
      nextLinkName: "@nextLink",
      apiVersion: context.apiVersion ?? "2024-09-01",
    },
  );
}

export function _checkKeyValueSend(
  context: Client,
  key: string,
  options: CheckKeyValueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/kv/{key}{?api%2Dversion,label,%24Select,tags*}",
    {
      key: key,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      label: options?.label,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _checkKeyValueDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Requests the headers and status of the given resource. */
export async function checkKeyValue(
  context: Client,
  key: string,
  options: CheckKeyValueOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkKeyValueSend(context, key, options);
  return _checkKeyValueDeserialize(result);
}

export function _deleteKeyValueSend(
  context: Client,
  key: string,
  options: DeleteKeyValueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/kv/{key}{?api%2Dversion,label}",
    {
      key: key,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      label: options?.label,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteKeyValueDeserialize(result: PathUncheckedResponse): Promise<KeyValue> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return keyValueDeserializer(result.body);
}

/** Deletes a key-value. */
export async function deleteKeyValue(
  context: Client,
  key: string,
  options: DeleteKeyValueOptionalParams = { requestOptions: {} },
): Promise<KeyValue> {
  const result = await _deleteKeyValueSend(context, key, options);
  return _deleteKeyValueDeserialize(result);
}

export function _putKeyValueSend(
  context: Client,
  contentType:
    | "application/vnd.microsoft.appconfig.kv+json"
    | "application/vnd.microsoft.appconfig.kvset+json"
    | "application/json"
    | "text/json"
    | "application/*+json"
    | "application/json-patch+json",
  key: string,
  options: PutKeyValueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/kv/{key}{?api%2Dversion,label}",
    {
      key: key,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      label: options?.label,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: contentType,
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
      body: !options["entity"] ? options["entity"] : keyValueSerializer(options["entity"]),
    });
}

export async function _putKeyValueDeserialize(result: PathUncheckedResponse): Promise<KeyValue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return keyValueDeserializer(result.body);
}

/** Creates a key-value. */
export async function putKeyValue(
  context: Client,
  contentType:
    | "application/vnd.microsoft.appconfig.kv+json"
    | "application/vnd.microsoft.appconfig.kvset+json"
    | "application/json"
    | "text/json"
    | "application/*+json"
    | "application/json-patch+json",
  key: string,
  options: PutKeyValueOptionalParams = { requestOptions: {} },
): Promise<KeyValue> {
  const result = await _putKeyValueSend(context, contentType, key, options);
  return _putKeyValueDeserialize(result);
}

export function _getKeyValueSend(
  context: Client,
  key: string,
  options: GetKeyValueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/kv/{key}{?api%2Dversion,label,%24Select,tags*}",
    {
      key: key,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      label: options?.label,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getKeyValueDeserialize(result: PathUncheckedResponse): Promise<KeyValue> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return keyValueDeserializer(result.body);
}

/** Gets a single key-value. */
export async function getKeyValue(
  context: Client,
  key: string,
  options: GetKeyValueOptionalParams = { requestOptions: {} },
): Promise<KeyValue> {
  const result = await _getKeyValueSend(context, key, options);
  return _getKeyValueDeserialize(result);
}

export function _checkKeyValuesSend(
  context: Client,
  options: CheckKeyValuesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/kv{?api%2Dversion,key,label,After,%24Select,snapshot,tags*}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      key: options?.key,
      label: options?.label,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      snapshot: options?.snapshot,
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _checkKeyValuesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Requests the headers and status of the given resource. */
export async function checkKeyValues(
  context: Client,
  options: CheckKeyValuesOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkKeyValuesSend(context, options);
  return _checkKeyValuesDeserialize(result);
}

export function _getKeyValuesSend(
  context: Client,
  options: GetKeyValuesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/kv{?api%2Dversion,key,label,After,%24Select,snapshot,tags*}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      key: options?.key,
      label: options?.label,
      After: options?.after,
      "%24Select": !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      snapshot: options?.snapshot,
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getKeyValuesDeserialize(
  result: PathUncheckedResponse,
): Promise<_KeyValueListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _keyValueListResultDeserializer(result.body);
}

/** Gets a list of key-values. */
export function getKeyValues(
  context: Client,
  options: GetKeyValuesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KeyValue> {
  return buildPagedAsyncIterator(
    context,
    () => _getKeyValuesSend(context, options),
    _getKeyValuesDeserialize,
    ["200"],
    {
      itemName: "items",
      nextLinkName: "@nextLink",
      apiVersion: context.apiVersion ?? "2024-09-01",
    },
  );
}

export function _checkKeysSend(
  context: Client,
  options: CheckKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/keys{?api%2Dversion,name,After}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      name: options?.name,
      After: options?.after,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .head({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _checkKeysDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Requests the headers and status of the given resource. */
export async function checkKeys(
  context: Client,
  options: CheckKeysOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkKeysSend(context, options);
  return _checkKeysDeserialize(result);
}

export function _getKeysSend(
  context: Client,
  options: GetKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/keys{?api%2Dversion,name,After}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
      name: options?.name,
      After: options?.after,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.syncToken !== undefined ? { "sync-token": options?.syncToken } : {}),
        ...(options?.acceptDatetime !== undefined
          ? { "accept-datetime": options?.acceptDatetime }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getKeysDeserialize(result: PathUncheckedResponse): Promise<_KeyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return _keyListResultDeserializer(result.body);
}

/** Gets a list of keys. */
export function getKeys(
  context: Client,
  options: GetKeysOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Key> {
  return buildPagedAsyncIterator(
    context,
    () => _getKeysSend(context, options),
    _getKeysDeserialize,
    ["200"],
    {
      itemName: "items",
      nextLinkName: "@nextLink",
      apiVersion: context.apiVersion ?? "2024-09-01",
    },
  );
}
