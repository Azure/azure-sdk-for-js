// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TablesContext as Client } from "../index.js";
import {
  _TableQueryResponse,
  _tableQueryResponseDeserializer,
  TableProperties,
  tablePropertiesSerializer,
  tablesErrorDeserializer,
  TableResponse,
  tableResponseDeserializer,
  TableEntityQueryResponse,
  tableEntityQueryResponseDeserializer,
  SignedIdentifiers,
  signedIdentifiersXmlSerializer,
  signedIdentifiersXmlDeserializer,
  SignedIdentifier,
  tableServiceErrorXmlDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TableSetAccessPolicyOptionalParams,
  TableGetAccessPolicyOptionalParams,
  TableInsertEntityOptionalParams,
  TableDeleteEntityOptionalParams,
  TableMergeEntityOptionalParams,
  TableUpdateEntityOptionalParams,
  TableQueryEntityWithPartitionAndRowKeyOptionalParams,
  TableQueryEntitiesOptionalParams,
  TableDeleteOptionalParams,
  TableCreateOptionalParams,
  TableQueryOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _setAccessPolicySend(
  context: Client,
  table: string,
  tableAcl: SignedIdentifiers,
  options: TableSetAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}?comp=acl{?timeout}",
    {
      table: table,
      timeout: options?.timeout,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/xml",
      headers: {
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
      body: signedIdentifiersXmlSerializer(tableAcl),
    });
}

export async function _setAccessPolicyDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tableServiceErrorXmlDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._setAccessPolicyDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return;
}

export function _setAccessPolicyDeserializeHeaders(result: PathUncheckedResponse): {
  date: Date;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
} {
  return {
    date: new Date(result.headers["date"]),
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
  };
}

export function _setAccessPolicyDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/**
 * Sets stored access policies for the table that may be used with Shared Access
 * Signatures.
 */
export async function setAccessPolicy(
  context: Client,
  table: string,
  tableAcl: SignedIdentifiers,
  options: TableSetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<{ date: Date; apiVersion: string; requestId?: string; clientRequestId?: string }> {
  const result = await _setAccessPolicySend(context, table, tableAcl, options);
  const headers = _setAccessPolicyDeserializeHeaders(result);
  await _setAccessPolicyDeserialize(result);
  return { ...headers };
}

export function _getAccessPolicySend(
  context: Client,
  table: string,
  options: TableGetAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}?comp=acl{?timeout}",
    {
      table: table,
      timeout: options?.timeout,
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
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/xml",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAccessPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<SignedIdentifiers> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tableServiceErrorXmlDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._getAccessPolicyDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return signedIdentifiersXmlDeserializer(result.body);
}

export function _getAccessPolicyDeserializeHeaders(result: PathUncheckedResponse): {
  date: Date;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
} {
  return {
    date: new Date(result.headers["date"]),
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    contentType: result.headers["content-type"] as any,
  };
}

export function _getAccessPolicyDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
  };
}

/**
 * Retrieves details about any stored access policies specified on the table that
 * may be used with Shared Access Signatures.
 */
export async function getAccessPolicy(
  context: Client,
  table: string,
  options: TableGetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<{
  identifiers: SignedIdentifier[];
  date: Date;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  contentType: "application/xml";
}> {
  const result = await _getAccessPolicySend(context, table, options);
  const headers = _getAccessPolicyDeserializeHeaders(result);
  const payload = await _getAccessPolicyDeserialize(result);
  return { ...payload, ...headers };
}

export function _insertEntitySend(
  context: Client,
  table: string,
  options: TableInsertEntityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}{?timeout,%24format}",
    {
      table: table,
      timeout: options?.timeout,
      "%24format": options?.format,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        dataserviceversion: "3.0",
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.prefer !== undefined ? { prefer: options?.prefer } : {}),
        accept: "application/json;odata=minimalmetadata",
        ...options.requestOptions?.headers,
      },
      body: !options?.tableEntityProperties
        ? options?.tableEntityProperties
        : options?.tableEntityProperties,
    });
}

export async function _insertEntityDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, any> | undefined> {
  const expectedStatuses = ["201", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tablesErrorDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._insertEntityDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return Object.fromEntries(Object.entries(result.body).map(([k, p]: [string, any]) => [k, p]));
}

export function _insertEntityDeserializeHeaders(result: PathUncheckedResponse): {
  preferenceApplied?: string;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  etag: string;
  contentType: "application/json;odata=minimalmetadata";
} {
  return {
    preferenceApplied:
      result.headers["preference-applied"] === undefined ||
      result.headers["preference-applied"] === null
        ? result.headers["preference-applied"]
        : result.headers["preference-applied"],
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    etag: result.headers["etag"],
    contentType: result.headers["content-type"] as any,
  };
}

export function _insertEntityDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  contentType: "application/json";
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    contentType: result.headers["content-type"] as any,
  };
}

