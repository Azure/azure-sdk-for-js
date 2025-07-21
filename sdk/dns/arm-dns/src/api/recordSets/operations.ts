// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  RecordSet,
  recordSetSerializer,
  recordSetDeserializer,
  _RecordSetListResult,
  _recordSetListResultDeserializer,
  RecordType,
} from "../../models/models.js";
import {
  RecordSetsListAllByDnsZoneOptionalParams,
  RecordSetsListByDnsZoneOptionalParams,
  RecordSetsListByTypeOptionalParams,
  RecordSetsDeleteOptionalParams,
  RecordSetsUpdateOptionalParams,
  RecordSetsCreateOrUpdateOptionalParams,
  RecordSetsGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listAllByDnsZoneSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: RecordSetsListAllByDnsZoneOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/all{?api%2Dversion,%24top,%24recordsetnamesuffix}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
      "%24recordsetnamesuffix": options?.recordSetNameSuffix,
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

export async function _listAllByDnsZoneDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecordSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _recordSetListResultDeserializer(result.body);
}

/** Lists all record sets in a DNS zone. */
export function listAllByDnsZone(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: RecordSetsListAllByDnsZoneOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecordSet> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllByDnsZoneSend(context, resourceGroupName, zoneName, options),
    _listAllByDnsZoneDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByDnsZoneSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: RecordSetsListByDnsZoneOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/recordsets{?api%2Dversion,%24top,%24recordsetnamesuffix}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
      "%24recordsetnamesuffix": options?.recordsetnamesuffix,
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

export async function _listByDnsZoneDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecordSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _recordSetListResultDeserializer(result.body);
}

/** Lists all record sets in a DNS zone. */
export function listByDnsZone(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: RecordSetsListByDnsZoneOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecordSet> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDnsZoneSend(context, resourceGroupName, zoneName, options),
    _listByDnsZoneDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByTypeSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  recordType: RecordType,
  options: RecordSetsListByTypeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/{recordType}{?api%2Dversion,%24top,%24recordsetnamesuffix}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
      recordType: recordType,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
      "%24recordsetnamesuffix": options?.recordsetnamesuffix,
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

export async function _listByTypeDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecordSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _recordSetListResultDeserializer(result.body);
}

/** Lists the record sets of a specified type in a DNS zone. */
export function listByType(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  recordType: RecordType,
  options: RecordSetsListByTypeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecordSet> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTypeSend(context, resourceGroupName, zoneName, recordType, options),
    _listByTypeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  relativeRecordSetName: string,
  recordType: RecordType,
  options: RecordSetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/{recordType}/{+relativeRecordSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
      relativeRecordSetName: relativeRecordSetName,
      recordType: recordType,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
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

/** Deletes a record set from a DNS zone. This operation cannot be undone. Record sets of type SOA cannot be deleted (they are deleted when the DNS zone is deleted). */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  relativeRecordSetName: string,
  recordType: RecordType,
  options: RecordSetsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    zoneName,
    relativeRecordSetName,
    recordType,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  relativeRecordSetName: string,
  recordType: RecordType,
  parameters: RecordSet,
  options: RecordSetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/{recordType}/{+relativeRecordSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
      relativeRecordSetName: relativeRecordSetName,
      recordType: recordType,
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
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: recordSetSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<RecordSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return recordSetDeserializer(result.body);
}

/** Updates a record set within a DNS zone. */
export async function update(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  relativeRecordSetName: string,
  recordType: RecordType,
  parameters: RecordSet,
  options: RecordSetsUpdateOptionalParams = { requestOptions: {} },
): Promise<RecordSet> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    zoneName,
    relativeRecordSetName,
    recordType,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  relativeRecordSetName: string,
  recordType: RecordType,
  parameters: RecordSet,
  options: RecordSetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/{recordType}/{+relativeRecordSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
      relativeRecordSetName: relativeRecordSetName,
      recordType: recordType,
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
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: recordSetSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RecordSet> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return recordSetDeserializer(result.body);
}

/** Creates or updates a record set within a DNS zone. Record sets of type SOA can be updated but not created (they are created when the DNS zone is created). */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  relativeRecordSetName: string,
  recordType: RecordType,
  parameters: RecordSet,
  options: RecordSetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<RecordSet> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    zoneName,
    relativeRecordSetName,
    recordType,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  relativeRecordSetName: string,
  recordType: RecordType,
  options: RecordSetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/{recordType}/{+relativeRecordSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
      relativeRecordSetName: relativeRecordSetName,
      recordType: recordType,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RecordSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return recordSetDeserializer(result.body);
}

/** Gets a record set. */
export async function get(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  relativeRecordSetName: string,
  recordType: RecordType,
  options: RecordSetsGetOptionalParams = { requestOptions: {} },
): Promise<RecordSet> {
  const result = await _getSend(
    context,
    resourceGroupName,
    zoneName,
    relativeRecordSetName,
    recordType,
    options,
  );
  return _getDeserialize(result);
}
