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
    error.details = tableServiceErrorXmlDeserializer(result.body);

    throw error;
  }

  return;
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
): Promise<void> {
  const result = await _setAccessPolicySend(context, table, tableAcl, options);
  return _setAccessPolicyDeserialize(result);
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
    error.details = tableServiceErrorXmlDeserializer(result.body);

    throw error;
  }

  return signedIdentifiersXmlDeserializer(result.body);
}

/**
 * Retrieves details about any stored access policies specified on the table that
 * may be used with Shared Access Signatures.
 */
export async function getAccessPolicy(
  context: Client,
  table: string,
  options: TableGetAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<SignedIdentifiers> {
  const result = await _getAccessPolicySend(context, table, options);
  return _getAccessPolicyDeserialize(result);
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
      body: !options["tableEntityProperties"]
        ? options["tableEntityProperties"]
        : options["tableEntityProperties"],
    });
}

export async function _insertEntityDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, any>> {
  const expectedStatuses = ["201", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = tablesErrorDeserializer(result.body);

    throw error;
  }

  return Object.fromEntries(Object.entries(result.body).map(([k, p]: [string, any]) => [k, p]));
}

/** Insert entity in a table. */
export async function insertEntity(
  context: Client,
  table: string,
  options: TableInsertEntityOptionalParams = { requestOptions: {} },
): Promise<Record<string, any>> {
  const result = await _insertEntitySend(context, table, options);
  return _insertEntityDeserialize(result);
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
    "/{table}(PartitionKey='{+partitionKey}',RowKey='{+rowKey}'){?timeout}",
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
    error.details = tablesErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified entity in a table. */
export async function deleteEntity(
  context: Client,
  table: string,
  ifMatch: string,
  partitionKey: string,
  rowKey: string,
  options: TableDeleteEntityOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteEntitySend(context, table, ifMatch, partitionKey, rowKey, options);
  return _deleteEntityDeserialize(result);
}

export function _mergeEntitySend(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableMergeEntityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}(PartitionKey='{+partitionKey}',RowKey='{+rowKey}'){?timeout}",
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
      body: !options["tableEntityProperties"]
        ? options["tableEntityProperties"]
        : options["tableEntityProperties"],
    });
}

export async function _mergeEntityDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = tablesErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Merge entity in a table. */
export async function mergeEntity(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableMergeEntityOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _mergeEntitySend(context, table, partitionKey, rowKey, options);
  return _mergeEntityDeserialize(result);
}

export function _updateEntitySend(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableUpdateEntityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}(PartitionKey='{+partitionKey}',RowKey='{+rowKey}'){?timeout}",
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
      body: !options["tableEntityProperties"]
        ? options["tableEntityProperties"]
        : options["tableEntityProperties"],
    });
}

export async function _updateEntityDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = tablesErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update entity in a table. */
export async function updateEntity(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableUpdateEntityOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateEntitySend(context, table, partitionKey, rowKey, options);
  return _updateEntityDeserialize(result);
}

export function _queryEntityWithPartitionAndRowKeySend(
  context: Client,
  table: string,
  partitionKey: string,
  rowKey: string,
  options: TableQueryEntityWithPartitionAndRowKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{table}(PartitionKey='{+partitionKey}',RowKey='{+rowKey}'){?timeout,%24format,%24select,%24filter}",
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
    error.details = tablesErrorDeserializer(result.body);

    throw error;
  }

  return Object.fromEntries(Object.entries(result.body).map(([k, p]: [string, any]) => [k, p]));
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
  return _queryEntityWithPartitionAndRowKeyDeserialize(result);
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
    error.details = tablesErrorDeserializer(result.body);

    throw error;
  }

  return tableEntityQueryResponseDeserializer(result.body);
}

/** Queries entities under the given table. */
export async function queryEntities(
  context: Client,
  table: string,
  options: TableQueryEntitiesOptionalParams = { requestOptions: {} },
): Promise<TableEntityQueryResponse> {
  const result = await _queryEntitiesSend(context, table, options);
  return _queryEntitiesDeserialize(result);
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
    error.details = tablesErrorDeserializer(result.body);

    throw error;
  }

  return;
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
): Promise<void> {
  const result = await _$deleteSend(context, table, options);
  return _$deleteDeserialize(result);
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

export async function _createDeserialize(result: PathUncheckedResponse): Promise<TableResponse> {
  const expectedStatuses = ["201", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = tablesErrorDeserializer(result.body);

    throw error;
  }

  return tableResponseDeserializer(result.body);
}

/** Creates a new table under the given account. */
export async function create(
  context: Client,
  tableProperties: TableProperties,
  options: TableCreateOptionalParams = { requestOptions: {} },
): Promise<TableResponse> {
  const result = await _createSend(context, tableProperties, options);
  return _createDeserialize(result);
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
    error.details = tablesErrorDeserializer(result.body);

    throw error;
  }

  return _tableQueryResponseDeserializer(result.body);
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