/** Insert entity in a table. */
export async function insertEntity(
  context: Client,
  table: string,
  options: TableInsertEntityOptionalParams = { requestOptions: {} },
): Promise<Record<string, any> | undefined> {
  const result = await _insertEntitySend(context, table, options);
  const headers = _insertEntityDeserializeHeaders(result);
  const payload = await _insertEntityDeserialize(result);
  return { ...payload, ...headers };
}

export function _deleteEntitySend(
  context: Client,
  table: string,
  ifMatch: string,
  partitionKey: string,
  rowKey: string,
  options: TableDeleteEntityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}(PartitionKey='{partitionKey}',RowKey='{rowKey}'){?timeout}",
    {
      table: table,
      partitionKey: partitionKey,
      rowKey: rowKey,
      timeout: options?.timeout,
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
        dataserviceversion: "3.0",
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        "if-match": ifMatch,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteEntityDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tablesErrorDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._deleteEntityDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return;
}

export function _deleteEntityDeserializeHeaders(result: PathUncheckedResponse): {
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _deleteEntityDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  contentType: "application/json";
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    contentType: result.headers["content-type"] as any,
  };
}

/** Deletes the specified entity in a table. */
export async function deleteEntity(
  context: Client,
  table: string,
  ifMatch: string,
  partitionKey: string,
  rowKey: string,
  options: TableDeleteEntityOptionalParams = { requestOptions: {} },
): Promise<{ apiVersion: string; requestId?: string; clientRequestId?: string; date: Date }> {
  const result = await _deleteEntitySend(context, table, ifMatch, partitionKey, rowKey, options);
  const headers = _deleteEntityDeserializeHeaders(result);
  await _deleteEntityDeserialize(result);
  return { ...headers };
}

export function _mergeEntitySend(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableMergeEntityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}(PartitionKey='{partitionKey}',RowKey='{rowKey}'){?timeout}",
    {
      table: table,
      partitionKey: partitionKey,
      rowKey: rowKey,
      timeout: options?.timeout,
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
      headers: {
        dataserviceversion: "3.0",
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...options.requestOptions?.headers,
      },
      body: !options?.tableEntityProperties
        ? options?.tableEntityProperties
        : options?.tableEntityProperties,
    });
}

export async function _mergeEntityDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tablesErrorDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._mergeEntityDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return;
}

export function _mergeEntityDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _mergeEntityDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  contentType: "application/json";
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    contentType: result.headers["content-type"] as any,
  };
}

/** Merge entity in a table. */
export async function mergeEntity(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableMergeEntityOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
}> {
  const result = await _mergeEntitySend(context, table, partitionKey, rowKey, options);
  const headers = _mergeEntityDeserializeHeaders(result);
  await _mergeEntityDeserialize(result);
  return { ...headers };
}

export function _updateEntitySend(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableUpdateEntityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}(PartitionKey='{partitionKey}',RowKey='{rowKey}'){?timeout}",
    {
      table: table,
      partitionKey: partitionKey,
      rowKey: rowKey,
      timeout: options?.timeout,
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
      headers: {
        dataserviceversion: "3.0",
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...options.requestOptions?.headers,
      },
      body: !options?.tableEntityProperties
        ? options?.tableEntityProperties
        : options?.tableEntityProperties,
    });
}

export async function _updateEntityDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tablesErrorDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._updateEntityDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return;
}

export function _updateEntityDeserializeHeaders(result: PathUncheckedResponse): {
  etag: string;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    etag: result.headers["etag"],
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _updateEntityDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  contentType: "application/json";
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    contentType: result.headers["content-type"] as any,
  };
}

/** Update entity in a table. */
export async function updateEntity(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableUpdateEntityOptionalParams = { requestOptions: {} },
): Promise<{
  etag: string;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
}> {
  const result = await _updateEntitySend(context, table, partitionKey, rowKey, options);
  const headers = _updateEntityDeserializeHeaders(result);
  await _updateEntityDeserialize(result);
  return { ...headers };
}

export function _queryEntityWithPartitionAndRowKeySend(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableQueryEntityWithPartitionAndRowKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}(PartitionKey='{partitionKey}',RowKey='{rowKey}'){?timeout,%24format,%24select,%24filter}",
    {
      table: table,
      partitionKey: partitionKey,
      rowKey: rowKey,
      timeout: options?.timeout,
      "%24format": options?.format,
      "%24select": options?.select,
      "%24filter": options?.filter,
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
        dataserviceversion: "3.0",
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json;odata=minimalmetadata",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _queryEntityWithPartitionAndRowKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, any>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tablesErrorDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._queryEntityWithPartitionAndRowKeyDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return Object.fromEntries(Object.entries(result.body).map(([k, p]: [string, any]) => [k, p]));
}

export function _queryEntityWithPartitionAndRowKeyDeserializeHeaders(
  result: PathUncheckedResponse,
): {
  etag: string;
  nextPartitionKey?: string;
  nextRowKey?: string;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/json;odata=minimalmetadata";
} {
  return {
    etag: result.headers["etag"],
    nextPartitionKey:
      result.headers["x-ms-continuation-nextpartitionkey"] === undefined ||
      result.headers["x-ms-continuation-nextpartitionkey"] === null
        ? result.headers["x-ms-continuation-nextpartitionkey"]
        : result.headers["x-ms-continuation-nextpartitionkey"],
    nextRowKey:
      result.headers["x-ms-continuation-nextrowkey"] === undefined ||
      result.headers["x-ms-continuation-nextrowkey"] === null
        ? result.headers["x-ms-continuation-nextrowkey"]
        : result.headers["x-ms-continuation-nextrowkey"],
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _queryEntityWithPartitionAndRowKeyDeserializeExceptionHeaders(
  result: PathUncheckedResponse,
): { errorCode?: string; contentType: "application/json" } {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    contentType: result.headers["content-type"] as any,
  };
}

/** Retrieve a single entity. */
export async function queryEntityWithPartitionAndRowKey(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableQueryEntityWithPartitionAndRowKeyOptionalParams = { requestOptions: {} },
): Promise<Record<string, any>> {
  const result = await _queryEntityWithPartitionAndRowKeySend(
    context,
    table,
    partitionKey,
    rowKey,
    options,
  );
  const headers = _queryEntityWithPartitionAndRowKeyDeserializeHeaders(result);
  const payload = await _queryEntityWithPartitionAndRowKeyDeserialize(result);
  return { ...payload, ...headers };
}

export function _queryEntitiesSend(
  context: Client,
  table: string,
  options: TableQueryEntitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}(){?%24format,%24top,%24select,%24filter,timeout,NextPartitionKey,NextRowKey}",
    {
      table: table,
      "%24format": options?.format,
      "%24top": options?.top,
      "%24select": options?.select,
      "%24filter": options?.filter,
      timeout: options?.timeout,
      NextPartitionKey: options?.nextPartitionKey,
      NextRowKey: options?.nextRowKey,
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
        dataserviceversion: "3.0",
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json;odata=minimalmetadata",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _queryEntitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<TableEntityQueryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tablesErrorDeserializer(result.body);
    }
    error.details = {
      ...(error.details as any),
      ..._queryEntitiesDeserializeExceptionHeaders(result),
    };
    throw error;
  }

  return tableEntityQueryResponseDeserializer(result.body);
}

export function _queryEntitiesDeserializeHeaders(result: PathUncheckedResponse): {
  nextPartitionKey?: string;
  nextRowKey?: string;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/json;odata=minimalmetadata";
} {
  return {
    nextPartitionKey:
      result.headers["x-ms-continuation-nextpartitionkey"] === undefined ||
      result.headers["x-ms-continuation-nextpartitionkey"] === null
        ? result.headers["x-ms-continuation-nextpartitionkey"]
        : result.headers["x-ms-continuation-nextpartitionkey"],
    nextRowKey:
      result.headers["x-ms-continuation-nextrowkey"] === undefined ||
      result.headers["x-ms-continuation-nextrowkey"] === null
        ? result.headers["x-ms-continuation-nextrowkey"]
        : result.headers["x-ms-continuation-nextrowkey"],
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _queryEntitiesDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  contentType: "application/json";
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    contentType: result.headers["content-type"] as any,
  };
}

/** Queries entities under the given table. */
export async function queryEntities(
  context: Client,
  table: string,
  options: TableQueryEntitiesOptionalParams = { requestOptions: {} },
): Promise<{
  odataMetadata?: string;
  value?: Record<string, any>[];
  nextPartitionKey?: string;
  nextRowKey?: string;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/json;odata=minimalmetadata";
}> {
  const result = await _queryEntitiesSend(context, table, options);
  const headers = _queryEntitiesDeserializeHeaders(result);
  const payload = await _queryEntitiesDeserialize(result);
  return { ...payload, ...headers };
}

export function _$deleteSend(
  context: Client,
  table: string,
  options: TableDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/Tables('{table}')",
    {
      table: table,
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
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tablesErrorDeserializer(result.body);
    }
    error.details = { ...(error.details as any), ..._$deleteDeserializeExceptionHeaders(result) };
    throw error;
  }

  return;
}

export function _$deleteDeserializeHeaders(result: PathUncheckedResponse): {
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
} {
  return {
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
  };
}

export function _$deleteDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  contentType: "application/json";
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    contentType: result.headers["content-type"] as any,
  };
}

/** Deletes an existing table. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  table: string,
  options: TableDeleteOptionalParams = { requestOptions: {} },
): Promise<{ apiVersion: string; requestId?: string; clientRequestId?: string; date: Date }> {
  const result = await _$deleteSend(context, table, options);
  const headers = _$deleteDeserializeHeaders(result);
  await _$deleteDeserialize(result);
  return { ...headers };
}

export function _createSend(
  context: Client,
  tableProperties: TableProperties,
  options: TableCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/Tables{?%24format}",
    {
      "%24format": options?.format,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        dataserviceversion: "3.0",
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...(options?.prefer !== undefined ? { prefer: options?.prefer } : {}),
        accept: "application/json;odata=minimalmetadata",
        ...options.requestOptions?.headers,
      },
      body: tablePropertiesSerializer(tableProperties),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<TableResponse | undefined> {
  const expectedStatuses = ["201", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tablesErrorDeserializer(result.body);
    }
    error.details = { ...(error.details as any), ..._createDeserializeExceptionHeaders(result) };
    throw error;
  }

  return result.body ? tableResponseDeserializer(result.body) : undefined;
}

export function _createDeserializeHeaders(result: PathUncheckedResponse): {
  preferenceApplied?: string;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/json;odata=minimalmetadata";
} {
  return {
    preferenceApplied:
      result.headers["preference-applied"] === undefined ||
      result.headers["preference-applied"] === null
        ? result.headers["preference-applied"]
        : result.headers["preference-applied"],
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _createDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  contentType: "application/json";
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    contentType: result.headers["content-type"] as any,
  };
}

/** Creates a new table under the given account. */
export async function create(
  context: Client,
  tableProperties: TableProperties,
  options: TableCreateOptionalParams = { requestOptions: {} },
): Promise<
  | {
      tableName?: string;
      odataType?: string;
      odataId?: string;
      odataEditLink?: string;
      odataMetadata?: string;
      preferenceApplied?: string;
      apiVersion: string;
      requestId?: string;
      clientRequestId?: string;
      date: Date;
      contentType: "application/json;odata=minimalmetadata";
    }
  | undefined
> {
  const result = await _createSend(context, tableProperties, options);
  const headers = _createDeserializeHeaders(result);
  const payload = await _createDeserialize(result);
  return { ...payload, ...headers };
}

export function _querySend(
  context: Client,
  options: TableQueryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/Tables{?%24format,%24top,%24select,%24filter,NextTableName}",
    {
      "%24format": options?.format,
      "%24top": options?.top,
      "%24select": options?.select,
      "%24filter": options?.filter,
      NextTableName: options?.nextTableName,
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
        dataserviceversion: "3.0",
        "x-ms-version": context.apiVersion ?? "2019-02-02",
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json;odata=minimalmetadata",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _queryDeserialize(
  result: PathUncheckedResponse,
): Promise<_TableQueryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = tablesErrorDeserializer(result.body);
    }
    error.details = { ...(error.details as any), ..._queryDeserializeExceptionHeaders(result) };
    throw error;
  }

  return _tableQueryResponseDeserializer(result.body);
}

export function _queryDeserializeHeaders(result: PathUncheckedResponse): {
  nextTableName?: string;
  apiVersion: string;
  requestId?: string;
  clientRequestId?: string;
  date: Date;
  contentType: "application/json;odata=minimalmetadata";
} {
  return {
    nextTableName:
      result.headers["x-ms-continuation-nexttablename"] === undefined ||
      result.headers["x-ms-continuation-nexttablename"] === null
        ? result.headers["x-ms-continuation-nexttablename"]
        : result.headers["x-ms-continuation-nexttablename"],
    apiVersion: result.headers["x-ms-version"],
    requestId:
      result.headers["x-ms-request-id"] === undefined || result.headers["x-ms-request-id"] === null
        ? result.headers["x-ms-request-id"]
        : result.headers["x-ms-request-id"],
    clientRequestId:
      result.headers["x-ms-client-request-id"] === undefined ||
      result.headers["x-ms-client-request-id"] === null
        ? result.headers["x-ms-client-request-id"]
        : result.headers["x-ms-client-request-id"],
    date: new Date(result.headers["date"]),
    contentType: result.headers["content-type"] as any,
  };
}

export function _queryDeserializeExceptionHeaders(result: PathUncheckedResponse): {
  errorCode?: string;
  contentType: "application/json";
} {
  return {
    errorCode:
      result.headers["x-ms-error-code"] === undefined || result.headers["x-ms-error-code"] === null
        ? result.headers["x-ms-error-code"]
        : result.headers["x-ms-error-code"],
    contentType: result.headers["content-type"] as any,
  };
}

/** Queries tables under the given account. */
export function query(
  context: Client,
  options: TableQueryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TableProperties> {
  return buildPagedAsyncIterator(
    context,
    () => _querySend(context, options),
    _queryDeserialize,
    ["200"],
    { itemName: "value" },
  );
}
